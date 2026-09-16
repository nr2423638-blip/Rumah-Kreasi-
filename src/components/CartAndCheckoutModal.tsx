import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  Copy, 
  QrCode, 
  Building2, 
  Smartphone, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  Send
} from 'lucide-react';
import { CartItem, Order, BATAM_DISTRICTS, PaymentMethod, RUMAH_KREASI_CONTACTS } from '../types';
import { 
  formatRupiah, 
  generateCustomerWhatsAppUrl, 
  generateAdminNotificationUrl 
} from '../utils/whatsapp';

interface CartAndCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderCreated: (order: Order) => void;
  onOpenOutsideBatamModal: () => void;
  onOpenReviewForProduct: (productId: string) => void;
}

export const CartAndCheckoutModal: React.FC<CartAndCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCreated,
  onOpenOutsideBatamModal,
  onOpenReviewForProduct,
}) => {
  if (!isOpen) return null;

  // Wizard steps: 'cart' -> 'shipping' -> 'payment' -> 'success'
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');

  // Shipping form state
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsapp, setCustomerWhatsapp] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [batamDistrict, setBatamDistrict] = useState(BATAM_DISTRICTS[0]);
  const [notes, setNotes] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [selectedBank, setSelectedBank] = useState('BCA');
  const [selectedEwallet, setSelectedEwallet] = useState('GoPay');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Auto redirect countdown to WhatsApp
  const [waCountdown, setWaCountdown] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalAmount = subtotal;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Start instant verification simulation
  const handleSimulatePaymentConfirmation = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);

      const orderNumber = `RK-BTM-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        customerName: customerName.trim() || 'Pelanggan Rumah Kreasi',
        customerWhatsapp: customerWhatsapp.trim() || '085128002246',
        customerAddress: customerAddress.trim() || 'Alamat Batam',
        batamDistrict,
        items: cartItems.map((ci) => ({
          productId: ci.product.id,
          name: ci.product.name,
          price: ci.product.price,
          quantity: ci.quantity,
          image: ci.product.image,
        })),
        totalAmount,
        paymentMethod,
        paymentChannel:
          paymentMethod === 'qris'
            ? 'QRIS All Payment (Otomatis)'
            : paymentMethod === 'bank_transfer'
            ? `Bank ${selectedBank} (Auto Verifikasi)`
            : `E-Wallet ${selectedEwallet}`,
        paymentStatus: 'paid',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        notes: notes.trim(),
      };

      setCompletedOrder(newOrder);
      onOrderCreated(newOrder);
      onClearCart();
      setStep('success');
      setWaCountdown(5); // start 5-second countdown to automatic WhatsApp redirect
    }, 2000);
  };

  // Countdown timer effect for WhatsApp redirection
  useEffect(() => {
    if (step === 'success' && waCountdown !== null && completedOrder) {
      if (waCountdown > 0) {
        const timer = setTimeout(() => {
          setWaCountdown(waCountdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else if (waCountdown === 0) {
        // Open WhatsApp automatically
        const url = generateCustomerWhatsAppUrl(completedOrder);
        window.open(url, '_blank');
        setWaCountdown(null);
      }
    }
  }, [step, waCountdown, completedOrder]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full border border-[#E8E1D9] shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E8E1D9] bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#582F0E] text-white flex items-center justify-center font-bold text-xs font-serif">
              RK
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#2C2420] font-serif">
                {step === 'cart' && 'Keranjang Belanja Rumah Kreasi'}
                {step === 'shipping' && 'Data Pemesan & Alamat Kota Batam'}
                {step === 'payment' && 'Pembayaran & Verifikasi Instan'}
                {step === 'success' && 'Pembayaran Berhasil & Terkonfirmasi!'}
              </h2>
              <p className="text-[11px] text-[#7F4F24]">
                {step === 'cart' && `${cartItems.length} produk siap dipesan`}
                {step === 'shipping' && 'Khusus pengiriman lokal area Kota Batam'}
                {step === 'payment' && 'QRIS & Bank Transfer dengan konfirmasi otomatis'}
                {step === 'success' && 'Pesanan telah dicatat & siap dialihkan ke WhatsApp'}
              </p>
            </div>
          </div>

          <button
            id="close-cart-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E8E1D9] text-[#7F4F24] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          {/* STEP 1: CART VIEW */}
          {step === 'cart' && (
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-3 text-[#7F4F24]">
                    <QrCode className="w-8 h-8 opacity-40" />
                  </div>
                  <h3 className="text-sm font-bold text-[#2C2420]">Keranjang belanja masih kosong</h3>
                  <p className="text-xs text-[#7F4F24] mt-1">
                    Silakan pilih buket, akrilik lampu, atau kado kreasi di katalog kami.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-[#582F0E] text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Mulai Belanja
                  </button>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-[#E8E1D9]">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="py-3 flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl border border-[#E8E1D9] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#2C2420] truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-bold text-[#582F0E] block mt-0.5">
                            {formatRupiah(item.product.price)}
                          </span>

                          {/* Quantity control */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-[#D9CFC4] rounded-lg bg-white overflow-hidden text-xs">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                                }
                                className="px-2 py-0.5 font-bold hover:bg-[#F3EFEA]"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 font-semibold text-center min-w-6">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    Math.min(item.product.stock, item.quantity + 1)
                                  )
                                }
                                className="px-2 py-0.5 font-bold hover:bg-[#F3EFEA]"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-[11px] text-[#7F4F24]">
                              Subtotal: {formatRupiah(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                          title="Hapus dari keranjang"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Batam Delivery Reminder Box */}
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#554740]">
                      <p className="font-semibold text-[#2C2420]">
                        Pengiriman Langsung Khusus Area Kota Batam
                      </p>
                      <p className="mt-0.5">
                        Bila Anda berdomisili di luar Batam,{' '}
                        <button
                          onClick={onOpenOutsideBatamModal}
                          className="text-[#E07A5F] font-bold underline hover:text-[#582F0E] cursor-pointer"
                        >
                          klik di sini untuk tanya ekspedisi via WA
                        </button>
                        .
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 2: SHIPPING DETAILS (KHUSUS KOTA BATAM) */}
          {step === 'shipping' && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Sistem Pengiriman Khusus Kota Batam:</strong>
                  <p className="mt-0.5">
                    Pesanan akan dikirimkan langsung ke alamat Anda di wilayah Batam setelah pembayaran terkonfirmasi.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Nama Lengkap Pemesan: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rina Melati"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    No. WhatsApp Aktif: * (Untuk Pengalihan Otomatis)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={customerWhatsapp}
                    onChange={(e) => setCustomerWhatsapp(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                  <span className="text-[10px] text-[#7F4F24] mt-0.5 block">
                    Format nomor lokal atau internasional (+62)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Kecamatan di Kota Batam: *
                  </label>
                  <select
                    value={batamDistrict}
                    onChange={(e) => setBatamDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E] cursor-pointer"
                  >
                    {BATAM_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Alamat Lengkap di Batam (Jalan / Perumahan / No. Rumah): *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Contoh: Komp. Ruko Nagoya Hill Blok C No. 5, dekat pusat oleh-oleh..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Catatan Pesanan / Tulisan Kartu Ucapan (Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Tolong tuliskan di kartu: 'Happy Graduation Dina!'"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD & INSTANT AUTO-VERIFICATION */}
          {step === 'payment' && (
            <div className="space-y-4">
              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 pb-2">
                <button
                  type="button"
                  id="tab-pay-qris"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'qris'
                      ? 'border-[#582F0E] bg-[#582F0E]/10 text-[#582F0E] font-bold shadow-xs'
                      : 'border-[#E8E1D9] bg-white text-[#554740] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-[#E07A5F]" />
                  <span className="text-xs block">QRIS</span>
                  <span className="text-[10px] text-emerald-600 block">Auto-Verify</span>
                </button>

                <button
                  type="button"
                  id="tab-pay-bank"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#582F0E] bg-[#582F0E]/10 text-[#582F0E] font-bold shadow-xs'
                      : 'border-[#E8E1D9] bg-white text-[#554740] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-[#582F0E]" />
                  <span className="text-xs block">Bank Transfer</span>
                  <span className="text-[10px] text-[#7F4F24] block">BCA / Mandiri</span>
                </button>

                <button
                  type="button"
                  id="tab-pay-ewallet"
                  onClick={() => setPaymentMethod('ewallet')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'ewallet'
                      ? 'border-[#582F0E] bg-[#582F0E]/10 text-[#582F0E] font-bold shadow-xs'
                      : 'border-[#E8E1D9] bg-white text-[#554740] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-[#0066FF]" />
                  <span className="text-xs block">E-Wallet</span>
                  <span className="text-[10px] text-[#7F4F24] block">GoPay / Dana / OVO</span>
                </button>
              </div>

              {/* QRIS PAYMENT CONTENT */}
              {paymentMethod === 'qris' && (
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D9CFC4] text-center space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E1D9] text-xs">
                    <span className="font-bold text-[#2C2420]">QRIS Standar Pembayaran Nasional</span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                      Verifikasi Instan
                    </span>
                  </div>

                  {/* QR Code Mock / Display */}
                  <div className="inline-block p-3 bg-white rounded-2xl shadow-sm border border-[#D9CFC4]">
                    <div className="w-44 h-44 bg-[#F8F9FA] rounded-xl border-2 border-dashed border-[#582F0E]/40 flex flex-col items-center justify-center relative p-2">
                      {/* Stylized QRIS Grid representation */}
                      <div className="w-full h-full flex flex-col items-center justify-center bg-white p-2 rounded-lg">
                        <QrCode className="w-28 h-28 text-[#2C2420]" />
                        <span className="text-[9px] font-mono tracking-widest text-[#7F4F24] mt-1">
                          NMID: ID102030405060
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#7F4F24] block">Merchant Resmi:</span>
                    <h4 className="text-sm font-bold text-[#2C2420]">RUMAH KREASI BATAM</h4>
                    <span className="text-lg font-extrabold text-[#582F0E] block mt-1">
                      Total: {formatRupiah(totalAmount)}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#554740] max-w-sm mx-auto">
                    Bisa di-scan menggunakan <strong>BCA Mobile, Livin Mandiri, BRImo, BNI Mobile, GoPay, OVO, Dana, ShopeePay</strong>, atau aplikasi mobile banking manapun.
                  </p>
                </div>
              )}

              {/* BANK TRANSFER CONTENT */}
              {paymentMethod === 'bank_transfer' && (
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D9CFC4] space-y-3">
                  <div className="flex items-center gap-2">
                    {['BCA', 'Mandiri', 'BRI', 'BNI'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-colors ${
                          selectedBank === bank
                            ? 'bg-[#582F0E] text-white'
                            : 'bg-white text-[#2C2420] border border-[#D9CFC4]'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E8E1D9] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#7F4F24]">Bank Tujuan:</span>
                      <span className="text-xs font-bold text-[#2C2420]">Bank {selectedBank}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#7F4F24]">No. Rekening:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold text-[#582F0E]">
                          {selectedBank === 'BCA' && '821-049-2246'}
                          {selectedBank === 'Mandiri' && '109-00-182939-1'}
                          {selectedBank === 'BRI' && '0129-01-084920-50-3'}
                          {selectedBank === 'BNI' && '098-112-8821'}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              selectedBank === 'BCA'
                                ? '8210492246'
                                : selectedBank === 'Mandiri'
                                ? '109001829391'
                                : '012901084920503',
                              'rekening'
                            )
                          }
                          className="p-1 bg-[#F3EFEA] hover:bg-[#E8E1D9] text-[#582F0E] rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedText === 'rekening' ? 'Tersalin!' : 'Salin'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#7F4F24]">Atas Nama:</span>
                      <span className="text-xs font-bold text-[#2C2420]">RUMAH KREASI</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E8E1D9]">
                      <span className="text-xs font-bold text-[#2C2420]">Nominal Transfer:</span>
                      <span className="text-sm font-extrabold text-[#582F0E]">
                        {formatRupiah(totalAmount)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#7F4F24]">
                    Sistem kami mendeteksi mutasi rekening bank secara otomatis dalam hitungan detik.
                  </p>
                </div>
              )}

              {/* EWALLET CONTENT */}
              {paymentMethod === 'ewallet' && (
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D9CFC4] space-y-3">
                  <div className="grid grid-cols-4 gap-1.5">
                    {['GoPay', 'Dana', 'OVO', 'ShopeePay'].map((ew) => (
                      <button
                        key={ew}
                        type="button"
                        onClick={() => setSelectedEwallet(ew)}
                        className={`py-1.5 px-1 rounded-lg text-xs font-bold text-center transition-colors ${
                          selectedEwallet === ew
                            ? 'bg-[#582F0E] text-white'
                            : 'bg-white text-[#2C2420] border border-[#D9CFC4]'
                        }`}
                      >
                        {ew}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E8E1D9] space-y-2 text-center">
                    <span className="text-xs text-[#7F4F24] block">No. Akun E-Wallet Rumah Kreasi:</span>
                    <span className="text-base font-mono font-bold text-[#582F0E] block">
                      0851-2800-2246
                    </span>
                    <span className="text-xs text-[#2C2420] block font-semibold">
                      a.n. Rumah Kreasi Batam
                    </span>
                  </div>
                </div>
              )}

              {/* Auto Confirmation Trigger Button */}
              <div className="pt-2">
                <button
                  id="confirm-payment-btn"
                  type="button"
                  disabled={isVerifying}
                  onClick={handleSimulatePaymentConfirmation}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isVerifying
                      ? 'bg-amber-600 cursor-wait'
                      : 'bg-emerald-600 hover:bg-emerald-700 active:scale-98'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sedang Memverifikasi Pembayaran Otomatis...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Saya Sudah Bayar / Konfirmasi Pembayaran Otomatis</span>
                    </>
                  )}
                </button>
                <span className="text-[10px] text-center block text-[#7F4F24] mt-1.5">
                  Proses verifikasi pesanan pelanggan secara instan dan aman
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS & WHATSAPP REDIRECTION */}
          {step === 'success' && completedOrder && (
            <div className="space-y-5 text-center py-2">
              {/* Green Success Badge */}
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  Pembayaran Terverifikasi & Lunas
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2C2420] font-serif mt-2">
                  Terima Kasih, {completedOrder.customerName}!
                </h3>
                <p className="text-xs text-[#554740] mt-1 max-w-md mx-auto">
                  Pesanan Anda <strong className="text-[#582F0E]">#{completedOrder.orderNumber}</strong> berhasil diverifikasi dan tersimpan di sistem Rumah Kreasi Batam.
                </p>
              </div>

              {/* Automatic WhatsApp Redirection Notice */}
              <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-4 rounded-2xl text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1EBE5D]">
                    <MessageCircle className="w-4 h-4" />
                    <span>Notifikasi WhatsApp Otomatis Pelanggan</span>
                  </div>
                  {waCountdown !== null && (
                    <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                      Dialihkan dalam {waCountdown}s...
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#2C2420]">
                  Setelah pembayaran terkonfirmasi, Anda langsung dialihkan ke WhatsApp resmi Rumah Kreasi (+62 851-2800-2246) agar pesanan segera disiapkan untuk pengiriman wilayah Batam:
                </p>

                {/* Big WhatsApp Redirect Button */}
                <a
                  id="btn-whatsapp-redirect"
                  href={generateCustomerWhatsAppUrl(completedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Rincian Pesanan ke WhatsApp Admin Sekarang</span>
                </a>

                {/* Secondary Admin WhatsApp Notification link */}
                <div className="pt-2 border-t border-[#25D366]/20 flex items-center justify-between text-[11px]">
                  <span className="text-[#554740]">Notifikasi Admin Rumah Kreasi:</span>
                  <a
                    id="btn-admin-wa-alert"
                    href={generateAdminNotificationUrl(completedOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1EBE5D] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Cek Format Pesanan Masuk Admin</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Order Receipt Card */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E1D9] text-left text-xs space-y-2">
                <div className="flex justify-between font-semibold text-[#2C2420] border-b border-[#E8E1D9] pb-2">
                  <span>No. Pesanan: {completedOrder.orderNumber}</span>
                  <span className="text-emerald-600 font-bold">LUNAS</span>
                </div>
                <div className="text-[#554740] space-y-1">
                  <p><strong>Penerima:</strong> {completedOrder.customerName} ({completedOrder.customerWhatsapp})</p>
                  <p><strong>Alamat Batam:</strong> {completedOrder.customerAddress}, {completedOrder.batamDistrict}</p>
                  <p><strong>Total Bayar:</strong> {formatRupiah(completedOrder.totalAmount)} ({completedOrder.paymentChannel})</p>
                </div>
              </div>

              {/* Option to leave verified review */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#D9CFC4] flex items-center justify-between text-xs">
                <span className="text-[#554740]">Sudah bayar? Berikan ulasan produk Anda:</span>
                <button
                  id="btn-leave-review-after-purchase"
                  onClick={() => {
                    const firstProdId = completedOrder.items[0]?.productId;
                    if (firstProdId) {
                      onOpenReviewForProduct(firstProdId);
                    }
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-[#582F0E] text-white font-semibold rounded-lg hover:bg-[#7F4F24] cursor-pointer"
                >
                  Tulis Ulasan & Foto
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-[#E8E1D9] bg-[#FAF7F2] flex items-center justify-between">
          {step === 'cart' && (
            <>
              <div>
                <span className="text-[11px] text-[#7F4F24] block">Total Pembayaran:</span>
                <span className="text-base sm:text-lg font-extrabold text-[#582F0E]">
                  {formatRupiah(totalAmount)}
                </span>
              </div>
              <button
                id="cart-proceed-shipping-btn"
                disabled={cartItems.length === 0}
                onClick={() => setStep('shipping')}
                className={`py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                  cartItems.length === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#582F0E] hover:bg-[#7F4F24] text-white shadow-xs active:scale-95'
                }`}
              >
                <span>Lanjut ke Alamat Batam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'shipping' && (
            <>
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="py-2 px-3 border border-[#D9CFC4] text-[#2C2420] hover:bg-[#F3EFEA] rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali</span>
              </button>

              <button
                id="shipping-proceed-payment-btn"
                disabled={!customerName.trim() || !customerWhatsapp.trim() || !customerAddress.trim()}
                onClick={() => setStep('payment')}
                className={`py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                  !customerName.trim() || !customerWhatsapp.trim() || !customerAddress.trim()
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#582F0E] hover:bg-[#7F4F24] text-white shadow-xs active:scale-95'
                }`}
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'payment' && (
            <>
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="py-2 px-3 border border-[#D9CFC4] text-[#2C2420] hover:bg-[#F3EFEA] rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ubah Alamat</span>
              </button>

              <div className="text-right">
                <span className="text-[11px] text-[#7F4F24] block">Nominal:</span>
                <span className="text-sm font-bold text-[#582F0E]">{formatRupiah(totalAmount)}</span>
              </div>
            </>
          )}

          {step === 'success' && (
            <button
              id="finish-order-modal-btn"
              onClick={onClose}
              className="w-full py-2.5 bg-[#582F0E] hover:bg-[#7F4F24] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Selesai & Kembali ke Toko
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
