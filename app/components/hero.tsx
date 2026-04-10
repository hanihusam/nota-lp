import Button from './button'
import HeroMockup from './mockups/hero-mockup'

const Hero = () => {
  return (
    <section className="pt-24 lg:pt-32 flex flex-col gap-16 items-center">
      <div className="max-w-6xl mx-auto px-5 lg:px-0 w-full flex flex-col gap-8">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-4 max-w-full lg:max-w-146.25">
            <p className="text-caption text-text-accent">FOR FREELANCERS</p>
            <h1 className="text-display-1 text-text-primary">
              send proposals, win clients
            </h1>
          </div>
          <p className="text-body text-text-secondary">
            A simple proposal builder designed for freelancers who'd rather do
            the work than write about it.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <Button
            variant="primary"
            size="lg"
            className="justify-center lg:justify-start"
          >
            Get Started
          </Button>
          <Button
            variant="secondary"
            size="lg"
            iconPosition="right"
            className="justify-center lg:justify-start"
          >
            See How It Works
          </Button>
        </div>
      </div>

      {/* Desktop: full interactive mockup */}
      <div className="hidden lg:flex w-full items-center justify-center">
        <HeroMockup />
      </div>

      {/* Mobile: scaled peek — sidebar visible, frame overflows to the right */}
      <div
        className="lg:hidden relative w-full overflow-hidden"
        style={{height: '370px'}}
      >
        <div
          className="absolute top-0"
          style={{
            left: '-50px',
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
          }}
        >
          <HeroMockup />
        </div>
      </div>
    </section>
  )
}

Hero.displayName = 'Hero'

export default Hero
