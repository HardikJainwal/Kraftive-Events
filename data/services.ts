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
    title: 'Corporate Events',
    description:
      'Elevating your brand with impeccably planned corporate events that leave a lasting impression on every attendee.',
    longDescription:
      'From product launches, town halls and award nights to conferences, roadshows, and team offsites — we design and execute corporate events that align with your brand identity while delivering exceptional audience experiences. Every detail is managed in-house for a seamless production.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    icon: '🏢',
    features: [
      'Product Launches & Roadshows',
      'Award & Gala Nights',
      'Conference Management',
      'Team Building Events',
      'Town Halls & AGMs',
      'End-to-End Production',
    ],
  },
  {
    id: 'venue-sourcing',
    title: 'Venue Sourcing',
    description:
      'Finding the perfect space for your event — from intimate boardrooms to grand banquet halls across India.',
    longDescription:
      'Our venue sourcing experts tap into an extensive network of properties across Mumbai and India to match your event brief, budget, and guest count. We handle site visits, negotiations, and all logistics so you focus on the experience.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    icon: '📍',
    features: [
      'Pan-India Venue Network',
      'Site Visits & Shortlisting',
      'Budget Negotiation',
      'Capacity & AV Assessment',
      'Logistics Coordination',
      'Preferred-Vendor Tie-ups',
    ],
  },
  {
    id: 'btl-activations',
    title: 'BTL Activations',
    description:
      'Creating high-impact below-the-line activations that drive genuine engagement with your target audience.',
    longDescription:
      'We conceptualise and execute BTL campaigns that cut through the noise — mall activations, on-ground promotions, experiential marketing, product sampling, and consumer engagement drives. Our on-ground team ensures every touchpoint is on-brand and on-target.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    icon: '🎯',
    features: [
      'Mall & Retail Activations',
      'On-Ground Promotions',
      'Experiential Marketing',
      'Product Sampling Drives',
      'Consumer Engagement',
      'Campaign Reporting',
    ],
  },
  {
    id: 'stall-fabrication',
    title: 'Stall & Fabrication',
    description:
      'Designing and fabricating eye-catching exhibition stalls and branded structures that command attention.',
    longDescription:
      'Our in-house fabrication team builds custom exhibition stalls, pop-up structures, branded installations, and event furniture from concept to completion. We deliver on time, every time — so you walk in ready to impress.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    icon: '🛠️',
    features: [
      'Custom Exhibition Stalls',
      'Branded Pop-Up Structures',
      'Stage & Set Fabrication',
      'Signage & Hoardings',
      'Modular & Reusable Designs',
      'Pan-India Installation',
    ],
  },
  {
    id: 'decor',
    title: 'Décor & Design',
    description:
      'Transforming blank spaces into immersive brand environments with thoughtful, high-impact décor.',
    longDescription:
      'From floral arrangements and thematic set-ups to large-scale stage design and ambient lighting, our décor team crafts visual experiences that reinforce your brand and delight your guests. We handle everything from concept boards to final installation.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    icon: '✨',
    features: [
      'Thematic Stage Design',
      'Floral & Botanical Décor',
      'Ambient & Truss Lighting',
      'Branded Photo Walls',
      'Table & Lounge Styling',
      'Full Install & Strike',
    ],
  },
 
  {
    id: 'customised-gifting',
    title: 'Customised Gifting',
    description:
      'Curating bespoke corporate gifts and event mementos that leave a lasting impression long after the event.',
    longDescription:
      'From premium welcome kits and branded merchandise to luxury hampers and personalised keepsakes, our gifting team sources, designs, and delivers customised gifts that reflect your brand values and resonate with recipients.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
    icon: '🎁',
    features: [
      'Branded Merchandise',
      'Welcome Kits & Hampers',
      'Luxury Gift Curation',
      'Personalised Packaging',
      'Bulk Corporate Orders',
      'Pan-India Delivery',
    ],
  },
];
