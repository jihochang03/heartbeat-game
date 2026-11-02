import type { ReactNode } from 'react'
import type { Who } from '../data/types'

interface Props {
  who: Who
  shown: string
  done: boolean
  shake?: boolean
  onTap: () => void
  children?: ReactNode
  footer?: ReactNode
}

const NAME: Record<Exclude<Who, 'N'>, { label: string; bg: string }> = {
  S: { label: '시내', bg: '#f5b8b8' },
  Y: { label: '영', bg: '#b9c8a8' },
}

/** 화자 이름표가 붙은 대화창. 탭하면 타이핑 완료 → 다음 대사. */
export default function DialogueBox({ who, shown, done, shake, onTap, children, footer }: Props) {
  const narration = who === 'N'
  return (
    <div className="relative mx-auto w-full max-w-3xl px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6">
      <div
        className={`dialog-box cursor-pointer px-5 pb-3 pt-6 ${shake ? 'anim-shake' : ''} ${narration ? '!bg-cream/95 italic' : ''}`}
        style={{ borderStyle: narration ? 'dashed' : 'solid' }}
        onClick={onTap}
        role="button"
        tabIndex={-1}
        aria-label="다음으로"
      >
        {!narration && (
          <div className="name-tab" style={{ background: NAME[who].bg }}>
            {NAME[who].label}
          </div>
        )}
        <p className="selectable min-h-[4.9em] whitespace-pre-wrap text-deep" aria-live="polite">
          {shown}
          {!done && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-rose" />}
        </p>
        {done && children}
        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">{footer}</div>
          {done && !children && (
            <span className="anim-arrow pr-1 text-lg text-rose" aria-hidden="true">
              ▼
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
