import { useScrollProgress } from '../hooks'

export default function ScrollProgressBar() {
  const width = useScrollProgress()
  return <div id="scroll-progress" style={{ width: `${width}%` }} />
}
