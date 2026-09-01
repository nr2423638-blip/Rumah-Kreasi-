import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Heart, 
  ExternalLink, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Sparkles,
  QrCode
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { storeInfo, setActiveTab } = useStore();

  return (
    <footer className="bg-[#44352D] text-[#EADDCF] border-t-4 border-[#FF694B] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF6EE] border-2 border-[#E7CBB3] flex items-center justify-center p-1">
                <div className="flex flex-col items-center">
                  <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[10px] border-b-[#FF694B]"></div>
                  <div className="w-6 h-4 bg-[#749572] rounded-xs -mt-0.5"></div>
                </div>
              </div>
              <div>
                <span className="font-fredoka text-2xl font-bold tracking-tight text-[#FF8058]">
                  RUMAH
                </span>
                <span className="font-fredoka text-2xl font-bold tracking-tight text-[#A7C5A4] ml-1">
                  KREASI
                </span>
                <p className="text-xs text-[#D1BEAF] font-medium">
                  {storeInfo.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#C7B5A6] leading-relaxed">
              Toko online & workshop kreasi anak bangsa yang menghadirkan produk edukatif, flashcard kreatif, DIY kit melukis, souvenir kado estetik, dan pernak-pernik handmade bermakna.
            </p>

            {/* Core values pill tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {storeInfo.values.map((v, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#56433A] text-white text-[10px] font-bold border border-[#6E564B]">
                  • {v}
                </span>
              ))}
            </div>
          </div>

          {/* Social Media & Official Channels */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-fredoka text-sm font-bold text-white uppercase tracking-wider">
              Akun Resmi Rumah Kreasi
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={storeInfo.shopeeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-[#56433A] hover:bg-[#EE4D2D] text-white transition-colors group"
                >
                  <span className="flex items-center gap-2 font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#EE4D2D] group-hover:bg-white"></span>
                    Shopee: {storeInfo.shopeeStoreName}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>

              <li>
                <a
                  href={storeInfo.lynkIdUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-[#56433A] hover:bg-[#6351D9] text-white transition-colors group"
                >
                  <span className="flex items-center gap-2 font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#6351D9] group-hover:bg-white"></span>
                    Lynk.id: {storeInfo.lynkIdHandle}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>

              <li>
                <a
                  href={storeInfo.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-[#56433A] hover:bg-[#222] text-white transition-colors group"
                >
                  <span className="flex items-center gap-2 font-bold">
                    <span>🎵</span>
                    TikTok: {storeInfo.tiktokHandle}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>

              <li>
                <a
                  href={storeInfo.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-[#56433A] hover:bg-[#E1306C] text-white transition-colors group"
                >
                  <span className="flex items-center gap-2 font-bold">
                    <span>📸</span>
                    Instagram: {storeInfo.instagramHandle}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service & WhatsApp */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-fredoka text-sm font-bold text-white uppercase tracking-wider">
              Layanan Pelanggan & WA
            </h4>

            <div className="space-y-2.5 text-xs text-[#C7B5A6]">
              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#4ADE80] font-bold text-sm hover:underline"
              >
                <MessageCircle className="w-4 h-4 fill-[#4ADE80]" />
                <span>WhatsApp: +{storeInfo.whatsappNumber}</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF8058] shrink-0 mt-0.5" />
                <span>{storeInfo.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF8058] shrink-0" />
                <span>{storeInfo.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF8058] shrink-0" />
                <span>{storeInfo.operationalHours}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav & Payment Badges */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-fredoka text-sm font-bold text-white uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-1.5 text-xs text-[#D8C7BC]">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white">
                  • Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catalog')} className="hover:text-white">
                  • Katalog Lengkap
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('order-tracker')} className="hover:text-white">
                  • Lacak Pengiriman
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-white">
                  • Panel Kelola Admin
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] text-[#A8968C] block uppercase font-bold mb-1.5">
                Metode Pembayaran Instan:
              </span>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 rounded-md bg-[#56433A] text-white text-[10px] font-bold">QRIS</span>
                <span className="px-2 py-0.5 rounded-md bg-[#56433A] text-white text-[10px] font-bold">BCA</span>
                <span className="px-2 py-0.5 rounded-md bg-[#56433A] text-white text-[10px] font-bold">Mandiri</span>
                <span className="px-2 py-0.5 rounded-md bg-[#56433A] text-white text-[10px] font-bold">BRI</span>
                <span className="px-2 py-0.5 rounded-md bg-[#56433A] text-white text-[10px] font-bold">GoPay</span>
                <span className="px-2 py-0.5 rounded-md bg-[#56433A] text-white text-[10px] font-bold">DANA</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#5A463D] flex flex-wrap items-center justify-between gap-4 text-xs text-[#A8968C]">
          <p>© {new Date().getFullYear()} Rumah Kreasi Indonesia. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 fill-[#FF694B] text-[#FF694B]" />
            <span>untuk generasi kreatif & edukatif Indonesia.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
