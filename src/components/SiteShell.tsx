import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Bookmark, ChevronDown, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { categories } from '../data/articles'

type HeaderProps = {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  savedCount: number
}

export function Header({ theme, onThemeToggle, savedCount }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-topline"><span>AN INDEPENDENT JOURNAL FOR WHAT'S NEXT</span><span>VOL. 01 &nbsp;·&nbsp; ISSUE 42</span></div>
      <div className="header-main">
        <button className="icon-button mobile-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link className="wordmark" to="/" aria-label="Signal home"><span className="wordmark__symbol">S<span>.</span></span><span className="wordmark__text">signal</span></Link>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/latest" onClick={() => setMenuOpen(false)}>Latest</NavLink>
          <NavLink to="/trending" onClick={() => setMenuOpen(false)}>Trending</NavLink>
          <div className="nav-dropdown">
            <button type="button" className="nav-dropdown__trigger">Explore <ChevronDown size={13} /></button>
            <div className="nav-dropdown__menu">
              {categories.map((category) => <Link key={category} to={`/category/${category.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{category}</Link>)}
            </div>
          </div>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        </nav>
        <div className="header-actions">
          <form className={`header-search${searchOpen ? ' is-open' : ''}`} onSubmit={search} role="search">
            <button type="button" className="header-search__toggle" aria-label="Open search" onClick={() => setSearchOpen(!searchOpen)}><Search size={16} aria-hidden="true" /></button>
            <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search stories" placeholder="Search stories" />
            <kbd>/</kbd>
          </form>
          <Link className="header-bookmarks icon-button" to="/saved" aria-label={`Saved articles${savedCount ? `, ${savedCount}` : ''}`} title="Saved articles"><Bookmark size={18} />{savedCount > 0 && <span className="bookmark-count">{savedCount}</span>}</Link>
          <button className="icon-button theme-toggle" type="button" onClick={onThemeToggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title="Toggle color theme">{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
        </div>
      </div>
      <div className="header-bottomline"><span>THE HUMAN SIDE OF ARTIFICIAL INTELLIGENCE</span><Link to="/latest">Explore the latest <ArrowRight size={13} /></Link></div>
    </header>
  )
}

type FooterProps = { onSubscribe: (email: string) => boolean }

export function Footer({ onSubscribe }: FooterProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subscribed = onSubscribe(email)
    setMessage(subscribed ? 'You’re on the list. Watch your inbox.' : 'That email is already subscribed.')
    if (subscribed) setEmail('')
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark wordmark--footer" to="/"><span className="wordmark__symbol">S<span>.</span></span><span className="wordmark__text">signal</span></Link>
          <p>Intelligence, in context.<br />A clearer signal in a noisy world.</p>
          <span className="footer-edition">INDEPENDENT BY DESIGN · EST. 2025</span>
        </div>
        <div className="footer-links">
          <div><span className="footer-heading">READ</span><Link to="/latest">Latest stories</Link><Link to="/trending">Trending now</Link><Link to="/saved">Your reading list</Link></div>
          <div><span className="footer-heading">SIGNAL</span><Link to="/about">About us</Link><Link to="/contact">Contact</Link><a href="mailto:hello@signaljournal.example">Write for us</a></div>
        </div>
        <div className="newsletter-block">
          <span className="footer-heading">A LITTLE MORE SIGNAL</span>
          <h2>Thoughtful tech, in your inbox.</h2>
          <p>A considered read on what’s changing, once a week.</p>
          <form className="newsletter-form" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
            <button type="submit" aria-label="Subscribe to newsletter"><ArrowRight size={18} /></button>
          </form>
          <span className="newsletter-message" aria-live="polite">{message || 'No noise. Unsubscribe whenever.'}</span>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 SIGNAL JOURNAL. MADE FOR THE CURIOUS.</span><span>ARTIFICIAL INTELLIGENCE, HUMAN PERSPECTIVE.</span></div>
    </footer>
  )
}

export function BackToTop() {
  return <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><Sun size={15} /><span>BACK TO TOP</span></button>
}