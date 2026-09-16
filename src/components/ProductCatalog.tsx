import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onDirectBuy: (product: Product) => void;
  onViewDetail: (product: Product) => void;
}

const CATEGORIES = [
  'Semua',
  'Buket & Bunga',
  'Akrilik & Lampu',
  'Frame 3D',
  'Rajut & Souvenir',
  'Hampers & Gift Box',
  'Craft Lainnya',
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onDirectBuy,
  onViewDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'stock'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'Semua' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'stock') return b.stock - a.stock;
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="katalog" className="py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E8E1D9] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E07A5F] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Katalog Resmi Rumah Kreasi Batam</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C2420] font-serif">
              Pilihan Karya Kreatif & Kerajinan Tangan
            </h2>
            <p className="text-xs sm:text-sm text-[#7F4F24] mt-1">
              Bisa langsung dibeli di situs (QRIS / Bank Auto-Confirm) atau via Shopee & Lynk.id
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                id="catalog-search-input"
                type="text"
                placeholder="Cari buket, akrilik, kado..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-[#FFFDF9] border border-[#D9CFC4] rounded-xl text-xs sm:text-sm text-[#2C2420] placeholder-[#7F4F24]/60 focus:outline-none focus:border-[#582F0E]"
              />
              <Search className="w-4 h-4 text-[#7F4F24] absolute left-3 top-2.5" />
            </div>

            {/* Sort Select */}
            <div className="relative w-full sm:w-auto">
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-[#FFFDF9] border border-[#D9CFC4] rounded-xl text-xs sm:text-sm text-[#2C2420] focus:outline-none focus:border-[#582F0E] cursor-pointer"
              >
                <option value="featured">Rekomendasi / Best Seller</option>
                <option value="price-low">Harga: Terendah ke Tertinggi</option>
                <option value="price-high">Harga: Tertinggi ke Terendah</option>
                <option value="stock">Stok Terbanyak</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Tab Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#582F0E] text-white shadow-xs'
                  : 'bg-[#FFFDF9] text-[#554740] border border-[#E8E1D9] hover:bg-[#F3EFEA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onDirectBuy={onDirectBuy}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#FFFDF9] rounded-2xl border border-dashed border-[#D9CFC4]">
            <ShoppingBag className="w-12 h-12 text-[#7F4F24]/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#2C2420]">Tidak ada produk yang ditemukan</h3>
            <p className="text-xs text-[#7F4F24] mt-1 max-w-sm mx-auto">
              Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.
            </p>
            <button
              id="reset-filter-btn"
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#582F0E] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
