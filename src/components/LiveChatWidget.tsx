import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Sparkles, 
  MapPin, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ChatMessage, RUMAH_KREASI_CONTACTS } from '../types';
import { generateSupportWhatsAppUrl, generateOutsideBatamInquiryUrl } from '../utils/whatsapp';
import logoImg from '../assets/images/rumah_kreasi_logo_1789096056648.jpg';

interface LiveChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  isOpen,
  onToggle,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'admin',
      text: 'Halo! Selamat datang di Rumah Kreasi Batam 🌸 Ada yang bisa kami bantu? Anda bisa bertanya stok produk, custom pesanan, atau pengiriman ke luar kota Batam.',
      timestamp: 'Baru saja',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const QUICK_QUESTIONS = [
    'Saya di luar Batam, bisa kirim?',
    'Bisa custom nama & kartu ucapan?',
    'Berapa lama proses pembuatan akrilik/buket?',
    'Cara konfirmasi pembayaran QRIS?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate smart Admin reply
    setIsTyping(true);
    setTimeout(() => {
      let replyText = 'Terima kasih telah menghubungi kami! Admin Rumah Kreasi siap membantu.';
      
      const lower = text.toLowerCase();
      if (lower.includes('luar batam') || lower.includes('luar kota') || lower.includes('kirim')) {
        replyText = 'Untuk wilayah Kota Batam pengiriman via kurir lokal instan. Jika Kakak berada di LUAR KOTA BATAM, kami tetap bisa kirimkan via J&T/JNE/SiCepat atau order melalui Shopee kami (rumahkreasi.btm). Silakan hubungi WA admin kami di +62 851-2800-2246 untuk rincian ongkir ya kak!';
      } else if (lower.includes('custom') || lower.includes('nama') || lower.includes('ucapan')) {
        replyText = 'Bisa banget kak! Akrilik LED, frame 3D, maupun hampers wisuda bisa dicustom nama, foto, dan kartu ucapan gratis. Kakak bisa cantumkan di catatan checkout atau kirim detailnya ke WhatsApp kami!';
      } else if (lower.includes('qris') || lower.includes('bayar') || lower.includes('transfer')) {
        replyText = 'Sistem pembayaran di website ini sudah terhubung dengan QRIS dan Bank Transfer dengan verifikasi otomatis instan. Setelah bayar, Kakak akan langsung dialihkan ke notifikasi WhatsApp otomatis!';
      } else if (lower.includes('lama') || lower.includes('proses')) {
        replyText = 'Barang ready stock (buket, gantungan rajut) langsung dikirim hari yang sama untuk area Batam. Untuk custom akrilik atau frame biasanya memakan waktu 1-2 hari kerja kak.';
      }

      const adminReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'admin',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, adminReply]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            id="floating-live-chat-btn"
            onClick={onToggle}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#582F0E] hover:bg-[#7F4F24] text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-white"
            aria-label="Chat Admin Website"
          >
            {/* Pulsing indicator */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>

            <MessageCircle className="w-5 h-5 text-[#E07A5F]" />
            <span className="text-xs font-bold font-sans">Chat Admin</span>
          </button>
        )}
      </div>

      {/* Chat Pop-up Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-[#FFFDF9] rounded-3xl border border-[#E8E1D9] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-[#582F0E] text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={logoImg}
                  alt="Rumah Kreasi"
                  className="w-9 h-9 rounded-full object-cover border border-white/40"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#582F0E]" />
              </div>
              <div>
                <h3 className="text-xs font-bold font-serif leading-tight">
                  Admin Rumah Kreasi Batam
                </h3>
                <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                  Online • Siap Membantu Anda
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                id="chat-switch-wa-header"
                href={`https://wa.me/${RUMAH_KREASI_CONTACTS.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Buka Langsung di WhatsApp"
                className="p-1.5 text-emerald-300 hover:text-white rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                id="close-live-chat-btn"
                onClick={onClose}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-[#FAF7F2] px-3 py-1.5 text-[11px] text-[#7F4F24] border-b border-[#E8E1D9] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#E07A5F]" /> Khusus Pengiriman Kota Batam
            </span>
            <a
              href={generateSupportWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#582F0E] font-bold hover:underline"
            >
              WA: {RUMAH_KREASI_CONTACTS.whatsappNumber}
            </a>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-[#582F0E] text-white rounded-br-none'
                      : 'bg-[#F3EFEA] text-[#2C2420] border border-[#E8E1D9] rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-[#7F4F24]/70 mt-0.5 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-[11px] text-[#7F4F24] italic px-2">
                <span className="inline-block w-1.5 h-1.5 bg-[#582F0E] rounded-full animate-pulse" />
                <span className="inline-block w-1.5 h-1.5 bg-[#582F0E] rounded-full animate-pulse delay-75" />
                <span className="inline-block w-1.5 h-1.5 bg-[#582F0E] rounded-full animate-pulse delay-150" />
                <span className="ml-1">Admin sedang mengetik...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="p-2 bg-[#FAF7F2] border-t border-[#E8E1D9] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 bg-white border border-[#D9CFC4] hover:bg-[#F3EFEA] text-[10px] text-[#554740] font-medium rounded-full transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box & WhatsApp Action */}
          <div className="p-3 bg-white border-t border-[#E8E1D9] space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="chat-input-text"
                type="text"
                placeholder="Tulis pesan ke admin..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
              />
              <button
                id="chat-send-btn"
                type="submit"
                className="p-2.5 bg-[#582F0E] hover:bg-[#7F4F24] text-white rounded-xl cursor-pointer transition-colors"
                title="Kirim Pesan"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Switch to WhatsApp button */}
            <a
              id="chat-switch-wa-btn"
              href={`https://wa.me/${RUMAH_KREASI_CONTACTS.whatsappClean}?text=${encodeURIComponent(
                'Halo Admin Rumah Kreasi Batam, saya sedang mengunjungi website dan ingin bertanya langsung via WhatsApp.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-1.5 px-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1EBE5D] font-bold text-[11px] rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>Beralih ke WhatsApp (+62 851-2800-2246)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
