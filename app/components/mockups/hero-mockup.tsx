const HeroMockup = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] -z-10">
        <div className="w-full h-full bg-sage-500 rounded-full blur-[150px] opacity-50"></div>
      </div>
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden" style={{ boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)' }}>
        <div className="border-b border-gray-800 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-base font-serif italic text-white">nota</span>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-sm text-white hover:bg-gray-800 rounded-md transition-colors border-b-2 border-sage-500">
                Proposals
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 rounded-md transition-colors">
                Clients
              </button>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white">Mobile App Redesign</span>
              <span className="px-2 py-0.5 text-xs text-sage-400 bg-sage-900 rounded">Draft</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm text-icon-primary hover:bg-gray-800 rounded-md transition-colors flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>
            <button className="px-3 py-2 text-sm text-icon-primary hover:bg-gray-800 rounded-md transition-colors flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </button>
            <button className="px-3 py-2 text-sm text-white bg-sage-600 hover:bg-sage-700 rounded-md transition-colors flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send
            </button>
            <div className="w-7 h-7 bg-sage-700 rounded-full flex items-center justify-center text-xs text-white font-semibold">
              JD
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-60 border-r border-gray-800 bg-gray-900/50 p-3">
            <div className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search proposals..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-500"
                  readOnly
                />
                <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="w-full bg-sage-600 hover:bg-sage-700 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Proposal
            </button>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider px-2 mb-2">Recent Proposals</p>
              <button className="w-full text-left px-2 py-2 rounded-lg bg-gray-800 text-white text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Sarah Mitchell</span>
                </div>
                <p className="text-xs text-gray-400 truncate">Mobile App Redesign • $12,500</p>
              </button>
              <button className="w-full text-left px-2 py-2 rounded-lg hover:bg-gray-800 text-gray-400 text-sm transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Emma Davis</span>
                </div>
                <p className="text-xs text-gray-500 truncate">Brand Identity • $8,200</p>
              </button>
              <button className="w-full text-left px-2 py-2 rounded-lg hover:bg-gray-800 text-gray-400 text-sm transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>James Wilson</span>
                </div>
                <p className="text-xs text-gray-500 truncate">Marketing Campaign • $15,000</p>
              </button>
              <button className="w-full text-left px-2 py-2 rounded-lg hover:bg-gray-800 text-gray-400 text-sm transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Olivia Taylor</span>
                </div>
                <p className="text-xs text-gray-500 truncate">Website Redesign • $9,800</p>
              </button>
            </div>
          </div>
          <div className="flex-1 p-6 bg-gray-950/50 space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
              <h3 className="text-lg font-serif text-white mb-2">Sarah Mitchell</h3>
              <p className="text-sm text-gray-400 mb-4">Mobile App Redesign Project</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Client Email</p>
                  <p className="text-gray-300">sarah@example.com</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Total Value</p>
                  <p className="text-gray-300">$12,500</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Due Date</p>
                  <p className="text-gray-300">Dec 15, 2024</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
              <h3 className="text-base font-serif text-white mb-3">Scope Briefing</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Complete redesign of mobile application interface focusing on user experience improvements and modern design patterns...
              </p>
              <button className="text-sm text-sage-400 hover:text-sage-300 font-medium">Read more →</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white">Discovery & Research</h4>
                  <span className="text-xs text-gray-500">$2,500</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-sage-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white">UI Design</h4>
                  <span className="text-xs text-gray-500">$5,000</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-sage-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

HeroMockup.displayName = 'HeroMockup'

export default HeroMockup
