export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  images: string[];
  location: string;
  year: string;
  description: string;
  slug: string;
  featured: boolean;
  span?: 'tall' | 'wide' | 'large';
}

export const categories = [
  'All',
  'Corporate',
  'BTL Activations',
  'Stall & Fabrication',
  'Launches',
];

export const portfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'Vivo V20 Launch Event',
    category: 'Launches',
    image: '/images/asset4.jpeg',
    images: ['/images/asset4.jpeg'],
    location: 'Reliance Corporate Park, Mumbai',
    year: 'March, 2026',
    description:
      'Grand outdoor smartphone launch setup at Reliance Corporate Park, featuring custom white stage fabrication, interactive product demonstration kiosks, vertical branding stands, and immersive lighting.',
    slug: 'vivo-launch-event',
    featured: true,
    span: 'tall',
  },
  {
    id: '2',
    title: 'Rezolution Corporate Meet',
    category: 'Corporate',
    image: '/images/asset2.jpeg',
    images: ['/images/asset2.jpeg'],
    location: 'Thane, Mumbai',
    year: 'Jan, 2026',
    description:
      'Corporate meet and venue entry ambiance designed for Rezolution by SecureKloud, featuring bespoke floral arch entrance decor, 3D backlit logo signages, and guest hospitality setup.',
    slug: 'rezolution-meet',
    featured: true,
    span: 'wide',
  },
  {
    id: '3',
    title: 'Storia Mall Activation',
    category: 'BTL Activations',
    image: '/images/asset3.jpeg',
    images: ['/images/asset3.jpeg'],
    location: 'Malls, Mumbai',
    year: '12 Dec, 2025',
    description:
      'High-impact BTL retail mall activation drive for Storia, featuring customized sampling kiosks, customer engagement activities, and gift hamper distribution across prime Mumbai shopping malls.',
    slug: 'storia-activation',
    featured: true,
    span: 'large',
  },
  {
    id: '4',
    title: 'World of Concrete Stall',
    category: 'Stall & Fabrication',
    image: '/images/asset1.jpeg',
    images: ['/images/asset1.jpeg'],
    location: 'Bombay Exhibition Center, Mumbai',
    year: 'May, 2026',
    description:
      'Architectural 3D exhibition booth conceptualised and fabricated for World of Concrete India, featuring intricate floral cutouts, structural arches, and premium product display walls.',
    slug: 'world-of-concrete',
    featured: true,
  },
  {
    id: '5',
    title: 'Nissan Gravite Launch',
    category: 'Launches',
    image: '/images/asset5.jpeg',
    images: ['/images/asset5.jpeg'],
    location: 'Mumbai',
    year: 'Feb, 2026',
    description:
      'Automotive unveil and showroom activation for the all-new Nissan Gravite, complete with branded red carpet staging, celebrity life-size cutouts, floor graphics, and display podiums.',
    slug: 'nissan-gravite-launch',
    featured: true,
    span: 'tall',
  },
  {
    id: '6',
    title: 'Wellmann Push-Up Challenge',
    category: 'BTL Activations',
    image: '/images/asset6.jpeg',
    images: ['/images/asset6.jpeg'],
    location: 'Phoenix Mall, Mumbai',
    year: 'April, 2026',
    description:
      'Energetic public fitness challenge event for Wellmann featuring celebrity ambassador Milind Soman, large-format LED backdrop screens, professional AV control, and live stage hosting.',
    slug: 'wellmann-activation',
    featured: true,
    span: 'wide',
  },
];
