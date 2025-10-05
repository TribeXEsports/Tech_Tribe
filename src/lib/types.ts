
import type { ImagePlaceholder } from './placeholder-images';

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  quote: string;
  image: ImagePlaceholder;
};

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: ImagePlaceholder;
  tags?: string[];
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'upcoming' | 'past';
  image?: ImagePlaceholder;
};
