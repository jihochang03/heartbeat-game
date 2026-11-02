import { useEffect, useState } from 'react'
import { BookHeart, Home, ImageDown, RotateCcw, Sparkles } from 'lucide-react'
import { useGame, type Result } from '../store/gameStore'
import { ENDINGS, ENDING_MAP } from '../data/endings'
import EndingArt from './EndingArt'
import FxLayer from './FxLayer'
import ResultCardModal from './ResultCard'

export default function EndingScreen({ previewId, onBack }: { previewId?: string; onBack?: () => void }) {
  const result = useGame((s) => s.result)
  const meta = useGame((s) => s.meta)
  const { setScreen, startNew } = useGame.getState()
  const [card, setCard] = useState(false)

  const id = previewId ?? result?.endingId
  const ending = id ? ENDING_MAP[id] : undefined
  if (!ending) return null
  const preview = !!previewId
  const r: Result = result ?? { endingId: ending.id, fall: 0, best: '', heart: 0, isNew: false }
  const collected = meta.endings.length

  return (
    <div className="relative h-dvh overflow-y-auto bg-gradient-to-b from-softpeach via-cream to-cream soft-scroll">
      {!preview && ending.secret && <ConfettiOnce />}
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-[max(1.2rem,env(safe-area-inset-top))]">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-sm tracking-widest text-rose">{ending.no}</span>
          {!preview && r.isNew && (
            <span className="anim-pop inline-flex items-center gap-1 rounded-full border-2 border-cocoa bg-[#fff0b8] px-3 py-0.5 font-display text-sm text-deep">
              <Sparkles size={14} /> NEW ENDING
            </span>
          )}
        </div>

        <h1 className="font-display text-center text-[2.2rem] leading-tight text-deep anim-fadeup" style={{ textShadow: '0 3px 0 #fff, 2px 3px 0 #f5b8b8' }}>
          {ending.title}
        </h1>
        <p className="mb-4 mt-1 text-center text-[0.95rem] text-cocoa" style={{ wordBreak: 'keep-all' }}>{ending.summary}</p>

        <div className="paper overflow-hidden anim-fadeup" style={{ animationDelay: '0.1s' }}>
          <EndingArt ending={ending} />
        </div>

        <div className="paper mt-5 p-4 anim-fadeup" style={{ animationDelay: '0.2s' }}>
          <div className="mb-1 font-display text-sm text-rose">후일담</div>
          <p className="selectable text-[1rem] leading-[1.8] text-deep" style={{ wordBreak: 'keep-all' }}>{ending.epilogue}</p>
          <div className="mt-3 rounded-2xl bg-cream px-3 py-2 text-center font-display text-lg text-rose">“{ending.quote}”</div>
        </div>

        {!preview && (
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="paper px-2 py-3">
              <div className="text-[0.8rem] text-rose">오늘 반한 횟수</div>
              <div className="font-display text-3xl text-deep">{r.fall}<span className="text-base"> 번</span></div>
            </div>
            <div className="paper px-2 py-3">
              <div className="text-[0.8rem] text-rose">엔딩 수집</div>
              <div className="font-display text-3xl text-deep">{collected}<span className="text-base"> / {ENDINGS.length}</span></div>
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-3">
          {!preview && (
            <button className="vn-btn primary" onClick={() => setCard(true)}>
              <ImageDown size={20} /> 결과 카드 만들기
            </button>
          )}
          {preview ? (
            <button className="vn-btn" onClick={onBack}>도감으로 돌아가기</button>
          ) : (
            <>
              <button className="vn-btn sage" onClick={() => setScreen('gallery')}><BookHeart size={20} /> 설렘 도감 보기</button>
              <button className="vn-btn" onClick={startNew}><RotateCcw size={20} /> 다른 선택으로 다시 걷기</button>
              <button className="vn-btn" onClick={() => setScreen('title')}><Home size={20} /> 타이틀로</button>
            </>
          )}
        </div>
      </div>
      {card && !preview && <ResultCardModal result={r} ending={ending} onClose={() => setCard(false)} />}
    </div>
  )
}

/** 시크릿 엔딩 진입 시 한 번 컨페티 */
function ConfettiOnce() {
  useEffect(() => {
    useGame.setState((s) => ({ fxType: 'confetti', fxKey: s.fxKey + 1 }))
  }, [])
  return <FxLayer />
}
