const RUN_KEY = 'peaches.run.v1'
const META_KEY = 'peaches.meta.v1'

export interface Settings {
  sound: boolean
  textSpeed: 'slow' | 'normal' | 'fast' | 'instant'
  autoSpeed: 'slow' | 'normal' | 'fast'
  reduceMotion: boolean
  fontScale: 1 | 1.15 | 1.3
}

export const DEFAULT_SETTINGS: Settings = {
  sound: false, // 기본은 음소거
  textSpeed: 'normal',
  autoSpeed: 'normal',
  reduceMotion: false,
  fontScale: 1,
}

/** 도감·엔딩·이스터에그·설정은 새 게임을 시작해도 보존된다. */
export interface Meta {
  collected: string[]
  endings: string[]
  eggs: string[]
  settings: Settings
}

export const DEFAULT_META: Meta = { collected: [], endings: [], eggs: [], settings: DEFAULT_SETTINGS }

export interface LogEntry {
  who: 'S' | 'Y' | 'N' | 'C'
  text: string
}

export interface Run {
  nodeId: string
  heart: number
  flags: string[]
  fall: number
  best: { delta: number; text: string } | null
  log: LogEntry[]
  sFace: string
  yFace: string
  bg: string
  /** 이미 열람한 속마음 id */
  thoughts: string[]
  tapS: number
  tapY: number
}

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}
function write(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v))
  } catch {
    /* 저장 공간이 없거나 비공개 모드: 게임은 계속 진행된다 */
  }
}

export const loadMeta = (): Meta => {
  const m = read<Partial<Meta>>(META_KEY)
  return {
    ...DEFAULT_META,
    ...m,
    settings: { ...DEFAULT_SETTINGS, ...(m?.settings ?? {}) },
  }
}
export const saveMeta = (m: Meta) => write(META_KEY, m)
export const loadRun = (): Run | null => read<Run>(RUN_KEY)
export const saveRun = (r: Run) => write(RUN_KEY, r)
export const clearRun = () => {
  try {
    localStorage.removeItem(RUN_KEY)
  } catch {
    /* noop */
  }
}
