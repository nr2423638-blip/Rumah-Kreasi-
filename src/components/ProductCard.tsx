import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../data/initialData';
import { 
  ShoppingBag, 
  Star, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Eye,
  AlertCircle 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onInstantBuy: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onQuickView,
  onInstantBuy 
}) => {
  const { addToCart } = useStore();

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group bg-[#FFFDF9] rounded-3xl border border-[#EBDCCF] hover:border-[#FF9E80] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Product Image and Overlay Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7EFE6] cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Badge Discount & Custom Tag */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full bg-[#FF694B] text-white text-[11px] font-bold shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {product.badge}
            </span>
          )}

          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-[#EF4444] text-white text-[10px] font-extrabold shadow-xs">
              HEMAT {discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-2 rounded-full bg-white/90 text-[#4A3E39] font-bold text-xs shadow-md flex items-center gap-1.5 backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5 text-[#FF694B]" />
            Lihat Detail
          </span>
        </div>

        {/* Stock indicator badge */}
        <div className="absolute bottom-2.5 right-2.5">
          {product.stock > 0 ? (
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#527850] text-[11px] font-bold border border-[#DCEBDC] shadow-2xs">
              Stok: {product.stock} pcs
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-[11px] font-bold border border-[#FECACA]">
              Stok Habis
            </span>
          )}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#8B7669] font-semibold bg-[#F5ECE0] px-2.5 py-0.5 rounded-md">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#D98E16] font-bold">
              <Star className="w-3.5 h-3.5 fill-[#D98E16]" />
              <span>{product.rating}</span>
              <span className="text-[#A49488] font-normal">({product.soldCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-fredoka text-base sm:text-lg font-bold text-[#44352D] hover:text-[#FF694B] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.title}
          </h3>

          <p className="text-xs text-[#7A6960] line-clamp-2 mt-1.5">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-2 border-t border-[#F2E5D5] space-y-3">
          
          {/* Price Container */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-bold text-[#E25330]">
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#A8968C] line-through font-medium">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Direct Buy Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              disabled={product.stock <= 0}
              className="py-2.5 px-3 rounded-xl bg-[#FFF2EB] hover:bg-[#FFE3D4] text-[#E65634] text-xs font-bold border border-[#FFCBB9] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>+ Keranjang</span>
            </button>

            <button
              onClick={() => onInstantBuy(product)}
              disabled={product.stock <= 0}
              className="py-2.5 px-3 rounded-xl bg-[#FF694B] hover:bg-[#E85637] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Beli Sekarang</span>
            </button>
          </div>

          {/* External Marketplace Links (Shopee & Lynk.id) */}
          <div className="pt-1 flex items-center justify-between gap-2 text-[11px] text-[#7A6960]">
            <span className="text-[10px] uppercase font-bold text-[#A8968C]">Pesan Via:</span>
            
            <div className="flex items-center gap-1.5">
              <a
                href={product.shopeeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 rounded-lg bg-[#FFF0ED] text-[#EE4D2D] font-bold hover:bg-[#FFE3DC] border border-[#FFD5CC] flex items-center gap-1 transition-colors"
                title="Beli produk ini di Toko Shopee Rumah Kreasi"
              >
                <span>Shopee</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>

              <a
                href={product.lynkIdUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 rounded-lg bg-[#F3F0FF] text-[#6351D9] font-bold hover:bg-[#E9E4FE] border border-[#DDD6FE] flex items-center gap-1 transition-colors"
                title="Pesan produk ini di Lynk.id Rumah Kreasi"
              >
                <span>Lynk.id</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
