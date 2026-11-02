import { NODES } from '../data'
import type { Choice, Cond, Effects, StoryNode } from '../data/types'

/** 스토리 진행에 영향을 주는 최소 상태 (UI/저장과 무관한 순수 데이터) */
export interface Sim {
  heart: number
  flags: string[]
}

export const clampHeart = (n: number) => Math.max(0, Math.min(100, n))

export function evalCond(c: Cond | undefined, s: Sim): boolean {
  if (!c) return true
  if (c.minHeart !== undefined && s.heart < c.minHeart) return false
  if (c.maxHeart !== undefined && s.heart > c.maxHeart) return false
  if (c.flags && !c.flags.every((f) => s.flags.includes(f))) return false
  if (c.anyFlags && !c.anyFlags.some((f) => s.flags.includes(f))) return false
  if (c.notFlags && c.notFlags.some((f) => s.flags.includes(f))) return false
  return true
}

export function applySim(s: Sim, e: Effects | undefined): Sim {
  if (!e) return s
  const flags = e.flags ? Array.from(new Set([...s.flags, ...e.flags])) : s.flags
  return { heart: clampHeart(s.heart + (e.heart ?? 0)), flags }
}

export function visibleChoices(node: StoryNode, s: Sim): Choice[] {
  return (node.choices ?? []).filter((c) => evalCond(c.require, s))
}

/** 보이지 않는 분기 노드를 따라가 실제로 표시될 노드 id 를 구한다. */
export function resolveBranch(id: string, s: Sim): string {
  let cur = NODES[id]
  let guard = 0
  while (cur && cur.branch && guard++ < 20) {
    const hit = cur.branch.find((b) => evalCond(b.when, s))
    const nextId = hit ? hit.to : cur.next
    if (!nextId) break
    cur = NODES[nextId]
  }
  return cur ? cur.id : id
}

/** 시크릿 엔딩 해금 조건을 만족하는지 (UI 힌트용) */
export const SECRET_COND: Cond = { minHeart: 60, flags: ['honest', 'sinaeThought'] }
