import { describe, expect, it } from 'vitest'
import { ALL_NODES, NODES, START_ID } from '../data'
import { ENDINGS } from '../data/endings'
import { COLLECTIBLES } from '../data/achievements'
import { applySim, resolveBranch, visibleChoices, type Sim } from '../utils/engine'
import type { StoryNode } from '../data/types'

const targets = (n: StoryNode): string[] => [
  ...(n.next ? [n.next] : []),
  ...(n.choices?.map((c) => c.next) ?? []),
  ...(n.branch?.map((b) => b.to) ?? []),
  ...(n.rush ? [n.rush.next] : []),
  ...(n.minigame ? Object.values(n.minigame.next) : []),
]

/** 가능한 모든 선택 조합을 탐색 (노드, 하트, 플래그) 상태 단위로 메모이즈 */
function explore() {
  const seenStates = new Set<string>()
  const reachedNodes = new Set<string>()
  const endings = new Set<string>()
  const collected = new Set<string>()
  const eggs = new Set<string>()
  const stack: { id: string; s: Sim }[] = [{ id: START_ID, s: { heart: 0, flags: [] } }]
  const addCollect = (c?: string[]) => c?.forEach((x) => collected.add(x))

  while (stack.length) {
    const { id: rawId, s: s0 } = stack.pop()!
    const id = resolveBranch(rawId, s0)
    const key = `${id}|${s0.heart}|${[...s0.flags].sort().join(',')}`
    if (seenStates.has(key)) continue
    seenStates.add(key)
    const node = NODES[id]
    expect(node, `노드 없음: ${id}`).toBeTruthy()
    reachedNodes.add(id)
    let s = applySim(s0, node.effects)
    addCollect(node.effects?.collect)
    if (node.egg) eggs.add(node.egg)
    if (s.heart >= 100) eggs.add('heart100')

    // 속마음은 열람해도, 안 해도 된다 → 두 경우 모두 탐색
    const withThought = node.thought
      ? applySim(s, { flags: node.thought.flags })
      : null
    if (node.thought) addCollect(node.thought.collect)
    const variants = withThought ? [s, withThought] : [s]

    for (const v of variants) {
      if (node.ending) {
        endings.add(node.ending)
        continue
      }
      if (node.choices) {
        for (const c of visibleChoices(node, v)) {
          stack.push({ id: c.next, s: applySim(v, c.effects) })
          addCollect(c.effects?.collect)
          if (v.heart >= 100 || applySim(v, c.effects).heart >= 100) eggs.add('heart100')
        }
        continue
      }
      if (node.minigame) {
        Object.values(node.minigame.next).forEach((t) => stack.push({ id: t, s: v }))
        continue
      }
      if (node.rush) stack.push({ id: node.rush.next, s: v })
      if (node.next) stack.push({ id: node.next, s: v })
    }
  }
  return { reachedNodes, endings, collected, eggs }
}

describe('스토리 데이터 무결성', () => {
  it('노드 id 가 중복되지 않는다', () => {
    expect(new Set(ALL_NODES.map((n) => n.id)).size).toBe(ALL_NODES.length)
  })

  it('존재하지 않는 다음 노드 id 가 없다', () => {
    const bad: string[] = []
    for (const n of ALL_NODES) for (const t of targets(n)) if (!NODES[t]) bad.push(`${n.id} -> ${t}`)
    expect(bad).toEqual([])
  })

  it('끝점이 아닌 노드는 모두 다음으로 이어진다', () => {
    const dead = ALL_NODES.filter((n) => !n.ending && targets(n).length === 0).map((n) => n.id)
    expect(dead).toEqual([])
  })

  it('에피소드마다 대사 12개 이상, 선택 이벤트 2개 이상', () => {
    for (let ep = 1; ep <= 5; ep++) {
      const nodes = ALL_NODES.filter((n) => n.ep === ep)
      const lines = nodes.filter((n) => n.text)
      const choiceEvents = nodes.filter((n) => n.choices || n.minigame)
      expect(lines.length, `ep${ep} 대사`).toBeGreaterThanOrEqual(12)
      expect(choiceEvents.length, `ep${ep} 선택`).toBeGreaterThanOrEqual(2)
      expect(nodes.some((n) => n.thought), `ep${ep} 속마음`).toBe(true)
    }
  })

  it("영의 이름은 '제영'으로 표기되지 않는다", () => {
    const all = JSON.stringify(ALL_NODES) + JSON.stringify(ENDINGS) + JSON.stringify(COLLECTIBLES)
    expect(all).not.toContain('제영')
  })

  it('도감 id 가 모두 정의되어 있다', () => {
    const defined = new Set(COLLECTIBLES.map((c) => c.id))
    const used = new Set<string>()
    for (const n of ALL_NODES) {
      n.effects?.collect?.forEach((c) => used.add(c))
      n.thought?.collect?.forEach((c) => used.add(c))
      n.choices?.forEach((c) => c.effects?.collect?.forEach((x) => used.add(x)))
    }
    for (const u of used) expect(defined.has(u), `정의 안 된 도감 id: ${u}`).toBe(true)
  })
})

describe('분기 탐색', () => {
  const r = explore()

  it('모든 대사 노드에 도달할 수 있다', () => {
    const unreachable = ALL_NODES.filter((n) => !n.branch && !r.reachedNodes.has(n.id)).map((n) => n.id)
    expect(unreachable).toEqual([])
  })

  it('6개 엔딩(시크릿 포함)에 모두 도달할 수 있다', () => {
    expect([...r.endings].sort()).toEqual(ENDINGS.map((e) => e.id).sort())
  })

  it('모든 도감 항목을 수집할 수 있다', () => {
    const missing = COLLECTIBLES.filter((c) => !r.collected.has(c.id)).map((c) => c.id)
    expect(missing).toEqual([])
  })

  it('설렘 게이지 100 이스터에그와 조합 이스터에그에 도달할 수 있다', () => {
    expect(r.eggs.has('heart100')).toBe(true)
    expect(r.eggs.has('combo')).toBe(true)
  })

  it('낮은 설렘 게이지로도 모든 일반 엔딩을 볼 수 있다', () => {
    // 속마음/급발진/특별 선택지를 쓰지 않는 가장 기본 경로에서도 엔딩에 도달해야 한다
    let s: Sim = { heart: 0, flags: [] }
    let id = START_ID
    for (let i = 0; i < 500; i++) {
      id = resolveBranch(id, s)
      const n = NODES[id]
      s = applySim(s, n.effects)
      if (n.ending) return
      if (n.choices) {
        const c = visibleChoices(n, s)[0]
        s = applySim(s, c.effects)
        id = c.next
      } else if (n.minigame) id = n.minigame.next.a
      else id = n.next!
    }
    throw new Error('엔딩에 도달하지 못함')
  })
})
