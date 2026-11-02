import { B, build, N, S, Y } from '../build'

/** EPISODE 03. 복숭아보다 언니가 더 좋은데 */
export const ep3 = build(3, [
  N('파란 지붕 가게는 정말로 있었다. 큰 나무 옆에, 복숭아가 산처럼 쌓여 있었다.', {
    bg: 'shop',
    s: 'excited',
    y: 'smile',
    card: { title: 'EPISODE 03', sub: '복숭아보다 언니가 더 좋은데' },
  }),
  S('봤지? 내가 뭐랬어, 있다고 했잖아!', { s: 'excited' }),
  Y('네, 한 시간 걸렸지만요.', { y: 'laugh' }),
  S('도착이 중요한 거야. 과정은 모험이고.', { s: 'excited' }),
  N('언니는 가게 앞에 서자마자 복숭아 하나하나에 코를 가까이 댔다. 복숭아와 인사라도 나누는 것처럼.'),
  S('이건 향이 좋고, 이건 말랑하고, 이건… 잠깐, 이건 복숭아가 아닌 것 같은데?', { s: 'surprised' }),
  Y('천도복숭아예요.', { y: 'laugh' }),
  S('아. 복숭아 가족이구나.', { s: 'smile' }),
  N('언니는 한참 고민하더니 복숭아 하나를 골라 두 손으로 들어 올렸다. 눈이 복숭아보다 반짝였다.', {
    y: 'tender',
    thought: {
      who: 'young',
      id: 'e3_young',
      lines: [
        '복숭아를 고르는 언니는 진지하다. 눈썹이 모이고, 코끝이 복숭아에 닿을 듯 가까워진다.',
        '고른 걸 내려놓았다가, 다시 집었다가, 또 내려놓는다. 어차피 처음 거로 돌아올 거다.',
        '나는 복숭아를 보고 있지 않다. 복숭아는 내일도 있다.',
      ],
    },
  }),
  S('영아, 이거 봐. 진짜 예쁘지?', { s: 'excited' }),
  Y('언니가 더 예쁜데.', { y: 'tender' }),
  S('뭐?', { s: 'surprised' }),
  Y('언니가 더 예쁘다고요.', { y: 'tender' }),
  S('얘가 오늘 왜 이래.', { s: 'sly' }),
  Y('진짠데.', { y: 'smile' }),
  S('그럼 복숭아 말고 언니만 볼래?', {
    s: 'sly',
    id: 'e3_tease',
    rush: { next: 'e3_rush' },
  }),
  Y('네.', { y: 'smile', effects: { fall: true, heart: 5 }, next: 'e3_branch' }),

  // 급발진: 성시내
  Y('…언니, 아니. 성시내.', { id: 'e3_rush', y: 'rush', fx: 'shake' }),
  S('…풀네임?', { s: 'surprised' }),
  Y('나 지금 진짜로 하는 말이에요. 복숭아보다 성시내가 더 좋다고요.', {
    y: 'rush',
    effects: { collect: ['rush', 'fullName'], heart: 10 },
  }),
  N('시내가 복숭아를 든 채로 굳어버렸다. 평소에 한 번도 부르지 않던 이름이 이렇게 큰 소리를 낼 줄은 몰랐다.', { s: 'shy' }),
  S('알았어. 알았으니까 그, 그렇게 보지 마.', {
    s: 'shy',
    effects: { collect: ['sinaeFlustered'], fall: true },
    next: 'e3_branch',
  }),

  B(
    'e3_branch',
    [
      { when: { flags: ['honest'] }, to: 'e3_h' },
      { when: { flags: ['handHeld'] }, to: 'e3_m' },
    ],
    'e3_l',
  ),

  // 이전 선택에 따른 시내의 반응
  S('…오늘 우리 영이가 정말 작정을 했네.', { id: 'e3_h', s: 'tender', effects: { heart: 5 } }),
  N('아까 길에서 한 말 때문일까. 언니는 이번엔 도망치지 않았다. 복숭아를 내려놓고 내 쪽으로 몸을 조금 기울였다.', {
    y: 'flutter',
  }),
  S('그래도 복숭아는 사야지. 언니 얼굴은 집에 가서 실컷 봐.', { s: 'sly' }),
  Y('…언니, 그 말은 반칙이에요.', { y: 'flustered' }),
  S('먼저 시작한 건 영이야.', { s: 'laugh', next: 'e3_join' }),

  S('손은 잡아놓고 이제는 말로도 그러는 거야?', { id: 'e3_m', s: 'shy', effects: { heart: 5 } }),
  Y('…제가 그랬나요.', { y: 'shy' }),
  S('그랬지. 영이가.', { s: 'shy' }),
  N('언니가 복숭아를 든 손으로 얼굴을 가렸다. 복숭아와 언니 얼굴 중에 어느 쪽이 더 붉은지 알 수 없었다.', { y: 'flutter' }),
  S('…복숭아 고르자. 고르자, 응.', { s: 'shy', next: 'e3_join' }),

  S('어, 어…', { id: 'e3_l', s: 'surprised', effects: { heart: 5 } }),
  N('언니가 들고 있던 복숭아가 어색하게 흔들렸다. 말문이 막힌 언니를 보는 건 처음인 것 같았다.', { y: 'flutter' }),
  S('복숭아! 복숭아 고르자. 고르자, 응.', { s: 'shy' }),
  Y('네. 고르죠.', { y: 'laugh', next: 'e3_join' }),

  // 복숭아 고르기
  N('가게 아주머니가 웃으며 복숭아 세 개를 앞에 놓아 주셨다. 오늘 제일 좋은 것들이라고 했다.', {
    id: 'e3_join',
    bg: 'shop',
    s: 'smile',
    y: 'smile',
  }),
  S('자, 영이가 하나 골라. 영이가 고른 걸로 사자.', { s: 'excited' }),
  N('하나는 흠 하나 없이 곱게 붉은 복숭아. 하나는 향만으로도 달 것 같은 복숭아. 마지막 하나는, 아까부터 자꾸 눈이 가던 조금 삐뚤어진 복숭아였다.'),
  N('내가 고른 건—', { minigame: { kind: 'peach', next: { a: 'e3_pa', b: 'e3_pb', c: 'e3_pc' } } }),

  S('역시 영이 눈이 높아~ 이건 사진부터 찍어야 돼.', { id: 'e3_pa', s: 'excited', effects: { collect: ['pickedPeach'], flags: ['peachA'], heart: 5 } }),
  N('언니는 복숭아를 들고 한참 각도를 돌려 보더니 나에게 내밀었다.'),
  S('예쁜 건 예쁜 거랑 어울린다더니, 영이가 예쁜 걸 골랐네.', { s: 'sly' }),
  Y('그거 제가 예쁘다는 뜻이에요?', { y: 'laugh' }),
  S('해석은 자유.', { s: 'laugh', next: 'e3_join2' }),

  S('오, 달아 보여? 이거 진짜 달겠다. 영이 단 거 좋아하잖아. 시큼한 건 인상 쓰고.', {
    id: 'e3_pb',
    s: 'laugh',
    effects: { collect: ['pickedPeach'], flags: ['peachB'], heart: 10, fall: true },
  }),
  Y('…제가 인상 쓰는 것도 봤어요?', { y: 'flustered' }),
  S('내가 모를 줄 알았어?', {
    s: 'tender',
    thought: {
      who: 'sinae',
      id: 'e3_sinae_b',
      lines: [
        '영이는 단 걸 좋아한다. 시큼한 복숭아를 먹으면 코끝을 살짝 찡그린다.',
        '작년 여름에 먹은 복숭아 이야기를 영이는 아마 기억 못 할 거다. 나는 기억한다.',
        '좋아하는 사람이 좋아하는 건, 이상하게 자꾸 외워진다.',
      ],
      collect: ['sinaeHeart'],
      flags: ['sinaeThought', 'remembered'],
    },
  }),
  N('언니가 아무렇지 않게 복숭아를 봉지에 담았다. 아무렇지 않은 건 얼굴뿐이었다.', { y: 'flutter', next: 'e3_join2' }),

  S('그거 맞지? 아까부터 계속 보던 거.', { id: 'e3_pc', s: 'tender', effects: { collect: ['pickedPeach'], flags: ['peachC'], heart: 15, fall: true } }),
  Y('…봤어요?', { y: 'flustered' }),
  S('응, 그 삐뚤어진 거. 네 눈이 계속 거기 가 있더라.', {
    s: 'smile',
    thought: {
      who: 'sinae',
      id: 'e3_sinae_c',
      lines: [
        '삐뚤어진 복숭아를 영이가 계속 보고 있었다.',
        '예쁜 것보다 어딘가 서툰 걸 먼저 보는 사람이라는 걸, 나는 안다.',
        '내가 그걸 알고 있다는 걸 영이가 알면, 어떤 얼굴을 할까.',
        '…아직은 비밀로 하자.',
      ],
      collect: ['sinaeHeart'],
      flags: ['sinaeThought', 'remembered'],
    },
  }),
  N('언니는 제일 예쁜 걸 두고, 그 복숭아를 두 손으로 조심스레 들었다.', { y: 'flutter' }),
  S('얘가 제일 좋아. 모양은 제멋대로인데 한 입 먹으면 제일 달 것 같잖아.', { s: 'smile' }),
  Y('…언니 닮았네요.', { y: 'laugh' }),
  S('나 닮았다고? 삐뚤어졌다는 거야?', { s: 'surprised' }),
  Y('제멋대로라는 거요.', { y: 'laugh' }),
  S('그건 맞다.', { s: 'laugh', next: 'e3_join2' }),

  // 봉지 들기
  N('복숭아 값을 치르고 봉지를 받자, 언니가 갑자기 진지한 얼굴이 되었다.', { id: 'e3_join2', s: 'smile', y: 'smile' }),
  S('문제가 생겼어.', { s: 'surprised' }),
  Y('뭔데요?', { y: 'smile' }),
  S('이 봉지, 누가 들 거냐.', { s: 'sly' }),
  N('나는—', {
    choices: [
      { text: '"제가 들게요. 언니는 손 비워요."', next: 'e3_d1', effects: { heart: 5, flags: ['handFree'] } },
      { text: '"같이 들어요."', next: 'e3_d2', effects: { heart: 5 } },
      { text: '"언니가 들어줘요."', next: 'e3_d3', effects: { heart: 5 } },
    ],
  }),

  S('손 비우라는 건 다른 뜻이 있나?', { id: 'e3_d1', s: 'sly' }),
  Y('그, 그런 뜻 아닌데요.', { y: 'flustered' }),
  S('아닌가~', { s: 'laugh' }),
  N('봉지를 든 내 옆에서 언니의 빈 손이 괜히 흔들렸다.', { y: 'shy', next: 'e3_end' }),

  S('복숭아 한 봉지를 둘이서 드는 사람은 처음 봐.', { id: 'e3_d2', s: 'laugh' }),
  Y('저희가 처음이면 되죠.', { y: 'laugh' }),
  N('비닐봉지 손잡이 하나씩. 우리 사이에서 복숭아가 흔들흔들 따라왔다.', { y: 'tender', next: 'e3_end' }),

  S('맡겨~ 나 힘세.', { id: 'e3_d3', s: 'excited' }),
  N('봉지를 받아 든 언니의 몸이 반 뼘쯤 기울었다.', { y: 'laugh' }),
  S('…무겁네.', { s: 'surprised' }),
  Y('힘세다면서요.', { y: 'laugh' }),
  S('힘센 사람도 복숭아 앞에서는 겸손해지는 법이야.', { s: 'sly', next: 'e3_end' }),

  N('해가 조금씩 기울고 있었다.', { id: 'e3_end', s: 'smile', y: 'smile' }),
  S('이제 돌아가자. 오는 길은 내가 진짜 잘 알아.', { s: 'excited' }),
  Y('아까도 그렇게 말했잖아요.', { y: 'laugh' }),
  S('이번엔 진짜야. 아까는 가짜였고.', { s: 'sly', next: 'e4_start' }),
])
