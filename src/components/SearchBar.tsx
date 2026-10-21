import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import {
  Plane,
  Building2,
  Train,
  Bus,
  MapPin,
  Calendar,
  Users,
  ArrowLeftRight,
  Search,
  Sparkles
} from 'lucide-react';

interface SearchBarProps {
  initialTab?: 'flights' | 'hotels' | 'trains' | 'buses' | 'packages';
  isCompact?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ initialTab = 'flights', isCompact = false }) => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'trains' | 'buses' | 'packages'>(initialTab);

  // Flight search state
  const [flightOrigin, setFlightOrigin] = useState('Jakarta (CGK)');
  const [flightDestination, setFlightDestination] = useState('Bali (DPS)');
  const [flightTripType, setFlightTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [flightDepartureDate, setFlightDepartureDate] = useState('2026-11-15');
  const [flightReturnDate, setFlightReturnDate] = useState('2026-11-20');
  const [flightAdults, setFlightAdults] = useState(1);
  const [flightChildren, setFlightChildren] = useState(0);
  const [flightCabin, setFlightCabin] = useState<'Ekonomi' | 'Bisnis' | 'First Class'>('Ekonomi');
  const [flightPassengerDropdown, setFlightPassengerDropdown] = useState(false);

  // Hotel search state
  const [hotelDestination, setHotelDestination] = useState('Bali');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-11-15');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-11-17');
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelGuests, setHotelGuests] = useState(2);
  const [hotelGuestDropdown, setHotelGuestDropdown] = useState(false);

  // Train search state
  const [trainOrigin, setTrainOrigin] = useState('Jakarta (GMR)');
  const [trainDestination, setTrainDestination] = useState('Yogyakarta (YK)');
  const [trainDate, setTrainDate] = useState('2026-11-15');
  const [trainPassengers, setTrainPassengers] = useState(1);

  // Bus search state
  const [busOrigin, setBusOrigin] = useState('Bandung');
  const [busDestination, setBusDestination] = useState('Jakarta');
  const [busDate, setBusDate] = useState('2026-11-15');
  const [busPassengers, setBusPassengers] = useState(1);

  // Package search state
  const [packageDestination, setPackageDestination] = useState('Semua Destinasi');
  const [packageCategory, setPackageCategory] = useState('Semua Kategori');

  const swapFlightAirports = () => {
    const temp = flightOrigin;
    setFlightOrigin(flightDestination);
    setFlightDestination(temp);
  };

  const swapTrainStations = () => {
    const temp = trainOrigin;
    setTrainOrigin(trainDestination);
    setTrainDestination(temp);
  };

  const swapBusCities = () => {
    const temp = busOrigin;
    setBusOrigin(busDestination);
    setBusDestination(temp);
  };

  // Submit handlers
  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      origin: flightOrigin,
      destination: flightDestination,
      departureDate: flightDepartureDate,
      tripType: flightTripType,
      adults: flightAdults.toString(),
      children: flightChildren.toString(),
      cabin: flightCabin
    });
    navigate(`/flights?${query.toString()}`);
  };

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      destination: hotelDestination,
      checkIn: hotelCheckIn,
      checkOut: hotelCheckOut,
      rooms: hotelRooms.toString(),
      guests: hotelGuests.toString()
    });
    navigate(`/hotels?${query.toString()}`);
  };

  const handleTrainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      origin: trainOrigin,
      destination: trainDestination,
      date: trainDate,
      passengers: trainPassengers.toString()
    });
    navigate(`/trains?${query.toString()}`);
  };

  const handleBusSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      origin: busOrigin,
      destination: busDestination,
      date: busDate,
      passengers: busPassengers.toString()
    });
    navigate(`/buses?${query.toString()}`);
  };

  const handlePackageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      destination: packageDestination,
      category: packageCategory
    });
    navigate(`/packages?${query.toString()}`);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden ${isCompact ? 'p-4' : 'p-4 sm:p-6'}`}>
      {/* Search Service Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('flights')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'flights'
              ? 'bg-[#1769D2] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Tiket Pesawat</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hotels')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'hotels'
              ? 'bg-[#1769D2] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Hotel & Resort</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('trains')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'trains'
              ? 'bg-[#1769D2] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Train className="w-4 h-4" />
          <span>Kereta Api</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('buses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'buses'
              ? 'bg-[#1769D2] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>Bus & Shuttle</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'packages'
              ? 'bg-[#1769D2] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Paket Wisata</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="pt-4">
        {/* ================= PESAWAT ================= */}
        {activeTab === 'flights' && (
          <form onSubmit={handleFlightSearch} className="space-y-4">
            {/* Options bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  checked={flightTripType === 'one-way'}
                  onChange={() => setFlightTripType('one-way')}
                  className="accent-[#1769D2]"
                />
                <span>Sekali Jalan</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  checked={flightTripType === 'round-trip'}
                  onChange={() => setFlightTripType('round-trip')}
                  className="accent-[#1769D2]"
                />
                <span>Pulang - Pergi</span>
              </label>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-slate-400">Kelas:</span>
                <select
                  value={flightCabin}
                  onChange={e => setFlightCabin(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#1769D2]"
                >
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Bisnis">Bisnis</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Origin */}
              <div className="md:col-span-3 relative">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Dari Mana</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#1769D2] focus-within:bg-white transition-colors">
                  <Plane className="w-4 h-4 text-[#1769D2] shrink-0" />
                  <select
                    value={flightOrigin}
                    onChange={e => setFlightOrigin(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Jakarta (CGK)">Jakarta (CGK)</option>
                    <option value="Bali (DPS)">Bali (DPS)</option>
                    <option value="Surabaya (SUB)">Surabaya (SUB)</option>
                    <option value="Yogyakarta (YIA)">Yogyakarta (YIA)</option>
                    <option value="Labuan Bajo (LBJ)">Labuan Bajo (LBJ)</option>
                    <option value="Sorong (SOQ)">Sorong (SOQ) / Raja Ampat</option>
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center pt-4 md:pt-5">
                <button
                  type="button"
                  onClick={swapFlightAirports}
                  title="Tukar Asal dan Tujuan"
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#1769D2] hover:bg-blue-50 text-slate-600 hover:text-[#1769D2] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Destination */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Ke Mana</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#1769D2] focus-within:bg-white transition-colors">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <select
                    value={flightDestination}
                    onChange={e => setFlightDestination(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Bali (DPS)">Bali (DPS)</option>
                    <option value="Jakarta (CGK)">Jakarta (CGK)</option>
                    <option value="Labuan Bajo (LBJ)">Labuan Bajo (LBJ)</option>
                    <option value="Sorong (SOQ)">Sorong (SOQ) / Raja Ampat</option>
                    <option value="Yogyakarta (YIA)">Yogyakarta (YIA)</option>
                    <option value="Lombok (LOP)">Lombok (LOP)</option>
                  </select>
                </div>
              </div>

              {/* Departure & Return Dates */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  {flightTripType === 'round-trip' ? 'Tanggal Pergi & Pulang' : 'Tanggal Berangkat'}
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#1769D2] focus-within:bg-white transition-colors">
                  <Calendar className="w-4 h-4 text-[#1769D2] shrink-0" />
                  <input
                    type="date"
                    value={flightDepartureDate}
                    onChange={e => setFlightDepartureDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  />
                  {flightTripType === 'round-trip' && (
                    <>
                      <span className="text-slate-300">-</span>
                      <input
                        type="date"
                        value={flightReturnDate}
                        onChange={e => setFlightReturnDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Passengers Dropdown */}
              <div className="md:col-span-2 relative">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Penumpang</label>
                <button
                  type="button"
                  onClick={() => setFlightPassengerDropdown(!flightPassengerDropdown)}
                  className="w-full flex items-center justify-between gap-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 hover:border-[#1769D2] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Users className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{flightAdults + flightChildren} Org</span>
                  </div>
                </button>

                {flightPassengerDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-30 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-900">Dewasa</p>
                        <p className="text-[10px] text-slate-500">Usia 12+</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFlightAdults(Math.max(1, flightAdults - 1))}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-xs">{flightAdults}</span>
                        <button
                          type="button"
                          onClick={() => setFlightAdults(flightAdults + 1)}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <div>
                        <p className="font-semibold text-slate-900">Anak-anak</p>
                        <p className="text-[10px] text-slate-500">Usia 2-11</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFlightChildren(Math.max(0, flightChildren - 1))}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-xs">{flightChildren}</span>
                        <button
                          type="button"
                          onClick={() => setFlightChildren(flightChildren + 1)}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFlightPassengerDropdown(false)}
                      className="w-full mt-2 py-1.5 bg-[#1769D2] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Selesai
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Cari Tiket Pesawat</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= HOTEL ================= */}
        {activeTab === 'hotels' && (
          <form onSubmit={handleHotelSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Destination or Hotel Name */}
              <div className="md:col-span-5">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Destinasi atau Nama Hotel</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#1769D2] focus-within:bg-white transition-colors">
                  <Building2 className="w-4 h-4 text-[#1769D2] shrink-0" />
                  <select
                    value={hotelDestination}
                    onChange={e => setHotelDestination(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Bali">Bali (Ubud, Seminyak, Kuta, Nusa Dua)</option>
                    <option value="Labuan Bajo">Labuan Bajo (Komodo, Flores)</option>
                    <option value="Yogyakarta">Yogyakarta (Malioboro, Tugu, Prambanan)</option>
                    <option value="Bromo">Bromo & Malang (Probolinggo, Batu)</option>
                    <option value="Raja Ampat">Raja Ampat (Misool, Waisai)</option>
                    <option value="Bandung">Bandung (Dago, Lembang, Riau)</option>
                    <option value="Lombok">Lombok & Gili Trawangan</option>
                  </select>
                </div>
              </div>

              {/* Dates Check In / Check Out */}
              <div className="md:col-span-4">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Check-in & Check-out</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#1769D2] focus-within:bg-white transition-colors">
                  <Calendar className="w-4 h-4 text-[#1769D2] shrink-0" />
                  <input
                    type="date"
                    value={hotelCheckIn}
                    onChange={e => setHotelCheckIn(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  />
                  <span className="text-slate-300">-</span>
                  <input
                    type="date"
                    value={hotelCheckOut}
                    onChange={e => setHotelCheckOut(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Rooms and Guests */}
              <div className="md:col-span-3 relative">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Kamar & Tamu</label>
                <button
                  type="button"
                  onClick={() => setHotelGuestDropdown(!hotelGuestDropdown)}
                  className="w-full flex items-center justify-between gap-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 hover:border-[#1769D2] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Users className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{hotelRooms} Kamar, {hotelGuests} Tamu</span>
                  </div>
                </button>

                {hotelGuestDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-30 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-900">Jumlah Kamar</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setHotelRooms(Math.max(1, hotelRooms - 1))}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-xs">{hotelRooms}</span>
                        <button
                          type="button"
                          onClick={() => setHotelRooms(hotelRooms + 1)}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <div>
                        <p className="font-semibold text-slate-900">Jumlah Tamu</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setHotelGuests(Math.max(1, hotelGuests - 1))}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-xs">{hotelGuests}</span>
                        <button
                          type="button"
                          onClick={() => setHotelGuests(hotelGuests + 1)}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setHotelGuestDropdown(false)}
                      className="w-full mt-2 py-1.5 bg-[#1769D2] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Terapkan
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Cari Hotel & Penginapan</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= KERETA API ================= */}
        {activeTab === 'trains' && (
          <form onSubmit={handleTrainSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Stasiun Asal</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#1769D2] focus-within:bg-white transition-colors">
                  <Train className="w-4 h-4 text-[#1769D2] shrink-0" />
                  <select
                    value={trainOrigin}
                    onChange={e => setTrainOrigin(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Jakarta (GMR)">Jakarta (Gambir - GMR)</option>
                    <option value="Bandung (BD)">Bandung (BD)</option>
                    <option value="Yogyakarta (YK)">Yogyakarta (Tugu - YK)</option>
                    <option value="Surabaya (SBI)">Surabaya Pasarturi (SBI)</option>
                    <option value="Malang (ML)">Malang (ML)</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-1 flex justify-center pt-4 md:pt-5">
                <button
                  type="button"
                  onClick={swapTrainStations}
                  title="Tukar Stasiun"
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#1769D2] hover:bg-blue-50 text-slate-600 hover:text-[#1769D2] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="md:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Stasiun Tujuan</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#1769D2] focus-within:bg-white transition-colors">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <select
                    value={trainDestination}
                    onChange={e => setTrainDestination(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Yogyakarta (YK)">Yogyakarta (Tugu - YK)</option>
                    <option value="Jakarta (GMR)">Jakarta (Gambir - GMR)</option>
                    <option value="Surabaya (SBI)">Surabaya Pasarturi (SBI)</option>
                    <option value="Bandung (BD)">Bandung (BD)</option>
                    <option value="Malang (ML)">Malang (ML)</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Tanggal Keberangkatan</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#1769D2] focus-within:bg-white transition-colors">
                  <Calendar className="w-4 h-4 text-[#1769D2] shrink-0" />
                  <input
                    type="date"
                    value={trainDate}
                    onChange={e => setTrainDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Penumpang</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <Users className="w-4 h-4 text-slate-500 shrink-0" />
                  <select
                    value={trainPassengers}
                    onChange={e => setTrainPassengers(Number(e.target.value))}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Cari Tiket Kereta</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= BUS & SHUTTLE ================= */}
        {activeTab === 'buses' && (
          <form onSubmit={handleBusSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Kota Keberangkatan</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <Bus className="w-4 h-4 text-[#1769D2] shrink-0" />
                  <select
                    value={busOrigin}
                    onChange={e => setBusOrigin(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Bandung">Bandung</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                    <option value="Surabaya">Surabaya</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-1 flex justify-center pt-4 md:pt-5">
                <button
                  type="button"
                  onClick={swapBusCities}
                  title="Tukar Kota"
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#1769D2] hover:bg-blue-50 text-slate-600 hover:text-[#1769D2] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="md:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Kota Tujuan</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <select
                    value={busDestination}
                    onChange={e => setBusDestination(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Jakarta">Jakarta</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                    <option value="Bali (Denpasar)">Bali (Denpasar)</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Tanggal Perjalanan</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <Calendar className="w-4 h-4 text-[#1769D2] shrink-0" />
                  <input
                    type="date"
                    value={busDate}
                    onChange={e => setBusDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Penumpang</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <Users className="w-4 h-4 text-slate-500 shrink-0" />
                  <select
                    value={busPassengers}
                    onChange={e => setBusPassengers(Number(e.target.value))}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Cari Bus & Shuttle</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= PAKET WISATA ================= */}
        {activeTab === 'packages' && (
          <form onSubmit={handlePackageSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-6">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Pilih Destinasi Wisata</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <MapPin className="w-4 h-4 text-[#1769D2] shrink-0" />
                  <select
                    value={packageDestination}
                    onChange={e => setPackageDestination(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Semua Destinasi">Semua Destinasi Populer</option>
                    <option value="Labuan Bajo">Labuan Bajo (Pulau Komodo & Padar)</option>
                    <option value="Bromo">Bromo & Kawah Ijen</option>
                    <option value="Raja Ampat">Raja Ampat (Wayag & Pianemo)</option>
                    <option value="Yogyakarta">Yogyakarta (Borobudur & Prambanan)</option>
                    <option value="Bali">Bali (Ubud & Nusa Penida)</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-6">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Kategori Perjalanan</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <Sparkles className="w-4 h-4 text-[#FFB547] shrink-0" />
                  <select
                    value={packageCategory}
                    onChange={e => setPackageCategory(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Semua Kategori">Semua Kategori</option>
                    <option value="Pantai & Pulau">Pantai & Pulau (Bahari)</option>
                    <option value="Gunung">Gunung & Dataran Tinggi</option>
                    <option value="Budaya & Sejarah">Budaya, Keraton & Candi</option>
                    <option value="Petualangan">Petualangan & Offroad</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Cari Paket Wisata</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
