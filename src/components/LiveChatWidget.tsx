import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink, 
  HelpCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const { 
    isChatOpen, 
    setIsChatOpen, 
    chatMessages, 
    sendChatMessage, 
    storeInfo, 
    markChatAsRead,
    unreadChatCount 
  } = useStore();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      markChatAsRead();
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isChatOpen, chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendChatMessage(inputMessage.trim(), 'customer');
    setInputMessage('');
  };

  const handleQuickQuestion = (question: string) => {
    sendChatMessage(question, 'customer');
  };

  return (
    <>
      {/* Floating Chat Bubble Toggle Button */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsChatOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-[#FF694B] hover:bg-[#E85637] text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6 fill-white" />
              {unreadChatCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadChatCount}
                </span>
              )}
            </div>

            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold leading-tight">Chat Admin</div>
              <div className="text-[10px] text-white/80">Online & Fast Respon</div>
            </div>
          </button>
        </div>
      )}

      {/* Expandable Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-[#FFFDF9] rounded-3xl border-2 border-[#EBDCCF] shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Chat Header */}
          <div className="bg-[#44352D] text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-[#FF694B] flex items-center justify-center text-lg">
                  🏠
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-[#44352D] absolute -bottom-0.5 -right-0.5"></div>
              </div>
              <div>
                <h4 className="font-fredoka text-sm font-bold tracking-wide">
                  Admin Rumah Kreasi
                </h4>
                <p className="text-[11px] text-green-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                  Online • Siap Membantu
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FCF8F2]/60">
            
            {/* Direct WhatsApp Switch Banner */}
            <div className="bg-[#EAF7EA] border border-[#C2EAC0] rounded-2xl p-3 text-xs text-[#2E682A] space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#25D366]" />
                  Chat Langsung di WhatsApp:
                </span>
                <span className="text-[10px] text-[#4F834C]">Fast Respon</span>
              </div>
              <p className="text-[11px] text-[#497047]">
                Ingin konsultasi pesanan kado, souvenir partai besar, atau tanya stok langsung?
              </p>
              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}?text=Halo%20Admin%20Rumah%20Kreasi%2C%20saya%20mau%20tanya%20seputar%20produk%20dan%20pemesanan%20%E2%9C%A8`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Buka Chat WhatsApp (+{storeInfo.whatsappNumber})</span>
              </a>
            </div>

            {/* Chat History */}
            {chatMessages.map((msg) => {
              const isAdmin = msg.sender === 'admin';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAdmin ? 'items-start' : 'items-end'} space-y-1`}
                >
                  <span className="text-[10px] text-[#8C7A70] px-1 font-semibold">
                    {msg.senderName} • {msg.time}
                  </span>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isAdmin
                        ? 'bg-white border border-[#EBDCCF] text-[#44352D] rounded-tl-xs shadow-2xs'
                        : 'bg-[#FF694B] text-white rounded-tr-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Prompts */}
          <div className="px-3 py-2 bg-[#F7EFE6] border-t border-[#EBDCCF] overflow-x-auto flex gap-1.5 shrink-0">
            {[
              '🛍️ Cara bayar QRIS & Bank?',
              '🎁 Bisa request kado?',
              '🛒 Pesan via Shopee?',
              '🚚 Ongkir & Pengiriman'
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-[#E0CFBD] text-[11px] font-bold text-[#6E5D53] hover:bg-[#FFF4EC] hover:text-[#FF694B] transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#EBDCCF] flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pesan untuk mimin..."
              className="flex-1 text-xs p-2.5 rounded-xl border border-[#E2D0BD] bg-[#FAF5EE] focus:bg-white focus:outline-hidden focus:border-[#FF694B]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-[#FF694B] hover:bg-[#E85637] text-white disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
