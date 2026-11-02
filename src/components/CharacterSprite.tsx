import type { SinaeFace, YoungFace } from '../data/types'

/**
 * 교체 가능한 임시 SD 캐릭터 (자체 제작 SVG).
 * 실제 팬아트로 교체할 수 있는 구조 (아래 IMAGES 참고). 특정 배우의 외모를 재현하지 않은 오리지널 디자인이다.
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

const INK = '#4d3538'
const MOUTH_RED = '#c95f6b'

function EyesSvg({ type }: { type: Eyes }) {
  const L = 76
  const R = 124
  const y = 104
  const hl = (cx: number, cy: number, r = 2.2) => <circle cx={cx} cy={cy} r={r} fill="#fff" />
  switch (type) {
    case 'happy':
      return (
        <g fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round">
          <path d={`M${L - 9} ${y + 3} Q${L} ${y - 11} ${L + 9} ${y + 3}`} />
          <path d={`M${R - 9} ${y + 3} Q${R} ${y - 11} ${R + 9} ${y + 3}`} />
        </g>
      )
    case 'sparkle':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx="8.5" ry="10.5" fill={INK} />
              {hl(x - 3, y - 4, 3.2)}
              {hl(x + 3.5, y + 3, 1.8)}
            </g>
          ))}
        </g>
      )
    case 'smug':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <path d={`M${x - 9} ${y} H${x + 9} A9 8 0 0 1 ${x - 9} ${y} Z`} fill={INK} />
              <path d={`M${x - 10} ${y - 1} H${x + 10}`} stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
              {hl(x - 2, y + 3, 1.8)}
            </g>
          ))}
        </g>
      )
    case 'wide':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx="8.5" ry="11" fill="#fff" stroke={INK} strokeWidth="3" />
              <circle cx={x} cy={y + 1} r="3.6" fill={INK} />
            </g>
          ))}
        </g>
      )
    case 'soft':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y + 1} rx="6.5" ry="8" fill={INK} />
              {hl(x - 2, y - 2, 2.4)}
              <path d={`M${x - 9} ${y - 5} Q${x} ${y - 11} ${x + 9} ${y - 5}`} fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
            </g>
          ))}
        </g>
      )
    case 'shy':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y + 2} rx="6" ry="7.5" fill={INK} />
              {hl(x + 2, y - 1, 2.4)}
            </g>
          ))}
        </g>
      )
    case 'swirl':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <circle cx={x} cy={y} r="9.5" fill="#fff" stroke={INK} strokeWidth="3" />
              <path d={`M${x} ${y} m-4 0 a4 4 0 1 1 4 4 a2 2 0 1 1 -1.5 -3`} fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
            </g>
          ))}
        </g>
      )
    case 'intense':
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx="8" ry="9.5" fill={INK} />
              {hl(x - 2.5, y - 3, 3)}
              {hl(x + 3, y + 3, 1.6)}
            </g>
          ))}
        </g>
      )
    default:
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx="6" ry="8" fill={INK} />
              {hl(x - 2, y - 3, 2.4)}
            </g>
          ))}
        </g>
      )
  }
}

function BrowSvg({ type = 'flat' }: { type?: FaceDef['brow'] }) {
  const s = { stroke: INK, strokeWidth: 3, strokeLinecap: 'round' as const, fill: 'none' }
  switch (type) {
    case 'up':
      return (
        <g {...s}>
          <path d="M66 86 Q76 80 86 85" />
          <path d="M114 85 Q124 80 134 86" />
        </g>
      )
    case 'angry':
      return (
        <g {...s}>
          <path d="M66 82 L86 88" />
          <path d="M134 82 L114 88" />
        </g>
      )
    case 'worry':
      return (
        <g {...s}>
          <path d="M66 88 L86 84" />
          <path d="M134 88 L114 84" />
        </g>
      )
    default:
      return (
        <g {...s}>
          <path d="M67 86 Q76 83 85 86" />
          <path d="M115 86 Q124 83 133 86" />
        </g>
      )
  }
}

function MouthSvg({ type }: { type: Mouth }) {
  const s = { stroke: INK, strokeWidth: 3.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }
  switch (type) {
    case 'open':
      return (
        <g>
          <path d="M88 124 Q100 150 112 124 Z" fill={MOUTH_RED} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="100" cy="137" rx="6" ry="3.4" fill="#f58b96" />
        </g>
      )
    case 'cat':
      return <path d="M88 126 Q94 134 100 127 Q106 134 112 126" {...s} />
    case 'small':
      return <path d="M94 128 Q100 134 106 128" {...s} />
    case 'o':
      return <ellipse cx="100" cy="132" rx="5" ry="6.5" fill={MOUTH_RED} stroke={INK} strokeWidth="3" />
    case 'wavy':
      return <path d="M90 130 Q95 124 100 130 T110 130" {...s} />
    case 'smirk':
      return <path d="M91 129 Q103 137 113 123" {...s} />
    default:
      return <path d="M90 126 Q100 137 110 126" {...s} />
  }
}

function Extras({ type }: { type?: FaceDef['extra'] }) {
  if (!type) return null
  if (type === 'sweat')
    return <path d="M152 66 q-7 12 0 16 q7 -4 0 -16z" fill="#bfe3f5" stroke="#7fb4cf" strokeWidth="2" />
  if (type === 'bang')
    return (
      <g stroke="#d98b96" strokeWidth="4" strokeLinecap="round">
        <path d="M156 52 l8 -10" />
        <path d="M162 66 l12 -3" />
        <path d="M156 80 l9 5" />
      </g>
    )
  if (type === 'hearts')
    return (
      <g fill="#f08a94">
        <path d="M150 52 c-6 -9 -18 0 -9 9 l9 8 l9 -8 c9 -9 -3 -18 -9 -9z" transform="scale(.8) translate(40 6)" />
        <path d="M30 46 c-4 -6 -12 0 -6 6 l6 5 l6 -5 c6 -6 -2 -12 -6 -6z" />
      </g>
    )
  return (
    <g fill="#ffd36b">
      <path d="M160 48 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" />
      <path d="M38 60 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" />
    </g>
  )
}

interface Props {
  who: 'sinae' | 'young'
  face: SinaeFace | YoungFace
  className?: string
}

/**
 * 팬아트 교체 훅: src/assets/characters/ 에 `sinae-smile.png`, `young-flutter.png` 처럼
 * `{who}-{face}.png|webp|svg` 파일을 넣으면 해당 표정은 자동으로 이미지로 대체된다.
 * 파일이 없는 표정은 아래의 SVG 임시 캐릭터로 표시된다.
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
  if (img) return <img src={img} alt={who === 'sinae' ? '성시내' : '영'} className={`${className ?? ''} object-contain object-bottom`} draggable={false} />
  return <ChibiSvg who={who} face={face} className={className} />
}

/** 두 인물의 SD 스프라이트. 시내: 긴 밤색 머리·복숭아 핀 / 영: 짧은 검은 머리·살구색 상의. */
function ChibiSvg({ who, face, className }: Props) {
  const def = (who === 'sinae' ? SINAE_FACES[face as SinaeFace] : YOUNG_FACES[face as YoungFace]) ?? SINAE_FACES.smile
  const sinae = who === 'sinae'
  const hair = sinae ? '#8d5f52' : '#3f3438'
  const hairShade = sinae ? '#76483f' : '#2c2427'
  const skin = '#ffe4d4'
  const top = sinae ? '#f5b8b8' : '#fff4e2'
  const bottom = sinae ? '#b9c8a8' : '#7d8fa0'
  const blushOpacity = [0, 0.5, 0.9][def.blush]

  return (
    <svg
      viewBox="0 0 200 290"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      role="img"
      aria-label={sinae ? '성시내' : '영'}
      style={{ overflow: 'visible' }}
    >
      {/* 그림자 */}
      <ellipse cx="100" cy="280" rx="54" ry="8" fill="rgba(118,87,90,0.18)" />

      {/* 뒷머리 */}
      {sinae ? (
        <path d="M36 100 C26 170 36 205 58 212 L142 212 C164 205 174 170 164 100 Z" fill={hairShade} />
      ) : (
        <path d="M40 98 C34 150 46 162 62 160 L138 160 C154 162 166 150 160 98 Z" fill={hairShade} />
      )}

      {/* 다리 + 신발 */}
      <rect x="78" y="228" width="16" height="30" rx="7" fill={skin} stroke={INK} strokeWidth="2.5" />
      <rect x="106" y="228" width="16" height="30" rx="7" fill={skin} stroke={INK} strokeWidth="2.5" />
      <ellipse cx="82" cy="263" rx="17" ry="10" fill="#fff" stroke={INK} strokeWidth="3" />
      <ellipse cx="118" cy="263" rx="17" ry="10" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M74 259 l8 3 l8 -3 M110 259 l8 3 l8 -3" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 몸 */}
      {sinae ? (
        <g>
          <path d="M68 156 Q100 146 132 156 L142 236 Q100 248 58 236 Z" fill={top} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M60 214 Q100 226 140 214 L144 238 Q100 250 56 238 Z" fill={bottom} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M88 150 L100 166 L112 150" fill="#fff" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      ) : (
        <g>
          <path d="M70 158 Q100 148 130 158 L138 232 Q100 242 62 232 Z" fill={top} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M92 150 Q100 162 108 150" fill="#e9d3b3" stroke={INK} strokeWidth="2.5" />
          <path d="M100 162 V230" stroke={INK} strokeWidth="2" opacity="0.4" />
          <rect x="64" y="222" width="72" height="20" rx="8" fill={bottom} stroke={INK} strokeWidth="3" />
        </g>
      )}
      {/* 팔 */}
      <ellipse cx="62" cy="188" rx="11" ry="26" fill={top} stroke={INK} strokeWidth="3" transform="rotate(10 62 188)" />
      <ellipse cx="138" cy="188" rx="11" ry="26" fill={top} stroke={INK} strokeWidth="3" transform="rotate(-10 138 188)" />
      <circle cx="58" cy="214" r="9" fill={skin} stroke={INK} strokeWidth="2.5" />
      <circle cx="142" cy="214" r="9" fill={skin} stroke={INK} strokeWidth="2.5" />

      {/* 얼굴 */}
      <circle cx="100" cy="98" r="62" fill={skin} stroke={INK} strokeWidth="3.5" />

      {/* 볼터치 */}
      <ellipse cx="56" cy="122" rx="12" ry="7" fill="#f4808c" opacity={blushOpacity} />
      <ellipse cx="144" cy="122" rx="12" ry="7" fill="#f4808c" opacity={blushOpacity} />

      <BrowSvg type={def.brow} />
      <EyesSvg type={def.eyes} />
      <MouthSvg type={def.mouth} />

      {/* 앞머리 */}
      {sinae ? (
        <g>
          <path
            d="M36 100 C30 46 70 28 100 30 C138 28 172 50 164 100 C154 82 142 70 122 64 C112 80 84 84 66 76 C54 82 44 90 36 100 Z"
            fill={hair}
            stroke={INK}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M82 40 Q96 36 108 44" stroke="#b78274" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* 복숭아 머리핀 */}
          <g transform="translate(142 56)">
            <circle r="11" fill="#f5b8b8" stroke={INK} strokeWidth="2.5" />
            <path d="M0 -10 q8 -8 12 -4 q-4 7 -12 4z" fill="#b9c8a8" stroke={INK} strokeWidth="2" />
          </g>
        </g>
      ) : (
        <g>
          <path
            d="M38 98 C34 46 72 30 100 30 C130 30 168 48 162 98 C150 76 134 66 116 68 C106 80 80 82 68 70 C54 76 46 86 38 98 Z"
            fill={hair}
            stroke={INK}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M100 32 C94 12 114 4 120 20" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M78 42 Q92 38 104 46" stroke="#6a5a60" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      )}

      <Extras type={def.extra} />
    </svg>
  )
}
