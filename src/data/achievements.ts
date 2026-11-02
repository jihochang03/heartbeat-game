import type { CollectDef } from './types'

/** 설렘 도감. id 는 스토리 노드의 effects.collect / thought.collect 와 일치해야 한다. */
export const COLLECTIBLES: CollectDef[] = [
  { id: 'deadEnd', title: '막다른 길도 계획', quote: '막다른 길 구경하러 온 거야. 원래 계획이었어.', hint: '길을 찾던 시내', icon: 'signpost' },
  { id: 'shoelace', title: '언니가 신발끈을 묶어줬다', quote: '가만있어. 이러다 밟고 넘어져.', hint: '쪼그려 앉은 시내', icon: 'footprints' },
  { id: 'medicine', title: '약 먹을 시간을 기억해 줬다', quote: '영아, 약 먹었어?', hint: '길 위에서의 물병', icon: 'pill' },
  { id: 'ourYoung', title: '우리 영이라고 불렀다', quote: '우리 영이니까.', hint: '왜 이렇게 잘해주냐고 물으면', icon: 'heart' },
  { id: 'pickedPeach', title: '복숭아를 골라줬다', quote: '그거 맞지? 아까부터 계속 보던 거.', hint: '복숭아 가게에서', icon: 'peach' },
  { id: 'hair', title: '머리카락을 넘겨줬다', quote: '가만 있어봐. 바람이 심하네.', hint: '돌아오는 길의 바람', icon: 'wind' },
  { id: 'firstHand', title: '먼저 손을 잡았다', quote: '언니, 손 좀 줘봐요.', hint: '영이 먼저', icon: 'hand' },
  { id: 'rush', title: '영이 급발진했다', quote: '좋아서 그러죠!', hint: '작은 하트 버튼, 혹은 용기', icon: 'zap' },
  { id: 'fullName', title: '성시내라고 불렀다', quote: '…풀네임?', hint: '평소엔 부르지 않는 이름', icon: 'badge' },
  { id: 'sinaeFlustered', title: '시내가 당황했다', quote: '영아? 영아, 너무 가까운데…', hint: '시내도 가끔은 말문이 막힌다', icon: 'blush' },
  { id: 'sinaeHeart', title: '시내의 진심을 발견했다', quote: '좋아하는 사람이 좋아하는 건, 자꾸 외워진다.', hint: '시내의 속마음 열람', icon: 'sparkles' },
  { id: 'comboEgg', title: '나 아무한테나 안 그래', quote: '나 아무한테나 이렇게 안 해. 알지?', hint: '특정 대화의 조합', icon: 'key' },
]

export const COLLECT_MAP: Record<string, CollectDef> = Object.fromEntries(COLLECTIBLES.map((c) => [c.id, c]))

export const EGGS: { id: string; title: string; hint: string }[] = [
  { id: 'titlePeach', title: '타이틀의 복숭아', hint: '타이틀 화면의 복숭아를 계속 눌러본다' },
  { id: 'tapSinae', title: '언니를 콕콕', hint: '이야기 중 시내를 여러 번 눌러본다' },
  { id: 'tapYoung', title: '영을 콕콕', hint: '이야기 중 영을 여러 번 눌러본다' },
  { id: 'peachOrder', title: '복숭아 삼각형', hint: '복숭아를 왼쪽→오른쪽→가운데 순서로 만져본다' },
  { id: 'heart100', title: '성시내 유죄 판결', hint: '영의 심장 상태를 100까지 올린다' },
  { id: 'combo', title: '아무한테나 안 그래', hint: '1화와 2화에서 특정 선택을 조합한다' },
  { id: 'allEndings', title: '복숭아 왕관', hint: '모든 엔딩을 수집한다' },
]
