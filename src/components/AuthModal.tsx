import React, { useState } from 'react';
import { X, User as UserIcon, ShieldCheck, Lock, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { User, BATAM_DISTRICTS } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  defaultTab?: 'customer' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  defaultTab = 'customer',
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>(defaultTab);
  const [isRegister, setIsRegister] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [batamDistrict, setBatamDistrict] = useState(BATAM_DISTRICTS[0]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (activeTab === 'admin') {
      // Admin verification
      if (
        (email.trim().toLowerCase() === 'admin@rumahkreasi.com' && password === 'admin123') ||
        (email.trim().toLowerCase() === 'admin' && password === 'admin')
      ) {
        const adminUser: User = {
          id: 'usr-admin',
          name: 'Admin Rumah Kreasi',
          email: 'admin@rumahkreasi.com',
          role: 'admin',
          whatsapp: '+62 851-2800-2246',
        };
        onLoginSuccess(adminUser);
        onClose();
      } else {
        setErrorMsg('Email atau kata sandi admin salah. Gunakan tombol demo admin di bawah!');
      }
    } else {
      // Customer login
      const customerUser: User = {
        id: `usr-${Date.now()}`,
        name: name.trim() || email.split('@')[0] || 'Pelanggan Batam',
        email: email.trim(),
        role: 'customer',
        whatsapp: phone.trim() || '081234567890',
        batamDistrict,
      };
      onLoginSuccess(customerUser);
      onClose();
    }
  };

  const handleQuickDemoAdmin = () => {
    const adminUser: User = {
      id: 'usr-admin',
      name: 'Admin Rumah Kreasi',
      email: 'admin@rumahkreasi.com',
      role: 'admin',
      whatsapp: '+62 851-2800-2246',
    };
    onLoginSuccess(adminUser);
    onClose();
  };

  const handleQuickDemoCustomer = () => {
    const custUser: User = {
      id: 'usr-cust-demo',
      name: 'Rina Batam',
      email: 'pelanggan@batam.com',
      role: 'customer',
      whatsapp: '081277889900',
      batamDistrict: 'Batam Kota',
      address: 'Perumahan Baloi Indah Blok A No. 10',
    };
    onLoginSuccess(custUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full border border-[#E8E1D9] shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E8E1D9] bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#582F0E] text-white flex items-center justify-center">
              {activeTab === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#2C2420] font-serif">
                {activeTab === 'admin' ? 'Login Khusus Admin Website' : 'Login Khusus Pelanggan'}
              </h3>
              <p className="text-[11px] text-[#7F4F24]">Keamanan Akses Terjamin Rumah Kreasi</p>
            </div>
          </div>

          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E8E1D9] text-[#7F4F24] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Pelanggan vs Admin */}
        <div className="grid grid-cols-2 p-2 bg-[#FAF7F2] border-b border-[#E8E1D9] gap-1.5">
          <button
            type="button"
            id="tab-auth-customer"
            onClick={() => {
              setActiveTab('customer');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'customer'
                ? 'bg-white text-[#582F0E] shadow-xs'
                : 'text-[#7F4F24] hover:text-[#2C2420]'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Pelanggan</span>
          </button>

          <button
            type="button"
            id="tab-auth-admin"
            onClick={() => {
              setActiveTab('admin');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-[#582F0E] text-white shadow-xs'
                : 'text-[#7F4F24] hover:text-[#2C2420]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Website</span>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            {activeTab === 'customer' && isRegister && (
              <div>
                <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Nama Lengkap:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                {activeTab === 'admin' ? 'Email Administrator:' : 'Email / Akun:'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={activeTab === 'admin' ? 'admin@rumahkreasi.com' : 'email@contoh.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                />
                <Mail className="w-4 h-4 text-[#7F4F24] absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                Kata Sandi:
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                />
                <Lock className="w-4 h-4 text-[#7F4F24] absolute left-3 top-2.5" />
              </div>
            </div>

            {activeTab === 'customer' && isRegister && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    No. WhatsApp:
                  </label>
                  <input
                    type="tel"
                    placeholder="081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Domisili Kecamatan di Batam:
                  </label>
                  <select
                    value={batamDistrict}
                    onChange={(e) => setBatamDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#2C2420] focus:outline-none focus:border-[#582F0E]"
                  >
                    {BATAM_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-2.5 bg-[#582F0E] hover:bg-[#7F4F24] text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{activeTab === 'admin' ? 'Masuk ke Panel Admin' : isRegister ? 'Daftar Akun' : 'Masuk Akun'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="pt-3 border-t border-[#E8E1D9] space-y-2">
            <span className="text-[10px] text-[#7F4F24] block text-center font-semibold uppercase tracking-wider">
              Akses Cepat Demo:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="quick-demo-admin-btn"
                onClick={handleQuickDemoAdmin}
                className="py-2 px-2.5 bg-[#582F0E]/10 hover:bg-[#582F0E]/20 text-[#582F0E] rounded-xl text-[11px] font-bold transition-colors cursor-pointer text-center"
              >
                Masuk sbg Admin
              </button>
              <button
                type="button"
                id="quick-demo-customer-btn"
                onClick={handleQuickDemoCustomer}
                className="py-2 px-2.5 bg-[#E8E1D9] hover:bg-[#D9CFC4] text-[#2C2420] rounded-xl text-[11px] font-bold transition-colors cursor-pointer text-center"
              >
                Masuk sbg Pelanggan
              </button>
            </div>
            {activeTab === 'admin' && (
              <p className="text-[10px] text-[#7F4F24] text-center">
                Akun Admin: <code className="bg-[#FAF7F2] px-1 py-0.5 rounded font-mono">admin@rumahkreasi.com</code> / Sandi: <code className="bg-[#FAF7F2] px-1 py-0.5 rounded font-mono">admin123</code>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
