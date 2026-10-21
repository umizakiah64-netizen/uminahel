import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { StorageService } from '../services/storage';
import { Activity } from '../types';
import { formatIDR } from '../utils/format';
import {
  Ticket,
  Clock,
  Star,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Calendar,
  Users
} from 'lucide-react';

export const ActivityDetailPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const { startBooking } = useBooking();

  const actId = params.id;
  const activities = StorageService.getActivities();
  const activity = activities.find(a => a.id === actId) || activities[0];

  const [selectedDate, setSelectedDate] = useState('2026-11-15');
  const [ticketCount, setTicketCount] = useState(1);

  if (!activity) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Aktivitas tidak ditemukan</h2>
        <button
          onClick={() => navigate('/activities')}
          className="mt-4 px-4 py-2 bg-[#1769D2] text-white rounded-xl text-xs font-semibold"
        >
          Kembali ke Aktivitas
        </button>
      </div>
    );
  }

  const totalPrice = activity.price * ticketCount;

  const handleBooking = () => {
    startBooking({
      productType: 'activity',
      productId: activity.id,
      productTitle: activity.name,
      productSubtitle: `${activity.category} · ${activity.city} · ${ticketCount} Tiket`,
      productImage: activity.mainImage,
      basePrice: activity.price,
      travelDate: selectedDate,
      quantity: ticketCount,
      unitName: 'Tiket'
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/activities')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769D2] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Aktivitas</span>
        </button>

        {/* Title Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#1769D2] uppercase tracking-wider">{activity.category}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600">{activity.city}, {activity.location}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">{activity.name}</h1>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{activity.rating} / 5.0</span>
                <span className="text-slate-400 font-normal">({activity.reviewCount} ulasan)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <Clock className="w-4 h-4 text-[#1769D2]" />
                <span>{activity.duration}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 aspect-16/8 sm:aspect-16/7 rounded-2xl overflow-hidden bg-slate-100">
            <img src={activity.mainImage} alt={activity.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Details & Booking Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#172B4D]">Deskripsi Aktivitas</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activity.description}
              </p>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-[#172B4D] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1769D2] shrink-0" />
                <span><strong>Titik Kumpul / Loket Masuk:</strong> {activity.meetingPoint}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#172B4D]">Sorotan & Fasilitas</h2>
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-700">Sorotan Pengalaman:</h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activity.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#1769D2] font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <h3 className="text-xs font-bold text-emerald-800">Termasuk Dalam Tiket:</h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activity.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{activity.cancellationPolicy}</span>
              </div>
            </div>
          </div>

          {/* Sticky Booking Form */}
          <div className="sticky top-20 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-5">
            <div>
              <span className="text-xs text-slate-400 block">Harga Tiket Masuk</span>
              <p className="text-2xl font-extrabold text-[#172B4D] tabular-nums">
                {formatIDR(activity.price)}
                <span className="text-xs font-normal text-slate-500"> /tiket</span>
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600">Tanggal Kunjungan</label>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600">Jumlah Tiket</label>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <span className="font-semibold text-slate-700">Jumlah Orang</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-sm tabular-nums">{ticketCount}</span>
                  <button
                    type="button"
                    onClick={() => setTicketCount(ticketCount + 1)}
                    className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400">Total Pembayaran ({ticketCount} Tiket):</p>
                <p className="text-lg font-extrabold text-[#172B4D] tabular-nums">
                  {formatIDR(totalPrice)}
                </p>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="w-full py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer text-center"
            >
              Pesan Tiket Sekarang
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Konfirmasi tiket instan via email & WhatsApp demo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
