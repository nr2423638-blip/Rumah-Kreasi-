import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../data/initialData';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ExternalLink, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Plus, 
  Minus,
  Heart,
  Share2,
  Check
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onInstantBuy: (product: Product, quantity: number, note?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onInstantBuy
}) => {
  const { addToCart, storeInfo } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const currentImg = selectedImg || product.image;
  const gallery = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, customNote);
    onClose();
  };

  const handleInstantBuy = () => {
    onInstantBuy(product, quantity, customNote);
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#EBDCCF] shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#523E34] flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-5 sm:p-8">
          
          {/* Left: Gallery & Images */}
          <div className="space-y-3">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#F7EFE6] border border-[#E8D9CC] relative">
              <img
                src={currentImg}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FF694B] text-white text-xs font-bold shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails if multiple images */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      currentImg === img ? 'border-[#FF694B] scale-105' : 'border-[#E8D9CC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Features highlight */}
            <div className="bg-[#F8EFE4] rounded-2xl p-4 border border-[#EADBCE] space-y-2 text-xs text-[#5D4B41]">
              <div className="flex items-center gap-2 font-bold text-[#44332A]">
                <Truck className="w-4 h-4 text-[#70946E]" />
                <span>Pengiriman Cepat & Ekstra Bubble Wrap</span>
              </div>
              <p className="text-[11px] text-[#7A695F]">
                Semua pesanan dipacking rapi dengan kardus tebal dan stiker fragile agar produk edukasi & souvenir tiba dengan aman.
              </p>
            </div>
          </div>

          {/* Right: Info, Price, Custom Note, and Buttons */}
          <div className="flex flex-col justify-between space-y-5">
            
            <div className="space-y-4">
              {/* Category, Rating, Share */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8A7365] bg-[#F5ECE0] px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#D98E16] font-bold text-sm">
                    <Star className="w-4 h-4 fill-[#D98E16]" />
                    <span>{product.rating}</span>
                    <span className="text-[#9E8E84] font-normal">({product.soldCount} terjual)</span>
                  </div>

                  <button
                    onClick={handleShare}
                    className="text-[#8A7365] hover:text-[#FF694B] p-1 text-xs flex items-center gap-1"
                    title="Bagikan link produk"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#42332C] leading-snug">
                {product.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E25330]">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-[#A8968C] line-through font-semibold">
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-bold text-[#558053] bg-[#E8F3E7] px-2.5 py-0.5 rounded-full">
                  Tersedia: {product.stock} pcs
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#4B3B32] uppercase tracking-wider">
                  Deskripsi Produk
                </h4>
                <p className="text-sm text-[#66554C] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-xs font-bold text-[#4B3B32] uppercase tracking-wider">
                    Keunggulan & Spesifikasi:
                  </h4>
                  <ul className="space-y-1">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-[#5F4E44] flex items-start gap-2">
                        <span className="text-[#FF694B] font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Custom Note input for buyer */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#4B3B32] mb-1">
                  Catatan Khusus Pesanan (Opsional):
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Contoh: Tulisan di kartu ucapan / request warna pita..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E3D1BE] bg-[#FAF5EE] focus:bg-white focus:outline-hidden focus:border-[#FF694B]"
                />
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-bold text-[#4B3B32]">Jumlah Beli:</span>
                <div className="flex items-center border border-[#E0CFBD] rounded-xl bg-white overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-[#F7EFE6] text-[#55433A] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-[#44332A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-[#F7EFE6] text-[#55433A] disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-[#8A7569]">
                  Total: <strong className="text-[#E25330]">{formatRupiah(product.price * quantity)}</strong>
                </span>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#EBDCCF] space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="py-3 px-4 rounded-xl bg-[#FFF2EB] hover:bg-[#FFE2D2] text-[#E65634] font-bold text-xs sm:text-sm border-2 border-[#FFC7B5] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>+ Keranjang</span>
                </button>

                <button
                  onClick={handleInstantBuy}
                  disabled={product.stock <= 0}
                  className="py-3 px-4 rounded-xl bg-[#FF694B] hover:bg-[#E75435] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span>Beli Sekarang</span>
                </button>
              </div>

              {/* Order via Shopee & Lynk.id */}
              <div className="bg-[#FAF3E9] p-3 rounded-xl border border-[#E9D9C9] flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#66554C]">
                  Atau order via marketplace:
                </span>
                
                <div className="flex items-center gap-2">
                  <a
                    href={product.shopeeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#FFF0ED] text-[#EE4D2D] font-bold text-xs hover:bg-[#FFE2DC] border border-[#FFCFBE] flex items-center gap-1"
                  >
                    <span>Shopee</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={product.lynkIdUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#F4F1FF] text-[#6351D9] font-bold text-xs hover:bg-[#E8E2FE] border border-[#DAD2FE] flex items-center gap-1"
                  >
                    <span>Lynk.id</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
