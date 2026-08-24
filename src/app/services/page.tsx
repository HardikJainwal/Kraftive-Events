import type { Metadata } from 'next';
import ServicesPage from './ServicesPage';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our full range of premium event planning services — weddings, corporate events, luxury parties, birthday celebrations, private events, and destination celebrations.',
  openGraph: {
    title: 'Services | Kraftive Events & Media',
    description:
      'Premium event planning services tailored for perfection.',
  },
};

export default function Services() {
  return <ServicesPage />;
}
