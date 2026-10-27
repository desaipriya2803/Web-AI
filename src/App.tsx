import { useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, ExternalLink, Mail, Radio, Share2, Sparkles } from 'lucide-react'
import { Link, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ArticleCard } from './components/ArticleCard'
import { BackToTop, Footer, Header } from './components/SiteShell'
import { categories, sampleArticles, type Article } from './data/articles'

type Theme = 'light' | 'dark'

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) as T : fallback
  } catch {
    return fallback
  }
}

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <div className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p>{children}</div>
}

function SourceNote({ live }: { live: boolean }) {
  return (
    <div className={`source-note${live ? ' source-note--live' : ''}`}>
      {live ? <Radio size={14} /> : <Sparkles size={14} />}
      <span>{live ? 'LIVE FEED · ARTICLES FROM PUBLISHERS' : 'AI-GENERATED SAMPLE STORIES · NOT LIVE NEWS'}</span>
      {!live && <span className="source-note__detail">Sample content, not current news.</span>}
    </div>
  )
}

type SharedProps = { articles: Article[]; savedIds: Set<string>; onBookmark: (article: Article) => void; live: boolean }

function HomePage(props: SharedProps) {
  const { articles } = props
  const feature = articles[0]
  const picks = articles.slice(1, 4)
  return (
    <>
      <main className="page-main home-main">
        <div className="home-kicker"><span>MONDAY, OCTOBER 26, 2026</span><span>VOL. 01 / ISSUE 42</span></div>
        <SourceNote live={props.live} />
        <section className="home-feature" aria-labelledby="feature-title">
          <div className="home-feature__copy">
            <span className="eyebrow"><span className="eyebrow-mark" /> THE BIG PICTURE <span className="eyebrow-rule" /></span>
            <span className="category-label">{feature.category} &nbsp;·&nbsp; {feature.readTime}</span>
            <Link to={`/article/${feature.slug}`} className="feature-title-link"><h1 id="feature-title">{feature.title}</h1></Link>
            <p className="home-feature__excerpt">{feature.excerpt}</p>
            <div className="byline"><span className="author-avatar">{feature.author.split(' ').map((part) => part[0]).join('')}</span><span>WORDS BY <strong>{feature.author.toUpperCase()}</strong></span><span className="meta-dot" /><span>{new Date(feature.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span></div>
            <Link className="button button--dark" to={`/article/${feature.slug}`}>READ THE STORY <ArrowRight size={16} /></Link>
          </div>
          <Link className="home-feature__visual" to={`/article/${feature.slug}`} aria-label={`Read ${feature.title}`}>
            <img src={feature.image} alt="" />
            <div className="feature-image-overlay"><span>THE SIGNAL VIEW</span><span>01 / 06</span></div>
            <span className="feature-side-note">INTELLIGENCE, IN CONTEXT</span>
          </Link>
          <div className="home-feature__footnote"><span>01 — FIELD NOTES</span><span>IDEAS FOR A WORLD IN MOTION</span></div>
        </section>

        <section className="section-block latest-picks" aria-labelledby="latest-heading">
          <div className="section-heading"><div><span className="eyebrow">A FRESH PERSPECTIVE</span><h2 id="latest-heading">The latest signal<span>.</span></h2></div><Link className="text-link" to="/latest">ALL STORIES <ArrowUpRight size={15} /></Link></div>
          <div className="article-grid">{picks.map((article) => <ArticleCard key={article.id} article={article} saved={props.savedIds.has(article.id)} onBookmark={props.onBookmark} />)}</div>
        </section>

        <section className="home-categories" aria-labelledby="category-heading"><div><span className="eyebrow">FOLLOW YOUR CURIOSITY</span><h2 id="category-heading">A few ways in.</h2></div><div className="category-links">{categories.map((category, index) => <Link key={category} to={`/category/${category.toLowerCase()}`}><span>0{index + 1}</span>{category}<ArrowUpRight size={15} /></Link>)}</div></section>

        <section className="home-trending section-block"><div className="section-heading"><div><span className="eyebrow">THE CONVERSATION</span><h2>On the radar<span>.</span></h2></div><Link className="text-link" to="/trending">SEE WHAT'S TRENDING <ArrowUpRight size={15} /></Link></div><div className="trending-strip">{articles.filter((article) => article.trending).slice(0, 3).map((article, index) => <Link to={`/article/${article.slug}`} className="trending-row" key={article.id}><span className="trending-row__number">0{index + 1}</span><span className="trending-row__category">{article.category}</span><strong>{article.title}</strong><ArrowUpRight size={17} /></Link>)}</div></section>
      </main>
    </>
  )
}

function ListingPage({ articles, savedIds, onBookmark, live, title, eyebrow, description, filter }: SharedProps & { title: string; eyebrow: string; description: string; filter?: (article: Article) => boolean }) {
  const [page, setPage] = useState(1)
  const filtered = filter ? articles.filter(filter) : articles
  const pageSize = 6
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageArticles = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return (
    <main className="page-main listing-main">
      <SourceNote live={live} />
      <PageIntro eyebrow={eyebrow} title={title} description={description} />
      <div className="listing-controls"><span>{filtered.length} {filtered.length === 1 ? 'STORY' : 'STORIES'} <span className="meta-dot" /> SORTED BY DATE</span><Link to="/latest" className="text-link">LATEST FIRST <ArrowDown size={14} /></Link></div>
      {pageArticles.length ? <div className="article-grid article-grid--listing">{pageArticles.map((article) => <ArticleCard key={article.id} article={article} saved={savedIds.has(article.id)} onBookmark={onBookmark} />)}</div> : <EmptyState title="No stories here just yet." text="Try another category or return to the latest edition." />}
      {pageCount > 1 && <nav className="pagination" aria-label="Pagination"><button type="button" className="pagination-arrow" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><ArrowLeft size={17} /></button><span>PAGE <strong>{String(currentPage).padStart(2, '0')}</strong> OF {String(pageCount).padStart(2, '0')}</span><button type="button" className="pagination-arrow" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><ArrowRight size={17} /></button></nav>}
    </main>
  )
}

function SearchPage(props: SharedProps) {
  const [params] = useSearchParams()
  const query = params.get('q')?.trim() ?? ''
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = props.articles.filter((article) => terms.every((term) => `${article.title} ${article.excerpt} ${article.category} ${article.author}`.toLowerCase().includes(term)))
  return <main className="page-main listing-main"><PageIntro eyebrow="THE SIGNAL INDEX" title={query ? `Search: “${query}”` : 'Search stories'} description="Find a story by idea, field, or point of view." /><div className="listing-controls"><span>{matches.length} {matches.length === 1 ? 'MATCH' : 'MATCHES'}</span></div>{matches.length ? <div className="article-grid article-grid--listing">{matches.map((article) => <ArticleCard key={article.id} article={article} saved={props.savedIds.has(article.id)} onBookmark={props.onBookmark} />)}</div> : <EmptyState title="Nothing found this time." text="Try a broader phrase, or explore the latest stories." />}</main>
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="empty-state"><span className="empty-state__symbol">S<span>.</span></span><h2>{title}</h2><p>{text}</p><Link className="button button--dark" to="/latest">EXPLORE STORIES <ArrowRight size={16} /></Link></div>
}

function ArticlePage({ articles, savedIds, onBookmark, live }: SharedProps) {
  const { slug = '' } = useParams()
  const article = articles.find((item) => item.slug === slug)
  const [shared, setShared] = useState(false)
  const related = articles.filter((item) => item.slug !== slug && item.category === article?.category).slice(0, 3)

  async function share() {
    const shareData = { title: article?.title ?? 'Signal', text: article?.excerpt, url: window.location.href }
    try {
      if (navigator.share) await navigator.share(shareData)
      else { await navigator.clipboard.writeText(window.location.href); setShared(true); window.setTimeout(() => setShared(false), 2200) }
    } catch { setShared(false) }
  }

  if (!article) return <main className="page-main"><EmptyState title="We couldn’t find that story." text="It may have moved, or the link may be incomplete." /></main>

  return (
    <main className="page-main article-main">
      <div className="article-topline"><Link to="/latest" className="text-link"><ArrowLeft size={15} /> BACK TO STORIES</Link><SourceNote live={article.live ?? live} /></div>
      <article>
        <header className="article-header"><span className="eyebrow">{article.category.toUpperCase()} &nbsp;·&nbsp; {article.readTime.toUpperCase()}</span><h1>{article.title}</h1><p className="article-deck">{article.excerpt}</p><div className="article-byline"><div className="byline"><span className="author-avatar">{article.author.split(' ').map((part) => part[0]).join('')}</span><span>BY <strong>{article.author.toUpperCase()}</strong><br /><time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time></span></div><div className="article-tools"><span><Clock3 size={14} /> {article.readTime}</span><button type="button" onClick={() => onBookmark(article)} className={`tool-button${savedIds.has(article.id) ? ' is-saved' : ''}`} aria-pressed={savedIds.has(article.id)}><Check size={15} /> {savedIds.has(article.id) ? 'SAVED' : 'SAVE'}</button><button type="button" onClick={share} className="tool-button"><Share2 size={15} /> {shared ? 'COPIED' : 'SHARE'}</button></div></div></header>
        <figure className="article-hero-image"><img src={article.image} alt="" /><figcaption>{article.live ? `Image accompanying the original report from ${article.source}.` : 'A visual note from the Signal archive.'}</figcaption></figure>
        <div className="article-content-wrap"><aside className="article-margin-note"><span>THE SIGNAL VIEW</span><p>Technology moves quickly. Understanding it takes a little longer.</p></aside><div className="article-content">{article.body.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}{article.live && article.sourceUrl && <a className="source-link" href={article.sourceUrl} target="_blank" rel="noreferrer">Continue at {article.source} <ExternalLink size={15} /></a>}<div className="article-endmark">S<span>.</span></div></div></div>
      </article>
      {related.length > 0 && <section className="section-block related-stories"><div className="section-heading"><div><span className="eyebrow">KEEP FOLLOWING THE THREAD</span><h2>Related stories<span>.</span></h2></div><Link to={`/category/${article.category.toLowerCase()}`} className="text-link">MORE IN {article.category.toUpperCase()} <ArrowUpRight size={15} /></Link></div><div className="article-grid">{related.map((item) => <ArticleCard key={item.id} article={item} saved={savedIds.has(item.id)} onBookmark={onBookmark} />)}</div></section>}
    </main>
  )
}

function AboutPage() {
  return <main className="page-main simple-page"><PageIntro eyebrow="A NOTE ON OUR POINT OF VIEW" title="Technology is never just technology." description="Signal is an independent journal for the ideas, people, and technologies shaping artificial intelligence." /><div className="about-layout"><div className="about-marker">S<span>.</span></div><div className="about-copy"><p className="about-lede">We believe the most important question about new technology isn’t what it can do. It’s what it means for the people who live with it.</p><p>Signal brings context to the fast-moving world of AI. We follow the research, the business, the tools, the culture, and the policy, always looking for the human story underneath the headline.</p><p>Our sample edition is a demonstration of the publication, not a live news feed. When an API key is configured, current headlines appear with clear publisher attribution and a link to the original reporting.</p><div className="about-values"><div><span>01</span><strong>CURIOUS, NOT CYNICAL</strong><p>We take new ideas seriously without taking every promise at face value.</p></div><div><span>02</span><strong>PEOPLE BEFORE HYPE</strong><p>Technology matters because of how it changes everyday lives.</p></div><div><span>03</span><strong>CONTEXT IS A PRACTICE</strong><p>We make space for the nuance that a news cycle tends to leave behind.</p></div></div><Link to="/contact" className="button button--dark">SAY HELLO <ArrowRight size={16} /></Link></div></div></main>
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const messages = readStorage<Array<Record<string, string>>>('signal:messages', [])
    messages.push({ name: String(formData.get('name')), email: String(formData.get('email')), message: String(formData.get('message')), sentAt: new Date().toISOString() })
    localStorage.setItem('signal:messages', JSON.stringify(messages))
    setSubmitted(true)
  }
  return <main className="page-main simple-page"><PageIntro eyebrow="THE DOOR IS OPEN" title="Good conversations start somewhere." description="A note, a question, a different point of view. We’re listening." /><div className="contact-layout"><div className="contact-note"><span className="contact-icon"><Mail size={21} /></span><h2>Come say hello.</h2><p>For editorial ideas, corrections, or just a thoughtful disagreement, send us a note.</p><a href="mailto:hello@signaljournal.example">hello@signaljournal.example <ArrowUpRight size={14} /></a><span className="contact-postmark">SIGNAL JOURNAL<br />INDEPENDENT BY DESIGN</span></div><form className="contact-form" onSubmit={submit}><label>Your name<input name="name" autoComplete="name" required placeholder="How should we address you?" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Your note<textarea name="message" required rows={5} placeholder="What’s on your mind?" /></label><div className="contact-form__bottom"><span aria-live="polite">{submitted ? 'Your note is saved in this browser.' : 'This demo saves your note locally on this device.'}</span><button className="button button--dark" type="submit">{submitted ? 'SENT' : 'SEND A NOTE'} <ArrowRight size={16} /></button></div></form></div></main>
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => readStorage<Theme>('signal:theme', 'light'))
  const [bookmarks, setBookmarks] = useState<Article[]>(() => readStorage<Article[]>('signal:bookmarks', []))
  const [articles, setArticles] = useState<Article[]>(sampleArticles)
  const [live, setLive] = useState(false)
  const [feedError, setFeedError] = useState('')
  const location = useLocation()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('signal:theme', JSON.stringify(theme))
  }, [theme])

  useEffect(() => {
    let active = true
    async function loadNews() {
      try {
        const health = await fetch('/api/health')
        if (!health.ok) throw new Error('The live feed is temporarily unavailable.')
        const status = await health.json() as { liveFeedConfigured?: boolean }
        if (!status.liveFeedConfigured) return
        const response = await fetch('/api/news')
        if (!response.ok) throw new Error('The live feed is temporarily unavailable.')
        const data = await response.json() as { articles?: Article[] }
        if (active && data.articles?.length) { setArticles(data.articles); setLive(true) }
      } catch (error) {
        if (active && error instanceof Error && error.message) setFeedError(error.message)
      }
    }
    void loadNews()
    return () => { active = false }
  }, [])

  useEffect(() => {
    const route = location.pathname === '/' ? 'Home' : location.pathname.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ') ?? 'Stories'
    document.title = `${route.charAt(0).toUpperCase()}${route.slice(1)} — Signal Journal`
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = 'An independent journal for the ideas, people, and technologies shaping artificial intelligence.'
  }, [location.pathname])

  const savedIds = useMemo(() => new Set(bookmarks.map((article) => article.id)), [bookmarks])

  function toggleBookmark(article: Article) {
    setBookmarks((current) => {
      const next = current.some((item) => item.id === article.id) ? current.filter((item) => item.id !== article.id) : [article, ...current]
      localStorage.setItem('signal:bookmarks', JSON.stringify(next))
      return next
    })
  }

  function subscribe(email: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const subscribers = readStorage<string[]>('signal:subscribers', [])
    if (subscribers.includes(normalizedEmail)) return false
    localStorage.setItem('signal:subscribers', JSON.stringify([...subscribers, normalizedEmail]))
    return true
  }

  const shared: SharedProps = { articles, savedIds, onBookmark: toggleBookmark, live }

  return (
    <div className="site-shell">
      <ScrollReset />
      <Header theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} savedCount={bookmarks.length} />
      {feedError && <div className="feed-alert" role="status">Live feed unavailable. Showing sample stories instead.</div>}
      <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
        <Routes>
          <Route path="/" element={<HomePage {...shared} />} />
          <Route path="/latest" element={<ListingPage {...shared} title="Latest stories" eyebrow="THE CURRENT EDITION" description="Fresh thinking on artificial intelligence, its possibilities, and the people shaping it." />} />
          <Route path="/trending" element={<ListingPage {...shared} title="On the radar" eyebrow="THE CONVERSATION" description="The ideas our readers are spending a little longer with." filter={(article) => article.trending === true} />} />
          <Route path="/category/:category" element={<CategoryRoute {...shared} />} />
          <Route path="/search" element={<SearchPage {...shared} />} />
          <Route path="/saved" element={<ListingPage {...shared} articles={bookmarks} title="Your reading list" eyebrow="KEPT FOR LATER" description="Stories you’ve saved for a quieter moment." />} />
          <Route path="/article/:slug" element={<ArticlePage {...shared} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<main className="page-main"><EmptyState title="This page is off the map." text="Let’s get you back to something worth reading." /></main>} />
        </Routes>
      </motion.div></AnimatePresence>
      <BackToTop />
      <Footer onSubscribe={subscribe} />
    </div>
  )
}

function CategoryRoute(props: SharedProps) {
  const { category = '' } = useParams()
  const title = categories.find((item) => item.toLowerCase() === category.toLowerCase()) ?? category
  return <ListingPage {...props} title={title} eyebrow="EXPLORE A SUBJECT" description={`Reporting and perspective on ${title.toLowerCase()} and its place in the changing world of AI.`} filter={(article) => article.category.toLowerCase() === category.toLowerCase()} />
}

export default App