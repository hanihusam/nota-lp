const ExportMockup = () => {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-sage-500 to-sage-700 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Mobile App Redesign</h3>
            <p className="text-xs text-gray-500">PDF Export Preview</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            Cancel
          </button>
          <button className="px-3 py-1.5 text-sm text-white bg-sage-600 hover:bg-sage-700 rounded-md transition-colors">
            Download
          </button>
        </div>
      </div>

      <div className="p-8 bg-white">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-start justify-between pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-serif text-gray-900 mb-2">Sarah Mitchell</h1>
              <p className="text-gray-600">Mobile App Redesign Project</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Proposal Date</p>
              <p className="text-sm font-medium text-gray-900">December 10, 2024</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-serif text-gray-900 mb-3">Scope Briefing</h2>
              <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                <p>
                  Complete redesign of mobile application interface focusing on user experience improvements and modern design patterns.
                </p>
                <p>
                  The project includes comprehensive user research, wireframing, high-fidelity mockups, and interactive prototypes.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Project Breakdown</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">Discovery & Research</span>
                  <span className="text-sm font-medium text-gray-900">$2,500</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">UI Design & Prototyping</span>
                  <span className="text-sm font-medium text-gray-900">$5,000</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">Design System Development</span>
                  <span className="text-sm font-medium text-gray-900">$3,000</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">Implementation Support</span>
                  <span className="text-sm font-medium text-gray-900">$2,000</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t-2 border-gray-300">
                <span className="text-base font-semibold text-gray-900">Total Investment</span>
                <span className="text-xl font-bold text-sage-700">$12,500</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Timeline</p>
                <p className="text-sm font-semibold text-gray-900">8-10 weeks</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Start Date</p>
                <p className="text-sm font-semibold text-gray-900">Jan 2, 2025</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Completion</p>
                <p className="text-sm font-semibold text-gray-900">Mar 15, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-200 px-8 py-4">
        <p className="text-xs text-gray-500 text-center">
          This proposal is valid for 30 days from the date of issue
        </p>
      </div>
    </div>
  )
}

ExportMockup.displayName = 'ExportMockup'

export default ExportMockup
