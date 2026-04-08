function IconLink() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}
function IconDownload() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

const ExportMockup = () => {
  return (
    // 620px card at left-0 inside 576px container — overflows 44px to the right.
    // Card has overflow-hidden: the body's 660px left panel is clipped to 620px.
    // The Export Settings sidebar (starts at x=660) is not visible.
    <div
      className="absolute left-0 top-0 bg-page border border-border rounded-xl overflow-hidden p-px"
      style={{
        width: '620px',
        height: '515px',
        boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.4), 0px 24px 80px 0px rgba(107,143,113,0.1)',
      }}
    >
      {/* Header: breadcrumb + action buttons (52px) */}
      <div className="border-b border-gray-800/30 flex items-center justify-between px-6 shrink-0" style={{ height: '52px' }}>
        <div className="flex items-center gap-2 text-[13px] leading-[19.5px]">
          <span className="text-text-tertiary">Proposals</span>
          <span className="text-border-strong text-[13px]">/</span>
          <span className="text-text-tertiary">Website Redesign</span>
          <span className="text-border-strong text-[13px]">/</span>
          <span className="text-white font-medium">Export</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 border border-border-strong text-white text-[13px] font-medium leading-[19.5px] px-3 rounded-lg cursor-pointer hover:bg-surface transition-colors"
            style={{ height: '33.5px' }}
          >
            <IconLink /> Copy share link
          </button>
          <button
            className="flex items-center gap-1.5 bg-btn-primary hover:bg-btn-primary-hover text-white text-[13px] font-medium leading-[19.5px] px-4 rounded-lg cursor-pointer transition-colors"
            style={{ height: '31.5px' }}
          >
            <IconDownload /> Download PDF
          </button>
        </div>
      </div>

      {/* Body — 660px left panel (clips to 620px), Export Settings hidden beyond x=660 */}
      <div className="overflow-hidden" style={{ height: '461px' }}>
        {/* Left panel: 660px wide, dark bg, white paper centered */}
        <div
          className="bg-page flex justify-center overflow-hidden shrink-0"
          style={{ width: '660px', height: '461px', paddingTop: '40px' }}
        >
          {/* White PDF paper: 595px wide, 986px tall (only ~421px visible) */}
          <div
            className="bg-white shrink-0 overflow-hidden"
            style={{
              width: '595px',
              height: '986px',
              borderRadius: '4px',
              boxShadow: '0px 24px 80px 0px rgba(0,0,0,0.4), 0px 8px 24px 0px rgba(0,0,0,0.3)',
            }}
          >
            {/* PDF content — uses absolute positioning matching Figma */}
            <div className="relative size-full">

              {/* Header row: nota logo + proposal info */}
              <div className="absolute flex items-start justify-between" style={{ left: '40px', top: '40px', width: '515px' }}>
                <p className="font-serif italic text-[18px] text-gray-950 leading-[27px]">nota</p>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase tracking-[1.2px] leading-[15px]">Proposal</p>
                  <p className="text-[11px] text-gray-500 leading-[16.5px]">PRO-2026-041</p>
                  <p className="text-[11px] text-gray-500 leading-[16.5px]">March 8, 2026</p>
                </div>
              </div>

              {/* Sage accent line */}
              <div className="absolute bg-btn-primary" style={{ left: '40px', top: '132px', width: '48px', height: '2px' }} />

              {/* Recipient section */}
              <div className="absolute" style={{ left: '40px', top: '166px', width: '515px' }}>
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.9px] leading-[13.5px] mb-[8px]">Prepared for</p>
                <p className="font-serif text-[26px] text-gray-950 leading-[31.2px] mb-[4px]">Sarah Mitchell</p>
                <p className="text-[12px] text-gray-500 leading-[18px]">Mitchell Design Co. · mitchell.design@email.com</p>
              </div>

              {/* Project section */}
              <div className="absolute flex flex-col gap-2" style={{ left: '40px', top: '272.7px', width: '515px' }}>
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.9px] leading-[13.5px]">Project</p>
                <p className="font-serif text-[20px] text-gray-950 leading-[30px]">Website Redesign</p>
                <p className="text-[11px] text-gray-500 leading-[18.7px]">
                  Complete redesign of the existing marketing website, including new visual identity, improved user experience, and responsive frontend development.
                </p>
              </div>

              {/* Line items table */}
              <div className="absolute" style={{ left: '40px', top: '401.59px', width: '515px' }}>
                {/* Column headers */}
                <div
                  className="grid border-b border-gray-200"
                  style={{ gridTemplateColumns: 'minmax(0,335fr) minmax(0,50fr) minmax(0,60fr) minmax(0,1fr)', paddingTop: '10px', paddingBottom: '11px' }}
                >
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.72px] leading-[13.5px]">Service</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.72px] leading-[13.5px] text-right">Hours</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.72px] leading-[13.5px] text-right">Rate</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.72px] leading-[13.5px] text-right">Subtotal</p>
                </div>

                {/* Row 1: Discovery & Research */}
                <div
                  className="grid border-b border-gray-100"
                  style={{ gridTemplateColumns: 'minmax(0,335fr) minmax(0,50fr) minmax(0,60fr) minmax(0,1fr)', paddingTop: '12px', paddingBottom: '13px' }}
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[12px] font-medium text-gray-950 leading-[18px]">Discovery &amp; Research</p>
                    <p className="text-[10px] text-gray-400 leading-[15px]">User interviews, competitive analysis, and requirements gathering</p>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-[18px] text-right">15</p>
                  <p className="text-[12px] text-gray-500 leading-[18px] text-right">$50/hr</p>
                  <p className="text-[12px] font-medium text-gray-950 leading-[18px] text-right">$750.00</p>
                </div>

                {/* Row 2: UI Design */}
                <div
                  className="grid border-b border-gray-100"
                  style={{ gridTemplateColumns: 'minmax(0,335fr) minmax(0,50fr) minmax(0,60fr) minmax(0,1fr)', paddingTop: '12px', paddingBottom: '13px' }}
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[12px] font-medium text-gray-950 leading-[18px]">UI Design</p>
                    <p className="text-[10px] text-gray-400 leading-[15px]">Wireframes, high-fidelity mockups, and interactive prototypes</p>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-[18px] text-right">30</p>
                  <p className="text-[12px] text-gray-500 leading-[18px] text-right">$50/hr</p>
                  <p className="text-[12px] font-medium text-gray-950 leading-[18px] text-right">$1,500.00</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ExportMockup.displayName = 'ExportMockup'

export default ExportMockup
