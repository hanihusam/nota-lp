function IconMail() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
function IconFileText() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}
function IconDollar() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
function IconPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function IconBuilding() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="12" /><line x1="15" y1="22" x2="15" y2="12" />
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  )
}
function IconMapPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function IconPlus() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

interface ClientCard {
  initials: string
  color: string
  name: string
  company: string
  email: string
  proposals: number
  revenue: string
  active?: boolean
}

const clients: ClientCard[] = [
  { initials: 'SM', color: '#6b8f71', name: 'Sarah Mitchell', company: 'Mitchell Design Co.', email: 'mitchell.design@email.com', proposals: 5, revenue: '$12,400', active: true },
  { initials: 'AT', color: '#7c6baf', name: 'Alex Turner', company: 'Turner & Associates', email: 'alex@turnerassoc.com', proposals: 3, revenue: '$18,600' },
  { initials: 'JL', color: '#8f6b6b', name: 'Jordan Lee', company: 'Horizon Digital', email: 'jordan@horizondigital.io', proposals: 7, revenue: '$34,200' },
  { initials: 'EC', color: '#6b7e8f', name: 'Emily Chen', company: 'Chen Ventures', email: 'emily@chenventures.com', proposals: 2, revenue: '$8,200' },
  { initials: 'MW', color: '#8f8a6b', name: 'Marcus Webb', company: 'Webb Creative Agency', email: 'marcus@webbcreative.co', proposals: 4, revenue: '$15,750' },
  { initials: 'OP', color: '#6b8f88', name: 'Olivia Park', company: 'Park & Bloom Studio', email: 'olivia@parkbloom.com', proposals: 1, revenue: '$1,500' },
]

function ClientCardItem({ client }: { client: ClientCard }) {
  return (
    <div className={`bg-surface border border-gray-800/40 rounded-xl overflow-hidden p-px flex cursor-pointer hover:border-gray-700 transition-colors ${client.active ? 'shadow-[0_0_0_1px_rgba(107,143,113,0.3)]' : ''}`}>
      {client.active && <div className="w-[3px] shrink-0 bg-btn-primary rounded-l-xl" />}
      <div className="flex-1 px-5 pt-5" style={{ height: '157px' }}>
        {/* Name + company */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="size-10 rounded-full flex items-center justify-center text-[14px] font-medium text-white shrink-0" style={{ backgroundColor: client.color }}>
            {client.initials}
          </div>
          <div>
            <p className="text-[14px] font-medium text-white leading-[21px]">{client.name}</p>
            <p className="text-[12px] font-medium text-text-tertiary leading-[18px]">{client.company}</p>
          </div>
        </div>
        {/* Email */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-text-disabled"><IconMail /></span>
          <span className="text-[12px] font-medium text-text-tertiary leading-[18px]">{client.email}</span>
        </div>
        {/* Stats */}
        <div className="flex items-center gap-4 border-t border-gray-800/40 pt-px">
          <div className="flex items-center gap-1.5">
            <span className="text-text-disabled"><IconFileText /></span>
            <span className="text-[11px] font-medium text-text-disabled leading-[16.5px]">Proposals</span>
            <span className="text-[12px] font-medium text-text-secondary leading-[18px]">{client.proposals}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-text-disabled"><IconDollar /></span>
            <span className="text-[11px] font-medium text-text-disabled leading-[16.5px]">Revenue</span>
            <span className="text-[12px] font-medium text-text-secondary leading-[18px]">{client.revenue}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const ClientsMockup = () => {
  return (
    // 620px card at left-0 inside 576px container — card overflows 44px to the right
    <div
      className="absolute left-0 top-0 bg-page border border-border rounded-xl overflow-hidden"
      style={{
        width: '620px',
        height: '515px',
        boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.4), 0px 24px 80px 0px rgba(107,143,113,0.1)',
      }}
    >
      {/* ── Clients grid — offset left-[-484px]: only right column (AT, EC rows) visible ── */}
      <div
        className="absolute top-[-1px] bg-page overflow-clip"
        style={{ left: '-484px', width: '981px', height: '930px' }}
      >
        {/* Header */}
        <div className="absolute flex items-center justify-between" style={{ left: '32px', top: '32px', width: '917px', height: '35.5px' }}>
          <div className="flex items-center gap-3">
            <p className="font-serif text-[28px] text-white leading-[33.6px]">Clients</p>
            <span className="bg-gray-800 text-text-secondary text-[12px] leading-[18px] px-2.5 py-1 rounded-lg">6 clients</span>
          </div>
          <button className="flex items-center gap-2 bg-btn-primary hover:bg-btn-primary-hover text-white text-[13px] font-medium leading-[19.5px] px-4 rounded-lg cursor-pointer transition-colors" style={{ height: '35.5px' }}>
            <IconPlus /> Add Client
          </button>
        </div>

        {/* Search */}
        <div
          className="absolute flex items-center gap-2.5 bg-surface border border-gray-800 rounded-lg px-4"
          style={{ left: '32px', top: '91.5px', width: '400px', height: '41.5px' }}
        >
          <span className="text-text-disabled"><IconSearch /></span>
          <span className="text-[13px] text-text-disabled leading-normal">Search by name or company...</span>
        </div>

        {/* 2-column client card grid */}
        <div
          className="absolute grid gap-4"
          style={{ left: '32px', top: '157px', width: '917px', gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}
        >
          {clients.map((c) => (
            <ClientCardItem key={c.initials} client={c} />
          ))}
        </div>
      </div>

      {/* ── Aside detail panel — left-[497px]: 123px visible within the 620px card ── */}
      <div
        className="absolute top-0 bg-surface border-l border-gray-800/50 overflow-clip"
        style={{ left: '497px', width: '360px', height: '515px' }}
      >
        <div className="px-6 pt-6 flex flex-col gap-5">
          {/* Client header */}
          <div className="flex items-center gap-3.5">
            <div className="size-12 rounded-full bg-btn-primary flex items-center justify-center text-[16px] font-medium text-white shrink-0">SM</div>
            <div>
              <p className="font-serif text-[20px] text-white leading-[26px]">Sarah Mitchell</p>
              <p className="text-[13px] text-text-tertiary leading-[19.5px]">Mitchell Design Co.</p>
            </div>
          </div>

          {/* Contact fields */}
          <div className="flex flex-col gap-3">
            {[
              { icon: <IconMail />, label: 'Email', value: 'mitchell.design@email.com' },
              { icon: <IconPhone />, label: 'Phone', value: '+1 (503) 555-0142' },
              { icon: <IconBuilding />, label: 'Company', value: 'Mitchell Design Co.' },
              { icon: <IconMapPin />, label: 'Address', value: '142 Design Ave, Portland OR' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-6">
                <span className="text-text-disabled mt-0.5 shrink-0">{item.icon}</span>
                <div>
                  <p className="text-[11px] text-text-disabled leading-[16.5px]">{item.label}</p>
                  <p className="text-[13px] text-white leading-[19.5px]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-800 mt-6" />

        {/* Auto-fill settings */}
        <div className="px-6 pt-6 flex flex-col gap-4">
          <p className="text-[11px] text-text-disabled uppercase tracking-[0.06em] leading-[16.5px]">Auto-fill Settings</p>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Payment Terms', value: 'Net 30' },
              { label: 'Currency', value: 'USD' },
              { label: 'Default Rate', value: '$50/hr' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-800/30 rounded-lg px-3 flex items-center justify-between" style={{ height: '35.5px' }}>
                <span className="text-[12px] text-text-disabled leading-[18px]">{item.label}</span>
                <span className="text-[13px] text-white leading-[19.5px]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

ClientsMockup.displayName = 'ClientsMockup'

export default ClientsMockup
