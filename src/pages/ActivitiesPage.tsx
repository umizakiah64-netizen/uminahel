import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { StorageService } from '../services/storage';
import { Activity } from '../types';
import { formatIDR } from '../utils/format';
import {
  Ticket,
  Clock,
  Star,
  SlidersHorizontal,
  Info
} from 'lucide-react';

export const ActivitiesPage: React.FC = () => {
  const { navigate } = useRouter();
  const { startBooking } = useBooking();

  const [activities] = useState<Activity[]>(() => StorageService.getActivities());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredActivities = useMemo(() => {
    return activities.filter(a => {
      if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
      return true;
    });
  }, [activities, selectedCategory]);

  const handleBook = (act: Activity) => {
    startBooking({
      productType: 'activity',
      productId: act.id,
      productTitle: act.name,
      productSubtitle: `${act.category} · ${act.city} · ${act.duration}`,
      productImage: act.mainImage,
      basePrice: act.price,
      travelDate: '2026-11-15',
      quantity: 1,
      unitName: 'Tiket'
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1769D2]">
              <Ticket className="w-4 h-4" />
              <span>Aktivitas & Tiket Atraksi Wisata</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">
              Jelajahi Atraksi & Rekreasi Seru
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Pesan tiket GWK Bali, Sunrise Jeep Bromo, Rafting Sungai Ayung, dan tur eksotik lainnya secara instan.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1769D2] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Semua Aktivitas
            </button>
            <button
              onClick={() => setSelectedCategory('Atraksi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'Atraksi'
                  ? 'bg-[#1769D2] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Atraksi & Monumen
            </button>
            <button
              onClick={() => setSelectedCategory('Petualangan')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'Petualangan'
                  ? 'bg-[#1769D2] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Petualangan & 4x4
            </button>
            <button
              onClick={() => setSelectedCategory('Air & Bahari')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'Air & Bahari'
                  ? 'bg-[#1769D2] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Air & Rafting
            </button>
            <button
              onClick={() => setSelectedCategory('Tur Lokal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'Tur Lokal'
                  ? 'bg-[#1769D2] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Day Tour Lokal
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredActivities.map(act => (
            <div
              key={act.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => navigate(`/activities/${act.id}`)}
                  className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={act.mainImage}
                    alt={act.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{act.duration}</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-[#1769D2]">{act.category} · {act.city}</span>
                  <h2
                    onClick={() => navigate(`/activities/${act.id}`)}
                    className="font-bold text-sm text-[#172B4D] line-clamp-2 cursor-pointer hover:text-[#1769D2] leading-snug"
                  >
                    {act.name}
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] text-slate-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">{act.rating}</span>
                    <span className="text-slate-400">({act.reviewCount})</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">per tiket</span>
                    <span className="text-base font-extrabold text-[#172B4D] tabular-nums">
                      {formatIDR(act.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => navigate(`/activities/${act.id}`)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleBook(act)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1769D2] hover:bg-blue-700 rounded-lg cursor-pointer"
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
