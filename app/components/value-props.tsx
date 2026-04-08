const ValueProps = () => {
  const values = [
    { icon: '✉️', label: 'Email Integration' },
    { icon: '📝', label: 'Beautiful Proposals' },
    { icon: '📱', label: 'Mobile-Friendly' },
    { icon: '📊', label: 'Pipeline Management' },
    { icon: '📈', label: 'Analytics & Insights' },
    { icon: '🤝', label: 'Team Collaboration' },
  ]

  return (
    <section className="py-12 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="text-[30px] mb-2">{value.icon}</div>
              <p className="text-caption uppercase text-text-secondary">
                {value.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

ValueProps.displayName = 'ValueProps'

export default ValueProps
