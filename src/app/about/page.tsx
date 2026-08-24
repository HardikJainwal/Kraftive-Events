import type { Metadata } from 'next';
import AboutPage from './AboutPage';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Discover the story behind Kraftive Events & Media — delivering impactful events and brand experiences across India with passion and precision.',
  openGraph: {
    title: 'About Us | Kraftive Events & Media',
    description:
      'Discover the story behind Kraftive Events & Media — full-service event management agency based in Mumbai.',
  },
};

export default function About() {
  return <AboutPage />;
}
