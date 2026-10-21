import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { formatIDR, formatDateIndoLong } from '../utils/format';
import {
  CheckCircle2,
  Calendar,
  User,
  Printer,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
  Compass,
  MapPin,
  CreditCard,
  Mail,
  Phone
} from 'lucide-react';

export const BookingConfirmationPage: React.FC = () => {
  const { params, searchParams, navigate } = useRouter();
  const { getBookingById, bookings } = useBooking();

  const bookingId = params.id || searchParams.get('id') || searchParams.get('code');
  const booking = bookingId ? getBookingById(bookingId) : bookings[0];
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedOrder, setCopiedOrder] = useState(false);

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-lg font-bold text-slate-800">Bukti Booking Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500">
            Pesanan dengan kode tersebut tidak ditemukan. Silakan periksa daftar riwayat pesanan Anda.
          </p>
          <div className="flex gap-2 justify-center pt-2">
            <button
              onClick={() => navigate('/my-bookings')}
              className="px-5 py-2.5 bg-[#1769D2] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Lihat Daftar Pesanan
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.bookingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(booking.orderNumber || booking.id);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isConfirmed =
    booking.bookingStatus === 'Dikonfirmasi' ||
    booking.bookingStatus === 'CONFIRMED' ||
    booking.bookingStatus === 'Dibayar' ||
    booking.paymentStatus === 'PAID' ||
    booking.paymentStatus === 'berhasil';

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Success Status Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-center space-y-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              isConfirmed ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
            }`}
          >
            {isConfirmed ? <CheckCircle2 className="w-10 h-10" /> : <Clock className="w-10 h-10" />}
          </div>

          <div className="space-y-1">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                isConfirmed
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}
            >
              {isConfirmed ? 'PEMBAYARAN LUNAS (PAID)' : 'MENUNGGU PEMBAYARAN'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] pt-1">
              {isConfirmed ? 'Pemesanan Berhasil Dikonfirmasi!' : `Status Pesanan: ${booking.bookingStatus}`}
            </h1>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Terima kasih! Bukti pemesanan demo resmi Anda telah diterbitkan. Simpan nomor pesanan dan kode booking berikut saat proses check-in.
            </p>
          </div>

          {/* Copyable Order and Booking Numbers */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-xs">
              <span className="text-slate-400">No. Pesanan:</span>
              <span className="font-mono font-bold text-slate-800">
                {booking.orderNumber || booking.id}
              </span>
              <button
                type="button"
                onClick={handleCopyOrder}
                className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
                title="Salin Nomor Pesanan"
              >
                {copiedOrder ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="px-4 py-2 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center gap-2 text-xs">
              <span className="text-slate-500">Kode Booking:</span>
              <span className="font-mono font-extrabold text-[#1769D2] text-sm">
                {booking.bookingCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-1 hover:bg-blue-100 rounded text-[#1769D2] cursor-pointer"
                title="Salin Kode Booking"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Official E-Ticket / Digital Pass Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
          {/* Top Header of Ticket */}
          <div className="bg-[#172B4D] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Compass className="w-7 h-7 text-[#FFB547]" />
              <div>
                <span className="font-bold text-lg tracking-tight block">Jelajahin E-Ticket Pass</span>
                <span className="text-[10px] text-slate-300 block">Bukti Reservasi Elektronik Resmi</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs">
                {isConfirmed ? 'CONFIRMED' : booking.bookingStatus}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* 1. Product Summary & Schedule */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                <img
                  src={booking.productImage}
                  alt={booking.productTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 flex-1">
                <span className="text-[10px] font-bold uppercase text-[#1769D2] tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                  Layanan {booking.productType}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#172B4D]">{booking.productTitle}</h3>
                <p className="text-xs text-slate-500">{booking.productSubtitle}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#1769D2]" />
                    <span>Jadwal: {formatDateIndoLong(booking.travelDate)}</span>
                    {booking.travelEndDate && <span> - {formatDateIndoLong(booking.travelEndDate)}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Customer & Payment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-100 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <span className="font-bold text-slate-800 block text-xs">Informasi Pemesan</span>
                <p className="text-slate-700 font-semibold">{booking.contactDetails.fullName}</p>
                <div className="space-y-1 text-slate-500 text-[11px]">
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{booking.contactDetails.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{booking.contactDetails.phone}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <span className="font-bold text-slate-800 block text-xs">Metode & Waktu Pembayaran</span>
                <p className="text-[#1769D2] font-semibold">
                  {booking.paymentMethod || 'Simulasi Transfer Bank / QRIS'}
                </p>
                <div className="space-y-1 text-slate-500 text-[11px]">
                  <p>Status: <strong className="text-emerald-700">{isConfirmed ? 'LUNAS (PAID)' : 'MENUNGGU'}</strong></p>
                  <p>Tanggal Pesanan: {booking.bookingDate || booking.createdAt?.split('T')[0]}</p>
                </div>
              </div>
            </div>

            {/* 3. Travelers / Guests List */}
            <div className="space-y-3 pb-6 border-b border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-sm">
                  Daftar Penumpang / Tamu ({booking.travelers.length})
                </h4>
                <span className="text-[11px] text-slate-400">Verifikasi kartu identitas</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {booking.travelers.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-800 text-xs">
                        {t.title} {t.fullName}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {t.idType}: {t.idNumber} · {t.nationality || 'Indonesia'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Pricing Breakdown */}
            <div className="space-y-2 text-xs text-slate-600 pb-6 border-b border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm mb-2">Rincian Pembayaran Resmi</h4>
              <div className="flex justify-between">
                <span>Harga Dasar ({booking.quantity} {booking.unitName})</span>
                <span className="tabular-nums font-semibold">{formatIDR(booking.priceBreakdown.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pajak PPN (11%)</span>
                <span className="tabular-nums font-semibold">{formatIDR(booking.priceBreakdown.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan & Pemrosesan</span>
                <span className="tabular-nums font-semibold">{formatIDR(booking.priceBreakdown.serviceFee)}</span>
              </div>
              {booking.priceBreakdown.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Diskon Promo ({booking.priceBreakdown.appliedVoucherCode})</span>
                  <span className="tabular-nums">- {formatIDR(booking.priceBreakdown.discount)}</span>
                </div>
              )}
              <div className="pt-2 flex justify-between items-center text-sm font-bold text-[#172B4D]">
                <span>Total Dibayar</span>
                <span className="text-lg text-[#1769D2] tabular-nums">
                  {formatIDR(booking.priceBreakdown.totalAmount)}
                </span>
              </div>
            </div>

            {/* Disclaimer in ticket */}
            <div className="p-3.5 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1769D2] shrink-0" />
              <span>
                Bukti Pemesanan Elektronik Jelajahin — Cukup tunjukkan dokumen digital ini kepada petugas saat check-in.
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Unduh Bukti Pemesanan</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/my-bookings')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl cursor-pointer"
            >
              Lihat Pesanan Saya
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Kembali ke Beranda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
