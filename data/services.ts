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
    title: 'Venue',
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
    title: 'BTL',
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
    title: 'Exhibition',
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
    title: 'Decor',
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
    id: 'customised-gifting',
    title: 'Gifting',
    description:
      'Bespoke corporate and luxury event gifting curated to reflect your brand identity and express appreciation.',
    longDescription:
      'We design, curate, and deliver premium customised gifting solutions tailored for corporate milestones, client appreciation, employee recognition, festive occasions, and luxury events. From bespoke packaging and branded merchandise to artisanal hampers and personalized keepsakes, we handle conceptualization, sourcing, custom branding, packaging, and seamless pan-India delivery.',
    image: '/images/Customised gifting.png',
    pointers: [
      'Customised Corporate Gifts',
      '3d Models, Merchandise & More..',
      'Quality Products with Timely Delivery',
    ],
    features: [
      'Corporate Milestone Gifts',
      'Client Appreciation Hampers',
      'Festive & Seasonal Gift Boxes',
      'Bespoke Executive Giveaways',
      'Employee Welcome & Joining Kits',
      'Custom Branded Merchandise',
    ],
  },
  {
    id: 'engagement-activities',
    title: 'Engagement Activities',
    description:
      'Creating interactive experiences that keep guests engaged, entertained and connected throughout your event.',
    longDescription:
      'We create interactive experiences that keep guests engaged, entertained and connected throughout your event. From instant photo booths and live caricature artists to interactive games, performers and creative engagement zones, we curate activities that complement your event theme and give guests memorable moments to take away.',
    image: '/images/Engagement activities.png',
    pointers: [
      'Instant Photo Booths & Performers',
      'Interactive Games & Challenges',
      'Custom Engagement Concepts',
    ],
    features: [
      'Instant Photo Booths',
      'Live Artists & Performers',
      'Interactive Games & Challenges',
      'Live Printing & Personalisation',
      'Creative Workshops & Activities',
      'Customised Engagement Concepts',
    ],
  },
  {
    id: 'branding',
    title: 'Branding',
    description:
      'High-visibility outdoor and transit branding across key consumer touchpoints to build reach and frequency.',
    longDescription:
      'We take your brand beyond traditional media with high-visibility outdoor and transit branding across key consumer touchpoints. From hoardings and bus shelters to train, bus, auto and retail branding, we help brands build reach, frequency and strong local visibility through strategically planned outdoor campaigns.',
    image: '/images/Branding.png',
    pointers: [
      'Hoardings & Outdoor Media',
      'Railway, BEST & Transit Branding',
      'Retail & High-Street Branding',
    ],
    features: [
      'Hoardings & Outdoor Media',
      'Railway & BEST Branding',
      'Auto & Cab Branding',
      'Retail & Store Branding',
      'Mall & High-Street Branding',
      'Society & Residential Branding',
    ],
  },
  {
    id: 'weddings',
    title: 'Wedding',
    description:
      'Creating beautifully curated wedding experiences tailored to your style, traditions and vision.',
    longDescription:
      'From intimate celebrations to grand destination weddings, we create beautifully curated wedding experiences tailored to your style, traditions and vision. From venue selection and décor to entertainment, guest management and on-ground execution, our team handles every detail to make your special celebrations seamless, memorable and stress-free.',
    image: '/images/Weddings.png',
    pointers: [
      'Wedding Planning & Coordination',
      'Venue Sourcing & Theme Décor',
      'Hospitality & Logistics',
    ],
    features: [
      'Wedding Planning & Coordination',
      'Venue Sourcing & Management',
      'Theme Décor, Mandap & Floral Styling',
      'Entertainment & Artist Management',
      'Wedding Photography & Videography',
      'Guest Hospitality & Event Logistics',
    ],
  },
  {
    id: 'ai-films',
    title: 'AI Films',
    description:
      'Using the power of AI filmmaking and creative technology to turn ideas into visually stunning cinematic experiences.',
    longDescription:
      'From personalised stories to cinematic brand films, we use the power of AI filmmaking and creative technology to turn ideas, memories and imagination into visually stunning experiences. Whether it’s your love story, a special invitation or a story you’ve always wanted to see on screen, we create personalised AI films that feel cinematic, emotional and uniquely yours.',
    image: '/images/ai-films.png',
    pointers: [
      'Personalised Invitation Videos',
      'AI Wedding & Couple Films',
      'AI Brand & Storytelling Films',
    ],
    features: [
      'Personalised Invitation Videos',
      'Your Story Through AI',
      'AI Wedding & Couple Films',
      'AI Short Films & Storytelling',
      'AI Brand Films & Advertisements',
      'AI Social Media & Promotional Films',
    ],
  },
];
