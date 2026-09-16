import React, { useState, useEffect } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, 
  INITIAL_ORDERS 
} from './data/initialData';
import { Product, Review, Order, CartItem, User, RUMAH_KREASI_CONTACTS } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MarketplaceLinksBar } from './components/MarketplaceLinksBar';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartAndCheckoutModal } from './components/CartAndCheckoutModal';
import { OutsideBatamModal } from './components/OutsideBatamModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Camera, 
  Clock, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export default function App() {
  // Local storage synced states
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rk_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('rk_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rk_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rk_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rk_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Navigation & Modals UI states
  const [isAdminView, setIsAdminView] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOutsideBatamOpen, setIsOutsideBatamOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'customer' | 'admin'>('customer');
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [hasVerifiedOrder, setHasVerifiedOrder] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('rk_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rk_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('rk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('rk_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rk_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rk_current_user');
    }
  }, [currentUser]);

  // Derived list of product IDs purchased by user in completed orders
  const userPurchasedProductIds = orders
    .filter((o) => o.paymentStatus === 'paid')
    .flatMap((o) => o.items.map((it) => it.productId));

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });
    setIsCartOpen(true);
  };

  const handleDirectBuy = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Order created handler
  const handleOrderCreated = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setHasVerifiedOrder(true);
  };

  // Review created handler
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    // update product review count
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === newReview.productId) {
          const newCount = p.reviewCount + 1;
          const newRating = ((p.rating * p.reviewCount) + newReview.rating) / newCount;
          return {
            ...p,
            reviewCount: newCount,
            rating: Number(newRating.toFixed(1)),
          };
        }
        return p;
      })
    );
  };

  // Admin handlers
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'pending' | 'verified' | 'paid') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: newStatus } : o))
    );
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setIsAdminView(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminView(false);
  };

  const cartTotalCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2420]">
      {/* If Admin view is enabled and user is admin */}
      {isAdminView && currentUser?.role === 'admin' ? (
        <AdminDashboard
          products={products}
          orders={orders}
          onAddProduct={handleAddProduct}
          onUpdateProductStock={handleUpdateProductStock}
          onDeleteProduct={handleDeleteProduct}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onExitAdmin={() => setIsAdminView(false)}
        />
      ) : (
        <>
          {/* Navbar */}
          <Navbar
            cartCount={cartTotalCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAuth={(defaultTab = 'customer') => {
              setAuthDefaultTab(defaultTab);
              setIsAuthOpen(true);
            }}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenOutsideBatamModal={() => setIsOutsideBatamOpen(true)}
            isAdminView={isAdminView}
            onToggleAdminView={() => setIsAdminView(!isAdminView)}
            onOpenLiveChat={() => setIsLiveChatOpen(true)}
          />

          {/* Official Marketplace Links Bar */}
          <MarketplaceLinksBar />

          {/* Hero Banner Section */}
          <HeroBanner
            onExploreCatalog={() => {
              const el = document.getElementById('katalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenOutsideBatamModal={() => setIsOutsideBatamOpen(true)}
            onOpenLiveChat={() => setIsLiveChatOpen(true)}
          />

          {/* Trust Highlights Section */}
          <section className="bg-[#FFFDF9] py-8 border-y border-[#E8E1D9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D9]">
                  <div className="w-10 h-10 rounded-xl bg-[#582F0E] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#E07A5F]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2C2420]">QRIS & Bank Terhubung</h4>
                    <p className="text-[11px] text-[#7F4F24]">Verifikasi otomatis instan & aman</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D9]">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2C2420]">Notifikasi WA Otomatis</h4>
                    <p className="text-[11px] text-[#7F4F24]">Langsung terhubung ke admin setelah bayar</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D9]">
                  <div className="w-10 h-10 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2C2420]">Khusus Area Kota Batam</h4>
                    <p className="text-[11px] text-[#7F4F24]">Luar kota bisa tanya jawab WA</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D9]">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF] text-white flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2C2420]">Shopee & Lynk.id Resmi</h4>
                    <p className="text-[11px] text-[#7F4F24]">Bebas pilih cara belanja Anda</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Product Catalog Grid */}
          <main className="flex-1">
            <ProductCatalog
              products={products}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onDirectBuy={(p) => handleDirectBuy(p, 1)}
              onViewDetail={(p) => setSelectedProductDetail(p)}
            />

            {/* Testimonials & Verified Buyer Photos Section */}
            <section id="ulasan" className="py-14 bg-[#FFFDF9] border-t border-[#E8E1D9]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E07A5F]/15 text-[#582F0E] text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                    <span>Kepuasan Pelanggan Rumah Kreasi</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C2420] font-serif">
                    Ulasan & Foto Nyata Pembeli di Batam
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7F4F24] mt-2">
                    Semua ulasan berasal dari pembeli yang telah terverifikasi memesan produk kerajinan tangan kami
                  </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {reviews.slice(0, 4).map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E1D9] flex flex-col justify-between space-y-3 shadow-xs hover:border-[#D9CFC4] transition-all"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Terverifikasi
                          </span>
                        </div>

                        <p className="text-xs text-[#423730] line-clamp-3 leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E8E1D9]/60">
                        {rev.photoUrl && (
                          <div className="mb-2">
                            <img
                              src={rev.photoUrl}
                              alt="Foto pembeli"
                              className="w-full h-32 object-cover rounded-xl border border-[#D9CFC4]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#2C2420] truncate">{rev.customerName}</span>
                          <span className="text-[10px] text-[#7F4F24]">{rev.batamArea || 'Batam'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <Footer
            onOpenOutsideBatamModal={() => setIsOutsideBatamOpen(true)}
            onOpenAdminLogin={() => {
              setAuthDefaultTab('admin');
              setIsAuthOpen(true);
            }}
          />

          {/* Floating Live Chat Widget */}
          <LiveChatWidget
            isOpen={isLiveChatOpen}
            onToggle={() => setIsLiveChatOpen(!isLiveChatOpen)}
            onClose={() => setIsLiveChatOpen(false)}
          />

          {/* Product Detail & Reviews Modal */}
          {selectedProductDetail && (
            <ProductDetailModal
              product={selectedProductDetail}
              onClose={() => setSelectedProductDetail(null)}
              onAddToCart={(p, qty) => handleAddToCart(p, qty)}
              onDirectBuy={(p, qty) => handleDirectBuy(p, qty)}
              reviews={reviews}
              onAddReview={handleAddReview}
              hasVerifiedOrder={hasVerifiedOrder}
              userPurchasedProductIds={userPurchasedProductIds}
            />
          )}

          {/* Cart & Checkout with Payment Integration Modal */}
          <CartAndCheckoutModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onOrderCreated={handleOrderCreated}
            onOpenOutsideBatamModal={() => {
              setIsCartOpen(false);
              setIsOutsideBatamOpen(true);
            }}
            onOpenReviewForProduct={(productId) => {
              const prod = products.find((p) => p.id === productId);
              if (prod) setSelectedProductDetail(prod);
            }}
          />

          {/* Outside Batam Information Modal */}
          <OutsideBatamModal
            isOpen={isOutsideBatamOpen}
            onClose={() => setIsOutsideBatamOpen(false)}
            productName={selectedProductDetail?.name}
          />

          {/* Customer & Admin Authentication Modal */}
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            defaultTab={authDefaultTab}
          />
        </>
      )}
    </div>
  );
}
