import { Heart } from 'lucide-react'
import { heartLabel } from '../data'

/** 영의 심장 상태 (0~100) */
export default function HeartGauge({ heart }: { heart: number }) {
  const danger = heart >= 80
  const pulseMs = Math.max(0.45, 1.5 - heart / 90)
  return (
    <div
      className="flex min-w-0 items-center gap-2 rounded-2xl border-[2.5px] border-cocoa bg-warm/95 px-2.5 py-1.5 shadow-[0_3px_0_rgba(118,87,90,0.45)]"
      role="meter"
      aria-label="영의 심장 상태"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={heart}
      aria-valuetext={`${heart}, ${heartLabel(heart)}`}
    >
      <Heart
        size={22}
        className={danger ? 'shrink-0 text-rose' : 'shrink-0 text-peach'}
        fill="currentColor"
        stroke="#76575a"
        strokeWidth={2.2}
        style={{ animation: `pulse ${pulseMs}s ease-in-out infinite` }}
      />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-20 overflow-hidden rounded-full border-2 border-cocoa bg-cream sm:w-28">
            <div
              className="h-full rounded-full bg-gradient-to-r from-peach to-rose transition-[width] duration-700"
              style={{ width: `${heart}%` }}
            />
          </div>
          <span className="font-display text-[0.8rem] tabular-nums text-cocoa">{heart}</span>
        </div>
        <div className="mt-0.5 max-w-[10.5rem] truncate text-[0.68rem] leading-tight text-cocoa/90 sm:max-w-[14rem]">
          {heartLabel(heart)}
        </div>
      </div>
    </div>
  )
}
