import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Heart, Menu, MessageCircleHeart, Play, Pause } from 'lucide-react'
import { ALL_NODES, EPISODES, NODES } from '../data'
import { visibleChoices } from '../utils/engine'
import { useGame } from '../store/gameStore'
import { useTypewriter } from '../hooks/useTypewriter'
import { useReduced } from '../hooks/useReduced'
import Background from './Backgrounds'
import CharacterSprite from './CharacterSprite'
import DialogueBox from './DialogueBox'
import ChoiceButtons from './ChoiceButtons'
import HeartGauge from './HeartGauge'
import InnerThoughtModal from './InnerThoughtModal'
import PeachMiniGame from './PeachMiniGame'
import FxLayer from './FxLayer'
import PeachIcon from './PeachIcon'
import { VerdictOverlay } from './Overlays'
import type { SinaeFace, YoungFace } from '../data/types'

const AUTO_BASE = { slow: 2200, normal: 1500, fast: 900 }

const EP_ORDER: Record<number, string[]> = {}
for (const n of ALL_NODES) (EP_ORDER[n.ep] ??= []).push(n.id)

export default function StoryScreen() {
  const run = useGame((s) => s.run)
  const settings = useGame((s) => s.meta.settings)
  const thought = useGame((s) => s.thought)
  const modal = useGame((s) => s.modal)
  const verdict = useGame((s) => s.verdict)
  const fxKey = useGame((s) => s.fxKey)
  const fxType = useGame((s) => s.fxType)
  const bubble = useGame((s) => s.bubble)
  const { advance, choose, pressRush, openThought, closeThought, setModal, tapCharacter, toTitle } = useGame.getState()
  const reduced = useReduced()

  const node = NODES[run.nodeId]
  const [auto, setAuto] = useState(false)
  const [cardSeen, setCardSeen] = useState<string | null>(null)
  const [shake, setShake] = useState(false)
  const [bubbleShown, setBubbleShown] = useState(false)

  const showCard = !!node?.card && cardSeen !== node.id
  const typing = useTypewriter(node?.text ?? '', settings.textSpeed, node?.id ?? '', showCard)
  const choices = useMemo(
    () => (node ? visibleChoices(node, { heart: run.heart, flags: run.flags }) : []),
    [node, run.heart, run.flags],
  )
  const blocking = !!thought || !!modal || verdict || showCard || !!node?.minigame

  // 엔진이 알 수 없는 노드(구버전 저장 등)라면 타이틀로
  useEffect(() => {
    if (!node) toTitle()
  }, [node, toTitle])

  // 급발진 연출: 대화창 흔들림
  useEffect(() => {
    if (fxType !== 'shake' || !fxKey || reduced) return
    setShake(true)
    const t = setTimeout(() => setShake(false), 600)
    return () => clearTimeout(t)
  }, [fxKey, fxType, reduced])

  // 캐릭터 말풍선 (타이틀/스토리 이스터에그)
  useEffect(() => {
    if (!bubble) return
    setBubbleShown(true)
    const t = setTimeout(() => setBubbleShown(false), 2400)
    return () => clearTimeout(t)
  }, [bubble])

  const onTap = () => {
    if (blocking) return
    if (!typing.done) return typing.skip()
    if (choices.length || node.minigame) return
    advance()
  }

  // 에피소드 카드: 잠시 후 자동 닫힘
  useEffect(() => {
    if (!showCard) return
    const t = setTimeout(() => setCardSeen(node.id), 2600)
    return () => clearTimeout(t)
  }, [showCard, node?.id])

  // 자동 진행
  useEffect(() => {
    if (!auto || blocking || !typing.done || choices.length || node?.minigame) return
    const extra = node?.rush || node?.thought ? 3600 : 0
    const t = setTimeout(() => advance(), AUTO_BASE[settings.autoSpeed] + (node?.text.length ?? 0) * 45 + extra)
    return () => clearTimeout(t)
  }, [auto, blocking, typing.done, choices.length, node, settings.autoSpeed, advance])

  // 키보드 조작
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (thought || modal || verdict || node?.minigame) return
      if (showCard) return setCardSeen(node.id)
      if (e.key === ' ' || e.key === 'Enter') {
        if (document.activeElement instanceof HTMLButtonElement && e.key === 'Enter') return
        e.preventDefault()
        onTap()
      } else if (/^[1-4]$/.test(e.key) && typing.done && choices.length) {
        choose(Number(e.key) - 1)
      } else if (e.key === 'Escape') setModal('menu')
      else if (e.key.toLowerCase() === 'l') setModal('history')
      else if (e.key.toLowerCase() === 'a') setAuto((v) => !v)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  })

  if (!node) return null

  const epInfo = EPISODES[node.ep - 1]
  const order = EP_ORDER[node.ep] ?? []
  const frac = Math.min(1, order.indexOf(node.id) / Math.max(1, order.length - 1))
  const speaker = node.who
  const seenThought = node.thought && run.thoughts.includes(node.thought.id)

  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-[1100px] flex-col overflow-hidden bg-cream" data-ep={node.ep}>
      <Background id={run.bg} />
      <FxLayer />

      {/* 상단: 메뉴 / 심장 상태 / 에피소드 진행 */}
      <header className="relative z-20 px-3 pt-[max(0.6rem,env(safe-area-inset-top))]">
        <div className="flex items-start justify-between gap-2">
          <button className="icon-btn" onClick={() => setModal('menu')} aria-label="메뉴 (Esc)">
            <Menu size={22} />
          </button>
          <HeartGauge heart={run.heart} />
        </div>
        <div className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full border-2 border-cocoa bg-warm/90 py-1 pl-2 pr-3 text-[0.8rem] shadow-[0_2px_0_rgba(118,87,90,0.4)]">
          <PeachIcon size={18} />
          <span className="font-display text-rose">EP {epInfo.no}/5</span>
          <span className="truncate text-deep">{epInfo.title}</span>
          <span className="ml-1 hidden h-1.5 w-14 overflow-hidden rounded-full bg-cream sm:block">
            <span className="block h-full bg-peach transition-all" style={{ width: `${frac * 100}%` }} />
          </span>
        </div>
      </header>

      {/* 중앙: 캐릭터 */}
      <div className="relative z-10 flex min-h-0 flex-1 items-end justify-center gap-[2%] px-2 pb-0" onClick={onTap}>
        <div className="relative h-[90%] max-h-[470px] max-w-[48%] aspect-[200/290]">
          <button
            type="button"
            className={`h-full w-full ${speaker === 'Y' ? 'translate-y-[-6px] scale-[1.03]' : 'opacity-95'} transition-transform duration-200`}
            style={{ filter: speaker === 'S' ? 'brightness(0.97) saturate(0.92)' : undefined }}
            onClick={(e) => {
              e.stopPropagation()
              tapCharacter('Y')
            }}
            aria-label="영"
          >
            <div className="anim-bob-soft h-full w-full">
              <CharacterSprite who="young" face={run.yFace as YoungFace} className="h-full w-full" />
            </div>
          </button>
          {bubbleShown && bubble?.who === 'Y' && <Bubble text={bubble.text} />}
        </div>
        <div className="relative h-[98%] max-h-[500px] max-w-[48%] aspect-[200/290]">
          <button
            type="button"
            className={`h-full w-full ${speaker === 'S' ? 'translate-y-[-6px] scale-[1.03]' : 'opacity-95'} transition-transform duration-200`}
            style={{ filter: speaker === 'Y' ? 'brightness(0.97) saturate(0.92)' : undefined }}
            onClick={(e) => {
              e.stopPropagation()
              tapCharacter('S')
            }}
            aria-label="시내"
          >
            <div className="anim-bob h-full w-full">
              <CharacterSprite who="sinae" face={run.sFace as SinaeFace} className="h-full w-full" />
            </div>
          </button>
          {bubbleShown && bubble?.who === 'S' && <Bubble text={bubble.text} />}
        </div>
      </div>

      {/* 하단: 대화창 */}
      <div className="relative z-20">
        {typing.done && (node.rush || node.thought) && (
          <div className="absolute -top-9 right-4 z-30 flex gap-2">
            {node.thought && (
              <button
                type="button"
                className={`vn-btn !min-h-11 !px-3 !py-1 !text-[0.9rem] ${seenThought ? '' : 'sage anim-pulse'}`}
                onClick={openThought}
                aria-label={node.thought.who === 'young' ? '영의 속마음 열기' : '시내의 속마음 열기'}
              >
                <MessageCircleHeart size={18} /> {node.thought.who === 'young' ? '영의 속마음' : '시내의 속마음'}
              </button>
            )}
            {node.rush && (
              <button type="button" className="vn-btn primary !min-h-11 !px-3 !py-1 !text-[0.9rem] anim-pulse" onClick={pressRush} aria-label="영의 급발진">
                <Heart size={18} fill="currentColor" /> 급발진!
              </button>
            )}
          </div>
        )}
        <DialogueBox
          who={speaker}
          shown={typing.shown}
          done={typing.done}
          shake={shake}
          onTap={onTap}
          footer={
            <>
              <button className="icon-btn !min-h-10 !min-w-10" onClick={(e) => { e.stopPropagation(); setModal('history') }} aria-label="대화 기록 (L)">
                <BookOpen size={18} />
              </button>
              <button className="icon-btn !min-h-10 gap-1 px-2 text-[0.8rem]" aria-pressed={auto} onClick={(e) => { e.stopPropagation(); setAuto((v) => !v) }} aria-label="자동 진행 (A)">
                {auto ? <Pause size={16} /> : <Play size={16} />} AUTO
              </button>
            </>
          }
        >
          {choices.length > 0 && <ChoiceButtons choices={choices} onChoose={choose} />}
        </DialogueBox>
      </div>

      {node.minigame && <PeachMiniGame />}
      {thought && <InnerThoughtModal thought={thought} onClose={closeThought} />}
      <VerdictOverlay />

      {showCard && node.card && (
        <button
          type="button"
          className="absolute inset-0 z-[65] flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-softpeach to-cream text-center"
          onClick={() => setCardSeen(node.id)}
          aria-label="에피소드 시작"
        >
          <div className="anim-pop"><PeachIcon size={84} /></div>
          <div className="font-display text-xl tracking-widest text-rose anim-fadeup">{node.card.title}</div>
          <div className="font-display px-6 text-3xl text-deep anim-fadeup" style={{ animationDelay: '0.15s', wordBreak: 'keep-all' }}>
            {node.card.sub}
          </div>
          <div className="mt-6 text-sm text-cocoa/70">탭해서 시작</div>
        </button>
      )}
    </div>
  )
}

function Bubble({ text }: { text: string }) {
  return (
    <div className="anim-pop absolute -top-3 left-1/2 z-30 w-44 -translate-x-1/2 rounded-2xl border-[2.5px] border-cocoa bg-warm px-3 py-2 text-center text-[0.85rem] leading-snug text-deep shadow-[0_3px_0_rgba(118,87,90,0.4)]" style={{ wordBreak: 'keep-all' }}>
      {text}
    </div>
  )
}
