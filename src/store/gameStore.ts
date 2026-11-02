import { create } from 'zustand'
import { NODES, START_ID } from '../data'
import { COLLECT_MAP } from '../data/achievements'
import { ENDINGS } from '../data/endings'
import type { Effects, Fx, StoryNode, Thought } from '../data/types'
import { applySim, resolveBranch, visibleChoices } from '../utils/engine'
import {
  clearRun,
  loadMeta,
  loadRun,
  saveMeta,
  saveRun,
  type LogEntry,
  type Meta,
  type Run,
  type Settings,
} from '../utils/storage'
import { setSoundEnabled, sfx } from '../utils/sound'

export type Screen = 'title' | 'story' | 'gallery' | 'ending'
export type Modal = 'menu' | 'history' | 'settings' | null

export interface Toast {
  id: number
  text: string
  kind: 'collect' | 'egg' | 'info'
}

export interface Result {
  endingId: string
  fall: number
  best: string
  heart: number
  isNew: boolean
}

const DEFAULT_BEST = '"영아, 약 먹었어?"'

const newRun = (): Run => ({
  nodeId: START_ID,
  heart: 0,
  flags: [],
  fall: 0,
  best: null,
  log: [],
  sFace: 'smile',
  yFace: 'smile',
  bg: 'home',
  thoughts: [],
  tapS: 0,
  tapY: 0,
})

interface GameState {
  screen: Screen
  run: Run
  meta: Meta
  hasSave: boolean
  result: Result | null
  modal: Modal
  thought: Thought | null
  verdict: boolean
  fxType: Fx | null
  fxKey: number
  toasts: Toast[]
  bubble: { key: number; who: 'S' | 'Y'; text: string } | null

  setScreen: (s: Screen) => void
  setModal: (m: Modal) => void
  startNew: () => void
  continueGame: () => void
  advance: () => void
  choose: (index: number) => void
  pressRush: () => void
  pickPeach: (k: 'a' | 'b' | 'c') => void
  openThought: () => void
  closeThought: () => void
  closeVerdict: () => void
  tapCharacter: (who: 'S' | 'Y') => void
  unlockEgg: (id: string, text?: string) => boolean
  dismissToast: (id: number) => void
  updateSettings: (p: Partial<Settings>) => void
  resetAllRecords: () => void
  toTitle: () => void
}

let toastSeq = 1

export const useGame = create<GameState>((set, get) => {
  const pushToast = (text: string, kind: Toast['kind'] = 'info') =>
    set((s) => ({ toasts: [...s.toasts, { id: toastSeq++, text, kind }].slice(-3) }))

  const persistMeta = (meta: Meta) => {
    saveMeta(meta)
    set({ meta })
  }

  const collect = (ids: string[] | undefined) => {
    if (!ids?.length) return
    const meta = get().meta
    const fresh = ids.filter((id) => !meta.collected.includes(id))
    if (!fresh.length) return
    persistMeta({ ...meta, collected: [...meta.collected, ...fresh] })
    fresh.forEach((id) => pushToast(`설렘 도감 · ${COLLECT_MAP[id]?.title ?? id}`, 'collect'))
    sfx('collect')
  }

  const unlockEgg = (id: string, text?: string) => {
    const meta = get().meta
    if (meta.eggs.includes(id)) return false
    persistMeta({ ...meta, eggs: [...meta.eggs, id] })
    if (text) pushToast(text, 'egg')
    return true
  }

  /** 효과를 run 에 반영하고 새 run 을 반환 (저장은 호출한 쪽에서) */
  const applyEffects = (run: Run, e: Effects | undefined, quote: string | null): Run => {
    if (!e) return run
    const sim = applySim({ heart: run.heart, flags: run.flags }, e)
    const delta = sim.heart - run.heart
    let best = run.best
    if (delta > 0 && quote && (!best || delta > best.delta)) best = { delta, text: quote }
    collect(e.collect)
    return { ...run, heart: sim.heart, flags: sim.flags, fall: run.fall + (e.fall ? 1 : 0), best }
  }

  const enterNode = (id: string, preface: LogEntry | null = null, viaEffects?: { e?: Effects; quote?: string }) => {
    let run = get().run
    if (preface) run = { ...run, log: [...run.log, preface] }
    if (viaEffects?.e) run = applyEffects(run, viaEffects.e, viaEffects.quote ?? null)

    const resolved = resolveBranch(id, { heart: run.heart, flags: run.flags })
    const node: StoryNode = NODES[resolved]
    const prevHeart = run.heart
    run = applyEffects(run, node.effects, node.moment ?? (node.who !== 'N' ? `"${node.text}"` : null))

    let fx: Fx | null = node.fx ?? null
    if (!fx && node.effects?.fall) fx = 'hearts'

    run = {
      ...run,
      nodeId: node.id,
      sFace: node.s ?? run.sFace,
      yFace: node.y ?? run.yFace,
      bg: node.bg ?? run.bg,
      log: node.text ? [...run.log, { who: node.who, text: node.text }].slice(-300) : run.log,
    }

    if (node.egg) unlockEgg(node.egg)
    let verdict = false
    if (run.heart >= 100 && prevHeart < 100 && !run.flags.includes('verdict')) {
      run = { ...run, flags: [...run.flags, 'verdict'] }
      verdict = true
      unlockEgg('heart100')
      sfx('secret')
    } else if (fx === 'hearts') sfx('heart')
    else if (fx === 'shake') sfx('rush')

    saveRun(run)
    set((s) => ({
      run,
      hasSave: true,
      verdict: verdict || s.verdict,
      ...(fx ? { fxType: fx, fxKey: s.fxKey + 1 } : {}),
    }))
  }

  const finishEnding = (endingId: string) => {
    const { run, meta } = get()
    const endings = meta.endings.includes(endingId) ? meta.endings : [...meta.endings, endingId]
    persistMeta({ ...meta, endings })
    if (endings.length >= ENDINGS.length) unlockEgg('allEndings', '모든 엔딩을 모았습니다. 복숭아 왕관 획득!')
    clearRun()
    if (endingId === 'E6') sfx('secret')
    set({
      screen: 'ending',
      hasSave: false,
      result: { endingId, fall: run.fall, best: run.best?.text ?? DEFAULT_BEST, heart: run.heart, isNew: !meta.endings.includes(endingId) },
    })
  }

  const meta0 = loadMeta()
  const run0 = loadRun()
  setSoundEnabled(meta0.settings.sound)

  return {
    screen: 'title',
    run: run0 ?? newRun(),
    meta: meta0,
    hasSave: !!run0 && !!NODES[run0.nodeId],
    result: null,
    modal: null,
    thought: null,
    verdict: false,
    fxType: null,
    fxKey: 0,
    toasts: [],
    bubble: null,

    setScreen: (screen) => set({ screen, modal: null }),
    setModal: (modal) => set({ modal }),

    startNew: () => {
      clearRun()
      set({ run: newRun(), screen: 'story', modal: null, result: null, verdict: false })
      enterNode(START_ID)
    },

    continueGame: () => {
      const saved = loadRun()
      if (!saved || !NODES[saved.nodeId]) return get().startNew()
      set({ run: saved, screen: 'story', modal: null, verdict: false })
    },

    advance: () => {
      const node = NODES[get().run.nodeId]
      if (!node) return
      if (node.ending) return finishEnding(node.ending)
      if (node.choices || node.minigame) return
      if (node.next) enterNode(node.next)
    },

    choose: (index) => {
      const run = get().run
      const node = NODES[run.nodeId]
      const c = visibleChoices(node, { heart: run.heart, flags: run.flags })[index]
      if (!c) return
      sfx('choice')
      enterNode(c.next, { who: 'C', text: c.text }, {
        e: c.effects,
        quote: c.effects?.fall ? c.text : undefined,
      })
    },

    pressRush: () => {
      const node = NODES[get().run.nodeId]
      if (node?.rush) enterNode(node.rush.next, { who: 'C', text: '♥ 급발진!' })
    },

    pickPeach: (k) => {
      const node = NODES[get().run.nodeId]
      if (!node?.minigame) return
      const label = { a: '가장 예쁜 복숭아', b: '가장 달아 보이는 복숭아', c: '아까부터 보고 있던 복숭아' }[k]
      sfx('choice')
      enterNode(node.minigame.next[k], { who: 'C', text: `(${label}를 골랐다)` })
    },

    openThought: () => {
      const { run } = get()
      const t = NODES[run.nodeId]?.thought
      if (!t) return
      let next = run
      if (!run.thoughts.includes(t.id)) {
        next = { ...run, thoughts: [...run.thoughts, t.id] }
        if (t.flags) next = { ...next, flags: Array.from(new Set([...next.flags, ...t.flags])) }
        collect(t.collect)
        saveRun(next)
      }
      set({ run: next, thought: t })
    },
    closeThought: () => set({ thought: null }),
    closeVerdict: () => set({ verdict: false }),

    tapCharacter: (who) => {
      const run = get().run
      const key = who === 'S' ? 'tapS' : 'tapY'
      const n = run[key] + 1
      set({ run: { ...run, [key]: n } })
      const lines =
        who === 'S'
          ? ['어? 왜 불러?', '간지러워~ 콕콕 하지 마!', '자꾸 누르면 복숭아 하나 뺏어 먹는다?', '…영아, 언니 뭐 묻었어?', '그만 눌러, 심장 약한 건 영이 아니었나?']
          : ['…왜요, 언니?', '저 지금 언니 보느라 바쁜데요.', '자꾸 누르면 저도 누릅니다. 언니 볼.', '아, 진짜…! 귀 빨개지는 거 보이잖아요.', '언니, 장난치지 마요. 저 진지하다고요.']
      const text = lines[(n - 1) % lines.length]
      set({ bubble: { key: Date.now(), who, text } })
      if (n === 5) unlockEgg(who === 'S' ? 'tapSinae' : 'tapYoung', who === 'S' ? '숨겨진 대사 · 언니를 콕콕' : '숨겨진 대사 · 영을 콕콕')
    },

    unlockEgg,
    dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

    updateSettings: (p) => {
      const meta = get().meta
      const settings = { ...meta.settings, ...p }
      if (p.sound !== undefined) setSoundEnabled(p.sound)
      persistMeta({ ...meta, settings })
    },

    resetAllRecords: () => {
      clearRun()
      persistMeta({ collected: [], endings: [], eggs: [], settings: get().meta.settings })
      set({ hasSave: false, run: newRun() })
    },

    toTitle: () => set({ screen: 'title', modal: null, thought: null, verdict: false }),
  }
})
