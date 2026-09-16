import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  CreditCard, 
  MessageCircle, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import heroImg from '../assets/images/rumah_kreasi_hero_1789096070765.jpg';
import { RUMAH_KREASI_CONTACTS } from '../types';

interface HeroBannerProps {
  onExploreCatalog: () => void;
  onOpenOutsideBatamModal: () => void;
  onOpenLiveChat: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCatalog,
  onOpenOutsideBatamModal,
  onOpenLiveChat,
}) => {
  return (
    <section className="relative bg-[#FAF7F2] overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#FAF7F2] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E07A5F]/15 text-[#582F0E] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Studio Kerajinan Tangan & Kado Kreatif Batam</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C2420] tracking-tight font-serif leading-[1.2]">
              Sentuhan Kreatif Buatan Tangan Untuk Setiap Momen Istimewa di{' '}
              <span className="text-[#582F0E] underline decoration-[#E07A5F] decoration-wavy decoration-2">
                Kota Batam
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#554740] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Pesan buket bunga kering, akrilik lampu LED grafir nama, scrapbook 3D, gantungan rajut, hingga hampers eksklusif. 
              Beli langsung di website dengan <span className="font-semibold text-[#2C2420]">QRIS & Bank Transfer otomatis</span>, atau pesan via <span className="font-semibold text-[#EE4D2D]">Shopee</span> & <span className="font-semibold text-[#0066FF]">Lynk.id</span>.
            </p>

            {/* City Notice Callout */}
            <div className="p-3.5 bg-[#FFFDF9] border border-[#E8E1D9] rounded-2xl flex items-start gap-3 text-left max-w-xl shadow-xs">
              <MapPin className="w-5 h-5 text-[#E07A5F] shrink-0 mt-0.5" />
              <div className="text-xs text-[#554740]">
                <strong className="text-[#2C2420] font-semibold">Pengiriman Langsung Khusus Area Kota Batam</strong>
                <p className="mt-0.5">
                  Pesanan lokal Batam langsung dikirim tanpa ribet cek resi rumit. Jika Anda berdomisili di <strong>Luar Kota Batam</strong>, jangan khawatir:{' '}
                  <button
                    id="hero-outside-batam-link"
                    onClick={onOpenOutsideBatamModal}
                    className="text-[#E07A5F] font-bold underline hover:text-[#7F4F24] cursor-pointer"
                  >
                    Konsultasi Ekspedisi via WhatsApp Admin
                  </button>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="hero-cta-catalog"
                onClick={onExploreCatalog}
                className="px-6 py-3.5 bg-[#582F0E] hover:bg-[#7F4F24] text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Beli Langsung di Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="hero-shopee-btn"
                href={RUMAH_KREASI_CONTACTS.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#EE4D2D] hover:bg-[#d63b1d] text-white font-semibold text-sm rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order di Shopee</span>
              </a>

              <button
                id="hero-chat-admin-btn"
                onClick={onOpenLiveChat}
                className="px-5 py-3.5 bg-[#FFFDF9] hover:bg-[#F3EFEA] text-[#2C2420] border border-[#D9CFC4] font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat Admin Website</span>
              </button>
            </div>

            {/* Key Advantages */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E8E1D9]/70 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E07A5F] shrink-0" />
                <span className="text-xs text-[#554740] font-medium">QRIS & Bank Otomatis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E07A5F] shrink-0" />
                <span className="text-xs text-[#554740] font-medium">Notifikasi WA Instan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E07A5F] shrink-0" />
                <span className="text-xs text-[#554740] font-medium">Ulasan Pembeli Terverifikasi</span>
              </div>
            </div>
          </div>

          {/* Hero Banner Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={heroImg}
                alt="Workshop Rumah Kreasi Batam"
                className="w-full h-80 sm:h-96 lg:h-[430px] object-cover hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge in Banner */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/40 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#582F0E] text-white flex items-center justify-center font-bold text-lg font-serif">
                      RK
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2C2420]">Rumah Kreasi Studio Batam</h4>
                      <p className="text-[11px] text-[#7F4F24]">Handmade with love & high craftsmanship</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Admin Siap Melayani
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Badge */}
            <div className="absolute -top-3 -right-3 bg-[#E07A5F] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md rotate-3">
              100% Produk Kreatif Asli
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
