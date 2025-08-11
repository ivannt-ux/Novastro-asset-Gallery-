export interface Asset {
  id: string;
  name: string;
  description: string;
  image: string;
  events: { date: string; title: string; description: string }[];
}

export const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Vintage Rolex",
    description: "A 1965 Rolex Submariner with original box and papers.",
    image: "/assets/rolex.jpg",
    events: [
      { date: "1965", title: "Manufactured", description: "Produced in Geneva, Switzerland." },
      { date: "1970", title: "First Sale", description: "Sold to first owner in New York City." },
      { date: "2021", title: "Restored", description: "Full restoration by Rolex specialists." },
    ],
  },
  {
    id: "2",
    name: "Classic Painting",
    description: "Oil painting by unknown 18th-century artist, recently appraised.",
    image: "/assets/painting.jpg",
    events: [
      { date: "1750", title: "Created", description: "Painted in France during Rococo period." },
      { date: "1998", title: "Auctioned", description: "Sold at Sotheby’s for $45,000." },
      { date: "2024", title: "Exhibited", description: "Displayed at Novastro Art Gallery." },
    ],
  },
];
