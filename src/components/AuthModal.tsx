import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginUser, setActiveTab } = useStore();
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    loginUser(email, role, name || (role === 'admin' ? 'Admin Rumah Kreasi' : 'Nayla Ramadhani'));
    onClose();
    if (role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('order-tracker');
    }
  };

  const handleQuickDemoLogin = (type: 'admin' | 'customer') => {
    if (type === 'admin') {
      loginUser('admin@rumahkreasi.com', 'admin', 'Admin Rumah Kreasi');
      setActiveTab('admin');
    } else {
      loginUser('ramadhaninayla915@gmail.com', 'customer', 'Nayla Ramadhani');
      setActiveTab('order-tracker');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full border-2 border-[#EBDCCF] shadow-2xl p-6 sm:p-8 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#7A6960] hover:bg-[#F2E5D5]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF1EB] border border-[#FFD0C1] text-[#FF694B] flex items-center justify-center mx-auto text-xl font-bold">
            🏠
          </div>
          <h3 className="font-fredoka text-2xl font-bold text-[#44352D]">
            Masuk ke Rumah Kreasi
          </h3>
          <p className="text-xs text-[#7A6960]">
            Akses portal pelanggan untuk pantau pesanan atau dashboard admin untuk upload produk.
          </p>
        </div>

        {/* 1-Click Fast Demo Login Buttons */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold text-[#7A6960] uppercase tracking-wider block text-center">
            Pilihan Cepat Masuk Langsung:
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('customer')}
              className="p-3 rounded-2xl bg-[#FFF6EE] hover:bg-[#FFEADA] border-2 border-[#E8CDB6] text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#44352D] mb-0.5">
                <User className="w-3.5 h-3.5 text-[#FF694B]" />
                <span>Pelanggan</span>
              </div>
              <p className="text-[10px] text-[#8C7A70]">
                Cek riwayat & resi pesanan
              </p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-3 rounded-2xl bg-[#44352D] hover:bg-[#342721] text-white text-left transition-all group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF8058]" />
                <span>Admin Toko</span>
              </div>
              <p className="text-[10px] text-[#D8C7BC]">
                Upload produk & verifikasi
              </p>
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="grow border-t border-[#EBDCCF]"></div>
          <span className="shrink mx-3 text-[11px] text-[#9E8B80] font-semibold">atau isi akun manual</span>
          <div className="grow border-t border-[#EBDCCF]"></div>
        </div>

        {/* Role toggle tab */}
        <div className="grid grid-cols-2 p-1 bg-[#F5ECE0] rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 rounded-lg transition-all ${
              role === 'customer' ? 'bg-white text-[#44352D] shadow-xs' : 'text-[#7A6960]'
            }`}
          >
            Portal Pelanggan
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`py-2 rounded-lg transition-all ${
              role === 'admin' ? 'bg-[#44352D] text-white shadow-xs' : 'text-[#7A6960]'
            }`}
          >
            Admin Website
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {role === 'customer' && (
            <div>
              <label className="block text-xs font-bold text-[#44352D] mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full text-sm p-3 rounded-xl border border-[#E2D0BD] bg-white"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#44352D] mb-1">
              Alamat Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@rumahkreasi.com' : 'email@gmail.com'}
                className="w-full text-sm p-3 pl-10 rounded-xl border border-[#E2D0BD] bg-white"
              />
              <Mail className="w-4 h-4 text-[#9E8B7F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#44352D] mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm p-3 pl-10 rounded-xl border border-[#E2D0BD] bg-white"
              />
              <Lock className="w-4 h-4 text-[#9E8B7F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[#FF694B] hover:bg-[#E85637] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{role === 'admin' ? 'Masuk ke Dashboard Admin' : 'Masuk / Lacak Pesanan'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
