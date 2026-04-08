import type { Route } from "./+types/home";
import Button from "~/components/button";
import Footer from "~/components/footer";
import Hero from "~/components/hero";
import Navbar from "~/components/navbar";
import TrustLine from "~/components/trust-line";
import ValueProps from "~/components/value-props";
import ProposalsMockup from "~/components/mockups/proposals-mockup";
import ClientsMockup from "~/components/mockups/clients-mockup";
import ExportMockup from "~/components/mockups/export-mockup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nota - Proposal Software for Modern Teams" },
    { name: "description", content: "Create beautiful proposals in minutes, deliver them instantly, and track every interaction. Nota makes it simple to win more clients." },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProps />

        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-heading-1 text-text-primary mb-6">Beautiful proposals in a few clicks</h2>
                <p className="text-body text-text-secondary mb-6">
                  Create stunning, professional proposals using our intuitive editor. Choose from expertly designed templates or build your own from scratch. Add your branding, images, and pricing tables with ease.
                </p>
                <ul className="space-y-3">
                  <li className="text-body text-text-secondary flex items-start">
                    <span className="text-text-accent mr-3">•</span>
                    <span>Drag-and-drop editor with rich formatting</span>
                  </li>
                  <li className="text-body text-text-secondary flex items-start">
                    <span className="text-text-accent mr-3">•</span>
                    <span>Professional templates to get started fast</span>
                  </li>
                  <li className="text-body text-text-secondary flex items-start">
                    <span className="text-text-accent mr-3">•</span>
                    <span>Custom branding and styling options</span>
                  </li>
                </ul>
              </div>
              <div>
                <ProposalsMockup />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <h2 className="text-heading-1 text-text-primary mb-6">Your clients, remembered</h2>
                <p className="text-body text-text-secondary mb-6">
                  Keep all your client information organized in one place. View proposal history, track communications, and access contact details whenever you need them. Build stronger relationships with complete context.
                </p>
                <ul className="space-y-3">
                  <li className="text-body text-text-secondary flex items-start">
                    <span className="text-text-accent mr-3">•</span>
                    <span>Centralized client database</span>
                  </li>
                  <li className="text-body text-text-secondary flex items-start">
                    <span className="text-text-accent mr-3">•</span>
                    <span>Complete proposal history per client</span>
                  </li>
                  <li className="text-body text-text-secondary flex items-start">
                    <span className="text-text-accent mr-3">•</span>
                    <span>Quick access to contact information</span>
                  </li>
                </ul>
              </div>
              <div className="md:order-1">
                <ClientsMockup />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-heading-1 text-text-primary mb-6">Export and share, your way</h2>
                <p className="text-body text-text-secondary mb-6">
                  Download proposals as PDF for offline sharing or archiving. Generate shareable links with password protection. Export to other formats when needed. Your proposals, your rules.
                </p>
                <ul className="space-y-3">
                  <li className="text-body text-text-secondary flex items-start">
                    <span className="text-text-accent mr-3">•</span>
                    <span>Professional PDF exports</span>
                  </li>
                  <li className="text-body text-text-secondary flex items-start">
                    <span className="text-text-accent mr-3">•</span>
                    <span>Secure shareable links</span>
                  </li>
                  <li className="text-body text-text-secondary flex items-start">
                    <span className="text-text-accent mr-3">•</span>
                    <span>Multiple export formats</span>
                  </li>
                </ul>
              </div>
              <div>
                <ExportMockup />
              </div>
            </div>
          </div>
        </section>

        <TrustLine />
        <section className="py-24 px-6 text-center">
          <h2 className="text-heading-1 text-text-primary mb-6">Simplify proposals now</h2>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <p className="text-body-sm text-text-secondary mt-4">
            Free plan. No credit card required.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
