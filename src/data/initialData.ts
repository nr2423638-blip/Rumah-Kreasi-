import { Product, StoreInfo, PaymentOption, Order } from '../types';

export const initialStoreInfo: StoreInfo = {
  name: 'Rumah Kreasi',
  tagline: 'A little corner of creativity',
  subTagline: 'Ideas • Creations • Inspiration',
  year: 'EST. 2025',
  values: ['Kreatif', 'Edukatif', 'Berkualitas', 'Bermakna'],
  phone: '+62 812-3456-7890',
  whatsappNumber: '6281234567890',
  tiktokHandle: '@rumahkreasi.id',
  tiktokUrl: 'https://tiktok.com/@rumahkreasi.id',
  shopeeStoreName: 'Rumah Kreasi Official Store',
  shopeeUrl: 'https://shopee.co.id/rumahkreasi',
  instagramHandle: '@rumahkreasi.official',
  instagramUrl: 'https://instagram.com/rumahkreasi.official',
  lynkIdHandle: 'lynk.id/rumahkreasi',
  lynkIdUrl: 'https://lynk.id/rumahkreasi',
  address: 'Jl. Kreasi Indah No. 18, Sleman, D.I. Yogyakarta 55281',
  email: 'halo@rumahkreasi.com',
  operationalHours: 'Senin - Sabtu: 08.00 - 20.00 WIB',
};

export const initialProducts: Product[] = [
  {
    id: 'rk-001',
    title: 'Flashcard Pintar Edukasi Anak (Alfabet, Angka & Hewan)',
    category: 'Edukasi & Flashcard',
    price: 45000,
    originalPrice: 65000,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Flashcard bergambar imut dan warna-warni untuk melatih daya ingat, kognitif, dan pengenalan kosakata anak usia dini. Ujung kartu rounded safe untuk si kecil dengan laminasi doff tahan percikan air.',
    features: [
      'Isi 52 kartu dwibahasa (Indonesia - Inggris)',
      'Kertas tebal Art Cartoon 310gsm laminasi premium',
      'Sudut membulat (Rounded corners) aman untuk balita',
      'Bonus ring besi praktis & pouch penyimpanan'
    ],
    badge: 'Best Seller',
    rating: 4.9,
    soldCount: 342,
    shopeeUrl: 'https://shopee.co.id/rumahkreasi/flashcard-edukasi',
    lynkIdUrl: 'https://lynk.id/rumahkreasi/flashcard-anak',
    isFeatured: true,
  },
  {
    id: 'rk-002',
    title: 'Gantungan Kunci Lucu Homemade Rumah & Bunga Pastel (Keychain)',
    category: 'Souvenir & Keychain',
    price: 22000,
    originalPrice: 30000,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Gantungan kunci akrilik ilustrasi Rumah Kreasi dengan gantungan gold clip premium dan bandul charm bunga & pelangi pastel yang manis. Cocok untuk tas sekolah, kunci motor, maupun kado sahabat.',
    features: [
      'Akrilik bening tebal 3mm print 2 sisi tajam',
      'Gantungan lobster clasp gold anti karat',
      'Tersedia charm tambahan berbentuk bunga & rumah',
      'Dikemas rapi dalam backing card estetik'
    ],
    badge: 'Produk Baru',
    rating: 4.8,
    soldCount: 189,
    shopeeUrl: 'https://shopee.co.id/rumahkreasi/keychain-pastel',
    lynkIdUrl: 'https://lynk.id/rumahkreasi/keychain-rumah',
    isFeatured: true,
  },
  {
    id: 'rk-003',
    title: 'Mini Dried Flower Bouquet in Cup with Heart Note',
    category: 'Bouquet & Gift',
    price: 38000,
    originalPrice: 50000,
    stock: 19,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Rangkaian bunga kering alami dalam mug keramik/gelas pastel dengan kartu ucapan cinta buatan tangan. Tahan bertahun-tahun tanpa layu, menghadirkan nuansa hangat di meja belajar atau ruang kerja.',
    features: [
      'Kombinasi bunga edelweis budidaya, gandum & bunny tail',
      'Wadah cangkir pink pastel dengan motif hati',
      'Bebas request tulisan di kartu ucapan mini',
      'Pengemasan ekstra aman dengan bubble wrap dan boks'
    ],
    badge: 'Favorit Kado',
    rating: 5.0,
    soldCount: 124,
    shopeeUrl: 'https://shopee.co.id/rumahkreasi/mini-bouquet',
    lynkIdUrl: 'https://lynk.id/rumahkreasi/bouquet-cup',
    isFeatured: true,
  },
  {
    id: 'rk-004',
    title: 'Balok Kayu Edukatif Montessori ABC & Angka (Natural Wood Blocks)',
    category: 'Edukasi & Flashcard',
    price: 89000,
    originalPrice: 120000,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Set balok susun kayu pinus halus berukir huruf ABC dan angka untuk melatih motorik halus, koordinasi mata-tangan, serta imajinasi spasial anak.',
    features: [
      'Bahan kayu pinus solid ramah lingkungan & non-toxic waterbased paint',
      'Ujung dan tepian dihaluskan menyeluruh',
      'Isi 24 balok kubus beraneka warna pastel',
      'Termasuk keranjang kain katun serut'
    ],
    badge: 'Edukasi Anak',
    rating: 4.9,
    soldCount: 96,
    shopeeUrl: 'https://shopee.co.id/rumahkreasi/balok-kayu-montessori',
    lynkIdUrl: 'https://lynk.id/rumahkreasi/wooden-blocks',
    isFeatured: true,
  },
  {
    id: 'rk-005',
    title: 'DIY Painting Kit Kanvas Mini + Cat Akrilik & Mini Easel Kayu',
    category: 'DIY Craft & Kit',
    price: 35000,
    originalPrice: 48000,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Kit lengkap melukis untuk anak dan dewasa untuk menyalurkan kreativitas di akhir pekan. Sudah termasuk kanvas berukuran 15x15cm, penyangga kayu estetik, kuas, dan 6 warna cat akrilik siap pakai.',
    features: [
      '1x Kanvas gambar kualitas galeri (15x15 cm)',
      '1x Mini tripod easel kayu alami',
      '2x Kuas lukis presisi (flat & round)',
      '6x Wadah cat akrilik ramah anak tidak berbau'
    ],
    badge: 'Kreativitas',
    rating: 4.8,
    soldCount: 215,
    shopeeUrl: 'https://shopee.co.id/rumahkreasi/diy-painting-kit',
    lynkIdUrl: 'https://lynk.id/rumahkreasi/painting-kit',
    isFeatured: false,
  },
  {
    id: 'rk-006',
    title: 'Buku Jurnal Kreatif Hardcover Spiral + Sticker Sheet Estetik',
    category: 'Stationery & Buku',
    price: 42000,
    originalPrice: 55000,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Buku catatan bersampul motif hangat Rumah Kreasi dengan kertas tebal bertekstur bookpaper 90gsm yang tidak tembus tinta. Sangat pas untuk journaling, mencatat ide kreasi, sketsa, dan tugas harian.',
    features: [
      '160 halaman kertas bergaris titik (dotted) ramah mata',
      'Jilid ring kawat tembaga ganda kokoh bisa dibuka 360 derajat',
      'Bonus 2 lembar stiker vinyl kiss-cut lucu Rumah Kreasi',
      'Tali elastis penutup buku'
    ],
    badge: 'Stationery',
    rating: 4.9,
    soldCount: 167,
    shopeeUrl: 'https://shopee.co.id/rumahkreasi/journal-craft',
    lynkIdUrl: 'https://lynk.id/rumahkreasi/buku-jurnal',
    isFeatured: false,
  },
  {
    id: 'rk-007',
    title: 'Hiasan Dinding Rainbow Macrame Pastel Estetik',
    category: 'DIY Craft & Kit',
    price: 55000,
    originalPrice: 75000,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1590483736622-39da86788790?auto=format&fit=crop&w=800&q=80',
    description: 'Hiasan pelangi rajut tali katun warna pastel lembut. Memberikan sentuhan hangat pada kamar tidur, ruang bermain anak, maupun latar foto.',
    features: [
      '100% Benang katun tali macrame premium',
      '4 Tingkat lengkungan warna pastel harmonis',
      'Tali gantungan suede dengan manik kayu alami',
      'Ukuran 18 x 20 cm'
    ],
    badge: 'Handmade',
    rating: 5.0,
    soldCount: 88,
    shopeeUrl: 'https://shopee.co.id/rumahkreasi/rainbow-macrame',
    lynkIdUrl: 'https://lynk.id/rumahkreasi/macrame-pelangi',
    isFeatured: false,
  },
  {
    id: 'rk-008',
    title: 'Paket Stiker Vinyl Tahan Air & Sticky Notes Rumah Kreasi',
    category: 'Stationery & Buku',
    price: 18000,
    originalPrice: 25000,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    description: 'Bundling stiker vinyl waterproof ilustrasi karakter rumah, bunga, dan hewan imut ditambah sticky notes memo pad 50 lembar bertema keceriaan.',
    features: [
      'Bahan vinyl laminasi doff anti gores & anti air',
      'Cocok untuk botol minum (tumbler), laptop, casing hp, dan helm',
      '1 Pad sticky notes 50 lembar ukuran 7.5x7.5 cm',
      'Daya rekat kuat tanpa meninggalkan bekas'
    ],
    badge: 'Hemat',
    rating: 4.9,
    soldCount: 410,
    shopeeUrl: 'https://shopee.co.id/rumahkreasi/sticker-pack',
    lynkIdUrl: 'https://lynk.id/rumahkreasi/stiker-vinyl',
    isFeatured: false,
  }
];

export const paymentOptions: PaymentOption[] = [
  {
    id: 'qris',
    name: 'QRIS (Semua Bank & E-Wallet)',
    category: 'qris',
    badge: 'Verifikasi Instan',
    iconName: 'QrCode',
    instructions: [
      'Buka aplikasi m-Banking (BCA, Mandiri, BRI, BNI, dll) atau E-Wallet (GoPay, OVO, DANA, ShopeePay).',
      'Pindai (Scan) kode QRIS yang muncul di layar pembayaran.',
      'Periksa nominal total belanja Anda dan selesaikan pembayaran.',
      'Sistem akan otomatis mendeteksi konfirmasi pembayaran Anda dalam hitungan detik!'
    ]
  },
  {
    id: 'bca_va',
    name: 'BCA Virtual Account',
    category: 'va',
    accountNumber: '8271081234567890',
    accountName: 'RUMAH KREASI ID',
    badge: 'Otomatis 24 Jam',
    iconName: 'Building2',
    instructions: [
      'Masuk ke menu m-BCA > m-Transfer > BCA Virtual Account.',
      'Masukkan nomor Virtual Account: 8271081234567890.',
      'Pastikan nama penerima adalah "RUMAH KREASI ID" dan nominal sesuai pesanan.',
      'Masukkan PIN m-BCA untuk menyelesaikan transaksi.'
    ]
  },
  {
    id: 'mandiri_va',
    name: 'Mandiri Virtual Account',
    category: 'va',
    accountNumber: '8870881234567890',
    accountName: 'RUMAH KREASI INDONESIA',
    badge: 'Otomatis 24 Jam',
    iconName: 'Building2',
    instructions: [
      'Buka aplikasi Livin\' by Mandiri > Menu Bayar > Pembayaran Baru > Multipayment.',
      'Pilih penyedia jasa Rumah Kreasi atau masukkan kode VA.',
      'Nomor VA: 8870881234567890.',
      'Konfirmasi pembayaran dan masukkan PIN Livin.'
    ]
  },
  {
    id: 'bri_va',
    name: 'BRI Virtual Account (BRIVA)',
    category: 'va',
    accountNumber: '1284581234567890',
    accountName: 'RUMAH KREASI',
    badge: 'Otomatis 24 Jam',
    iconName: 'Building2',
    instructions: [
      'Buka aplikasi BRImo > Menu BRIVA > Tambah Pembayaran Baru.',
      'Masukkan nomor BRIVA: 1284581234567890.',
      'Periksa detail nama pelanggan dan total bayar.',
      'Masukkan PIN BRImo untuk konfirmasi.'
    ]
  },
  {
    id: 'bni_va',
    name: 'BNI Virtual Account',
    category: 'va',
    accountNumber: '9881234567890001',
    accountName: 'RUMAH KREASI',
    badge: 'Otomatis 24 Jam',
    iconName: 'Building2',
    instructions: [
      'Buka BNI Mobile Banking > Menu Transfer > Virtual Account Billing.',
      'Input nomor VA: 9881234567890001.',
      'Validasi tagihan dan selesaikan dengan Password Transaksi.'
    ]
  },
  {
    id: 'gopay',
    name: 'GoPay / GoPay Later',
    category: 'ewallet',
    badge: 'Instan',
    iconName: 'Smartphone',
    instructions: [
      'Klik tombol bayar, aplikasi GoPay akan otomatis terbuka.',
      'Konfirmasi jumlah pembayaran dan klik Bayar Sekarang.',
      'Sistem otomatis memverifikasi pesanan Anda.'
    ]
  },
  {
    id: 'dana',
    name: 'DANA E-Wallet',
    category: 'ewallet',
    badge: 'Instan',
    iconName: 'Smartphone',
    instructions: [
      'Anda akan diarahkan ke checkout DANA yang aman.',
      'Masukkan nomor HP akun DANA dan PIN Anda.',
      'Konfirmasi pembayaran.'
    ]
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    category: 'ewallet',
    badge: 'Instan',
    iconName: 'Smartphone',
    instructions: [
      'Buka aplikasi Shopee atau konfirmasi notifikasi ShopeePay di ponsel Anda.',
      'Periksa nominal dan klik Bayar.'
    ]
  },
  {
    id: 'manual_bca',
    name: 'Transfer Manual BCA (Konfirmasi Otomatis/Instan)',
    category: 'manual',
    accountNumber: '8910-234-567',
    accountName: 'NAYLA RAMADHANI (RUMAH KREASI)',
    badge: 'Upload Bukti / Verifikasi Instan',
    iconName: 'Receipt',
    instructions: [
      'Transfer ke Rekening BCA: 8910-234-567 a/n NAYLA RAMADHANI.',
      'Nominal transfer harus persis sama dengan total tagihan.',
      'Unggah foto bukti transfer atau klik tombol Konfirmasi Instan.',
      'Pesanan langsung diverifikasi dan notifikasi WA otomatis terkirim!'
    ]
  }
];

export const initialSampleOrders: Order[] = [
  {
    id: 'RK-20250825-9102',
    createdAt: '2025-08-25T14:20:00Z',
    customer: {
      name: 'Nayla Ramadhani',
      phone: '081298765432',
      email: 'ramadhaninayla915@gmail.com',
      address: 'Jl. Melati No. 12 RT 04 RW 02, Gondokusuman',
      city: 'Kota Yogyakarta',
      notes: 'Mohon dibungkus kado ya kak untuk hadiah keponakan'
    },
    items: [
      {
        product: initialProducts[0],
        quantity: 1,
        customNote: 'Request kartu ucapan ulang tahun'
      },
      {
        product: initialProducts[1],
        quantity: 2
      }
    ],
    subtotal: 89000,
    shippingFee: 10000,
    discount: 5000,
    total: 94000,
    paymentType: 'qris',
    paymentStatus: 'verified',
    orderStatus: 'dikemas',
    resiNumber: 'SPXID-0892347192',
    courier: 'Shopee Xpress Standard',
    verifiedAt: '2025-08-25T14:23:15Z'
  },
  {
    id: 'RK-20250824-7741',
    createdAt: '2025-08-24T09:15:00Z',
    customer: {
      name: 'Budi Santoso',
      phone: '081344556677',
      email: 'budisantoso@gmail.com',
      address: 'Komplek Permata Hijau Blok C No. 7',
      city: 'Jakarta Selatan',
      notes: 'Kirim di jam kerja'
    },
    items: [
      {
        product: initialProducts[2],
        quantity: 1
      },
      {
        product: initialProducts[5],
        quantity: 1
      }
    ],
    subtotal: 80000,
    shippingFee: 15000,
    discount: 0,
    total: 95000,
    paymentType: 'bca_va',
    paymentStatus: 'verified',
    orderStatus: 'dikirim',
    resiNumber: 'JNE-88239019230',
    courier: 'JNE Reguler',
    verifiedAt: '2025-08-24T09:20:00Z'
  }
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateWhatsAppMessage(order: Order, store: StoreInfo): string {
  const itemsText = order.items
    .map((item, idx) => `${idx + 1}. *${item.product.title}* (${item.quantity}x) - ${formatRupiah(item.product.price * item.quantity)}${item.customNote ? `\n   _Catatan: ${item.customNote}_` : ''}`)
    .join('\n');

  const statusMap: Record<string, string> = {
    pending: '⏳ Menunggu Pembayaran',
    verified: '✅ Terverifikasi & LUNAS',
    failed: '❌ Gagal'
  };

  const paymentNameMap: Record<string, string> = {
    qris: 'QRIS Instan',
    bca_va: 'BCA Virtual Account',
    mandiri_va: 'Mandiri Virtual Account',
    bri_va: 'BRI Virtual Account (BRIVA)',
    bni_va: 'BNI Virtual Account',
    gopay: 'GoPay',
    dana: 'DANA',
    ovo: 'OVO',
    shopeepay: 'ShopeePay',
    manual_bca: 'Transfer Bank BCA',
    manual_mandiri: 'Transfer Bank Mandiri'
  };

  const message = `Halo Admin *${store.name}*! 👋✨
Saya ingin mengonfirmasi pesanan saya dari Website Resmi.

📋 *DETAIL PESANAN*
• *No. Pesanan:* \`${order.id}\`
• *Nama Pembeli:* ${order.customer.name}
• *No. WhatsApp:* ${order.customer.phone}
• *Alamat Pengiriman:* ${order.customer.address}, ${order.customer.city}
${order.customer.notes ? `• *Catatan Pembeli:* ${order.customer.notes}\n` : ''}
🛒 *RINCIAN PRODUK:*
${itemsText}

💰 *TOTAL PEMBAYARAN:*
• Subtotal: ${formatRupiah(order.subtotal)}
• Ongkir: ${formatRupiah(order.shippingFee)}
${order.discount > 0 ? `• Diskon: -${formatRupiah(order.discount)}\n` : ''}• *TOTAL DIBAYAR:* *${formatRupiah(order.total)}*
• *Metode Bayar:* ${paymentNameMap[order.paymentType] || order.paymentType}
• *Status Pembayaran:* ${statusMap[order.paymentStatus]}

Mohon segera diproses dan dikirimkan ya Kak! Terima kasih banyak *${store.name}* ❤️🎨`;

  return encodeURIComponent(message);
}
