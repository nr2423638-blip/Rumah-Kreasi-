export interface Product {
  id: string;
  name: string;
  category: 'Buket & Bunga' | 'Akrilik & Lampu' | 'Frame 3D' | 'Rajut & Souvenir' | 'Hampers & Gift Box' | 'Craft Lainnya';
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  shopeeUrl: string;
  lynkIdUrl: string;
  tags?: string[];
  isBestSeller?: boolean;
  createdAt?: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  photoUrl?: string;
  date: string;
  verifiedPurchase: boolean;
  batamArea?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type PaymentMethod = 'qris' | 'bank_transfer' | 'ewallet';
export type PaymentStatus = 'pending' | 'verified' | 'paid';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerWhatsapp: string;
  customerEmail?: string;
  customerAddress: string;
  batamDistrict: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentChannel?: string; // e.g. "BCA", "Mandiri", "QRIS All Payment", "GoPay"
  paymentStatus: PaymentStatus;
  transferProofUrl?: string;
  createdAt: string;
  notes?: string;
  isOutsideBatam?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  whatsapp?: string;
  address?: string;
  batamDistrict?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export const RUMAH_KREASI_CONTACTS = {
  name: 'Rumah Kreasi',
  tagline: 'Handmade Crafts, Personalized Gifts & Creative Souvenirs',
  city: 'Kota Batam, Kepulauan Riau',
  whatsappNumber: '+62 851-2800-2246',
  whatsappClean: '6285128002246',
  shopeeName: 'rumahkreasi.btm',
  shopeeUrl: 'https://shopee.co.id/rumahkreasi.btm',
  lynkidName: 'rumahkreasi060224_',
  lynkidUrl: 'https://lynk.id/rumahkreasi060224_',
  instagramName: 'rumahkreasi.btm',
  instagramUrl: 'https://instagram.com/rumahkreasi.btm',
  tiktokName: 'rumahkreasi.btm',
  tiktokUrl: 'https://tiktok.com/@rumahkreasi.btm',
};

export const BATAM_DISTRICTS = [
  'Batam Kota',
  'Lubuk Baja (Nagoya)',
  'Bengkong',
  'Batu Aji',
  'Sekupang',
  'Nongsa',
  'Batu Ampar',
  'Sagulung',
  'Sei Beduk',
  'Belakang Padang',
  'Bulang',
  'Galang'
];
