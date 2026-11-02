import type { BgId } from '../data/types'
import PeachIcon from './PeachIcon'

const W = 800
const H = 600

function Cloud({ x, y, s = 1, delay = 0, dur = 90 }: { x: number; y: number; s?: number; delay?: number; dur?: number }) {
  return (
    <g style={{ animation: `drift ${dur}s linear ${delay}s infinite`, transformBox: 'fill-box' }}>
      <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity="0.9">
        <ellipse cx="0" cy="0" rx="46" ry="16" />
        <ellipse cx="-22" cy="-10" rx="22" ry="16" />
        <ellipse cx="14" cy="-16" rx="26" ry="20" />
      </g>
    </g>
  )
}

function Tree({ x, y, s = 1, tone = '#b9c8a8' }: { x: number; y: number; s?: number; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-9" y="0" width="18" height="90" rx="6" fill="#9a7467" />
      <circle cx="0" cy="-10" r="52" fill={tone} />
      <circle cx="-34" cy="14" r="34" fill={tone} />
      <circle cx="36" cy="14" r="36" fill={tone} />
      <circle cx="-10" cy="-30" r="20" fill="#fff" opacity="0.18" />
    </g>
  )
}

function House({ x, y, w, h, wall, roof }: { x: number; y: number; w: number; h: number; wall: string; roof: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={wall} />
      <path d={`M${x - 10} ${y + 4} L${x + w / 2} ${y - 36} L${x + w + 10} ${y + 4} Z`} fill={roof} />
      <rect x={x + w * 0.18} y={y + h * 0.28} width={w * 0.22} height={h * 0.28} rx="4" fill="#fff6e8" opacity="0.9" />
      <rect x={x + w * 0.6} y={y + h * 0.28} width={w * 0.22} height={h * 0.28} rx="4" fill="#fff6e8" opacity="0.9" />
    </g>
  )
}

function Home() {
  return (
    <>
      <defs>
        <clipPath id="winClip">
          <rect x="134" y="84" width="272" height="232" />
        </clipPath>
        <linearGradient id="bgHomeWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3e2" />
          <stop offset="1" stopColor="#ffe3cc" />
        </linearGradient>
        <linearGradient id="bgHomeSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe6f5" />
          <stop offset="1" stopColor="#f6f0dc" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#bgHomeWall)" />
      {/* 창문 */}
      <rect x="120" y="70" width="300" height="260" rx="14" fill="#fff" stroke="#e7c9b0" strokeWidth="10" />
      <rect x="134" y="84" width="272" height="232" rx="6" fill="url(#bgHomeSky)" />
      <circle cx="350" cy="140" r="34" fill="#ffe9a8" />
      <g clipPath="url(#winClip)">
        <Cloud x={200} y={170} s={0.9} dur={60} />
      </g>
      <path d="M270 84 V316 M134 200 H406" stroke="#e7c9b0" strokeWidth="8" />
      <path d="M100 60 Q130 190 100 330 L150 330 Q170 190 150 60Z" fill="#f5b8b8" opacity="0.85" />
      <path d="M440 60 Q410 190 440 330 L390 330 Q370 190 390 60Z" fill="#f5b8b8" opacity="0.85" />
      {/* 선풍기 */}
      <g transform="translate(620 300)">
        <rect x="-8" y="40" width="16" height="130" fill="#d9c5b3" />
        <ellipse cx="0" cy="176" rx="50" ry="10" fill="#d9c5b3" />
        <circle r="62" fill="#fff" stroke="#d9c5b3" strokeWidth="6" opacity="0.95" />
        <g>
          <ellipse cx="0" cy="-26" rx="12" ry="26" fill="#b9c8a8" />
          <ellipse cx="22" cy="14" rx="12" ry="26" fill="#b9c8a8" transform="rotate(120 22 14)" />
          <ellipse cx="-22" cy="14" rx="12" ry="26" fill="#b9c8a8" transform="rotate(-120 -22 14)" />
        </g>
        <circle r="9" fill="#d98b96" />
      </g>
      {/* 바닥 */}
      <rect y="420" width={W} height="180" fill="#e9c7a2" />
      <rect y="420" width={W} height="10" fill="#d8b28a" />
      <ellipse cx="400" cy="540" rx="300" ry="42" fill="#f7c8c8" opacity="0.7" />
      <g transform="translate(70 500)">
        <PeachIcon size={46} />
      </g>
    </>
  )
}

function Street() {
  return (
    <>
      <defs>
        <linearGradient id="bgStreetSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fd8f0" />
          <stop offset="1" stopColor="#e9f6f0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#bgStreetSky)" />
      <circle cx="640" cy="110" r="46" fill="#fff0b0" />
      <circle cx="640" cy="110" r="70" fill="#fff0b0" opacity="0.35" style={{ animation: 'glowPulse 4s ease-in-out infinite' }} />
      <Cloud x={120} y={90} s={1.1} dur={100} />
      <Cloud x={420} y={150} s={0.8} dur={130} delay={-40} />
      <House x={40} y={230} w={170} h={190} wall="#ffe0c8" roof="#d98b96" />
      <House x={240} y={260} w={140} h={160} wall="#fdeccf" roof="#b9c8a8" />
      <House x={560} y={240} w={190} h={180} wall="#f7d7d7" roof="#c8a58f" />
      <Tree x={430} y={250} s={1.1} />
      <Tree x={750} y={300} s={0.8} tone="#a8bc98" />
      <rect y="420" width={W} height="30" fill="#e8d9c4" />
      <rect y="450" width={W} height="150" fill="#c9bfb4" />
      <path d="M0 520 H800" stroke="#fffaf0" strokeWidth="6" strokeDasharray="38 30" />
    </>
  )
}

function Alley() {
  return (
    <>
      <defs>
        <linearGradient id="bgAlleyWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d9c4" />
          <stop offset="1" stopColor="#e6bfa5" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="#bfe0ee" />
      {/* 막다른 벽 */}
      <rect x="170" y="130" width="460" height="320" fill="url(#bgAlleyWall)" />
      <g stroke="#d3a98e" strokeWidth="3" opacity="0.7">
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M170 ${160 + i * 40} H630`} />
        ))}
      </g>
      <rect x="350" y="200" width="100" height="120" rx="8" fill="#fff6e8" stroke="#c9a58f" strokeWidth="6" />
      <path d="M400 200 V320 M350 260 H450" stroke="#c9a58f" strokeWidth="4" />
      <Tree x={190} y={160} s={0.7} />
      {/* 양옆 담장 */}
      <path d="M0 80 L170 130 V450 L0 600Z" fill="#f0c9b0" />
      <path d="M800 80 L630 130 V450 L800 600Z" fill="#edc2aa" />
      <g transform="translate(66 470)">
        <ellipse cx="0" cy="40" rx="30" ry="8" fill="#0002" />
        <path d="M-22 0 H22 L16 40 H-16Z" fill="#c9805f" />
        <circle cx="0" cy="-6" r="22" fill="#b9c8a8" />
      </g>
      <g transform="translate(740 480)">
        <path d="M-20 0 H20 L14 38 H-14Z" fill="#c9805f" />
        <circle cx="0" cy="-6" r="20" fill="#a8bc98" />
        <circle cx="8" cy="-16" r="8" fill="#f5b8b8" />
      </g>
      <rect y="450" width={W} height="150" fill="#d9c8b8" />
      <path d="M170 450 L0 600 M630 450 L800 600" stroke="#c6b19f" strokeWidth="4" />
    </>
  )
}

function Shop() {
  return (
    <>
      <defs>
        <linearGradient id="bgShopSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a6dcf2" />
          <stop offset="1" stopColor="#f3f7e6" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#bgShopSky)" />
      <Cloud x={160} y={90} dur={110} />
      <Cloud x={560} y={130} s={0.8} dur={140} delay={-50} />
      <Tree x={650} y={190} s={1.5} />
      {/* 가게 */}
      <rect x="90" y="250" width="440" height="190" fill="#fdeccf" />
      <path d="M60 250 L310 150 L560 250Z" fill="#6fb0d8" stroke="#4c8fba" strokeWidth="5" strokeLinejoin="round" />
      <g>
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M${90 + i * 55} 250 h55 v34 q-27 22 -55 0z`} fill={i % 2 ? '#fff' : '#f5b8b8'} />
        ))}
      </g>
      <rect x="200" y="196" width="220" height="44" rx="10" fill="#fff8ef" stroke="#76575a" strokeWidth="4" />
      <text x="310" y="228" textAnchor="middle" fontSize="28" fill="#d98b96" fontFamily="Jua, sans-serif">
        복숭아
      </text>
      {/* 진열대 */}
      <rect x="90" y="400" width="440" height="60" rx="8" fill="#c9a58a" />
      {[120, 210, 300, 390, 470].map((x, i) => (
        <g key={x} transform={`translate(${x} ${382 + (i % 2) * 6})`}>
          <rect x="-40" y="0" width="80" height="26" rx="5" fill="#b78f74" />
          <g transform="translate(-30 -26)">
            <PeachIcon size={30} />
          </g>
          <g transform="translate(0 -30)">
            <PeachIcon size={32} />
          </g>
          <g transform="translate(-14 -8)">
            <PeachIcon size={30} />
          </g>
        </g>
      ))}
      <rect y="460" width={W} height="140" fill="#d8cbb8" />
      <rect y="460" width={W} height="14" fill="#c7b9a5" />
    </>
  )
}

function Sunset() {
  return (
    <>
      <defs>
        <linearGradient id="bgSunSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f9b9a8" />
          <stop offset="0.5" stopColor="#ffd1b5" />
          <stop offset="1" stopColor="#fff0cf" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#bgSunSky)" />
      <circle cx="520" cy="330" r="110" fill="#ffe7a8" opacity="0.5" style={{ animation: 'glowPulse 5s ease-in-out infinite' }} />
      <circle cx="520" cy="330" r="64" fill="#fff3c2" />
      <Cloud x={150} y={130} s={1.2} dur={120} />
      <Cloud x={420} y={90} s={0.8} dur={150} delay={-60} />
      <path d="M0 380 Q120 320 260 370 T520 360 T800 350 V450 H0Z" fill="#d9a9a0" opacity="0.7" />
      <House x={70} y={290} w={130} h={140} wall="#f3c8b6" roof="#c98a82" />
      <House x={610} y={300} w={150} h={130} wall="#f1cfbf" roof="#b9928a" />
      <Tree x={300} y={250} s={1} tone="#9fb08c" />
      <path d="M0 150 Q200 190 400 160 T800 150" stroke="#76575a" strokeWidth="3" fill="none" opacity="0.5" />
      <rect y="430" width={W} height="170" fill="#d9bfae" />
      <path d="M0 500 H800" stroke="#fff6ea" strokeWidth="6" strokeDasharray="38 30" opacity="0.8" />
    </>
  )
}

function Doorstep() {
  return (
    <>
      <defs>
        <linearGradient id="bgDoorSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8a5c8" />
          <stop offset="0.45" stopColor="#f4b3b0" />
          <stop offset="1" stopColor="#ffd9b8" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#bgDoorSky)" />
      {[80, 220, 330, 600, 700].map((x, i) => (
        <circle key={x} cx={x} cy={50 + (i % 3) * 30} r="2.5" fill="#fff" opacity="0.8" style={{ animation: `glowPulse ${2 + i}s ease-in-out infinite` }} />
      ))}
      <rect x="150" y="190" width="500" height="260" fill="#fbe4d0" />
      <path d="M120 195 L400 90 L680 195Z" fill="#c98a82" />
      <rect x="340" y="260" width="120" height="190" rx="10" fill="#9a6f66" stroke="#76575a" strokeWidth="5" />
      <circle cx="440" cy="360" r="7" fill="#ffd36b" />
      <rect x="190" y="250" width="110" height="90" rx="8" fill="#ffe7a8" stroke="#76575a" strokeWidth="5" />
      <rect x="500" y="250" width="110" height="90" rx="8" fill="#ffe7a8" stroke="#76575a" strokeWidth="5" />
      <path d="M245 250 V340 M190 295 H300 M555 250 V340 M500 295 H610" stroke="#76575a" strokeWidth="3" />
      <rect x="190" y="250" width="110" height="90" rx="8" fill="#fff3c2" opacity="0.45" style={{ animation: 'glowPulse 3s ease-in-out infinite' }} />
      <rect x="500" y="250" width="110" height="90" rx="8" fill="#fff3c2" opacity="0.45" style={{ animation: 'glowPulse 3s ease-in-out 1s infinite' }} />
      <rect x="300" y="440" width="200" height="22" rx="4" fill="#d8c0ae" />
      <rect x="280" y="462" width="240" height="22" rx="4" fill="#cfb4a0" />
      <g transform="translate(110 380)">
        <rect x="-5" y="0" width="10" height="90" fill="#76575a" />
        <circle cy="-6" r="20" fill="#fff0b0" />
        <circle cy="-6" r="44" fill="#fff0b0" opacity="0.3" style={{ animation: 'glowPulse 3s ease-in-out infinite' }} />
      </g>
      <rect y="484" width={W} height="116" fill="#d9c0b0" />
    </>
  )
}

export default function Background({ id }: { id: BgId | string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {id === 'home' && <Home />}
      {id === 'street' && <Street />}
      {id === 'alley' && <Alley />}
      {id === 'shop' && <Shop />}
      {id === 'sunset' && <Sunset />}
      {id === 'doorstep' && <Doorstep />}
    </svg>
  )
}
