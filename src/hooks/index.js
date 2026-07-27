import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, interval = 2800) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const tick = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setVisible(true)
      }, 300)
    }, interval)
    return () => clearInterval(tick)
  }, [words, interval])

  return { text: words[index], visible }
}

export function useCounter(target, suffix = '', decimals = 0, duration = 1500) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); observer.disconnect() }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setValue(target); clearInterval(timer) }
      else setValue(current)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target, duration])

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString()
  return { ref, text: `${formatted}${suffix}` }
}

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export function useHeaderScroll() {
  const [hidden, setHidden] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setHidden(current > lastScroll.current && current > 100)
      lastScroll.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return hidden
}

export function useScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return width
}

export function useBackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return visible
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return { theme, toggle }
}

export function useLazyRender(rootMargin = '200px') {
  const ref = useRef(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShouldRender(true); observer.disconnect() } },
      { rootMargin }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, shouldRender }
}
