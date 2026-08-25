export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'corporate-events',
    title: 'Corporate Events & Launches',
    description:
      'Designing and executing high-profile corporate product launches, conferences, and executive summits.',
    longDescription:
      'From major tech launches like the Vivo V20 Launch Event at Reliance Corporate Park to corporate meets like Rezolution by SecureKloud — we handle stage design, AV production, branding kiosks, and seamless event flow under one roof.',
    image: '/images/asset4.jpeg',
    icon: 'corporate',
    features: [
      'Product Launches & Roadshows',
      'Corporate Summits & AGMs',
      'Brand Unveils & Stage Setups',
      'AV & Holographic Production',
      'Town Halls & Offsites',
      'End-to-End Event Management',
    ],
  },
  {
    id: 'btl-activations',
    title: 'BTL Activations & Experiential',
    description:
      'Creating high-impact on-ground below-the-line campaigns that drive direct consumer engagement.',
    longDescription:
      'We conceptualise and execute high-engagement BTL campaigns across India — from retail mall activations like Storia sampling drives to public celebrity fitness challenges like the Wellmann Push-Up Challenge at Phoenix Mall.',
    image: '/images/asset3.jpeg',
    icon: 'btl',
    features: [
      'Mall & Retail Activations',
      'Sampling & Product Drives',
      'Celebrity & Influencer Events',
      'Experiential Pop-Up Kiosks',
      'On-Ground Consumer Engagement',
      'Campaign Analytics & Reporting',
    ],
  },
  {
    id: 'stall-fabrication',
    title: 'Stall & Exhibition Fabrication',
    description:
      'Designing and fabricating eye-catching 3D exhibition stalls and branded structures across India.',
    longDescription:
      'Our in-house fabrication team crafts custom exhibition booths, pop-up structures, and architectural stage sets like our featured booth at World of Concrete India (Bombay Exhibition Center). We deliver turn-key installation on time, every time.',
    image: '/images/asset1.jpeg',
    icon: 'fabrication',
    features: [
      'Custom 3D Exhibition Stalls',
      'Branded Pop-Up Installations',
      'Stage & Backdrop Set Fabrication',
      'Signage, Cutouts & Hoardings',
      'Pan-India Transport & Build',
      'On-Site Maintenance & Dismantling',
    ],
  },
  {
    id: 'auto-retail-launches',
    title: 'Automotive & Retail Showroom Events',
    description:
      'Specialized car unveilings, dealership launches, and experiential retail showroom events.',
    longDescription:
      'We bring automotive and retail launches to life with grand staging, red carpet displays, celebrity life-size cutouts, podium fabrication, and lighting setups, as demonstrated in our Nissan Gravite Car Launch in Mumbai.',
    image: '/images/asset5.jpeg',
    icon: 'automotive',
    features: [
      'Car & Vehicle Unveilings',
      'Showroom Opening Events',
      'Celebrity Cutouts & Standees',
      'Red Carpet & Podium Setup',
      'Audio-Visual Lighting Effects',
      'Media & Guest Hospitality',
    ],
  },
  {
    id: 'decor-ambiance',
    title: 'Venue Decor & Entrance Ambiance',
    description:
      'Transforming corporate entrances and venue interiors into opulent, welcoming brand environments.',
    longDescription:
      'From floral arches and 3D illuminated logo entryways to thematic stage backdrops and ambient lighting — as seen in our Rezolution Corporate Meet in Thane — we create memorable arrival experiences for every guest.',
    image: '/images/asset2.jpeg',
    icon: 'decor',
    features: [
      'Floral Arch & Entrance Decor',
      '3D Backlit Logo Signages',
      'Thematic Stage Backdrops',
      'Ambient & Truss Lighting',
      'Photo Booths & Media Walls',
      'Full Site Setup & Tear-down',
    ],
  },
  {
    id: 'customised-gifting',
    title: 'Customised Corporate Gifting',
    description:
      'Curating bespoke corporate hampers, branded merchandise, and event mementos.',
    longDescription:
      'From premium welcome kits and customized gift hampers to branded mementos distributed at major mall activations and corporate galas, our gifting team handles sourcing, custom packaging, and pan-India delivery.',
    image: '/images/asset6.jpeg',
    icon: 'gifting',
    features: [
      'Branded Merchandising',
      'Welcome Kits & Hampers',
      'Event Giveaway Gifts',
      'Personalised Custom Packaging',
      'Bulk Executive Orders',
      'Pan-India Safe Delivery',
    ],
  },
];
