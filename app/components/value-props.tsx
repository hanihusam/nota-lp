const items = [
  'works offline',
  'create in minutes',
  'branded PDF export',
  'auto tax calculation',
  'client auto-fill',
  'no subscriptions',
]

const ValueProps = () => {
  const track = [...items, ...items]

  return (
    <section className="py-16 lg:py-24 w-full">
      {/* Mobile: scrolling marquee */}
      <div className="lg:hidden overflow-hidden">
        <div className="flex items-center animate-marquee hover:[animation-play-state:paused]">
          {track.map((item, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0">
              <p className="text-caption text-text-secondary whitespace-nowrap pl-6">{item}</p>
              <div className="w-px h-4 bg-border shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: static centered strip */}
      <div className="hidden lg:flex items-center justify-center gap-6">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-6">
            <p className="text-caption text-text-secondary whitespace-nowrap">{item}</p>
            {i < items.length - 1 && <div className="w-px h-4 bg-border shrink-0" />}
          </div>
        ))}
      </div>
    </section>
  )
}

ValueProps.displayName = 'ValueProps'

export default ValueProps
