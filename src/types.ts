export type ProductCategory = 
  | 'Semua'
  | 'Edukasi & Flashcard'
  | 'DIY Craft & Kit'
  | 'Souvenir & Keychain'
  | 'Bouquet & Gift'
  | 'Stationery & Buku';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  stock: number;
  image: string;
  galleryImages?: string[];
  description: string;
  features?: string[];
  badge?: string;
  rating: number;
  soldCount: number;
  shopeeUrl: string;
  lynkIdUrl: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNote?: string;
}

export type PaymentType = 
  | 'qris'
  | 'bca_va'
  | 'mandiri_va'
  | 'bri_va'
  | 'bni_va'
  | 'gopay'
  | 'dana'
  | 'ovo'
  | 'shopeepay'
  | 'manual_bca'
  | 'manual_mandiri';

export interface PaymentOption {
  id: PaymentType;
  name: string;
  category: 'qris' | 'va' | 'ewallet' | 'manual';
  accountNumber?: string;
  accountName?: string;
  instructions: string[];
  badge?: string;
  iconName: string;
}

export type OrderStatus = 
  | 'menunggu_pembayaran'
  | 'terverifikasi'
  | 'dikemas'
  | 'dikirim'
  | 'selesai'
  | 'dibatalkan';

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentType: PaymentType;
  paymentStatus: 'pending' | 'verified' | 'failed';
  orderStatus: OrderStatus;
  paymentProof?: string;
  resiNumber?: string;
  courier?: string;
  verifiedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'admin' | 'system';
  senderName: string;
  text: string;
  time: string;
  attachment?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer';
  avatar?: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  subTagline: string;
  year: string;
  values: string[];
  phone: string;
  whatsappNumber: string; // e.g. 6281234567890
  tiktokHandle: string;
  tiktokUrl: string;
  shopeeStoreName: string;
  shopeeUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  lynkIdHandle: string;
  lynkIdUrl: string;
  address: string;
  email: string;
  operationalHours: string;
}
