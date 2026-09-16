import React from 'react';
import { 
  Star, 
  ShoppingBag, 
  ExternalLink, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onDirectBuy: (product: Product) => void;
  onViewDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onDirectBuy,
  onViewDetail,
}) => {
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group bg-[#FFFDF9] rounded-2xl border border-[#E8E1D9] hover:border-[#D9CFC4] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F3EFEA]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-[#582F0E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-[#E07A5F]" /> Best Seller
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-xs text-[#582F0E] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#E8E1D9]">
            {product.category}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute bottom-2.5 left-2.5">
          {isOutOfStock ? (
            <span className="bg-rose-500/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <AlertCircle className="w-3 h-3" /> Stok Habis
            </span>
          ) : isLowStock ? (
            <span className="bg-amber-600/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <AlertCircle className="w-3 h-3" /> Sisa {product.stock} pcs!
            </span>
          ) : (
            <span className="bg-white/90 backdrop-blur-xs text-[#2C2420] text-[10px] font-medium px-2 py-0.5 rounded-md border border-[#E8E1D9] flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600" /> Stok: {product.stock} pcs
            </span>
          )}
        </div>

        {/* Quick View Button on Image */}
        <button
          id={`quick-view-${product.id}`}
          onClick={() => onViewDetail(product)}
          className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-[#2C2420] rounded-xl shadow-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          title="Lihat Detail & Ulasan"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-[#7F4F24] mb-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold ml-1 text-[#2C2420]">{product.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span className="text-[11px] text-[#7F4F24]">({product.reviewCount} ulasan)</span>
            <span className="ml-auto text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
              Batam Ready
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onViewDetail(product)}
            className="font-bold text-sm sm:text-base text-[#2C2420] hover:text-[#582F0E] transition-colors cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-[#7F4F24] mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Stock */}
        <div className="pt-2 border-t border-[#E8E1D9]/60">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-base sm:text-lg font-extrabold text-[#582F0E]">
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#7F4F24]/70 line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Main Action Buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1.5">
              <button
                id={`buy-direct-${product.id}`}
                disabled={isOutOfStock}
                onClick={() => onDirectBuy(product)}
                className={`py-2 px-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#582F0E] hover:bg-[#7F4F24] text-white shadow-xs active:scale-95'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Beli Langsung</span>
              </button>

              <button
                id={`add-cart-${product.id}`}
                disabled={isOutOfStock}
                onClick={() => onAddToCart(product)}
                className={`py-2 px-2.5 rounded-xl font-semibold text-xs border border-[#582F0E]/30 text-[#582F0E] hover:bg-[#582F0E]/5 transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
                }`}
              >
                <span>+ Keranjang</span>
              </button>
            </div>

            {/* Marketplace links buttons */}
            <div className="flex items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-[10px] text-[#7F4F24] font-medium">Pesan di:</span>
              <a
                id={`shopee-btn-${product.id}`}
                href={product.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1 py-1 px-1.5 bg-[#EE4D2D]/10 hover:bg-[#EE4D2D]/20 text-[#EE4D2D] rounded-lg font-medium transition-colors"
                title="Pesan barang ini di Shopee Rumah Kreasi"
              >
                <span>Shopee</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>

              <a
                id={`lynkid-btn-${product.id}`}
                href={product.lynkIdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1 py-1 px-1.5 bg-[#0066FF]/10 hover:bg-[#0066FF]/20 text-[#0066FF] rounded-lg font-medium transition-colors"
                title="Pesan barang ini di Lynk.id Rumah Kreasi"
              >
                <span>Lynk.id</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
