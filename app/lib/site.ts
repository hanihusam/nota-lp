export const SITE = {
  url: 'https://nota.app',
  title: 'Nota — Proposals with e-signatures, for freelancers',
  description:
    'Write a polished proposal in minutes, send it as a link, and let your client sign it in the browser. Free forever; Pro adds the cloud.',
  repo: 'https://github.com/hanihusam/nota-lp',
  ogImageAlt:
    'Nota: “Send proposals. Get them signed.” beside the app, where a card shows Sarah Mitchell’s signature and “Signed PDF and audit trail saved”.',
} as const

/** Where every "Start free" and "Sign in" points. Set it once the app ships. */
export const APP_URL = '#get-started'

/** Placeholder until the Pro price is decided (docs/research/pricing-study.md). */
export const PRO_PRICE = {amount: '$8', period: 'per month, billed yearly'} as const

export const NAV_LINKS = [
  {label: 'Features', href: '#features'},
  {label: 'How it works', href: '#how-it-works'},
  {label: 'Pricing', href: '#pricing'},
  {label: 'FAQ', href: '#faq'},
] as const

export const FOOTER_COLUMNS = [
  {
    heading: 'Product',
    links: [
      {label: 'Features', href: '#features'},
      {label: 'How it works', href: '#how-it-works'},
      {label: 'Pricing', href: '#pricing'},
      {label: 'FAQ', href: '#faq'},
    ],
  },
  {
    heading: 'Resources',
    links: [
      {label: 'Support', href: 'mailto:support@nota.app'},
      {label: 'Privacy', href: '#'},
      {label: 'GitHub', href: SITE.repo},
    ],
  },
] as const
