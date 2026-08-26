export const siteConfig = {
  brand: {
    name: 'Mumbai’s Leading Event Partner',
    tagline: 'Delivering Impactful Events & Exhibitions.',
    shortDescription:
      'Kraftive Events & Media is a full-service event management agency based in Mumbai, delivering impactful events and brand experiences across India. From corporate events and venue solutions to BTL activations, décor, fabrication, manpower, and customised gifting, we handle every detail under one roof.',
    logo: '/images/logo.png',
  },
  contact: {
    email: 'info@kraftiveevents.com',
    emailAlt: 'Ashoutosh@kraftiveevents.com',
    phone: '+91 9082097808',
    address: 'Office No. 129, Master Mind, The Royal Palms, Goregaon',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400065',
    hours: 'Mon – Sat: 10 AM – 7 PM',
  },
  social: {
    instagram: 'https://instagram.com/kraftiveevents',
    facebook: 'https://facebook.com/kraftiveevents',
    pinterest: 'https://pinterest.com/kraftiveevents',
    twitter: 'https://twitter.com/kraftiveevents',
    linkedin: 'https://linkedin.com/company/kraftiveevents',
  },
  hero: {
    eyebrow: 'Mumbai’s Leading Event Partner',
    headline: 'Delivering Impactful Events & Exhibitions.',
    subtext:
      'Creating experiences that bring brands, people and purpose together. Driven by thoughtful planning, seamless execution and an uncompromising eye for detail.',
    primaryCTA: { label: 'Plan Your Event', href: '/contact' },
    secondaryCTA: { label: 'Explore Our Work', href: '/portfolio' },
    media: {
      type: 'video' as const,
      src: '/videos/blackBG.mp4',
      poster: '/images/hero-poster.jpg',
      fallbackGradient: true,
    },
  },
  seo: {
    titleTemplate: '%s | Kraftive Events & Media — Mumbai',
    defaultTitle: 'Kraftive Events & Media | Full-Service Event Management, Mumbai',
    description:
      'Kraftive Events & Media is a Mumbai-based full-service event management agency delivering corporate events, venue sourcing, BTL activations, décor, stall fabrication, manpower & customised gifting across India.',
    ogImage: '/images/og-image.jpg',
    url: 'https://kraftiveevents.com',
  },
} as const;

