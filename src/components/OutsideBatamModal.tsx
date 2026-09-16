import React from 'react';
import { X, MapPin, MessageCircle, ShoppingBag, ExternalLink, ShieldCheck, Truck } from 'lucide-react';
import { RUMAH_KREASI_CONTACTS } from '../types';
import { generateOutsideBatamInquiryUrl } from '../utils/whatsapp';

interface OutsideBatamModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const OutsideBatamModal: React.FC<OutsideBatamModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full border border-[#E8E1D9] shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E8E1D9] bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E07A5F] text-white flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#2C2420] font-serif">
                Info Pemesanan Luar Kota Batam
              </h3>
              <p className="text-[11px] text-[#7F4F24]">Rumah Kreasi Craft & Gifts Studio</p>
            </div>
          </div>

          <button
            id="close-outside-batam-modal"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E8E1D9] text-[#7F4F24] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E1D9] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#582F0E]">
              <Truck className="w-4 h-4 text-[#E07A5F]" />
              <span>Sistem Pembelian Khusus Kota Batam</span>
            </div>
            <p className="text-xs text-[#554740] leading-relaxed">
              Sistem checkout otomatis di website ini dirancang khusus untuk pelanggan di area <strong>Kota Batam</strong> (Batam Kota, Nagoya, Bengkong, Sekupang, Batu Aji, Nongsa, dll) agar barang langsung kami kirim dengan kurir lokal tanpa antri.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#2C2420] uppercase tracking-wide">
              Bagaimana Jika Anda Berada di Luar Batam?
            </h4>
            <p className="text-xs text-[#554740] leading-relaxed">
              Jangan khawatir! Anda tetap bisa memesan buket bunga, akrilik lampu, souvenir, maupun hampers Rumah Kreasi ke seluruh Indonesia. Anda bisa langsung chat admin website kami untuk koordinasi ongkos kirim ekspedisi (J&T / JNE / SiCepat) atau order lewat Shopee:
            </p>
          </div>

          {/* Action Options */}
          <div className="space-y-2.5 pt-2">
            {/* WhatsApp Option */}
            <a
              id="outside-batam-wa-btn"
              href={generateOutsideBatamInquiryUrl(productName)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya Jawab Admin WhatsApp (+62 851-2800-2246)</span>
            </a>

            {/* Shopee Option */}
            <a
              id="outside-batam-shopee-btn"
              href={RUMAH_KREASI_CONTACTS.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#EE4D2D] hover:bg-[#d63d1e] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pesan via Shopee Resmi ({RUMAH_KREASI_CONTACTS.shopeeName})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Lynk.id Option */}
            <a
              id="outside-batam-lynkid-btn"
              href={RUMAH_KREASI_CONTACTS.lynkidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#0066FF] hover:bg-[#0052cc] text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Kunjungi Lynk.id ({RUMAH_KREASI_CONTACTS.lynkidName})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E1D9] text-center">
          <button
            onClick={onClose}
            className="text-xs text-[#7F4F24] hover:text-[#582F0E] font-medium underline cursor-pointer"
          >
            Tutup Jendela Ini
          </button>
        </div>
      </div>
    </div>
  );
};
