import { useState, useEffect } from 'react'

import Button from './button'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'backdrop-blur-md bg-page/80' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[20px] font-serif text-text-primary leading-[30px]">nota</span>
          <div className="w-px h-5 bg-border rotate-90"></div>
          <span className="text-caption text-text-tertiary">Simple proposals</span>
        </div>
        <Button variant="ghost">
          Get Started
        </Button>
      </div>
    </nav>
  )
}

Navbar.displayName = 'Navbar'

export default Navbar
