const ROLES = [
  'Designers',
  'Developers',
  'Writers',
  'Consultants',
  'Photographers',
  'Small studios',
] as const

/**
 * Figma: Landing → Audience. Who Nota is for, in the serif, instead of
 * customer logos we don't have. A static row from lg; below that a marquee
 * (40s linear, pauses on hover, edges faded with a mask). Reduced motion
 * wraps the roles instead of moving them.
 */
export const Audience = () => (
  <section aria-labelledby="audience-title" className="py-16 lg:pt-20 lg:pb-24">
    <h2 id="audience-title" className="container-page text-center text-caption text-text-tertiary">
      Made for people who sell their own time
    </h2>

    <ul className="container-page mt-6 hidden items-center justify-center gap-12 lg:flex">
      {ROLES.map(role => (
        <li key={role} className="text-heading-2 text-text-secondary">
          {role}
        </li>
      ))}
    </ul>

    <div className="mt-5 overflow-hidden mask-x-from-85% mask-x-to-100% lg:hidden motion-reduce:hidden">
      <ul className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {[...ROLES, ...ROLES].map((role, i) => (
          <li
            key={i}
            aria-hidden={i >= ROLES.length || undefined}
            className="text-heading-2 whitespace-nowrap text-text-secondary"
          >
            {role}
          </li>
        ))}
      </ul>
    </div>
    <ul className="container-page mt-5 hidden flex-wrap justify-center gap-x-6 gap-y-2 motion-reduce:flex lg:motion-reduce:hidden">
      {ROLES.map(role => (
        <li key={role} className="text-heading-2 text-text-secondary">
          {role}
        </li>
      ))}
    </ul>
  </section>
)

Audience.displayName = 'Audience'
