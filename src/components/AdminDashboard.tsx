import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Phone, 
  CheckCircle2, 
  MessageCircle, 
  UploadCloud, 
  Eye, 
  ArrowLeft,
  Clock,
  Send,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Product, Order, RUMAH_KREASI_CONTACTS } from '../types';
import { formatRupiah, generateCustomerWhatsAppUrl, generateAdminNotificationUrl } from '../utils/whatsapp';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProductStock: (productId: string, newStock: number) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: 'pending' | 'verified' | 'paid') => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  onAddProduct,
  onUpdateProductStock,
  onDeleteProduct,
  onUpdateOrderStatus,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'upload' | 'products'>('orders');

  // Form state for uploading new product
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Product['category']>('Buket & Bunga');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('15');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80');
  const [shopeeUrl, setShopeeUrl] = useState(RUMAH_KREASI_CONTACTS.shopeeUrl);
  const [lynkIdUrl, setLynkIdUrl] = useState(RUMAH_KREASI_CONTACTS.lynkidUrl);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

  // Preset sample craft images for quick selection
  const SAMPLE_IMAGES = [
    { label: 'Buket Bunga', url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80' },
    { label: 'Akrilik Lampu', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
    { label: 'Frame 3D', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' },
    { label: 'Rajut Amigurumi', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
    { label: 'Hamper Gift Box', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80' },
    { label: 'Jesmonite Coaster', url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      alert('Mohon isi nama dan harga produk!');
      return;
    }

    const newProd: Product = {
      id: `rk-${Date.now()}`,
      name: name.trim(),
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stock: Number(stock) || 10,
      description: description.trim() || 'Produk kerajinan tangan istimewa buatan Rumah Kreasi Batam.',
      image: imagePreview,
      rating: 5.0,
      reviewCount: 0,
      shopeeUrl: shopeeUrl.trim() || RUMAH_KREASI_CONTACTS.shopeeUrl,
      lynkIdUrl: lynkIdUrl.trim() || RUMAH_KREASI_CONTACTS.lynkidUrl,
      tags: [category, 'Rumah Kreasi Batam', 'Handmade'],
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onAddProduct(newProd);
    setUploadSuccessMessage(`Produk "${newProd.name}" berhasil diunggah otomatis ke katalog!`);
    
    // Reset form
    setName('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setTimeout(() => setUploadSuccessMessage(''), 4000);
  };

  // Summary Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalCompletedOrders = orders.filter((o) => o.paymentStatus === 'paid').length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16">
      {/* Admin Header */}
      <header className="bg-[#582F0E] text-white py-4 px-4 sm:px-6 shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="exit-admin-btn"
              onClick={onExitAdmin}
              className="p-2 bg-[#7F4F24] hover:bg-[#936639] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Website</span>
            </button>
            <div>
              <h1 className="text-lg font-bold font-serif flex items-center gap-2">
                <span>Panel Admin Rumah Kreasi</span>
                <span className="text-[10px] bg-emerald-500 text-white font-mono px-2 py-0.5 rounded-full">
                  Online
                </span>
              </h1>
              <p className="text-xs text-[#E8E1D9]">
                Manajemen Pesanan Batam, Notifikasi WhatsApp, & Upload Produk Otomatis
              </p>
            </div>
          </div>

          {/* Quick info */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#E8E1D9]">Admin WA: {RUMAH_KREASI_CONTACTS.whatsappNumber}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8E1D9] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7F4F24]">Total Penjualan Web</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-xl font-extrabold text-[#2C2420] mt-1 font-serif">
              {formatRupiah(totalRevenue)}
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium">QRIS & Transfer Terhubung</span>
          </div>

          <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8E1D9] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7F4F24]">Pesanan Masuk (Lunas)</span>
              <ShoppingBag className="w-4 h-4 text-[#E07A5F]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#2C2420] mt-1 font-serif">
              {totalCompletedOrders} Pesanan
            </h3>
            <span className="text-[11px] text-[#7F4F24]">Khusus Area Kota Batam</span>
          </div>

          <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8E1D9] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7F4F24]">Produk Aktif di Katalog</span>
              <Package className="w-4 h-4 text-[#582F0E]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#2C2420] mt-1 font-serif">
              {products.length} Produk
            </h3>
            <span className="text-[11px] text-blue-600 font-medium">Bisa Upload Otomatis</span>
          </div>

          <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8E1D9] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7F4F24]">Status Server</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-xl font-extrabold text-[#2C2420] mt-1 font-serif">
              Keamanan Terjamin
            </h3>
            <span className="text-[11px] text-[#7F4F24]">Auto-Verifikasi Aktif</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8E1D9] pb-2">
          <button
            id="tab-admin-orders"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#582F0E] text-white shadow-xs'
                : 'bg-[#FFFDF9] text-[#554740] hover:bg-[#F3EFEA]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pantau Pembelian ({orders.length})</span>
          </button>

          <button
            id="tab-admin-upload"
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-[#582F0E] text-white shadow-xs'
                : 'bg-[#FFFDF9] text-[#554740] hover:bg-[#F3EFEA]'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Produk Otomatis</span>
          </button>

          <button
            id="tab-admin-products"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#582F0E] text-white shadow-xs'
                : 'bg-[#FFFDF9] text-[#554740] hover:bg-[#F3EFEA]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Kelola Stok Produk ({products.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS MONITORING */}
        {activeTab === 'orders' && (
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8E1D9] p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E1D9]">
              <div>
                <h2 className="text-base font-bold text-[#2C2420] font-serif">
                  Daftar Pesanan Masuk Pelanggan Kota Batam
                </h2>
                <p className="text-xs text-[#7F4F24]">
                  Pantau pembelian, status konfirmasi pembayaran otomatis, dan langsung hubungi pembeli via WhatsApp
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#7F4F24]">
                Belum ada pesanan masuk. Saat pelanggan melakukan checkout dan bayar, data akan muncul di sini secara real-time.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-[#E8E1D9] bg-[#FAF7F2] space-y-3"
                  >
                    {/* Order Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#582F0E] text-white text-xs font-bold font-mono">
                          {order.orderNumber}
                        </span>
                        <span className="text-xs text-[#7F4F24] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {order.createdAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {order.paymentStatus === 'paid' ? 'LUNAS (Auto-Verify)' : 'VERIFIKASI'}
                        </span>
                        <span className="text-xs font-bold text-[#582F0E]">
                          {order.paymentChannel || order.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Customer Info & Batam Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border border-[#E8E1D9]">
                      <div>
                        <p className="text-[#7F4F24]">Pemesan:</p>
                        <p className="font-bold text-[#2C2420] text-sm">{order.customerName}</p>
                        <p className="font-mono text-[#582F0E]">{order.customerWhatsapp}</p>
                      </div>

                      <div>
                        <p className="text-[#7F4F24]">Alamat Pengiriman (Kota Batam):</p>
                        <p className="font-semibold text-[#2C2420]">{order.customerAddress}</p>
                        <p className="text-emerald-700 font-medium">Kecamatan: {order.batamDistrict}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-[#7F4F24] uppercase tracking-wider">
                        Rincian Barang:
                      </p>
                      <div className="divide-y divide-[#E8E1D9]/60">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-1.5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-8 h-8 object-cover rounded-md"
                                referrerPolicy="no-referrer"
                              />
                              <span className="font-semibold text-[#2C2420]">{item.name}</span>
                              <span className="text-[#7F4F24]">x{item.quantity}</span>
                            </div>
                            <span className="font-bold text-[#582F0E]">
                              {formatRupiah(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded-lg mt-1 border border-amber-200">
                          <strong>Catatan Pembeli:</strong> {order.notes}
                        </p>
                      )}
                    </div>

                    {/* Order Footer Actions: WhatsApp Notification triggers */}
                    <div className="pt-2 border-t border-[#E8E1D9] flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-extrabold text-[#2C2420]">
                        Total Bayar: <span className="text-[#582F0E]">{formatRupiah(order.totalAmount)}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {/* Hubungi pembeli via WhatsApp */}
                        <a
                          id={`chat-buyer-${order.id}`}
                          href={`https://wa.me/${order.customerWhatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Halo Kak ${order.customerName}, kami dari Admin Rumah Kreasi Batam ingin mengonfirmasi pesanan #${order.orderNumber} Anda sudah kami terima dan siap diproses untuk pengiriman wilayah ${order.batamDistrict}. Terima kasih!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Chat WA Pembeli</span>
                        </a>

                        {/* Format Notifikasi WA Masuk Admin */}
                        <a
                          id={`admin-alert-${order.id}`}
                          href={generateAdminNotificationUrl(order)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-[#582F0E] hover:bg-[#7F4F24] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Notifikasi WA Admin</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AUTOMATIC PRODUCT UPLOAD */}
        {activeTab === 'upload' && (
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8E1D9] p-4 sm:p-6 shadow-xs">
            <div className="pb-4 border-b border-[#E8E1D9] mb-5">
              <h2 className="text-base font-bold text-[#2C2420] font-serif flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#E07A5F]" />
                <span>Upload Produk Baru Otomatis</span>
              </h2>
              <p className="text-xs text-[#7F4F24]">
                Upload barang apa saja, pilih katalog, tentukan jumlah barang/stok, harga, dan tautkan ke Shopee & Lynk.id secara otomatis
              </p>
            </div>

            {uploadSuccessMessage && (
              <div className="mb-4 p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{uploadSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Nama Barang / Produk: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Buket Bunga Preserved Rose Batam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Kategori Katalog: *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  >
                    <option value="Buket & Bunga">Buket & Bunga</option>
                    <option value="Akrilik & Lampu">Akrilik & Lampu</option>
                    <option value="Frame 3D">Frame 3D</option>
                    <option value="Rajut & Souvenir">Rajut & Souvenir</option>
                    <option value="Hampers & Gift Box">Hampers & Gift Box</option>
                    <option value="Craft Lainnya">Craft Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Harga Jual (Rp): *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 95000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Harga Asli / Coret (Opsional):
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 120000"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Jumlah Barang yang Tersedia (Stok): *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Deskripsi Produk & Keterangan Kerajinan:
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan detail bahan, ukuran, keunggulan karya buatan tangan Rumah Kreasi..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                />
              </div>

              {/* Photo Upload & Presets */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D9] space-y-3">
                <label className="block text-xs font-bold text-[#2C2420]">
                  Foto Produk: (Bisa Upload atau Pilih Gambar Estetik)
                </label>

                <div className="flex flex-wrap items-center gap-4">
                  {/* File Upload Button */}
                  <label className="px-4 py-2.5 bg-white border border-[#582F0E] text-[#582F0E] hover:bg-[#F3EFEA] rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-2">
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Foto dari Galeri</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>

                  <span className="text-xs text-[#7F4F24]">atau pilih preset gambar:</span>
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_IMAGES.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImagePreview(sample.url)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          imagePreview === sample.url
                            ? 'bg-[#582F0E] text-white font-bold border-[#582F0E]'
                            : 'bg-white text-[#554740] border-[#D9CFC4] hover:bg-[#F3EFEA]'
                        }`}
                      >
                        {sample.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview Thumbnail */}
                {imagePreview && (
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={imagePreview}
                      alt="Preview Produk"
                      className="w-20 h-20 object-cover rounded-xl border border-[#D9CFC4]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs text-[#554740]">
                      <p className="font-semibold text-[#2C2420]">Preview Foto Siap Tayang</p>
                      <p className="text-[11px] text-[#7F4F24]">Akan tampil di katalog dan halaman detail</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopee & Lynk.id Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Link Pemesanan Shopee (Opsional):
                  </label>
                  <input
                    type="url"
                    value={shopeeUrl}
                    onChange={(e) => setShopeeUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                  <span className="text-[10px] text-[#7F4F24]">Toko Shopee: {RUMAH_KREASI_CONTACTS.shopeeName}</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Link Pemesanan Lynk.id (Opsional):
                  </label>
                  <input
                    type="url"
                    value={lynkIdUrl}
                    onChange={(e) => setLynkIdUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                  <span className="text-[10px] text-[#7F4F24]">Lynk.id: {RUMAH_KREASI_CONTACTS.lynkidName}</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  id="admin-submit-product-btn"
                  type="submit"
                  className="w-full py-3.5 bg-[#582F0E] hover:bg-[#7F4F24] text-white font-bold text-sm rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Otomatis Upload Produk ke Katalog Website</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: MANAGE STOCKS & PRODUCTS */}
        {activeTab === 'products' && (
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8E1D9] p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D9]">
              <div>
                <h2 className="text-base font-bold text-[#2C2420] font-serif">
                  Kelola Stok & Inventaris Produk
                </h2>
                <p className="text-xs text-[#7F4F24]">
                  Edit ketersediaan jumlah barang secara langsung atau hapus produk
                </p>
              </div>
            </div>

            <div className="divide-y divide-[#E8E1D9]">
              {products.map((p) => (
                <div key={p.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-xl border border-[#E8E1D9]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#2C2420]">{p.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#582F0E]">{formatRupiah(p.price)}</span>
                        <span className="text-[11px] px-2 py-0.5 bg-[#FAF7F2] text-[#7F4F24] rounded-md border border-[#E8E1D9]">
                          {p.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stock quick adjuster */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-[#7F4F24]">Jumlah Stok:</span>
                      <div className="flex items-center border border-[#D9CFC4] rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => onUpdateProductStock(p.id, Math.max(0, p.stock - 1))}
                          className="px-2.5 py-1 text-xs font-bold hover:bg-[#F3EFEA]"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-center min-w-8">
                          {p.stock}
                        </span>
                        <button
                          onClick={() => onUpdateProductStock(p.id, p.stock + 1)}
                          className="px-2.5 py-1 text-xs font-bold hover:bg-[#F3EFEA]"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[10px] text-[#7F4F24]">pcs</span>
                    </div>

                    <button
                      id={`delete-prod-${p.id}`}
                      onClick={() => {
                        if (confirm(`Hapus produk "${p.name}" dari katalog?`)) {
                          onDeleteProduct(p.id);
                        }
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
