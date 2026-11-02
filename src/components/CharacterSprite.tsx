import type { SinaeFace, YoungFace } from '../data/types'

/**
 * 오리지널 파스텔 치비 캐릭터 (자체 제작 SVG).
 * 인기 치비 일러스트의 공통 문법을 따른다:
 *  · 머리가 키의 절반 이상, 볼이 통통하고 턱이 작은 얼굴, 눈은 얼굴 아래쪽에 크게
 *  · 머리카락은 가는 결 선 대신 뾰족한 큰 덩어리 + 셀 음영, 앞머리가 이마에 그림자를 드리움
 *  · 몸은 아주 작고 뭉툭하게
 * 시내: 풍성한 긴 머리 · 크림 가디건 · 체크 스커트 / 영: 가운데 가르마 단발 · 회청색 포켓 셔츠.
 * 실제 인물의 얼굴을 옮기지 않고 헤어/의상 같은 스타일 요소만 참고했다.
 */

type Eyes = 'dot' | 'happy' | 'sparkle' | 'smug' | 'wide' | 'soft' | 'shy' | 'swirl' | 'intense'
type Mouth = 'smile' | 'open' | 'cat' | 'small' | 'o' | 'wavy' | 'smirk'
type Who = 'sinae' | 'young'

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

const SKIN_LINE = '#e6bcae'
const CLOTH_LINE = '#c4a39d'
const MOUTH_LINE = '#c4707c'

/** 얼굴: 볼이 통통하고 턱이 작은 치비 윤곽 */
const FACE_D =
  'M31 106 C31 62 64 40 100 40 C136 40 169 62 169 106 C169 140 148 164 122 171 Q100 177 78 171 C52 164 31 140 31 106Z'

/** 시내 앞머리+옆머리 (하나로 이어진 덩어리, 끝이 뾰족한 앞머리) */
const HAIR_S_D =
  'M44 238 C20 206 8 150 16 108 C22 38 62 4 100 4 C138 4 178 38 184 108 C192 150 180 206 156 238 C150 218 146 192 146 162 C146 138 150 116 154 98 Q148 94 144 86 Q140 96 130 96 Q124 94 120 84 Q116 94 108 96 Q102 92 100 82 Q96 94 88 96 Q80 94 76 86 Q70 96 60 96 Q52 94 48 88 Q46 94 46 98 C50 116 54 138 54 162 C54 192 50 218 44 238Z'

/** 영 앞머리+옆머리 (가운데 가르마, 안쪽으로 말리는 단발) */
const HAIR_Y_D =
  'M52 200 C28 178 12 144 16 108 C22 38 62 4 100 4 C138 4 178 38 184 108 C188 144 172 178 148 200 C140 190 144 170 146 158 C146 136 150 114 156 96 Q142 94 128 88 Q114 82 100 64 Q86 82 72 88 Q58 94 44 96 C50 114 54 136 54 158 C56 170 60 190 52 200Z'

function Defs() {
  return (
    <defs>
      <linearGradient id="irisS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4a2c2e" />
        <stop offset="0.6" stopColor="#8a5a54" />
        <stop offset="1" stopColor="#e0988c" />
      </linearGradient>
      <linearGradient id="irisY" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#241d33" />
        <stop offset="0.6" stopColor="#4d4a6e" />
        <stop offset="1" stopColor="#93a8d6" />
      </linearGradient>
      <linearGradient id="hairS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8d5c4e" />
        <stop offset="0.5" stopColor="#a9715f" />
        <stop offset="1" stopColor="#d7a78f" />
      </linearGradient>
      <linearGradient id="hairSback" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6f4339" />
        <stop offset="1" stopColor="#b98672" />
      </linearGradient>
      <linearGradient id="hairY" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3d3445" />
        <stop offset="0.6" stopColor="#554a60" />
        <stop offset="1" stopColor="#7c708c" />
      </linearGradient>
      <linearGradient id="hairYback" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2a2232" />
        <stop offset="1" stopColor="#5a4f68" />
      </linearGradient>
      <linearGradient id="bangShade" gradientUnits="userSpaceOnUse" x1="0" y1="56" x2="0" y2="118">
        <stop offset="0" stopColor="#3a1f1f" stopOpacity="0" />
        <stop offset="0.6" stopColor="#3a1f1f" stopOpacity="0.3" />
        <stop offset="1" stopColor="#3a1f1f" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="skinG" cx="0.5" cy="0.42" r="0.65">
        <stop offset="0" stopColor="#fff6ee" />
        <stop offset="1" stopColor="#ffe2d2" />
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
      <clipPath id="faceClip">
        <path d={FACE_D} />
      </clipPath>
      <clipPath id="hairClipS">
        <path d={HAIR_S_D} />
      </clipPath>
      <clipPath id="hairClipY">
        <path d={HAIR_Y_D} />
      </clipPath>
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

/** 맑고 큰 눈: 위는 진하고 아래는 밝게 비치는 홍채 + 큰 하이라이트 + 굵은 윗속눈썹 */
function GlossEye({ who, x, y, side, w = 14, h = 16.5, look = 0, lidDrop = 0, star = false }: EyeProps) {
  const cx = x + look
  const lash = who === 'sinae' ? '#5a3a36' : '#2c2438'
  const glow = who === 'sinae' ? '#ffc7ba' : '#cfdcf8'
  return (
    <g>
      <ellipse cx={cx} cy={y} rx={w} ry={h} fill={`url(#iris${who === 'sinae' ? 'S' : 'Y'})`} />
      <ellipse cx={cx} cy={y + h * 0.42} rx={w * 0.72} ry={h * 0.42} fill={glow} opacity="0.55" />
      <circle cx={cx - w * 0.34} cy={y - h * 0.34} r={w * 0.42} fill="#fff" />
      <circle cx={cx + w * 0.42} cy={y + h * 0.4} r={w * 0.2} fill="#fff" />
      {star && (
        <path d={`M${cx + 5} ${y - 8} l1.8 3.8 l3.8 1.8 l-3.8 1.8 l-1.8 3.8 l-1.8 -3.8 l-3.8 -1.8 l3.8 -1.8z`} fill="#fff" />
      )}
      <path
        d={`M${x - w - 0.5} ${y - 2 + lidDrop} Q${x} ${y - h - 3.5 + lidDrop} ${x + w + 0.5} ${y - 2 + lidDrop}`}
        fill="none"
        stroke={lash}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d={`M${x + side * (w + 0.5)} ${y - 2 + lidDrop} l${side * 3.8} -2.6`} stroke={lash} strokeWidth="2.4" strokeLinecap="round" />
    </g>
  )
}

function EyesSvg({ type, who }: { type: Eyes; who: Who }) {
  const L = 68
  const R = 132
  const y = 119
  const lash = who === 'sinae' ? '#5a3a36' : '#2c2438'
  const iris = `url(#iris${who === 'sinae' ? 'S' : 'Y'})`
  const arc = (x: number, side: -1 | 1) => (
    <g key={x} fill="none" stroke={lash} strokeLinecap="round">
      <path d={`M${x - 12} ${y + 4} Q${x} ${y - 14} ${x + 12} ${y + 4}`} strokeWidth="3.8" />
      <path d={`M${x + side * 12} ${y + 4} l${side * 3} -2.4`} strokeWidth="2.4" />
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
          <GlossEye {...g} x={L} y={y} side={-1} w={15.5} h={18} star />
          <GlossEye {...g} x={R} y={y} side={1} w={15.5} h={18} star />
        </g>
      )
    case 'smug':
      return (
        <g>
          {([[L, -1], [R, 1]] as [number, -1 | 1][]).map(([x, sd]) => (
            <g key={x}>
              <path d={`M${x - 13} ${y} H${x + 13} A13 12 0 0 1 ${x - 13} ${y} Z`} fill={iris} />
              <circle cx={x - 4} cy={y + 4} r="2.8" fill="#fff" />
              <path d={`M${x - 14} ${y - 0.5} H${x + 14}`} stroke={lash} strokeWidth="3.2" strokeLinecap="round" />
              <path d={`M${x + sd * 14} ${y - 0.5} l${sd * 3.8} -2.8`} stroke={lash} strokeWidth="2.4" strokeLinecap="round" />
            </g>
          ))}
        </g>
      )
    case 'wide':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx="14" ry="17" fill="#fff" stroke={lash} strokeWidth="2.2" />
              <circle cx={x} cy={y + 1} r="7" fill={iris} />
              <circle cx={x - 2} cy={y - 1.5} r="2.4" fill="#fff" />
            </g>
          ))}
        </g>
      )
    case 'soft':
      return (
        <g>
          <GlossEye {...g} x={L} y={y + 1} side={-1} w={14} h={15} lidDrop={2} />
          <GlossEye {...g} x={R} y={y + 1} side={1} w={14} h={15} lidDrop={2} />
        </g>
      )
    case 'shy':
      return (
        <g>
          <GlossEye {...g} x={L} y={y + 2} side={-1} w={13} h={14.5} look={3.5} />
          <GlossEye {...g} x={R} y={y + 2} side={1} w={13} h={14.5} look={3.5} />
        </g>
      )
    case 'swirl':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <circle cx={x} cy={y} r="14" fill="#fff" stroke={lash} strokeWidth="2.2" />
              <path
                d={`M${x} ${y} m-6 0 a6 6 0 1 1 6 6 a3 3 0 1 1 -2.2 -4.5`}
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
          <GlossEye {...g} x={L} y={y} side={-1} w={14} h={16.5} lidDrop={2.5} star />
          <GlossEye {...g} x={R} y={y} side={1} w={14} h={16.5} lidDrop={2.5} star />
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
  const s = { stroke: color, strokeWidth: 2.2, strokeLinecap: 'round' as const, fill: 'none', opacity: 0.8 }
  return (
    <g transform="translate(0 8)">
      {type === 'up' && (
        <g {...s}>
          <path d="M56 84 Q68 76 80 82" />
          <path d="M120 82 Q132 76 144 84" />
        </g>
      )}
      {type === 'angry' && (
        <g {...s} strokeWidth={2.8} opacity={0.95}>
          <path d="M54 80 L82 90" />
          <path d="M146 80 L118 90" />
        </g>
      )}
      {type === 'worry' && (
        <g {...s}>
          <path d="M56 90 Q68 83 80 84" />
          <path d="M144 90 Q132 83 120 84" />
        </g>
      )}
      {type === 'flat' && (
        <g {...s}>
          <path d="M57 86 Q68 82 80 85" />
          <path d="M120 85 Q132 82 143 86" />
        </g>
      )}
    </g>
  )
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
  return <g transform="translate(100 152) scale(0.85) translate(-100 -129)">{inner}</g>
}

function Extras({ type }: { type?: FaceDef['extra'] }) {
  if (!type) return null
  if (type === 'sweat') return <path d="M166 74 q-7 12 0 16 q7 -4 0 -16z" fill="#d3effb" stroke="#9cc9e0" strokeWidth="1.6" />
  if (type === 'bang')
    return (
      <g stroke="#ee8a9a" strokeWidth="3.6" strokeLinecap="round">
        <path d="M168 50 l8 -10" />
        <path d="M174 64 l12 -3" />
        <path d="M168 78 l9 5" />
      </g>
    )
  if (type === 'hearts')
    return (
      <g fill="#f79aa8">
        <path d="M168 42 c-5 -8 -16 0 -8 8 l8 7 l8 -7 c8 -8 -3 -16 -8 -8z" />
        <path d="M26 52 c-4 -6 -12 0 -6 6 l6 5 l6 -5 c6 -6 -2 -12 -6 -6z" />
      </g>
    )
  return (
    <g fill="#ffd97a">
      <path d="M170 46 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" />
      <path d="M28 60 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" />
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
  const hairLine = sinae ? '#6b4036' : '#2a2230'
  const hairD = sinae ? HAIR_S_D : HAIR_Y_D
  const clip = sinae ? 'url(#hairClipS)' : 'url(#hairClipY)'
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
      <ellipse cx="100" cy="283" rx="46" ry="6" fill="rgba(150,110,110,0.14)" />

      {/* ---------- 뒷머리 (두상보다 풍성하게) ---------- */}
      {sinae ? (
        <path
          d="M12 112 C-2 180 6 250 24 278 C40 288 58 270 60 248 L140 248 C142 270 160 288 176 278 C194 250 202 180 188 112 C182 32 140 0 100 0 C60 0 18 32 12 112Z"
          fill="url(#hairSback)"
          stroke={hairLine}
          strokeWidth="1.4"
        />
      ) : (
        <path
          d="M14 112 C4 160 14 206 42 220 C58 224 66 208 62 198 L138 198 C134 208 142 224 158 220 C186 206 196 160 186 112 C180 32 140 0 100 0 C60 0 20 32 14 112Z"
          fill="url(#hairYback)"
          stroke={hairLine}
          strokeWidth="1.4"
        />
      )}

      {/* ---------- 몸: 아주 작고 뭉툭하게 ---------- */}
      <g transform="translate(100 282) scale(0.9) translate(-100 -282)">
        {sinae ? (
          <g strokeLinejoin="round" strokeWidth="1.5" stroke={CLOTH_LINE}>
            <rect x="82" y="246" width="14" height="24" rx="7" fill="#ffeadd" stroke={SKIN_LINE} />
            <rect x="104" y="246" width="14" height="24" rx="7" fill="#ffeadd" stroke={SKIN_LINE} />
            <ellipse cx="88" cy="273" rx="14" ry="8" fill="#fff" />
            <ellipse cx="112" cy="273" rx="14" ry="8" fill="#fff" />
            <path d="M80 275 H96 M104 275 H120" stroke="#f5b8b8" strokeWidth="2" strokeLinecap="round" />
            <path d="M74 166 Q100 160 126 166 L129 232 Q100 240 71 232Z" fill="#fffdf9" />
            <path d="M88 172 V234 M96 170 V236 M104 170 V236 M112 172 V234" stroke="#f0e6da" strokeWidth="1.2" />
            <path d="M68 166 Q74 162 80 165 L82 236 Q72 238 66 232 Q62 200 68 166Z" fill="#fbf0e2" />
            <path d="M132 166 Q126 162 120 165 L118 236 Q128 238 134 232 Q138 200 132 166Z" fill="#fbf0e2" />
            <path d="M90 166 Q100 180 110 166" fill="none" stroke="#e6c27a" strokeWidth="1.2" />
            <path d="M100 188 c-2.4 -4 -7 0 -3.6 3.5 l3.6 3.2 l3.6 -3.2 c3.6 -3.5 -1.2 -7.5 -3.6 -3.5z" transform="translate(0 -6)" fill="#ffd8de" stroke="#e6c27a" strokeWidth="1" />
            <path d="M68 230 Q100 242 132 230 L146 262 Q100 274 54 262Z" fill="url(#plaid)" />
            <rect x="68" y="228" width="64" height="7" rx="3" fill="#6e565c" />
            <ellipse cx="60" cy="200" rx="10" ry="22" fill="#fbf0e2" transform="rotate(8 60 200)" />
            <ellipse cx="140" cy="200" rx="10" ry="22" fill="#fbf0e2" transform="rotate(-8 140 200)" />
            <circle cx="56" cy="222" r="7.5" fill="#ffeadd" stroke={SKIN_LINE} />
            <circle cx="144" cy="222" r="7.5" fill="#ffeadd" stroke={SKIN_LINE} />
          </g>
        ) : (
          <g strokeLinejoin="round" strokeWidth="1.5" stroke={CLOTH_LINE}>
            <path d="M76 238 H98 L96 266 H80Z" fill="#a4adb3" />
            <path d="M102 238 H124 L120 266 H104Z" fill="#a4adb3" />
            <ellipse cx="88" cy="271" rx="14" ry="8" fill="#fff" />
            <ellipse cx="112" cy="271" rx="14" ry="8" fill="#fff" />
            <path d="M80 273 H96 M104 273 H120" stroke="#b9c8a8" strokeWidth="2" strokeLinecap="round" />
            <path d="M72 166 Q100 159 128 166 L132 240 Q100 248 68 240Z" fill="#b4c9ce" />
            <path d="M100 174 V242" stroke="#98b0b7" strokeWidth="1.3" />
            {[188, 206, 224].map((cy) => (
              <circle key={cy} cx="100" cy={cy} r="1.6" fill="#f6f9fa" stroke="#8aa3aa" strokeWidth="0.7" />
            ))}
            {[78, 106].map((x) => (
              <g key={x}>
                <rect x={x} y="188" width="16" height="17" rx="2.5" fill="#c3d6da" stroke="#8aa3aa" strokeWidth="1.2" />
                <path d={`M${x} 188 H${x + 16} L${x + 8} 196Z`} fill="#d0e0e3" stroke="#8aa3aa" strokeWidth="1" />
              </g>
            ))}
            <path d="M90 162 L100 178 L80 170Z" fill="#d6e3e6" />
            <path d="M110 162 L100 178 L120 170Z" fill="#d6e3e6" />
            <rect x="68" y="232" width="64" height="9" rx="3" fill="#3a3439" stroke="none" />
            <rect x="95" y="233" width="10" height="7" rx="1.5" fill="#e4e7ea" stroke="none" />
            <ellipse cx="60" cy="200" rx="10" ry="22" fill="#b4c9ce" transform="rotate(8 60 200)" />
            <ellipse cx="140" cy="200" rx="10" ry="22" fill="#b4c9ce" transform="rotate(-8 140 200)" />
            <circle cx="56" cy="222" r="7.5" fill="#ffeadd" stroke={SKIN_LINE} />
            <circle cx="144" cy="222" r="7.5" fill="#ffeadd" stroke={SKIN_LINE} />
          </g>
        )}
      </g>

      {/* ---------- 얼굴 ---------- */}
      <path d={FACE_D} fill="url(#skinG)" stroke={SKIN_LINE} strokeWidth="1.5" />
      {/* 앞머리가 이마에 드리우는 그림자 */}
      <g clipPath="url(#faceClip)">
        <path d={hairD} transform="translate(0 10)" fill="#e9b5a2" opacity="0.5" />
      </g>
      {/* 볼터치 */}
      <ellipse cx="55" cy="144" rx="16" ry="10" fill="url(#blushG)" opacity={blushOp} />
      <ellipse cx="145" cy="144" rx="16" ry="10" fill="url(#blushG)" opacity={blushOp} />
      {def.blush === 2 && (
        <g stroke="#f58a9a" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
          <path d="M48 142 l3 5 M54 141 l3 5 M60 140 l3 5" />
          <path d="M140 140 l3 5 M146 141 l3 5 M152 142 l3 5" />
        </g>
      )}

      <EyesSvg type={def.eyes} who={who} />
      <MouthSvg type={def.mouth} />

      {/* ---------- 앞머리 + 옆머리 (하나로 이어진 덩어리) ---------- */}
      <path d={hairD} fill={hairFill} stroke={hairLine} strokeWidth="1.6" strokeLinejoin="round" />
      <g clipPath={clip}>
        {/* 앞머리 끝쪽 셀 음영 */}
        <rect x="0" y="50" width="200" height="72" fill="url(#bangShade)" />
        {/* 덩어리를 나누는 굵은 선 */}
        <g fill="none" stroke={hairLine} strokeWidth="1.6" strokeLinecap="round" opacity="0.5">
          {sinae ? (
            <>
              <path d="M100 6 C98 34 98 58 100 82" />
              <path d="M82 10 C74 36 70 60 76 86" />
              <path d="M120 10 C126 36 126 58 120 84" />
              <path d="M36 70 C30 120 32 190 44 232" />
              <path d="M164 70 C170 120 168 190 156 232" />
            </>
          ) : (
            <>
              <path d="M100 6 L100 64" />
              <path d="M90 12 C82 38 66 64 48 88" />
              <path d="M110 12 C118 38 134 64 152 88" />
              <path d="M32 80 C26 130 36 176 52 198" />
              <path d="M168 80 C174 130 164 176 148 198" />
            </>
          )}
        </g>
        {/* 윗머리 하이라이트 */}
        <path d="M46 36 Q80 12 124 20" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity="0.28" />
        <path d="M130 24 Q150 30 162 48" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.2" />
      </g>

      {sinae ? (
        <g transform="translate(146 34)">
          <circle r="10" fill="#f9c2c2" stroke="#e39a9f" strokeWidth="1.2" />
          <path d="M0 -9 q7 -7 11 -3.5 q-3.5 6 -11 3.5z" fill="#c9d8b6" stroke="#9fb58c" strokeWidth="1" />
          <ellipse cx="-3.5" cy="-2.5" rx="2.6" ry="4" fill="#fff" opacity="0.6" />
        </g>
      ) : (
        <g stroke="#e6b3bb" strokeWidth="3" strokeLinecap="round">
          <path d="M138 30 l14 -5" />
          <path d="M140 38 l14 -5" />
        </g>
      )}

      <BrowSvg type={def.brow} color={browC} />
      <Extras type={def.extra} />
    </svg>
  )
}
