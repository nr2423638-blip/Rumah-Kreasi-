import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';
import { formatRupiah, generateWhatsAppMessage } from '../data/initialData';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Receipt
} from 'lucide-react';

export const OrderTracker: React.FC = () => {
  const { orders, storeInfo, setActiveTab, currentUser } = useStore();
  const [searchId, setSearchId] = useState('');
  const [copiedResi, setCopiedResi] = useState<string | null>(null);

  // Filter orders
  const filteredOrders = searchId.trim()
    ? orders.filter(o => o.id.toLowerCase().includes(searchId.trim().toLowerCase()) || o.customer.phone.includes(searchId.trim()))
    : orders;

  const copyResi = (resi: string) => {
    navigator.clipboard.writeText(resi);
    setCopiedResi(resi);
    setTimeout(() => setCopiedResi(null), 2000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'menunggu_pembayaran':
        return <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] text-xs font-bold border border-[#FDE68A]">⏳ Menunggu Pembayaran</span>;
      case 'terverifikasi':
        return <span className="px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-bold border border-[#BAE6FD]">✅ Pembayaran Terverifikasi</span>;
      case 'dikemas':
        return <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-bold border border-[#FDE68A]">🎁 Sedang Dikemas</span>;
      case 'dikirim':
        return <span className="px-3 py-1 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-xs font-bold border border-[#DDD6FE]">🚚 Dalam Pengiriman</span>;
      case 'selesai':
        return <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-bold border border-[#BBF7D0]">🎉 Pesanan Selesai</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-[#F3F4F6] text-[#4B5563] text-xs font-bold">Status: {status}</span>;
    }
  };

  const getTimelineStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'menunggu_pembayaran': return 0;
      case 'terverifikasi': return 1;
      case 'dikemas': return 2;
      case 'dikirim': return 3;
      case 'selesai': return 4;
      default: return 0;
    }
  };

  const timelineSteps = [
    { label: 'Menunggu Bayar', icon: Clock },
    { label: 'Terverifikasi', icon: ShieldCheck },
    { label: 'Dikemas', icon: Package },
    { label: 'Dikirim', icon: Truck },
    { label: 'Selesai', icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Title & Search Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0EB] text-[#FF694B] text-xs font-bold border border-[#FFD2C4]">
          <Package className="w-3.5 h-3.5" />
          <span>PORTAL PELANGGAN RUMAH KREASI</span>
        </div>
        <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-[#44352D]">
          Lacak Pesanan & Status Pengiriman
        </h2>
        <p className="text-sm text-[#78665B] max-w-xl mx-auto">
          Pantau proses verifikasi pembayaran, nomor resi pengiriman kurir, dan bukti belanja pesanan Rumah Kreasi Anda secara real-time.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-2">
          <div className="relative">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Masukkan No. Pesanan (misal: RK-20250825...) atau No. WA"
              className="w-full text-sm py-3.5 pl-11 pr-4 rounded-2xl bg-white border-2 border-[#E8D9CC] focus:outline-hidden focus:border-[#FF694B] shadow-xs"
            />
            <Search className="w-5 h-5 text-[#9C8A7F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchId && (
              <button
                onClick={() => setSearchId('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-[#EAE0D5] hover:bg-[#DBCDC0] text-[#55433A] rounded-full w-5 h-5 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-[#FFFDF9] rounded-3xl border-2 border-dashed border-[#E5D2BF] p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F7EFE6] flex items-center justify-center mx-auto text-3xl">
              📦
            </div>
            <h4 className="font-fredoka text-lg font-bold text-[#44352D]">
              Pesanan Tidak Ditemukan
            </h4>
            <p className="text-xs text-[#7A6960] max-w-sm mx-auto">
              Pastikan nomor pesanan atau nomor WhatsApp yang Anda masukkan sudah sesuai saat melakukan checkout.
            </p>
            <button
              onClick={() => setActiveTab('catalog')}
              className="px-5 py-2.5 rounded-xl bg-[#FF694B] text-white text-xs font-bold hover:bg-[#E85637] transition-all cursor-pointer"
            >
              Kembali Belanja di Katalog
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const currentStepIdx = getTimelineStepIndex(order.orderStatus);
            const waUrl = `https://wa.me/${storeInfo.whatsappNumber}?text=${generateWhatsAppMessage(order, storeInfo)}`;

            return (
              <div 
                key={order.id}
                className="bg-[#FFFDF9] rounded-3xl border-2 border-[#EBDCCF] p-5 sm:p-7 shadow-xs space-y-6 hover:border-[#FF9E80] transition-colors"
              >
                {/* Header Card */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F0E2D5]">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base text-[#44352D]">
                        {order.id}
                      </span>
                      {getStatusBadge(order.orderStatus)}
                    </div>
                    <p className="text-xs text-[#8A7669]">
                      Waktu Pemesanan: {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Notifikasi WA Admin</span>
                    </a>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="bg-[#FAF4EC] p-4 sm:p-6 rounded-2xl border border-[#E9D9C9]">
                  <div className="grid grid-cols-5 gap-1 sm:gap-2 relative">
                    
                    {/* Connecting line */}
                    <div className="absolute top-1/2 left-6 right-6 h-1 bg-[#E0CDBD] -translate-y-1/2 z-0 hidden sm:block"></div>
                    
                    {timelineSteps.map((stepItem, idx) => {
                      const Icon = stepItem.icon;
                      const isPassed = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={idx} className="flex flex-col items-center text-center relative z-10 space-y-1.5">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                            isCurrent 
                              ? 'bg-[#FF694B] text-white ring-4 ring-[#FFD8CD] scale-110 shadow-md' 
                              : isPassed 
                              ? 'bg-[#527850] text-white' 
                              : 'bg-[#EBDCCF] text-[#8C7A70]'
                          }`}>
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className={`text-[10px] sm:text-xs font-bold leading-tight ${
                            isCurrent ? 'text-[#FF694B]' : isPassed ? 'text-[#527850]' : 'text-[#A39287]'
                          }`}>
                            {stepItem.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Courier and Shipping Info if available */}
                {order.resiNumber && (
                  <div className="bg-[#F0FDF4] p-4 rounded-2xl border border-[#BBF7D0] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#22C55E] text-white">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-[#166534] font-bold">
                          Kurir: {order.courier || 'Shopee Xpress Standard / JNE'}
                        </div>
                        <div className="font-mono text-sm font-bold text-[#14532D]">
                          No. Resi: {order.resiNumber}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => copyResi(order.resiNumber || '')}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#86EFAC] text-xs font-bold text-[#15803D] hover:bg-[#DCFCE7] flex items-center gap-1"
                    >
                      {copiedResi === order.resiNumber ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedResi === order.resiNumber ? 'Resi Tersalin' : 'Salin Resi'}</span>
                    </button>
                  </div>
                )}

                {/* Items and Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Items list */}
                  <div className="bg-white p-4 rounded-2xl border border-[#EBDCCF] space-y-2">
                    <h5 className="text-xs font-bold text-[#44352D] uppercase tracking-wider">
                      Barang Pesanan ({order.items.length} item)
                    </h5>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-[#F7EFE6] last:border-none">
                          <div className="flex items-center gap-2">
                            <img src={item.product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-[#F7EFE6]" />
                            <div>
                              <div className="font-bold text-[#44352D] line-clamp-1">{item.product.title}</div>
                              <div className="text-[11px] text-[#8C7A70]">{item.quantity}x @ {formatRupiah(item.product.price)}</div>
                              {item.customNote && <div className="text-[10px] text-[#FF694B] italic">"{item.customNote}"</div>}
                            </div>
                          </div>
                          <span className="font-bold text-[#E25330]">
                            {formatRupiah(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer details & Total summary */}
                  <div className="bg-white p-4 rounded-2xl border border-[#EBDCCF] space-y-2.5 text-xs text-[#6F5D53]">
                    <h5 className="font-bold text-[#44352D] uppercase tracking-wider">
                      Alamat & Pembayaran
                    </h5>
                    <div><strong>Penerima:</strong> {order.customer.name} ({order.customer.phone})</div>
                    <div><strong>Alamat:</strong> {order.customer.address}, {order.customer.city}</div>
                    {order.customer.notes && <div><strong>Catatan:</strong> {order.customer.notes}</div>}
                    
                    <div className="pt-2 border-t border-[#F2E5D5] space-y-1">
                      <div className="flex justify-between">
                        <span>Metode Pembayaran:</span>
                        <span className="font-bold text-[#44352D] uppercase">{order.paymentType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ongkir:</span>
                        <span>{formatRupiah(order.shippingFee)}</span>
                      </div>
                      <div className="flex justify-between font-extrabold text-sm text-[#44352D] pt-1 border-t border-dashed border-[#EBDCCF]">
                        <span>Total Akhir:</span>
                        <span className="text-[#E25330]">{formatRupiah(order.total)}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
