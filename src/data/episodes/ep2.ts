import { build, N, S, Y } from '../build'

/** EPISODE 02. 영아, 약 먹었어? */
export const ep2 = build(2, [
  N('파란 지붕 가게는 아직 보이지 않았다. 대신 앞서 걷던 언니가 손목시계를 한 번 보더니, 나를 돌아보았다.', {
    bg: 'street',
    s: 'smile',
    y: 'smile',
    card: { title: 'EPISODE 02', sub: '영아, 약 먹었어?' },
  }),
  S('영아, 약 먹었어?', { s: 'tender' }),
  Y('아, 아직이요.', { y: 'flustered' }),
  S('그럴 줄 알았지.', { s: 'smile' }),
  N('나는—', {
    id: 'e2_q',
    choices: [
      { text: '"언니는 어떻게 알았어요?"', next: 'e2_q1' },
      { text: '"알람 맞춰놨거든요? 무음이라 못 들었지만."', next: 'e2_q2' },
      { text: '"언니가 있으니까 안 외워도 되잖아요."', next: 'e2_q3', effects: { heart: 5, flags: ['relyOn'] } },
    ],
  }),
  Y('언니는 어떻게 알았어요?', { id: 'e2_q1', y: 'smile' }),
  S('네가 맨날 까먹으니까.', { s: 'smile', next: 'e2_water' }),
  Y('알람 맞춰놨거든요? 무음이라 못 들었지만.', { id: 'e2_q2', y: 'laugh' }),
  S('그건 알람이 아니라 잠꼬대야. 그러니까 내가 대신 기억하는 거지.', { s: 'laugh', next: 'e2_water' }),
  Y('언니가 있으니까 안 외워도 되잖아요.', { id: 'e2_q3', y: 'smile' }),
  S('…나 믿고 까먹는 거야?', { s: 'surprised' }),
  S('좋아. 그럼 계속 내가 기억할게.', { s: 'tender', next: 'e2_water' }),
  Y('…그럼 물은요?', { id: 'e2_water', y: 'smile', s: 'smile' }),
  S('여기 있지.', { s: 'smile' }),
  N('언니의 가방에서 물병이 나왔다. 아까부터 가방이 불룩하더니, 복숭아 담을 장바구니가 아니라 이거였다.'),
  Y('언니가 챙겨왔어요?', { y: 'flutter' }),
  S('응. 선생님이 알려준 시간에 맞춰서 먹어야지. 자, 얼른 먹어.', { s: 'tender' }),
  N('나는 가방에서 약을 꺼내 처방받은 대로 입에 넣었다. 언니는 물병 뚜껑을 열어 내 손에 쥐여 주었다.', {
    y: 'flutter',
    moment: '"영아, 약 먹었어?"',
    effects: { heart: 15, collect: ['medicine'], fall: true },
    thought: {
      who: 'young',
      id: 'e2_young',
      lines: [
        '약 먹는 시간은 내가 제일 자주 잊는다.',
        '그런데 언니는 한 번도 잊은 적이 없다. 알람도 아니고 메모도 아니고, 그냥 기억하고 있다.',
        '물은 차갑지 않고 미지근했다. 내가 찬물을 싫어하는 걸 알아서 일부러 그런 거라는 건, 한 모금 마시고서야 알았다.',
        '그렇게까지 알 거면, 내 마음도 좀 알아주면 좋겠는데.',
        '…아니, 알면 곤란하다.',
      ],
    },
  }),
  N('언니는 내가 삼키는 동안 한마디도 하지 않았다. 일 분에 열 마디를 하는 사람이.'),
  S('괜찮아? 속 불편한 데는 없지?', { s: 'tender' }),
  Y('…없어요.', { y: 'shy' }),
  S('그럼 됐다.', { s: 'smile' }),
  N('언니는 뚜껑을 닫은 물병을 받아 가방에 넣고, 열려 있던 내 가방 지퍼까지 닫아주었다.', { y: 'tender' }),
  Y('언니는 왜 이렇게 잘해줘요?', { y: 'tender' }),
  S('우리 영이니까.', {
    s: 'tender',
    y: 'flutter',
    effects: { heart: 15, collect: ['ourYoung'], fall: true },
  }),
  N('별일 아니라는 듯한 말투였다. 언니는 벌써 물병 위치를 가방 안에서 고쳐 넣고 있었다. 나만 길 한복판에서 심장이 이상했다.', {
    y: 'flustered',
  }),
  N('나는—', {
    id: 'e2_choice',
    choices: [
      {
        text: '"언니, 나 언니 좋아해요."',
        next: 'e2_a',
        effects: { heart: 25, flags: ['honest'], collect: ['rush'], fall: true },
      },
      {
        text: '"언니는 원래 다 이렇게 챙겨줘요?"',
        next: 'e2_b',
        effects: { heart: 15, flags: ['askAll'], fall: true },
      },
      {
        text: '말없이 시내의 손을 잡는다.',
        next: 'e2_c',
        effects: { heart: 20, flags: ['handHeld', 'youngFirstHand'], collect: ['firstHand'], fall: true },
      },
    ],
  }),

  // a. 직진
  N('말이 입 밖으로 나가고 나서야 정신이 들었다.', { id: 'e2_a', y: 'rush', fx: 'shake' }),
  S('…어?', { s: 'surprised' }),
  Y('그냥, 말하고 싶어서요. 갑자기 해서 미안해요.', { y: 'rush' }),
  S('미안할 건 아니고…', { s: 'shy' }),
  N('언니가 물병 뚜껑을 괜히 한 번 더 돌려 닫았다. 이미 닫혀 있는 뚜껑을.', { y: 'flustered' }),
  S('나도 좋아해. 아니, 그게, 그러니까 영이를. 당연히.', { s: 'shy' }),
  S('자, 복숭아! 복숭아 사러 가야지! 이쪽이다!', { s: 'excited' }),
  N('언니는 물병을 마치 지도처럼 치켜들고 앞서 걸었다. 방향은 반대였다.', { y: 'laugh' }),
  Y('언니, 반대쪽이에요.', { y: 'laugh' }),
  S('…알아. 일부러야.', { s: 'sly', next: 'e2_join' }),

  // b. 질문
  S('다? 누구한테?', { id: 'e2_b', s: 'surprised' }),
  Y('그냥… 아무한테나요.', { y: 'shy' }),
  S('아무한테나 약 시간 외우고 물 챙기고 그러면, 내 가방이 터져.', { s: 'sly' }),
  S('너니까 하는 거지.', { s: 'tender', y: 'flutter' }),
  N('그 말을 어떻게 받아야 할지 몰라서 나는 복숭아 가게가 있을 쪽으로 시선을 돌렸다. 가게는 없었다.'),
  Y('…그럼 저한테만 해요.', { y: 'rush' }),
  S('그럴 거야. 그러려고 챙긴 건데.', { s: 'laugh', next: 'e2_join' }),

  // c. 손잡기
  S('…영아?', { id: 'e2_c', s: 'surprised' }),
  N('나는 대답하지 않고 언니의 손을 잡고 있었다. 생각보다 따뜻한 손이었다.', { y: 'shy' }),
  S('추워?', { s: 'smile' }),
  Y('아니요.', { y: 'shy' }),
  S('그럼 더워서 그래?', { s: 'smile' }),
  Y('…그냥 잡고 싶어서요.', { y: 'shy' }),
  S('그래.', { s: 'tender' }),
  N('언니는 더 묻지 않고 손을 맞잡아 주었다. 물병을 들고 있던 손이라 조금 차가웠고, 그게 이상하게 오래 기억에 남았다.', {
    y: 'flutter',
    next: 'e2_join',
  }),

  // 합류
  N('어느새 약 먹는 일은 끝났고, 언니의 걸음은 다시 신나 있었다.', { id: 'e2_join', s: 'smile', y: 'smile' }),
  Y('언니, 복숭아 가게는요?', { y: 'smile' }),
  S('맞다, 복숭아! 어, 저기 파란 지붕!', { s: 'excited' }),
  N('정말로 길 끝에 파란 지붕이 보였다. 언니의 감이 오늘 처음으로 맞은 순간이었다.', { y: 'laugh', next: 'e3_start' }),
])
