import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, CartItem, PaymentType, Order } from '../types';
import { paymentOptions, formatRupiah, generateWhatsAppMessage } from '../data/initialData';
import confetti from 'canvas-confetti';
import { 
  X, 
  Check, 
  Copy, 
  QrCode, 
  Building2, 
  Smartphone, 
  Receipt, 
  Upload, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  directBuyItem?: { product: Product; quantity: number; note?: string } | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  directBuyItem
}) => {
  const { cart, storeInfo, createOrder, verifyOrderPayment, currentUser, setActiveTab } = useStore();

  // Step flow: 'details' -> 'payment' -> 'verifying' -> 'success'
  const [step, setStep] = useState<'details' | 'payment' | 'verifying' | 'success'>('details');

  // Customer Input Fields
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('Yogyakarta');
  const [orderNotes, setOrderNotes] = useState('');
  const [selectedCourier, setSelectedCourier] = useState('Shopee Xpress / Reguler (Rp 10.000)');
  const [shippingFee, setShippingFee] = useState(10000);

  // Payment Selection
  const [selectedPayment, setSelectedPayment] = useState<PaymentType>('qris');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Active Order created
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Timer simulation for QRIS
  const [qrCountdown, setQrCountdown] = useState(300); // 5 mins
  const [isVerifying, setIsVerifying] = useState(false);
  const [autoRedirectCounter, setAutoRedirectCounter] = useState(5);

  // Items to checkout (either direct single item or whole cart)
  const itemsToCheckout: CartItem[] = directBuyItem 
    ? [{ product: directBuyItem.product, quantity: directBuyItem.quantity, customNote: directBuyItem.note }]
    : cart;

  const subtotal = itemsToCheckout.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal > 150000 ? 10000 : 0;
  const total = subtotal + shippingFee - discount;

  // Selected payment details
  const activePaymentOption = paymentOptions.find(p => p.id === selectedPayment) || paymentOptions[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'payment' && selectedPayment === 'qris' && qrCountdown > 0) {
      timer = setInterval(() => {
        setQrCountdown(c => c - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, selectedPayment, qrCountdown]);

  // Handle auto redirect counter once order is verified
  useEffect(() => {
    let countTimer: NodeJS.Timeout;
    if (step === 'success' && autoRedirectCounter > 0) {
      countTimer = setInterval(() => {
        setAutoRedirectCounter(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countTimer);
  }, [step, autoRedirectCounter]);

  if (!isOpen || itemsToCheckout.length === 0) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Mohon lengkapi Nama, No. WhatsApp, dan Alamat pengiriman.');
      return;
    }

    // Create the order in state
    const newOrder = createOrder({
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail || 'pelanggan@gmail.com',
        address: customerAddress,
        city: customerCity,
        notes: orderNotes
      },
      items: itemsToCheckout,
      subtotal,
      shippingFee,
      discount,
      total,
      paymentType: selectedPayment,
      courier: selectedCourier
    });

    setCreatedOrder(newOrder);
    setStep('payment');
  };

  const handleSimulatePaymentConfirmation = (proof = '') => {
    if (!createdOrder) return;
    setIsVerifying(true);

    // Simulate instant verified process (1.2 seconds)
    setTimeout(() => {
      verifyOrderPayment(createdOrder.id, proof || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80');
      
      const updatedOrder = {
        ...createdOrder,
        paymentStatus: 'verified' as const,
        orderStatus: 'terverifikasi' as const,
        verifiedAt: new Date().toISOString()
      };
      setCreatedOrder(updatedOrder);
      setIsVerifying(false);
      setStep('success');

      // Trigger celebratory confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const openWhatsAppNotification = () => {
    if (!createdOrder) return;
    const waUrl = `https://wa.me/${storeInfo.whatsappNumber}?text=${generateWhatsAppMessage(createdOrder, storeInfo)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border-2 border-[#EBDCCF] shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EBDCCF] bg-[#FCF8F2] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] border border-[#FFCFBF] text-[#FF694B] flex items-center justify-center font-bold">
              {step === 'details' ? '1' : step === 'payment' ? '2' : '3'}
            </div>
            <div>
              <h3 className="font-fredoka text-lg sm:text-xl font-bold text-[#44352D]">
                {step === 'details' && 'Informasi Pengiriman & Pemesan'}
                {step === 'payment' && 'Metode Pembayaran Instan'}
                {step === 'success' && 'Pembayaran Terverifikasi & Sukses! 🎉'}
              </h3>
              <p className="text-xs text-[#7A6960]">
                {step === 'details' && 'Isi data untuk pengiriman pesanan Rumah Kreasi'}
                {step === 'payment' && 'Pilih QRIS, Bank VA, E-Wallet atau Transfer Otomatis'}
                {step === 'success' && 'Pesanan sedang diproses dan diteruskan ke WhatsApp'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7A6960] hover:bg-[#F2E5D5] hover:text-[#44352D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 flex-1">
          
          {/* ================= STEP 1: CUSTOMER & SHIPPING DETAILS ================= */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              
              {/* Order Items Review Snippet */}
              <div className="bg-[#FAF4EC] p-4 rounded-2xl border border-[#E9D9C9] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#55433A]">
                  <span>Ringkasan Produk ({itemsToCheckout.length} jenis barang)</span>
                  <span className="text-[#FF694B]">Subtotal: {formatRupiah(subtotal)}</span>
                </div>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {itemsToCheckout.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs text-[#6F5E54] bg-white p-2 rounded-xl border border-[#EFE5D9]">
                      <div className="flex items-center gap-2">
                        <img src={item.product.image} alt="" className="w-8 h-8 rounded-md object-cover" />
                        <div>
                          <div className="font-bold text-[#44352D] line-clamp-1">{item.product.title}</div>
                          <div className="text-[11px] text-[#9A877C]">{item.quantity}x @ {formatRupiah(item.product.price)}</div>
                        </div>
                      </div>
                      <span className="font-bold text-[#E25330]">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Nama Lengkap Penerima <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Nayla Ramadhani"
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white focus:outline-hidden focus:border-[#FF694B] shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    No. WhatsApp (Aktif untuk Konfirmasi) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white focus:outline-hidden focus:border-[#FF694B] shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Email (Opsional untuk bukti invoice)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="emailkamu@gmail.com"
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white focus:outline-hidden focus:border-[#FF694B] shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Kota / Kabupaten Pengiriman
                  </label>
                  <select
                    value={customerCity}
                    onChange={(e) => {
                      setCustomerCity(e.target.value);
                      if (e.target.value.includes('Yogyakarta') || e.target.value.includes('Sleman')) {
                        setShippingFee(10000);
                      } else {
                        setShippingFee(18000);
                      }
                    }}
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white focus:outline-hidden focus:border-[#FF694B] shadow-2xs"
                  >
                    <option value="Kota Yogyakarta">D.I. Yogyakarta (Rp 10.000)</option>
                    <option value="Kab. Sleman">Kab. Sleman (Rp 10.000)</option>
                    <option value="Kab. Bantul">Kab. Bantul (Rp 10.000)</option>
                    <option value="DKI Jakarta">DKI Jakarta & Sekitarnya (Rp 18.000)</option>
                    <option value="Bandung / Jawa Barat">Bandung / Jawa Barat (Rp 18.000)</option>
                    <option value="Surabaya / Jawa Timur">Surabaya / Jawa Timur (Rp 18.000)</option>
                    <option value="Luar Pulau Jawa">Luar Pulau Jawa (Rp 28.000)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#44352D] mb-1">
                  Alamat Lengkap Pengiriman <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, patokan..."
                  className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white focus:outline-hidden focus:border-[#FF694B] shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#44352D] mb-1">
                  Catatan Tambahan untuk Admin (Opsional):
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Misal: Mohon kartu ucapan tulis 'Selamat Ulang Tahun Kayla', bungkus kado yaa"
                  className="w-full text-xs p-3 rounded-xl border border-[#E2D0BD] bg-[#FAF5EE] focus:bg-white focus:outline-hidden focus:border-[#FF694B]"
                />
              </div>

              {/* Total Calculation */}
              <div className="bg-[#FFF8F0] p-4 rounded-2xl border-2 border-dashed border-[#E8D4C0] space-y-2 text-xs text-[#6F5E54]">
                <div className="flex justify-between">
                  <span>Subtotal Barang:</span>
                  <span className="font-bold text-[#44352D]">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim ({customerCity}):</span>
                  <span className="font-bold text-[#44352D]">{formatRupiah(shippingFee)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700 font-bold">
                    <span>Diskon Spesial Belanja &gt; Rp 150rb:</span>
                    <span>-{formatRupiah(discount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#EBDCCF] flex justify-between text-base font-extrabold text-[#44352D]">
                  <span>Total Tagihan:</span>
                  <span className="text-xl text-[#E25330]">{formatRupiah(total)}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-3 rounded-xl border border-[#D8C7B5] text-[#6E5C52] text-xs font-bold hover:bg-[#F5ECE0]"
                >
                  Kembali
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-2xl bg-[#FF694B] hover:bg-[#E75435] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Pilih Metode Pembayaran</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* ================= STEP 2: PAYMENT METHOD & INSTANT VERIFICATION ================= */}
          {step === 'payment' && (
            <div className="space-y-6">
              
              {/* Top Payment Method Selector Grid */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#44352D] uppercase tracking-wider">
                  Pilih Saluran Pembayaran:
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {paymentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedPayment(opt.id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                        selectedPayment === opt.id
                          ? 'border-[#FF694B] bg-[#FFF5EF] shadow-xs'
                          : 'border-[#EADACB] bg-white hover:border-[#D5C2AF]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#44352D] line-clamp-1">
                          {opt.name.split('(')[0]}
                        </span>
                        {selectedPayment === opt.id && (
                          <CheckCircle2 className="w-4 h-4 text-[#FF694B] shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#FF694B] font-semibold">
                        {opt.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Payment Screen based on selection */}
              <div className="bg-[#FAF4EC] p-5 sm:p-6 rounded-3xl border border-[#E8D6C4] space-y-4">
                
                {/* Total tagihan */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8D6C4]">
                  <div>
                    <span className="text-xs text-[#7A6960]">No. Pesanan:</span>
                    <div className="font-mono font-bold text-sm text-[#44352D]">
                      {createdOrder?.id}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#7A6960]">Total Harus Dibayar:</span>
                    <div className="text-xl font-extrabold text-[#E25330]">
                      {formatRupiah(total)}
                    </div>
                  </div>
                </div>

                {/* 1. QRIS VIEW */}
                {selectedPayment === 'qris' && (
                  <div className="text-center space-y-4 py-2">
                    <div className="inline-block bg-white p-4 rounded-2xl border-2 border-[#E5D1BE] shadow-md">
                      <div className="w-48 h-48 mx-auto bg-white flex flex-col items-center justify-center relative p-2">
                        {/* Realistic Mock QRIS Code */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect width="100" height="100" fill="white" />
                          <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#1E293B" />
                          <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#1E293B" />
                          <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#1E293B" />
                          {/* Random QR Grid modules */}
                          <rect x="45" y="15" width="8" height="8" fill="#1E293B" />
                          <rect x="45" y="30" width="8" height="12" fill="#1E293B" />
                          <rect x="15" y="45" width="12" height="8" fill="#1E293B" />
                          <rect x="35" y="45" width="8" height="8" fill="#1E293B" />
                          <rect x="60" y="45" width="15" height="8" fill="#1E293B" />
                          <rect x="80" y="45" width="8" height="8" fill="#1E293B" />
                          <rect x="45" y="60" width="12" height="12" fill="#1E293B" />
                          <rect x="65" y="60" width="10" height="10" fill="#1E293B" />
                          <rect x="80" y="75" width="10" height="15" fill="#1E293B" />
                          <rect x="60" y="80" width="15" height="10" fill="#1E293B" />
                          {/* Center Brand icon */}
                          <rect x="42" y="42" width="16" height="16" rx="3" fill="#FF694B" />
                          <circle cx="50" cy="50" r="5" fill="white" />
                        </svg>
                      </div>
                      <div className="text-[11px] font-bold text-[#55433A] mt-2 flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#FF694B]" />
                        <span>NMID: ID1020258129038 • RUMAH KREASI</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#8B7669]">
                      <Clock className="w-4 h-4 text-[#FF694B]" />
                      <span>Sisa waktu scan: {Math.floor(qrCountdown / 60)}:{String(qrCountdown % 60).padStart(2, '0')}</span>
                    </div>

                    <div className="max-w-md mx-auto text-xs text-[#6F5E54] bg-white p-3 rounded-xl border border-[#EADBCE]">
                      💡 Buka BCA Mobile, Livin Mandiri, BRImo, GoPay, OVO, atau DANA Anda lalu scan QRIS di atas.
                    </div>

                    <button
                      onClick={() => handleSimulatePaymentConfirmation()}
                      disabled={isVerifying}
                      className="w-full max-w-md mx-auto py-3.5 px-4 rounded-2xl bg-[#527850] hover:bg-[#436341] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Memverifikasi Pembayaran QRIS...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Saya Sudah Scan / Konfirmasi Pembayaran</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* 2. VIRTUAL ACCOUNT VIEW */}
                {activePaymentOption.category === 'va' && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-[#E8D9CB] space-y-3">
                      <div className="text-xs text-[#7A6960] font-bold">Nomor Virtual Account:</div>
                      <div className="flex items-center justify-between bg-[#F8EFE4] p-3 rounded-xl border border-[#E6D4C2]">
                        <span className="font-mono text-base sm:text-lg font-bold text-[#44352D] tracking-wider">
                          {activePaymentOption.accountNumber}
                        </span>
                        <button
                          onClick={() => copyToClipboard(activePaymentOption.accountNumber || '', 'va')}
                          className="px-3 py-1.5 rounded-lg bg-[#FF694B] text-white text-xs font-bold hover:bg-[#E85637] flex items-center gap-1"
                        >
                          {copiedField === 'va' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedField === 'va' ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                      <div className="text-xs text-[#7A6960]">
                        Atas Nama: <strong className="text-[#44352D]">{activePaymentOption.accountName}</strong>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#E8D9CB] space-y-2 text-xs text-[#6F5E54]">
                      <div className="font-bold text-[#44352D]">Petunjuk Pembayaran:</div>
                      <ol className="list-decimal list-inside space-y-1">
                        {activePaymentOption.instructions.map((inst, i) => (
                          <li key={i}>{inst}</li>
                        ))}
                      </ol>
                    </div>

                    <button
                      onClick={() => handleSimulatePaymentConfirmation()}
                      disabled={isVerifying}
                      className="w-full py-3.5 px-4 rounded-2xl bg-[#FF694B] hover:bg-[#E85637] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Memeriksa Sistem VA Bank...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Cek Otomatis Status Pembayaran VA</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* 3. E-WALLET VIEW */}
                {activePaymentOption.category === 'ewallet' && (
                  <div className="space-y-4 text-center py-2">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#EBDCCF] flex items-center justify-center mx-auto text-2xl shadow-xs">
                      📱
                    </div>
                    <div>
                      <h4 className="font-bold text-[#44352D]">{activePaymentOption.name}</h4>
                      <p className="text-xs text-[#7A6960] max-w-sm mx-auto mt-1">
                        Sistem akan membuka aplikasi {activePaymentOption.name} Anda atau mengirimkan notifikasi persetujuan bayar instan.
                      </p>
                    </div>

                    <button
                      onClick={() => handleSimulatePaymentConfirmation()}
                      disabled={isVerifying}
                      className="w-full max-w-md mx-auto py-3.5 px-4 rounded-2xl bg-[#6351D9] hover:bg-[#5240C4] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Menyambungkan E-Wallet...</span>
                        </>
                      ) : (
                        <>
                          <Smartphone className="w-5 h-5" />
                          <span>Buka & Konfirmasi Bayar di {activePaymentOption.name}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* 4. MANUAL TRANSFER VIEW */}
                {activePaymentOption.category === 'manual' && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-[#E8D9CB] space-y-3">
                      <div className="text-xs text-[#7A6960] font-bold">Nomor Rekening BCA Resmi:</div>
                      <div className="flex items-center justify-between bg-[#F8EFE4] p-3 rounded-xl border border-[#E6D4C2]">
                        <span className="font-mono text-lg font-bold text-[#44352D]">
                          {activePaymentOption.accountNumber}
                        </span>
                        <button
                          onClick={() => copyToClipboard(activePaymentOption.accountNumber || '', 'rek')}
                          className="px-3 py-1.5 rounded-lg bg-[#FF694B] text-white text-xs font-bold hover:bg-[#E85637] flex items-center gap-1"
                        >
                          {copiedField === 'rek' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedField === 'rek' ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                      <div className="text-xs text-[#7A6960]">
                        Nama Pemilik Rekening: <strong className="text-[#44352D]">{activePaymentOption.accountName}</strong>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#E8D9CB] space-y-3">
                      <div className="text-xs font-bold text-[#44352D] flex items-center gap-1.5">
                        <Upload className="w-4 h-4 text-[#FF694B]" />
                        <span>Upload Bukti Transfer (Opsional / Otomatis):</span>
                      </div>
                      <label className="border-2 border-dashed border-[#E3CCA9] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#FCF9F5]">
                        <span className="text-xs font-bold text-[#6F5E54]">Klik untuk pilih foto struk transfer / screenshot m-banking</span>
                        <span className="text-[10px] text-[#A39287] mt-0.5">JPG, PNG (Maks 5MB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleSimulatePaymentConfirmation('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80');
                            }
                          }}
                        />
                      </label>
                    </div>

                    <button
                      onClick={() => handleSimulatePaymentConfirmation()}
                      disabled={isVerifying}
                      className="w-full py-3.5 px-4 rounded-2xl bg-[#527850] hover:bg-[#436341] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Memverifikasi Struk Bank...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Konfirmasi Pembayaran Otomatis</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

              </div>

              <div className="flex justify-between items-center text-xs text-[#7A6960]">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex items-center gap-1 hover:text-[#44352D] font-bold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Ubah Data Pengiriman</span>
                </button>

                <div className="flex items-center gap-1 text-[#527850] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enkripsi 256-bit Aman</span>
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 3: SUCCESS & AUTOMATIC WHATSAPP REDIRECTION ================= */}
          {step === 'success' && createdOrder && (
            <div className="text-center space-y-6 py-2">
              
              {/* Success Badge */}
              <div className="w-20 h-20 rounded-full bg-[#EBF7EA] text-[#488B44] border-4 border-[#C7EBC4] flex items-center justify-center mx-auto text-3xl shadow-md animate-bounce">
                ✓
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#EAF5E9] text-[#478743] text-xs font-bold border border-[#CCE8C9] mb-2">
                  LUNAS & TERVERIFIKASI OTOMATIS
                </span>
                <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-[#44352D]">
                  Terima Kasih, {createdOrder.customer.name}!
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6960] max-w-md mx-auto mt-1">
                  Pesanan Anda dengan nomor <strong className="text-[#E25330] font-mono">{createdOrder.id}</strong> telah berhasil dibuat dan dibayar.
                </p>
              </div>

              {/* Automatic WhatsApp Redirection Alert Box */}
              <div className="bg-[#FFF4ED] p-5 rounded-3xl border-2 border-[#FFC8B8] shadow-sm text-left space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#25D366] text-white shrink-0 shadow-xs">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#44352D]">
                      Notifikasi WhatsApp Otomatis ke Admin Rumah Kreasi
                    </h4>
                    <p className="text-xs text-[#735F54] mt-0.5 leading-relaxed">
                      Sistem telah menyusun rincian pesanan dan struk pembayaran Anda. Klik tombol hijau di bawah untuk langsung mengirimkan konfirmasi ke WhatsApp Admin!
                    </p>
                  </div>
                </div>

                <button
                  onClick={openWhatsAppNotification}
                  className="w-full py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Kirim Notifikasi Otomatis ke WhatsApp Sekarang</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EBDCCF] text-left text-xs space-y-2 text-[#6A5A50]">
                <div className="flex justify-between border-b border-[#F2E5D5] pb-2 font-bold text-[#44352D]">
                  <span>Detail Penerima</span>
                  <span className="text-[#527850]">Status: Siap Dikemas</span>
                </div>
                <div>Alamat: {createdOrder.customer.address}, {createdOrder.customer.city}</div>
                <div>No. WhatsApp: {createdOrder.customer.phone}</div>
                <div className="pt-1 flex justify-between font-bold text-[#44352D]">
                  <span>Total Pembayaran</span>
                  <span className="text-sm text-[#E25330]">{formatRupiah(createdOrder.total)}</span>
                </div>
              </div>

              {/* Close & Track buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    setActiveTab('order-tracker');
                  }}
                  className="py-3 px-4 rounded-xl bg-[#55433A] hover:bg-[#43342D] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pantau Status Pengiriman Pesanan</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setActiveTab('catalog');
                  }}
                  className="py-3 px-4 rounded-xl bg-[#FAF3EA] hover:bg-[#F2E5D5] text-[#55433A] text-xs font-bold border border-[#E5D2BF] cursor-pointer"
                >
                  Lanjut Belanja Produk Lain
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
