import { useEffect } from 'react'
import { useGame } from './store/gameStore'
import { useReduced } from './hooks/useReduced'
import TitleScreen from './components/TitleScreen'
import StoryScreen from './components/StoryScreen'
import CollectionGallery from './components/CollectionGallery'
import EndingScreen from './components/EndingScreen'
import { ModalHost, Toaster } from './components/Overlays'

export default function App() {
  const screen = useGame((s) => s.screen)
  const scale = useGame((s) => s.meta.settings.fontScale)
  const reduced = useReduced()

  useEffect(() => {
    document.documentElement.style.setProperty('--fs', String(scale))
  }, [scale])

  return (
    <div data-reduce={reduced} className="h-dvh w-full">
      {screen === 'title' && <TitleScreen />}
      {screen === 'story' && <StoryScreen />}
      {screen === 'gallery' && <CollectionGallery />}
      {screen === 'ending' && <EndingScreen />}
      <ModalHost />
      <Toaster />
    </div>
  )
}
