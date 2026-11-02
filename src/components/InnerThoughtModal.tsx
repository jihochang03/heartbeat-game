import { useEffect, useState } from 'react'
import { Heart, X } from 'lucide-react'
import type { Thought } from '../data/types'

/** 영(혹은 시내)의 속마음 열람실. 탭할 때마다 한 줄씩 나타난다. */
export default function InnerThoughtModal({ thought, onClose }: { thought: Thought; onClose: () => void }) {
  const [shown, setShown] = useState(1)
  const done = shown >= thought.lines.length
  const isYoung = thought.who === 'young'

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (!done) setShown((n) => n + 1)
        else onClose()
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [done, onClose])

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-deep/55 p-4 backdrop-blur-[2px]"
      onClick={() => (!done ? setShown((n) => n + 1) : undefined)}
      role="dialog"
      aria-modal="true"
      aria-label={isYoung ? '영의 속마음' : '시내의 속마음'}
    >
      <div
        className="paper anim-pop relative flex max-h-[86dvh] w-full max-w-md flex-col overflow-hidden"
        style={{ background: isYoung ? '#f4f8ec' : '#fff1ee' }}
      >
        <div
          className="flex items-center gap-2 border-b-[3px] border-cocoa px-4 py-3"
          style={{ background: isYoung ? '#b9c8a8' : '#f5b8b8' }}
        >
          <Heart size={20} fill="#fff8ef" stroke="#76575a" />
          <h2 className="font-display text-lg text-deep">{isYoung ? '영의 속마음' : '시내의 속마음'}</h2>
          <button className="icon-btn ml-auto !min-h-9 !min-w-9" onClick={onClose} aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <div className="soft-scroll selectable flex-1 space-y-3.5 overflow-y-auto px-5 py-5 text-[1.02rem] leading-[1.75] text-cocoa">
          {thought.lines.slice(0, shown).map((l, i) => (
            <p key={i} className="anim-fadeup" style={{ wordBreak: 'keep-all' }}>
              {l}
            </p>
          ))}
          {!done && <p className="text-center text-sm text-rose anim-arrow">▼ 탭해서 계속 읽기</p>}
        </div>
        {done && (
          <div className="border-t-[3px] border-dashed border-cocoa/40 p-3">
            <button className="vn-btn primary w-full" onClick={onClose}>
              마음에 담아두기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
