// Icon helpers — inline SVG to avoid icon library dependency
function IconEye() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function IconFileDown() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="13" x2="12" y2="19" /><polyline points="9 16 12 19 15 16" />
    </svg>
  )
}
function IconSend() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
function IconChevronDown() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
function IconSearch() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
function IconPlus() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function IconFileText({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'shrink-0'} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  )
}
function IconMore() {
  return (
    <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
    </svg>
  )
}
function IconPencil() {
  return (
    <svg className="shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function IconHash() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

const proposals = [
  { name: 'Website Redesign', client: 'Sarah Mitchell', status: 'Draft', active: true },
  { name: 'Brand Identity Package', client: 'Alex Turner', status: 'Sent', active: false },
  { name: 'E-Commerce Platform', client: 'Jordan Lee', status: 'Paid', active: false },
  { name: 'Mobile App UI', client: 'Emily Chen', status: 'Paid', active: false },
  { name: 'Dashboard Analytics', client: 'Marcus Webb', status: 'Sent', active: false },
  { name: 'Landing Page Design', client: 'Olivia Park', status: 'Draft', active: false },
]

const statusStyle: Record<string, string> = {
  Draft: 'bg-gray-800 text-text-secondary',
  Sent: 'bg-sage-900 text-text-accent',
  Paid: 'bg-btn-primary text-white',
}

const HeroMockup = () => {
  return (
    // inline-grid: glow (col-1 row-1) + frame (col-1 row-1) overlap
    <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start relative shrink-0" style={{ lineHeight: 0 }}>

      {/* Glow ellipse — Figma node 35:1765: 1400×360 at mt-60.
          Inner element bleeds -55.56% vertically / -14.29% horizontally.
          z-0 keeps it behind the frame (z-10). */}
      <div className="col-start-1 row-start-1 w-350 h-90 mt-15 relative z-0">
        <div
          className="absolute pointer-events-none"
          style={{
            inset: '-55.56% -14.29%',
            background: 'radial-gradient(ellipse 55% 45% at 38% 65%, rgba(107,143,113,0.22) 0%, rgba(107,143,113,0.06) 45%, transparent 70%)',
          }}
        />
      </div>

      {/* App frame — Figma node 35:1459: 1152×720, ml-124, p-px, overflow-clip.
          z-10 ensures frame renders above the glow.
          width in style to prevent linter converting to invalid w-6xl. */}
      <div
        className="col-start-1 row-start-1 ml-31 h-180 bg-page border border-gray-800 rounded-xl overflow-hidden p-px relative z-10"
        style={{
          width: '1152px',
          boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.4), 0px 24px 80px 0px rgba(107,143,113,0.15)',
        }}
      >
        {/* ── Header (56px) ───────────────────────────────────────── */}
        <div className="h-14 bg-surface border-b border-gray-800/50 rounded-tl-xl rounded-tr-xl shrink-0 flex items-center justify-between pb-px px-5">
          {/* Left: brand + nav + breadcrumb */}
          <div className="flex items-center gap-6">
            <span className="font-serif text-[22px] text-white leading-none tracking-[-0.02em]">nota</span>
            {/* Nav tabs */}
            <div className="flex items-center gap-0.5 relative">
              <button className="px-3 py-1.5 text-[13px] text-white font-medium leading-[19.5px] relative rounded-md">
                Proposals
                <span className="absolute bottom-[-1px] left-3 right-3 h-[2px] bg-btn-primary rounded-full" />
              </button>
              <button className="px-3 py-1.5 text-[13px] text-text-tertiary font-medium leading-[19.5px] rounded-md">Clients</button>
            </div>
            {/* Separator */}
            <span className="text-[13px] text-gray-800 leading-[19.5px]">|</span>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-text-secondary leading-[19.5px]">Website Redesign</span>
              <span className="px-2 py-px text-[11px] text-text-secondary bg-gray-800 rounded-full leading-[16.5px]">Draft</span>
            </div>
          </div>

          {/* Right: actions + avatar */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-gray-800 rounded-lg px-3 text-[13px] text-text-secondary leading-[19.5px]" style={{ paddingTop: '7px', paddingBottom: '7px' }}>
              <IconEye /> Preview
            </button>
            <button className="flex items-center gap-1.5 border border-gray-800 rounded-lg px-3 text-[13px] text-text-secondary leading-[19.5px]" style={{ paddingTop: '7px', paddingBottom: '7px' }}>
              <IconFileDown /> Export PDF
            </button>
            <button className="flex items-center gap-1.5 bg-btn-primary rounded-lg px-3 text-[13px] text-white leading-[19.5px]" style={{ paddingTop: '7px', paddingBottom: '7px' }}>
              <IconSend /> Send
            </button>
            {/* Avatar + chevron */}
            <div className="flex items-center gap-2 pl-3 border-l border-gray-800">
              <div className="size-7 bg-btn-primary rounded-full flex items-center justify-center text-[12px] text-white leading-[18px]">JD</div>
              <span className="text-text-tertiary"><IconChevronDown /></span>
            </div>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="flex" style={{ height: '662px' }}>

          {/* Sidebar (240px) */}
          <div className="bg-surface border-r border-gray-800/50 shrink-0 relative" style={{ width: '240px' }}>
            {/* Search */}
            <div className="absolute left-3 top-3 flex items-center gap-2 bg-gray-800/50 border border-gray-800 rounded-lg px-3 py-px" style={{ width: '215px', height: '37.5px' }}>
              <span className="text-text-disabled"><IconSearch /></span>
              <span className="text-[13px] text-text-disabled leading-normal">Search proposals...</span>
            </div>
            {/* New Proposal */}
            <div className="absolute left-3 flex items-center justify-center gap-2 bg-btn-primary rounded-lg text-[13px] text-white font-medium leading-[19.5px]" style={{ top: '61.5px', width: '215px', height: '35.5px' }}>
              <IconPlus /> New Proposal
            </div>
            {/* Proposal list */}
            <div className="absolute left-0 top-[109px] px-2 flex flex-col overflow-clip" style={{ width: '239px', height: '553px' }}>
              <p className="text-[11px] text-text-disabled uppercase tracking-[0.055em] px-2 py-2 leading-[16.5px]">Proposals</p>
              <div className="flex flex-col gap-0.5">
                {proposals.map((p) => (
                  <div
                    key={p.name}
                    className={`rounded-lg px-3 shrink-0 flex flex-col gap-1 ${p.active ? 'bg-sage-900' : ''}`}
                    style={{ width: '223px', paddingTop: '10px', paddingBottom: '10px' }}
                  >
                    <div className="flex items-center gap-2">
                      <IconFileText className={p.active ? 'text-text-accent shrink-0' : 'text-text-disabled shrink-0'} />
                      <span className={`text-[13px] font-medium leading-[19.5px] truncate ${p.active ? 'text-text-accent' : 'text-text-secondary'}`}>{p.name}</span>
                    </div>
                    <div className="flex items-center justify-between pl-[22px]">
                      <span className="text-[12px] text-text-disabled leading-[18px] font-medium">{p.client}</span>
                      <span className={`text-[10px] font-medium leading-[15px] px-1.5 rounded-full ${statusStyle[p.status]}`}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer stats */}
            <div className="absolute left-0 bottom-0 border-t border-gray-800/50 flex flex-col gap-1 pt-3 px-3 pb-3" style={{ width: '239px' }}>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-tertiary leading-[18px]">Total Revenue</span>
                <span className="text-[12px] text-btn-primary leading-[18px]">$21,200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-tertiary leading-[18px]">Pending</span>
                <span className="text-[12px] text-text-secondary leading-[18px]">$10,550</span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div
            className="flex-1 bg-page overflow-hidden flex flex-col gap-5 pt-6"
            style={{ paddingLeft: '140.5px', paddingRight: '140.5px' }}
          >
            {/* Client info card */}
            <div className="bg-surface border border-gray-800/40 rounded-xl shrink-0 flex flex-col gap-5 pt-6 px-6 pb-px">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[12px] text-text-disabled uppercase tracking-[0.05em] leading-[18px]">Proposal For</p>
                  <p className="font-serif text-[28px] text-white leading-[33.6px]">Sarah Mitchell</p>
                  <p className="text-[14px] text-text-tertiary leading-[21px]">mitchell.design@email.com</p>
                </div>
                <button className="p-2 text-text-disabled"><IconMore /></button>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-6">
                {[
                  { icon: <IconHash />, label: 'Proposal', value: 'PRO-2026-041' },
                  { icon: <IconCalendar />, label: 'Date', value: 'Mar 8, 2026' },
                  { icon: <IconCalendar />, label: 'Valid Until', value: 'Apr 8, 2026' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-800/40 rounded-lg pl-3 flex items-center gap-3" style={{ height: '56px' }}>
                    <span className="text-text-disabled">{item.icon}</span>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[11px] text-text-disabled leading-[16.5px]">{item.label}</p>
                      <p className="text-[13px] text-text-secondary leading-[19.5px]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project card */}
            <div className="bg-surface border border-gray-800/40 rounded-xl shrink-0 relative" style={{ height: '191px' }}>
              <div className="absolute flex items-center justify-between" style={{ left: '24.5px', top: '24.41px', width: '578.5px' }}>
                <p className="text-[12px] text-text-disabled uppercase tracking-[0.05em] leading-[18px]">Project</p>
                <button className="flex items-center gap-1 text-[12px] text-text-disabled leading-[18px]">
                  <IconPencil /> Edit
                </button>
              </div>
              <p className="absolute font-serif text-[22px] text-white leading-[33px]" style={{ left: '24.5px', top: '54.41px' }}>Website Redesign</p>
              <p className="absolute text-[14px] text-text-tertiary leading-[22.4px]" style={{ left: '24.5px', top: '95.41px', width: '579px' }}>
                Complete redesign of the existing marketing website, including new visual identity implementation, improved user experience, and responsive frontend development using modern technologies.
              </p>
            </div>

            {/* Line items card */}
            <div className="bg-surface border border-gray-800/40 rounded-xl shrink-0 flex flex-col overflow-clip p-px" style={{ height: '317px' }}>
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-gray-800/40 px-6 shrink-0" style={{ height: '52.5px' }}>
                <p className="text-[12px] text-text-disabled uppercase tracking-[0.05em] leading-[18px]">Line Items</p>
                <p className="text-[13px] text-btn-primary font-medium leading-[19.5px]">+ Add Item</p>
              </div>
              {/* Column headers */}
              <div className="grid border-b border-gray-800/30 px-6 shrink-0" style={{ gridTemplateColumns: 'minmax(0,510fr) minmax(0,80fr) minmax(0,80fr) minmax(0,1fr)', height: '41.5px', paddingTop: '12px', paddingBottom: '13px' }}>
                <p className="text-[11px] text-text-disabled uppercase tracking-[0.055em] leading-[16.5px]">Service</p>
                <p className="text-[11px] text-text-disabled uppercase tracking-[0.055em] leading-[16.5px] text-right">Hours</p>
                <p className="text-[11px] text-text-disabled uppercase tracking-[0.055em] leading-[16.5px] text-right">Rate</p>
                <p className="text-[11px] text-text-disabled uppercase tracking-[0.055em] leading-[16.5px] text-right">Subtotal</p>
              </div>
              {/* Rows */}
              {[
                { service: 'Discovery & Research', desc: 'User interviews, competitive analysis, and requirements gathering', hours: '15', rate: '$50/hr', sub: '$750.00', border: true },
                { service: 'UI Design', desc: 'Wireframes, high-fidelity mockups, and interactive prototypes', hours: '30', rate: '$50/hr', sub: '$1,500.00', border: true },
                { service: 'Frontend Development', desc: 'Responsive implementation with React and Tailwind CSS', hours: '40', rate: '$50/hr', sub: '$2,000.00', border: false },
              ].map((row) => (
                <div
                  key={row.service}
                  className={`grid px-6 shrink-0 ${row.border ? 'border-b border-gray-800/25' : ''}`}
                  style={{ gridTemplateColumns: 'minmax(0,510fr) minmax(0,80fr) minmax(0,80fr) minmax(0,1fr)', height: '74px', paddingTop: '16px', paddingBottom: '17px' }}
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[14px] text-white leading-[21px]">{row.service}</p>
                    <p className="text-[12px] text-text-disabled leading-[18px]">{row.desc}</p>
                  </div>
                  <p className="text-[14px] text-text-secondary leading-[21px] text-right">{row.hours}</p>
                  <p className="text-[14px] text-text-secondary leading-[21px] text-right">{row.rate}</p>
                  <p className="text-[14px] text-white leading-[21px] text-right">{row.sub}</p>
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
