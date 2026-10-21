import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { useWishlist } from '../context/WishlistContext';
import { StorageService } from '../services/storage';
import { TourPackage } from '../types';
import { formatIDR } from '../utils/format';
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Bookmark,
  Star,
  ArrowLeft,
  Clock,
  Compass,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const PackageDetailPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const { startBooking } = useBooking();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const pkgId = params.id;
  const packages = StorageService.getPackages();
  const pkg = packages.find(p => p.id === pkgId) || packages[0];

  const [selectedDate, setSelectedDate] = useState<string>(pkg?.departureDates[0] || '2026-11-15');
  const [participants, setParticipants] = useState<number>(1);
  const [openDay, setOpenDay] = useState<number>(1);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Paket wisata tidak ditemukan</h2>
        <button
          onClick={() => navigate('/packages')}
          className="mt-4 px-4 py-2 bg-[#1769D2] text-white rounded-xl text-xs font-semibold"
        >
          Kembali ke Katalog Tur
        </button>
      </div>
    );
  }

  const totalPrice = pkg.pricePerPerson * participants;

  const handleBooking = () => {
    startBooking({
      productType: 'package',
      productId: pkg.id,
      productTitle: pkg.name,
      productSubtitle: `${pkg.durationDays} Hari · ${pkg.tripType} · ${participants} Peserta`,
      productImage: pkg.mainImage,
      basePrice: pkg.pricePerPerson,
      travelDate: selectedDate,
      quantity: participants,
      unitName: 'Peserta'
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/packages')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769D2] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Paket Wisata</span>
        </button>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#1769D2] uppercase tracking-wider">{pkg.tripType}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600">{pkg.destination}, {pkg.province}</span>
                <span className="text-slate-300">·</span>
                <span className="text-emerald-700 font-semibold">{pkg.durationDays} Hari {(pkg.durationDays || 2) - 1} Malam</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">{pkg.name}</h1>
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{pkg.rating} / 5.0</span>
                </div>
                <span>({pkg.reviewCount} ulasan wisatawan)</span>
              </div>
            </div>

            <button
              onClick={() =>
                toggleWishlist({
                  id: `wish-${pkg.id}`,
                  itemType: 'package',
                  itemId: pkg.id,
                  title: pkg.name,
                  subtitle: `${pkg.destination} · ${pkg.tripType}`,
                  image: pkg.mainImage,
                  price: pkg.pricePerPerson,
                  rating: pkg.rating
                })
              }
              className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer self-start md:self-auto ${
                isWishlisted(pkg.id, 'package')
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isWishlisted(pkg.id, 'package') ? 'Tersimpan' : 'Simpan Tur'}</span>
            </button>
          </div>

          <div className="mt-6 aspect-16/8 sm:aspect-16/7 rounded-2xl overflow-hidden bg-slate-100">
            <img src={pkg.mainImage} alt={pkg.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content Split: Left (Itinerary, Inclusions) & Right (Booking Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-[#172B4D]">Ringkasan Perjalanan</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pkg.description}
              </p>
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-[#172B4D] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1769D2] shrink-0" />
                <span><strong>Titik Kumpul / Penjemputan:</strong> {pkg.meetingPoint}</span>
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#172B4D]">Rencana Perjalanan (Itinerary)</h2>
              <div className="space-y-3">
                {pkg.itinerary.map(day => {
                  const isOpen = openDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenDay(isOpen ? 0 : day.day)}
                        className="w-full p-4 text-left bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#1769D2] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                            H{day.day}
                          </span>
                          <span>{day.title}</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 space-y-3 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          <p>{day.description}</p>
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {day.activities.map((act, i) => (
                              <span key={i} className="px-2 py-0.5 bg-blue-50 text-[#1769D2] rounded text-[11px] font-medium">
                                • {act}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#172B4D]">Fasilitas Termasuk & Tidak Termasuk</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Termasuk (Included):
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {pkg.included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" /> Tidak Termasuk (Excluded):
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {pkg.excluded.map((exc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Booking Form */}
          <div className="sticky top-20 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-5">
            <div>
              <span className="text-xs text-slate-400 block">Harga Mulai Dari</span>
              <p className="text-2xl font-extrabold text-[#172B4D] tabular-nums">
                {formatIDR(pkg.pricePerPerson)}
                <span className="text-xs font-normal text-slate-500"> /peserta</span>
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600">Pilih Jadwal Keberangkatan</label>
              <select
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                {pkg.departureDates.map(date => (
                  <option key={date} value={date}>
                    {date} (Terkonfirmasi Jalan)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600">Jumlah Peserta</label>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <span className="font-semibold text-slate-700">Peserta Tur</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-sm tabular-nums">{participants}</span>
                  <button
                    type="button"
                    onClick={() => setParticipants(participants + 1)}
                    className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400">Total Harga ({participants} Peserta):</p>
                <p className="text-lg font-extrabold text-[#172B4D] tabular-nums">
                  {formatIDR(totalPrice)}
                </p>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="w-full py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer text-center"
            >
              Pesan Paket Sekarang
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Konfirmasi instan · Data demo untuk simulasi pemesanan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
