const ProposalsMockup = () => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl p-6 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors group cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-sage-500 to-sage-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-sage-400 bg-sage-900 rounded">Draft</span>
          </div>
          <h3 className="text-base font-serif text-white mb-2 group-hover:text-sage-400 transition-colors">Mobile App Redesign</h3>
          <p className="text-sm text-gray-400 mb-4">Sarah Mitchell</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">$12,500</span>
            <span className="text-gray-600">Dec 15</span>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors group cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-green-400 bg-green-900 rounded">Sent</span>
          </div>
          <h3 className="text-base font-serif text-white mb-2 group-hover:text-sage-400 transition-colors">Brand Identity</h3>
          <p className="text-sm text-gray-400 mb-4">Emma Davis</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">$8,200</span>
            <span className="text-gray-600">Dec 10</span>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors group cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-yellow-400 bg-yellow-900 rounded">Review</span>
          </div>
          <h3 className="text-base font-serif text-white mb-2 group-hover:text-sage-400 transition-colors">Marketing Campaign</h3>
          <p className="text-sm text-gray-400 mb-4">James Wilson</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">$15,000</span>
            <span className="text-gray-600">Dec 20</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors group cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-green-400 bg-green-900 rounded">Won</span>
          </div>
          <h3 className="text-base font-serif text-white mb-2 group-hover:text-sage-400 transition-colors">Website Redesign</h3>
          <p className="text-sm text-gray-400 mb-4">Olivia Taylor</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">$9,800</span>
            <span className="text-gray-600">Dec 5</span>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors group cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="px-2 py-1 text-xs font-semibold text-sage-400 bg-sage-900 rounded">Draft</span>
          </div>
          <h3 className="text-base font-serif text-white mb-2 group-hover:text-sage-400 transition-colors">E-commerce Platform</h3>
          <p className="text-sm text-gray-400 mb-4">Michael Brown</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">$22,000</span>
            <span className="text-gray-600">Jan 8</span>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors group cursor-pointer opacity-50">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <h3 className="text-base font-serif text-gray-500 mb-2">New Proposal</h3>
          <p className="text-sm text-gray-600 mb-4">Start from scratch</p>
        </div>
      </div>
    </div>
  )
}

ProposalsMockup.displayName = 'ProposalsMockup'

export default ProposalsMockup
