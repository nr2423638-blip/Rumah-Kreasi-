import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { AdminDashboard } from './components/AdminDashboard';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Product, ProductCategory } from './types';
import { 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Heart, 
  ShieldCheck, 
  Truck, 
  QrCode, 
  Star, 
  Grid,
  Filter,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    activeTab, 
    setActiveTab, 
    storeInfo,
    currentUser,
    setIsChatOpen
  } = useStore();

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [directBuyItem, setDirectBuyItem] = useState<{ product: Product; quantity: number; note?: string } | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories: ProductCategory[] = [
    'Semua',
    'Edukasi & Flashcard',
    'DIY Craft & Kit',
    'Souvenir & Keychain',
    'Bouquet & Gift',
    'Stationery & Buku'
  ];

  // Filtering products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const handleInstantBuy = (product: Product, quantity = 1, note?: string) => {
    setDirectBuyItem({ product, quantity, note });
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckoutFromCart = () => {
    setDirectBuyItem(null); // Use whole cart
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF8F2] text-[#433833] selection:bg-[#FF8058] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* ================= VIEW: HOME ================= */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            
            {/* Hero Banner with Brand Identity */}
            <HeroBanner />

            {/* Category Navigation Pills */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-2 mb-6">
                <span className="text-xs font-bold text-[#FF694B] uppercase tracking-wider">
                  Koleksi Pilihan
                </span>
                <h2 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-[#44352D]">
                  Kategori Produk Rumah Kreasi
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { name: 'Edukasi & Flashcard' as ProductCategory, icon: '🔤', desc: 'Kartu Pintar & Balok' },
                  { name: 'DIY Craft & Kit' as ProductCategory, icon: '🎨', desc: 'Melukis & Macrame' },
                  { name: 'Souvenir & Keychain' as ProductCategory, icon: '🔑', desc: 'Gantungan Kunci & Akrilik' },
                  { name: 'Bouquet & Gift' as ProductCategory, icon: '💐', desc: 'Buket Bunga Kering' },
                  { name: 'Stationery & Buku' as ProductCategory, icon: '📒', desc: 'Jurnal & Stiker Vinyl' }
                ].map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setActiveTab('catalog');
                    }}
                    className="p-4 rounded-3xl bg-[#FFFDF9] hover:bg-[#FFF3EC] border-2 border-[#EBDCCF] hover:border-[#FF9E80] transition-all transform hover:-translate-y-1 text-center space-y-1.5 shadow-2xs group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#F7EFE6] group-hover:bg-white flex items-center justify-center text-2xl mx-auto transition-colors">
                      {cat.icon}
                    </div>
                    <div className="font-fredoka text-xs sm:text-sm font-bold text-[#44352D] group-hover:text-[#FF694B] leading-tight">
                      {cat.name}
                    </div>
                    <p className="text-[10px] text-[#8C7A70]">
                      {cat.desc}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* Featured Best Seller Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#EBDCCF] pb-4">
                <div>
                  <span className="text-xs font-bold text-[#558053] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    PALING DIMINATI PELANGGAN
                  </span>
                  <h2 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-[#44352D] mt-0.5">
                    Produk Unggulan & Best Seller
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('Semua');
                    setActiveTab('catalog');
                  }}
                  className="text-xs sm:text-sm font-bold text-[#FF694B] hover:text-[#E25330] flex items-center gap-1 group cursor-pointer"
                >
                  <span>Lihat Semua Katalog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {products.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                    onInstantBuy={(p) => handleInstantBuy(p)}
                  />
                ))}
              </div>
            </section>

            {/* Multi-Channel Purchase Integration Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-[#FFF0E8] via-[#FFF9F3] to-[#F1F6F0] rounded-3xl border-2 border-[#EBDCCF] p-6 sm:p-10 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  <div className="lg:col-span-8 space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FFE5DC] text-[#DE4E2B] text-xs font-bold border border-[#FFCAB8]">
                      🛍️ FLEKSIBILITAS PEMESANAN
                    </span>
                    <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-[#44352D]">
                      Beli Langsung di Web, Shopee, atau Lynk.id!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5D53] leading-relaxed">
                      Nikmati kemudahan checkout instan di website dengan pembayaran <strong>QRIS otomatis</strong>, <strong>Virtual Account semua bank</strong>, atau pesan lewat toko resmi kami di <strong>Shopee</strong> dan <strong>Lynk.id</strong>. Pesanan langsung tersambung notifikasi otomatis ke WhatsApp Admin!
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
                    <a
                      href={storeInfo.shopeeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-2xl bg-[#EE4D2D] hover:bg-[#D93D1E] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <span>Buka Toko Shopee Rumah Kreasi</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={storeInfo.lynkIdUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-2xl bg-[#6351D9] hover:bg-[#5240C4] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <span>Buka Halaman Lynk.id Rumah Kreasi</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </div>
            </section>

            {/* Why Rumah Kreasi Pillars & Customer Feedback */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#558053] uppercase tracking-wider">
                  KOMITMEN KUALITAS
                </span>
                <h2 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-[#44352D]">
                  Nilai Utama Rumah Kreasi
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FFFDF9] p-5 rounded-3xl border border-[#EBDCCF] shadow-2xs space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF0EB] text-[#FF694B] flex items-center justify-center text-xl font-bold">
                    🎨
                  </div>
                  <h4 className="font-fredoka text-base font-bold text-[#44352D]">Kreatif & Orisinal</h4>
                  <p className="text-xs text-[#7A6960] leading-relaxed">
                    Setiap desain dibuat dengan penuh ketelitian dan keceriaan warna pastel yang disukai anak maupun dewasa.
                  </p>
                </div>

                <div className="bg-[#FFFDF9] p-5 rounded-3xl border border-[#EBDCCF] shadow-2xs space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#EAF5E9] text-[#4F854B] flex items-center justify-center text-xl font-bold">
                    🧠
                  </div>
                  <h4 className="font-fredoka text-base font-bold text-[#44352D]">Edukatif & Bermanfaat</h4>
                  <p className="text-xs text-[#7A6960] leading-relaxed">
                    Mendukung perkembangan kognitif, daya ingat, dan motorik anak lewat media belajar yang menyenangkan.
                  </p>
                </div>

                <div className="bg-[#FFFDF9] p-5 rounded-3xl border border-[#EBDCCF] shadow-2xs space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF8E6] text-[#D98E16] flex items-center justify-center text-xl font-bold">
                    ✨
                  </div>
                  <h4 className="font-fredoka text-base font-bold text-[#44352D]">Berkualitas Premium</h4>
                  <p className="text-xs text-[#7A6960] leading-relaxed">
                    Menggunakan bahan ramah anak, laminasi tahan air, sudut membulat, dan cat non-toxic bersertifikasi.
                  </p>
                </div>

                <div className="bg-[#FFFDF9] p-5 rounded-3xl border border-[#EBDCCF] shadow-2xs space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#F4F1FF] text-[#6351D9] flex items-center justify-center text-xl font-bold">
                    💌
                  </div>
                  <h4 className="font-fredoka text-base font-bold text-[#44352D]">Bermakna & Personal</h4>
                  <p className="text-xs text-[#7A6960] leading-relaxed">
                    Setiap kartu kado dan buket dapat dipersonalisasi dengan pesan khusus untuk orang tersayang.
                  </p>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ================= VIEW: CATALOG ================= */}
        {activeTab === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Catalog Header */}
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#FF694B] uppercase tracking-wider">
                KATALOG LENGKAP
              </span>
              <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-[#44352D]">
                Produk Rumah Kreasi
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6960] max-w-lg mx-auto">
                Temukan flashcard edukasi, gantungan kunci buatan tangan, kit kerajinan, dan kado spesial berkualitas tinggi.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-[#FF694B] text-white shadow-xs'
                      : 'bg-[#FFFDF9] text-[#6E5D53] border border-[#EBDCCF] hover:bg-[#F5ECE0]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF4EC] p-4 rounded-2xl border border-[#E8D6C4]">
              <div className="text-xs font-bold text-[#55433A]">
                Menampilkan <span className="text-[#FF694B]">{sortedProducts.length}</span> produk
                {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#8C7A70] font-semibold">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-2 rounded-xl border border-[#E0CFBD] bg-white font-bold text-[#44352D] focus:outline-hidden focus:border-[#FF694B]"
                >
                  <option value="featured">Produk Unggulan</option>
                  <option value="price-low">Harga: Termurah</option>
                  <option value="price-high">Harga: Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length === 0 ? (
              <div className="bg-[#FFFDF9] rounded-3xl border-2 border-dashed border-[#E5D2BF] p-12 text-center space-y-4">
                <div className="text-4xl">🔍</div>
                <h3 className="font-fredoka text-xl font-bold text-[#44352D]">
                  Tidak ada produk yang cocok
                </h3>
                <p className="text-xs text-[#7A6960]">
                  Coba ganti kata kunci pencarian atau pilih kategori lain.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Semua');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#FF694B] text-white text-xs font-bold hover:bg-[#E85637]"
                >
                  Reset Filter & Pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                    onInstantBuy={(p) => handleInstantBuy(p)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* ================= VIEW: ORDER TRACKER ================= */}
        {activeTab === 'order-tracker' && <OrderTracker />}

        {/* ================= VIEW: ADMIN DASHBOARD ================= */}
        {activeTab === 'admin' && <AdminDashboard />}

      </main>

      {/* Global Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onInstantBuy={(product, quantity, note) => handleInstantBuy(product, quantity, note)}
      />

      {/* Cart Drawer */}
      <CartDrawer onProceedToCheckout={handleProceedToCheckoutFromCart} />

      {/* Instant Checkout & Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setDirectBuyItem(null);
        }}
        directBuyItem={directBuyItem}
      />

      {/* Login & Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Floating Live Chat Widget */}
      <LiveChatWidget />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
