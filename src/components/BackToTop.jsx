import { useBackToTop } from '../hooks'
import { ArrowUp } from '../icons'

export default function BackToTop() {
  const visible = useBackToTop()

  return (
    <button
      id="back-to-top"
      className={visible ? 'visible' : ''}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ArrowUp />
    </button>
  )
}
