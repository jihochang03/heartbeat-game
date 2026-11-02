import { useEffect, useMemo, useState } from 'react'
import { useGame } from '../store/gameStore'
import { useReduced } from '../hooks/useReduced'

/** 설렘 하트 파티클 / 다정한 장면의 밝은 빛 / 시크릿 컨페티 */
export default function FxLayer() {
  const fxKey = useGame((s) => s.fxKey)
  const fxType = useGame((s) => s.fxType)
  const reduced = useReduced()
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (!fxKey || !fxType || fxType === 'shake') return
    setActive(fxKey)
    const t = setTimeout(() => setActive(null), fxType === 'confetti' ? 4200 : 2200)
    return () => clearTimeout(t)
  }, [fxKey, fxType])

  const items = useMemo(
    () =>
      Array.from({ length: fxType === 'confetti' ? 34 : 12 }, (_, i) => ({
        left: 8 + Math.random() * 84,
        dx: (Math.random() - 0.5) * 90,
        delay: Math.random() * 0.5,
        size: 14 + Math.random() * 18,
        dur: 1.4 + Math.random() * 0.9,
        hue: ['#f5b8b8', '#ffd1b5', '#d98b96', '#b9c8a8', '#ffe7a8'][i % 5],
        rot: Math.random() * 90,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fxKey],
  )

  if (!active || reduced) return null

  if (fxType === 'glow')
    return (
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(255,248,230,0.85), rgba(255,209,181,0.25) 60%, transparent 80%)',
          animation: 'glowPulse 2s ease-in-out',
        }}
      />
    )

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
      {items.map((it, i) =>
        fxType === 'confetti' ? (
          <span
            key={`${active}-${i}`}
            className="absolute top-0 block rounded-[3px]"
            style={{
              left: `${it.left}%`,
              width: it.size * 0.5,
              height: it.size * 0.8,
              background: it.hue,
              transform: `rotate(${it.rot}deg)`,
              animation: `confettiFall ${2.4 + it.dur}s linear ${it.delay}s both`,
            }}
          />
        ) : (
          <svg
            key={`${active}-${i}`}
            viewBox="0 0 24 24"
            className="absolute"
            style={{
              left: `${it.left}%`,
              bottom: '34%',
              width: it.size,
              height: it.size,
              ['--dx' as string]: `${it.dx}px`,
              animation: `heartRise ${it.dur}s ease-out ${it.delay}s both`,
            }}
          >
            <path
              d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"
              fill={it.hue}
              stroke="#d98b96"
              strokeWidth="1.5"
            />
          </svg>
        ),
      )}
    </div>
  )
}
