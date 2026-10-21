import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { formatIDR } from '../utils/format';
import {
  ShieldCheck,
  CreditCard,
  Tag,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  X,
  UserCheck,
  Calendar,
  Lock
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { navigate } = useRouter();
  const { draft, updateDraft, applyVoucher, removeVoucher, calculatePricing, confirmBooking } = useBooking();
  const { user } = useAuth();

  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [voucherFeedback, setVoucherFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!draft) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <Info className="w-12 h-12 text-[#1769D2] mx-auto" />
          <h2 className="text-lg font-bold text-slate-800">Tidak ada pemesanan aktif</h2>
          <p className="text-xs text-slate-500">
            Silakan pilih tiket, hotel, atau paket wisata terlebih dahulu untuk melanjutkan checkout.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 bg-[#1769D2] text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Mulai Cari Perjalanan
          </button>
        </div>
      </div>
    );
  }

  // Ensure travelers array matches draft.quantity
  React.useEffect(() => {
    if (draft && draft.quantity > draft.travelers.length) {
      const extra: typeof draft.travelers = [];
      for (let i = draft.travelers.length; i < draft.quantity; i++) {
        extra.push({
          title: i % 2 === 1 ? 'Nyonya' : 'Tuan',
          fullName: '',
          idType: 'KTP',
          idNumber: '',
          type: 'Dewasa',
          nationality: 'Indonesia'
        });
      }
      updateDraft({ travelers: [...draft.travelers, ...extra] });
    }
  }, [draft?.quantity, draft?.travelers?.length]);

  const pricing = calculatePricing();

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCodeInput.trim()) return;

    const res = applyVoucher(voucherCodeInput);
    if (res.success) {
      setVoucherFeedback({ type: 'success', message: res.message });
      setVoucherCodeInput('');
    } else {
      setVoucherFeedback({ type: 'error', message: res.message });
    }
  };

  const handleContactChange = (field: 'fullName' | 'email' | 'phone', val: string) => {
    if (formErrors[field]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    updateDraft({
      contactDetails: {
        ...draft.contactDetails,
        [field]: val
      }
    });
  };

  const handleTravelerChange = (index: number, field: string, val: string) => {
    const errKey = `traveler_${index}_${field === 'fullName' ? 'name' : field === 'idNumber' ? 'id' : ''}`;
    if (errKey && formErrors[errKey]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[errKey];
        return copy;
      });
    }
    const updated = [...draft.travelers];
    updated[index] = {
      ...updated[index],
      [field]: val
    };
    updateDraft({ travelers: updated });
  };

  const handleProceedToPayment = () => {
    const errors: Record<string, string> = {};

    // 1. Contact validation
    if (!draft.contactDetails.fullName.trim()) {
      errors.contactName = 'Nama pemesan wajib diisi';
    }
    if (!draft.contactDetails.email.trim()) {
      errors.contactEmail = 'Email pemesan wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.contactDetails.email.trim())) {
      errors.contactEmail = 'Format email tidak valid (contoh: pemesan@email.com)';
    }
    if (!draft.contactDetails.phone.trim()) {
      errors.contactPhone = 'Nomor telepon/WhatsApp wajib diisi';
    } else if (draft.contactDetails.phone.replace(/\D/g, '').length < 9) {
      errors.contactPhone = 'Nomor telepon minimal 9 digit angka';
    }

    // 2. All travelers validation
    draft.travelers.forEach((traveler, idx) => {
      if (!traveler.fullName || !traveler.fullName.trim()) {
        errors[`traveler_${idx}_name`] = `Nama lengkap penumpang ${idx + 1} wajib diisi`;
      }
      if (!traveler.idNumber || !traveler.idNumber.trim()) {
        errors[`traveler_${idx}_id`] = `Nomor identitas (KTP/Paspor) penumpang ${idx + 1} wajib diisi`;
      } else if (traveler.idNumber.trim().length < 6) {
        errors[`traveler_${idx}_id`] = `Nomor identitas minimal 6 digit/karakter`;
      }
    });

    // 3. Terms agreement
    if (!agreedTerms) {
      errors.terms = 'Anda harus menyetujui syarat & ketentuan sebelum melanjutkan';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setFormErrors({});
    const newBooking = confirmBooking('Menunggu Pembayaran');
    if (newBooking) {
      navigate(`/payment?id=${newBooking.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Steps Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-[#1769D2]">
              <span className="w-6 h-6 rounded-full bg-[#1769D2] text-white flex items-center justify-center text-[11px] font-bold">1</span>
              <span>Rincian Pesanan</span>
            </div>
            <span className="h-0.5 flex-1 bg-slate-200 mx-4" />
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[11px] font-bold">2</span>
              <span>Simulasi Bayar</span>
            </div>
            <span className="h-0.5 flex-1 bg-slate-200 mx-4" />
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[11px] font-bold">3</span>
              <span>E-Ticket Selesai</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Validation Error Banner */}
            {Object.keys(formErrors).length > 0 && (
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl flex items-start gap-3 shadow-xs">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs text-rose-800 space-y-0.5">
                  <p className="font-bold text-sm">Data Belum Lengkap</p>
                  <p>
                    Mohon lengkapi seluruh informasi pemesan, data penumpang, dan persetujuan syarat & ketentuan yang ditandai merah sebelum melanjutkan ke simulasi pembayaran.
                  </p>
                </div>
              </div>
            )}

            {/* 1. Contact Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#1769D2]" />
                  <h2 className="text-base font-bold text-[#172B4D]">Data Kontak Pemesan</h2>
                </div>
                <span className="text-[11px] text-slate-400">E-tiket akan dikirim ke kontak ini</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Nama Lengkap Pemesan *</label>
                  <input
                    type="text"
                    value={draft.contactDetails.fullName}
                    onChange={e => handleContactChange('fullName', e.target.value)}
                    placeholder="Contoh: Budi Pratama"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-slate-800 border transition-all ${
                      formErrors.contactName
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                        : 'bg-slate-50 border-slate-200 focus:border-[#1769D2] focus:bg-white'
                    }`}
                  />
                  {formErrors.contactName && (
                    <p className="text-[11px] text-rose-500 font-medium">{formErrors.contactName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Alamat Email *</label>
                  <input
                    type="email"
                    value={draft.contactDetails.email}
                    onChange={e => handleContactChange('email', e.target.value)}
                    placeholder="nama@email.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-slate-800 border transition-all ${
                      formErrors.contactEmail
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                        : 'bg-slate-50 border-slate-200 focus:border-[#1769D2] focus:bg-white'
                    }`}
                  />
                  {formErrors.contactEmail && (
                    <p className="text-[11px] text-rose-500 font-medium">{formErrors.contactEmail}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Nomor WhatsApp / Telepon *</label>
                  <input
                    type="tel"
                    value={draft.contactDetails.phone}
                    onChange={e => handleContactChange('phone', e.target.value)}
                    placeholder="081234567890"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-slate-800 border transition-all ${
                      formErrors.contactPhone
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                        : 'bg-slate-50 border-slate-200 focus:border-[#1769D2] focus:bg-white'
                    }`}
                  />
                  {formErrors.contactPhone && (
                    <p className="text-[11px] text-rose-500 font-medium">{formErrors.contactPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Traveler Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#1769D2]" />
                  <h2 className="text-base font-bold text-[#172B4D]">Data Penumpang / Tamu ({draft.travelers.length})</h2>
                </div>
                <span className="text-[11px] text-slate-400">Wajib sesuai KTP / Paspor</span>
              </div>

              {draft.travelers.map((traveler, index) => (
                <div
                  key={index}
                  className={`space-y-3.5 text-xs ${
                    index > 0 ? 'pt-5 border-t border-slate-100' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs">
                      {index === 0 ? 'Penumpang 1 / Tamu Utama' : `Penumpang ${index + 1}`}
                    </span>
                    <span className="text-[10px] text-slate-400">Kartu Identitas Resmi</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Titel</label>
                      <select
                        value={traveler.title}
                        onChange={e => handleTravelerChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                      >
                        <option value="Tuan">Tuan</option>
                        <option value="Nyonya">Nyonya</option>
                        <option value="Nona">Nona</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="font-semibold text-slate-700">Nama Lengkap *</label>
                      <input
                        type="text"
                        value={traveler.fullName}
                        onChange={e => handleTravelerChange(index, 'fullName', e.target.value)}
                        placeholder="Sesuai kartu identitas resmi"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-slate-800 border transition-all ${
                          formErrors[`traveler_${index}_name`]
                            ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                            : 'bg-slate-50 border-slate-200 focus:border-[#1769D2] focus:bg-white'
                        }`}
                      />
                      {formErrors[`traveler_${index}_name`] && (
                        <p className="text-[11px] text-rose-500 font-medium">
                          {formErrors[`traveler_${index}_name`]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Jenis Identitas</label>
                      <select
                        value={traveler.idType}
                        onChange={e => handleTravelerChange(index, 'idType', e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                      >
                        <option value="KTP">KTP (WNI)</option>
                        <option value="Paspor">Paspor (WNA/WNI)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Nomor KTP / Paspor *</label>
                      <input
                        type="text"
                        value={traveler.idNumber}
                        onChange={e => handleTravelerChange(index, 'idNumber', e.target.value)}
                        placeholder="Contoh: 3171012304900001"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-slate-800 font-mono border transition-all ${
                          formErrors[`traveler_${index}_id`]
                            ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                            : 'bg-slate-50 border-slate-200 focus:border-[#1769D2] focus:bg-white'
                        }`}
                      />
                      {formErrors[`traveler_${index}_id`] && (
                        <p className="text-[11px] text-rose-500 font-medium">
                          {formErrors[`traveler_${index}_id`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Voucher Promo Application */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2">
                <Tag className="w-5 h-5 text-[#FFB547]" />
                <h2 className="text-base font-bold text-[#172B4D]">Gunakan Voucher Diskon</h2>
              </div>

              {draft.appliedVoucher ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-emerald-700 text-white px-2 py-0.5 rounded">
                        {draft.appliedVoucher.code}
                      </span>
                      <span className="text-xs font-semibold text-emerald-900">
                        {draft.appliedVoucher.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      Hemat {formatIDR(pricing.discount)} untuk pemesanan ini!
                    </p>
                  </div>
                  <button
                    onClick={removeVoucher}
                    className="p-1.5 hover:bg-emerald-100 text-emerald-800 rounded-lg cursor-pointer"
                    title="Hapus voucher"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyVoucher} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherCodeInput}
                      onChange={e => setVoucherCodeInput(e.target.value.toUpperCase())}
                      placeholder="Masukkan kode: JELAJAHINDONESIA"
                      className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase focus:border-[#1769D2] focus:bg-white text-slate-800"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#172B4D] hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Pasang
                    </button>
                  </div>

                  {voucherFeedback && (
                    <p
                      className={`text-[11px] flex items-center gap-1.5 pt-1 ${
                        voucherFeedback.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {voucherFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span>{voucherFeedback.message}</span>
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2 text-[10px] text-slate-500">
                    <span>Voucher Populer:</span>
                    <button
                      type="button"
                      onClick={() => setVoucherCodeInput('JELAJAHINDONESIA')}
                      className="underline hover:text-[#1769D2]"
                    >
                      JELAJAHINDONESIA (15%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVoucherCodeInput('LIBURANSERU')}
                      className="underline hover:text-[#1769D2]"
                    >
                      LIBURANSERU (Rp 150rb)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVoucherCodeInput('HOTELHEMAT')}
                      className="underline hover:text-[#1769D2]"
                    >
                      HOTELHEMAT (10%)
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* 4. Terms and Agreement */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={e => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 accent-[#1769D2] w-4 h-4 cursor-pointer"
                />
                <div className="text-xs text-slate-600 leading-relaxed">
                  Saya menyatakan bahwa data pemesan dan penumpang telah sesuai dengan identitas resmi. Saya telah membaca dan menyetujui{' '}
                  <span className="text-[#1769D2] font-semibold underline">Syarat & Ketentuan</span> serta{' '}
                  <span className="text-[#1769D2] font-semibold underline">Kebijakan Privasi</span> Jelajahin.
                </div>
              </label>
              {formErrors.terms && (
                <p className="text-[11px] text-rose-500 pl-7">{formErrors.terms}</p>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Transparent Price Breakdown */}
          <div className="sticky top-20 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-5">
            <h3 className="font-bold text-sm text-[#172B4D] pb-3 border-b border-slate-100">
              Ringkasan Pesanan Anda
            </h3>

            {/* Product Card */}
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img src={draft.productImage} alt={draft.productTitle} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-[#1769D2]">{draft.productType}</span>
                <h4 className="text-xs font-bold text-[#172B4D] line-clamp-1">{draft.productTitle}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{draft.productSubtitle}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-0.5">
                  <Calendar className="w-3 h-3" />
                  <span>{draft.travelDate}</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Harga Dasar ({draft.quantity} {draft.unitName})</span>
                <span className="tabular-nums font-semibold">{formatIDR(pricing.subtotal)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Pajak PPN (11%)</span>
                <span className="tabular-nums font-semibold">{formatIDR(pricing.tax)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Biaya Layanan & Pemrosesan</span>
                <span className="tabular-nums font-semibold">{formatIDR(pricing.serviceFee)}</span>
              </div>

              {pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Diskon Promo ({draft.appliedVoucher?.code})</span>
                  <span className="tabular-nums">- {formatIDR(pricing.discount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-[#172B4D] block">Total Pembayaran</span>
                  <span className="text-[10px] text-slate-400">Termasuk seluruh biaya resmi</span>
                </div>
                <span className="text-xl font-extrabold text-[#1769D2] tabular-nums">
                  {formatIDR(pricing.totalAmount)}
                </span>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleProceedToPayment}
              className="w-full py-3.5 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Lanjut ke Simulasi Pembayaran</span>
            </button>

            <div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-500 leading-relaxed text-center">
              🛡️ Transaksi aman dengan verifikasi demo terenkripsi. Tidak ada penarikan saldo nyata.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
