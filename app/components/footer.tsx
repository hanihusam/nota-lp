import {FOOTER_COLUMNS} from '~/lib/site'

/** Figma: 02 — Components → Footer / Desktop. */
export const Footer = () => (
  <footer className="container-page">
    <div className="flex flex-col gap-10 border-t border-border-subtle pt-12 pb-10 lg:gap-12 lg:pt-16">
      <div className="flex flex-col justify-between gap-10 sm:flex-row">
        <div className="flex flex-col gap-3">
          <a
            href="#top"
            className="self-start font-serif text-[24px] leading-none tracking-[-0.02em] text-text-primary"
          >
            nota
          </a>
          <p className="max-w-60 text-paragraph text-text-tertiary">
            Simple proposals for freelancers who’d rather be working.
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-16 lg:gap-24">
          {FOOTER_COLUMNS.map(column => (
            <div key={column.heading} className="flex flex-col gap-3">
              <h2 className="text-caption text-text-primary">{column.heading}</h2>
              <ul className="flex flex-col gap-3">
                {column.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-paragraph text-text-tertiary transition-colors duration-(--duration-fast) hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="flex items-center justify-between text-caption">
        <p className="text-text-tertiary">© 2026 nota</p>
        <p className="text-text-disabled">Made for freelancers</p>
      </div>
    </div>
  </footer>
)

Footer.displayName = 'Footer'
