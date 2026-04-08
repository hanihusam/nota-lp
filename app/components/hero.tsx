import Button from './button'
import HeroMockup from './mockups/hero-mockup'

const Hero = () => {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-[585px] mb-12">
          <div className="mb-6">
            <p className="text-caption text-text-accent mb-4">
              FOR FREELANCERS
            </p>
            <h1 className="text-display text-text-primary mb-6">
              send proposals, win clients
            </h1>
          </div>
          <p className="text-body text-text-secondary mb-8">
            A simple proposal builder designed for freelancers who'd rather do the work than write about it.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="ghost" size="lg" iconPosition="right">
              See How It Works
            </Button>
          </div>
        </div>
        <HeroMockup />
      </div>
    </section>
  )
}

Hero.displayName = 'Hero'

export default Hero
