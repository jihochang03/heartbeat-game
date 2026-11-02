import { useState } from 'react'
import {
  ArrowLeft, BadgeCheck, Footprints, Hand, Heart, KeyRound, Lock, Pill, Signpost, Smile, Sparkles, Wind, Zap,
  type LucideIcon,
} from 'lucide-react'
import { useGame } from '../store/gameStore'
import { COLLECTIBLES, EGGS } from '../data/achievements'
import { ENDINGS } from '../data/endings'
import EndingArt from './EndingArt'
import EndingScreen from './EndingScreen'
import PeachIcon from './PeachIcon'

const ICONS: Record<string, LucideIcon> = {
  signpost: Signpost, footprints: Footprints, pill: Pill, heart: Heart, wind: Wind, hand: Hand,
  zap: Zap, badge: BadgeCheck, blush: Smile, sparkles: Sparkles, key: KeyRound,
}

type Tab = 'moments' | 'endings' | 'eggs'

/** 설렘 도감: 장면 / 엔딩 / 숨겨진 대사 */
export default function CollectionGallery() {
  const meta = useGame((s) => s.meta)
  const setScreen = useGame((s) => s.setScreen)
  const [tab, setTab] = useState<Tab>('moments')
  const [view, setView] = useState<string | null>(null)

  if (view) return <EndingScreen previewId={view} onBack={() => setView(null)} />

  const got = COLLECTIBLES.filter((c) => meta.collected.includes(c.id)).length
  const tabs: { id: Tab; label: string; n: string }[] = [
    { id: 'moments', label: '설렌 장면', n: `${got}/${COLLECTIBLES.length}` },
    { id: 'endings', label: '엔딩', n: `${meta.endings.length}/${ENDINGS.length}` },
    { id: 'eggs', label: '숨겨진 대사', n: `${meta.eggs.length}/${EGGS.length}` },
  ]

  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-3xl flex-col bg-gradient-to-b from-softpeach/70 to-cream">
      <header className="flex items-center gap-3 px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
        <button className="icon-btn" onClick={() => setScreen('title')} aria-label="타이틀로 돌아가기"><ArrowLeft size={22} /></button>
        <div>
          <h1 className="font-display text-2xl text-deep">설렘 도감</h1>
          <p className="text-[0.8rem] text-cocoa/80">영이 시내에게 반한 순간들을 모아보세요</p>
        </div>
        <PeachIcon size={44} className="ml-auto" crown={meta.eggs.includes('allEndings')} />
      </header>

      <div className="flex gap-2 px-4 py-2" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-11 flex-1 rounded-2xl border-[2.5px] border-cocoa px-1 text-[0.88rem] leading-tight ${tab === t.id ? 'bg-peach text-deep shadow-[0_3px_0_#76575a]' : 'bg-warm'}`}
          >
            <span className="font-display">{t.label}</span>
            <br />
            <span className="text-[0.75rem] text-cocoa">{t.n}</span>
          </button>
        ))}
      </div>

      <div className="soft-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-2">
        {tab === 'moments' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {COLLECTIBLES.map((c) => {
              const on = meta.collected.includes(c.id)
              const Icon = ICONS[c.icon]
              return (
                <div key={c.id} className={`paper flex gap-3 p-3 ${on ? '' : '!bg-cream/80'}`}>
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-[2.5px] border-cocoa ${on ? 'bg-softpeach' : 'bg-cocoa/15'}`} aria-hidden="true">
                    {on ? (
                      Icon ? <Icon size={30} className="text-rose" /> : <PeachIcon size={38} />
                    ) : (
                      <span className="font-display text-3xl text-cocoa/45">?</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    {on ? (
                      <>
                        <div className="font-display text-[1.02rem] leading-tight text-deep">{c.title}</div>
                        <div className="mt-1 text-[0.88rem] leading-snug text-cocoa" style={{ wordBreak: 'keep-all' }}>“{c.quote}”</div>
                      </>
                    ) : (
                      <>
                        <div className="font-display text-[1.02rem] text-cocoa/55">??? ??? ???</div>
                        <div className="mt-1 text-[0.82rem] leading-snug text-cocoa/65"><Lock size={12} className="mr-1 inline" />힌트 · {c.hint}</div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'endings' && (
          <div className="grid grid-cols-2 gap-3">
            {ENDINGS.map((e) => {
              const on = meta.endings.includes(e.id)
              return (
                <button
                  key={e.id}
                  disabled={!on}
                  onClick={() => setView(e.id)}
                  className="paper overflow-hidden text-left disabled:cursor-default"
                  aria-label={on ? `${e.title} 엔딩 보기` : '잠긴 엔딩'}
                >
                  <div className="relative">
                    <EndingArt ending={e} className={on ? '' : 'brightness-0 opacity-25'} />
                    {!on && <div className="absolute inset-0 flex items-center justify-center font-display text-6xl text-cocoa/40">?</div>}
                  </div>
                  <div className="p-2.5">
                    <div className="text-[0.72rem] tracking-wider text-rose">{e.no}</div>
                    <div className="font-display text-[1rem] leading-tight text-deep">{on ? e.title : '???'}</div>
                    {!on && e.secret && <div className="mt-1 text-[0.74rem] leading-snug text-cocoa/70" style={{ wordBreak: 'keep-all' }}>{e.hint}</div>}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {tab === 'eggs' && (
          <div className="flex flex-col gap-2.5">
            {EGGS.map((e) => {
              const on = meta.eggs.includes(e.id)
              return (
                <div key={e.id} className="paper flex items-center gap-3 px-4 py-3">
                  <span className="text-2xl" aria-hidden="true">{on ? '🥚' : '❔'}</span>
                  <div>
                    <div className={`font-display ${on ? 'text-deep' : 'text-cocoa/55'}`}>{on ? e.title : '??? ???'}</div>
                    <div className="text-[0.82rem] text-cocoa/75" style={{ wordBreak: 'keep-all' }}>{on ? e.hint : '아직 발견하지 못한 숨겨진 대사'}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
