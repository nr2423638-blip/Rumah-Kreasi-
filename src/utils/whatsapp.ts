import { Order, RUMAH_KREASI_CONTACTS } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate automatic WhatsApp URL for Customer order confirmation
 */
export function generateCustomerWhatsAppUrl(order: Order): string {
  const itemsText = order.items
    .map((item, idx) => `${idx + 1}. ${item.name} (${item.quantity}x) - ${formatRupiah(item.price * item.quantity)}`)
    .join('\n');

  const message = `✨ *KONFIRMASI PESANAN RUMAH KREASI* ✨
Halo Admin Rumah Kreasi Batam, saya telah menyelesaikan pembayaran pesanan di website!

🧾 *No. Pesanan:* ${order.orderNumber}
👤 *Nama Pelanggan:* ${order.customerName}
📱 *No. WhatsApp:* ${order.customerWhatsapp}
📍 *Alamat Pengiriman (Batam):* 
${order.customerAddress}, Kec. ${order.batamDistrict}, Kota Batam

🛍️ *Daftar Barang:*
${itemsText}

💰 *Total Pembayaran:* ${formatRupiah(order.totalAmount)}
💳 *Metode Bayar:* ${order.paymentChannel || order.paymentMethod.toUpperCase()}
✅ *Status Bayar:* ${order.paymentStatus === 'paid' ? 'LUNAS (Terverifikasi Otomatis)' : 'TERVERIFIKASI'}
${order.notes ? `📝 *Catatan Khusus:* ${order.notes}\n` : ''}
Mohon pesanan segera diproses untuk pengiriman wilayah Batam ya. Terima kasih Rumah Kreasi! 🙏`;

  return `https://wa.me/${RUMAH_KREASI_CONTACTS.whatsappClean}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate automatic WhatsApp notification for Admin
 */
export function generateAdminNotificationUrl(order: Order): string {
  const itemsText = order.items
    .map((item) => `• ${item.name} (x${item.quantity})`)
    .join('\n');

  const message = `🔔 *NOTIFIKASI PESANAN MASUK WEBSITE* 🔔
Ada pesanan baru yang telah terbayar/terverifikasi di Rumah Kreasi!

🆔 *Pesanan:* ${order.orderNumber}
👤 *Customer:* ${order.customerName} (${order.customerWhatsapp})
📍 *Lokasi:* ${order.batamDistrict}, Batam
📦 *Barang:*
${itemsText}
💵 *Nominal:* ${formatRupiah(order.totalAmount)}
💳 *Metode:* ${order.paymentChannel || order.paymentMethod}
Status: Siap diproses & dikirim kurir lokal Batam.`;

  return `https://wa.me/${RUMAH_KREASI_CONTACTS.whatsappClean}?text=${encodeURIComponent(message)}`;
}

/**
 * WhatsApp URL for customers inquiring from outside Kota Batam
 */
export function generateOutsideBatamInquiryUrl(productName?: string): string {
  const text = productName
    ? `Halo Admin Rumah Kreasi Batam, saya ingin pesan produk "${productName}" tapi saya tinggal di LUAR KOTA BATAM. Apakah bisa dikirim lewat ekspedisi luar kota (JNE/J&T)? Mohon info ongkir dan estimasinya ya kak.`
    : `Halo Admin Rumah Kreasi Batam, saya melihat produk di website Rumah Kreasi dan tertarik untuk order, tapi domisili saya di LUAR KOTA BATAM. Apakah melayani pengiriman luar kota? Mohon info prosedurnya ya kak.`;

  return `https://wa.me/${RUMAH_KREASI_CONTACTS.whatsappClean}?text=${encodeURIComponent(text)}`;
}

/**
 * General Customer Support WhatsApp URL
 */
export function generateSupportWhatsAppUrl(topic?: string): string {
  const text = topic
    ? `Halo Admin Rumah Kreasi Batam, saya ingin konsultasi mengenai: ${topic}. Boleh minta infonya kak?`
    : `Halo Admin Rumah Kreasi Batam, saya ingin bertanya seputar produk kreatif dan pemesanan di Rumah Kreasi. Terima kasih!`;

  return `https://wa.me/${RUMAH_KREASI_CONTACTS.whatsappClean}?text=${encodeURIComponent(text)}`;
}
