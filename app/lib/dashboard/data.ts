/**
 * Made-up proposals for the dashboard prototype (`/app`). The first eight
 * match the Figma screens on page "06 — Dashboard"; the rest make the totals
 * add up to the ledger in the design (24 proposals, $183,289 awaiting).
 * "Today" in the demo is Tue, Mar 10, 2026.
 */

export type Stage =
  | 'draft'
  | 'sent'
  | 'opened'
  | 'signing'
  | 'signed'
  | 'expired'
  | 'bounced'

export type Currency = 'USD' | 'IDR' | 'JPY' | 'EUR'

export type NudgeKind = 'expiring' | 'not-opened' | 'quiet' | 'bounced'

export interface Nudge {
  kind: NudgeKind
  /** Chip text, e.g. "Expires in 3 days". */
  label: string
  /** The tooltip's first sentence. */
  why: string
}

export interface TimelineEvent {
  kind: 'done' | 'current' | 'event' | 'waiting' | 'pending' | 'failed' | 'partial'
  title: string
  meta: string
}

export interface Signer {
  name: string
  role: string
  initials: string
  signed?: string
}

export interface LineItem {
  label: string
  amount: number
}

export interface Proposal {
  id: string
  number: string
  title: string
  client: string
  /** The person who signs for the client. */
  contact: string
  contactRole: string
  amount: number
  currency: Currency
  /** Value in USD for totals when a studio bills in several currencies. */
  usd: number
  stage: Stage
  nudge?: Nudge
  /** Labels for the three stops: Sent, Opened, Signed. */
  stops: [StopText, StopText, StopText]
  /** Share of the current stage's time to expiry that has passed (0–1). */
  waited?: number
  /** For several signers: how many have signed out of how many. */
  signing?: {signed: number; total: number}
  lastActivity: string
  expires?: string
  opens?: number
  viewers?: number
  /** Optional hand-written activity; otherwise built from the stops. */
  events?: TimelineEvent[]
  signers?: Signer[]
  reading?: {section: string; minutes: number}[]
  /** Overrides the Reminders line in the detail rail. */
  reminders?: [string, string]
  items: LineItem[]
  /** First paragraph on the previewed page. */
  intro?: string
}

export interface StopText {
  label: string
  detail?: string
}

const JORDAN: Signer = {
  name: 'Jordan Doe',
  role: 'You, Jordan Doe Studio',
  initials: 'JD',
}

const usd = (
  p: Omit<Proposal, 'currency' | 'usd'> & {currency?: Currency},
): Proposal => ({currency: 'USD', usd: p.amount, ...p})

export const PROPOSALS: Proposal[] = [
  usd({
    id: 'pro-2026-041',
    number: 'PRO-2026-041',
    title: 'Website Redesign',
    client: 'Sarah Mitchell',
    contact: 'Sarah Mitchell',
    contactRole: 'Founder, Mitchell & Co.',
    amount: 8569,
    stage: 'opened',
    stops: [
      {label: 'Sent Mar 8'},
      {label: 'Opened 3×', detail: 'Last opened 2h ago'},
      {label: 'Expires Mar 22'},
    ],
    waited: 0.14,
    lastActivity: 'Opened 3×, 2h ago',
    expires: 'Mar 22',
    opens: 3,
    viewers: 1,
    reading: [
      {section: 'Scope', minutes: 5},
      {section: 'Investment', minutes: 4},
      {section: 'Timeline', minutes: 2},
    ],
    items: [
      {label: 'Discovery and site map', amount: 1800},
      {label: 'Design, 9 page templates', amount: 4950},
      {label: 'Build handoff and QA', amount: 1819},
    ],
  }),
  usd({
    id: 'pro-2026-036',
    number: 'PRO-2026-036',
    title:
      'Quarterly retainer for product design, research synthesis and design system maintenance (Q2–Q4 2026)',
    client: 'Northwind Studio GmbH & Co. KG',
    contact: 'Lena Fischer',
    contactRole: 'Managing Director, Northwind Studio',
    amount: 128400,
    stage: 'opened',
    nudge: {
      kind: 'expiring',
      label: 'Expires in 3 days',
      why: 'Opened 6 times by 3 people, but nobody has signed in 10 days. Expires Mar 13.',
    },
    stops: [
      {label: 'Sent Feb 28'},
      {label: 'Opened 6×', detail: '3 viewers, last 3h ago'},
      {label: 'Expires Mar 13'},
    ],
    waited: 0.77,
    lastActivity: 'Opened 6×, 3h ago',
    expires: 'Mar 13',
    opens: 6,
    viewers: 3,
    events: [
      {kind: 'done', title: 'Sent', meta: 'Feb 28, 4:40 PM by Jordan Doe'},
      {
        kind: 'current',
        title: 'Opened by Lena Fischer',
        meta: 'Feb 28, 6:02 PM, read for 12 min',
      },
      {
        kind: 'event',
        title: 'Tobias Brandt opened it',
        meta: 'Mar 1, 9:15 AM, read for 23 min',
      },
      {
        kind: 'event',
        title: 'Reminder sent automatically',
        meta: 'Mar 3, 9:00 AM, to Lena Fischer',
      },
      {
        kind: 'event',
        title: 'Lena Fischer opened it again',
        meta: 'Today, 11:42 AM, read for 4 min',
      },
      {
        kind: 'waiting',
        title: 'No signature for 10 days',
        meta: 'Expires Mar 13 at 11:59 PM',
      },
      {kind: 'pending', title: 'Signature', meta: 'Waiting on Lena Fischer'},
    ],
    reading: [
      {section: 'Investment', minutes: 21},
      {section: 'Scope', minutes: 14},
      {section: 'Timeline', minutes: 7},
      {section: 'Terms', minutes: 4},
    ],
    intro:
      'Three workstreams, billed monthly from April to December 2026. Research studies are billed when each one starts.',
    items: [
      {label: 'Product design, 3 days a week', amount: 96000},
      {label: 'Research synthesis, 2 studies', amount: 18400},
      {label: 'Design system maintenance', amount: 14000},
    ],
  }),
  usd({
    id: 'pro-2026-040',
    number: 'PRO-2026-040',
    title: 'Brand Identity Package',
    client: 'Alex Turner',
    contact: 'Alex Turner',
    contactRole: 'Owner, Turner Coffee',
    amount: 4200,
    stage: 'signed',
    stops: [
      {label: 'Sent Mar 6'},
      {label: 'Opened 1×, Mar 6'},
      {label: 'Signed yesterday', detail: 'by Alex Turner'},
    ],
    lastActivity: 'Signed yesterday',
    opens: 1,
    viewers: 1,
    signers: [
      {
        name: 'Alex Turner',
        role: 'Owner, Turner Coffee',
        initials: 'AT',
        signed: 'Signed Mar 9',
      },
      {...JORDAN, signed: 'Signed Mar 6'},
    ],
    reading: [
      {section: 'Investment', minutes: 6},
      {section: 'Scope', minutes: 4},
      {section: 'Terms', minutes: 1},
    ],
    items: [
      {label: 'Logo and wordmark', amount: 2400},
      {label: 'Color, type and brand sheet', amount: 1800},
    ],
  }),
  usd({
    id: 'pro-2026-039',
    number: 'PRO-2026-039',
    title: 'E-Commerce Platform',
    client: 'Priya Nair',
    contact: 'Priya Nair',
    contactRole: 'Head of Digital, Nair Home',
    amount: 14750,
    stage: 'sent',
    nudge: {
      kind: 'not-opened',
      label: 'Not opened in 4 days',
      why: 'Sent 4 days ago and still not opened. Expires Mar 20.',
    },
    stops: [
      {label: 'Sent Mar 6', detail: 'Delivered, not opened in 4 days'},
      {label: 'Not opened'},
      {label: 'Expires Mar 20'},
    ],
    waited: 0.29,
    lastActivity: 'Sent Mar 6',
    expires: 'Mar 20',
    items: [
      {label: 'Store design, 6 templates', amount: 8250},
      {label: 'Checkout and account flows', amount: 4300},
      {label: 'Launch support', amount: 2200},
    ],
  }),
  usd({
    id: 'pro-2026-038',
    number: 'PRO-2026-038',
    title: 'Mobile App UI',
    client: 'Emily Chen',
    contact: 'Emily Chen',
    contactRole: 'Founder, Chen Studio',
    amount: 6300,
    stage: 'draft',
    stops: [
      {label: 'Draft', detail: 'Edited 4 days ago'},
      {label: 'Opened'},
      {label: 'Signature'},
    ],
    lastActivity: 'Edited 4 days ago',
    items: [
      {label: 'UI design, 6 screens', amount: 4800},
      {label: 'Clickable prototype', amount: 1500},
    ],
  }),
  usd({
    id: 'pro-2026-037',
    number: 'PRO-2026-037',
    title: 'Dashboard Analytics',
    client: 'Marcus Webb',
    contact: 'Marcus Webb',
    contactRole: 'COO, Webb Logistics',
    amount: 9900,
    stage: 'expired',
    stops: [
      {label: 'Sent Feb 2'},
      {label: 'Opened 2×, Feb 3'},
      {label: 'Expired Mar 4', detail: 'Not signed'},
    ],
    lastActivity: 'Expired Mar 4',
    opens: 2,
    viewers: 1,
    reading: [
      {section: 'Investment', minutes: 3},
      {section: 'Scope', minutes: 2},
    ],
    items: [
      {label: 'Dashboard design, 4 views', amount: 7200},
      {label: 'Chart library and handoff', amount: 2700},
    ],
  }),
  usd({
    id: 'pro-2026-034',
    number: 'PRO-2026-034',
    title: 'Copywriting Sprint',
    client: 'Ravi Patel',
    contact: 'Ravi Patel',
    contactRole: 'Marketing Lead, Patel Labs',
    amount: 1200,
    stage: 'opened',
    nudge: {
      kind: 'quiet',
      label: 'No activity in 7 days',
      why: 'Opened once on Mar 1, then nothing for 7 days, even after a reminder on Mar 3.',
    },
    stops: [
      {label: 'Sent Feb 27'},
      {label: 'Opened 1×', detail: 'Mar 1, reminder sent Mar 3'},
      {label: 'Expires Mar 27'},
    ],
    waited: 0.35,
    lastActivity: 'Reminder sent Mar 3',
    expires: 'Mar 27',
    opens: 1,
    viewers: 1,
    reading: [
      {section: 'Scope', minutes: 2},
      {section: 'Investment', minutes: 1},
    ],
    items: [
      {label: 'Homepage and 3 landing pages', amount: 900},
      {label: 'Two rounds of edits', amount: 300},
    ],
  }),
  usd({
    id: 'pro-2026-035',
    number: 'PRO-2026-035',
    title: 'Landing Page Design',
    client: 'Olivia Park',
    contact: 'Olivia Park',
    contactRole: 'Founder, Park Yoga',
    amount: 2850,
    stage: 'signed',
    stops: [
      {label: 'Sent Feb 26'},
      {label: 'Opened 2×, Feb 27'},
      {label: 'Signed Mar 1', detail: 'by Olivia Park'},
    ],
    lastActivity: 'Signed Mar 1',
    opens: 2,
    viewers: 1,
    signers: [
      {
        name: 'Olivia Park',
        role: 'Founder, Park Yoga',
        initials: 'OP',
        signed: 'Signed Mar 1',
      },
      {...JORDAN, signed: 'Signed Feb 26'},
    ],
    items: [
      {label: 'Landing page design', amount: 2200},
      {label: 'Copy polish and handoff', amount: 650},
    ],
  }),
  // The rest of the 24, so the ledger and filters add up.
  ...(
    [
      ['pro-2026-033', 'Help Center Redesign', 'Hannah Wolfe', 'opened', 9350, 'Feb 25', 'Opened 2×, Mar 4', 'Mar 25', 0.35],
      ['pro-2026-032', 'Event Microsite', 'Diego Alvarez', 'opened', 4500, 'Feb 24', 'Opened 1×, Feb 26', 'Mar 24', 0.5],
      ['pro-2026-031', 'Investor Deck Refresh', 'Noah Becker', 'sent', 5500, 'Mar 9', '', 'Mar 23', 0.07],
      ['pro-2026-030', 'Onboarding Emails', 'Grace Liu', 'sent', 1870, 'Mar 8', '', 'Mar 22', 0.14],
      ['pro-2026-029', 'Newsletter Templates', 'Sam Ortiz', 'sent', 2400, 'Mar 7', '', 'Mar 21', 0.21],
      ['pro-2026-028', 'Packaging Mockups', 'Ines Duarte', 'sent', 3950, 'Mar 7', '', 'Mar 21', 0.21],
      ['pro-2026-027', 'Icon Set', 'Tom Hughes', 'sent', 2800, 'Mar 9', '', 'Mar 23', 0.07],
      ['pro-2026-026', 'Podcast Brand Kit', 'Maya Rossi', 'draft', 4650, '', '', '', 0],
      ['pro-2026-025', 'Annual Report Layout', 'Ben Carter', 'draft', 5800, '', '', '', 0],
      ['pro-2026-024', 'Booking Flow Redesign', 'Kofi Mensah', 'signed', 12400, 'Feb 2', 'Opened 4×, Feb 3', 'Feb 4', 0],
      ['pro-2026-023', 'Social Templates', 'Lucy Grant', 'signed', 3110, 'Feb 9', 'Opened 1×, Feb 9', 'Feb 11', 0],
      ['pro-2026-022', 'Blog Theme', 'Omar Haddad', 'signed', 4750, 'Jan 19', 'Opened 2×, Jan 20', 'Jan 21', 0],
      ['pro-2026-021', 'SaaS Pricing Page', 'Julia Novak', 'signed', 9600, 'Jan 5', 'Opened 3×, Jan 6', 'Jan 8', 0],
      ['pro-2026-020', 'Logo Refresh', 'Pete Moreau', 'signed', 2000, 'Dec 29', 'Opened 1×, Dec 30', 'Dec 31', 0],
      ['pro-2026-019', 'Conference Booth Graphics', 'Aisha Bello', 'expired', 6000, 'Jan 26', 'Opened 1×, Jan 28', 'Feb 25', 0],
      ['pro-2026-018', 'Menu Design', 'Leo Marchetti', 'expired', 5500, 'Jan 20', '', 'Feb 19', 0],
    ] as const
  ).map(([id, title, client, stage, amount, sent, opened, last, waited]) =>
    filler(id, title, client, stage, amount, sent, opened, last, waited),
  ),
]

function filler(
  id: string,
  title: string,
  client: string,
  stage: Stage,
  amount: number,
  sent: string,
  opened: string,
  date: string,
  waited: number,
): Proposal {
  const base = {
    id,
    number: id.toUpperCase(),
    title,
    client,
    contact: client,
    contactRole: 'Client',
    amount,
    currency: 'USD' as const,
    usd: amount,
    stage,
    items: [
      {label: 'Design', amount: Math.round(amount * 0.7)},
      {label: 'Handoff and revisions', amount: amount - Math.round(amount * 0.7)},
    ],
  }
  switch (stage) {
    case 'draft':
      return {
        ...base,
        stops: [{label: 'Draft', detail: 'Edited last week'}, {label: 'Opened'}, {label: 'Signature'}],
        lastActivity: 'Edited last week',
      }
    case 'sent':
      return {
        ...base,
        stops: [{label: `Sent ${sent}`, detail: 'Delivered, not opened yet'}, {label: 'Not opened'}, {label: `Expires ${date}`}],
        waited,
        lastActivity: `Sent ${sent}`,
        expires: date,
      }
    case 'opened':
      return {
        ...base,
        stops: [{label: `Sent ${sent}`}, {label: opened.split(',')[0], detail: `Last opened ${opened.split(', ')[1]}`}, {label: `Expires ${date}`}],
        waited,
        lastActivity: opened,
        expires: date,
        opens: Number.parseInt(opened.replace('Opened ', ''), 10) || 1,
        viewers: 1,
      }
    case 'signed':
      return {
        ...base,
        stops: [{label: `Sent ${sent}`}, {label: opened}, {label: `Signed ${date}`, detail: `by ${client}`}],
        lastActivity: `Signed ${date}`,
        opens: 1,
        viewers: 1,
      }
    default:
      return {
        ...base,
        stops: [{label: `Sent ${sent}`}, opened ? {label: opened} : {label: 'Not opened'}, {label: `Expired ${date}`, detail: 'Not signed'}],
        lastActivity: `Expired ${date}`,
      }
  }
}

/** Worst-case content: long and unbroken names, Japanese, rupiah, euro, zero. */
const STRESS_BASE: Proposal[] = [
  {
    id: 'pro-2026-10482',
    number: 'PRO-2026-10482',
    title:
      'Website-redesign-v2-FINAL-final-revised-for-legal-review-2026 und Implementierungsplan für die Qualitätssicherung der Plattform',
    client:
      'Fundación Iberoamericana para el Desarrollo Sostenible de Comunidades Rurales',
    contact: 'Ana María Rodríguez-Villanueva',
    contactRole:
      'Directora Ejecutiva, Fundación Iberoamericana para el Desarrollo Sostenible',
    amount: 1250000,
    currency: 'USD',
    usd: 1250000,
    stage: 'opened',
    nudge: {
      kind: 'expiring',
      label: 'Expires tomorrow',
      why: 'Opened 128 times by 14 people, but nobody has signed in 34 days. Expires tomorrow at 11:59 PM, Central European Time.',
    },
    stops: [
      {label: 'Sent Jan 14'},
      {label: 'Opened 128×', detail: '14 viewers, last 2 min ago'},
      {label: 'Expires tomorrow'},
    ],
    waited: 0.97,
    lastActivity: 'Opened 128×, 2 min ago',
    expires: 'tomorrow',
    opens: 128,
    viewers: 14,
    events: [
      {kind: 'done', title: 'Sent to 3 signers', meta: 'Jan 14, 11:58 PM by Jordan Doe'},
      {kind: 'current', title: 'Opened by 佐藤 健太郎', meta: 'Jan 15, 8:03 AM, read for 2 h 14 min'},
      {
        kind: 'event',
        title: 'Maximilian Alexander von Hohenberg-Schwarzenfeld opened it',
        meta: 'Jan 16, 3:02 PM, read for 1 h 42 min',
      },
      {kind: 'event', title: '11 more people opened it', meta: 'Show all 128 views'},
      {
        kind: 'event',
        title: 'Reminder sent automatically',
        meta: 'Feb 18, 9:00 AM, to 2 signers. Limit reached, no more automatic reminders.',
      },
      {kind: 'waiting', title: 'No signature for 34 days', meta: 'Expires tomorrow at 11:59 PM, Central European Time'},
      {kind: 'partial', title: 'Signed 1 of 3', meta: 'Waiting on Ana María Rodríguez-Villanueva and 佐藤 健太郎'},
    ],
    signers: [
      {
        name: 'Ana María Rodríguez-Villanueva',
        role: 'Directora Ejecutiva, Fundación Iberoamericana para el Desarrollo Sostenible',
        initials: 'AR',
      },
      {name: '佐藤 健太郎', role: '代表取締役, 株式会社サンプルデザイン事務所', initials: '佐'},
      {name: 'Jordan Doe', role: 'You, Jordan Doe Studio', initials: 'JD', signed: 'Signed Jan 14'},
    ],
    reminders: ['Automatic, every 3 days until signed', 'Paused: 3 reminders sent, the most Nota sends on its own'],
    reading: [
      {section: 'Implementierungsplan und Qualitätssicherung', minutes: 185},
      {section: 'Investment', minutes: 151},
      {section: 'Anhang B: Datenschutz-Folgenabschätzung', minutes: 75},
      {section: 'Terms', minutes: 0},
    ],
    items: [
      {
        label:
          'Implementation planning and quality assurance across 14 regional offices, including on-site workshops',
        amount: 840000,
      },
      {label: 'Research synthesis', amount: 260000},
      {label: 'Design system maintenance', amount: 150000},
    ],
  },
  {
    id: 'pro-2026-10477',
    number: 'PRO-2026-10477',
    title: 'ブランドリニューアル提案書（2026年度 上期）',
    client: '株式会社サンプルデザイン事務所',
    contact: '佐藤 健太郎',
    contactRole: '代表取締役',
    amount: 12800000,
    currency: 'JPY',
    usd: 85000,
    stage: 'opened',
    nudge: {
      kind: 'quiet',
      label: 'No activity in 21 days',
      why: 'Opened twice by one person, then no activity for 21 days. Expires April 14 at 11:59 PM, Japan Standard Time.',
    },
    stops: [
      {label: 'Sent Feb 14'},
      {label: 'Opened 2×', detail: 'Last opened Feb 17'},
      {label: 'Expires Apr 14'},
    ],
    waited: 0.4,
    lastActivity: 'Opened 2×, Feb 17',
    expires: 'Apr 14',
    opens: 2,
    viewers: 1,
    items: [
      {label: 'ブランド戦略', amount: 4800000},
      {label: 'ロゴとビジュアルアイデンティティ', amount: 8000000},
    ],
  },
  {
    id: 'pro-2026-10470',
    number: 'PRO-2026-10470',
    title:
      'Pembuatan Website dan Sistem Manajemen Konten untuk Kementerian Pariwisata',
    client: 'PT Sinar Harapan Nusantara Teknologi Indonesia Tbk',
    contact: 'Dewi Kartika Sari',
    contactRole: 'Kepala Divisi Digital',
    amount: 1250000000,
    currency: 'IDR',
    usd: 76000,
    stage: 'sent',
    nudge: {
      kind: 'not-opened',
      label: 'Not opened in 23 days',
      why: 'Sent to 4 people 23 days ago. 3 received it and nobody has opened it. Expires Mar 17 at 11:59 PM, Western Indonesia Time.',
    },
    stops: [
      {label: 'Sent Feb 15', detail: 'Delivered to 3 of 4 recipients'},
      {label: 'Not opened'},
      {label: 'Expires Mar 17'},
    ],
    waited: 0.8,
    lastActivity: 'Reminder sent by Jordan Doe Studio, Mar 3',
    expires: 'Mar 17',
    items: [
      {label: 'Desain dan pengembangan website', amount: 850000000},
      {label: 'Sistem manajemen konten', amount: 400000000},
    ],
  },
  {
    id: 'pro-2026-10466',
    number: 'PRO-2026-10466',
    title: 'Annual Brand Retainer',
    client: 'Halvorsen & Lindqvist Arkitekter AS',
    contact: 'Ingrid Halvorsen',
    contactRole: 'Partner',
    amount: 96000,
    currency: 'USD',
    usd: 96000,
    stage: 'signing',
    signing: {signed: 1, total: 3},
    stops: [
      {label: 'Sent Mar 2'},
      {label: 'Opened 9×, Mar 2'},
      {label: 'Signed 1 of 3', detail: 'Waiting on Ingrid Halvorsen and Finance'},
    ],
    lastActivity: 'Signed by 1 of 3',
    opens: 9,
    viewers: 3,
    items: [
      {label: 'Brand retainer, 12 months', amount: 96000},
    ],
  },
  {
    id: 'pro-2026-10461',
    number: 'PRO-2026-10461',
    title: 'E-Commerce Platform',
    client: 'Priya Nair',
    contact: 'Priya Nair',
    contactRole: 'Head of Digital',
    amount: 14750,
    currency: 'USD',
    usd: 14750,
    stage: 'bounced',
    nudge: {
      kind: 'bounced',
      label: 'Email bounced',
      why: "Priya's mailbox is full, so the email wasn't delivered. Check the address or send it another way.",
    },
    stops: [
      {label: 'Bounced Mar 6', detail: 'Mailbox full. Check the address.'},
      {label: 'Not delivered'},
      {label: 'Expires Mar 20'},
    ],
    lastActivity: 'Bounced Mar 6',
    expires: 'Mar 20',
    items: [{label: 'Store design', amount: 14750}],
  },
  {
    id: 'pro-2026-10455',
    number: 'PRO-2026-10455',
    title: 'Kommunikationsstrategie und Markenrelaunch',
    client: 'Müller-Lüdenscheidt Kommunikationsagentur GmbH & Co. KG',
    contact: 'Klaus Müller-Lüdenscheidt',
    contactRole: 'Geschäftsführer',
    amount: 987654.32,
    currency: 'EUR',
    usd: 1066000,
    stage: 'expired',
    stops: [
      {label: 'Sent Feb 2'},
      {label: 'Opened 31×, Mar 3'},
      {label: 'Expired Mar 4', detail: 'Not signed'},
    ],
    lastActivity: 'Expired Mar 4',
    opens: 31,
    viewers: 6,
    items: [{label: 'Kommunikationsstrategie', amount: 987654.32}],
  },
  {
    id: 'pro-2026-10452',
    number: 'PRO-2026-10452',
    title: 'Pilot (no charge)',
    client: 'Ravi Patel',
    contact: 'Ravi Patel',
    contactRole: 'Client',
    amount: 0,
    currency: 'USD',
    usd: 0,
    stage: 'draft',
    stops: [
      {label: 'Draft', detail: 'Edited 2 min ago'},
      {label: 'Opened'},
      {label: 'Signature'},
    ],
    lastActivity: 'Edited 2 min ago',
    items: [{label: 'Pilot', amount: 0}],
  },
  {
    id: 'pro-1',
    number: 'PRO-1',
    title: 'UI',
    client: 'Al',
    contact: 'Al',
    contactRole: 'Client',
    amount: 5,
    currency: 'USD',
    usd: 5,
    stage: 'signed',
    stops: [
      {label: 'Sent Mar 1'},
      {label: 'Opened 1×, Mar 1'},
      {label: 'Signed Mar 1', detail: 'by Al'},
    ],
    lastActivity: 'Signed Mar 1',
    opens: 1,
    viewers: 1,
    items: [{label: 'UI', amount: 5}],
  },
]

/** 40 rows: the eight worst cases, five times over. */
export const STRESS_PROPOSALS: Proposal[] = Array.from({length: 5}, (_, round) =>
  STRESS_BASE.map((p) =>
    round === 0 ? p : {...p, id: `${p.id}-${round + 1}`, number: `${p.number}-${round + 1}`},
  ),
).flat()

export const getProposals = (dataset: string | null) =>
  dataset === 'stress' ? STRESS_PROPOSALS : PROPOSALS

export const findProposal = (id: string) =>
  [...PROPOSALS, ...STRESS_PROPOSALS].find((p) => p.id === id)
