import { toBlob } from 'html-to-image'

/** DOM 요소를 PNG Blob 으로. 웹폰트를 가져오지 못하는 환경이면 폰트 임베딩 없이 재시도한다. */
export async function elementToPng(el: HTMLElement): Promise<Blob> {
  const base = { pixelRatio: 2, cacheBust: true, backgroundColor: '#fff8ef' }
  let blob: Blob | null = null
  try {
    blob = await toBlob(el, base)
  } catch {
    blob = await toBlob(el, { ...base, skipFonts: true })
  }
  if (!blob) throw new Error('이미지를 만들지 못했어요')
  return blob
}

export type SaveResult = 'shared' | 'downloaded' | 'opened'

/** 모바일은 공유 시트(가능하면), 데스크톱은 다운로드. 둘 다 안 되면 새 탭으로 열어 길게 눌러 저장할 수 있게 한다. */
export async function saveOrShare(blob: Blob, filename: string, preferShare: boolean): Promise<SaveResult> {
  const file = new File([blob], filename, { type: 'image/png' })
  if (preferShare && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: '복숭아를 사러 가는 길', text: '오늘도 성시내에게 반했습니다. 🍑' })
      return 'shared'
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return 'shared'
    }
  }
  const url = URL.createObjectURL(blob)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  if (isIOS && !preferShare) {
    window.open(url, '_blank')
    return 'opened'
  }
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
  return 'downloaded'
}
