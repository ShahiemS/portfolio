import { computed } from 'vue'

type UseProtectedEmailOptions = {
  encoded: string
  visible?: string
  label?: string
  subject?: string
  body?: string
}

export function useProtectedEmail(opts: UseProtectedEmailOptions) {
  const visibleText = computed(() => opts.visible ?? 'name [at] domain [dot] com')
  const ariaLabel = computed(() => opts.label ?? 'Send email')

  function decode(): string {
    try {
      return atob(opts.encoded)
    } catch {
      return ''
    }
  }

  function buildMailto(real: string) {
    const params = new URLSearchParams()
    if (opts.subject) params.set('subject', opts.subject)
    if (opts.body) params.set('body', opts.body)
    const query = params.toString()
    return `mailto:${real}${query ? `?${query}` : ''}`
  }

  function open() {
    const real = decode()
    if (!real) return
    window.location.href = buildMailto(real)
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open()
    }
  }

  const href = computed(() => '') // keep empty to avoid bots; use open() instead

  return { visibleText, ariaLabel, open, onKey, href }
}
