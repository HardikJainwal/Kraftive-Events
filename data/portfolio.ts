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
  'Weddings',
  'Corporate',
  'Celebrations',
  'Luxury Parties',
  'Destination',
];

export const portfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'The Rosewood Wedding',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80',
    ],
    location: 'The Beverly Hills Hotel, CA',
    year: '2024',
    description:
      'An opulent garden wedding featuring 15,000 white roses, crystal canopies, and a live orchestra under the stars.',
    slug: 'rosewood-wedding',
    featured: true,
    span: 'tall',
  },
  {
    id: '2',
    title: 'Apex Tech Summit',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    ],
    location: 'The Plaza, New York',
    year: '2024',
    description:
      'A three-day innovation summit for 800 executives, featuring holographic presentations and a rooftop gala dinner.',
    slug: 'apex-tech-summit',
    featured: true,
    span: 'wide',
  },
  {
    id: '3',
    title: 'Golden Jubilee Gala',
    category: 'Celebrations',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
    ],
    location: 'The Ritz-Carlton, Chicago',
    year: '2024',
    description:
      'A golden-themed 50th anniversary celebration with bespoke table settings, champagne towers, and jazz entertainment.',
    slug: 'golden-jubilee-gala',
    featured: true,
    span: 'large',
  },
  {
    id: '4',
    title: 'Midsummer Night Soirée',
    category: 'Luxury Parties',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    ],
    location: 'Private Estate, Hamptons',
    year: '2023',
    description:
      'An enchanted garden party with floating lanterns, artisan cocktails, and a midnight fireworks display.',
    slug: 'midsummer-night-soiree',
    featured: true,
  },
  {
    id: '5',
    title: 'Amalfi Coast Wedding',
    category: 'Destination',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
    ],
    location: 'Ravello, Italy',
    year: '2023',
    description:
      'A cliffside ceremony overlooking the Mediterranean, followed by an intimate reception in a centuries-old villa.',
    slug: 'amalfi-coast-wedding',
    featured: true,
    span: 'tall',
  },
  {
    id: '6',
    title: 'Noir & Gold Charity Ball',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
    ],
    location: 'The Waldorf Astoria, NYC',
    year: '2023',
    description:
      'A black-tie charity gala raising $2M for arts education, featuring live auctions, gourmet dining, and a surprise concert.',
    slug: 'noir-gold-charity-ball',
    featured: false,
    span: 'wide',
  },
  {
    id: '7',
    title: 'Enchanted Sweet Sixteen',
    category: 'Celebrations',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&q=80',
    ],
    location: 'The Breakers, Palm Beach',
    year: '2024',
    description:
      'A fairy-tale sweet sixteen with custom floral installations, a DJ set, and an enchanted forest-themed dessert room.',
    slug: 'enchanted-sweet-sixteen',
    featured: false,
  },
  {
    id: '8',
    title: 'Santorini Luxury Retreat',
    category: 'Destination',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80',
    ],
    location: 'Santorini, Greece',
    year: '2023',
    description:
      'A five-day corporate retreat combining team-building activities, wellness sessions, and an iconic sunset dinner.',
    slug: 'santorini-luxury-retreat',
    featured: false,
  },
  {
    id: '9',
    title: 'Royal Engagement Dinner',
    category: 'Celebrations',
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&q=80',
    ],
    location: 'Château de Versailles, France',
    year: '2024',
    description:
      'An intimate yet lavish engagement dinner for 60 guests in the private gardens of a French château.',
    slug: 'royal-engagement-dinner',
    featured: false,
    span: 'large',
  },
  {
    id: '10',
    title: 'Winter Wonderland Masquerade',
    category: 'Luxury Parties',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    ],
    location: 'Aspen, Colorado',
    year: '2024',
    description:
      'A snow-dusted masquerade ball with ice sculptures, a live string quartet, and a midnight champagne toast under the stars.',
    slug: 'winter-wonderland-masquerade',
    featured: false,
  },
];
