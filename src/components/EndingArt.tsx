import type { EndingDef, SinaeFace, YoungFace } from '../data/types'
import CharacterSprite from './CharacterSprite'
import PeachIcon from './PeachIcon'

const SCENES: Record<EndingDef['scene'], { bg: string; s: SinaeFace; y: YoungFace }> = {
  hands: { bg: 'linear-gradient(180deg,#ffd9b8 0%,#f9b9a8 55%,#fbe4d0 100%)', s: 'tender', y: 'tender' },
  verdict: { bg: 'linear-gradient(180deg,#e9dcef 0%,#f6d7de 60%,#fff1e4 100%)', s: 'shy', y: 'rush' },
  name: { bg: 'linear-gradient(180deg,#ffe3e3 0%,#f9c9c9 60%,#fff0e4 100%)', s: 'tender', y: 'flutter' },
  peach: { bg: 'linear-gradient(180deg,#fff3c9 0%,#ffd9b3 60%,#fff6e8 100%)', s: 'laugh', y: 'laugh' },
  same: { bg: 'linear-gradient(180deg,#e7d5ee 0%,#f7c6cf 60%,#fff0e4 100%)', s: 'shy', y: 'flustered' },
  tomorrow: { bg: 'linear-gradient(180deg,#ffeaa8 0%,#ffcfb0 55%,#fff1e0 100%)', s: 'excited', y: 'laugh' },
}

function Heart({ x, y, s = 1, c = '#f08a94' }: { x: string; y: string; s?: number; c?: string }) {
  return (
    <svg viewBox="0 0 24 24" className="absolute" style={{ left: x, top: y, width: 28 * s, height: 28 * s }} aria-hidden="true">
      <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" fill={c} stroke="#d98b96" strokeWidth="1.6" />
    </svg>
  )
}

/** 엔딩마다 고유한 일러스트. 비율 4:5 */
export default function EndingArt({ ending, className = '' }: { ending: EndingDef; className?: string }) {
  const sc = SCENES[ending.scene]
  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden ${className}`} style={{ background: sc.bg }} role="img" aria-label={`${ending.title} 일러스트`}>
      {/* 장식 */}
      {ending.scene === 'tomorrow' && (
        <>
          <div className="absolute left-1/2 top-[10%] h-[46%] -translate-x-1/2 aspect-square rounded-full bg-[#fff3b8]" style={{ boxShadow: '0 0 0 18px #fff3b855, 0 0 0 40px #fff3b833' }} />
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="absolute block rounded-sm" style={{ left: `${(i * 37) % 96}%`, top: `${(i * 23) % 60}%`, width: 8, height: 13, background: ['#f5b8b8', '#b9c8a8', '#ffd36b', '#d98b96'][i % 4], transform: `rotate(${i * 40}deg)` }} />
          ))}
          <div className="absolute inset-x-0 top-[6%] text-center font-display text-3xl text-rose" style={{ textShadow: '0 2px 0 #fff' }}>내일도</div>
        </>
      )}
      {ending.scene === 'hands' && <Heart x="44%" y="46%" s={3.2} c="#f9c6c6" />}
      {ending.scene === 'verdict' && (
        <>
          <div className="absolute left-1/2 top-[12%] -translate-x-1/2 -rotate-6 rounded-lg border-[6px] border-[#c95f6b] px-5 py-1 font-display text-5xl text-[#c95f6b]" style={{ background: '#fff8ef99' }}>
            유죄
          </div>
          <svg viewBox="0 0 64 64" className="absolute right-[8%] top-[30%] w-[18%]" aria-hidden="true">
            <rect x="8" y="14" width="30" height="14" rx="4" fill="#c9a58a" stroke="#76575a" strokeWidth="3" transform="rotate(-30 23 21)" />
            <rect x="28" y="30" width="6" height="24" rx="3" fill="#c9a58a" stroke="#76575a" strokeWidth="3" transform="rotate(-30 31 42)" />
            <rect x="8" y="54" width="30" height="6" rx="3" fill="#76575a" />
          </svg>
        </>
      )}
      {ending.scene === 'name' && (
        <>
          <div className="absolute left-1/2 top-[9%] -translate-x-1/2 rounded-[28px] border-[3px] border-cocoa bg-warm px-6 py-3 font-display text-3xl text-deep shadow-[0_5px_0_rgba(118,87,90,0.3)]">
            우리 영이
            <span className="absolute -bottom-3 left-10 block h-5 w-5 rotate-45 border-b-[3px] border-r-[3px] border-cocoa bg-warm" />
          </div>
          <Heart x="14%" y="26%" s={1.2} />
          <Heart x="80%" y="22%" s={1.5} c="#f9c6c6" />
          <Heart x="68%" y="34%" s={0.9} />
        </>
      )}
      {ending.scene === 'same' && (
        <>
          <div className="absolute left-[8%] top-[10%] flex h-[16%] aspect-square items-center justify-center rounded-full border-[3px] border-cocoa bg-warm"><Heart x="22%" y="20%" s={1.4} /></div>
          <div className="absolute right-[8%] top-[10%] flex h-[16%] aspect-square items-center justify-center rounded-full border-[3px] border-cocoa bg-warm"><Heart x="22%" y="20%" s={1.4} /></div>
          <div className="absolute inset-x-0 top-[28%] text-center font-display text-xl text-cocoa">서로, 똑같이.</div>
        </>
      )}
      {ending.scene === 'peach' && (
        <>
          <div className="absolute left-1/2 top-[14%] -translate-x-1/2"><PeachIcon size={120} /></div>
          <Heart x="24%" y="20%" s={1.1} c="#ffd1b5" />
          <Heart x="70%" y="26%" s={1.3} />
        </>
      )}

      {/* 인물 */}
      <div className="absolute inset-x-0 bottom-0 flex h-[62%] items-end justify-center" style={{ gap: ending.scene === 'hands' || ending.scene === 'tomorrow' ? '-6%' : '2%' }}>
        <div className="h-full aspect-[200/290]" style={{ height: '88%' }}><CharacterSprite who="young" face={sc.y} className="h-full w-full" /></div>
        <div className="h-full aspect-[200/290]"><CharacterSprite who="sinae" face={sc.s} className="h-full w-full" /></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[6%] bg-[#d9c0b0]" />
    </div>
  )
}
