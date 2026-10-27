import { motion } from 'framer-motion'
import { ArrowUpRight, Bookmark, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '../data/articles'

type Props = {
  article: Article
  saved: boolean
  onBookmark: (article: Article) => void
  featured?: boolean
}

export function ArticleCard({ article, saved, onBookmark, featured = false }: Props) {
  return (
    <motion.article
      className={`article-card${featured ? ' article-card--featured' : ''}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.42, ease: [0.21, 0.61, 0.35, 1] }}
    >
      <Link className="article-card__image-link" to={`/article/${article.slug}`} aria-label={`Read ${article.title}`}>
        <img className="article-card__image" src={article.image} alt="" loading="lazy" />
        <span className="article-card__image-tag">{article.category}</span>
      </Link>
      <div className="article-card__body">
        <div className="article-card__meta">
          <span>{article.live ? article.source : 'SIGNAL STUDIO'}</span>
          <span className="meta-dot" />
          <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
        </div>
        <Link className="article-card__title-link" to={`/article/${article.slug}`}>
          <h3>{article.title}</h3>
        </Link>
        <p className="article-card__excerpt">{article.excerpt}</p>
        <div className="article-card__footer">
          <span className="article-card__read-time"><Clock3 size={14} />{article.readTime}</span>
          <button
            className={`icon-button bookmark-button${saved ? ' is-saved' : ''}`}
            type="button"
            onClick={() => onBookmark(article)}
            aria-label={saved ? 'Remove bookmark' : 'Save article'}
            aria-pressed={saved}
            title={saved ? 'Remove bookmark' : 'Save article'}
          >
            <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <Link className="article-card__read-link" to={`/article/${article.slug}`} aria-label={`Read ${article.title}`}>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}