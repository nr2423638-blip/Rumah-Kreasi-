import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../data/initialData';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Truck
} from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    setActiveTab 
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l-2 border-[#EBDCCF] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EBDCCF] bg-[#FCF8F2] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#FFF1EB] text-[#FF694B] border border-[#FFD0C1]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-fredoka text-lg font-bold text-[#44352D]">
                  Keranjang Belanja
                </h3>
                <p className="text-xs text-[#7A6960]">
                  {totalItems} barang siap di-checkout
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-[#7A6960] hover:bg-[#F2E5D5] hover:text-[#44352D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-[#F7EFE6] border-2 border-dashed border-[#E3CCA9] flex items-center justify-center text-3xl">
                  🛒
                </div>
                <div>
                  <h4 className="font-fredoka text-lg font-bold text-[#44352D]">
                    Keranjang Masih Kosong
                  </h4>
                  <p className="text-xs text-[#7A6960] mt-1 max-w-xs">
                    Yuk pilih flashcard edukasi, gantungan kunci, atau DIY craft favoritmu di Rumah Kreasi!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab('catalog');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#FF694B] text-white text-xs font-bold shadow-xs hover:bg-[#E85637] transition-all cursor-pointer"
                >
                  Jelajahi Katalog Produk
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#F2E5D5]">
                  <span className="text-xs font-bold text-[#7A6960]">Daftar Produk</span>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-[#A85A48] hover:text-[#DE4E2B] font-medium"
                  >
                    Kosongkan Semua
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-3.5 rounded-2xl bg-white border border-[#EBDCCF] shadow-2xs flex gap-3.5 relative group"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-18 h-18 rounded-xl object-cover bg-[#F7EFE6] shrink-0 border border-[#EBDCCF]"
                        referrerPolicy="no-referrer"
                      />

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-[#44352D] line-clamp-1 leading-snug">
                            {item.product.title}
                          </h4>
                          <span className="text-[10px] text-[#8B7669] font-medium">
                            {item.product.category}
                          </span>
                          {item.customNote && (
                            <p className="text-[10px] text-[#FF694B] italic mt-0.5 line-clamp-1">
                              Note: {item.customNote}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F5EBE0]">
                          <span className="text-xs font-bold text-[#E25330]">
                            {formatRupiah(item.product.price * item.quantity)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#E0CFBD] rounded-lg bg-[#FAF5EE] overflow-hidden">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#F2E5D5] text-[#55433A]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#44332A]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                              disabled={item.quantity >= item.product.stock}
                              className="p-1 hover:bg-[#F2E5D5] text-[#55433A] disabled:opacity-30"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#BCAEA4] hover:text-[#DE4E2B] p-1 absolute top-2 right-2"
                        title="Hapus dari keranjang"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#EBDCCF] bg-[#FCF8F2] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6F5D53]">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} barang)</span>
                  <span className="font-bold text-[#44352D]">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#527850]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    Estimasi Ongkir
                  </span>
                  <span className="font-bold">Mulai Rp 10.000</span>
                </div>
                <div className="pt-2 border-t border-[#EBDCCF] flex justify-between text-sm font-extrabold text-[#44352D]">
                  <span>Total Perkiraan</span>
                  <span className="text-base text-[#E25330]">{formatRupiah(subtotal + 10000)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FF694B] hover:bg-[#E85637] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Lanjut ke Pembayaran & Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C7A70] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#527850]" />
                <span>QRIS, VA Bank & Notifikasi WhatsApp Otomatis</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
