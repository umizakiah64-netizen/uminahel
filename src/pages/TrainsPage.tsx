import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { StorageService } from '../services/storage';
import { TrainOffer } from '../types';
import { formatIDR } from '../utils/format';
import {
  Train,
  ArrowRight,
  SlidersHorizontal,
  Armchair,
  Wifi,
  Sparkles,
  Info
} from 'lucide-react';

export const TrainsPage: React.FC = () => {
  const { searchParams, navigate } = useRouter();
  const { startBooking } = useBooking();

  const originParam = searchParams.get('origin') || 'Jakarta (GMR)';
  const destParam = searchParams.get('destination') || 'Yogyakarta (YK)';
  const dateParam = searchParams.get('date') || '2026-11-15';
  const passengersParam = parseInt(searchParams.get('passengers') || '1', 10);

  const [trains] = useState<TrainOffer[]>(() => StorageService.getTrains());
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1500000);
  const [sortBy, setSortBy] = useState<'price_asc' | 'departure_asc'>('price_asc');

  const filteredTrains = useMemo(() => {
    return trains
      .filter(t => {
        if (selectedClass !== 'all' && t.trainClass !== selectedClass) return false;
        if (t.price > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        return a.departureTime.localeCompare(b.departureTime);
      });
  }, [trains, selectedClass, maxPrice, sortBy]);

  const handleSelectTrain = (train: TrainOffer) => {
    startBooking({
      productType: 'train',
      productId: train.id,
      productTitle: `${train.trainName} (${train.trainNumber})`,
      productSubtitle: `${train.originStation} → ${train.destinationStation} · Kelas ${train.trainClass}`,
      productImage: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800&q=80',
      basePrice: train.price,
      travelDate: dateParam,
      quantity: passengersParam,
      unitName: 'Penumpang'
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Summary */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1769D2]">
              <Train className="w-4 h-4" />
              <span>Tiket Kereta Api Indonesia (KAI)</span>
            </div>
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#172B4D]">
              <span>{originParam}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span>{destParam}</span>
            </div>
            <p className="text-xs text-slate-500">
              {dateParam} · {passengersParam} Penumpang · Kursi Langsung Terkonfirmasi
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-xs font-semibold text-[#1769D2] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
          >
            Ubah Rute Stasiun
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-sm text-[#172B4D]">
                <SlidersHorizontal className="w-4 h-4 text-[#1769D2]" />
                <span>Filter Kereta</span>
              </div>
              <button
                onClick={() => {
                  setSelectedClass('all');
                  setMaxPrice(1500000);
                  setSortBy('price_asc');
                }}
                className="text-xs text-[#1769D2] hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Harga Maksimum</label>
              <input
                type="range"
                min={300000}
                max={1500000}
                step={50000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1769D2]"
              />
              <div className="flex justify-between text-xs text-slate-500 tabular-nums">
                <span>Rp 300 rb</span>
                <span className="font-semibold text-slate-900">{formatIDR(maxPrice)}</span>
              </div>
            </div>

            {/* Class Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Kelas Kereta</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="trainClass"
                    checked={selectedClass === 'all'}
                    onChange={() => setSelectedClass('all')}
                    className="accent-[#1769D2]"
                  />
                  <span>Semua Kelas</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="trainClass"
                    checked={selectedClass === 'Eksekutif'}
                    onChange={() => setSelectedClass('Eksekutif')}
                    className="accent-[#1769D2]"
                  />
                  <span>Eksekutif</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="trainClass"
                    checked={selectedClass === 'Luxury'}
                    onChange={() => setSelectedClass('Luxury')}
                    className="accent-[#1769D2]"
                  />
                  <span>Luxury / Sleeper</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl px-4 py-2.5 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">
                Tersedia <strong className="text-slate-900">{filteredTrains.length}</strong> jadwal perjalanan
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none"
                >
                  <option value="price_asc">Harga Terendah</option>
                  <option value="departure_asc">Berangkat Paling Awal</option>
                </select>
              </div>
            </div>

            {filteredTrains.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <Info className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Tidak ada jadwal kereta yang memenuhi kriteria</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Coba sesuaikan batas filter harga atau pilih semua kelas kereta.
                </p>
              </div>
            ) : (
              filteredTrains.map(train => (
                <div
                  key={train.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="space-y-1 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-[#172B4D]">{train.trainName}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1769D2]">
                        {train.trainClass}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">No. {train.trainNumber} · {train.operator}</p>
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500">
                      {train.facilities.slice(0, 2).map((fac, idx) => (
                        <span key={idx}>✓ {fac}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8 flex-1 justify-center">
                    <div className="text-center">
                      <p className="text-base sm:text-lg font-bold text-[#172B4D]">{train.departureTime}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{train.originStation}</p>
                    </div>

                    <div className="flex flex-col items-center gap-1 min-w-[90px]">
                      <span className="text-[10px] text-slate-400">{train.duration}</span>
                      <div className="w-full flex items-center">
                        <span className="h-0.5 w-full bg-slate-200" />
                        <Train className="w-3.5 h-3.5 text-[#1769D2] -mx-0.5 shrink-0" />
                        <span className="h-0.5 w-full bg-slate-200" />
                      </div>
                      <span className="text-[10px] text-amber-600 font-semibold">
                        Sisa {train.seatsLeft} Kursi
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-base sm:text-lg font-bold text-[#172B4D]">{train.arrivalTime}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{train.destinationStation}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 sm:text-right block">per orang</span>
                      <p className="text-base sm:text-lg font-extrabold text-[#172B4D] tabular-nums">
                        {formatIDR(train.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectTrain(train)}
                      className="px-5 py-2 text-xs font-semibold text-white bg-[#1769D2] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Pilih Kereta
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
