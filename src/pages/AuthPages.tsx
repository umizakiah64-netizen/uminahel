import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { Compass, ShieldCheck, UserCheck, ArrowRight, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('budi.pratama@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, email.includes('admin') ? 'admin' : 'user');
    navigate('/profile');
  };

  const handleQuickLogin = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      login('admin@jelajahin.id', 'admin');
      navigate('/admin');
    } else {
      login('budi.pratama@gmail.com', 'user');
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 cursor-pointer select-none mb-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1769D2] flex items-center justify-center text-white shadow-xs">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#172B4D]">
              Jelajahin<span className="text-[#1769D2]">.</span>
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#172B4D]">Masuk ke Akun Anda</h1>
          <p className="text-xs text-slate-500">
            Akses riwayat pemesanan, tiket digital, dan wishlist liburan Anda.
          </p>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
          <p className="text-[11px] font-bold text-[#1769D2] text-center">Akun Demo Siap Uji (1-Klik Masuk):</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('user')}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#1769D2]" />
              <span>Wisatawan</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-amber-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Alamat Email</label>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-[#1769D2]">
              <Mail className="w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-slate-800"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="font-semibold text-slate-700">Kata Sandi</label>
              <span className="text-[11px] text-[#1769D2] hover:underline cursor-pointer">Lupa kata sandi?</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-[#1769D2]">
              <Lock className="w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-slate-800"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer text-center shadow-md"
          >
            Masuk Sekarang
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Belum memiliki akun?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-[#1769D2] font-semibold underline cursor-pointer"
          >
            Daftar Akun Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'user');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 cursor-pointer select-none mb-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1769D2] flex items-center justify-center text-white shadow-xs">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#172B4D]">
              Jelajahin<span className="text-[#1769D2]">.</span>
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#172B4D]">Buat Akun Jelajahin</h1>
          <p className="text-xs text-slate-500">
            Daftar sekarang untuk kemudahan pemesanan dan voucher diskon liburan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Contoh: Rina Kusuma"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1769D2] text-slate-800"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Alamat Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1769D2] text-slate-800"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Nomor WhatsApp</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="081234567890"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1769D2] text-slate-800"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Kata Sandi</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1769D2] text-slate-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer text-center shadow-md"
          >
            Daftar Sekarang
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Sudah memiliki akun?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#1769D2] font-semibold underline cursor-pointer"
          >
            Masuk Akun
          </button>
        </div>
      </div>
    </div>
  );
};
