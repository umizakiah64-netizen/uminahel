import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storage';
import { TravelerDetail } from '../types';
import {
  User,
  Users,
  ShieldCheck,
  Check,
  Plus,
  Trash2,
  RefreshCw,
  LogOut,
  Mail,
  Phone
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { navigate } = useRouter();
  const { user, role, switchRole, updateProfile, addSavedTraveler, removeSavedTraveler, logout } = useAuth();

  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState(user.email);
  const [phoneInput, setPhoneInput] = useState(user.phone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Add traveler modal/form
  const [showAddTraveler, setShowAddTraveler] = useState(false);
  const [newTitle, setNewTitle] = useState<'Tuan' | 'Nyonya' | 'Nona'>('Tuan');
  const [newName, setNewName] = useState('');
  const [newIdType, setNewIdType] = useState<'KTP' | 'Paspor'>('KTP');
  const [newIdNumber, setNewIdNumber] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameInput,
      email: emailInput,
      phone: phoneInput
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddTravelerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newIdNumber.trim()) return;

    const traveler: TravelerDetail = {
      title: newTitle,
      fullName: newName,
      idType: newIdType,
      idNumber: newIdNumber,
      type: 'Dewasa',
      nationality: 'Indonesia'
    };
    addSavedTraveler(traveler);
    setNewName('');
    setNewIdNumber('');
    setShowAddTraveler(false);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset seluruh data demo ke keadaan semula? Ini akan menghapus riwayat pesanan lokal.')) {
      StorageService.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1769D2]/10 text-[#1769D2] font-bold text-2xl flex items-center justify-center shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#172B4D]">{user.name}</h1>
              <p className="text-xs text-slate-500">{user.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1769D2]">
                  {role === 'admin' ? 'Administrator' : 'Wisatawan Demo Terverifikasi'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => switchRole(role === 'admin' ? 'user' : 'admin')}
              className="px-3 py-2 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold rounded-xl hover:bg-amber-100 transition-colors cursor-pointer"
            >
              Ganti ke Mode {role === 'admin' ? 'Wisatawan' : 'Admin'}
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
              title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <User className="w-4 h-4 text-[#1769D2]" />
            <span>Informasi Akun Utama</span>
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nama Lengkap</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Email</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nomor Telepon</label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess ? (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" /> Profil berhasil diperbarui!
                </span>
              ) : <span />}

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1769D2] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        {/* Saved Travelers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1769D2]" />
                <span>Daftar Penumpang & Tamu Tersimpan</span>
              </h2>
              <p className="text-xs text-slate-500">Mempercepat pengisian formulir saat pemesanan tiket pesawat atau hotel.</p>
            </div>

            <button
              onClick={() => setShowAddTraveler(true)}
              className="px-3.5 py-1.5 bg-blue-50 text-[#1769D2] hover:bg-blue-100 font-semibold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Data</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.savedTravelers?.map((t, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#1769D2] uppercase">{t.type} · {t.nationality}</span>
                  <p className="font-bold text-slate-800 text-sm">{t.title} {t.fullName}</p>
                  <p className="text-[11px] text-slate-500 font-mono">{t.idType}: {t.idNumber}</p>
                </div>
                <button
                  onClick={() => removeSavedTraveler(t.idNumber)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                  title="Hapus Penumpang"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Traveler Form */}
          {showAddTraveler && (
            <form onSubmit={handleAddTravelerSubmit} className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 space-y-3 text-xs">
              <h3 className="font-bold text-slate-800">Tambah Penumpang Baru</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Titel</label>
                  <select
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="Tuan">Tuan</option>
                    <option value="Nyonya">Nyonya</option>
                    <option value="Nona">Nona</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <label className="font-semibold text-slate-700">Nama Lengkap</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="Sesuai KTP / Paspor"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Jenis ID</label>
                  <select
                    value={newIdType}
                    onChange={e => setNewIdType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="KTP">KTP</option>
                    <option value="Paspor">Paspor</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Nomor Identitas</label>
                  <input
                    type="text"
                    value={newIdNumber}
                    onChange={e => setNewIdNumber(e.target.value)}
                    placeholder="Nomor 16 digit KTP atau nomor paspor"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTraveler(false)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1769D2] text-white rounded-xl font-semibold"
                >
                  Simpan Penumpang
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Demo Utilities */}
        <div className="p-4 bg-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>Pengaturan pengujian: Kembalikan dataset mock ke kondisi awal aplikasi.</span>
          <button
            onClick={handleResetDemoData}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Data Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
