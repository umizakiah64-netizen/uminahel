import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { formatIDR, formatDateIndoLong } from '../utils/format';
import {
  CreditCard,
  QrCode,
  Building,
  Store,
  Wallet,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  Check,
  ArrowLeft,
  Calendar,
  Lock,
  Loader2,
  Sparkles,
  Info
} from 'lucide-react';

export const PaymentSimulationPage: React.FC = () => {
  const { searchParams, navigate } = useRouter();
  const { getBookingById, processPaymentSimulation, bookings } = useBooking();

  const bookingId = searchParams.get('id') || searchParams.get('order');
  const booking = bookingId
    ? getBookingById(bookingId)
    : bookings.find(b => b.paymentStatus === 'PENDING_PAYMENT' || b.paymentStatus === 'pending');

  // Category tab: 'va' | 'qris' | 'ewallet' | 'card'
  const [methodCategory, setMethodCategory] = useState<'va' | 'qris' | 'ewallet' | 'card'>('va');
  const [selectedSubMethod, setSelectedSubMethod] = useState<string>('bca_va');

  const [copiedText, setCopiedText] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessNotification, setPaymentSuccessNotification] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState<string>(booking?.paymentStatus || 'PENDING_PAYMENT');

  // Simulated countdown timer (starts at 23:59:50)
  const [timeLeft, setTimeLeft] = useState(86390);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (booking && booking.paymentStatus !== 'PENDING_PAYMENT' && booking.paymentStatus !== 'pending') {
      setSimulationStatus(booking.paymentStatus);
    }
  }, [booking]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-800">Pesanan Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500">
            ID pesanan tidak terdaftar atau belum dibuat. Silakan kembali ke pencarian atau riwayat pesanan.
          </p>
          <div className="flex gap-2 justify-center pt-2">
            <button
              onClick={() => navigate('/my-bookings')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Pesanan Saya
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2 bg-[#1769D2] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Mulai Cari Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const getReadableMethodName = (): string => {
    switch (selectedSubMethod) {
      case 'bca_va':
        return 'BCA Virtual Account';
      case 'mandiri_va':
        return 'Mandiri Virtual Account';
      case 'bni_va':
        return 'BNI Virtual Account';
      case 'bri_va':
        return 'BRI Virtual Account';
      case 'qris':
        return 'QRIS Instan (Semua E-Wallet & Bank)';
      case 'gopay':
        return 'GoPay E-Wallet';
      case 'ovo':
        return 'OVO E-Wallet';
      case 'dana':
        return 'DANA E-Wallet';
      case 'shopeepay':
        return 'ShopeePay E-Wallet';
      case 'linkaja':
        return 'LinkAja E-Wallet';
      case 'card':
        return 'Kartu Debit / Kredit (Visa/Mastercard)';
      default:
        return 'Transfer Virtual Account';
    }
  };

  // Main payment execution
  const handleExecutePayment = (outcome: 'berhasil' | 'gagal' | 'kedaluwarsa' = 'berhasil') => {
    setIsProcessing(true);
    const methodName = getReadableMethodName();

    setTimeout(() => {
      const updated = processPaymentSimulation(booking.id, outcome, methodName);
      setIsProcessing(false);
      setSimulationStatus(outcome === 'berhasil' ? 'PAID' : outcome === 'gagal' ? 'FAILED' : 'EXPIRED');

      if (outcome === 'berhasil') {
        setPaymentSuccessNotification(true);
        setTimeout(() => {
          navigate(`/booking/${booking.id}`);
        }, 1200);
      }
    }, 900);
  };

  const isAlreadyPaid =
    booking.paymentStatus === 'PAID' ||
    booking.paymentStatus === 'berhasil' ||
    simulationStatus === 'PAID' ||
    simulationStatus === 'berhasil';

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/checkout')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769D2] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Checkout</span>
          </button>

          {/* Stepper indicators */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-emerald-600">1. Checkout Lengkap</span>
            <span>→</span>
            <span className="text-[#1769D2] font-bold">2. Simulasi Bayar</span>
            <span>→</span>
            <span className="text-slate-400">3. E-Ticket Terbit</span>
          </div>
        </div>

        {/* Mandatory Transparency Banner */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-900 leading-relaxed">
            <h2 className="font-bold text-sm">Simulasi Pembayaran — Lingkungan Demo Aman</h2>
            <p>
              Ini adalah demonstrasi teknologi travel <strong>Jelajahin</strong>. Platform ini <strong>tidak memotong saldo uang asli</strong> dan tidak memerlukan kartu kredit riil. Klik tombol <strong>“Bayar Sekarang”</strong> untuk menyelesaikan transaksi demo dan menerbitkan E-Ticket instan.
            </p>
          </div>
        </div>

        {/* Success Modal / Banner */}
        {paymentSuccessNotification && (
          <div className="bg-emerald-600 text-white rounded-2xl p-5 shadow-lg flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-white" />
              <div>
                <h3 className="font-bold text-sm sm:text-base">Pembayaran Berhasil Diverifikasi!</h3>
                <p className="text-xs text-emerald-100">
                  Status pesanan telah diperbarui menjadi CONFIRMED. Mengarahkan ke E-Ticket Anda...
                </p>
              </div>
            </div>
            <Loader2 className="w-5 h-5 animate-spin text-emerald-200" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left 2 Columns: Payment Method Selection & Instructions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
              {/* Header with Countdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
                <div>
                  <h2 className="text-base font-bold text-[#172B4D]">Pilih Saluran Pembayaran</h2>
                  <p className="text-xs text-slate-500">Pilih salah satu metode simulasi di bawah ini</p>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-800 text-xs font-semibold self-start sm:self-auto">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Sisa Waktu: {formatTimer(timeLeft)}</span>
                </div>
              </div>

              {/* Category Tabs: VA, QRIS, E-Wallet, Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMethodCategory('va');
                    setSelectedSubMethod('bca_va');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    methodCategory === 'va'
                      ? 'border-[#1769D2] bg-blue-50/70 text-[#1769D2] font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1 text-[#1769D2]" />
                  <span className="text-xs block">Virtual Account</span>
                  <span className="text-[10px] text-slate-400 block font-normal">BCA, Mandiri, BNI</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMethodCategory('qris');
                    setSelectedSubMethod('qris');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    methodCategory === 'qris'
                      ? 'border-[#1769D2] bg-blue-50/70 text-[#1769D2] font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <span className="text-xs block">QRIS Instan</span>
                  <span className="text-[10px] text-slate-400 block font-normal">Semua E-Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMethodCategory('ewallet');
                    setSelectedSubMethod('gopay');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    methodCategory === 'ewallet'
                      ? 'border-[#1769D2] bg-blue-50/70 text-[#1769D2] font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <Wallet className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                  <span className="text-xs block">E-Wallet</span>
                  <span className="text-[10px] text-slate-400 block font-normal">GoPay, OVO, DANA</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMethodCategory('card');
                    setSelectedSubMethod('card');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    methodCategory === 'card'
                      ? 'border-[#1769D2] bg-blue-50/70 text-[#1769D2] font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                  <span className="text-xs block">Kartu Kredit/Debit</span>
                  <span className="text-[10px] text-slate-400 block font-normal">Simulasi Online</span>
                </button>
              </div>

              {/* Sub-method selections & instructions */}
              <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200 space-y-4">
                {/* 1. VIRTUAL ACCOUNT DETAILS */}
                {methodCategory === 'va' && (
                  <div className="space-y-4 text-xs">
                    <span className="font-semibold text-slate-700 block">Pilih Bank Virtual Account:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'bca_va', label: 'BCA VA', va: '8088 0812 3456 7890' },
                        { id: 'mandiri_va', label: 'Mandiri VA', va: '8988 8812 3456 7890' },
                        { id: 'bni_va', label: 'BNI VA', va: '8808 0812 3456 7890' },
                        { id: 'bri_va', label: 'BRI VA', va: '8888 8812 3456 7890' }
                      ].map(bank => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedSubMethod(bank.id)}
                          className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                            selectedSubMethod === bank.id
                              ? 'border-[#1769D2] bg-white text-[#1769D2] shadow-xs'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {bank.label}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-400 block">Nomor Virtual Account Demo:</span>
                          <span className="text-base sm:text-lg font-mono font-extrabold text-[#172B4D]">
                            {selectedSubMethod === 'bca_va' && '8088 0812 3456 7890'}
                            {selectedSubMethod === 'mandiri_va' && '8988 8812 3456 7890'}
                            {selectedSubMethod === 'bni_va' && '8808 0812 3456 7890'}
                            {selectedSubMethod === 'bri_va' && '8888 8812 3456 7890'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              selectedSubMethod === 'bca_va'
                                ? '8088 0812 3456 7890'
                                : selectedSubMethod === 'mandiri_va'
                                ? '8988 8812 3456 7890'
                                : selectedSubMethod === 'bni_va'
                                ? '8808 0812 3456 7890'
                                : '8888 8812 3456 7890'
                            )
                          }
                          className="px-3 py-1.5 text-xs font-semibold text-[#1769D2] hover:bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedText ? 'Tersalin' : 'Salin Nomor'}</span>
                        </button>
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                        <p>• Transfer dapat dilakukan dari m-Banking, ATM, atau Internet Banking.</p>
                        <p>• Tagihan akan otomatis terverifikasi tanpa perlu unggah bukti transfer.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. QRIS DETAILS */}
                {methodCategory === 'qris' && (
                  <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left text-xs">
                    <div className="w-44 h-44 bg-white p-3 rounded-2xl border border-slate-300 shadow-xs flex flex-col items-center justify-between shrink-0">
                      <div className="w-full text-center pb-1 border-b border-slate-100">
                        <span className="font-extrabold text-[10px] tracking-wider text-slate-800">QRIS STANDAR DEMO</span>
                      </div>
                      <div className="w-full flex-1 bg-slate-900 rounded-lg p-3 flex flex-col items-center justify-center text-white text-center font-mono text-[9px] leading-tight space-y-1">
                        <QrCode className="w-12 h-12 text-white/90" />
                        <span className="text-[8px] opacity-80">{booking.bookingCode}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-medium pt-1">NMID: ID10200882190</span>
                    </div>

                    <div className="space-y-2 text-slate-600">
                      <h4 className="font-bold text-sm text-[#172B4D]">Pindai Kode QRIS di Atas</h4>
                      <p>
                        Bisa dipindai menggunakan aplikasi mobile banking atau dompet digital apa pun:
                        <strong> BCA Mobile, Livin' Mandiri, GoPay, OVO, Dana, ShopeePay</strong>.
                      </p>
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
                        <p>• Buka aplikasi pembayaran favorit Anda.</p>
                        <p>• Arahkan kamera ke kode QR di samping.</p>
                        <p>• Tekan tombol "Bayar Sekarang" di bawah untuk menguji verifikasi sukses.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. EWALLET DETAILS */}
                {methodCategory === 'ewallet' && (
                  <div className="space-y-4 text-xs">
                    <span className="font-semibold text-slate-700 block">Pilih Penyedia E-Wallet:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'gopay', label: 'GoPay' },
                        { id: 'ovo', label: 'OVO' },
                        { id: 'dana', label: 'DANA' },
                        { id: 'shopeepay', label: 'ShopeePay' }
                      ].map(ew => (
                        <button
                          key={ew.id}
                          type="button"
                          onClick={() => setSelectedSubMethod(ew.id)}
                          className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                            selectedSubMethod === ew.id
                              ? 'border-[#1769D2] bg-white text-[#1769D2] shadow-xs'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {ew.label}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-400 block">Nomor Akun Demo Terdaftar:</span>
                          <span className="text-sm sm:text-base font-mono font-bold text-[#172B4D]">
                            {booking.contactDetails.phone || '0812-3456-7890'}
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                          Siap Ditagihkan
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 pt-1">
                        Notifikasi persetujuan pembayaran demo akan dikirimkan secara otomatis.
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. CREDIT/DEBIT CARD SIMULATION */}
                {methodCategory === 'card' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-800">Simulasi Kartu Debit / Kredit</span>
                        <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                          Mode Pengujian
                        </span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-500 font-semibold">Nomor Kartu Demo:</label>
                        <input
                          type="text"
                          readOnly
                          value="4000 1234 5678 9010 (Visa Demo)"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 font-semibold">Masa Berlaku:</label>
                          <input
                            type="text"
                            readOnly
                            value="12/28"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 font-semibold">CVV Dummy:</label>
                          <input
                            type="text"
                            readOnly
                            value="••• (888)"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PRIMARY ACTION BUTTON: BAYAR SEKARANG */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  disabled={isProcessing || isAlreadyPaid}
                  onClick={() => handleExecutePayment('berhasil')}
                  className={`w-full py-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAlreadyPaid
                      ? 'bg-emerald-600 text-white cursor-default'
                      : isProcessing
                      ? 'bg-blue-400 text-white cursor-wait'
                      : 'bg-[#1769D2] hover:bg-blue-700 text-white'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Memverifikasi Pembayaran Demo...</span>
                    </>
                  ) : isAlreadyPaid ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Pesanan Sudah Lunas — Lihat E-Ticket</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Bayar Sekarang ({formatIDR(booking.priceBreakdown.totalAmount)})</span>
                    </>
                  )}
                </button>

                {isAlreadyPaid && (
                  <button
                    type="button"
                    onClick={() => navigate(`/booking/${booking.id}`)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Buka E-Ticket / Bukti Pemesanan Sekarang
                  </button>
                )}
              </div>

              {/* QA Simulator Alternative Outcomes */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#1769D2]" />
                  <span>Opsi Pengujian Evaluator (QA Testing):</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleExecutePayment('gagal')}
                    className="p-2.5 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Uji Pembayaran Gagal</span>
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleExecutePayment('kedaluwarsa')}
                    className="p-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-slate-600" />
                    <span>Uji Waktu Kedaluwarsa</span>
                  </button>
                </div>

                {simulationStatus === 'FAILED' && (
                  <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs flex items-center justify-between">
                    <span>Status simulasi: <strong>Pembayaran Gagal</strong>. Pesanan dibatalkan.</span>
                    <button
                      onClick={() => navigate('/my-bookings')}
                      className="font-bold underline cursor-pointer"
                    >
                      Lihat di Pesanan Saya
                    </button>
                  </div>
                )}

                {simulationStatus === 'EXPIRED' && (
                  <div className="p-3 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
                    <span>Status simulasi: <strong>Waktu Pembayaran Kedaluwarsa</strong>.</span>
                    <button
                      onClick={() => navigate('/my-bookings')}
                      className="font-bold underline cursor-pointer"
                    >
                      Lihat di Pesanan Saya
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Complete Order Summary */}
          <div className="sticky top-20 bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-[#172B4D]">Ringkasan Tagihan</h3>
              <span className="text-[10px] font-bold uppercase text-[#1769D2] bg-blue-50 px-2 py-0.5 rounded">
                {booking.productType}
              </span>
            </div>

            {/* Order Identifiers */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">No. Pesanan:</span>
                <span className="font-mono font-bold text-slate-800">{booking.orderNumber || booking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kode Booking:</span>
                <span className="font-mono font-bold text-[#1769D2]">{booking.bookingCode}</span>
              </div>
            </div>

            {/* Product Card */}
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={booking.productImage}
                  alt={booking.productTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-[#172B4D] line-clamp-1">{booking.productTitle}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{booking.productSubtitle}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 pt-1">
                  <Calendar className="w-3 h-3 text-[#1769D2]" />
                  <span>Jadwal: {formatDateIndoLong(booking.travelDate)}</span>
                </div>
              </div>
            </div>

            {/* Customer & Travelers count */}
            <div className="text-xs text-slate-600 border-t border-slate-100 pt-3 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Nama Pemesan:</span>
                <span className="font-semibold text-slate-800">{booking.contactDetails.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Jumlah Tamu / Tiket:</span>
                <span className="font-semibold text-slate-800">
                  {booking.quantity} {booking.unitName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Metode Dipilih:</span>
                <span className="font-semibold text-[#1769D2]">{getReadableMethodName()}</span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Harga Dasar ({booking.quantity} {booking.unitName})</span>
                <span className="tabular-nums font-semibold">
                  {formatIDR(booking.priceBreakdown.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Pajak PPN (11%)</span>
                <span className="tabular-nums font-semibold">
                  {formatIDR(booking.priceBreakdown.tax)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Biaya Layanan</span>
                <span className="tabular-nums font-semibold">
                  {formatIDR(booking.priceBreakdown.serviceFee)}
                </span>
              </div>

              {booking.priceBreakdown.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Diskon Promo ({booking.priceBreakdown.appliedVoucherCode})</span>
                  <span className="tabular-nums">- {formatIDR(booking.priceBreakdown.discount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-[#172B4D] block">Total Pembayaran</span>
                  <span className="text-[10px] text-slate-400">Pajak resmi & biaya termasuk</span>
                </div>
                <span className="text-xl font-extrabold text-[#1769D2] tabular-nums">
                  {formatIDR(booking.priceBreakdown.totalAmount)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl text-[10px] text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1769D2] shrink-0" />
              <span>Verifikasi instan tanpa biaya transfer tambahan di mode demo.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
