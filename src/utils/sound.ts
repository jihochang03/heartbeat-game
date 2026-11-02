/** 외부 음원 없이 WebAudio 로 만드는 아주 작은 효과음. 기본은 음소거이며 설정에서 켠다. */
let ctx: AudioContext | null = null
let enabled = false

export const setSoundEnabled = (on: boolean) => {
  enabled = on
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.06) {
  if (!ctx) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.value = freq
  const t = ctx.currentTime + start
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(ctx.destination)
  o.start(t)
  o.stop(t + dur + 0.05)
}

export type Sfx = 'tap' | 'choice' | 'heart' | 'rush' | 'secret' | 'collect'

export function sfx(kind: Sfx) {
  if (!enabled) return
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    if (ctx.state === 'suspended') void ctx.resume()
    switch (kind) {
      case 'tap':
        tone(660, 0, 0.06, 'triangle', 0.03)
        break
      case 'choice':
        tone(523, 0, 0.09, 'triangle')
        tone(784, 0.07, 0.12, 'triangle')
        break
      case 'heart':
        tone(880, 0, 0.12)
        tone(1175, 0.1, 0.18)
        break
      case 'rush':
        tone(330, 0, 0.08, 'square', 0.04)
        tone(660, 0.06, 0.08, 'square', 0.04)
        tone(990, 0.12, 0.14, 'square', 0.04)
        break
      case 'collect':
        tone(988, 0, 0.1)
        tone(1319, 0.09, 0.2)
        break
      case 'secret':
        ;[523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.12, 0.35, 'sine', 0.07))
        break
    }
  } catch {
    /* 오디오를 쓸 수 없는 환경: 조용히 무시 */
  }
}
