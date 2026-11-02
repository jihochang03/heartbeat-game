import { useEffect, useRef, useState } from 'react'
import { BookHeart, Play, RotateCcw, Settings, Volume2, VolumeX } from 'lucide-react'
import { useGame } from '../store/gameStore'
import { ENDINGS } from '../data/endings'
import Background from './Backgrounds'
import CharacterSprite from './CharacterSprite'
import PeachIcon from './PeachIcon'
import { ModalShell } from './Overlays'
import type { SinaeFace, YoungFace } from '../data/types'

type Say = { who: 'S' | 'Y'; text: string }

export default function TitleScreen() {
  const hasSave = useGame((s) => s.hasSave)
  const meta = useGame((s) => s.meta)
  const { startNew, continueGame, setScreen, setModal, updateSettings, unlockEgg } = useGame.getState()
  const [confirm, setConfirm] = useState(false)
  const [taps, setTaps] = useState(0)
  const [say, setSay] = useState<Say | null>(null)
  const [wiggle, setWiggle] = useState(0)
  const [faces, setFaces] = useState<{ s: SinaeFace; y: YoungFace }>({ s: 'smile', y: 'smile' })
  const timers = useRef<number[]>([])

  const allEndings = meta.endings.length >= ENDINGS.length

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const later = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))

  const tapPeach = () => {
    const n = taps + 1
    setTaps(n)
    setWiggle((w) => w + 1)
    if (n === 3) {
      setSay({ who: 'S', text: '어? 복숭아 눌렀어? 아직 안 익었어~' })
      setFaces({ s: 'laugh', y: 'smile' })
    } else if (n === 5) {
      setSay({ who: 'S', text: '영아, 복숭아랑 나랑 누가 더 좋아?' })
      setFaces({ s: 'sly', y: 'flustered' })
    } else if (n === 7) {
      setSay({ who: 'Y', text: '…언니가 더 좋은데.' })
      setFaces({ s: 'smile', y: 'tender' })
      later(2200, () => {
        setSay({ who: 'S', text: '…얘가 또 이런다. (귀가 빨개졌다)' })
        setFaces({ s: 'shy', y: 'flutter' })
      })
      unlockEgg('titlePeach', '숨겨진 대사 · 복숭아의 비밀')
      later(5200, () => setFaces({ s: 'smile', y: 'smile' }))
    }
    if ([3, 5, 7].includes(n)) later(n === 7 ? 5000 : 2600, () => setSay(null))
  }

  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-[1100px] flex-col items-center overflow-hidden bg-cream">
      <Background id="shop" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/70 via-transparent to-cream/80" />

      <button
        className="icon-btn absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20"
        aria-pressed={meta.settings.sound}
        aria-label={meta.settings.sound ? '소리 끄기' : '소리 켜기'}
        onClick={() => updateSettings({ sound: !meta.settings.sound })}
      >
        {meta.settings.sound ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>

      {/* 로고 */}
      <div className="relative z-10 mt-[max(2.2rem,env(safe-area-inset-top))] flex flex-col items-center px-4 text-center">
        <button
          type="button"
          onClick={tapPeach}
          aria-label="복숭아 (눌러보세요)"
          className="rounded-full"
          style={{ animation: wiggle ? 'bob 0.45s ease-in-out' : 'bob 3.4s ease-in-out infinite' }}
          key={wiggle}
        >
          <PeachIcon size={86} crown={allEndings} />
        </button>
        <div className="font-display text-[0.8rem] tracking-[0.3em] text-rose">A WALK FOR PEACHES</div>
        <h1
          className="font-display text-[2.6rem] leading-[1.1] text-deep sm:text-6xl"
          style={{ textShadow: '0 3px 0 #fff, 3px 3px 0 #f5b8b8, -2px 2px 0 #fff', wordBreak: 'keep-all' }}
        >
          복숭아를 사러
          <br />
          가는 길
        </h1>
        <p className="mt-2 max-w-xs rounded-2xl bg-warm/85 px-3 py-1.5 text-[0.95rem] leading-snug text-cocoa shadow-[0_2px_0_rgba(118,87,90,0.25)]" style={{ wordBreak: 'keep-all' }}>
          복숭아를 사러 갔을 뿐인데,
          <br />
          오늘도 언니를 좋아하게 됐다.
        </p>
        {allEndings && <p className="mt-1 text-[0.8rem] text-rose">모든 엔딩을 본 당신에게, 복숭아 왕관을 🍑</p>}
      </div>

      {/* 캐릭터 */}
      <div className="relative z-10 flex min-h-0 w-full flex-1 items-end justify-center gap-[2%] px-2">
        <div className="relative h-[86%] max-h-[330px] max-w-[46%] aspect-[200/290]">
          <div className="anim-bob-soft h-full"><CharacterSprite who="young" face={faces.y} className="h-full w-full" /></div>
          {say?.who === 'Y' && <TitleBubble text={say.text} />}
        </div>
        <div className="relative h-[94%] max-h-[355px] max-w-[46%] aspect-[200/290]">
          <div className="anim-bob h-full"><CharacterSprite who="sinae" face={faces.s} className="h-full w-full" /></div>
          {say?.who === 'S' && <TitleBubble text={say.text} />}
        </div>
      </div>

      {/* 메뉴 */}
      <nav className="relative z-20 w-full max-w-sm px-5 pb-[max(1.1rem,env(safe-area-inset-bottom))] pt-3" aria-label="메인 메뉴">
        <div className="flex flex-col gap-3">
          <button className="vn-btn primary w-full !text-xl" onClick={() => (hasSave ? setConfirm(true) : startNew())}>
            <Play size={22} fill="currentColor" /> START
          </button>
          <button className="vn-btn w-full" disabled={!hasSave} onClick={continueGame}>
            <RotateCcw size={20} /> CONTINUE
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="vn-btn sage" onClick={() => setScreen('gallery')}>
              <BookHeart size={20} /> 설렘 도감
            </button>
            <button className="vn-btn" onClick={() => setModal('settings')}>
              <Settings size={20} /> 설정
            </button>
          </div>
        </div>
        <p className="mt-3 text-center text-[0.68rem] leading-tight text-cocoa/80">
          뮤지컬 〈하트비트〉의 팬이 만든 비공식 팬메이드 게임입니다.
        </p>
      </nav>

      {confirm && (
        <ModalShell title="새로 시작할까요?" onClose={() => setConfirm(false)}>
          <p className="mb-4 text-[0.98rem] leading-relaxed" style={{ wordBreak: 'keep-all' }}>
            저장된 진행 데이터가 처음으로 돌아갑니다.
            <br />
            <b className="text-rose">설렘 도감과 엔딩 기록은 그대로 보존</b>돼요.
          </p>
          <div className="flex gap-2">
            <button className="vn-btn flex-1" onClick={() => setConfirm(false)}>취소</button>
            <button className="vn-btn primary flex-1" onClick={() => { setConfirm(false); startNew() }}>새로 시작</button>
          </div>
        </ModalShell>
      )}
    </div>
  )
}

function TitleBubble({ text }: { text: string }) {
  return (
    <div className="anim-pop absolute -top-2 left-1/2 z-30 w-40 -translate-x-1/2 rounded-2xl border-[2.5px] border-cocoa bg-warm px-3 py-2 text-center text-[0.82rem] leading-snug text-deep shadow-[0_3px_0_rgba(118,87,90,0.4)]" style={{ wordBreak: 'keep-all' }}>
      {text}
    </div>
  )
}
