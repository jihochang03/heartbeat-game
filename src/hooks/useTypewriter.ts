import { useCallback, useEffect, useRef, useState } from 'react'

const MS: Record<string, number> = { slow: 55, normal: 32, fast: 14, instant: 0 }

/** 한 글자씩 출력하는 타이핑 효과. skip() 으로 즉시 완료. */
export function useTypewriter(text: string, speed: string, resetKey: string, forceInstant = false) {
  const [n, setN] = useState(0)
  const chars = useRef<string[]>([])
  chars.current = Array.from(text)
  const total = chars.current.length
  const ms = forceInstant ? 0 : (MS[speed] ?? 32)

  useEffect(() => {
    if (ms === 0) {
      setN(total)
      return
    }
    setN(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setN(i)
      if (i >= total) clearInterval(id)
    }, ms)
    return () => clearInterval(id)
  }, [resetKey, text, ms, total])

  const skip = useCallback(() => setN(chars.current.length), [])
  return { shown: chars.current.slice(0, n).join(''), done: n >= total, skip }
}
