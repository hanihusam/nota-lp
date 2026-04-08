const items = [
  'works offline',
  'create in minutes',
  'branded PDF export',
  'auto tax calculation',
  'client auto-fill',
  'no subscriptions',
]

const ValueProps = () => {
  return (
    <section className="py-24 w-full flex items-center justify-center">
      <div className="flex items-center gap-6">
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
