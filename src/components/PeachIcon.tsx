interface Props {
  size?: number
  className?: string
  crown?: boolean
}

/** 손그림 느낌의 복숭아 아이콘 */
export default function PeachIcon({ size = 48, className, crown }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      {crown && (
        <path d="M18 14 L24 4 L32 12 L40 4 L46 14 Z" fill="#ffd36b" stroke="#76575a" strokeWidth="2.5" strokeLinejoin="round" />
      )}
      <path
        d="M32 18 C14 14 6 30 10 42 C14 54 24 60 32 58 C40 60 50 54 54 42 C58 30 50 14 32 18 Z"
        fill="#f5b8b8"
        stroke="#76575a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M32 18 C26 28 26 46 32 58" fill="none" stroke="#d98b96" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="20" cy="30" rx="5" ry="8" fill="#fff" opacity="0.45" transform="rotate(18 20 30)" />
      <path d="M32 18 C32 10 40 6 48 8 C48 16 40 20 32 18 Z" fill="#b9c8a8" stroke="#76575a" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 18 L31 12" stroke="#76575a" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
