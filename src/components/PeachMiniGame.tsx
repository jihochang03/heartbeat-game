import { useRef, useState } from 'react'
import { useGame } from '../store/gameStore'
import CharacterSprite from './CharacterSprite'

type Key = 'a' | 'b' | 'c'

const PEACHES: { key: Key; name: string; desc: string }[] = [
  { key: 'a', name: '가장 예쁜 복숭아', desc: '흠 하나 없이 곱게 붉은 복숭아.' },
  { key: 'b', name: '가장 달아 보이는 복숭아', desc: '향만으로도 달 것 같은 복숭아.' },
  { key: 'c', name: '아까부터 보고 있던 복숭아', desc: '조금 삐뚤어졌지만, 자꾸 눈이 가는 복숭아.' },
]

/** 복숭아 한 알. 종류마다 색·모양이 조금씩 다르다. */
function BigPeach({ k, selected }: { k: Key; selected: boolean }) {
  const body = { a: '#f08a94', b: '#ffc58f', c: '#f6b0a8' }[k]
  const blush = { a: '#e0626f', b: '#f5a46a', c: '#e98f8c' }[k]
  const path =
    k === 'c'
      ? 'M52 30 C20 22 6 52 18 76 C28 98 46 104 58 100 C72 106 94 92 98 66 C102 42 82 24 52 30 Z' // 삐뚤어진 모양
      : 'M50 28 C18 22 6 46 12 70 C18 94 36 104 50 102 C64 104 82 94 88 70 C94 46 82 22 50 28 Z'
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full overflow-visible" aria-hidden="true">
      <ellipse cx="50" cy="114" rx="34" ry="5" fill="#76575a" opacity="0.18" />
      <path d={path} fill={body} stroke="#76575a" strokeWidth="3.5" strokeLinejoin="round" />
      <path d={path} fill={blush} opacity="0.35" transform="translate(7 5) scale(0.88)" />
      <path d="M50 30 C42 50 42 82 52 102" fill="none" stroke="#d98b96" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <ellipse cx="26" cy="56" rx="6" ry="12" fill="#fff" opacity="0.5" transform="rotate(16 26 56)" />
      {k === 'b' && (
        <g fill="#fff6b8" stroke="#76575a" strokeWidth="1.5">
          <path d="M80 30 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" />
          <path d="M18 24 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" />
        </g>
      )}
      <path
        d={k === 'c' ? 'M52 30 C52 14 66 8 82 12 C80 26 68 34 52 30 Z' : 'M50 28 C50 14 62 8 78 12 C76 26 64 32 50 28 Z'}
        fill="#b9c8a8"
        stroke="#76575a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M51 29 L50 18" stroke="#76575a" strokeWidth="3" strokeLinecap="round" />
      {selected && <circle cx="50" cy="66" r="62" fill="none" stroke="#d98b96" strokeWidth="3" strokeDasharray="6 7" opacity="0.8" />}
    </svg>
  )
}

export default function PeachMiniGame() {
  const pickPeach = useGame((s) => s.pickPeach)
  const unlockEgg = useGame((s) => s.unlockEgg)
  const [sel, setSel] = useState<Key | null>(null)
  const [whisper, setWhisper] = useState<string | null>(null)
  const taps = useRef<Key[]>([])

  const tap = (k: Key) => {
    setSel(k)
    taps.current = [...taps.current, k].slice(-3)
    // 이스터에그: 왼쪽 → 오른쪽 → 가운데 순서로 만져보기
    if (taps.current.join('') === 'acb') {
      setWhisper('영아, 복숭아로 삼각형 그리지 마~ 아까워!')
      unlockEgg('peachOrder', '숨겨진 대사 · 복숭아 삼각형')
      taps.current = []
    }
  }

  const info = PEACHES.find((p) => p.key === sel)

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-deep/40 p-3 backdrop-blur-[2px]" role="dialog" aria-label="복숭아 고르기">
      <div className="paper anim-pop flex max-h-[96dvh] w-full max-w-xl flex-col overflow-hidden">
        <div className="border-b-[3px] border-cocoa bg-peach px-4 py-2.5">
          <h2 className="font-display text-lg text-deep">복숭아 고르기</h2>
          <p className="text-[0.86rem] text-deep/80">정답도, 실패도 없어요. 마음 가는 복숭아를 골라 보세요.</p>
        </div>

        <div className="flex items-end gap-2 px-3 pt-3">
          <div className="h-24 w-16 shrink-0 sm:h-28 sm:w-20">
            <CharacterSprite who="sinae" face={whisper ? 'laugh' : 'excited'} className="h-full w-full" />
          </div>
          <div className="dialog-box mb-2 flex-1 !rounded-2xl px-3 py-2 !text-[0.95rem]">
            <b className="font-display text-rose">시내</b>{' '}
            {whisper ?? '자, 영이가 하나 골라. 영이가 고른 걸로 사자!'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-3 pb-2 pt-1">
          {PEACHES.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => tap(p.key)}
              aria-pressed={sel === p.key}
              aria-label={p.name}
              className={`relative aspect-[5/6] rounded-2xl border-[3px] border-cocoa bg-cream p-2 transition-transform ${
                sel === p.key ? '-translate-y-2 bg-softpeach shadow-[0_8px_0_rgba(118,87,90,0.4)]' : 'shadow-[0_4px_0_rgba(118,87,90,0.35)]'
              }`}
            >
              <div className={sel === p.key ? 'anim-bob-soft h-full' : 'h-full'}>
                <BigPeach k={p.key} selected={sel === p.key} />
              </div>
            </button>
          ))}
        </div>

        <div className="min-h-[3.2rem] px-4 text-center text-[0.95rem] text-cocoa" aria-live="polite">
          {info ? (
            <>
              <b className="font-display text-rose">{info.name}</b>
              <br />
              {info.desc}
            </>
          ) : (
            <span className="text-cocoa/70">복숭아를 눌러 살펴보세요.</span>
          )}
        </div>
        <div className="p-3 pt-1">
          <button className="vn-btn primary w-full" disabled={!sel} onClick={() => sel && pickPeach(sel)}>
            이걸로 할래요
          </button>
        </div>
      </div>
    </div>
  )
}
