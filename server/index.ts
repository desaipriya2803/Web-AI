import 'dotenv/config'
import express from 'express'

const app = express()
const port = Number(process.env.PORT ?? 8787)
const categoryRules: Array<[string, string[]]> = [
  ['Robotics', ['robot', 'humanoid', 'autonomous vehicle']],
  ['Policy', ['policy', 'regulation', 'government', 'privacy', 'copyright', 'legislation']],
  ['Culture', ['artist', 'creative', 'culture', 'music', 'film', 'education']],
  ['Business', ['startup', 'funding', 'company', 'market', 'investment', 'revenue']],
  ['Tools', ['tool', 'app', 'product', 'open source', 'launch', 'release']],
]

function classifyArticle(title: string, description = '') {
  const text = `${title} ${description}`.toLowerCase()
  return categoryRules.find(([, keywords]) => keywords.some((keyword) => text.includes(keyword)))?.[0] ?? 'Research'
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, liveFeedConfigured: Boolean(process.env.NEWS_API_KEY) })
})

app.get('/api/news', async (request, response) => {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) {
    response.status(503).json({ error: 'Live news is not configured.' })
    return
  }

  const category = typeof request.query.category === 'string' ? request.query.category : ''
  const query = category && category !== 'all' ? `artificial intelligence ${category}` : 'artificial intelligence'
  const url = new URL('https://newsapi.org/v2/everything')
  url.searchParams.set('q', query)
  url.searchParams.set('sortBy', 'publishedAt')
  url.searchParams.set('pageSize', '30')
  url.searchParams.set('language', 'en')

  try {
    const result = await fetch(url, { headers: { 'X-Api-Key': apiKey }, signal: AbortSignal.timeout(10000) })
    const payload = (await result.json()) as {
      status?: string
      message?: string
      articles?: Array<{
        title?: string
        description?: string | null
        content?: string | null
        url?: string
        urlToImage?: string | null
        publishedAt?: string
        source?: { name?: string }
        author?: string | null
      }>
    }

    if (!result.ok || payload.status !== 'ok') {
      response.status(result.status || 502).json({ error: payload.message ?? 'The news provider could not complete this request.' })
      return
    }

    response.json({
      articles: (payload.articles ?? [])
        .filter((article) => article.title && article.title !== '[Removed]')
        .map((article, index) => ({
          id: `${Date.parse(article.publishedAt ?? '') || Date.now()}-${index}`,
          slug: `${encodeURIComponent((article.title ?? 'story').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 68))}-${index}`,
          title: article.title,
          excerpt: article.description || 'Open the original report for the full story.',
          body: article.content || article.description || 'The original publisher has more details on this report.',
          category: category && category !== 'all' ? category : classifyArticle(article.title ?? '', article.description ?? ''),
          author: article.author || article.source?.name || 'News desk',
          source: article.source?.name || 'News source',
          sourceUrl: article.url,
          image: article.urlToImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
          publishedAt: article.publishedAt,
          readTime: '3 min read',
          featured: index === 0,
          trending: index < 5,
          live: true,
        })),
    })
  } catch {
    response.status(502).json({ error: 'The live news feed is temporarily unavailable.' })
  }
})

app.listen(port, () => console.log(`Signal API listening on http://localhost:${port}`))