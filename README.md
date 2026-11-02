# 🍑 복숭아를 사러 가는 길 (A Walk for Peaches)

> 복숭아를 사러 갔을 뿐인데, 오늘도 언니를 좋아하게 됐다.

뮤지컬 〈하트비트〉의 **성시내**와 **영**을 주인공으로 한 비공식 팬메이드 인터랙티브 로맨스 웹게임입니다.
영의 시점에서 시내와 함께 복숭아를 사러 가는 하루(약 5~10분)를 플레이하며, 선택에 따라 달라지는 반응과 6개의 엔딩을 수집합니다.

외부 서버·유료 API 없이 동작하는 **정적 웹앱**입니다. 이미지·사운드 파일 없이 전부 자체 제작 SVG / WebAudio 로 동작합니다.

## 실행 방법

```bash
npm install
npm run dev        # 개발 서버 (http://localhost:5173)
npm run build      # 타입 검사 + 프로덕션 빌드 (dist/)
npm run preview    # 빌드 결과 미리보기
npm test           # 스토리 분기 자동 검증
```

Node.js 18 이상 권장 (개발 환경: Node 24).

## 배포

`vite.config.ts` 의 `base: './'` 설정 덕분에 `dist/` 폴더를 그대로 올리면 어디서든 동작합니다.

- **Vercel**: 저장소를 import → Framework `Vite` 자동 인식 (Build `npm run build`, Output `dist`)
- **GitHub Pages**: `dist/` 를 `gh-pages` 브랜치 또는 Pages 소스로 지정

## 기능

| 기능 | 설명 |
| --- | --- |
| 타이틀 | START / CONTINUE / 설렘 도감 / 설정, 복숭아를 반복 클릭하면 숨겨진 대화 |
| 비주얼 노벨 엔진 | 타이핑 효과(탭하면 즉시 완료), 선택지 분기, 표정·배경 전환, 자동 진행, 대화 기록 |
| 영의 심장 상태 | 0~100 게이지, 5단계 상태 문구, 높아지면 특별 선택지 등장 (**낮아도 모든 일반 엔딩 가능**) |
| 급발진 버튼 | 특정 장면에 하트 버튼 등장. 누르면 영이 삼키던 말을 해버림 (장면마다 시내의 반응이 다름) |
| 속마음 열람실 | 에피소드마다 영의 속마음, 복숭아 고르기 이후에는 **시내의 속마음**도 해금 |
| 복숭아 고르기 | 3종 복숭아 중 선택 (정답 없음, 모든 선택에 반응) |
| 설렘 도감 | 장면 12종 / 엔딩 6종 / 숨겨진 대사 7종. 수집 전에는 실루엣과 `?` |
| 엔딩 | 5종 + 시크릿 1종, 엔딩별 일러스트·후일담 |
| 결과 카드 | 반한 횟수·가장 설렜던 순간·대표 대사가 담긴 1080×1350 PNG 저장 / 공유(모바일) |
| 저장 | localStorage 자동 저장 → CONTINUE. 도감·엔딩·설정은 새 게임을 해도 보존 |
| 접근성 | 키보드 조작, 포커스 표시, 글자 크기·애니메이션 줄이기(OS 설정 연동) |

### 키보드

`Space`/`Enter` 다음 · `1`~`4` 선택지 · `A` 자동 진행 · `L` 대화 기록 · `Esc` 메뉴

### 시크릿 엔딩 「내일도 같이 가자」 해금 조건

설렘 게이지만으로는 열리지 않습니다. 아래를 **모두** 충족해야 5화 마지막에 선택지가 나타납니다.

1. 영이 먼저 솔직해지기 (2화에서 고백 선택)
2. 시내의 속마음 발견하기 (3화 복숭아 고르기 이후 속마음 열람)
3. 영의 심장 상태 60 이상

### 이스터에그 (도감 3번째 탭에서 확인)

타이틀 복숭아 7번 · 시내/영 5번 콕콕 · 복숭아 고르기에서 왼쪽→오른쪽→가운데 · 게이지 100 · 1·2화 특정 선택 조합 · 모든 엔딩 수집

## 폴더 구조

```
src/
  components/   TitleScreen, StoryScreen, DialogueBox, CharacterSprite, ChoiceButtons,
                HeartGauge, InnerThoughtModal, PeachMiniGame, CollectionGallery,
                EndingScreen, EndingArt, ResultCard, Backgrounds, Overlays ...
  data/         스토리 데이터 (UI와 분리)
    types.ts        노드·선택지·조건 타입
    build.ts        S()/Y()/N() 헬퍼, 자동 id·자동 연결
    episodes/       ep1.ts ~ ep5.ts   ← 대사와 분기는 여기만 고치면 됩니다
    endings.ts      엔딩 6종
    achievements.ts 도감 항목, 이스터에그
  store/        Zustand 게임 상태 (gameStore.ts)
  utils/        engine.ts(순수 분기 로직) storage.ts sound.ts share.ts
  hooks/        useTypewriter, useReduced
  test/         story.test.ts (분기 자동 검증)
  assets/characters/   팬아트를 넣는 곳
```

## 스토리 데이터 작성법

대사는 순서대로 적으면 자동으로 다음 노드에 연결됩니다.

```ts
S('영아, 약 먹었어?', { s: 'tender' }),                  // 시내(S) 대사 + 시내 표정
Y('아, 아직이요.', { y: 'flustered' }),                  // 영(Y) 대사 + 영 표정
N('나는—', { choices: [                                  // 선택지
  { text: '"언니, 나 언니 좋아해요."', next: 'e2_a',
    effects: { heart: 25, flags: ['honest'], fall: true } },
  { text: '"성시내."', next: 'e4_d', special: true, require: { minHeart: 80 } },
]}),
Y('…', { id: 'e2_a', rush: { next: 'e2_rush' } }),       // 급발진 버튼
```

주요 필드: `bg`(배경) `s`/`y`(표정) `effects`(heart·flags·collect·fall) `choices` `branch`(보이지 않는 조건 분기)
`rush` `thought`(속마음) `minigame` `ending` `fx`(hearts/shake/glow/confetti) `egg` `card`(에피소드 카드)

## 캐릭터 이미지 교체 (팬아트)

기본 캐릭터는 특정 배우의 외모를 재현하지 않은 **자체 제작 SVG**입니다.
`src/assets/characters/` 에 `{인물}-{표정}.png|webp|svg` 파일을 넣으면 해당 표정이 자동으로 이미지로 대체됩니다. 코드 수정은 필요 없습니다.

- 인물: `sinae`, `young`
- 시내 표정: `smile laugh excited sly tender surprised shy`
- 영 표정: `smile laugh flutter flustered rush shy tender`
- 예) `sinae-smile.png`, `young-flutter.png` (없는 표정은 SVG로 표시)

## 테스트

`npm test` 는 모든 선택 조합을 (노드, 게이지, 플래그) 상태 단위로 탐색해 다음을 검증합니다.

- 노드 id 중복 / 존재하지 않는 다음 노드 id 없음, 막다른 노드 없음
- 모든 대사 노드에 도달 가능
- 6개 엔딩(시크릿 포함)과 도감 12종 전부 달성 가능
- 설렘 게이지 100 · 조합 이스터에그 도달 가능
- 속마음/급발진 없이 기본 경로만으로도 엔딩 도달 (게이지가 낮아도 해피엔딩)
- 에피소드별 대사 12개 이상·선택 2개 이상·속마음 1개 이상
- `제영` 표기가 없는지

## 안내

뮤지컬 〈하트비트〉의 팬이 만든 비공식 2차 창작물입니다. 대사는 모두 새로 창작했으며 원작의 실제 대사를 인용하지 않았습니다.
실제 인물·배우와는 무관하며, 상업적 이용을 하지 않습니다.
