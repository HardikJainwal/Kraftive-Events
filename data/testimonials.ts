export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  eventType: string;
  location: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'Working with Kraftive for our corporate event was honestly a great experience. Right from the planning stage, the team was involved, responsive and always ready to help. On the event day, everything was taken care of so smoothly that we could actually focus on our guests and enjoy the event. The team truly went the extra mile.',
    name: 'MG',
    role: 'Client',
    eventType: 'Corporate Event',
    location: 'Mumbai, India',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'Exhibitions can get quite stressful, especially when there are so many things to coordinate. Kraftive made the entire process much easier for us. They understood what we wanted, gave us a great-looking stall and handled the execution really well. We were genuinely happy with how it turned out.',
    name: 'CAC',
    role: 'Client',
    eventType: 'Exhibition',
    location: 'Mumbai, India',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'We had a very specific vision for the décor, and Kraftive really understood what we had in mind. What I loved most was the attention to the little details. When we finally saw the setup, it looked even better than we had imagined. It completely changed the feel of the space.',
    name: 'Luna et Sol',
    role: 'Client',
    eventType: 'Décor',
    location: 'Mumbai, India',
    rating: 5,
  },
  {
    id: '4',
    quote:
      'Our BTL activation with Kraftive was a really smooth experience. The team was energetic, hands-on and very involved throughout the execution. Whenever something came up, they were quick to handle it. The activation turned out really well, and we were happy with the overall response from the audience.',
    name: 'Godrej',
    role: 'Client',
    eventType: 'BTL Activation',
    location: 'Mumbai, India',
    rating: 5,
  },
];
