import type { Metadata } from 'next';
import PortfolioPage from './PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explore our portfolio of extraordinary events — from luxury weddings and corporate galas to destination celebrations and private parties.',
  openGraph: {
    title: 'Portfolio | Kraftive Events & Media',
    description:
      'A curated collection of our most extraordinary celebrations.',
  },
};

export default function Portfolio() {
  return <PortfolioPage />;
}
