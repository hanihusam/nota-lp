import {useState} from 'react'

import {Button} from '~/components/button'

// ── Icons ────────────────────────────────────────────────────────────────────
function IconEye() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function IconFileDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="13" x2="12" y2="19" />
      <polyline points="9 16 12 19 15 16" />
    </svg>
  )
}
function IconSend() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
function IconChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
function IconSearch() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
function IconPlus() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function IconFileText({className}: {className?: string}) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}
function IconMore() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  )
}
function IconPencil() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function IconHash() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────
type Status = 'Draft' | 'Sent' | 'Paid'

interface Proposal {
  id: string
  name: string
  client: string
  email: string
  status: Status
  proposalId: string
  date: string
  validUntil: string
  description: string
  lineItems: {
    service: string
    desc: string
    hours: number
    rate: string
    subtotal: string
  }[]
}

const proposals: Proposal[] = [
  {
    id: '1',
    name: 'Website Redesign',
    client: 'Sarah Mitchell',
    email: 'mitchell.design@email.com',
    status: 'Draft',
    proposalId: 'PRO-2026-041',
    date: 'Mar 8, 2026',
    validUntil: 'Apr 8, 2026',
    description:
      'Complete redesign of the existing marketing website, including new visual identity implementation, improved user experience, and responsive frontend development using modern technologies.',
    lineItems: [
      {
        service: 'Discovery & Research',
        desc: 'User interviews, competitive analysis, and requirements gathering',
        hours: 15,
        rate: '$50/hr',
        subtotal: '$750.00',
      },
      {
        service: 'UI Design',
        desc: 'Wireframes, high-fidelity mockups, and interactive prototypes',
        hours: 30,
        rate: '$50/hr',
        subtotal: '$1,500.00',
      },
      {
        service: 'Frontend Development',
        desc: 'Responsive implementation with React and Tailwind CSS',
        hours: 40,
        rate: '$50/hr',
        subtotal: '$2,000.00',
      },
    ],
  },
  {
    id: '2',
    name: 'Brand Identity Package',
    client: 'Alex Turner',
    email: 'alex@turnercreative.co',
    status: 'Sent',
    proposalId: 'PRO-2026-038',
    date: 'Feb 28, 2026',
    validUntil: 'Mar 28, 2026',
    description:
      'Full brand identity system including logo design, color palette, typography selection, and comprehensive brand guidelines for digital and print applications.',
    lineItems: [
      {
        service: 'Brand Strategy',
        desc: 'Positioning, values, and competitive landscape analysis',
        hours: 10,
        rate: '$60/hr',
        subtotal: '$600.00',
      },
      {
        service: 'Logo Design',
        desc: 'Primary logo, variations, and usage guidelines',
        hours: 20,
        rate: '$60/hr',
        subtotal: '$1,200.00',
      },
      {
        service: 'Brand Guidelines',
        desc: 'Full brand book with color, type, and usage rules',
        hours: 15,
        rate: '$60/hr',
        subtotal: '$900.00',
      },
    ],
  },
  {
    id: '3',
    name: 'E-Commerce Platform',
    client: 'Jordan Lee',
    email: 'jordan@leeshop.com',
    status: 'Paid',
    proposalId: 'PRO-2026-031',
    date: 'Feb 10, 2026',
    validUntil: 'Mar 10, 2026',
    description:
      'End-to-end e-commerce platform build with product catalog, cart, checkout flow, and admin dashboard. Fully integrated with Stripe and major shipping providers.',
    lineItems: [
      {
        service: 'Architecture & Setup',
        desc: 'Tech stack selection, database schema, and project scaffolding',
        hours: 20,
        rate: '$70/hr',
        subtotal: '$1,400.00',
      },
      {
        service: 'Frontend Development',
        desc: 'Storefront, product pages, cart, and checkout UI',
        hours: 60,
        rate: '$70/hr',
        subtotal: '$4,200.00',
      },
      {
        service: 'Backend & Integrations',
        desc: 'API, Stripe payments, and shipping integrations',
        hours: 40,
        rate: '$70/hr',
        subtotal: '$2,800.00',
      },
    ],
  },
  {
    id: '4',
    name: 'Mobile App UI',
    client: 'Emily Chen',
    email: 'emily.chen@appsco.io',
    status: 'Paid',
    proposalId: 'PRO-2026-027',
    date: 'Jan 22, 2026',
    validUntil: 'Feb 22, 2026',
    description:
      'Native mobile UI design for iOS and Android, including user flows, component library, and developer handoff documentation.',
    lineItems: [
      {
        service: 'UX Research',
        desc: 'User interviews and journey mapping',
        hours: 12,
        rate: '$55/hr',
        subtotal: '$660.00',
      },
      {
        service: 'UI Design',
        desc: 'All screens, states, and component library',
        hours: 45,
        rate: '$55/hr',
        subtotal: '$2,475.00',
      },
      {
        service: 'Prototype & Handoff',
        desc: 'Interactive prototype and Figma dev mode setup',
        hours: 8,
        rate: '$55/hr',
        subtotal: '$440.00',
      },
    ],
  },
  {
    id: '5',
    name: 'Dashboard Analytics',
    client: 'Marcus Webb',
    email: 'm.webb@dataflow.ai',
    status: 'Sent',
    proposalId: 'PRO-2026-022',
    date: 'Jan 14, 2026',
    validUntil: 'Feb 14, 2026',
    description:
      "Data analytics dashboard with real-time charts, KPI tracking, and exportable reports. Built with React and D3, connecting to the client's existing data warehouse.",
    lineItems: [
      {
        service: 'Data Modeling',
        desc: 'Schema review and API design for dashboard endpoints',
        hours: 10,
        rate: '$65/hr',
        subtotal: '$650.00',
      },
      {
        service: 'Dashboard UI',
        desc: 'Charts, tables, filters, and KPI widgets',
        hours: 35,
        rate: '$65/hr',
        subtotal: '$2,275.00',
      },
      {
        service: 'Export & Reports',
        desc: 'PDF and CSV export functionality',
        hours: 8,
        rate: '$65/hr',
        subtotal: '$520.00',
      },
    ],
  },
  {
    id: '6',
    name: 'Landing Page Design',
    client: 'Olivia Park',
    email: 'olivia@parkventures.com',
    status: 'Draft',
    proposalId: 'PRO-2026-018',
    date: 'Jan 5, 2026',
    validUntil: 'Feb 5, 2026',
    description:
      'High-converting landing page design and development for a SaaS product launch, including A/B test variants and analytics integration.',
    lineItems: [
      {
        service: 'Copywriting',
        desc: 'Headlines, subheadings, and CTA copy',
        hours: 6,
        rate: '$50/hr',
        subtotal: '$300.00',
      },
      {
        service: 'Design',
        desc: 'Visual design, illustrations, and responsive layout',
        hours: 16,
        rate: '$50/hr',
        subtotal: '$800.00',
      },
      {
        service: 'Development',
        desc: 'Implementation and analytics setup',
        hours: 12,
        rate: '$50/hr',
        subtotal: '$600.00',
      },
    ],
  },
]

const statusStyle: Record<Status, string> = {
  Draft: 'bg-gray-800 text-text-secondary',
  Sent: 'bg-sage-900 text-text-accent',
  Paid: 'bg-btn-primary text-white',
}

// ── Component ─────────────────────────────────────────────────────────────────
const HeroMockup = () => {
  const [selectedId, setSelectedId] = useState('1')
  const selected = proposals.find(p => p.id === selectedId) ?? proposals[0]

  return (
    // inline-grid: glow (col-1 row-1, z-0) + frame (col-1 row-1, z-10) overlap
    <div
      className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start relative shrink-0"
      style={{lineHeight: 0}}
    >
      {/* Glow — Figma node 35:1765: 1400×360 at mt-60, z-0 (behind frame) */}
      <div className="col-start-1 row-start-1 w-350 h-90 mt-15 relative z-0">
        <div
          className="absolute pointer-events-none"
          style={{
            inset: '-55.56% -14.29%',
            background:
              'radial-gradient(ellipse 55% 45% at 38% 65%, rgba(107,143,113,0.22) 0%, rgba(107,143,113,0.06) 45%, transparent 70%)',
          }}
        />
      </div>

      {/* App frame — Figma node 35:1459: 1152×720, ml-124, z-10 (above glow) */}
      <div
        className="col-start-1 row-start-1 ml-31 h-180 bg-page border border-gray-800 rounded-xl overflow-hidden p-px relative z-10"
        style={{
          width: '1152px',
          boxShadow:
            '0px 4px 16px 0px rgba(0,0,0,0.4), 0px 24px 80px 0px rgba(107,143,113,0.15)',
        }}
      >
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="h-14 bg-surface border-b border-gray-800/50 rounded-tl-xl rounded-tr-xl shrink-0 flex items-center justify-between pb-px px-5">
          {/* Left: brand + nav + breadcrumb */}
          <div className="flex items-center gap-6">
            <span className="font-serif text-[22px] text-white leading-none tracking-[-0.02em]">
              nota
            </span>
            <div className="flex items-center gap-0.5">
              <button className="px-3 py-1.5 text-[13px] text-white font-medium leading-[19.5px] relative rounded-md cursor-pointer hover:bg-surface-secondary transition-colors">
                Proposals
                <span className="absolute -bottom-px left-3 right-3 h-0.5 bg-btn-primary rounded-full" />
              </button>
              <button className="px-3 py-1.5 text-[13px] text-text-tertiary font-medium leading-[19.5px] rounded-md cursor-pointer hover:bg-surface-secondary hover:text-text-secondary transition-colors">
                Clients
              </button>
            </div>
            <span className="text-[13px] text-gray-800 leading-[19.5px] select-none">
              |
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-text-secondary leading-[19.5px]">
                {selected.name}
              </span>
              <span
                className={`px-2 py-px text-[11px] rounded-full leading-[16.5px] ${statusStyle[selected.status]}`}
              >
                {selected.status}
              </span>
            </div>
          </div>

          {/* Right: action buttons + avatar */}
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <IconEye /> Preview
            </Button>
            <Button variant="secondary" size="sm">
              <IconFileDown /> Export PDF
            </Button>
            <Button variant="primary" size="sm">
              <IconSend /> Send
            </Button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-800">
              <div className="size-7 bg-btn-primary rounded-full flex items-center justify-center text-[12px] text-white leading-none select-none">
                JD
              </div>
              <span className="text-text-tertiary cursor-pointer hover:text-text-secondary transition-colors">
                <IconChevronDown />
              </span>
            </div>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="flex" style={{height: '662px'}}>
          {/* Sidebar */}
          <div
            className="bg-surface border-r border-gray-800/50 shrink-0 relative"
            style={{width: '240px'}}
          >
            {/* Search */}
            <div
              className="absolute left-3 top-3 flex items-center gap-2 bg-gray-800/50 border border-gray-800 rounded-lg px-3 cursor-text"
              style={{width: '215px', height: '37.5px'}}
            >
              <span className="text-text-disabled">
                <IconSearch />
              </span>
              <span className="text-[13px] text-text-disabled leading-normal select-none">
                Search proposals...
              </span>
            </div>

            {/* New Proposal */}
            <div
              className="absolute left-3"
              style={{top: '61.5px', width: '215px'}}
            >
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center"
              >
                <IconPlus /> New Proposal
              </Button>
            </div>

            {/* Proposal list */}
            <div
              className="absolute left-0 top-27.25 px-2 flex flex-col overflow-clip"
              style={{width: '239px', height: '520px'}}
            >
              <p className="text-[11px] text-text-disabled uppercase tracking-[0.055em] px-2 py-2 leading-[16.5px] select-none">
                Proposals
              </p>
              <div className="flex flex-col gap-0.5">
                {proposals.map(p => {
                  const isActive = p.id === selectedId
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className={`w-full text-left rounded-lg flex flex-col gap-1 cursor-pointer transition-colors ${
                        isActive ? 'bg-sage-900' : 'hover:bg-surface-secondary'
                      }`}
                      style={{
                        width: '223px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <IconFileText
                          className={
                            isActive
                              ? 'text-text-accent shrink-0'
                              : 'text-text-disabled shrink-0'
                          }
                        />
                        <span
                          className={`text-[13px] font-medium leading-[19.5px] truncate ${isActive ? 'text-text-accent' : 'text-text-secondary'}`}
                        >
                          {p.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pl-5.5">
                        <span className="text-[12px] text-text-disabled leading-4.5 font-medium">
                          {p.client}
                        </span>
                        <span
                          className={`text-[10px] font-medium leading-3.75 px-1.5 rounded-full ${statusStyle[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Footer stats */}
            <div
              className="absolute left-0 bottom-0 border-t border-gray-800/50 flex flex-col gap-1 pt-3 px-3 pb-3"
              style={{width: '239px'}}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-tertiary leading-4.5">
                  Total Revenue
                </span>
                <span className="text-[12px] text-btn-primary leading-4.5">
                  $21,200
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-tertiary leading-4.5">
                  Pending
                </span>
                <span className="text-[12px] text-text-secondary leading-4.5">
                  $10,550
                </span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div
            className="flex-1 bg-page overflow-hidden flex flex-col gap-5 pt-6"
            style={{paddingLeft: '140.5px', paddingRight: '140.5px'}}
          >
            {/* Client info card */}
            <div className="bg-surface border border-gray-800/40 rounded-xl shrink-0 flex flex-col gap-5 pt-6 px-6 pb-px">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[12px] text-text-disabled uppercase tracking-[0.05em] leading-4.5">
                    Proposal For
                  </p>
                  <p className="font-serif text-[28px] text-white leading-[33.6px]">
                    {selected.client}
                  </p>
                  <p className="text-[14px] text-text-tertiary leading-5.25">
                    {selected.email}
                  </p>
                </div>
                <button className="p-2 text-text-disabled hover:text-text-secondary hover:bg-surface-secondary rounded-lg cursor-pointer transition-colors">
                  <IconMore />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-6">
                {[
                  {
                    icon: <IconHash />,
                    label: 'Proposal',
                    value: selected.proposalId,
                  },
                  {icon: <IconCalendar />, label: 'Date', value: selected.date},
                  {
                    icon: <IconCalendar />,
                    label: 'Valid Until',
                    value: selected.validUntil,
                  },
                ].map(item => (
                  <div
                    key={item.label}
                    className="bg-gray-800/40 rounded-lg pl-3 flex items-center gap-3"
                    style={{height: '56px'}}
                  >
                    <span className="text-text-disabled">{item.icon}</span>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[11px] text-text-disabled leading-[16.5px]">
                        {item.label}
                      </p>
                      <p className="text-[13px] text-text-secondary leading-[19.5px]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project card */}
            <div className="bg-surface border border-gray-800/40 rounded-xl shrink-0 p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-text-disabled uppercase tracking-[0.05em] leading-4.5">
                  Project
                </p>
                <button className="flex items-center gap-1 text-[12px] text-text-disabled leading-4.5 hover:text-text-secondary cursor-pointer transition-colors">
                  <IconPencil /> Edit
                </button>
              </div>
              <p className="font-serif text-[22px] text-white leading-8.25">
                {selected.name}
              </p>
              <p className="text-[14px] text-text-tertiary leading-5.25">
                {selected.description}
              </p>
            </div>

            {/* Line items card */}
            <div
              className="bg-surface border border-gray-800/40 rounded-xl shrink-0 flex flex-col overflow-clip p-px"
              style={{height: '317px'}}
            >
              <div
                className="flex items-center justify-between border-b border-gray-800/40 px-6 shrink-0"
                style={{height: '52.5px'}}
              >
                <p className="text-[12px] text-text-disabled uppercase tracking-[0.05em] leading-4.5">
                  Line Items
                </p>
                <button className="text-[13px] text-btn-primary font-medium leading-[19.5px] hover:text-sage-300 cursor-pointer transition-colors">
                  + Add Item
                </button>
              </div>
              <div
                className="grid border-b border-gray-800/30 px-6 shrink-0"
                style={{
                  gridTemplateColumns:
                    'minmax(0,510fr) minmax(0,80fr) minmax(0,80fr) minmax(0,1fr)',
                  height: '41.5px',
                  paddingTop: '12px',
                  paddingBottom: '13px',
                }}
              >
                {['Service', 'Hours', 'Rate', 'Subtotal'].map((h, i) => (
                  <p
                    key={h}
                    className={`text-[11px] text-text-disabled uppercase tracking-[0.055em] leading-[16.5px] ${i > 0 ? 'text-right' : ''}`}
                  >
                    {h}
                  </p>
                ))}
              </div>
              {selected.lineItems.map((row, i) => (
                <div
                  key={row.service}
                  className={`grid px-6 shrink-0 hover:bg-surface-secondary transition-colors ${i < selected.lineItems.length - 1 ? 'border-b border-gray-800/25' : ''}`}
                  style={{
                    gridTemplateColumns:
                      'minmax(0,510fr) minmax(0,80fr) minmax(0,80fr) minmax(0,1fr)',
                    height: '74px',
                    paddingTop: '16px',
                    paddingBottom: '17px',
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[14px] text-white leading-5.25">
                      {row.service}
                    </p>
                    <p className="text-[12px] text-text-disabled leading-4.5">
                      {row.desc}
                    </p>
                  </div>
                  <p className="text-[14px] text-text-secondary leading-5.25 text-right">
                    {row.hours}
                  </p>
                  <p className="text-[14px] text-text-secondary leading-5.25 text-right">
                    {row.rate}
                  </p>
                  <p className="text-[14px] text-white leading-5.25 text-right">
                    {row.subtotal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

HeroMockup.displayName = 'HeroMockup'

export default HeroMockup
