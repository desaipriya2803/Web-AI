export type Article = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  author: string
  source: string
  sourceUrl?: string
  image: string
  publishedAt: string
  readTime: string
  featured?: boolean
  trending?: boolean
  live?: boolean
}

export const categories = ['Research', 'Business', 'Tools', 'Culture', 'Policy', 'Robotics']

export const sampleArticles: Article[] = [
  {
    id: 's-1', slug: 'small-models-big-ideas', title: 'The next AI breakthrough might fit in your pocket',
    excerpt: 'A new generation of compact models is making the case that intelligence does not have to live in a data center.',
    body: 'For years, the story of artificial intelligence was told in ever-larger numbers: more parameters, more compute, more electricity. A quieter shift is happening now. Researchers are finding that carefully trained, smaller models can do remarkable work on devices that fit in a backpack, or even a pocket.\n\nThat matters beyond convenience. Local models can respond without sending personal data to a remote server, work when connectivity disappears, and bring useful AI to communities without the budget for a cloud bill. The trade-off is real: narrow, well-defined tasks are where small models shine, while broad reasoning still asks for more horsepower.\n\nThe interesting question is no longer simply how big a model can get. It is how thoughtfully we can make intelligence available where people actually need it.',
    category: 'Research', author: 'Maya Chen', source: 'Signal Studio', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85', publishedAt: '2026-10-24T09:00:00Z', readTime: '6 min read', featured: true, trending: true,
  },
  {
    id: 's-2', slug: 'the-new-shape-of-the-ai-workplace', title: 'The new shape of the AI workplace',
    excerpt: 'The best teams are not replacing people with agents. They are redesigning the handoffs between them.',
    body: 'Every wave of workplace software promises to remove friction. The most useful AI tools are taking a less dramatic route: they make the in-between moments easier. Summaries arrive before a meeting, drafts have a place to start, and repetitive cleanup happens without another ticket.\n\nTeams that get the most from these tools tend to start with a clear boundary. They decide what an assistant may prepare, what a person must review, and how the work is handed back. That clarity is less flashy than full automation, but it is also where trust is built.\n\nThe new workplace is not a contest between human and machine. It is a careful arrangement of judgment, speed, and accountability.',
    category: 'Business', author: 'Jordan Ellis', source: 'Signal Studio', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85', publishedAt: '2026-10-23T12:30:00Z', readTime: '5 min read', trending: true,
  },
  {
    id: 's-3', slug: 'a-field-guide-to-open-models', title: 'A field guide to the open-model moment',
    excerpt: 'What openness actually means, where it helps, and the trade-offs worth understanding before you download.',
    body: 'Open models are often discussed as if openness were a single switch. In practice, the label can mean access to weights, training code, data details, or some combination of the three. Each choice changes who can inspect a model and what they can build with it.\n\nFor developers, downloadable weights make experimentation possible without a permanent vendor relationship. For researchers, more transparency can help test claims. Yet a permissive license does not make a system automatically safe, and releasing model weights is difficult to reverse.\n\nA useful first question is not whether a model is open. It is which parts are open, under what terms, and for which purpose.',
    category: 'Tools', author: 'Nina Okafor', source: 'Signal Studio', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85', publishedAt: '2026-10-22T08:15:00Z', readTime: '8 min read', trending: true,
  },
  {
    id: 's-4', slug: 'who-gets-to-teach-the-machine', title: 'Who gets to teach the machine?',
    excerpt: 'The people behind the datasets are shaping the future of AI, often without a seat at the table.',
    body: 'Behind every capable model is a vast collection of human decisions: what to include, what to leave out, and how to label ambiguous material. Those decisions are labor. They also carry a point of view.\n\nA growing conversation around data work is asking how contractors are paid, how they can contest a label, and whether the communities represented in a dataset have any say in its use. These are not side questions. They influence how a system behaves and who it serves.\n\nBetter AI will require better ways to recognize the people whose expertise makes it possible.',
    category: 'Culture', author: 'Samira Bell', source: 'Signal Studio', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85', publishedAt: '2026-10-21T15:40:00Z', readTime: '7 min read', trending: true,
  },
  {
    id: 's-5', slug: 'the-infrastructure-behind-every-prompt', title: 'The infrastructure behind every prompt',
    excerpt: 'Inside the energy, water, and planning questions that follow the rapid expansion of AI computing.',
    body: 'A prompt feels weightless. The systems that answer it are anything but. Data centers need power, cooling, fiber connections, and years of local planning. As more companies build AI infrastructure, the conversation is moving from abstract carbon estimates to practical questions about grids and communities.\n\nSome operators are locating new facilities near cleaner power or shifting workloads to quieter hours. Others are publishing more detailed resource reports. None of these approaches alone resolves the pressure created by demand, but more honest measurement gives communities something concrete to evaluate.\n\nThe digital future is physical infrastructure. Its costs and benefits should be visible to the people living beside it.',
    category: 'Policy', author: 'Elliot Park', source: 'Signal Studio', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=85', publishedAt: '2026-10-20T11:05:00Z', readTime: '9 min read',
  },
  {
    id: 's-6', slug: 'robots-that-learn-the-long-way', title: 'Robots are learning the long way around',
    excerpt: 'Why patient, real-world training may matter more than a perfect demo in the lab.',
    body: 'A robot can look brilliant in a carefully arranged demonstration and still struggle with a cluttered kitchen. The difference is not a lack of ambition; it is the sheer variety of the physical world. Objects slip, lighting changes, and people move unpredictably.\n\nResearchers are combining simulation with slower, more varied real-world practice. It is a less cinematic path, but it gives robots a better chance to recover when reality stops matching the plan.\n\nProgress in robotics may be measured less by one spectacular task and more by how gracefully a machine handles the hundred small surprises that come before it.',
    category: 'Robotics', author: 'Theo Martin', source: 'Signal Studio', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=85', publishedAt: '2026-10-19T13:20:00Z', readTime: '6 min read',
  },
  {
    id: 's-7', slug: 'the-case-for-slower-ai', title: 'The case for slower AI',
    excerpt: 'When a system touches healthcare, hiring, or public services, careful deployment is a feature.',
    body: 'Speed is an easy metric to celebrate. It is much harder to measure the value of waiting until a system is understood, its failure modes are documented, and the people affected know how to challenge a decision.\n\nIn high-stakes settings, a slower rollout can reveal problems before they scale. It can also make room for a different question: does this system need to be automated at all?\n\nResponsible deployment is not a request to stop building. It is a recognition that moving quickly and learning carefully are not always the same thing.',
    category: 'Policy', author: 'Maya Chen', source: 'Signal Studio', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85', publishedAt: '2026-10-18T10:00:00Z', readTime: '5 min read',
  },
  {
    id: 's-8', slug: 'creative-tools-and-the-human-touch', title: 'Creative tools are changing the first draft',
    excerpt: 'Artists are finding new uses for generative systems and drawing sharper lines around the work they want to keep.',
    body: 'A blank page is a particular kind of pressure. Some artists are using generative tools to loosen it: to make a dozen rough directions, find a visual reference, or deliberately create something to push against.\n\nThat does not settle the thorny questions around attribution, training data, or compensation. It does show why conversations about creative AI are richer when they include the people making the work, rather than treating art as a benchmark.\n\nThe tool may change how a first draft arrives. What happens after that remains a human decision.',
    category: 'Culture', author: 'Jordan Ellis', source: 'Signal Studio', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85', publishedAt: '2026-10-17T14:10:00Z', readTime: '4 min read',
  },
]