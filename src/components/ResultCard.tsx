import { forwardRef, useEffect, useRef, useState } from 'react'
import { Download, Share2 } from 'lucide-react'
import type { EndingDef } from '../data/types'
import type { Result } from '../store/gameStore'
import { elementToPng, saveOrShare } from '../utils/share'
import EndingArt from './EndingArt'
import PeachIcon from './PeachIcon'
import { ModalShell } from './Overlays'

export const CARD_W = 540
export const CARD_H = 675

/** 공유용 결과 카드 (540x675 → PNG 저장 시 1080x1350). 인라인 스타일로 캡처 안정성을 높였다. */
export const CardFace = forwardRef<HTMLDivElement, { result: Result; ending: EndingDef }>(function CardFace({ result, ending }, ref) {
  return (
    <div
      ref={ref}
      style={{
        width: CARD_W,
        height: CARD_H,
        background: 'linear-gradient(180deg,#fff8ef 0%,#ffe9da 100%)',
        border: '6px solid #76575a',
        borderRadius: 28,
        padding: 22,
        boxSizing: 'border-box',
        fontFamily: "'Gowun Dodum','Malgun Gothic',sans-serif",
        color: '#76575a',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <PeachIcon size={38} />
        <div>
          <div style={{ fontFamily: "'Jua',sans-serif", fontSize: 13, letterSpacing: 5, color: '#d98b96' }}>HEARTBEAT</div>
          <div style={{ fontFamily: "'Jua',sans-serif", fontSize: 19, color: '#4d3538', whiteSpace: 'nowrap' }}>복숭아를 사러 가는 길</div>
        </div>
        <div style={{ marginLeft: 'auto', fontFamily: "'Jua',sans-serif", fontSize: 12, background: ending.secret ? '#ffd36b' : '#f5b8b8', border: '2px solid #76575a', borderRadius: 999, padding: '3px 12px', color: '#4d3538', whiteSpace: 'nowrap' }}>
          {ending.no}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, alignItems: 'stretch', flex: 1, minHeight: 0 }}>
        <div style={{ width: 232, flexShrink: 0, alignSelf: 'flex-start', border: '4px solid #76575a', borderRadius: 18, overflow: 'hidden' }}>
          <EndingArt ending={ending} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div>
            <div style={{ fontFamily: "'Jua',sans-serif", fontSize: 25, lineHeight: 1.2, color: '#4d3538', wordBreak: 'keep-all' }}>
              오늘도
              <br />
              성시내에게
              <br />
              반했습니다.
            </div>
            <div style={{ marginTop: 14, fontSize: 14, color: '#d98b96' }}>반한 횟수</div>
            <div style={{ fontFamily: "'Jua',sans-serif", fontSize: 54, lineHeight: 1, color: '#c95f6b' }}>
              {result.fall}
              <span style={{ fontSize: 22 }}> 번</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#d98b96' }}>가장 설렜던 순간</div>
            <div style={{ fontSize: 15.5, lineHeight: 1.45, color: '#4d3538', wordBreak: 'keep-all' }}>{result.best}</div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fffcf8', border: '3px solid #76575a', borderRadius: 18, padding: '12px 14px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Jua',sans-serif", fontSize: 22, color: '#4d3538' }}>{ending.title}</div>
        <div style={{ marginTop: 4, fontSize: 14.5, lineHeight: 1.5, wordBreak: 'keep-all' }}>"{ending.quote}"</div>
        <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5, color: '#9a7c80', fontStyle: 'italic', wordBreak: 'keep-all' }}>
          '언니는 아무것도 모르겠지만,
          <br />
          나는 오늘도 언니를 좋아하게 됐다.'
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: 10.5, color: '#a58c8f' }}>
        뮤지컬 〈하트비트〉 팬메이드 비공식 인터랙티브 게임 · A Walk for Peaches
      </div>
    </div>
  )
})

/** 결과 카드 미리보기 + PNG 저장/공유 */
export default function ResultCardModal({ result, ending, onClose }: { result: Result; ending: EndingDef; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.6)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const canShare = typeof navigator !== 'undefined' && typeof navigator.canShare === 'function'

  useEffect(() => {
    const fit = () => {
      const w = wrapRef.current?.clientWidth ?? 360
      setScale(Math.min(1, w / CARD_W))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const run = async (share: boolean) => {
    if (!cardRef.current) return
    setBusy(true)
    setMsg('')
    try {
      if (document.fonts?.ready) await document.fonts.ready
      const blob = await elementToPng(cardRef.current)
      const r = await saveOrShare(blob, `복숭아를-사러-가는-길_${ending.id}.png`, share)
      setMsg(r === 'downloaded' ? 'PNG로 저장했어요!' : r === 'opened' ? '이미지를 길게 눌러 저장하세요.' : '공유했어요!')
    } catch {
      setMsg('이미지 생성에 실패했어요. 잠시 후 다시 시도해 주세요.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <ModalShell title="엔딩 결과 카드" onClose={onClose}>
      <div ref={wrapRef} className="w-full">
        <div style={{ width: CARD_W * scale, height: CARD_H * scale, margin: '0 auto' }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: CARD_W, height: CARD_H }}>
            <CardFace ref={cardRef} result={result} ending={ending} />
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button className="vn-btn primary" disabled={busy} onClick={() => run(false)}>
          <Download size={18} /> PNG 저장
        </button>
        <button className="vn-btn" disabled={busy || !canShare} onClick={() => run(true)}>
          <Share2 size={18} /> 공유
        </button>
      </div>
      <p className="mt-2 min-h-[1.4em] text-center text-[0.88rem] text-rose" aria-live="polite">
        {busy ? '카드를 만드는 중…' : msg}
      </p>
    </ModalShell>
  )
}
