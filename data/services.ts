export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  features: string[];
  pointers: string[];
}

export const services: Service[] = [
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    description:
      'Elevating your brand with impeccably planned corporate events that leave a lasting impression on every attendee.',
    longDescription:
      'From product launches, town halls and award nights to conferences, roadshows and team offsites — we design and execute corporate events that reflect your brand identity and create memorable audience experiences. With key elements managed in-house, we ensure greater control, seamless execution and consistent quality from concept to completion.',
    image: '/images/Corporate events.png',
    pointers: [
      'End to End Management',
      'Pan Indian Network',
      'Scalable Event Solutions',
    ],
    features: [
      'Product Launches',
      'Corporate Conferences & Summits',
      'Award Nights & Gala Dinners',
      'Sales Meets & Annual Meets',
      'Team Building & Corporate Offsites',
      'Employee Engagement Events',
    ],
  },
  {
    id: 'venue-sourcing',
    title: 'Venue Sourcing',
    description:
      'Finding the perfect space for your event — from intimate boardrooms to grand banquet halls across India.',
    longDescription:
      'We help you find the right venue for every event — from premium hotels and banquet halls to unique event spaces across Mumbai and India. Our team shortlists venues based on your event format, guest count, budget and brand requirements, while handling site visits, negotiations, vendor coordination and logistics to ensure a smooth, hassle-free experience.',
    image: '/images/Venue.png',
    pointers: [
      'Transparent Pricing, 0% commission',
      'Verified Venue Partners',
      'Exclusive Venue Network',
    ],
    features: [
      'Premium Hotels & Banquet Halls',
      'Convention & Exhibition Centres',
      'Resorts & Destination Venues',
      'Corporate Meeting & Conference Spaces',
      'Site Visits & Venue Inspection',
      'End-to-End Venue Coordination',
    ],
  },
  {
    id: 'btl-activations',
    title: 'BTL Activations',
    description:
      'Creating high-impact below-the-line activations that drive genuine engagement with your target audience.',
    longDescription:
      'We create and execute high-impact BTL campaigns that take your brand directly to the consumer. From mall activations and retail promotions to experiential campaigns, sampling drives and RWA outreach, we combine creative concepts with strong on-ground execution to drive visibility, engagement and measurable consumer interaction.',
    image: '/images/Btl activation.png',
    pointers: [
      'Pan India Activation Network',
      'On Ground Execution Experts',
      'Customised Engagement Ideas',
    ],
    features: [
      'Mall & Retail Activations',
      'On-Ground Brand Promotions',
      'Experiential Marketing',
      'Product Sampling & Demonstrations',
      'RWA & Society Activations',
      'Roadshows & Mobile Activations',
    ],
  },
  {
    id: 'stall-fabrication',
    title: 'Exhibition & Fabrication',
    description:
      'Designing and fabricating eye-catching exhibition stalls and branded structures that command attention.',
    longDescription:
      'We design and build impactful exhibition stalls and branded spaces that attract attention, communicate your brand story and maximise visitor engagement. From creative 3D concepts and space planning to fabrication, branding and on-site installation, our in-house team manages the entire process for a seamless, execution-ready experience.',
    image: '/images/Exhibiton final.png',
    pointers: [
      'Creative Stall Design Concepts',
      'In House Fabrication Team',
      'No Vendor Dependency',
    ],
    features: [
      'Custom Exhibition Stall Design',
      '3D Stall Concepts & Visualisation',
      'Stall Fabrication & Production',
      'Branded Pop-Up Structures',
      'Stage & Set Design & Fabrication',
      'Retail & Brand Installations',
    ],
  },
  {
    id: 'decor',
    title: 'Décor & Design',
    description:
      'Transforming blank spaces into immersive brand environments with thoughtful, high-impact décor.',
    longDescription:
      'We create immersive event environments that bring your theme, brand and vision to life. From elegant floral styling and thematic décor to statement stages, ambient lighting and branded installations, our team manages the entire journey — from concept development and mood boards to final setup and dismantling.',
    image: '/images/Decor.png',
    pointers: [
      'Theme Based Decor Solutions',
      'Every Detail Crafted To Perfection',
      'Customised Concepts, Perfect Execution',
    ],
    features: [
      'Thematic Stage & Set Design',
      'Floral & Botanical Décor',
      'Ambient, Architectural & Truss Lighting',
      'Branded Photo Walls & Backdrops',
      'Table, Lounge & Venue Styling',
      'Custom Props & Decorative Installations',
    ],
  },
  {
    id: 'engagement-activities',
    title: 'Engagement Activities',
    description:
      'Creating high-impact employee and brand engagement activities that captivate attendees and elevate your brand.',
    longDescription:
      'We design and execute interactive engagement activities, employee engagement events, team building, and experiential brand activations. We turn event spaces into vibrant interactive hubs that foster connections and leave a lasting impression.',
    image: '/images/Engagement activities.png',
    pointers: [
      'Interactive Engagement',
      'Customized Concepts',
      'Pan-India Execution',
    ],
    features: [
      'Employee Engagement Events',
      'Interactive Brand Booths',
      'Team Building & Offsites',
      'Experiential Marketing Drives',
      'Gamified Event Setup',
      'On-Ground Engagement',
    ],
  },
];
