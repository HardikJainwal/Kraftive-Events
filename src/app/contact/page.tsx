import type { Metadata } from 'next';
import ContactPage from './ContactPage';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Kraftive Events & Media to start planning your event. Fill out our inquiry form and our team will reach out within 24 hours.',
  openGraph: {
    title: 'Contact Us | Kraftive Events & Media',
    description:
      'Start planning your event with Kraftive Events & Media.',
  },
};

export default function Contact() {
  return <ContactPage />;
}
