const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto px-5 lg:px-0 flex flex-col gap-8 py-8">
      <div className="h-px w-full bg-border" />
      <div className="flex items-center justify-between text-caption text-text-tertiary">
        <div className="flex items-center gap-1">
          <span>© 2026</span>
          <span className="font-serif italic">nota</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="[@media(hover:hover)]:hover:text-text-secondary transition-colors motion-reduce:transition-none">Privacy</a>
          <a href="#" className="[@media(hover:hover)]:hover:text-text-secondary transition-colors motion-reduce:transition-none">Support</a>
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
