import React, { useState } from 'react';
import { 
  ShoppingBag, 
  User as UserIcon, 
  MapPin, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles,
  Phone,
  LogOut,
  Sliders
} from 'lucide-react';
import { User, RUMAH_KREASI_CONTACTS } from '../types';
import logoImg from '../assets/images/rumah_kreasi_logo_1789096056648.jpg';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: (defaultTab?: 'customer' | 'admin') => void;
  currentUser: User | null;
  onLogout: () => void;
  onOpenOutsideBatamModal: () => void;
  isAdminView: boolean;
  onToggleAdminView: () => void;
  onOpenLiveChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  currentUser,
  onLogout,
  onOpenOutsideBatamModal,
  isAdminView,
  onToggleAdminView,
  onOpenLiveChat,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8E1D9] shadow-xs">
      {/* Top Notice Bar */}
      <div className="bg-[#582F0E] text-[#FAF7F2] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#7F4F24] text-white">
              <MapPin className="w-3 h-3 mr-1 text-[#E07A5F]" /> Khusus Wilayah Kota Batam
            </span>
            <span className="hidden md:inline text-[#E8E1D9]/60">•</span>
            <span className="text-[#E8E1D9]">
              Pembayaran instan QRIS & Bank Auto-Verifikasi • Konfirmasi WA Otomatis
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="outside-batam-top-btn"
              onClick={onOpenOutsideBatamModal}
              className="text-[#E07A5F] hover:text-[#F4A261] underline text-[11px] font-medium cursor-pointer transition-colors"
            >
              Luar Batam? Klik Info Pengiriman
            </button>
            <span className="text-[#E8E1D9]/60">|</span>
            <a
              id="top-wa-direct"
              href={`https://wa.me/${RUMAH_KREASI_CONTACTS.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>WA: {RUMAH_KREASI_CONTACTS.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5">
            <a href="#" className="flex items-center gap-3 group">
              <img
                src={logoImg}
                alt="Rumah Kreasi Logo"
                className="w-12 h-12 rounded-xl object-cover border border-[#E07A5F]/30 shadow-xs group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-[#2C2420] font-serif group-hover:text-[#582F0E] transition-colors">
                  Rumah Kreasi
                </span>
                <span className="text-[11px] font-medium tracking-wide text-[#7F4F24] uppercase">
                  Craft & Creative Studio • Batam
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <a
              href="#katalog"
              className="text-sm font-medium text-[#2C2420] hover:text-[#582F0E] transition-colors"
            >
              Katalog Produk
            </a>
            
            {/* Shopee Link */}
            <a
              id="nav-shopee-link"
              href={RUMAH_KREASI_CONTACTS.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#EE4D2D] hover:text-[#c43a1e] bg-[#EE4D2D]/10 px-2.5 py-1 rounded-full transition-colors"
            >
              <span>Shopee</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Lynk.id Link */}
            <a
              id="nav-lynkid-link"
              href={RUMAH_KREASI_CONTACTS.lynkidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#0066FF] hover:text-[#004dc2] bg-[#0066FF]/10 px-2.5 py-1 rounded-full transition-colors"
            >
              <span>Lynk.id</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="#ulasan"
              className="text-sm font-medium text-[#2C2420] hover:text-[#582F0E] transition-colors"
            >
              Ulasan Pelanggan
            </a>

            <button
              id="nav-chat-btn"
              onClick={onOpenLiveChat}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#582F0E] hover:text-[#7F4F24] cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat Admin</span>
            </button>
          </nav>

          {/* Action Buttons: Cart, Auth, Admin Switch */}
          <div className="flex items-center gap-3">
            {/* Admin Switch Toggle (if logged in or admin) */}
            {currentUser?.role === 'admin' && (
              <button
                id="toggle-admin-view-btn"
                onClick={onToggleAdminView}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  isAdminView 
                    ? 'bg-[#582F0E] text-white shadow-xs' 
                    : 'bg-[#E8E1D9] text-[#582F0E] hover:bg-[#D9CFC4]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{isAdminView ? 'Mode Toko' : 'Panel Admin'}</span>
              </button>
            )}

            {/* User Account / Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-semibold text-[#2C2420]">{currentUser.name}</span>
                  <span className="text-[10px] text-[#7F4F24] capitalize">{currentUser.role === 'admin' ? 'Admin Website' : 'Pelanggan Batam'}</span>
                </div>
                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  title="Keluar"
                  className="p-2 text-[#7F4F24] hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={() => onOpenAuth('customer')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#582F0E] border border-[#582F0E]/20 hover:bg-[#582F0E]/5 cursor-pointer transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Masuk</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 bg-[#582F0E] text-white rounded-xl shadow-xs hover:bg-[#7F4F24] cursor-pointer transition-all duration-200 active:scale-95"
              aria-label="Buka Keranjang"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E07A5F] text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FFFDF9] shadow-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#582F0E] hover:bg-[#E8E1D9]/50 rounded-lg cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-[#E8E1D9] px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <a
              id="mobile-shopee-link"
              href={RUMAH_KREASI_CONTACTS.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 bg-[#EE4D2D]/10 text-[#EE4D2D] rounded-lg text-xs font-semibold"
            >
              <span>Shopee Batam</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              id="mobile-lynkid-link"
              href={RUMAH_KREASI_CONTACTS.lynkidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 bg-[#0066FF]/10 text-[#0066FF] rounded-lg text-xs font-semibold"
            >
              <span>Lynk.id Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <a
              href="#katalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-[#2C2420] hover:bg-[#E8E1D9]/40"
            >
              Katalog Produk Kerajinan
            </a>
            <a
              href="#ulasan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-[#2C2420] hover:bg-[#E8E1D9]/40"
            >
              Ulasan Pembeli Terverifikasi
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLiveChat();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#2C2420] hover:bg-[#E8E1D9]/40 text-left"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Chat Langsung Admin Website
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenOutsideBatamModal();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#E07A5F] hover:bg-[#E07A5F]/10 text-left"
            >
              <MapPin className="w-4 h-4" />
              Info Pemesanan di Luar Batam
            </button>
          </div>

          {/* Social Links Row in Mobile */}
          <div className="pt-2 border-t border-[#E8E1D9] flex items-center justify-between text-xs text-[#7F4F24]">
            <span>IG & TikTok: @{RUMAH_KREASI_CONTACTS.instagramName}</span>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAuth('admin');
              }}
              className="text-[#582F0E] font-medium underline"
            >
              Portal Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
