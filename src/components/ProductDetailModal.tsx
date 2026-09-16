import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ExternalLink, 
  Camera, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  AlertCircle,
  UploadCloud,
  ChevronRight
} from 'lucide-react';
import { Product, Review } from '../types';
import { formatRupiah } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectBuy: (product: Product, quantity: number) => void;
  reviews: Review[];
  onAddReview: (review: Review) => void;
  hasVerifiedOrder: boolean;
  userPurchasedProductIds: string[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectBuy,
  reviews,
  onAddReview,
  hasVerifiedOrder,
  userPurchasedProductIds,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Review form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerArea, setReviewerArea] = useState('Batam Kota');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [reviewOrderNumber, setReviewOrderNumber] = useState('');
  const [verifyNotice, setVerifyNotice] = useState('');

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const isEligibleToReview = hasVerifiedOrder || userPurchasedProductIds.includes(product.id);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) {
      alert('Silakan isi nama dan ulasan Anda');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      customerName: reviewerName.trim(),
      rating,
      comment: comment.trim(),
      photoUrl: photoPreview || undefined,
      date: 'Baru saja',
      verifiedPurchase: true,
      batamArea: reviewerArea ? `${reviewerArea}, Batam` : 'Batam',
    };

    onAddReview(newReview);
    setShowReviewForm(false);
    setComment('');
    setPhotoPreview(null);
    alert('Terima kasih! Ulasan dan foto produk Anda berhasil diverifikasi & dipublikasikan.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-3xl w-full border border-[#E8E1D9] shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E8E1D9] bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#582F0E] px-2.5 py-1 bg-[#582F0E]/10 rounded-full">
              {product.category}
            </span>
            <span className="text-xs text-[#7F4F24] hidden sm:inline">• Rumah Kreasi Batam</span>
          </div>
          <button
            id="close-product-detail-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E8E1D9] text-[#7F4F24] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Grid: Image + Core Purchase Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="rounded-2xl overflow-hidden bg-[#F3EFEA] border border-[#E8E1D9] aspect-square relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#582F0E]/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                Stok: {product.stock} pcs
              </div>
            </div>

            {/* Product Info & Direct Buy */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-xs text-[#7F4F24]">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="font-bold text-[#2C2420]">{product.rating.toFixed(1)}</span>
                  <span>({product.reviewCount} ulasan pembeli)</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-[#2C2420] font-serif leading-snug">
                  {product.name}
                </h1>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-extrabold text-[#582F0E]">
                    {formatRupiah(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[#7F4F24]/70 line-through">
                      {formatRupiah(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#554740] mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector & Main Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#E8E1D9]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#2C2420]">Jumlah Pesanan:</span>
                  <div className="flex items-center border border-[#D9CFC4] rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-sm font-bold text-[#582F0E] hover:bg-[#F3EFEA] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-[#2C2420] min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1.5 text-sm font-bold text-[#582F0E] hover:bg-[#F3EFEA] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Direct Buy Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="modal-direct-buy-btn"
                    disabled={product.stock <= 0}
                    onClick={() => {
                      onDirectBuy(product, quantity);
                      onClose();
                    }}
                    className="py-3 px-3 bg-[#582F0E] hover:bg-[#7F4F24] text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Beli Sekarang</span>
                  </button>

                  <button
                    id="modal-add-cart-btn"
                    disabled={product.stock <= 0}
                    onClick={() => onAddToCart(product, quantity)}
                    className="py-3 px-3 border border-[#582F0E] text-[#582F0E] hover:bg-[#582F0E]/5 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>+ Keranjang</span>
                  </button>
                </div>

                {/* Alternative Marketplace Links */}
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E1D9] space-y-1.5">
                  <span className="text-[11px] font-bold text-[#7F4F24] uppercase">
                    Mau beli lewat Marketplace?
                  </span>
                  <div className="flex gap-2">
                    <a
                      id="modal-shopee-link"
                      href={product.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-2 bg-[#EE4D2D] hover:bg-[#d63d1e] text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 text-center"
                    >
                      <span>Shopee</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      id="modal-lynkid-link"
                      href={product.lynkIdUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-2 bg-[#0066FF] hover:bg-[#0052cc] text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 text-center"
                    >
                      <span>Lynk.id</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Reviews and Photo Feedback */}
          <div id="ulasan" className="pt-6 border-t border-[#E8E1D9]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#2C2420] font-serif flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#E07A5F]" />
                  <span>Ulasan & Foto Pembeli Terverifikasi</span>
                </h3>
                <p className="text-xs text-[#7F4F24]">
                  Testimoni nyata pelanggan Rumah Kreasi yang telah membeli barang ini
                </p>
              </div>

              <button
                id="open-write-review-btn"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3.5 py-2 bg-[#FFFDF9] border border-[#582F0E] text-[#582F0E] hover:bg-[#582F0E]/5 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>{showReviewForm ? 'Batal Menulis' : 'Tulis Ulasan & Upload Foto'}</span>
              </button>
            </div>

            {/* Review Submission Form with Integrated Verification */}
            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#D9CFC4] mb-6 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D9]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#582F0E]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verifikasi Ulasan Pembeli Produk Rumah Kreasi</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full font-medium">
                    Terintegrasi Otomatis
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                      Nama Anda:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rina Batam"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                      Kecamatan di Batam:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Batam Kota / Nagoya / Bengkong"
                      value={reviewerArea}
                      onChange={(e) => setReviewerArea(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                    />
                  </div>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Beri Penilaian Bintang:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-amber-400 text-amber-500' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#582F0E] ml-2">{rating} dari 5 Bintang</span>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Ulasan & Komentar Produk:
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Ceritakan kepuasan Anda tentang kerapian barang, kecepatan respon admin Rumah Kreasi..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                </div>

                {/* Photo upload input */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Upload Foto Produk Hasil Pesanan:
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-3 py-2 bg-white border border-dashed border-[#582F0E] text-[#582F0E] hover:bg-[#F3EFEA] rounded-xl text-xs font-medium cursor-pointer">
                      <UploadCloud className="w-4 h-4" />
                      <span>Pilih Foto dari HP / Laptop</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    {photoPreview && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#D9CFC4]">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-[#7F4F24] mt-1">
                    Format: JPG, PNG. Foto akan ditampilkan bersama ulasan Anda sebagai bukti pembeli terverifikasi.
                  </p>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#582F0E] hover:bg-[#7F4F24] text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kirim Ulasan & Verifikasi Sekarang</span>
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            {productReviews.length > 0 ? (
              <div className="space-y-4">
                {productReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E1D9] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#582F0E] text-white font-bold text-xs flex items-center justify-center font-serif">
                          {rev.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#2C2420]">{rev.customerName}</span>
                            {rev.verifiedPurchase && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                <CheckCircle2 className="w-2.5 h-2.5" /> Pembeli Terverifikasi
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#7F4F24]">
                            {rev.batamArea || 'Batam'} • {rev.date}
                          </span>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-[#423730] leading-relaxed">{rev.comment}</p>

                    {/* Review Attached Photo */}
                    {rev.photoUrl && (
                      <div className="mt-2">
                        <img
                          src={rev.photoUrl}
                          alt={`Foto ulasan oleh ${rev.customerName}`}
                          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-[#D9CFC4] shadow-2xs hover:scale-105 transition-transform cursor-pointer"
                          referrerPolicy="no-referrer"
                          onClick={() => window.open(rev.photoUrl, '_blank')}
                        />
                        <span className="text-[10px] text-[#7F4F24] block mt-0.5">
                          📷 Foto asli pesanan diterima
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-[#FAF7F2] rounded-2xl text-center border border-dashed border-[#D9CFC4]">
                <p className="text-xs text-[#7F4F24]">
                  Belum ada ulasan untuk produk ini. Jadilah pembeli pertama dari Batam yang memberikan ulasan!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
