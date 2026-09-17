import { useEffect, useRef } from 'react'
import { loadLandLatLon } from './earthLand'

// 2D world map — flat equirectangular outline + animated traffic.
// Same palette as the 3D site: dark-crimson panel, red land, yellow traffic.
const BANG = { lat: 12.9716, lon: 77.5946 }
const HUBS = [
  BANG, // 0 — Bengaluru, India: main hub, all traffic converges here
  { lat: 40.7128, lon: -74.006 }, // 1 USA — New York
  { lat: 43.6532, lon: -79.3832 }, // 2 Canada — Toronto
  { lat: -23.5505, lon: -46.6333 }, // 3 Brazil — São Paulo
  { lat: 51.5074, lon: -0.1278 }, // 4 UK — London
  { lat: 48.8566, lon: 2.3522 }, // 5 France — Paris
  { lat: 50.1109, lon: 8.6821 }, // 6 Germany — Frankfurt
  { lat: 6.5244, lon: 3.3792 }, // 7 Nigeria — Lagos
  { lat: 30.0444, lon: 31.2357 }, // 8 Egypt — Cairo
  { lat: -26.2041, lon: 28.0473 }, // 9 South Africa — Johannesburg
  { lat: 25.2048, lon: 55.2708 }, // 10 UAE — Dubai
  { lat: 1.3521, lon: 103.8198 }, // 11 Singapore
  { lat: 39.9042, lon: 116.4074 }, // 12 China — Beijing
  { lat: 37.5665, lon: 126.978 }, // 13 South Korea — Seoul
  { lat: 35.6895, lon: 139.6917 }, // 14 Japan — Tokyo
  { lat: -6.2088, lon: 106.8456 }, // 15 Indonesia — Jakarta
  { lat: -33.8688, lon: 151.2093 }, // 16 Australia — Sydney
]
const ROUTES = [
  { from: 1, lift: 22 }, // 1 USA — New York
  { from: 2, lift: 12 }, // 2 Canada — Toronto
  { from: 3, lift: 10 }, // 3 Brazil — São Paulo
  { from: 4, lift: 28 }, // 4 UK — London
  { from: 5, lift: 16 }, // 5 France — Paris
  { from: 6, lift: 24 }, // 6 Germany — Frankfurt
  { from: 7, lift: 14 }, // 7 Nigeria — Lagos
  { from: 8, lift: 18 }, // 8 Egypt — Cairo
  { from: 9, lift: 8 }, // 9 South Africa — Johannesburg
  { from: 10, lift: 20 }, // 10 UAE — Dubai
  { from: 11, lift: 12 }, // 11 Singapore
  { from: 12, lift: 26 }, // 12 China — Beijing
  { from: 13, lift: 18 }, // 13 South Korea — Seoul
  { from: 14, lift: 22 }, // 14 Japan — Tokyo
  { from: 15, lift: 10 }, // 15 Indonesia — Jakarta
  { from: 16, lift: 14 }, // 16 Australia — Sydney
]

// banner geometry: the 16 route arcs all terminate on thinly spaced ring
// slots around Bengaluru so the canopy ribs stay distinct (min ~22.5° apart)
// even when source countries cluster in the same direction
const HUB_RING_PX = 7

const PANEL_CSS = '26, 11, 11' // (unused — panel fill removed, kept for reference)
const RED_CSS = '220, 38, 38' // red land dots / hubs
const TRAFFIC_CSS = '255, 212, 0' // yellow traffic (same as 3D site)

// equirectangular projection: lon [-180,180] -> [0,W], lat [90,-90] -> [0,H]
function project(lat, lon, W, H) {
  return [((lon + 180) / 360) * W, ((90 - lat) / 180) * H]
}

// Quadratic-bezier route in lon/lat space, dateline-aware (takes the short
// way around), sampled to device pixels with x wrapped into [0, W).
// `lift` is per-route so the 16 arcs stagger at different heights (umbrella ribs).
function routeCurve(a, b, W, H, lift, n = 72) {
  let lon1 = a.lon
  let lon2 = b.lon
  if (lon2 - lon1 > 180) lon2 -= 360
  if (lon1 - lon2 > 180) lon2 += 360
  const cx = (lon1 + lon2) / 2
  const cy = (a.lat + b.lat) / 2 + lift
  const pts = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const u = 1 - t
    const lon = u * u * lon1 + 2 * u * t * cx + t * t * lon2
    const lat = Math.min(88, u * u * a.lat + 2 * u * t * cy + t * t * b.lat)
    let [x, y] = project(lat, lon, W, H)
    x = ((x % W) + W) % W
    pts.push([x, y])
  }
  return pts
}

// stroke a pixel polyline, lifting the pen across dateline jumps
function strokePath(ctx, pts, W) {
  ctx.beginPath()
  let px = pts[0][0]
  ctx.moveTo(px, pts[0][1])
  for (let i = 1; i < pts.length; i++) {
    const [x, y] = pts[i]
    if (Math.abs(x - px) > W / 2) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
    px = x
  }
  ctx.stroke()
}

export default function WorldMapCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    let disposed = false
    let raf = 0
    let observer = null

    const canvas = document.createElement('canvas')
    canvas.className = 'map-2d-canvas'
    mount.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

    // static layer: land dots + hubs (no panel fill — transparent over hero bg)
    const staticLayer = document.createElement('canvas')
    let curves = [] // route polylines in device px
    let land = []

    const renderStatic = (W, H, dpr) => {
      staticLayer.width = W
      staticLayer.height = H
      const s = staticLayer.getContext('2d')
      if (!s) return
      s.clearRect(0, 0, W, H)
      // land dots
      const dotR = Math.max(0.7, W / 900) * dpr * 0.55
      s.fillStyle = `rgba(${RED_CSS}, 0.78)`
      for (const p of land) {
        const [x, y] = project(p.lat, p.lon, W, H)
        s.beginPath()
        s.arc(x, y, dotR, 0, Math.PI * 2)
        s.fill()
      }
      // hub markers — secondary hubs first, HQ last so it draws on top
      for (let h = 1; h < HUBS.length; h++) {
        const [x, y] = project(HUBS[h].lat, HUBS[h].lon, W, H)
        const r = 2.6 * dpr
        s.save()
        s.shadowColor = `rgba(${RED_CSS}, 0.9)`
        s.shadowBlur = 10 * dpr
        s.fillStyle = `rgba(${RED_CSS}, 0.9)`
        s.beginPath()
        s.arc(x, y, r, 0, Math.PI * 2)
        s.fill()
        s.restore()
      }
      // HQ — Bengaluru, Karnataka, India (12.9716N, 77.5946E): bigger dot + ring + label
      {
        const [x, y] = project(BANG.lat, BANG.lon, W, H)
        s.save()
        s.shadowColor = `rgba(${RED_CSS}, 0.9)`
        s.shadowBlur = 10 * dpr
        s.fillStyle = `rgba(${RED_CSS}, 0.98)`
        s.beginPath()
        s.arc(x, y, 5 * dpr, 0, Math.PI * 2)
        s.fill()
        s.restore()
        s.strokeStyle = `rgba(${RED_CSS}, 0.55)`
        s.lineWidth = 1.2 * dpr
        s.beginPath()
        s.arc(x, y, 10 * dpr, 0, Math.PI * 2)
        s.stroke()
        s.font = `600 ${11 * dpr}px Inter, system-ui, sans-serif`
        s.textBaseline = 'middle'
        const label = 'Bengaluru, India'
        const lx = Math.min(x + 11 * dpr, W - s.measureText(label).width - 4 * dpr)
        s.lineWidth = 3 * dpr
        s.strokeStyle = 'rgba(2, 2, 8, 0.85)'
        s.strokeText(label, lx, y)
        s.fillStyle = 'rgba(255, 255, 255, 0.92)'
        s.fillText(label, lx, y)
      }
      // route curves — umbrella: each arc stops on the hub ring around
      // Bengaluru. Ring slots are evenly spaced by approach-angle rank, so
      // all 16 ribs stay distinct (min ~22.5° apart) even when countries
      // share a direction. Per-route lift staggers arc heights mid-map.
      const [bangX, bangY] = project(BANG.lat, BANG.lon, W, H)
      const ringR = HUB_RING_PX * dpr
      // approach angle per route (atan2 space, source -> Bengaluru direction)
      const approached = ROUTES.map(({ from, lift }) => {
        const [sx, sy] = project(HUBS[from].lat, HUBS[from].lon, W, H)
        return { from, lift, angle: Math.atan2(sy - bangY, sx - bangX) }
      })
      approached.sort((a, b) => a.angle - b.angle)
      // even slots around the full ring, in the same angular order
      approached.forEach((r, rank) => {
        r.slot = -Math.PI + ((rank + 0.5) / approached.length) * Math.PI * 2
      })
      curves = approached.map(({ from, lift, slot }) => {
        const pts = routeCurve(HUBS[from], BANG, W, H, lift)
        // hub-edge endpoint on its assigned ring slot
        const ex = bangX + Math.cos(slot) * ringR
        const ey = bangY + Math.sin(slot) * ringR
        // drop bezier tail points inside the hub ring, then land on the slot
        const trimmed = []
        for (const p of pts) {
          if (Math.hypot(p[0] - bangX, p[1] - bangY) < ringR * 0.9) break
          trimmed.push(p)
        }
        trimmed.push([ex, ey])
        return trimmed
      })
    }

    const drawFrame = (W, H, dpr, t) => {
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(staticLayer, 0, 0)
      // traffic arcs
      ctx.save()
      ctx.lineWidth = Math.max(1, 1.5 * dpr)
      ctx.shadowColor = `rgba(${TRAFFIC_CSS}, 0.7)`
      ctx.shadowBlur = 6 * dpr
      for (let r = 0; r < curves.length; r++) {
        const pts = curves[r]
        const grad = ctx.createLinearGradient(pts[0][0], pts[0][1], pts[pts.length - 1][0], pts[pts.length - 1][1])
        grad.addColorStop(0, `rgba(${TRAFFIC_CSS}, 0.55)`)
        grad.addColorStop(1, `rgba(${TRAFFIC_CSS}, 0.95)`)
        ctx.strokeStyle = grad
        strokePath(ctx, pts, W)
      }
      ctx.restore()
      // orbiting traffic dots — each revolves on its own circular track
      // centered exactly on the Bengaluru hub point; radii track source-
      // hub distance and per-route speed/phase keep the orbits visually
      // distinct rather than stacked.
      const [bhx, bhy] = project(BANG.lat, BANG.lon, W, H)
      for (let r = 0; r < curves.length; r++) {
        const route = ROUTES[r]
        const [sx, sy] = project(HUBS[route.from].lat, HUBS[route.from].lon, W, H)
        const dist = Math.hypot(sx - bhx, sy - bhy)
        const radius = Math.max(30 * dpr, Math.min(150 * dpr, dist * 0.2))
        const speed = 0.3 + (r % 5) * 0.12
        const phase = (r / curves.length) * Math.PI * 2
        const angle = (t * speed + phase) % (Math.PI * 2)
        const ox = bhx + Math.cos(angle) * radius
        const oy = bhy + Math.sin(angle) * radius
        ctx.save()
        ctx.shadowColor = `rgba(${TRAFFIC_CSS}, 0.95)`
        ctx.shadowBlur = 8 * dpr
        ctx.fillStyle = `rgba(${TRAFFIC_CSS}, 1)`
        ctx.beginPath()
        ctx.arc(ox, oy, 2.6 * dpr, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const fit = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (w < 1 || h < 1) return null
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      renderStatic(canvas.width, canvas.height, dpr)
      return dpr
    }

    let dpr = fit()

    loadLandLatLon().then((pts) => {
      if (disposed) return
      land = pts
      dpr = fit() ?? dpr
      if (reduceMotion && dpr) drawFrame(canvas.width, canvas.height, dpr, 0.2)
    })

    if (reduceMotion) {
      drawFrame(canvas.width, canvas.height, dpr ?? 1, 0.2)
      observer = new ResizeObserver(() => {
        dpr = fit()
        if (dpr) drawFrame(canvas.width, canvas.height, dpr, 0.2)
      })
      observer.observe(mount)
      return () => {
        disposed = true
        observer?.disconnect()
        canvas.parentNode === mount && mount.removeChild(canvas)
      }
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!canvas.width || !canvas.height) return
      drawFrame(canvas.width, canvas.height, dpr ?? 1, performance.now() * 0.001)
    }
    loop()

    observer = new ResizeObserver(() => { dpr = fit() })
    observer.observe(mount)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      observer?.disconnect()
      if (canvas.parentNode === mount) mount.removeChild(canvas)
    }
  }, [])

  return <div className="hero-map2d" ref={mountRef} aria-hidden="true" />
}

