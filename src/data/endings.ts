import type { EndingDef } from './types'

export const ENDINGS: EndingDef[] = [
  {
    id: 'E1',
    no: 'ENDING 01',
    title: '언니 손은 내 거',
    summary: '현관 앞까지, 그리고 현관 안까지 이어진 손.',
    epilogue:
      '두 사람은 현관문 앞에서 한참 동안 손을 놓지 못했다. 복숭아가 먼저 지쳐서 혼자 냉장고로 들어갔다는 후문이 전해진다. 다음 날, 영의 오른손에는 아직 언니의 손 온도가 남아 있었다.',
    quote: '언니 손은 영이 거.',
    scene: 'hands',
  },
  {
    id: 'E2',
    no: 'ENDING 02',
    title: '성시내 유죄',
    summary: '다정함이 죄라면, 오늘의 판결은 만장일치.',
    epilogue:
      '재판은 즉시 종결되었다. 피고인 성시내는 상소하지 않았고, 형량은 「복숭아 같이 먹기(평생)」으로 확정되었다. 피고인은 판결문을 들고 한참 웃었다고 한다. 영은 그 모습을 증거로 채택했다.',
    quote: '무죄 판결은 없어요. 처음부터 없었어요.',
    scene: 'verdict',
  },
  {
    id: 'E3',
    no: 'ENDING 03',
    title: '우리 영이',
    summary: '네 글자에 담긴, 아주 오래 연습한 다정함.',
    epilogue:
      '그날 밤, 영은 휴대폰 알람 목록에서 자기 이름이 붙은 알람을 발견했다. 이름은 「우리 영이 약 시간」. 영은 그 알람을 지우지 않기로 했다. 평생.',
    quote: '우리 영이.',
    scene: 'name',
  },
  {
    id: 'E4',
    no: 'ENDING 04',
    title: '복숭아보다 달아',
    summary: '계단에 나란히 앉아 반으로 가른 복숭아 한 알.',
    epilogue:
      '복숭아는 달았다. 그리고 그날 먹은 복숭아 중 제일 달았던 건, 사실 복숭아가 아니었다. 두 사람은 끝까지 그 이야기를 하지 않았지만, 서로가 알고 있다는 것도 알고 있었다.',
    quote: '…둘 다요.',
    scene: 'peach',
  },
  {
    id: 'E5',
    no: 'ENDING 05',
    title: '언니도 똑같아',
    summary: '영이 몰랐던, 시내의 하루.',
    epilogue:
      '시내의 일기장에는 오늘 날짜 아래 딱 한 줄이 적혀 있다. 「영이가 하루 종일 귀여웠다. 나는 하루 종일 모른 척했다. 내일도 모른 척해야지.」 하지만 그 한 줄은 이미 영이 몰래 읽고 난 뒤였다.',
    quote: '언니도 똑같아. 네가 설레는 만큼.',
    scene: 'same',
  },
  {
    id: 'E6',
    no: 'SECRET ENDING 06',
    title: '내일도 같이 가자',
    summary: '먼저 솔직해진 영과, 도망치지 않은 시내.',
    epilogue:
      '다음 날, 두 사람은 정말로 수박을 사러 갔다. 가게는 또 찾지 못했고, 또 막다른 길이었고, 시내는 또 「계획이었다」고 말했다. 영은 오늘도 세다가 놓쳤다. 몇 번째 반했는지.',
    quote: '내일도 같이 가자.',
    scene: 'tomorrow',
    secret: true,
    hint: '영이 먼저 솔직해지고, 언니의 속마음을 발견했다면. 그리고 설렘 게이지가 충분히 올랐다면…',
  },
]

export const ENDING_MAP: Record<string, EndingDef> = Object.fromEntries(ENDINGS.map((e) => [e.id, e]))
