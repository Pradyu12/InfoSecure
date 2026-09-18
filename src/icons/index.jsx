const Svg = ({ children, ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {children}
  </svg>
)

export const ChevronDown = (props) => (
  <Svg strokeWidth="2" {...props}><polyline points="6 9 12 15 18 9"/></Svg>
)
export const MenuIcon = (props) => (
  <Svg strokeWidth="2" {...props}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></Svg>
)
export const CloseIcon = (props) => (
  <Svg strokeWidth="2" {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>
)
export const ArrowDown = (props) => (
  <Svg strokeWidth="2" {...props}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></Svg>
)
export const ArrowUp = (props) => (
  <Svg strokeWidth="2" {...props}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></Svg>
)
export const CheckCircle = (props) => (
  <Svg {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>
)
export const ShieldIcon = (props) => (
  <Svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Svg>
)
export const MailIcon = (props) => (
  <Svg {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Svg>
)
export const PhoneIcon = (props) => (
  <Svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Svg>
)
export const ClockIcon = (props) => (
  <Svg {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>
)
export const SunIcon = (props) => (
  <Svg {...props}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></Svg>
)
export const MoonIcon = (props) => (
  <Svg {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Svg>
)
export const StarIcon = (props) => (
  <Svg {...props} width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Svg>
)
export const SendIcon = (props) => (
  <Svg {...props}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></Svg>
)
export const MapPin = (props) => (
  <Svg {...props}><path d="M21 10.5c0 4.418-6.075 7.5-9 7.5S3 14.918 3 10.5 9.075 3 12 6.5 21 6.5 21 10.5z"/><circle cx="12" cy="10.5" r="3"/></Svg>
)

export const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
)

export const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)

export const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9.75 15.02l5.77-3.22a2.5 2.5 0 0 1 2.77 0l5.78 3.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="9.75 15.02 5 12.34 5 16.34 9.75 15.02" fill="currentColor"/>
  </svg>
)

export const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" rx="1"/>
    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

export const WhatsappIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M21 15c0 1.66-1.34 3-3 3H6c-1.66 0-3-1.34-3-3V6c0-1.66 1.34-3 3-3h12c1.66 0 3 1.34 3 3v9z" fill="#25D366" stroke="none"/>
    <path d="M15 10l4.5-2.5a5.5 5.5 0 0 0-7.5-1.5l-1.5 4.5L15 10z" fill="#fff" stroke="none"/>
    <path d="M10 14l3-1.8a3.5 3.5 0 0 1-4.5 0L10 14z" fill="#25D366" stroke="none"/>
  </svg>
)

const ICONS = {
  globe: <><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></>,
  edit: <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>,
  monitor: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
  server: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  buildings: <><path d="M2 20h20"/><path d="M5 20V8l5-4v16"/><path d="M14 20V4l5 4v12"/></>,
  bank: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  heart: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
  antenna: <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  truck: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
  code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
  "chevron-down": <polyline points="6 9 12 15 18 9"/>,
}

export const Icon = ({ name, ...props }) => (
  <Svg {...props}>{ICONS[name]}</Svg>
)
