export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Case Studies', href: '#cases' },
  { label: 'Clients', href: '#clients' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' }
]

export const TRUST_BADGES = ['Motadata Partner', 'ITSM', 'Observability']

export const WORDS = [
  'Observability.', 'ITSM.', 'AI-Driven Operations.',
  'Unified Visibility.', 'Network Analytics.', 'Log Correlation.'
]

export const STATS = [
  { value: 68, suffix: '%', label: 'Reduction in Alert Noise', narrative: 'Across enterprise NOCs using Motadata AIOps' },
  { value: 75, suffix: '%', label: 'Faster Incident Resolution', narrative: 'With unified event correlation and automation' },
  { value: 43, suffix: '%', label: 'Lower Operational Costs', narrative: 'Through platform consolidation and smart routing' },
  { value: 200, suffix: '+', label: 'Enterprise Integrations', narrative: 'Native connectors across IT ecosystem' }
]

export const SOLUTIONS = [
  { title: 'Full-Stack Observability', description: 'Monitor infrastructure, applications, and user experience from a single pane of glass.', detail: 'Motadata AIOps unifies metrics, traces, logs, and synthetic monitoring with AI-driven noise reduction, automated root cause analysis, and real-time service topology mapping.', icon: 'globe' },
  { title: 'Network Visibility', description: 'Deep packet inspection and flow analysis for complete network awareness.', detail: 'NetFlow, sFlow, IPFIX, and packet-level analysis with automated topology discovery, bandwidth monitoring, and anomaly detection across LAN, WAN, and SD-WAN.', icon: 'edit' },
  { title: 'ITSM Platform', description: 'Service management that adapts to your workflows, not the other way around.', detail: 'Incident, problem, change, asset, and SLA management with AI-assisted ticket routing, self-service portal, CMDB automation, and multi-tenant support.', icon: 'monitor' },
  { title: 'Log Management', description: 'Centralized log aggregation with intelligent search and compliance-ready retention.', detail: 'Ingest logs from any source, parse and enrich automatically, query with full-text and structured search, and retain with policy-based archival for audit readiness.', icon: 'file' },
  { title: 'Infrastructure Monitoring', description: 'Physical, virtual, and cloud infrastructure health at your fingertips.', detail: 'Agentless and agent-based monitoring for servers, VMs, containers, Kubernetes, AWS, Azure, GCP with auto-discovery, capacity planning, and threshold-based alerting.', icon: 'server' },
  { title: 'Compliance & Audit', description: 'Automated controls, audit trails, and reporting to simplify certification.', detail: 'Pre-built compliance frameworks, automated evidence collection, access reviews, and dashboards aligned to ISO 27001, SOC 2, and internal audit requirements.', icon: 'shield' }
]

export const CASE_STUDIES = [
  { title: 'Manufacturing Leader \u2014 NOC Modernization', result: '68% alert reduction in 90 days', description: 'Replaced fragmented monitoring tools with Motadata AIOps. Consolidated 12 alert sources into a single pane with AI-driven correlation, reducing noise and cutting mean time to resolution from 45 minutes to 14.', tags: ['AIOps', 'Alert Correlation', 'NOC'] },
  { title: 'BFSI Firm \u2014 Compliance Dashboard', result: '40% faster audit cycles', description: 'Automated evidence collection and access review workflows across 3 business units. Auditors now pull real-time dashboards instead of manual spreadsheet handoffs.', tags: ['Compliance', 'Automation', 'BFSI'] },
  { title: 'Telecom Provider \u2014 Network Visibility', result: '3x faster fault isolation', description: 'Deployed flow-based analysis and packet inspection across 2,400 network devices. Engineers identify and isolate faults before customers notice degradation.', tags: ['Network', 'Flow Analysis', 'Telecom'] }
]

export const CLIENT_SECTORS = [
  { name: 'Manufacturing', icon: 'buildings' }, { name: 'BFSI', icon: 'bank' },
  { name: 'Defense', icon: 'shield' }, { name: 'Healthcare', icon: 'heart' },
  { name: 'Telecom', icon: 'antenna' }, { name: 'Energy', icon: 'zap' },
  { name: 'Logistics', icon: 'truck' }, { name: 'Technology', icon: 'code' }
]

export const CLIENT_NAMES = [
  'Bosch', 'Honeywell', 'L&T', 'State Bank of India', 'Bajaj Finserv',
  "Dr. Reddy's", 'NTPC', 'Indian Oil', 'BHEL', 'Tata Communications',
  'Wipro', 'Infosys', 'Reliance Jio', 'Vodafone Idea', 'GAIL',
  'ONGC', 'Coal India', 'Power Grid Corp', 'Hindustan Copper', 'SAIL'
]

export const TESTIMONIALS = [
  { quote: 'InfoSecure helped us consolidate 12 monitoring tools into a single Motadata platform. Our NOC team now resolves incidents in minutes, not hours.', name: 'Rajesh K.', role: 'Head of IT Operations, Manufacturing Corp', initials: 'RK', stars: 5 },
  { quote: 'The compliance dashboard they built saved us 40% effort during our ISO audit cycle. Real-time evidence pulling instead of manual spreadsheet work.', name: 'Priya M.', role: 'CISO, Regional Bank', initials: 'PM', stars: 5 },
  { quote: 'Network fault isolation that used to take 2 hours now happens in under 40 minutes. The flow analysis integration was a game changer.', name: 'Arun S.', role: 'VP Network Engineering, Telecom', initials: 'AS', stars: 5 }
]

export const FAQ_ITEMS = [
  { q: 'What is InfoSecure Solutions?', a: 'InfoSecure Solutions is a technology services and implementation partner focused on modern IT operations, observability, ITSM, and infrastructure reliability.' },
  { q: 'Which platform does InfoSecure Solutions implement?', a: 'We implement and support the Motadata platform across observability, network visibility, infrastructure, log analytics, APM, and ITSM.' },
  { q: 'What industries do you serve?', a: 'We support manufacturing, BFSI, defense, healthcare, telecom, energy, logistics, and technology organizations with platform-led operations.' },
  { q: 'Do you provide managed support?', a: 'Yes. We offer co-managed and managed operating models with onboarding, tuning, automation, and escalation support.' },
  { q: 'How do you handle compliance and audit needs?', a: 'We configure policy-aligned controls, access reviews, audit trails, and reporting to reduce certification effort.' },
  { q: 'How do I contact InfoSecure Solutions?', a: 'You can reach us at shankar@infosecuresolutions.co.in or +91-9880564227, Monday through Saturday, 9:00 AM to 6:00 PM IST.' }
]

export const TEAM_MEMBERS = [
  { name: 'Shankar', role: 'Founder & CEO', initials: 'SK', tags: ['Motadata Certified', 'ITSM Strategy', 'Enterprise Architecture'] },
  { name: 'Ankit Verma', role: 'Lead Solutions Architect', initials: 'AV', tags: ['AIOps', 'Infrastructure Monitoring', 'Network Visibility'] },
  { name: 'Priyanka Rao', role: 'Head of Delivery', initials: 'PR', tags: ['Implementation', 'Managed Services', 'Client Success'] },
  { name: 'Vikram Joshi', role: 'Senior Support Engineer', initials: 'VJ', tags: ['Troubleshooting', 'Log Analytics', '24/7 NOC Operations'] }
]
