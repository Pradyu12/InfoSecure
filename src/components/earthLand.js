// Shared land sampler for the 2D world map.
// Reads src/assets/earth.jpg once and resolves [{ lat, lon }] land points.
// (Same coastline-tuned pixel tests as the 3D globe used.)
import earthMaskUrl from '../assets/earth.jpg'

let cache = null

export function loadLandLatLon() {
  if (cache) return cache
  cache = new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const SW = 1440
      const SH = 720
      const c = document.createElement('canvas')
      c.width = SW
      c.height = SH
      const ctx = c.getContext('2d')
      if (!ctx) { resolve([]); return }
      ctx.drawImage(img, 0, 0, SW, SH)
      let data
      try {
        data = ctx.getImageData(0, 0, SW, SH).data
      } catch {
        resolve([])
        return
      }
      // land test tuned on earth.jpg pixels (deep ocean ≈ (24,36,60),
      // Amazon ≈ (35,38,57), Sydney ≈ (36,50,61), US plains ≈ (84,83,78)):
      // open ocean is the only thing strongly blue-dominant; bright polar
      // ice and dark Arctic seas are disambiguated by geography below.
      const isOceanPixel = (r, g, b) => {
        const bright = (r + g + b) / 3
        // sea ice / ice-shelf white-out (also catches icebergs in ocean)
        if (bright > 195 && Math.max(r, g, b) - Math.min(r, g, b) < 42) return true
        // dark taiga/forest (Siberia/Canada ≈ (35,38,55)): dim, low-saturation,
        // near-neutral — never open ocean (dark Arctic seas are handled by ARCTIC_SEAS)
        if (bright < 62 && Math.max(r, g, b) - Math.min(r, g, b) < 26) return false
        const bR = b - r, bG = b - g
        // deep ocean: strongly blue-dominant
        if (bR > 26 && bG > 13) return true
        // shallow/coastal water: blue-dominant, dim, and quite blue
        if (bR > 15 && b > 52 && bright < 58) return true
        return false
      }
      // Greenland coastline approx [lat, westLon, eastLon] — its white ice
      // sheet is pixel-identical to sea ice, so it needs an explicit shape
      const GREENLAND = [
        [59.5, -44.5, -40], [61, -46, -40], [62, -49, -41], [64, -53, -39],
        [66, -54, -36], [68, -54, -32], [70, -54, -24.5], [72, -56, -22],
        [74, -58, -20], [76, -60, -21], [78, -62, -20], [80, -60, -20],
        [82, -60, -22], [84, -55, -25],
      ]
      const inGreenland = (lat, lon) => {
        if (lat < 59.5 || lat > 84) return false
        let i = 0
        while (i < GREENLAND.length - 2 && GREENLAND[i + 1][0] < lat) i++
        const [la, wa, ea] = GREENLAND[i]
        const [lb, wb, eb] = GREENLAND[i + 1]
        const f = Math.min(1, Math.max(0, (lat - la) / ((lb - la) || 1)))
        return lon >= wa + (wb - wa) * f && lon <= ea + (eb - ea) * f
      }
      // dark high-latitude seas misread as taiga — force back to ocean
      const ARCTIC_SEAS = [
        [66, 90, -180, 180], // Arctic ocean / rim seas
        [58, 66, -180, -140], // Bering sea / Gulf of Alaska
        [55, 66, -25, -12], // Norwegian sea / Denmark strait
        [60, 72, -60, -20], // Labrador sea / Davis strait / Baffin bay
        [46, 60, -65, -50], // Labrador sea / Gulf of St Lawrence
        [58, 68, 140, 180], // Sea of Okhotsk / W Bering
        [54, 62, 140, 157], // Sea of Okhotsk pocket
        [50, 60, -180, -150], // Gulf of Alaska / Aleutians
        [40, 50, 140, 155], // Kuril / N Japan sea
        [35, 46, 135, 143], // Sea of Japan
        [-70, -55, -80, -50], // Drake passage / Scotia sea
        [-75, -62, -180, -140], // Amundsen / Ross seas
        [-72, -60, 140, 180], // Ross sea / Dumont d'Urville sea
        [-72, -62, 40, 100], // Cooperation / Davis seas
        [-72, -62, -20, 40], // Weddell / Lazarev seas
        [-72, -63, -130, -80], // Bellingshausen sea
      ]
      const inArcticSea = (lat, lon) =>
        ARCTIC_SEAS.some(([la0, la1, lo0, lo1]) => lat >= la0 && lat <= la1 && lon >= lo0 && lon <= lo1)

      const out = []
      for (let py = 0; py < SH; py += 4) {
        const lat = 90 - ((py + 0.5) / SH) * 180
        const rowGreen = lat >= 59.5 && lat <= 84
        for (let px = 0; px < SW; px += 4) {
          const lon = ((px + 0.5) / SW) * 360 - 180
          const k = (py * SW + px) * 4
          const r = data[k], g = data[k + 1], b = data[k + 2]
          const bright = (r + g + b) / 3
          const green = rowGreen && inGreenland(lat, lon)
          // bright polar pixels: land only inside the Greenland shape
          if (bright > 195 && Math.max(r, g, b) - Math.min(r, g, b) < 42) {
            if (green) out.push({ lat, lon })
            continue
          }
          if (green) { out.push({ lat, lon }); continue }
          if (inArcticSea(lat, lon)) continue
          if (!isOceanPixel(r, g, b)) out.push({ lat, lon })
        }
      }
      resolve(out)
    }
    img.onerror = () => resolve([])
    img.src = earthMaskUrl
  })
  return cache
}
