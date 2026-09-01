import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  ShieldCheck, 
  User, 
  ExternalLink, 
  Menu, 
  X, 
  Sparkles,
  Package,
  Home,
  Grid
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenProductDetail?: (product: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { 
    storeInfo, 
    cart, 
    setIsCartOpen, 
    setIsChatOpen, 
    unreadChatCount,
    searchQuery, 
    setSearchQuery, 
    activeTab, 
    setActiveTab, 
    currentUser, 
    logoutUser 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FCF8F2]/95 backdrop-blur-md border-b border-[#EBDCCF] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#56423A] text-[#FDEEE4] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#FF8058] text-white text-[10px] font-bold uppercase tracking-wider">
              EST. {storeInfo.year.replace('EST. ', '')}
            </span>
            <span className="hidden sm:inline">✨ {storeInfo.tagline} • Pengiriman ke Seluruh Indonesia!</span>
            <span className="sm:hidden">✨ Toko Kreatif & Edukatif</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href={storeInfo.shopeeUrl} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#FFB69E] transition-colors flex items-center gap-1 font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-[#EE4D2D]"></span>
              Shopee Store
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a 
              href={storeInfo.lynkIdUrl} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#FFB69E] transition-colors flex items-center gap-1 font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-[#6B5AED]"></span>
              Lynk.id
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a 
              href={storeInfo.tiktokUrl} 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex items-center gap-1 hover:text-[#FFB69E] transition-colors"
            >
              TikTok: {storeInfo.tiktokHandle}
            </a>

            <a 
              href={storeInfo.instagramUrl} 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex items-center gap-1 hover:text-[#FFB69E] transition-colors"
            >
              IG: {storeInfo.instagramHandle}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo / Brand Header */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            {/* Custom Brand Icon Emblem */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FFF6EE] border-2 border-[#E7CBB3] shadow-xs flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              {/* Cute House Roof vector */}
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[14px] border-b-[#FF694B] relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px]">❤️</div>
                </div>
                <div className="w-8 h-5 bg-[#749572] rounded-xs -mt-0.5 flex items-center justify-center gap-1 px-1">
                  <div className="w-2 h-2 bg-[#FFF3E3] rounded-xs"></div>
                  <div className="w-2 h-2 bg-[#FFF3E3] rounded-xs"></div>
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 bg-[#F4B342] text-[9px] text-[#4A382A] font-bold px-1.5 py-0.2 rounded-full border border-white">
                2025
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-fredoka text-xl sm:text-2xl font-bold tracking-tight text-[#E85B37] drop-shadow-xs">
                  RUMAH
                </span>
                <span className="font-fredoka text-xl sm:text-2xl font-bold tracking-tight text-[#5B8859]">
                  KREASI
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#7A6960] font-medium hidden sm:block">
                A little corner of creativity
              </p>
            </div>
          </button>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalog' && activeTab !== 'home') {
                    setActiveTab('catalog');
                  }
                }}
                placeholder="Cari flashcard, gantungan kunci, kado, buku..."
                className="w-full bg-[#F5ECE0] text-[#4A3E39] placeholder-[#9E8B7F] text-sm pl-10 pr-4 py-2.5 rounded-full border border-[#E3D1BE] focus:outline-hidden focus:border-[#FF8058] focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-[#8C7668] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7668] hover:text-[#4A3E39] bg-[#E3D1BE] rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-[#FF8058] text-white shadow-xs'
                  : 'text-[#615147] hover:bg-[#F2E5D5]'
              }`}
            >
              <Home className="w-4 h-4" />
              Beranda
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-[#FF8058] text-white shadow-xs'
                  : 'text-[#615147] hover:bg-[#F2E5D5]'
              }`}
            >
              <Grid className="w-4 h-4" />
              Katalog Produk
            </button>

            <button
              onClick={() => setActiveTab('order-tracker')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'order-tracker'
                  ? 'bg-[#FF8058] text-white shadow-xs'
                  : 'text-[#615147] hover:bg-[#F2E5D5]'
              }`}
            >
              <Package className="w-4 h-4" />
              Lacak Pesanan
            </button>
          </nav>

          {/* Action Buttons: Cart, Chat, User/Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Chat trigger */}
            <button
              onClick={() => setIsChatOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#FFF6ED] border border-[#E8D6C5] text-[#FF694B] hover:bg-[#FFEADA] transition-colors focus:outline-hidden"
              title="Chat Langsung dengan Admin"
            >
              <MessageCircle className="w-5 h-5" />
              {unreadChatCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#EF4444] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-xs">
                  {unreadChatCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#749572] hover:bg-[#628360] text-white font-semibold text-sm transition-transform active:scale-95 shadow-xs"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Keranjang</span>
              {totalCartItems > 0 && (
                <span className="bg-[#FF8058] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User / Admin Portal Button */}
            {currentUser ? (
              <div className="relative flex items-center gap-2">
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => setActiveTab(activeTab === 'admin' ? 'home' : 'admin')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      activeTab === 'admin'
                        ? 'bg-[#433833] text-white border-[#433833]'
                        : 'bg-[#FFF3E3] text-[#A85820] border-[#E8C29D] hover:bg-[#FFE6CD]'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#FF8058]" />
                    <span className="hidden md:inline">Dashboard Admin</span>
                    <span className="md:hidden">Admin</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('order-tracker')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#F2E5D5] text-[#55433A] hover:bg-[#E7D6C3]"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">{currentUser.name}</span>
                  </button>
                )}
                <button
                  onClick={logoutUser}
                  className="text-xs text-[#9E8B7F] hover:text-[#D94F3D] px-1.5 py-1"
                  title="Keluar / Ganti Akun"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FFF6EE] border border-[#E5D0BD] text-[#55433A] hover:bg-[#FCEEE1] font-semibold text-xs sm:text-sm transition-all"
              >
                <User className="w-4 h-4 text-[#FF8058]" />
                <span>Masuk / Akun</span>
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#55433A] hover:bg-[#F2E5D5]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalog' && activeTab !== 'home') {
                  setActiveTab('catalog');
                }
              }}
              placeholder="Cari flashcard, gantungan kunci, dll..."
              className="w-full bg-[#F5ECE0] text-[#4A3E39] placeholder-[#9E8B7F] text-sm pl-9 pr-4 py-2 rounded-xl border border-[#E3D1BE] focus:outline-hidden focus:border-[#FF8058]"
            />
            <Search className="w-4 h-4 text-[#8C7668] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#EBDCCF] space-y-2">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                activeTab === 'home' ? 'bg-[#FF8058] text-white' : 'text-[#615147]'
              }`}
            >
              <Home className="w-4 h-4" />
              Beranda
            </button>

            <button
              onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                activeTab === 'catalog' ? 'bg-[#FF8058] text-white' : 'text-[#615147]'
              }`}
            >
              <Grid className="w-4 h-4" />
              Katalog Produk
            </button>

            <button
              onClick={() => { setActiveTab('order-tracker'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                activeTab === 'order-tracker' ? 'bg-[#FF8058] text-white' : 'text-[#615147]'
              }`}
            >
              <Package className="w-4 h-4" />
              Lacak Pesanan Saya
            </button>

            <div className="pt-2 border-t border-[#EBDCCF] grid grid-cols-2 gap-2">
              <a
                href={storeInfo.shopeeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-[#FFF0ED] text-[#EE4D2D] text-xs font-bold text-center border border-[#FFD3C9]"
              >
                🛍️ Buka Toko Shopee
              </a>
              <a
                href={storeInfo.lynkIdUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-[#F0EEFF] text-[#6B5AED] text-xs font-bold text-center border border-[#DCD6FE]"
              >
                🔗 Order via Lynk.id
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
