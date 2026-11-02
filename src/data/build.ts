import type { StoryNode, Who } from './types'

export type Raw = Omit<StoryNode, 'id' | 'ep' | 'who' | 'text'> & {
  id?: string
  who: Who
  text: string
}
type Opts = Omit<Raw, 'who' | 'text'>

/** 시내(S) / 영(Y) / 내레이션(N) 대사 헬퍼 */
export const S = (text: string, o: Opts = {}): Raw => ({ who: 'S', text, ...o })
export const Y = (text: string, o: Opts = {}): Raw => ({ who: 'Y', text, ...o })
export const N = (text: string, o: Opts = {}): Raw => ({ who: 'N', text, ...o })
/** 화면에 보이지 않는 분기 노드 */
export const B = (id: string, branch: StoryNode['branch'], next: string): Raw => ({
  who: 'N',
  text: '',
  id,
  branch,
  next,
})

/**
 * 순서대로 적은 대사 목록을 노드로 변환한다.
 * - id 를 안 적으면 `e{ep}_{번호}` 로 자동 부여 (첫 노드는 `e{ep}_start`)
 * - next/choices/branch/ending/minigame 이 없으면 다음 노드로 자동 연결
 */
export function build(ep: number, raws: Raw[]): StoryNode[] {
  const ids = raws.map((r, i) =>
    r.id ?? (i === 0 ? `e${ep}_start` : `e${ep}_${String(i + 1).padStart(2, '0')}`),
  )
  return raws.map((r, i) => {
    const { id: _ignored, ...rest } = r
    const node: StoryNode = { ...rest, id: ids[i], ep }
    const terminal = node.next || node.choices || node.branch || node.ending || node.minigame
    if (!terminal && i + 1 < raws.length) node.next = ids[i + 1]
    return node
  })
}
