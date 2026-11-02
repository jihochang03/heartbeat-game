import type { StoryNode } from './types'
import { ep1 } from './episodes/ep1'
import { ep2 } from './episodes/ep2'
import { ep3 } from './episodes/ep3'
import { ep4 } from './episodes/ep4'
import { ep5 } from './episodes/ep5'

export const ALL_NODES: StoryNode[] = [...ep1, ...ep2, ...ep3, ...ep4, ...ep5]
export const NODES: Record<string, StoryNode> = Object.fromEntries(ALL_NODES.map((n) => [n.id, n]))
export const START_ID = 'e1_start'

export const EPISODES = [
  { no: 1, title: '언니, 복숭아 먹고 싶어요', start: 'e1_start' },
  { no: 2, title: '영아, 약 먹었어?', start: 'e2_start' },
  { no: 3, title: '복숭아보다 언니가 더 좋은데', start: 'e3_start' },
  { no: 4, title: '언니, 손 좀 줘봐요', start: 'e4_start' },
  { no: 5, title: '다음에도 나랑 가요', start: 'e5_start' },
]

export const HEART_LEVELS = [
  { min: 0, label: '평정심 유지 중' },
  { min: 30, label: '언니가 자꾸 이러면 곤란한데' },
  { min: 60, label: '심장이 조금 위험합니다' },
  { min: 80, label: '영이 급발진 직전' },
  { min: 100, label: '성시내 유죄 판결' },
]
export const heartLabel = (h: number) => [...HEART_LEVELS].reverse().find((l) => h >= l.min)!.label
