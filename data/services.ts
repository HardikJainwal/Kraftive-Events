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
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
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
      'RWA & Society Activationss',
      'Roadshows & Mobile Activations',
    ],
  },
  {
    id: 'stall-fabrication',
    title: 'Exhibition & Fabrication',
    description:
      'Designing and fabricating eye-catching exhibition stalls and branded structures that command attention.',
    longDescription:
      'We design and build impactful exhibition stalls and branded spaces that attract attention, communicate your brand story and maximise visitor engagement. From creative 3D concepts and space planning to fabrication, branding and on-site installation, our in- house team manages the entire process for a seamless, execution-ready experience.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
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
    id: 'customised-gifting',
    title: 'Customised Gifting',
    description:
      'Curating bespoke corporate gifts and event mementos that leave a lasting impression long after the event.',
    longDescription:
      'From premium welcome kits and branded merchandise to luxury hampers and personalised keepsakes, our gifting team sources, designs, and delivers customised gifts that reflect your brand values and resonate with recipients.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
    pointers: [
      ' Customised Corporate Gifts',
      '3d Models, Merchandise & More..',
      'Quality Products with Timely Delivery',
    ],
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
