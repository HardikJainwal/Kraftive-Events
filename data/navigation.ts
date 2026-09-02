export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export const ctaNav = {
  label: 'Plan Your Event',
  href: '/contact',
};

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/kraftive_events/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61584206018149', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/kraftive-events-media/?viewAsMember=true', icon: 'linkedin' },
  { label: 'WhatsApp', href: 'https://wa.me/919082097808', icon: 'whatsapp' },
];
