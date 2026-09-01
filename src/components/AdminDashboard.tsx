import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, OrderStatus, StoreInfo } from '../types';
import { formatRupiah, generateWhatsAppMessage } from '../data/initialData';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  ExternalLink, 
  MessageCircle, 
  Save, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Settings, 
  Grid, 
  Image as ImageIcon,
  Share2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    storeInfo, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    verifyOrderPayment, 
    updateOrderStatus, 
    updateStoreInfo 
  } = useStore();

  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'store-settings'>('overview');

  // New Product Form State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('Edukasi & Flashcard');
  const [newPrice, setNewPrice] = useState(35000);
  const [newOriginalPrice, setNewOriginalPrice] = useState(50000);
  const [newStock, setNewStock] = useState(25);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80');
  const [newDescription, setNewDescription] = useState('');
  const [newBadge, setNewBadge] = useState('Produk Baru');
  const [newShopeeUrl, setNewShopeeUrl] = useState('https://shopee.co.id/rumahkreasi');
  const [newLynkIdUrl, setNewLynkIdUrl] = useState('https://lynk.id/rumahkreasi');
  const [newFeatures, setNewFeatures] = useState('Bahan premium aman untuk anak\nDesain estetik & edukatif\nPacking aman bubble wrap');

  // Edit stock inline state
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  // Store Settings Form State
  const [settingsForm, setSettingsForm] = useState<StoreInfo>(storeInfo);
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  // Order update resi state
  const [editingResiOrderId, setEditingResiOrderId] = useState<string | null>(null);
  const [tempResiNumber, setTempResiNumber] = useState('');
  const [tempCourier, setTempCourier] = useState('Shopee Xpress Standard');

  // Overview metrics
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'verified')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'menunggu_pembayaran' || o.orderStatus === 'terverifikasi').length;
  const totalItemsSold = products.reduce((sum, p) => sum + p.soldCount, 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addProduct({
      title: newTitle,
      category: newCategory,
      price: Number(newPrice),
      originalPrice: Number(newOriginalPrice),
      stock: Number(newStock),
      image: newImage,
      description: newDescription || 'Produk buatan tangan Rumah Kreasi dengan kualitas terbaik dan desain estetik.',
      badge: newBadge,
      shopeeUrl: newShopeeUrl,
      lynkIdUrl: newLynkIdUrl,
      features: newFeatures.split('\n').filter(f => f.trim().length > 0),
      isFeatured: true
    });

    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setShowAddProductModal(false);
    alert('Produk baru berhasil ditambahkan ke katalog Rumah Kreasi!');
  };

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreInfo(settingsForm);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#44352D] rounded-3xl p-6 sm:p-8 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8058] text-white text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>PANEL KELOLA ADMIN & INVENTARIS</span>
          </div>
          <h2 className="font-fredoka text-2xl sm:text-3xl font-bold tracking-wide">
            Dashboard Pemilik Rumah Kreasi
          </h2>
          <p className="text-xs sm:text-sm text-[#D8C7BC]">
            Kelola katalog produk, pantau transaksi pelanggan, verifikasi pembayaran, & update media sosial.
          </p>
        </div>

        <button
          onClick={() => setShowAddProductModal(true)}
          className="px-5 py-3 rounded-2xl bg-[#FF694B] hover:bg-[#E85637] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload Produk Baru</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#E8D9CC] gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'overview'
              ? 'bg-[#FF694B] text-white shadow-xs'
              : 'text-[#6F5D53] hover:bg-[#F2E5D5]'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Ringkasan Penjualan</span>
        </button>

        <button
          onClick={() => setAdminTab('products')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'products'
              ? 'bg-[#FF694B] text-white shadow-xs'
              : 'text-[#6F5D53] hover:bg-[#F2E5D5]'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Katalog Produk ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'orders'
              ? 'bg-[#FF694B] text-white shadow-xs'
              : 'text-[#6F5D53] hover:bg-[#F2E5D5]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Pesanan Masuk ({orders.length})</span>
          {pendingOrdersCount > 0 && (
            <span className="bg-[#EF4444] text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {pendingOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('store-settings')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'store-settings'
              ? 'bg-[#FF694B] text-white shadow-xs'
              : 'text-[#6F5D53] hover:bg-[#F2E5D5]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Profil Toko & Medsos</span>
        </button>
      </div>

      {/* ================= TAB 1: OVERVIEW METRICS ================= */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-[#FFFDF9] p-5 rounded-3xl border border-[#EBDCCF] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#8C7A70] font-bold">
                <span>Total Omzet Penjualan</span>
                <div className="p-2 rounded-xl bg-[#E8F5E7] text-[#4F854B]">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#44352D]">
                {formatRupiah(totalRevenue)}
              </div>
              <p className="text-[11px] text-[#527850] font-semibold">
                ✓ Dari seluruh transaksi terverifikasi
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-5 rounded-3xl border border-[#EBDCCF] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#8C7A70] font-bold">
                <span>Total Pesanan Masuk</span>
                <div className="p-2 rounded-xl bg-[#FFF0EB] text-[#FF694B]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#44352D]">
                {orders.length} Pesanan
              </div>
              <p className="text-[11px] text-[#A85A48]">
                {pendingOrdersCount} pesanan perlu diproses
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-5 rounded-3xl border border-[#EBDCCF] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#8C7A70] font-bold">
                <span>Produk Terjual</span>
                <div className="p-2 rounded-xl bg-[#F0EEFF] text-[#6351D9]">
                  <Package className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#44352D]">
                {totalItemsSold} Pcs
              </div>
              <p className="text-[11px] text-[#6351D9]">
                Flashcard & souvenir terlaris
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-5 rounded-3xl border border-[#EBDCCF] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#8C7A70] font-bold">
                <span>Total Item Katalog</span>
                <div className="p-2 rounded-xl bg-[#FFF9E6] text-[#D98E16]">
                  <Grid className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#44352D]">
                {products.length} Produk
              </div>
              <p className="text-[11px] text-[#D98E16]">
                Siap checkout & terhubung Shopee
              </p>
            </div>

          </div>

          {/* Recent Orders Overview */}
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#EBDCCF] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-fredoka text-lg font-bold text-[#44352D]">
                Pesanan Terbaru
              </h3>
              <button
                onClick={() => setAdminTab('orders')}
                className="text-xs font-bold text-[#FF694B] hover:underline"
              >
                Lihat Semua Pesanan →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EBDCCF] text-[#8C7A70] font-bold">
                    <th className="pb-3">No. Pesanan</th>
                    <th className="pb-3">Pelanggan</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Pembayaran</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5ECE0]">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAF4EC]">
                      <td className="py-3 font-mono font-bold text-[#44352D]">{order.id}</td>
                      <td className="py-3">
                        <div className="font-bold text-[#44352D]">{order.customer.name}</div>
                        <div className="text-[11px] text-[#8C7A70]">{order.customer.phone}</div>
                      </td>
                      <td className="py-3 font-bold text-[#E25330]">{formatRupiah(order.total)}</td>
                      <td className="py-3">
                        <span className="uppercase font-bold text-[#6F5D53]">{order.paymentType}</span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.paymentStatus === 'verified' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF3C7] text-[#B45309]'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => setAdminTab('orders')}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF0E6] text-[#55433A] hover:bg-[#EADDCF] font-bold"
                        >
                          Kelola
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: PRODUCT MANAGEMENT & UPLOAD ================= */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-fredoka text-xl font-bold text-[#44352D]">
              Daftar & Inventaris Produk Rumah Kreasi ({products.length} item)
            </h3>

            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#FF694B] hover:bg-[#E85637] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>

          <div className="bg-[#FFFDF9] rounded-3xl border border-[#EBDCCF] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF4EC] text-[#7A6960] font-bold border-b border-[#E8D6C4]">
                  <tr>
                    <th className="p-4">Foto & Nama Produk</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Harga</th>
                    <th className="p-4">Stok Tersedia</th>
                    <th className="p-4">Marketplace Link</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5ECE0]">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-[#FAF4EC]/60">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover bg-[#F7EFE6] shrink-0 border border-[#EBDCCF]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-[#44352D] text-sm line-clamp-1">{product.title}</div>
                            <div className="text-[11px] text-[#8C7A70]">ID: {product.id} • Terjual: {product.soldCount}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-[#F2E5D5] text-[#655246] font-semibold text-[11px]">
                          {product.category}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-[#E25330] text-sm">
                        {formatRupiah(product.price)}
                      </td>

                      <td className="p-4">
                        {editingStockId === product.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="0"
                              value={tempStockValue}
                              onChange={(e) => setTempStockValue(Number(e.target.value))}
                              className="w-16 p-1 rounded-lg border border-[#FF694B] text-xs font-bold text-center"
                            />
                            <button
                              onClick={() => {
                                updateProduct(product.id, { stock: tempStockValue });
                                setEditingStockId(null);
                              }}
                              className="p-1 bg-[#527850] text-white rounded-md"
                              title="Simpan Stok"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                              product.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-800'
                            }`}>
                              {product.stock} pcs
                            </span>
                            <button
                              onClick={() => {
                                setEditingStockId(product.id);
                                setTempStockValue(product.stock);
                              }}
                              className="text-[#9E8B7F] hover:text-[#FF694B] p-1"
                              title="Ubah Stok"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <a
                            href={product.shopeeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#EE4D2D] hover:underline font-bold text-[11px] flex items-center gap-0.5"
                          >
                            <span>Shopee</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          <span className="text-[#CCC]">•</span>
                          <a
                            href={product.lynkIdUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#6351D9] hover:underline font-bold text-[11px] flex items-center gap-0.5"
                          >
                            <span>Lynk.id</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Apakah Anda yakin ingin menghapus produk "${product.title}"?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-2 rounded-xl text-[#BCAEA4] hover:text-[#DE4E2B] hover:bg-[#FEE2E2] transition-colors"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ORDERS MANAGEMENT ================= */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-fredoka text-xl font-bold text-[#44352D]">
              Semua Pesanan Pelanggan ({orders.length})
            </h3>
          </div>

          <div className="space-y-4">
            {orders.map((order) => {
              const waUrl = `https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage(order, storeInfo)}`;

              return (
                <div 
                  key={order.id}
                  className="bg-[#FFFDF9] rounded-3xl border border-[#EBDCCF] p-5 sm:p-6 space-y-4 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F2E5D5]">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#44352D]">{order.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          order.paymentStatus === 'verified' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF3C7] text-[#B45309]'
                        }`}>
                          {order.paymentStatus === 'verified' ? '✓ Lunas' : 'Menunggu Bayar'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8C7A70]">
                        Pelanggan: <strong>{order.customer.name}</strong> • WA: {order.customer.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.paymentStatus !== 'verified' && (
                        <button
                          onClick={() => verifyOrderPayment(order.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#527850] hover:bg-[#436341] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verifikasi Lunas</span>
                        </button>
                      )}

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Kirim Update WA</span>
                      </a>
                    </div>
                  </div>

                  {/* Status update buttons */}
                  <div className="bg-[#FAF4EC] p-3.5 rounded-2xl border border-[#E9D9C9] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#55433A]">Ubah Status:</span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="p-1.5 rounded-lg border border-[#E0CFBD] bg-white font-bold text-[#44352D]"
                      >
                        <option value="menunggu_pembayaran">Menunggu Pembayaran</option>
                        <option value="terverifikasi">Pembayaran Terverifikasi</option>
                        <option value="dikemas">Sedang Dikemas</option>
                        <option value="dikirim">Dalam Pengiriman</option>
                        <option value="selesai">Selesai</option>
                      </select>
                    </div>

                    {/* Resi updater */}
                    <div className="flex items-center gap-2">
                      {editingResiOrderId === order.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="Input No. Resi..."
                            value={tempResiNumber}
                            onChange={(e) => setTempResiNumber(e.target.value)}
                            className="p-1.5 rounded-lg border border-[#FF694B] text-xs"
                          />
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, 'dikirim', tempResiNumber, tempCourier);
                              setEditingResiOrderId(null);
                            }}
                            className="px-2.5 py-1.5 bg-[#527850] text-white rounded-lg font-bold"
                          >
                            Simpan Resi
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#7A6960]">
                            Resi: <strong>{order.resiNumber || 'Belum diisi'}</strong>
                          </span>
                          <button
                            onClick={() => {
                              setEditingResiOrderId(order.id);
                              setTempResiNumber(order.resiNumber || '');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white border border-[#D8C7B5] font-bold text-[#55433A] hover:bg-[#F2E5D5]"
                          >
                            + Input No. Resi
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="text-xs text-[#6F5D53] space-y-1">
                    <div className="font-bold text-[#44352D]">Alamat Kirim: {order.customer.address}, {order.customer.city}</div>
                    <div>Barang: {order.items.map(i => `${i.product.title} (${i.quantity}x)`).join(', ')}</div>
                    <div className="font-bold text-[#E25330] pt-1">Total: {formatRupiah(order.total)} (Via {order.paymentType})</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 4: STORE & SOCIAL MEDIA PROFILE SETTINGS ================= */}
      {adminTab === 'store-settings' && (
        <form onSubmit={handleSaveStoreSettings} className="bg-[#FFFDF9] rounded-3xl border border-[#EBDCCF] p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-fredoka text-xl font-bold text-[#44352D]">
              Pengaturan Profil Rumah Kreasi & Media Sosial
            </h3>
            <p className="text-xs text-[#7A6960] mt-1">
              Perbarui nomor WhatsApp, nama & link Toko Shopee, Lynk.id, akun TikTok, dan Instagram yang tampil di website.
            </p>
          </div>

          {isSavedAlert && (
            <div className="p-3.5 rounded-2xl bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profil toko & media sosial berhasil diperbarui!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Store Name & Tagline */}
            <div>
              <label className="block text-xs font-bold text-[#44352D] mb-1">
                Nama Toko / Brand
              </label>
              <input
                type="text"
                value={settingsForm.name}
                onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#44352D] mb-1">
                Slogan / Tagline
              </label>
              <input
                type="text"
                value={settingsForm.tagline}
                onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
              />
            </div>

            {/* WhatsApp Admin */}
            <div>
              <label className="block text-xs font-bold text-[#44352D] mb-1">
                No. WhatsApp Admin (Format 628...)
              </label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
              />
            </div>

            {/* Shopee Store */}
            <div>
              <label className="block text-xs font-bold text-[#44352D] mb-1">
                Nama Toko Shopee
              </label>
              <input
                type="text"
                value={settingsForm.shopeeStoreName}
                onChange={(e) => setSettingsForm({ ...settingsForm, shopeeStoreName: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#44352D] mb-1">
                Link URL Toko Shopee
              </label>
              <input
                type="url"
                value={settingsForm.shopeeUrl}
                onChange={(e) => setSettingsForm({ ...settingsForm, shopeeUrl: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
              />
            </div>

            {/* Lynk.id */}
            <div>
              <label className="block text-xs font-bold text-[#44352D] mb-1">
                Handle & Link Lynk.id
              </label>
              <input
                type="url"
                value={settingsForm.lynkIdUrl}
                onChange={(e) => setSettingsForm({ ...settingsForm, lynkIdUrl: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
              />
            </div>

            {/* TikTok */}
            <div>
              <label className="block text-xs font-bold text-[#44352D] mb-1">
                Handle TikTok (misal: @rumahkreasi.id)
              </label>
              <input
                type="text"
                value={settingsForm.tiktokHandle}
                onChange={(e) => setSettingsForm({ ...settingsForm, tiktokHandle: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-xs font-bold text-[#44352D] mb-1">
                Handle Instagram (misal: @rumahkreasi.official)
              </label>
              <input
                type="text"
                value={settingsForm.instagramHandle}
                onChange={(e) => setSettingsForm({ ...settingsForm, instagramHandle: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
              />
            </div>

          </div>

          <div>
            <label className="block text-xs font-bold text-[#44352D] mb-1">
              Alamat Lengkap Workshop / Studio
            </label>
            <input
              type="text"
              value={settingsForm.address}
              onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
              className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-[#FF694B] hover:bg-[#E85637] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Profil & Medsos</span>
            </button>
          </div>
        </form>
      )}

      {/* ================= MODAL: ADD / UPLOAD PRODUCT ================= */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#EBDCCF] shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#EBDCCF] pb-4">
              <div>
                <h3 className="font-fredoka text-xl font-bold text-[#44352D]">
                  Upload Produk Baru Rumah Kreasi
                </h3>
                <p className="text-xs text-[#7A6960]">
                  Tambahkan katalog, harga, stok, dan link Shopee / Lynk.id secara instan.
                </p>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="p-2 text-[#7A6960] hover:text-[#44352D]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#44352D] mb-1">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Flashcard Edukasi Hewan & Buah Dwibahasa"
                  className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Kategori Katalog
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white font-semibold"
                  >
                    <option value="Edukasi & Flashcard">Edukasi & Flashcard</option>
                    <option value="DIY Craft & Kit">DIY Craft & Kit</option>
                    <option value="Souvenir & Keychain">Souvenir & Keychain</option>
                    <option value="Bouquet & Gift">Bouquet & Gift</option>
                    <option value="Stationery & Buku">Stationery & Buku</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Badge / Tag Khusus
                  </label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    placeholder="Contoh: Best Seller, Handmade, Edukatif"
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Harga Jual (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Harga Coret / Asli (Rp)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Jumlah Stok Tersedia <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    URL Foto Produk (Unsplash / Image Link)
                  </label>
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
                  />
                </div>
              </div>

              {/* Quick Image presets */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#7A6960]">Pilih Cepat Foto Contoh:</span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'
                  ].map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewImage(url)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 ${
                        newImage === url ? 'border-[#FF694B]' : 'border-transparent'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#44352D] mb-1">
                  Deskripsi Produk
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Jelaskan detail bahan, ukuran, dan fungsi produk..."
                  className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#44352D] mb-1">
                  Keunggulan / Spesifikasi (Satu baris per poin)
                </label>
                <textarea
                  rows={2}
                  value={newFeatures}
                  onChange={(e) => setNewFeatures(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E2D0BD] bg-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Link Shopee Produk
                  </label>
                  <input
                    type="url"
                    value={newShopeeUrl}
                    onChange={(e) => setNewShopeeUrl(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2D0BD] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#44352D] mb-1">
                    Link Lynk.id Produk
                  </label>
                  <input
                    type="url"
                    value={newLynkIdUrl}
                    onChange={(e) => setNewLynkIdUrl(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2D0BD] bg-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#EBDCCF]">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D8C7B5] text-xs font-bold text-[#6F5D53]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#FF694B] hover:bg-[#E85637] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Simpan & Terbitkan Produk
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
