import { Heart } from 'lucide-react'
import type { Choice } from '../data/types'

interface Props {
  choices: Choice[]
  onChoose: (i: number) => void
}

export default function ChoiceButtons({ choices, onChoose }: Props) {
  return (
    <div className="mt-3 flex flex-col gap-2.5" role="group" aria-label="선택지">
      {choices.map((c, i) => (
        <button
          key={c.text}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onChoose(i)
          }}
          className={`vn-btn !justify-start !rounded-2xl !px-4 text-left !text-[1rem] anim-fadeup ${
            c.special ? 'primary' : ''
          }`}
          style={{ animationDelay: `${i * 70}ms`, wordBreak: 'keep-all' }}
        >
          <span className="font-display text-rose" aria-hidden="true">
            {c.special ? <Heart size={18} fill="currentColor" className="anim-pulse" /> : i + 1}
          </span>
          <span className="flex-1 leading-snug">{c.text}</span>
        </button>
      ))}
    </div>
  )
}
