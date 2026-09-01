import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserAccount, StoreInfo, ChatMessage, ProductCategory } from '../types';
import { initialProducts, initialStoreInfo, initialSampleOrders } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  storeInfo: StoreInfo;
  cart: CartItem[];
  orders: Order[];
  currentUser: UserAccount | null;
  selectedCategory: ProductCategory;
  searchQuery: string;
  isCartOpen: boolean;
  isChatOpen: boolean;
  activeTab: 'home' | 'catalog' | 'order-tracker' | 'admin' | 'profile';
  chatMessages: ChatMessage[];
  unreadChatCount: number;
  
  // Actions
  setSelectedCategory: (cat: ProductCategory) => void;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsChatOpen: (open: boolean) => void;
  setActiveTab: (tab: 'home' | 'catalog' | 'order-tracker' | 'admin' | 'profile') => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number, note?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Order Actions
  createOrder: (newOrder: Omit<Order, 'id' | 'createdAt' | 'orderStatus' | 'paymentStatus'>) => Order;
  verifyOrderPayment: (orderId: string, proofUrl?: string) => void;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], resi?: string, courier?: string) => void;
  
  // Product Management (Admin)
  addProduct: (productData: Omit<Product, 'id' | 'soldCount' | 'rating'>) => void;
  updateProduct: (id: string, updatedData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Store Settings (Admin)
  updateStoreInfo: (info: Partial<StoreInfo>) => void;
  
  // Auth
  loginUser: (email: string, role: 'admin' | 'customer', name?: string) => void;
  logoutUser: () => void;
  
  // Chat
  sendChatMessage: (text: string, sender?: 'customer' | 'admin', attachment?: string) => void;
  markChatAsRead: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products with local storage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rk_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialProducts;
  });

  // Store Info with local storage persistence
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    const saved = localStorage.getItem('rk_store_info');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialStoreInfo;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rk_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rk_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialSampleOrders;
  });

  // User Auth state (Default null, easily log in as Admin or Customer)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('rk_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  // Navigation & UI States
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'order-tracker' | 'admin' | 'profile'>('home');
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  // Chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('rk_chat');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'msg-1',
        sender: 'admin',
        senderName: 'Mimin Rumah Kreasi ✨',
        text: 'Halo Kak! Selamat datang di Rumah Kreasi ❤️ Ada yang bisa kami bantu seputar produk edukasi, souvenir, atau pesanan kado spesial?',
        time: 'Baru saja'
      }
    ];
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('rk_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rk_store_info', JSON.stringify(storeInfo));
  }, [storeInfo]);

  useEffect(() => {
    localStorage.setItem('rk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rk_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rk_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rk_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, note?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, customNote: note || item.customNote }
            : item
        );
      }
      return [...prev, { product, quantity, customNote: note }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order Operations
  const createOrder = (newOrderData: Omit<Order, 'id' | 'createdAt' | 'orderStatus' | 'paymentStatus'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const orderId = `RK-${dateStr}-${randomSuffix}`;
    
    const newOrder: Order = {
      ...newOrderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      orderStatus: 'menunggu_pembayaran',
      paymentStatus: 'pending'
    };

    // Reduce stock
    setProducts(prev =>
      prev.map(prod => {
        const cartMatch = newOrder.items.find(item => item.product.id === prod.id);
        if (cartMatch) {
          const updatedStock = Math.max(0, prod.stock - cartMatch.quantity);
          return {
            ...prod,
            stock: updatedStock,
            soldCount: prod.soldCount + cartMatch.quantity
          };
        }
        return prod;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const verifyOrderPayment = (orderId: string, proofUrl?: string) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            paymentStatus: 'verified',
            orderStatus: order.orderStatus === 'menunggu_pembayaran' ? 'terverifikasi' : order.orderStatus,
            paymentProof: proofUrl || order.paymentProof,
            verifiedAt: new Date().toISOString()
          };
        }
        return order;
      })
    );
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus'], resi?: string, courier?: string) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            orderStatus: status,
            resiNumber: resi !== undefined ? resi : order.resiNumber,
            courier: courier !== undefined ? courier : order.courier
          };
        }
        return order;
      })
    );
  };

  // Product Management (Admin)
  const addProduct = (productData: Omit<Product, 'id' | 'soldCount' | 'rating'>) => {
    const id = `rk-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...productData,
      id,
      soldCount: 0,
      rating: 5.0
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(prev =>
      prev.map(prod => (prod.id === id ? { ...prod, ...updatedData } : prod))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(prod => prod.id !== id));
  };

  const updateStoreInfo = (info: Partial<StoreInfo>) => {
    setStoreInfo(prev => ({ ...prev, ...info }));
  };

  // Auth Operations
  const loginUser = (email: string, role: 'admin' | 'customer', name?: string) => {
    const defaultName = role === 'admin' ? 'Admin Rumah Kreasi' : (name || email.split('@')[0]);
    const user: UserAccount = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: defaultName,
      email,
      role
    };
    setCurrentUser(user);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  // Chat Operations
  const sendChatMessage = (text: string, sender: 'customer' | 'admin' = 'customer', attachment?: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    const senderName = sender === 'admin' 
      ? 'Admin Rumah Kreasi ✨' 
      : (currentUser?.name || 'Pelanggan');

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      senderName,
      text,
      time: timeStr,
      attachment
    };

    setChatMessages(prev => [...prev, newMsg]);

    // Simulate smart auto-reply if sent by customer and admin is currently offline
    if (sender === 'customer') {
      setTimeout(() => {
        let replyText = 'Terima kasih atas pesannya Kak! Admin kami akan segera merespon dalam beberapa saat. Anda juga bisa langsung chat kami di WhatsApp untuk respon super cepat! 🚀💬';
        
        const lower = text.toLowerCase();
        if (lower.includes('shopee') || lower.includes('lynk')) {
          replyText = `Tentu Kak! Selain checkout langsung di website, Kakak bisa belanja via Shopee di: ${storeInfo.shopeeUrl} atau pesan instan via Lynk.id: ${storeInfo.lynkIdUrl} 🥰`;
        } else if (lower.includes('ongkir') || lower.includes('kirim')) {
          replyText = 'Kami melayani pengiriman ke seluruh Indonesia via JNE, J&T, SiCepat, dan Shopee Xpress dengan packing aman bubble wrap & kardus tebal! 📦✨';
        } else if (lower.includes('qris') || lower.includes('bayar') || lower.includes('tf')) {
          replyText = 'Pembayaran di website kami sangat mudah! Bisa QRIS otomatis instan, Virtual Account semua bank, E-Wallet (GoPay, DANA, ShopeePay), dan transfer manual langsung terverifikasi! 💳⚡';
        } else if (lower.includes('kado') || lower.includes('custom')) {
          replyText = 'Bisa banget Kak! Kami melayani pesanan custom kartu ucapan, buket bunga, dan souvenir hampers. Silakan tulis di catatan checkout atau kirim via chat ini yaa ❤️';
        }

        const autoReply: ChatMessage = {
          id: `msg-auto-${Date.now()}`,
          sender: 'admin',
          senderName: 'Asisten Otomatis Rumah Kreasi 🤖',
          text: replyText,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
        
        setChatMessages(curr => [...curr, autoReply]);
        if (!isChatOpen) {
          setUnreadChatCount(c => c + 1);
        }
      }, 1000);
    }
  };

  const markChatAsRead = () => {
    setUnreadChatCount(0);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        storeInfo,
        cart,
        orders,
        currentUser,
        selectedCategory,
        searchQuery,
        isCartOpen,
        isChatOpen,
        activeTab,
        chatMessages,
        unreadChatCount,
        setSelectedCategory,
        setSearchQuery,
        setIsCartOpen,
        setIsChatOpen,
        setActiveTab,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createOrder,
        verifyOrderPayment,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStoreInfo,
        loginUser,
        logoutUser,
        sendChatMessage,
        markChatAsRead
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
