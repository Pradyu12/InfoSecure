export function drawTorus(canvas) {
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.parentElement.getBoundingClientRect()
  const w = rect.width * dpr
  const h = rect.height * dpr
  canvas.width = w
  canvas.height = h
  canvas.style.width = rect.width + 'px'
  canvas.style.height = rect.height + 'px'

  const cx = w / 2
  const cy = h / 2
  const sc = Math.min(w, h) * 0.13
  const R = 4
  const r = 1.6
  const uSegs = 32
  const vSegs = 14
  const focal = 8
  const verts = []

  for (let ui = 0; ui < uSegs; ui++) {
    const u = (ui / uSegs) * Math.PI * 2
    for (let vi = 0; vi < vSegs; vi++) {
      const v = (vi / vSegs) * Math.PI * 2
      verts.push({
        x: (R + r * Math.cos(v)) * Math.cos(u),
        y: (R + r * Math.cos(v)) * Math.sin(u),
        z: r * Math.sin(v)
      })
    }
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let angle = 0

  function draw(offset) {
    ctx.clearRect(0, 0, w, h)
    const sinA = Math.sin(offset)
    const cosA = Math.cos(offset)
    const sinB = Math.sin(offset * 0.4)
    const cosB = Math.cos(offset * 0.4)

    const projected = verts.map(v => {
      const y1 = v.y * cosB - v.z * sinB
      const z1 = v.y * sinB + v.z * cosB
      const x1 = v.x
      const x2 = x1 * cosA + z1 * sinA
      const z2 = -x1 * sinA + z1 * cosA
      const f = focal / (focal + z2 + 5)
      return { sx: x2 * f * sc + cx, sy: y1 * f * sc + cy, z: z2 }
    })

    ctx.lineCap = 'round'
    for (let ui = 0; ui < uSegs; ui++) {
      for (let vi = 0; vi < vSegs; vi++) {
        const idx = ui * vSegs + vi
        const nu = ((ui + 1) % uSegs) * vSegs + vi
        const nv = ui * vSegs + (vi + 1) % vSegs
        const p1 = projected[idx]
        const p2 = projected[nu]
        const p3 = projected[nv]

        const d1 = (p1.z + 6) / 12
        ctx.strokeStyle = `rgba(203,41,87,${0.04 + d1 * 0.35})`
        ctx.lineWidth = (1 + d1 * 1.5) * dpr
        ctx.beginPath()
        ctx.moveTo(p1.sx, p1.sy)
        ctx.lineTo(p2.sx, p2.sy)
        ctx.stroke()

        const d2 = (p1.z + 6) / 12
        ctx.strokeStyle = `rgba(203,41,87,${0.03 + d2 * 0.25})`
        ctx.lineWidth = (0.8 + d2 * 1) * dpr
        ctx.beginPath()
        ctx.moveTo(p1.sx, p1.sy)
        ctx.lineTo(p3.sx, p3.sy)
        ctx.stroke()
      }
    }

    for (let i = 0; i < projected.length; i++) {
      const p = projected[i]
      const d = (p.z + 6) / 12
      const a = 0.08 + d * 0.55
      const s = (1.5 + d * 3) * dpr
      ctx.fillStyle = `rgba(203,41,87,${a})`
      ctx.shadowColor = `rgba(203,41,87,${a * 0.5})`
      ctx.shadowBlur = 12 * d
      ctx.beginPath()
      ctx.arc(p.sx, p.sy, s, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.shadowBlur = 0
  }

  if (reducedMotion) {
    draw(0)
    return
  }

  const tick = () => {
    angle += 0.01
    draw(angle)
    raf = requestAnimationFrame(tick)
  }
  let raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}
