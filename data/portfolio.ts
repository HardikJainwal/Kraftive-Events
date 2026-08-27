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
  'Weddings',
  'BTL & Activations',
  'Exhibitions & Décor',
  'Celebrations',
  'Destination',
];

export const portfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'The Rosewood Grand Wedding',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80',
    ],
    location: 'Udaipur, Rajasthan',
    year: '2024',
    description:
      'An opulent palace wedding featuring crystal canopies, bespoke floral styling, and a grand reception under the stars.',
    slug: 'rosewood-wedding',
    featured: true,
    span: 'tall',
  },
  {
    id: '2',
    title: 'Apex Corporate Leadership Summit',
    category: 'Corporate',
    image: '/images/Corporate events.png',
    images: ['/images/Corporate events.png'],
    location: 'Mumbai, India',
    year: '2024',
    description:
      'A multi-day corporate summit for executive leaders featuring immersive stage technology, breakout lounges, and gala dinner.',
    slug: 'apex-corporate-summit',
    featured: true,
    span: 'wide',
  },
  {
    id: '3',
    title: 'Golden Jubilee Celebration',
    category: 'Celebrations',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
    ],
    location: 'Taj Mahal Palace, Mumbai',
    year: '2024',
    description:
      'A luxury golden-themed anniversary gala complete with customized table styling, live jazz performance, and champagne toast.',
    slug: 'golden-jubilee-gala',
    featured: true,
    span: 'large',
  },
  {
    id: '4',
    title: 'Pan-India Brand BTL Activation',
    category: 'BTL & Activations',
    image: '/images/Btl activation.png',
    images: ['/images/Btl activation.png'],
    location: 'Delhi NCR & Mumbai',
    year: '2024',
    description:
      'High-impact experiential campaign bringing the brand directly to consumers through interactive pop-up zones.',
    slug: 'btl-brand-activation',
    featured: true,
  },
  {
    id: '5',
    title: 'Amalfi Coast Destination Gala',
    category: 'Destination',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
    ],
    location: 'Ravello, Italy',
    year: '2023',
    description:
      'A cliffside luxury retreat overlooking the Mediterranean with customized dining experiences and fireworks.',
    slug: 'amalfi-destination-gala',
    featured: true,
    span: 'tall',
  },
  {
    id: '6',
    title: 'Custom Exhibition & Stall Fabrication',
    category: 'Exhibitions & Décor',
    image: '/images/Exhibiton final.png',
    images: ['/images/Exhibiton final.png'],
    location: 'Jio World Convention Centre, Mumbai',
    year: '2024',
    description:
      'Architectural 3D exhibition pavilion built with precision engineering and high-end brand lighting.',
    slug: 'exhibition-stall-fabrication',
    featured: false,
    span: 'wide',
  },
  {
    id: '7',
    title: 'Thematic Floral & Ambient Décor',
    category: 'Exhibitions & Décor',
    image: '/images/Decor.png',
    images: ['/images/Decor.png'],
    location: 'Goa',
    year: '2024',
    description:
      'Transforming a heritage venue with bespoke floral installation walls, ambient truss lights, and custom lounge furniture.',
    slug: 'thematic-decor-design',
    featured: false,
  },
  {
    id: '8',
    title: 'Interactive Employee Engagement Drive',
    category: 'Corporate',
    image: '/images/Engagement activities.png',
    images: ['/images/Engagement activities.png'],
    location: 'Bangalore & Hyderabad',
    year: '2024',
    description:
      'Dynamic workplace engagement day filled with gamified challenges, team activities, and branded merchandise.',
    slug: 'employee-engagement-drive',
    featured: false,
  },
  {
    id: '9',
    title: 'Midsummer Night Soirée',
    category: 'Celebrations',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    ],
    location: 'Alibaug Private Estate',
    year: '2023',
    description:
      'An enchanted outdoor evening soiree with warm string lighting, artisan cocktail bars, and live acoustic music.',
    slug: 'midsummer-soiree',
    featured: false,
    span: 'large',
  },
  {
    id: '10',
    title: 'Exclusive Hotel Venue Sourcing & Setup',
    category: 'Corporate',
    image: '/images/Venue.png',
    images: ['/images/Venue.png'],
    location: 'Pan India',
    year: '2024',
    description:
      'Complete end-to-end venue inspection, booking negotiations, and banquet layout execution for 500+ guests.',
    slug: 'venue-sourcing-gala',
    featured: false,
  },
];
