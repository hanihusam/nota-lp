function IconMore() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
    </svg>
  )
}
function IconPencil() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function IconHash() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

const ProposalsMockup = () => {
  return (
    // 620px card positioned to overflow 44px beyond the 576px right column
    <div
      className="absolute right-0 top-0 bg-page border border-border rounded-xl overflow-hidden pt-6 px-6 flex flex-col gap-5"
      style={{
        width: '620px',
        height: '515px',
        boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.4), 0px 24px 80px 0px rgba(107,143,113,0.1)',
      }}
    >
      {/* Client info card */}
      <div className="bg-surface border border-gray-800/40 rounded-xl shrink-0 flex flex-col gap-5 pt-6 px-6 pb-px">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] text-text-disabled uppercase tracking-[0.05em] leading-[18px]">Proposal For</p>
            <p className="font-serif text-[28px] text-white leading-[33.6px]">John Cogil</p>
            <p className="text-[14px] text-text-tertiary leading-[21px]">john.co@email.com</p>
          </div>
          <button className="p-2 text-text-disabled hover:text-text-secondary hover:bg-surface-secondary rounded-lg cursor-pointer transition-colors">
            <IconMore />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-6">
          {[
            { icon: <IconHash />, label: 'Proposal', value: 'PRO-2026-050' },
            { icon: <IconCalendar />, label: 'Date', value: 'Mar 10, 2026' },
            { icon: <IconCalendar />, label: 'Valid Until', value: 'Apr 8, 2026' },
          ].map((item) => (
            <div key={item.label} className="bg-gray-800/40 rounded-lg pl-3 flex items-center gap-3 h-14">
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
      <div className="bg-surface border border-gray-800/40 rounded-xl shrink-0 p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-text-disabled uppercase tracking-[0.05em] leading-[18px]">Project</p>
          <button className="flex items-center gap-1 text-[12px] text-text-disabled leading-[18px] hover:text-text-secondary cursor-pointer transition-colors">
            <IconPencil /> Edit
          </button>
        </div>
        <p className="font-serif text-[22px] text-white leading-[33px]">Website Redesign</p>
        <p className="text-[14px] text-text-tertiary leading-[22.4px]">
          Complete redesign of the existing marketing website, including new visual identity implementation, improved user experience, and responsive frontend development using modern technologies.
        </p>
      </div>

      {/* Line items card — header only visible at the bottom */}
      <div className="bg-surface border border-gray-800/40 rounded-xl shrink-0 overflow-clip p-px">
        <div className="flex items-center justify-between border-b border-gray-800/40 px-6" style={{ height: '52.5px' }}>
          <p className="text-[12px] text-text-disabled uppercase tracking-[0.05em] leading-[18px]">Line Items</p>
          <button className="text-[13px] text-btn-primary font-medium leading-[19.5px] hover:text-sage-300 cursor-pointer transition-colors">
            + Add Item
          </button>
        </div>
      </div>
    </div>
  )
}

ProposalsMockup.displayName = 'ProposalsMockup'

export default ProposalsMockup
