import { Product } from "../types/product";

export const COLORS = {
  background: "#F7E7D3", // Cream
  card: "#FFFFFF",       // White
  primary: "#E8C999",    // Beige
  text: "#1C1C1C",       // Dark Gray
  subtitle: "#8B8B8B",   // Light Gray
  accent: "#C68A4D",     // Light Brown
};

export const products: Product[] = [
  {
    id: "1",
    name: "Filtered Coffee",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "2",
    name: "Turkish Coffee",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "3",
    name: "Latte Coffee",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "4",
    name: "Cold Brew",
    price: 7.49,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=500&q=80",
  },
];