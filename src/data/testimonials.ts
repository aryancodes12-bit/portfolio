export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number; // 1-5
  relationship: string; // e.g. "Manager", "Colleague", "Client"
}

// Replace these with real testimonials from colleagues, managers, or clients
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    title: "Engineering Manager",
    company: "TechCorp India",
    avatar: "", // Add real avatar URL
    quote:
      "Aryan consistently delivers clean, well-architected code. His ability to break down complex problems into elegant solutions is impressive. One of the most driven developers I've worked with.",
    rating: 5,
    relationship: "Manager",
  },
  {
    id: "2",
    name: "Priya Patel",
    title: "Senior Developer",
    company: "StartupX",
    avatar: "",
    quote:
      "Working with Aryan was a fantastic experience. He picked up new technologies incredibly fast and always brought creative ideas to the table. His full-stack skills are top-notch.",
    rating: 5,
    relationship: "Colleague",
  },
  {
    id: "3",
    name: "Vikram Desai",
    title: "Product Lead",
    company: "InnovateLabs",
    avatar: "",
    quote:
      "Aryan has an exceptional eye for both functionality and design. He built our entire dashboard frontend and the result exceeded all expectations. Highly recommend.",
    rating: 5,
    relationship: "Client",
  },
  {
    id: "4",
    name: "Ananya Gupta",
    title: "Tech Lead",
    company: "CloudScale",
    avatar: "",
    quote:
      "Aryan's attention to performance optimization and clean code practices is outstanding. He doesn't just write code — he engineers solutions with scalability in mind.",
    rating: 5,
    relationship: "Colleague",
  },
];
