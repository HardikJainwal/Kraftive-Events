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
  { label: 'Instagram', href: 'https://instagram.com/kcevents', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/kcevents', icon: 'facebook' },
  { label: 'Pinterest', href: 'https://pinterest.com/kcevents', icon: 'pinterest' },
  { label: 'Twitter', href: 'https://twitter.com/kcevents', icon: 'twitter' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/kcevents', icon: 'linkedin' },
];
