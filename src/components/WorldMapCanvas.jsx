import { useEffect, useRef } from 'react'
import { loadLandLatLon } from './earthLand'

// 2D world map — static hub markers + route arcs converging on Bengaluru HQ.
// Same palette as the 3D site: dark-crimson panel, red hubs, yellow traffic.
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

// banner geometry note: the 16 route arcs all terminate near Bengaluru so the
// canopy ribs stay visually distinct even when source countries cluster.

const RED_CSS = '220, 38, 38' // red hub dots
const TRAFFIC_CSS = '255, 212, 0' // yellow traffic (same as 3D site)
const HUB_STOP_R = 9 // CSS px — arc terminus = HQ ring radius, so traffic lands on the hub

// Visual weight of the map layer. Bump LAND_ALPHA / LAND_DOT_DIV to make the
// world silhouette bolder, or lower them for a quieter backdrop.
const LAND_ALPHA = 0.6 // land silhouette opacity (was 0.3 — too dim)
const LAND_DOT_DIV = 900 // smaller divisor = larger land dots (was 1100)
const ARC_FADE = 0.6 // route arc tail opacity (was 0.45)
const ARC_HEAD = 1.0 // route arc head opacity (was 0.9)

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
    let observer = null

    const canvas = document.createElement('canvas')
    canvas.className = 'map-2d-canvas'
    mount.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // single static canvas layer: hubs + routes drawn once, no per-frame loop
    const staticLayer = document.createElement('canvas')
    let land = [] // [{ lat, lon }] coastline samples for the land silhouette

    const getTrimmedRoute = (route, W, H) => {
      const [bhx, bhy] = project(BANG.lat, BANG.lon, W, H)
      const stopR = HUB_STOP_R * Math.min(2, window.devicePixelRatio || 1)
      const pts = routeCurve(HUBS[route.from], BANG, W, H, route.lift)
      const trimmed = []
      let prev = null
      let hit = null

      for (const p of pts) {
        const d = Math.hypot(p[0] - bhx, p[1] - bhy)
        if (d <= stopR) {
          if (prev) {
            const dp = Math.hypot(prev[0] - bhx, prev[1] - bhy)
            const f = (dp - stopR) / (dp - d || 1)
            hit = [prev[0] + (p[0] - prev[0]) * f, prev[1] + (p[1] - prev[1]) * f]
          }
          break
        }
        trimmed.push(p)
        prev = p
      }

      if (hit) trimmed.push(hit)
      return trimmed
    }

    const paint = (W, H, dpr) => {
      staticLayer.width = W
      staticLayer.height = H
      const s = staticLayer.getContext('2d')
      if (!s) return
      s.clearRect(0, 0, W, H)

      // land silhouette — faint dot field so the world shape reads as a quiet
      // backdrop; arcs + hubs stay the focal point (static, no animation).
      if (land.length) {
        const dotR = Math.max(0.7, W / LAND_DOT_DIV) * dpr * 0.55
        s.fillStyle = `rgba(${RED_CSS}, ${LAND_ALPHA})`
        for (const p of land) {
          const [x, y] = project(p.lat, p.lon, W, H)
          s.beginPath()
          s.arc(x, y, dotR, 0, Math.PI * 2)
          s.fill()
        }
      }

      // HQ — Bangalore, India: larger dot + ring + label with a leader line.
      // Drawn BEFORE the route arcs so the arcs physically cross on top of the hub.
      const [bhx, bhy] = project(BANG.lat, BANG.lon, W, H)
      s.save()
      s.shadowColor = `rgba(${RED_CSS}, 0.9)`
      s.shadowBlur = 10 * dpr
      s.fillStyle = `rgba(${RED_CSS}, 0.98)`
      s.beginPath()
      s.arc(bhx, bhy, 5 * dpr, 0, Math.PI * 2)
      s.fill()
      s.restore()
      s.strokeStyle = `rgba(${RED_CSS}, 0.5)`
      s.lineWidth = 1.1 * dpr
      s.beginPath()
      s.arc(bhx, bhy, 9 * dpr, 0, Math.PI * 2)
      s.stroke()

      const label = 'Bangalore, India'
      s.font = `600 ${10.5 * dpr}px Inter, system-ui, sans-serif`
      s.textBaseline = 'middle'
      const labelWidth = s.measureText(label).width
      const labelX = Math.min(bhx + 16 * dpr, W - labelWidth - 8 * dpr)
      const labelY = bhy - 18 * dpr
      const lineX = bhx + 11 * dpr
      const lineY = bhy - 10 * dpr

      s.beginPath()
      s.moveTo(bhx, bhy)
      s.lineTo(lineX, lineY)
      s.lineTo(labelX, lineY)
      s.strokeStyle = 'rgba(255, 255, 255, 0.6)'
      s.lineWidth = 1 * dpr
      s.stroke()

      s.lineWidth = 2.6 * dpr
      s.strokeStyle = 'rgba(2, 2, 8, 0.85)'
      s.strokeText(label, labelX, labelY)
      s.fillStyle = 'rgba(255, 255, 255, 0.92)'
      s.fillText(label, labelX, labelY)

      // route arcs — drawn AFTER the HQ hub so the lines visibly cross on top
      // of the red Bangalore dot instead of being hidden beneath it.
      for (const route of ROUTES) {
        const trimmed = getTrimmedRoute(route, W, H)
        if (trimmed.length < 2) continue
        const grad = s.createLinearGradient(
          trimmed[0][0], trimmed[0][1],
          trimmed[trimmed.length - 1][0], trimmed[trimmed.length - 1][1],
        )
        grad.addColorStop(0, `rgba(${TRAFFIC_CSS}, ${ARC_FADE})`)
        grad.addColorStop(1, `rgba(${TRAFFIC_CSS}, ${ARC_HEAD})`)
        s.lineWidth = Math.max(1, 1.35 * dpr)
        s.strokeStyle = grad
        s.shadowColor = `rgba(${TRAFFIC_CSS}, 0.7)`
        s.shadowBlur = 5 * dpr
        s.beginPath()
        s.moveTo(trimmed[0][0], trimmed[0][1])
        for (let i = 1; i < trimmed.length; i++) {
          s.lineTo(trimmed[i][0], trimmed[i][1])
        }
        s.stroke()
      }

      // secondary hub markers
      for (let h = 1; h < HUBS.length; h++) {
        const [x, y] = project(HUBS[h].lat, HUBS[h].lon, W, H)
        s.save()
        s.shadowColor = `rgba(${RED_CSS}, 0.9)`
        s.shadowBlur = 8 * dpr
        s.fillStyle = `rgba(${RED_CSS}, 0.92)`
        s.beginPath()
        s.arc(x, y, 2.4 * dpr, 0, Math.PI * 2)
        s.fill()
        s.restore()
      }
    }

    const sampleAlongPath = (pts, t) => {
      if (pts.length < 2) return pts[0] || [0, 0]
      const scaled = Math.max(0, Math.min(1, t)) * (pts.length - 1)
      const i = Math.floor(scaled)
      const frac = scaled - i
      const a = pts[i]
      const b = pts[Math.min(i + 1, pts.length - 1)]
      return [a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac]
    }

    const drawTrafficFlow = (timeMs, W, H, dpr) => {
      for (let i = 0; i < ROUTES.length; i++) {
        const route = ROUTES[i]
        const trimmed = getTrimmedRoute(route, W, H)
        if (trimmed.length < 2) continue

        const speed = 0.09 + i * 0.0034
        const t = (timeMs * 0.00018 * speed) % 1
        const p = sampleAlongPath(trimmed, t)
        const glow = 18 * dpr
        const radius = 2.4 * dpr

        ctx.save()
        ctx.fillStyle = `rgba(${TRAFFIC_CSS}, 0.95)`
        ctx.shadowColor = `rgba(${TRAFFIC_CSS}, 0.95)`
        ctx.shadowBlur = glow
        ctx.beginPath()
        ctx.arc(p[0], p[1], radius, 0, Math.PI * 2)
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
      paint(canvas.width, canvas.height, dpr)
      ctx.drawImage(staticLayer, 0, 0)
      return dpr
    }

    let dpr = fit()
    let rafId = null

    const animate = (timeMs) => {
      if (!canvas.parentNode) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(staticLayer, 0, 0)
      drawTrafficFlow(timeMs, w, h, dpr || 1)
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    // land samples arrive async (image decode) — repaint once they land so the
    // silhouette appears without a per-frame animation loop.
    loadLandLatLon().then((pts) => {
      if (!pts?.length || canvas.parentNode !== mount) return
      land = pts
      const next = fit()
      if (next) dpr = next
    })

    observer = new ResizeObserver(() => { dpr = fit() })
    observer.observe(mount)

    return () => {
      observer?.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
      if (canvas.parentNode === mount) mount.removeChild(canvas)
    }
  }, [])

  return <div className="hero-map2d" ref={mountRef} aria-hidden="true" />
}

