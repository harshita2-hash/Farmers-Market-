export interface Product {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Grains' | 'Dairy' | 'Spices' | 'Honey & Natural Foods';
  price: number;
  unit: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  farmName: string;
  farmerId: string;
  nutrition: {
    calories: string;
    carbs: string;
    protein: string;
    fat: string;
  };
  inStock: boolean;
  isPopular: boolean;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  specialty: string;
  image: string;
  bio: string;
  story: string;
  productsCount: number;
  rating: number;
  yearsPartnered: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  metric: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Customer' | 'Farmer' | 'Business Owner';
  avatar: string;
  rating: number;
  content: string;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  role: 'customer' | 'farmer';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: string;
}
