export const categories = [
  {
    _id: 'category-browsers',
    _type: 'category',
    name: 'Browsers',
    slug: { _type: 'slug', current: 'browsers' },
    icon: '🌐',
  },
  {
    _id: 'category-multimedia',
    _type: 'category',
    name: 'Multimedia',
    slug: { _type: 'slug', current: 'multimedia' },
    icon: '🎧',
  },
  {
    _id: 'category-utilities',
    _type: 'category',
    name: 'Utilities',
    slug: { _type: 'slug', current: 'utilities' },
    icon: '🛡️',
  },
];

export const apps = [
  {
    _type: 'app',
    title: 'SwiftSurf Browser',
    slug: { _type: 'slug', current: 'swiftsurf-browser' },
    version: '5.2.1',
    os: ['Windows', 'macOS'],
    developer: 'SwiftLabs',
    category: { _type: 'reference', _ref: 'category-browsers' },
    description:
      'A privacy-first browser with lightning fast rendering, built-in tracker blocking and workspace tab management.',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'SwiftSurf Browser combines a modern interface with advanced tab grouping and encrypted sync.',
          },
        ],
      },
    ],
    downloadLinks: [
      { _type: 'downloadLink', name: 'Official mirror', url: 'https://example.com/swiftsurf' },
      { _type: 'downloadLink', name: 'Softonic mirror', url: 'https://example.com/swiftsurf-softonic' },
    ],
    releaseDate: '2024-04-18T00:00:00Z',
    topDownloads: true,
  },
  {
    _type: 'app',
    title: 'Aurora Studio',
    slug: { _type: 'slug', current: 'aurora-studio' },
    version: '2.8.0',
    os: ['Windows'],
    developer: 'Aurora Labs',
    category: { _type: 'reference', _ref: 'category-multimedia' },
    description:
      'A non-linear multimedia editor with AI-assisted colour grading, real-time collaboration and export presets.',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Aurora Studio makes it easy to craft professional videos with timeline markers and GPU acceleration.',
          },
        ],
      },
    ],
    downloadLinks: [
      { _type: 'downloadLink', name: 'Primary CDN', url: 'https://example.com/aurora-studio' },
      { _type: 'downloadLink', name: 'Mirror EU', url: 'https://example.com/aurora-studio-eu' },
    ],
    releaseDate: '2024-03-05T00:00:00Z',
    topDownloads: true,
  },
  {
    _type: 'app',
    title: 'ShieldGuard Antivirus',
    slug: { _type: 'slug', current: 'shieldguard-antivirus' },
    version: '11.0.4',
    os: ['Windows', 'Linux'],
    developer: 'SecureByte',
    category: { _type: 'reference', _ref: 'category-utilities' },
    description:
      'Endpoint protection with behaviour monitoring, real-time updates and ransomware rollback.',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'ShieldGuard Antivirus keeps devices safe with behavioural analysis and instant cloud signatures.',
          },
        ],
      },
    ],
    downloadLinks: [
      { _type: 'downloadLink', name: 'Primary mirror', url: 'https://example.com/shieldguard' },
      { _type: 'downloadLink', name: 'Secondary mirror', url: 'https://example.com/shieldguard-2' },
    ],
    releaseDate: '2024-02-10T00:00:00Z',
    topDownloads: false,
  },
];

export const posts = [
  {
    _type: 'post',
    title: 'Top five browsers for productivity in 2024',
    slug: { _type: 'slug', current: 'top-browsers-2024' },
    excerpt: 'We compare the latest releases of leading browsers and benchmark their performance and privacy tools.',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Discover the browsers that help you multitask faster with workspaces, AI co-pilots and streamlined search.',
          },
        ],
      },
    ],
    tags: ['browsers', 'productivity'],
    publishedAt: '2024-04-29T00:00:00Z',
  },
  {
    _type: 'post',
    title: 'How to organise your creative toolkit with Aurora Studio',
    slug: { _type: 'slug', current: 'aurora-studio-tips' },
    excerpt: 'Aurora Studio introduces collaborative timelines and AI presets that speed up your next multimedia project.',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Learn expert workflows and shortcuts for Aurora Studio to craft visuals that stand out across platforms.',
          },
        ],
      },
    ],
    tags: ['multimedia', 'workflow'],
    publishedAt: '2024-03-20T00:00:00Z',
  },
];
