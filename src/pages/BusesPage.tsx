import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { StorageService } from '../services/storage';
import { BusOffer } from '../types';
import { formatIDR } from '../utils/format';
import {
  Bus,
  ArrowRight,
  SlidersHorizontal,
  Info
} from 'lucide-react';

export const BusesPage: React.FC = () => {
  const { searchParams, navigate } = useRouter();
  const { startBooking } = useBooking();

  const originParam = searchParams.get('origin') || 'Bandung';
  const destParam = searchParams.get('destination') || 'Jakarta';
  const dateParam = searchParams.get('date') || '2026-11-15';
  const passengersParam = parseInt(searchParams.get('passengers') || '1', 10);

  const [buses] = useState<BusOffer[]>(() => StorageService.getBuses());
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(800000);

  const filteredBuses = useMemo(() => {
    return buses.filter(b => {
      if (selectedOperator !== 'all' && !b.operator.includes(selectedOperator)) return false;
      if (b.price > maxPrice) return false;
      return true;
    });
  }, [buses, selectedOperator, maxPrice]);

  const handleSelectBus = (bus: BusOffer) => {
    startBooking({
      productType: 'bus',
      productId: bus.id,
      productTitle: `${bus.operator}`,
      productSubtitle: `${bus.originCity} (${bus.originTerminal}) → ${bus.destinationCity} (${bus.destinationTerminal})`,
      productImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      basePrice: bus.price,
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
              <Bus className="w-4 h-4" />
              <span>Bus Antarkota & Travel Shuttle</span>
            </div>
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#172B4D]">
              <span>{originParam}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span>{destParam}</span>
            </div>
            <p className="text-xs text-slate-500">
              {dateParam} · {passengersParam} Penumpang · Jadwal Pasti
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-xs font-semibold text-[#1769D2] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
          >
            Ubah Rute
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-sm text-[#172B4D]">
                <SlidersHorizontal className="w-4 h-4 text-[#1769D2]" />
                <span>Filter Bus & Shuttle</span>
              </div>
              <button
                onClick={() => {
                  setSelectedOperator('all');
                  setMaxPrice(800000);
                }}
                className="text-xs text-[#1769D2] hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Operator Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Operator</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="busOperator"
                    checked={selectedOperator === 'all'}
                    onChange={() => setSelectedOperator('all')}
                    className="accent-[#1769D2]"
                  />
                  <span>Semua Operator</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="busOperator"
                    checked={selectedOperator === 'Cititrans'}
                    onChange={() => setSelectedOperator('Cititrans')}
                    className="accent-[#1769D2]"
                  />
                  <span>Cititrans Shuttle</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="busOperator"
                    checked={selectedOperator === 'DayTrans'}
                    onChange={() => setSelectedOperator('DayTrans')}
                    className="accent-[#1769D2]"
                  />
                  <span>DayTrans</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="busOperator"
                    checked={selectedOperator === 'Gunung Harta'}
                    onChange={() => setSelectedOperator('Gunung Harta')}
                    className="accent-[#1769D2]"
                  />
                  <span>Gunung Harta Solutions</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="busOperator"
                    checked={selectedOperator === 'DAMRI'}
                    onChange={() => setSelectedOperator('DAMRI')}
                    className="accent-[#1769D2]"
                  />
                  <span>DAMRI Royal Class</span>
                </label>
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Harga Maksimum</label>
              <input
                type="range"
                min={150000}
                max={800000}
                step={50000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1769D2]"
              />
              <div className="flex justify-between text-xs text-slate-500 tabular-nums">
                <span>Rp 150 rb</span>
                <span className="font-semibold text-slate-900">{formatIDR(maxPrice)}</span>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredBuses.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <Info className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Tidak ada jadwal bus yang ditemukan</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Silakan sesuaikan filter operator atau harga maksimum.
                </p>
              </div>
            ) : (
              filteredBuses.map(bus => (
                <div
                  key={bus.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="space-y-1 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-[#172B4D]">{bus.operator}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{bus.busType}</p>
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500">
                      {bus.facilities.slice(0, 2).map((fac, idx) => (
                        <span key={idx}>✓ {fac}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8 flex-1 justify-center">
                    <div className="text-center">
                      <p className="text-base sm:text-lg font-bold text-[#172B4D]">{bus.departureTime}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{bus.originTerminal}</p>
                    </div>

                    <div className="flex flex-col items-center gap-1 min-w-[90px]">
                      <span className="text-[10px] text-slate-400">{bus.duration}</span>
                      <div className="w-full flex items-center">
                        <span className="h-0.5 w-full bg-slate-200" />
                        <Bus className="w-3.5 h-3.5 text-[#1769D2] -mx-0.5 shrink-0" />
                        <span className="h-0.5 w-full bg-slate-200" />
                      </div>
                      <span className="text-[10px] text-amber-600 font-semibold">
                        Sisa {bus.seatsLeft} Kursi
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-base sm:text-lg font-bold text-[#172B4D]">{bus.arrivalTime}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{bus.destinationTerminal}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 sm:text-right block">per orang</span>
                      <p className="text-base sm:text-lg font-extrabold text-[#172B4D] tabular-nums">
                        {formatIDR(bus.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectBus(bus)}
                      className="px-5 py-2 text-xs font-semibold text-white bg-[#1769D2] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Pilih Kursi
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
