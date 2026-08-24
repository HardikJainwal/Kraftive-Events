export const siteConfig = {
  brand: {
    name: 'KC Events',
    tagline: 'Where Every Celebration Becomes a Story',
    shortDescription:
      'From intimate celebrations to unforgettable grand occasions, we design and orchestrate experiences that stay with you forever.',
    logo: '/images/logo.png',
  },
  contact: {
    email: 'hello@kcevents.com',
    phone: '+1 (555) 234-5678',
    address: '42 Royal Avenue, Suite 300',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    hours: 'Mon – Fri: 9 AM – 6 PM | Sat: 10 AM – 4 PM',
  },
  social: {
    instagram: 'https://instagram.com/kcevents',
    facebook: 'https://facebook.com/kcevents',
    pinterest: 'https://pinterest.com/kcevents',
    twitter: 'https://twitter.com/kcevents',
    linkedin: 'https://linkedin.com/company/kcevents',
  },
  hero: {
    eyebrow: 'WE CREATE MOMENTS',
    headline: 'Where Every Celebration Becomes a Story',
    subtext:
      'From intimate celebrations to unforgettable grand occasions, we design and orchestrate experiences that stay with you forever.',
    primaryCTA: { label: 'Plan Your Event', href: '/contact' },
    secondaryCTA: { label: 'Explore Our Work', href: '/portfolio' },
    media: {
      type: 'video' as const,
      src: '/videos/hero-video.mp4',
      poster: '/images/hero-poster.jpg',
      fallbackGradient: true,
    },
  },
  seo: {
    titleTemplate: '%s | KC Events — Premium Event Planning',
    defaultTitle: 'KC Events — Premium Event Planning & Celebrations',
    description:
      'KC Events crafts unforgettable luxury celebrations, weddings, corporate events, and private parties. Where every moment becomes extraordinary.',
    ogImage: '/images/og-image.jpg',
    url: 'https://kcevents.com',
  },
} as const;
