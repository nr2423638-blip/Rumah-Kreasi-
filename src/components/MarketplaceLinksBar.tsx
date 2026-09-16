import React from 'react';
import { ExternalLink, ShoppingBag, MessageSquare, Phone, Instagram, Music } from 'lucide-react';
import { RUMAH_KREASI_CONTACTS } from '../types';

export const MarketplaceLinksBar: React.FC = () => {
  return (
    <section className="bg-[#FFFDF9] border-y border-[#E8E1D9] py-5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold tracking-wider text-[#E07A5F] uppercase">
              Toko & Akun Resmi Rumah Kreasi
            </span>
            <p className="text-sm font-semibold text-[#2C2420]">
              Pilih platform belanja favorit Anda atau beli langsung di website kami
            </p>
          </div>

          {/* Buttons to external platforms */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* Shopee */}
            <a
              id="badge-shopee"
              href={RUMAH_KREASI_CONTACTS.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#EE4D2D] hover:bg-[#d43d1f] text-white rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-102"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shopee: {RUMAH_KREASI_CONTACTS.shopeeName}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            {/* Lynk.id */}
            <a
              id="badge-lynkid"
              href={RUMAH_KREASI_CONTACTS.lynkidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-102"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Lynk.id: {RUMAH_KREASI_CONTACTS.lynkidName}</span>
            </a>

            {/* TikTok */}
            <a
              id="badge-tiktok"
              href={RUMAH_KREASI_CONTACTS.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-[#1E1E1E] hover:bg-[#0F0F0F] text-white rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-102"
            >
              <Music className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span>TikTok: @{RUMAH_KREASI_CONTACTS.tiktokName}</span>
            </a>

            {/* Instagram */}
            <a
              id="badge-instagram"
              href={RUMAH_KREASI_CONTACTS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-102"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>IG: @{RUMAH_KREASI_CONTACTS.instagramName}</span>
            </a>

            {/* WhatsApp */}
            <a
              id="badge-whatsapp"
              href={`https://wa.me/${RUMAH_KREASI_CONTACTS.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-102"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WA: {RUMAH_KREASI_CONTACTS.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
