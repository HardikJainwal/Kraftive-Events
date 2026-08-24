export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  eventType: string;
  location: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'KC Events transformed our vision into a breathtaking reality. Every flower, every light, every note of music was exactly as we dreamed — and more. Our wedding was truly the most magical day of our lives.',
    name: 'Sophia & James Bennett',
    role: 'Newlyweds',
    eventType: 'Wedding',
    location: 'Beverly Hills, CA',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'From the initial concept to the final curtain call, the KC Events team delivered an award show-caliber corporate gala. Our investors and partners were genuinely blown away. This is the standard we\'ll hold every event to going forward.',
    name: 'David Chen',
    role: 'CEO, Apex Ventures',
    eventType: 'Corporate Gala',
    location: 'New York, NY',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'I wanted something truly unforgettable for my 40th, and KC Events delivered beyond my wildest imagination. The attention to detail, the creativity, the surprise elements — it was like stepping into a dream. My guests are still talking about it months later.',
    name: 'Isabella Rivera',
    role: 'Birthday Celebration',
    eventType: 'Birthday Party',
    location: 'Miami, FL',
    rating: 5,
  },
  {
    id: '4',
    quote:
      'Planning a destination wedding in Italy seemed overwhelming until we met the KC Events team. They handled everything — from villa scouting to vendor coordination — with grace and professionalism. It was the most beautiful day of our lives, in the most beautiful place on earth.',
    name: 'Emily & Michael Thompson',
    role: 'Newlyweds',
    eventType: 'Destination Wedding',
    location: 'Ravello, Italy',
    rating: 5,
  },
];
