import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { Booking, BookingStatus } from '../types';
import { formatIDR, formatDateIndo } from '../utils/format';
import {
  CreditCard,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  XCircle,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { bookings, requestCancellation, refreshBookings } = useBooking();
  const [activeTab, setActiveTab] = useState<'all' | 'menunggu' | 'dikonfirmasi' | 'refund'>('all');
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter(b => {
    const isPending = b.bookingStatus === 'PENDING_PAYMENT' || b.bookingStatus === 'Menunggu Pembayaran' || b.paymentStatus === 'pending';
    const isConfirmed = b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'Dikonfirmasi' || b.bookingStatus === 'Dibayar' || b.paymentStatus === 'PAID';
    const isRefundOrCancel = b.bookingStatus === 'CANCELLED' || b.bookingStatus === 'Dibatalkan' || b.bookingStatus.includes('Refund') || b.paymentStatus === 'REFUNDED';

    if (activeTab === 'menunggu') return isPending;
    if (activeTab === 'dikonfirmasi') return isConfirmed;
    if (activeTab === 'refund') return isRefundOrCancel;
    return true;
  });

  const handleConfirmCancel = () => {
    if (cancelModalBooking) {
      requestCancellation(cancelModalBooking.id);
      setCancelModalBooking(null);
      refreshBookings();
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
      case 'Dikonfirmasi':
      case 'Dibayar':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Dikonfirmasi (Lunas)</span>;
      case 'PENDING_PAYMENT':
      case 'Menunggu Pembayaran':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">Menunggu Pembayaran</span>;
      case 'CANCELLED':
      case 'Dibatalkan':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Dibatalkan</span>;
      case 'REFUND_PENDING':
      case 'Refund Diproses':
      case 'REFUNDED':
      case 'Refund Selesai':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">{status}</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#172B4D]">Riwayat Pemesanan Perjalanan</h1>
              <p className="text-xs text-slate-500 mt-1">
                Kelola tiket, voucher hotel, status pembayaran, serta pengajuan pengembalian dana.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-[#1769D2] text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              + Pesan Perjalanan Baru
            </button>
          </div>

          {/* Filter Status Tabs */}
          <div className="flex gap-2 pt-6 border-t border-slate-100 mt-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#1769D2] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Pesanan ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('menunggu')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'menunggu'
                  ? 'bg-[#1769D2] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Menunggu Pembayaran
            </button>
            <button
              onClick={() => setActiveTab('dikonfirmasi')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'dikonfirmasi'
                  ? 'bg-[#1769D2] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Terkonfirmasi & Siap Berangkat
            </button>
            <button
              onClick={() => setActiveTab('refund')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'refund'
                  ? 'bg-[#1769D2] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Dibatalkan / Refund
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <CreditCard className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Belum ada pesanan pada kategori ini</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Temukan tiket pesawat, hotel, dan petualangan impian Anda di Jelajahin.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 bg-[#1769D2] text-white rounded-xl text-xs font-semibold"
            >
              Mulai Pesan Sekarang
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(b => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 hover:border-blue-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={b.productImage} alt={b.productTitle} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#1769D2] bg-blue-50 px-2 py-0.5 rounded">
                        {b.bookingCode}
                      </span>
                      {getStatusBadge(b.bookingStatus)}
                    </div>
                    <h3 className="font-bold text-base text-[#172B4D]">{b.productTitle}</h3>
                    <p className="text-xs text-slate-500">{b.productSubtitle}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span>Jadwal: {formatDateIndo(b.travelDate)}</span>
                      <span>·</span>
                      <span>Total: <strong className="text-slate-900 tabular-nums">{formatIDR(b.priceBreakdown.totalAmount)}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-2">
                  <button
                    onClick={() => navigate(`/booking/${b.id}`)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Detail E-Ticket</span>
                  </button>

                  {(b.bookingStatus === 'Menunggu Pembayaran' ||
                    b.bookingStatus === 'PENDING_PAYMENT' ||
                    b.paymentStatus === 'pending') && (
                    <button
                      onClick={() => navigate(`/payment?id=${b.id}`)}
                      className="px-4 py-2 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Bayar Sekarang
                    </button>
                  )}

                  {(b.bookingStatus === 'Dikonfirmasi' ||
                    b.bookingStatus === 'CONFIRMED' ||
                    b.bookingStatus === 'Dibayar' ||
                    b.paymentStatus === 'PAID') && (
                    <button
                      onClick={() => setCancelModalBooking(b)}
                      className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                    >
                      Ajukan Refund / Batal
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancellation Modal */}
        {cancelModalBooking && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-bold text-base text-[#172B4D]">Konfirmasi Pengajuan Refund</h3>
                <p className="text-xs text-slate-500">
                  Apakah Anda yakin ingin membatalkan pesanan <strong>{cancelModalBooking.bookingCode}</strong> ({cancelModalBooking.productTitle})?
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                Sesuai kebijakan pengembalian dana, simulasi refund akan diproses dalam waktu 1x24 jam kerja ke rekening semula.
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCancelModalBooking(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
                >
                  Ya, Batalkan Pesanan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
