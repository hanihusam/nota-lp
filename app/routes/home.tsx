import type {Route} from './+types/home'
import Button from '~/components/button'
import Footer from '~/components/footer'
import Hero from '~/components/hero'
import Navbar from '~/components/navbar'
import TrustLine from '~/components/trust-line'
import ValueProps from '~/components/value-props'
import ProposalsMockup from '~/components/mockups/proposals-mockup'
import ClientsMockup from '~/components/mockups/clients-mockup'
import ExportMockup from '~/components/mockups/export-mockup'

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Nota - Proposal Software for Modern Teams'},
    {
      name: 'description',
      content:
        'Create beautiful proposals in minutes, deliver them instantly, and track every interaction. Nota makes it simple to win more clients.',
    },
  ]
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <ValueProps />

        {/* Features section — matches Figma node 46:751 (h=1746px):
            gap-32 (128px) between the three feature rows,
            pb-32 (128px) at the bottom of the container.
            Feature 1 has pb-24 only (no top padding, starts flush).
            Features 2 & 3 have py-24 (96px top + bottom). */}
        <section>
          <div className="max-w-6xl mx-auto px-5 lg:px-0 flex flex-col gap-20 lg:gap-32 pb-20 lg:pb-32">
            {/* Feature 1 — mockup above on mobile, text left / image right on desktop */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0 lg:pb-24">
              {/* Mockup: first on mobile (order-1), second on desktop (lg:order-2) */}
              <div className="order-1 lg:order-2 relative w-full h-72 overflow-hidden rounded-xl border border-border lg:w-xl lg:h-73.5 lg:overflow-visible lg:rounded-none lg:border-0 lg:shrink-0">
                <div
                  className="absolute scale-[0.56] origin-top-right lg:scale-100"
                  style={{width: '620px', height: '515px', right: 0, top: 0}}
                >
                  <ProposalsMockup />
                </div>
              </div>
              {/* Text: second on mobile (order-2), first on desktop (lg:order-1) */}
              <div className="order-2 lg:order-1 flex flex-col gap-6 w-full lg:w-110 lg:shrink-0">
                <div className="flex flex-col gap-4">
                  <p className="text-caption text-text-accent">
                    PROPOSAL EDITOR
                  </p>
                  <h2 className="text-heading-1 text-text-primary">
                    Beautiful proposals in a few clicks
                  </h2>
                  <p className="text-body text-text-secondary">
                    Create proposals with pre-built blocks. Client info
                    auto-populates and calculations update in real-time.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    'Drag and drop proposal blocks',
                    'Live preview as you type',
                    'Automatic subtotals and tax',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="size-5 shrink-0 flex items-center justify-center">
                        <div className="size-1.5 rounded-full bg-sage-400" />
                      </div>
                      <span className="text-body-sm text-text-secondary">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 2 — mockup above on mobile (natural DOM order), image left / text right on desktop */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0 lg:py-24">
              <div className="relative w-full h-72 overflow-hidden rounded-xl border border-border lg:w-xl lg:h-73.5 lg:overflow-visible lg:rounded-none lg:border-0 lg:shrink-0">
                <div
                  className="absolute scale-[0.7] origin-top-left lg:scale-100"
                  style={{width: '620px', height: '515px', left: 0, top: 0}}
                >
                  <ClientsMockup />
                </div>
                {/* Right fade — masks the abrupt detail-panel edge */}
                <div className="lg:hidden absolute inset-y-0 right-0 w-20 bg-linear-to-l from-page to-transparent pointer-events-none z-10 rounded-r-xl" />
              </div>
              <div className="flex flex-col gap-6 w-full lg:w-110 lg:shrink-0">
                <div className="flex flex-col gap-4">
                  <p className="text-caption text-text-accent">
                    CLIENT MANAGEMENT
                  </p>
                  <h2 className="text-heading-1 text-text-primary">
                    Your clients, remembered
                  </h2>
                  <p className="text-body text-text-secondary">
                    Save client details once. Payment terms, rates, and
                    addresses auto-fill every time you start a new proposal.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    'Saved client profiles',
                    'Auto-fill on new proposals',
                    'Track revenue per client',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="size-5 shrink-0 flex items-center justify-center">
                        <div className="size-1.5 rounded-full bg-sage-400" />
                      </div>
                      <span className="text-body-sm text-text-secondary">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3 — mockup above on mobile, text left / image right on desktop */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0 lg:py-24">
              {/* Mockup mobile: centered so scaled content fills edge-to-edge */}
              <div className="lg:hidden relative w-full h-72 overflow-hidden rounded-xl border border-border">
                <div
                  className="absolute top-0"
                  style={{
                    width: '620px',
                    height: '515px',
                    left: '50%',
                    transform: 'translateX(-50%) scale(0.56)',
                    transformOrigin: 'top center',
                  }}
                >
                  <ExportMockup />
                </div>
              </div>
              {/* Mockup desktop: second flex item, overflows right */}
              <div className="hidden lg:block relative lg:order-2 lg:w-xl lg:h-73.5 lg:overflow-visible lg:shrink-0">
                <div
                  className="absolute"
                  style={{width: '620px', height: '515px', right: 0, top: 0}}
                >
                  <ExportMockup />
                </div>
              </div>
              {/* Text: natural order on mobile (after mockup), order-1 on desktop */}
              <div className="lg:order-1 flex flex-col gap-6 w-full lg:w-110 lg:shrink-0">
                <div className="flex flex-col gap-4">
                  <p className="text-caption text-text-accent">
                    EXPORT & SHARE
                  </p>
                  <h2 className="text-heading-1 text-text-primary">
                    Export and share, your way
                  </h2>
                  <p className="text-body text-text-secondary">
                    Generate branded PDFs with your colors and logo. Or share a
                    live link and let clients view the proposal online.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    'Customizable PDF branding',
                    'Shareable proposal links',
                    'Toggle sections on or off',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="size-5 shrink-0 flex items-center justify-center">
                        <div className="size-1.5 rounded-full bg-sage-400" />
                      </div>
                      <span className="text-body-sm text-text-secondary">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <TrustLine />

        {/* Bottom CTA — Figma node 55:59 */}
        <section className="py-20 lg:py-32 px-5 lg:px-0 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-heading-1 text-text-primary text-center">
              Simplify proposals now
            </h2>
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </div>
          <p className="text-caption text-text-tertiary text-center">
            Free to use. No account required.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
