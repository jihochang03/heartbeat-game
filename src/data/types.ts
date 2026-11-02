export type SinaeFace = 'smile' | 'laugh' | 'excited' | 'sly' | 'tender' | 'surprised' | 'shy'
export type YoungFace = 'smile' | 'laugh' | 'flutter' | 'flustered' | 'rush' | 'shy' | 'tender'
export type BgId = 'home' | 'street' | 'alley' | 'shop' | 'sunset' | 'doorstep'
/** S=시내, Y=영, N=내레이션(영의 시점) */
export type Who = 'S' | 'Y' | 'N'
export type Fx = 'hearts' | 'shake' | 'glow' | 'confetti'

export interface Cond {
  minHeart?: number
  maxHeart?: number
  /** 모두 가지고 있어야 함 */
  flags?: string[]
  /** 하나라도 있으면 통과 */
  anyFlags?: string[]
  /** 하나라도 있으면 실패 */
  notFlags?: string[]
}

export interface Effects {
  heart?: number
  flags?: string[]
  collect?: string[]
  /** 영이 시내에게 '반한 횟수'를 +1 */
  fall?: boolean
}

export interface Choice {
  text: string
  next: string
  effects?: Effects
  /** 조건을 만족해야 나타남 */
  require?: Cond
  /** 설렘 게이지가 높아져야 나타나는 특별 선택지 (하트 표시) */
  special?: boolean
  /** 한 줄 짧은 로그용 라벨 */
}

export interface Thought {
  who: 'young' | 'sinae'
  id: string
  lines: string[]
  collect?: string[]
  flags?: string[]
}

export interface Branch {
  when: Cond
  to: string
}

export interface MiniGame {
  kind: 'peach'
  /** a: 가장 예쁜 / b: 가장 달아 보이는 / c: 영이 아까부터 보던 */
  next: { a: string; b: string; c: string }
}

export interface StoryNode {
  id: string
  ep: number
  who: Who
  text: string
  next?: string
  choices?: Choice[]
  branch?: Branch[]
  bg?: BgId
  s?: SinaeFace
  y?: YoungFace
  effects?: Effects
  fx?: Fx
  thought?: Thought
  /** 영의 급발진 버튼. 누르면 rush.next 로, 안 누르고 넘기면 next 로 */
  rush?: { next: string; label?: string }
  minigame?: MiniGame
  /** 이 노드 다음에 엔딩 화면으로 이동 */
  ending?: string
  /** 에피소드 타이틀 카드 */
  card?: { title: string; sub: string }
  /** 이스터에그 기록 */
  egg?: string
  /** '가장 설렜던 순간'으로 인용할 문구 (없으면 대사를 사용) */
  moment?: string
}

export interface EndingDef {
  id: string
  no: string
  title: string
  summary: string
  epilogue: string
  quote: string
  scene: 'hands' | 'verdict' | 'name' | 'peach' | 'same' | 'tomorrow'
  secret?: boolean
  hint?: string
}

export interface CollectDef {
  id: string
  title: string
  quote: string
  hint: string
  icon: string
}
