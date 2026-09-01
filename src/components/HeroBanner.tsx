import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  ExternalLink, 
  ShoppingBag, 
  ShieldCheck, 
  Zap, 
  Heart, 
  CheckCircle2, 
  MessageCircle,
  Truck,
  QrCode
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { storeInfo, setActiveTab, setIsChatOpen } = useStore();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FFF5EA] via-[#FDF8F2] to-[#FAF3E9] border-b border-[#ECDBCB] pt-6 pb-12 sm:pb-16">
      {/* Subtle Craft Dot Texture Background */}
      <div className="absolute inset-0 bg-craft-dots opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand Story & CTA Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5DC] text-[#DE4E2B] text-xs font-bold border border-[#FFCAB8] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL STORE & WORKSHOP
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8F1E7] text-[#4F734D] text-xs font-bold border border-[#CDE0CC]">
                <Heart className="w-3.5 h-3.5 fill-[#4F734D]" />
                {storeInfo.year}
              </span>
            </div>

            {/* Main Headline with Brand Name */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#42332C] leading-none">
                Selamat Datang di <br />
                <span className="font-fredoka text-[#FF633E] underline decoration-wavy decoration-[#FFB899] decoration-2">
                  Rumah Kreasi
                </span>
              </h1>
              <p className="font-hand text-2xl sm:text-3xl text-[#759773] mt-2 font-bold tracking-wide">
                "{storeInfo.tagline}"
              </p>
              <p className="text-sm sm:text-base text-[#6E5D53] max-w-xl mx-auto lg:mx-0 mt-3 leading-relaxed">
                Pusat produk edukatif anak, flashcard pintar, DIY craft kit, souvenir gantungan kunci estetik, hingga buket bunga kado spesial buatan tangan yang penuh makna.
              </p>
            </div>

            {/* Direct Purchase and Channel Options */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => setActiveTab('catalog')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FF694B] hover:bg-[#E95638] text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Beli Langsung di Web</span>
                <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">QRIS / Bank</span>
              </button>

              <a
                href={storeInfo.shopeeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#FFF0ED] hover:bg-[#FFE3DC] text-[#EE4D2D] font-bold text-sm border-2 border-[#FFC8BB] transition-all flex items-center justify-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#EE4D2D]"></span>
                <span>Pesan di Shopee</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={storeInfo.lynkIdUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#F4F1FF] hover:bg-[#E9E4FE] text-[#6351D9] font-bold text-sm border-2 border-[#D6CDFB] transition-all flex items-center justify-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#6351D9]"></span>
                <span>Pesan di Lynk.id</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Payment & Security Badges */}
            <div className="pt-4 border-t border-[#EBDCCF] grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 border border-[#E9DACD]">
                <QrCode className="w-5 h-5 text-[#FF694B] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#43352F]">QRIS Instan</div>
                  <div className="text-[10px] text-[#7E6E66]">Semua E-Wallet & Bank</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 border border-[#E9DACD]">
                <Zap className="w-5 h-5 text-[#E69719] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#43352F]">Otomatis WA</div>
                  <div className="text-[10px] text-[#7E6E66]">Notifikasi instan</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 border border-[#E9DACD]">
                <Truck className="w-5 h-5 text-[#5F885D] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#43352F]">Kirim Cepat</div>
                  <div className="text-[10px] text-[#7E6E66]">Packing aman boks</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 border border-[#E9DACD]">
                <ShieldCheck className="w-5 h-5 text-[#3B82F6] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#43352F]">100% Asli</div>
                  <div className="text-[10px] text-[#7E6E66]">Kualitas terjamin</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Centerpiece Matching User's Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Circular Emblem Container with Stitched Border */}
              <div className="relative bg-[#FFFBF6] border-4 border-dashed border-[#E3CCA9] rounded-[40px] p-6 sm:p-8 shadow-xl text-center space-y-4">
                
                {/* Floating "Company Profile" Tape Label */}
                <div className="absolute -top-3 -left-3 bg-[#E77154] text-white px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-wider shadow-sm transform -rotate-6 border border-white">
                  ★ COMPANY PROFILE
                </div>

                {/* Floating Note Card: Core Values */}
                <div className="absolute -top-4 -right-3 sm:-right-6 bg-[#FFFDF8] border border-[#E5D2BE] rounded-xl p-3 shadow-md transform rotate-6 w-32 sm:w-36 text-left hidden xs:block">
                  <div className="w-3 h-3 bg-[#DE5E41] rounded-full mx-auto -mt-4 mb-2 shadow-xs"></div>
                  <div className="space-y-1 text-[11px] font-bold text-[#55433A]">
                    <div className="flex items-center gap-1 text-[#DE5232]">
                      <Heart className="w-3 h-3 fill-[#DE5232]" />
                      <span>Kreatif</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#658C63]">
                      <CheckCircle2 className="w-3 h-3 text-[#658C63]" />
                      <span>Edukatif</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#D98E16]">
                      <span>★</span>
                      <span>Berkualitas</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#8B67C4]">
                      <span>💜</span>
                      <span>Bermakna</span>
                    </div>
                  </div>
                </div>

                {/* Central Emblem Illustration */}
                <div className="py-2">
                  <div className="relative inline-block mx-auto mb-2">
                    {/* Roof & House vector */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl mb-1 animate-pulse">❤️</div>
                      <div className="flex items-center justify-center -space-x-1">
                        {/* Big Roof */}
                        <div className="w-0 h-0 border-l-[28px] border-l-transparent border-r-[28px] border-r-transparent border-b-[24px] border-b-[#FF5C3B] relative">
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex gap-1">
                            <div className="w-1.5 h-1.5 bg-[#FFF3E3] rounded-xs"></div>
                            <div className="w-1.5 h-1.5 bg-[#FFF3E3] rounded-xs"></div>
                          </div>
                        </div>
                        {/* Smaller Connected Roof */}
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[18px] border-b-[#E34A29]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Big Playful Text */}
                  <div className="space-y-0.5">
                    <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-[#FF633E] tracking-wide">
                      RUMAH
                    </h2>
                    <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-[#648F62] tracking-wide">
                      KREASI
                    </h2>
                  </div>

                  <p className="font-hand text-xl text-[#7E6C63] font-bold mt-2">
                    A little corner of creativity
                  </p>
                  <p className="text-[11px] font-bold text-[#A8968C] tracking-widest uppercase">
                    {storeInfo.year}
                  </p>
                </div>

                {/* Tagline footer banner */}
                <div className="pt-2 border-t border-dashed border-[#E3CCA9]">
                  <div className="inline-block bg-[#F2E5D5] text-[#55433A] text-xs font-extrabold px-3 py-1.5 rounded-full">
                    {storeInfo.subTagline}
                  </div>
                </div>

                {/* Quick Chat with Admin Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#523E34] hover:bg-[#3D2D25] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FF8A68]" />
                    <span>Tanya Admin Langsung / Konsultasi Desain</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
