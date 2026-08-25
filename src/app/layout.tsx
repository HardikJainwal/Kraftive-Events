import type { Metadata } from 'next';
import { playfair, dmSans } from '@/lib/fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { EventModalProvider } from '@/context/EventModalContext';
import PlanEventModal from '@/components/modals/PlanEventModal';
import { siteConfig } from '../../data/siteConfig';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: siteConfig.seo.titleTemplate,
    default: siteConfig.seo.defaultTitle,
  },
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    url: siteConfig.seo.url,
    siteName: siteConfig.brand.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
  },
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal font-body">
        <EventModalProvider>
          <SmoothScrollProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-charcoal focus:px-4 focus:py-2 focus:font-semibold"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <PlanEventModal />
          </SmoothScrollProvider>
        </EventModalProvider>
      </body>
    </html>
  );
}

