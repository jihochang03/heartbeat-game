import { useEffect, useState } from 'react'
import { useGame } from '../store/gameStore'

/** 설정 또는 OS의 '동작 줄이기' 옵션이 켜져 있는지 */
export function useReduced(): boolean {
  const setting = useGame((s) => s.meta.settings.reduceMotion)
  const [os, setOs] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    setOs(mq.matches)
    const h = (e: MediaQueryListEvent) => setOs(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return setting || os
}
