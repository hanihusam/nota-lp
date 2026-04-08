import Button from './button'
import HeroMockup from './mockups/hero-mockup'

const Hero = () => {
  return (
    <section className="pt-32 flex flex-col gap-16 items-center">
      <div className="max-w-6xl mx-auto px-5 lg:px-0 w-full flex flex-col gap-8">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-4 w-146.25">
            <p className="text-caption text-text-accent">FOR FREELANCERS</p>
            <h1 className="text-display text-text-primary">
              send proposals, win clients
            </h1>
          </div>
          <p className="text-body text-text-secondary">
            A simple proposal builder designed for freelancers who'd rather do
            the work than write about it.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="secondary" size="lg" iconPosition="right">
            See How It Works
          </Button>
        </div>
      </div>
      <HeroMockup />
    </section>
  )
}

Hero.displayName = 'Hero'

export default Hero
