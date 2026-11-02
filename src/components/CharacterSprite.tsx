import type { SinaeFace, YoungFace } from '../data/types'

/**
 * 오리지널 파스텔 치비 캐릭터 (자체 제작 SVG).
 * - 굵은 외곽선 없이 가는 선, 큰 머리, 맑고 큰 눈, 결이 살아 있는 머리카락
 * - 시내: 긴 웨이브 머리 · 크림 가디건 · 체크 스커트 · 하트 목걸이
 * - 영: 가운데 가르마 단발 · 회청색 포켓 셔츠 · 벨트
 * 실제 인물의 얼굴을 옮기지 않고 헤어/의상 같은 스타일 요소만 참고했다.
 */

type Eyes = 'dot' | 'happy' | 'sparkle' | 'smug' | 'wide' | 'soft' | 'shy' | 'swirl' | 'intense'
type Mouth = 'smile' | 'open' | 'cat' | 'small' | 'o' | 'wavy' | 'smirk'

interface FaceDef {
  eyes: Eyes
  mouth: Mouth
  blush: 0 | 1 | 2
  extra?: 'sparkles' | 'hearts' | 'sweat' | 'bang'
  brow?: 'flat' | 'up' | 'angry' | 'worry'
}

const SINAE_FACES: Record<SinaeFace, FaceDef> = {
  smile: { eyes: 'dot', mouth: 'smile', blush: 1, brow: 'flat' },
  laugh: { eyes: 'happy', mouth: 'open', blush: 1, brow: 'up' },
  excited: { eyes: 'sparkle', mouth: 'open', blush: 1, extra: 'sparkles', brow: 'up' },
  sly: { eyes: 'smug', mouth: 'smirk', blush: 1, brow: 'up' },
  tender: { eyes: 'soft', mouth: 'small', blush: 1, brow: 'worry' },
  surprised: { eyes: 'wide', mouth: 'o', blush: 0, extra: 'sweat', brow: 'up' },
  shy: { eyes: 'shy', mouth: 'wavy', blush: 2, brow: 'worry' },
}

const YOUNG_FACES: Record<YoungFace, FaceDef> = {
  smile: { eyes: 'dot', mouth: 'smile', blush: 0, brow: 'flat' },
  laugh: { eyes: 'happy', mouth: 'open', blush: 1, brow: 'up' },
  flutter: { eyes: 'sparkle', mouth: 'small', blush: 2, extra: 'hearts', brow: 'worry' },
  flustered: { eyes: 'swirl', mouth: 'wavy', blush: 2, extra: 'sweat', brow: 'worry' },
  rush: { eyes: 'intense', mouth: 'open', blush: 2, extra: 'bang', brow: 'angry' },
  shy: { eyes: 'shy', mouth: 'wavy', blush: 2, brow: 'worry' },
  tender: { eyes: 'soft', mouth: 'small', blush: 1, brow: 'flat' },
}

const SKIN_LINE = '#e2b9ac'
const CLOTH_LINE = '#c9a8a2'
const MOUTH_LINE = '#c4707c'

type Who = 'sinae' | 'young'

function Defs() {
  return (
    <defs>
      {/* 시내: 따뜻한 갈색 눈 / 영: 짙은 남보라빛 눈 */}
      <linearGradient id="irisS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4a2c2e" />
        <stop offset="0.6" stopColor="#8a5a54" />
        <stop offset="1" stopColor="#d9948a" />
      </linearGradient>
      <linearGradient id="irisY" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#241d33" />
        <stop offset="0.6" stopColor="#4d4a6e" />
        <stop offset="1" stopColor="#8fa3cf" />
      </linearGradient>
      <linearGradient id="hairS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8b5b4d" />
        <stop offset="0.55" stopColor="#a8715f" />
        <stop offset="1" stopColor="#d4a48c" />
      </linearGradient>
      <linearGradient id="hairY" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3b3342" />
        <stop offset="0.6" stopColor="#52475c" />
        <stop offset="1" stopColor="#7a6e8a" />
      </linearGradient>
      <radialGradient id="skinG" cx="0.5" cy="0.45" r="0.65">
        <stop offset="0" stopColor="#fff6ee" />
        <stop offset="1" stopColor="#ffe3d3" />
      </radialGradient>
      <radialGradient id="blushG" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ff9aa8" stopOpacity="0.9" />
        <stop offset="1" stopColor="#ff9aa8" stopOpacity="0" />
      </radialGradient>
      <pattern id="plaid" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#8a7076" />
        <path d="M0 3 H12 M3 0 V12" stroke="#b49bc4" strokeWidth="1.4" />
        <path d="M0 9 H12 M9 0 V12" stroke="#5e464e" strokeWidth="1" />
      </pattern>
    </defs>
  )
}

interface EyeProps {
  who: Who
  x: number
  y: number
  side: -1 | 1
  w?: number
  h?: number
  look?: number
  lidDrop?: number
  star?: boolean
}

/** 맑고 큰 눈: 위는 진하고 아래는 투명하게 밝아지는 홍채 + 큰 하이라이트 */
function GlossEye({ who, x, y, side, w = 13, h = 15, look = 0, lidDrop = 0, star = false }: EyeProps) {
  const cx = x + look
  const lash = who === 'sinae' ? '#5a3a36' : '#2c2438'
  const glow = who === 'sinae' ? '#ffc1b4' : '#c5d4f5'
  return (
    <g>
      <ellipse cx={cx} cy={y} rx={w} ry={h} fill={`url(#iris${who === 'sinae' ? 'S' : 'Y'})`} />
      <ellipse cx={cx} cy={y + h * 0.42} rx={w * 0.72} ry={h * 0.42} fill={glow} opacity="0.55" />
      <circle cx={cx - w * 0.34} cy={y - h * 0.34} r={w * 0.42} fill="#fff" />
      <circle cx={cx + w * 0.42} cy={y + h * 0.4} r={w * 0.2} fill="#fff" />
      {star && (
        <path d={`M${cx + 5} ${y - 7} l1.8 3.8 l3.8 1.8 l-3.8 1.8 l-1.8 3.8 l-1.8 -3.8 l-3.8 -1.8 l3.8 -1.8z`} fill="#fff" />
      )}
      <path
        d={`M${x - w - 0.5} ${y - 2 + lidDrop} Q${x} ${y - h - 3 + lidDrop} ${x + w + 0.5} ${y - 2 + lidDrop}`}
        fill="none"
        stroke={lash}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d={`M${x + side * (w + 0.5)} ${y - 2 + lidDrop} l${side * 3.6} -2.4`} stroke={lash} strokeWidth="2.2" strokeLinecap="round" />
    </g>
  )
}

function EyesSvg({ type, who }: { type: Eyes; who: Who }) {
  const L = 70
  const R = 130
  const y = 113
  const lash = who === 'sinae' ? '#5a3a36' : '#2c2438'
  const arc = (x: number, side: -1 | 1) => (
    <g key={x} fill="none" stroke={lash} strokeLinecap="round">
      <path d={`M${x - 11} ${y + 4} Q${x} ${y - 13} ${x + 11} ${y + 4}`} strokeWidth="3.6" />
      <path d={`M${x + side * 11} ${y + 4} l${side * 3} -2.4`} strokeWidth="2.2" />
    </g>
  )
  const g = { who }
  switch (type) {
    case 'happy':
      return (
        <g>
          {arc(L, -1)}
          {arc(R, 1)}
        </g>
      )
    case 'sparkle':
      return (
        <g>
          <GlossEye {...g} x={L} y={y} side={-1} w={14} h={16.5} star />
          <GlossEye {...g} x={R} y={y} side={1} w={14} h={16.5} star />
        </g>
      )
    case 'smug':
      return (
        <g>
          {([[L, -1], [R, 1]] as [number, -1 | 1][]).map(([x, sd]) => (
            <g key={x}>
              <path d={`M${x - 12} ${y} H${x + 12} A12 11 0 0 1 ${x - 12} ${y} Z`} fill={`url(#iris${who === 'sinae' ? 'S' : 'Y'})`} />
              <circle cx={x - 4} cy={y + 4} r="2.6" fill="#fff" />
              <path d={`M${x - 13} ${y - 0.5} H${x + 13}`} stroke={lash} strokeWidth="3" strokeLinecap="round" />
              <path d={`M${x + sd * 13} ${y - 0.5} l${sd * 3.6} -2.6`} stroke={lash} strokeWidth="2.2" strokeLinecap="round" />
            </g>
          ))}
        </g>
      )
    case 'wide':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx="13" ry="16" fill="#fff" stroke={lash} strokeWidth="2.2" />
              <circle cx={x} cy={y + 1} r="6.5" fill={`url(#iris${who === 'sinae' ? 'S' : 'Y'})`} />
              <circle cx={x - 2} cy={y - 1.5} r="2.2" fill="#fff" />
            </g>
          ))}
        </g>
      )
    case 'soft':
      return (
        <g>
          <GlossEye {...g} x={L} y={y + 1} side={-1} w={13} h={14} lidDrop={2} />
          <GlossEye {...g} x={R} y={y + 1} side={1} w={13} h={14} lidDrop={2} />
        </g>
      )
    case 'shy':
      return (
        <g>
          <GlossEye {...g} x={L} y={y + 2} side={-1} w={12} h={13.5} look={3.5} />
          <GlossEye {...g} x={R} y={y + 2} side={1} w={12} h={13.5} look={3.5} />
        </g>
      )
    case 'swirl':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <circle cx={x} cy={y} r="13" fill="#fff" stroke={lash} strokeWidth="2.2" />
              <path
                d={`M${x} ${y} m-5.5 0 a5.5 5.5 0 1 1 5.5 5.5 a2.8 2.8 0 1 1 -2 -4.2`}
                fill="none"
                stroke={lash}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>
      )
    case 'intense':
      return (
        <g>
          <GlossEye {...g} x={L} y={y} side={-1} w={13} h={15} lidDrop={2.5} star />
          <GlossEye {...g} x={R} y={y} side={1} w={13} h={15} lidDrop={2.5} star />
        </g>
      )
    default:
      return (
        <g>
          <GlossEye {...g} x={L} y={y} side={-1} />
          <GlossEye {...g} x={R} y={y} side={1} />
        </g>
      )
  }
}

function BrowSvg({ type = 'flat', color }: { type?: FaceDef['brow']; color: string }) {
  const s = { stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, fill: 'none', opacity: 0.75 }
  switch (type) {
    case 'up':
      return (
        <g {...s}>
          <path d="M60 90 Q70 83 82 88" />
          <path d="M118 88 Q130 83 140 90" />
        </g>
      )
    case 'angry':
      return (
        <g {...s} strokeWidth={2.6} opacity={0.9}>
          <path d="M58 86 L84 94" />
          <path d="M142 86 L116 94" />
        </g>
      )
    case 'worry':
      return (
        <g {...s}>
          <path d="M60 94 Q70 88 82 89" />
          <path d="M140 94 Q130 88 118 89" />
        </g>
      )
    default:
      return (
        <g {...s}>
          <path d="M61 91 Q70 87 82 90" />
          <path d="M118 90 Q130 87 139 91" />
        </g>
      )
  }
}

function MouthSvg({ type }: { type: Mouth }) {
  const s = { stroke: MOUTH_LINE, strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }
  let inner
  switch (type) {
    case 'open':
      inner = (
        <g>
          <path d="M90 127 Q100 148 110 127 Q100 124 90 127 Z" fill="#e0707f" stroke={MOUTH_LINE} strokeWidth="2.2" strokeLinejoin="round" />
          <ellipse cx="100" cy="138" rx="5" ry="3" fill="#ffa3ae" />
        </g>
      )
      break
    case 'cat':
      inner = <path d="M89 128 Q94.5 135 100 129 Q105.5 135 111 128" {...s} />
      break
    case 'small':
      inner = <path d="M94.5 129.5 Q100 135 105.5 129.5" {...s} />
      break
    case 'o':
      inner = <ellipse cx="100" cy="133" rx="4" ry="5.5" fill="#e0707f" stroke={MOUTH_LINE} strokeWidth="2.2" />
      break
    case 'wavy':
      inner = <path d="M91 131 Q95.5 126 100 131 T109 131" {...s} />
      break
    case 'smirk':
      inner = <path d="M92 130 Q103 137 112 125" {...s} />
      break
    default:
      inner = <path d="M92 128 Q100 136 108 128" {...s} />
  }
  // 얼굴 아래쪽에 작게 (치비 비율)
  return <g transform="translate(100 144) scale(0.85) translate(-100 -129)">{inner}</g>
}

function Extras({ type }: { type?: FaceDef['extra'] }) {
  if (!type) return null
  if (type === 'sweat') return <path d="M162 70 q-7 12 0 16 q7 -4 0 -16z" fill="#d3effb" stroke="#9cc9e0" strokeWidth="1.6" />
  if (type === 'bang')
    return (
      <g stroke="#ee8a9a" strokeWidth="3.6" strokeLinecap="round">
        <path d="M164 52 l8 -10" />
        <path d="M170 66 l12 -3" />
        <path d="M164 80 l9 5" />
      </g>
    )
  if (type === 'hearts')
    return (
      <g fill="#f79aa8">
        <path d="M164 44 c-5 -8 -16 0 -8 8 l8 7 l8 -7 c8 -8 -3 -16 -8 -8z" />
        <path d="M30 52 c-4 -6 -12 0 -6 6 l6 5 l6 -5 c6 -6 -2 -12 -6 -6z" />
      </g>
    )
  return (
    <g fill="#ffd97a">
      <path d="M166 48 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" />
      <path d="M32 60 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" />
    </g>
  )
}

interface Props {
  who: Who
  face: SinaeFace | YoungFace
  className?: string
}

/**
 * 팬아트 교체 훅: src/assets/characters/ 에 `sinae-smile.png`, `young-flutter.png` 처럼
 * `{who}-{face}.png|webp|svg` 파일을 넣으면 해당 표정은 자동으로 이미지로 대체된다.
 * 파일이 없는 표정은 아래의 SVG 캐릭터로 표시된다.
 */
const IMAGES = import.meta.glob('../assets/characters/*.{png,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function findImage(who: string, face: string): string | undefined {
  const key = Object.keys(IMAGES).find((k) => new RegExp(`/${who}-${face}\\.(png|webp|svg)$`).test(k))
  return key ? IMAGES[key] : undefined
}

export default function CharacterSprite({ who, face, className }: Props) {
  const img = findImage(who, face)
  if (img)
    return (
      <img
        src={img}
        alt={who === 'sinae' ? '성시내' : '영'}
        className={`${className ?? ''} object-contain object-bottom`}
        draggable={false}
      />
    )
  return <ChibiSvg who={who} face={face} className={className} />
}

function ChibiSvg({ who, face, className }: Props) {
  const def = (who === 'sinae' ? SINAE_FACES[face as SinaeFace] : YOUNG_FACES[face as YoungFace]) ?? SINAE_FACES.smile
  const sinae = who === 'sinae'
  const hairFill = sinae ? 'url(#hairS)' : 'url(#hairY)'
  const strand = sinae ? '#a06c5c' : '#2f2837' // 머리결 선
  const hairLine = sinae ? '#8d5c4e' : '#2f2837'
  const hi = sinae ? '#e8c0aa' : '#9a8fb0'
  const browC = sinae ? '#7a4a40' : '#2f2837'
  const blushOp = [0, 0.6, 1][def.blush]

  return (
    <svg
      viewBox="0 0 200 290"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      role="img"
      aria-label={sinae ? '성시내' : '영'}
      style={{ overflow: 'visible' }}
    >
      <Defs />
      <ellipse cx="100" cy="282" rx="46" ry="6" fill="rgba(150,110,110,0.14)" />

      {/* ---------- 뒷머리 ---------- */}
      {sinae ? (
        <g>
          <path
            d="M22 112 C10 172 18 236 32 262 C46 272 62 254 62 234 L138 234 C138 254 154 272 168 262 C182 236 190 172 178 112 C174 38 130 16 100 16 C70 16 26 38 22 112Z"
            fill={hairFill}
            stroke={hairLine}
            strokeWidth="1.2"
          />
          <g fill="none" stroke={strand} strokeWidth="1.1" opacity="0.55" strokeLinecap="round">
            <path d="M34 130 C26 180 32 226 40 252" />
            <path d="M46 140 C40 186 46 226 52 246" />
            <path d="M166 130 C174 180 168 226 160 252" />
            <path d="M154 140 C160 186 154 226 148 246" />
          </g>
        </g>
      ) : (
        <g>
          <path
            d="M26 112 C18 164 26 196 48 208 C60 212 66 200 64 190 L136 190 C134 200 140 212 152 208 C174 196 182 164 174 112 C170 38 130 16 100 16 C70 16 30 38 26 112Z"
            fill={hairFill}
            stroke={hairLine}
            strokeWidth="1.2"
          />
          <g fill="none" stroke={hi} strokeWidth="1.1" opacity="0.45" strokeLinecap="round">
            <path d="M36 130 C30 160 36 188 46 200" />
            <path d="M164 130 C170 160 164 188 154 200" />
          </g>
        </g>
      )}

      {/* ---------- 몸 (작고 귀엽게) ---------- */}
      {sinae ? (
        <g strokeLinejoin="round" strokeWidth="1.5" stroke={CLOTH_LINE}>
          {/* 다리 / 신발 */}
          <rect x="84" y="246" width="12" height="22" rx="6" fill="#ffeadd" stroke={SKIN_LINE} />
          <rect x="104" y="246" width="12" height="22" rx="6" fill="#ffeadd" stroke={SKIN_LINE} />
          <ellipse cx="88" cy="271" rx="13" ry="7.5" fill="#fff" />
          <ellipse cx="112" cy="271" rx="13" ry="7.5" fill="#fff" />
          <path d="M80 273 H96 M104 273 H120" stroke="#f5b8b8" strokeWidth="2" strokeLinecap="round" />
          {/* 이너 + 가디건 */}
          <path d="M76 160 Q100 154 124 160 L127 228 Q100 236 73 228Z" fill="#fffdf9" />
          <path d="M88 166 V230 M96 164 V232 M104 164 V232 M112 166 V230" stroke="#f0e6da" strokeWidth="1.2" />
          <path d="M70 160 Q76 156 82 159 L84 232 Q74 234 68 228 Q64 196 70 160Z" fill="#fbf0e2" />
          <path d="M130 160 Q124 156 118 159 L116 232 Q126 234 132 228 Q136 196 130 160Z" fill="#fbf0e2" />
          {/* 하트 목걸이 */}
          <path d="M90 160 Q100 174 110 160" fill="none" stroke="#e6c27a" strokeWidth="1.2" />
          <path d="M100 178 c-2.4 -4 -7 0 -3.6 3.5 l3.6 3.2 l3.6 -3.2 c3.6 -3.5 -1.2 -7.5 -3.6 -3.5z" transform="translate(0 -4)" fill="#ffd8de" stroke="#e6c27a" strokeWidth="1" />
          {/* 체크 스커트 */}
          <path d="M70 226 Q100 238 130 226 L142 256 Q100 268 58 256Z" fill="url(#plaid)" />
          <rect x="70" y="224" width="60" height="7" rx="3" fill="#6e565c" />
          {/* 소매 + 손 */}
          <ellipse cx="62" cy="196" rx="9.5" ry="23" fill="#fbf0e2" transform="rotate(8 62 196)" />
          <ellipse cx="138" cy="196" rx="9.5" ry="23" fill="#fbf0e2" transform="rotate(-8 138 196)" />
          <circle cx="58" cy="219" r="7" fill="#ffeadd" stroke={SKIN_LINE} />
          <circle cx="142" cy="219" r="7" fill="#ffeadd" stroke={SKIN_LINE} />
        </g>
      ) : (
        <g strokeLinejoin="round" strokeWidth="1.5" stroke={CLOTH_LINE}>
          {/* 바지 / 신발 */}
          <path d="M76 234 H98 L96 262 H80Z" fill="#a4adb3" />
          <path d="M102 234 H124 L120 262 H104Z" fill="#a4adb3" />
          <ellipse cx="88" cy="267" rx="13" ry="7.5" fill="#fff" />
          <ellipse cx="112" cy="267" rx="13" ry="7.5" fill="#fff" />
          <path d="M80 269 H96 M104 269 H120" stroke="#b9c8a8" strokeWidth="2" strokeLinecap="round" />
          {/* 회청색 셔츠 */}
          <path d="M72 160 Q100 153 128 160 L132 236 Q100 244 68 236Z" fill="#b4c9ce" />
          <path d="M100 168 V238" stroke="#98b0b7" strokeWidth="1.3" />
          {[184, 202, 220].map((cy) => (
            <circle key={cy} cx="100" cy={cy} r="1.6" fill="#f6f9fa" stroke="#8aa3aa" strokeWidth="0.7" />
          ))}
          {[78, 106].map((x) => (
            <g key={x}>
              <rect x={x} y="184" width="16" height="17" rx="2.5" fill="#c3d6da" stroke="#8aa3aa" strokeWidth="1.2" />
              <path d={`M${x} 184 H${x + 16} L${x + 8} 192Z`} fill="#d0e0e3" stroke="#8aa3aa" strokeWidth="1" />
            </g>
          ))}
          <path d="M90 156 L100 172 L80 164Z" fill="#d6e3e6" />
          <path d="M110 156 L100 172 L120 164Z" fill="#d6e3e6" />
          <rect x="68" y="228" width="64" height="9" rx="3" fill="#3a3439" stroke="none" />
          <rect x="95" y="229" width="10" height="7" rx="1.5" fill="#e4e7ea" stroke="none" />
          <ellipse cx="62" cy="196" rx="9.5" ry="23" fill="#b4c9ce" transform="rotate(8 62 196)" />
          <ellipse cx="138" cy="196" rx="9.5" ry="23" fill="#b4c9ce" transform="rotate(-8 138 196)" />
          <circle cx="58" cy="219" r="7" fill="#ffeadd" stroke={SKIN_LINE} />
          <circle cx="142" cy="219" r="7" fill="#ffeadd" stroke={SKIN_LINE} />
        </g>
      )}

      {/* ---------- 얼굴 ---------- */}
      <ellipse cx="100" cy="108" rx="70" ry="62" fill="url(#skinG)" stroke={SKIN_LINE} strokeWidth="1.5" />
      {/* 귀 */}
      <ellipse cx="32" cy="120" rx="5" ry="8" fill="#ffeadd" stroke={SKIN_LINE} strokeWidth="1.2" />
      <ellipse cx="168" cy="120" rx="5" ry="8" fill="#ffeadd" stroke={SKIN_LINE} strokeWidth="1.2" />
      <circle cx="32" cy="130" r="2.4" fill={sinae ? '#eef3f6' : '#f3dca8'} stroke={sinae ? '#b8c4cc' : '#cfae62'} strokeWidth="0.8" />
      <circle cx="168" cy="130" r="2.4" fill={sinae ? '#eef3f6' : '#f3dca8'} stroke={sinae ? '#b8c4cc' : '#cfae62'} strokeWidth="0.8" />

      {/* 볼터치 */}
      <ellipse cx="50" cy="134" rx="17" ry="10" fill="url(#blushG)" opacity={blushOp} />
      <ellipse cx="150" cy="134" rx="17" ry="10" fill="url(#blushG)" opacity={blushOp} />
      {def.blush === 2 && (
        <g stroke="#f58a9a" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
          <path d="M42 132 l3 5 M48 131 l3 5 M54 130 l3 5" />
          <path d="M146 130 l3 5 M152 131 l3 5 M158 132 l3 5" />
        </g>
      )}

      <EyesSvg type={def.eyes} who={who} />
      <MouthSvg type={def.mouth} />

      {/* ---------- 앞머리 ---------- */}
      {sinae ? (
        <g>
          {/* 풀 뱅 + 사이사이 틈이 있는 앞머리 */}
          <path
            d="M24 116 C18 48 62 14 100 14 C140 14 184 48 176 116 C172 104 166 94 158 86 C154 94 146 96 140 90 C134 84 128 80 122 76 C118 88 108 92 100 86 C94 92 84 90 78 84 C72 80 66 82 62 78 C56 90 44 104 24 116Z"
            fill={hairFill}
            stroke={hairLine}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <g fill="none" stroke={strand} strokeWidth="1.1" opacity="0.6" strokeLinecap="round">
            <path d="M100 14 C92 40 84 62 78 84" />
            <path d="M100 14 C108 40 116 60 122 76" />
            <path d="M60 24 C52 52 44 84 34 108" />
            <path d="M140 24 C148 52 158 84 168 108" />
          </g>
          <path d="M62 34 Q84 22 112 28" fill="none" stroke="#f3d4c0" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
          {/* 얼굴을 감싸고 내려오는 긴 옆머리 */}
          <path d="M24 116 C26 150 26 190 34 224 C46 216 50 190 50 156 C50 140 48 126 46 108Z" fill={hairFill} stroke={hairLine} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M176 116 C174 150 174 190 166 224 C154 216 150 190 150 156 C150 140 152 126 154 108Z" fill={hairFill} stroke={hairLine} strokeWidth="1.2" strokeLinejoin="round" />
          {/* 복숭아 머리핀 */}
          <g transform="translate(150 46)">
            <circle r="10" fill="#f9c2c2" stroke="#e39a9f" strokeWidth="1.2" />
            <path d="M0 -9 q7 -7 11 -3.5 q-3.5 6 -11 3.5z" fill="#c9d8b6" stroke="#9fb58c" strokeWidth="1" />
            <ellipse cx="-3.5" cy="-2.5" rx="2.6" ry="4" fill="#fff" opacity="0.6" />
          </g>
        </g>
      ) : (
        <g>
          {/* 가운데 가르마 단발 */}
          <path
            d="M26 116 C20 48 64 14 100 14 C136 14 182 48 174 116 C170 100 160 88 146 82 C130 76 112 74 100 66 C88 74 70 76 54 82 C40 88 30 100 26 116Z"
            fill={hairFill}
            stroke={hairLine}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <g fill="none" stroke={hi} strokeWidth="1.1" opacity="0.55" strokeLinecap="round">
            <path d="M100 14 L100 64" />
            <path d="M92 20 C80 40 66 60 48 80" />
            <path d="M108 20 C120 40 134 60 152 80" />
          </g>
          <path d="M60 32 Q82 22 98 26" fill="none" stroke="#b3a8c6" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
          <path d="M102 26 Q120 22 140 32" fill="none" stroke="#b3a8c6" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
          {/* 얼굴선을 따라 안쪽으로 말리는 옆머리 */}
          <path d="M26 116 C24 148 28 178 46 196 C58 200 60 186 52 176 C46 160 46 132 50 100Z" fill={hairFill} stroke={hairLine} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M174 116 C176 148 172 178 154 196 C142 200 140 186 148 176 C154 160 154 132 150 100Z" fill={hairFill} stroke={hairLine} strokeWidth="1.2" strokeLinejoin="round" />
          {/* 작은 머리핀 */}
          <g stroke="#e6b3bb" strokeWidth="3" strokeLinecap="round">
            <path d="M138 44 l14 -5" />
            <path d="M140 52 l14 -5" />
          </g>
        </g>
      )}

      <BrowSvg type={def.brow} color={browC} />
      <Extras type={def.extra} />
    </svg>
  )
}
