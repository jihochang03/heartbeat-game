import { useEffect, useState } from 'react'
import { BookOpen, Heart, Home, Play, Settings as SettingsIcon, Trash2, X } from 'lucide-react'
import { useGame } from '../store/gameStore'
import type { Settings } from '../utils/storage'
import { EGGS } from '../data/achievements'

/** 공통 모달 껍데기 */
export function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-deep/55 p-3 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="paper anim-pop flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b-[3px] border-cocoa bg-peach px-4 py-2.5">
          <h2 className="font-display text-lg text-deep">{title}</h2>
          <button className="icon-btn ml-auto !min-h-9 !min-w-9" onClick={onClose} aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <div className="soft-scroll flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  )
}

function Seg<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; t: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 font-display text-[0.95rem] text-cocoa">{label}</div>
      <div className="flex gap-1.5" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={String(o.v)}
            role="radio"
            aria-checked={value === o.v}
            onClick={() => onChange(o.v)}
            className={`min-h-11 flex-1 rounded-xl border-[2.5px] border-cocoa px-1 text-[0.9rem] ${value === o.v ? 'bg-peach font-bold text-deep' : 'bg-cream'}`}
          >
            {o.t}
          </button>
        ))}
      </div>
    </div>
  )
}

export function SettingsPanel() {
  const settings = useGame((s) => s.meta.settings)
  const update = useGame((s) => s.updateSettings)
  const reset = useGame((s) => s.resetAllRecords)
  const [confirm, setConfirm] = useState(false)
  return (
    <div>
      <Seg<string> label="사운드" value={settings.sound ? 'on' : 'off'} options={[{ v: 'off', t: '꺼짐 (기본)' }, { v: 'on', t: '켜짐' }]} onChange={(v) => update({ sound: v === 'on' })} />
      <Seg<Settings['textSpeed']> label="글자 속도" value={settings.textSpeed} options={[{ v: 'slow', t: '느리게' }, { v: 'normal', t: '보통' }, { v: 'fast', t: '빠르게' }, { v: 'instant', t: '즉시' }]} onChange={(v) => update({ textSpeed: v })} />
      <Seg<Settings['autoSpeed']> label="자동 진행 속도" value={settings.autoSpeed} options={[{ v: 'slow', t: '느리게' }, { v: 'normal', t: '보통' }, { v: 'fast', t: '빠르게' }]} onChange={(v) => update({ autoSpeed: v })} />
      <Seg<number> label="글자 크기" value={settings.fontScale} options={[{ v: 1, t: '기본' }, { v: 1.15, t: '크게' }, { v: 1.3, t: '아주 크게' }]} onChange={(v) => update({ fontScale: v as Settings['fontScale'] })} />
      <Seg<string> label="애니메이션 줄이기" value={settings.reduceMotion ? 'on' : 'off'} options={[{ v: 'off', t: '끄기' }, { v: 'on', t: '줄이기' }]} onChange={(v) => update({ reduceMotion: v === 'on' })} />
      <div className="mt-4 border-t-2 border-dashed border-cocoa/30 pt-3">
        {!confirm ? (
          <button className="vn-btn w-full !text-[0.95rem]" onClick={() => setConfirm(true)}>
            <Trash2 size={18} /> 모든 기록 삭제
          </button>
        ) : (
          <div className="rounded-2xl bg-cream p-3 text-center text-[0.92rem]">
            도감, 엔딩, 진행 기록이 모두 지워집니다. 정말 삭제할까요?
            <div className="mt-2 flex gap-2">
              <button className="vn-btn flex-1" onClick={() => setConfirm(false)}>취소</button>
              <button
                className="vn-btn primary flex-1"
                onClick={() => {
                  reset()
                  setConfirm(false)
                }}
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function HistoryPanel() {
  const log = useGame((s) => s.run.log)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    ref?.scrollTo({ top: ref.scrollHeight })
  }, [ref])
  return (
    <div ref={setRef} className="soft-scroll selectable max-h-[60dvh] space-y-2.5 overflow-y-auto pr-1">
      {log.length === 0 && <p className="text-center text-cocoa/70">아직 기록이 없어요.</p>}
      {log.map((l, i) =>
        l.who === 'C' ? (
          <p key={i} className="rounded-xl bg-softpeach/70 px-3 py-1.5 text-[0.92rem] text-deep">
            <Heart size={14} className="mr-1 inline text-rose" fill="currentColor" /> {l.text}
          </p>
        ) : (
          <div key={i} className="text-[0.95rem] leading-relaxed" style={{ wordBreak: 'keep-all' }}>
            {l.who !== 'N' && (
              <b className="mr-1.5 font-display" style={{ color: l.who === 'S' ? '#d98b96' : '#7f956c' }}>
                {l.who === 'S' ? '시내' : '영'}
              </b>
            )}
            <span className={l.who === 'N' ? 'italic text-cocoa/85' : 'text-deep'}>{l.text}</span>
          </div>
        ),
      )}
    </div>
  )
}

export function MenuPanel({ onClose }: { onClose: () => void }) {
  const setModal = useGame((s) => s.setModal)
  const toTitle = useGame((s) => s.toTitle)
  return (
    <div className="flex flex-col gap-3">
      <button className="vn-btn primary" onClick={onClose}><Play size={18} /> 계속하기</button>
      <button className="vn-btn" onClick={() => setModal('history')}><BookOpen size={18} /> 대화 기록</button>
      <button className="vn-btn" onClick={() => setModal('settings')}><SettingsIcon size={18} /> 설정</button>
      <button className="vn-btn" onClick={toTitle}><Home size={18} /> 타이틀로 (자동 저장됨)</button>
    </div>
  )
}

/** 모든 모달을 한곳에서 렌더링 */
export function ModalHost() {
  const modal = useGame((s) => s.modal)
  const setModal = useGame((s) => s.setModal)
  if (!modal) return null
  const close = () => setModal(null)
  if (modal === 'menu') return <ModalShell title="메뉴" onClose={close}><MenuPanel onClose={close} /></ModalShell>
  if (modal === 'history') return <ModalShell title="대화 기록" onClose={close}><HistoryPanel /></ModalShell>
  return <ModalShell title="설정" onClose={close}><SettingsPanel /></ModalShell>
}

/** 도감 수집 · 이스터에그 알림 */
export function Toaster() {
  const toasts = useGame((s) => s.toasts)
  const dismiss = useGame((s) => s.dismissToast)
  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-[70] flex flex-col items-center gap-2 px-3" aria-live="polite">
      {toasts.map((t) => (
        <ToastItem key={t.id} id={t.id} kind={t.kind} text={t.text} onDone={dismiss} />
      ))}
    </div>
  )
}

function ToastItem({ id, kind, text, onDone }: { id: number; kind: string; text: string; onDone: (id: number) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(id), 2200)
    return () => clearTimeout(t)
  }, [id, onDone])
  return (
    <div
      className="anim-pop flex max-w-sm items-center gap-2 rounded-2xl border-[2.5px] border-cocoa px-4 py-2 text-[0.92rem] shadow-[0_4px_0_rgba(118,87,90,0.4)]"
      style={{ background: kind === 'egg' ? '#fff0b8' : '#fffcf8' }}
    >
      <span aria-hidden="true">{kind === 'egg' ? '🥚' : '🍑'}</span>
      <span className="font-display text-deep">{text}</span>
    </div>
  )
}

/** 설렘 게이지 100 달성: 성시내 유죄 판결 */
export function VerdictOverlay() {
  const verdict = useGame((s) => s.verdict)
  const close = useGame((s) => s.closeVerdict)
  useEffect(() => {
    if (!verdict) return
    const t = setTimeout(close, 4200)
    return () => clearTimeout(t)
  }, [verdict, close])
  if (!verdict) return null
  return (
    <div className="absolute inset-0 z-[55] flex flex-col items-center justify-center bg-deep/60 p-6 text-center" onClick={close} role="alertdialog" aria-label="성시내 유죄 판결">
      <div className="anim-pop paper px-6 py-5">
        <div className="font-display text-sm text-rose">영의 심장 상태 100</div>
        <div className="font-display text-4xl text-deep" style={{ animation: 'stamp 0.6s ease-out both', color: '#c95f6b', border: '5px solid #c95f6b', borderRadius: 14, padding: '4px 16px', display: 'inline-block', marginTop: 8 }}>
          성시내 유죄
        </div>
        <p className="mt-3 text-[0.95rem] text-cocoa" style={{ wordBreak: 'keep-all' }}>
          피고인은 오늘 하루 동안 지나치게 다정했습니다.
          <br />
          (집행유예 없음)
        </p>
      </div>
    </div>
  )
}

export { EGGS }
