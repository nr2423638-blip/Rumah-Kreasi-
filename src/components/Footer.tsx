import React from 'react';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  Music, 
  ShoppingBag, 
  ExternalLink, 
  ShieldCheck, 
  QrCode, 
  Heart,
  Lock
} from 'lucide-react';
import { RUMAH_KREASI_CONTACTS } from '../types';
import logoImg from '../assets/images/rumah_kreasi_logo_1789096056648.jpg';

interface FooterProps {
  onOpenOutsideBatamModal: () => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOutsideBatamModal,
  onOpenAdminLogin,
}) => {
  return (
    <footer className="bg-[#2C2420] text-[#E8E1D9] pt-12 pb-8 border-t border-[#3D332D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#4A3E37]">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Rumah Kreasi"
                className="w-12 h-12 rounded-xl object-cover border border-[#E07A5F]/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-xl font-bold text-white font-serif tracking-tight">
                  Rumah Kreasi
                </h3>
                <span className="text-[11px] text-[#E07A5F] tracking-wide uppercase font-semibold">
                  Craft & Creative Gifts Batam
                </span>
              </div>
            </div>

            <p className="text-xs text-[#BEB1A2] leading-relaxed">
              Studio kerajinan tangan, buket bunga kering estetik, akrilik lampu grafir nama, scrapbook kenangan 3D, dan kado hampers istimewa khusus wilayah Kota Batam.
            </p>

            <div className="flex items-center gap-2 text-xs text-white">
              <MapPin className="w-4 h-4 text-[#E07A5F] shrink-0" />
              <span>{RUMAH_KREASI_CONTACTS.city}</span>
            </div>
          </div>

          {/* Col 2: Official Social Media & Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif uppercase tracking-wider">
              Kontak & Media Sosial
            </h4>
            <ul className="space-y-2.5 text-xs text-[#BEB1A2]">
              <li>
                <a
                  id="footer-wa-link"
                  href={`https://wa.me/${RUMAH_KREASI_CONTACTS.whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp: {RUMAH_KREASI_CONTACTS.whatsappNumber}</span>
                </a>
              </li>

              <li>
                <a
                  id="footer-ig-link"
                  href={RUMAH_KREASI_CONTACTS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FD1D1D] flex items-center gap-2 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#E07A5F]" />
                  <span>Instagram: @{RUMAH_KREASI_CONTACTS.instagramName}</span>
                </a>
              </li>

              <li>
                <a
                  id="footer-tiktok-link"
                  href={RUMAH_KREASI_CONTACTS.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Music className="w-4 h-4 text-[#00f2fe]" />
                  <span>TikTok: @{RUMAH_KREASI_CONTACTS.tiktokName}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Marketplaces */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif uppercase tracking-wider">
              Marketplace Resmi
            </h4>
            <ul className="space-y-2.5 text-xs text-[#BEB1A2]">
              <li>
                <a
                  id="footer-shopee-link"
                  href={RUMAH_KREASI_CONTACTS.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#EE4D2D] flex items-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-[#EE4D2D]" />
                  <span>Shopee: {RUMAH_KREASI_CONTACTS.shopeeName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>

              <li>
                <a
                  id="footer-lynkid-link"
                  href={RUMAH_KREASI_CONTACTS.lynkidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0066FF] flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#0066FF]" />
                  <span>Lynk.id: {RUMAH_KREASI_CONTACTS.lynkidName}</span>
                </a>
              </li>

              <li className="pt-2">
                <button
                  id="footer-outside-batam-btn"
                  onClick={onOpenOutsideBatamModal}
                  className="text-xs text-[#E07A5F] hover:text-[#F4A261] underline text-left cursor-pointer"
                >
                  Panduan Pemesanan di Luar Kota Batam →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment & Security Integration */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif uppercase tracking-wider">
              Sistem Pembayaran
            </h4>
            <p className="text-xs text-[#BEB1A2] leading-relaxed">
              Integrasi checkout otomatis via QRIS (Semua E-Wallet & Mobile Banking) serta Bank Transfer Terhubung dengan konfirmasi otomatis instan.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-1 bg-[#3D332D] rounded text-[10px] font-bold text-white">QRIS</span>
              <span className="px-2 py-1 bg-[#3D332D] rounded text-[10px] font-bold text-white">BCA</span>
              <span className="px-2 py-1 bg-[#3D332D] rounded text-[10px] font-bold text-white">Mandiri</span>
              <span className="px-2 py-1 bg-[#3D332D] rounded text-[10px] font-bold text-white">BRI</span>
              <span className="px-2 py-1 bg-[#3D332D] rounded text-[10px] font-bold text-white">GoPay</span>
              <span className="px-2 py-1 bg-[#3D332D] rounded text-[10px] font-bold text-white">Dana</span>
            </div>

            <div className="pt-2">
              <button
                id="footer-admin-login-btn"
                onClick={onOpenAdminLogin}
                className="text-[11px] text-[#BEB1A2] hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3 h-3 text-[#E07A5F]" />
                <span>Portal Login Admin Website</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E7E73] gap-2">
          <p>© {new Date().getFullYear()} Rumah Kreasi Batam. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan dedikasi karya tangan untuk Kota Batam</span>
            <Heart className="w-3.5 h-3.5 text-[#E07A5F] fill-current inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
