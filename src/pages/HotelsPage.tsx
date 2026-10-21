import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useWishlist } from '../context/WishlistContext';
import { StorageService } from '../services/storage';
import { Hotel } from '../types';
import { formatIDR } from '../utils/format';
import {
  Building2,
  MapPin,
  Star,
  SlidersHorizontal,
  Bookmark,
  Check,
  Info,
  Calendar,
  Users
} from 'lucide-react';

export const HotelsPage: React.FC = () => {
  const { searchParams, navigate } = useRouter();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const cityParam = searchParams.get('destination') || searchParams.get('city') || 'Bali';
  const checkInParam = searchParams.get('checkIn') || '2026-11-15';
  const checkOutParam = searchParams.get('checkOut') || '2026-11-17';
  const roomsParam = parseInt(searchParams.get('rooms') || '1', 10);
  const guestsParam = parseInt(searchParams.get('guests') || '2', 10);

  const [hotels] = useState<Hotel[]>(() => StorageService.getHotels());
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating_desc'>('rating_desc');

  // Calculate number of nights
  const checkInDate = new Date(checkInParam);
  const checkOutDate = new Date(checkOutParam);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 2;

  const filteredHotels = useMemo(() => {
    return hotels
      .filter(h => {
        // Location matching
        const cityMatch = !cityParam || h.city.toLowerCase().includes(cityParam.toLowerCase()) || h.province.toLowerCase().includes(cityParam.toLowerCase());
        
        // Type filter
        if (selectedType !== 'all' && h.type !== selectedType) return false;

        // Rating filter
        if (h.rating < minRating) return false;

        // Price filter
        const startPrice = h.rooms[0]?.pricePerNight || h.priceRange.min;
        if (startPrice > maxPrice) return false;

        return cityMatch || hotels.length <= 4;
      })
      .sort((a, b) => {
        const priceA = a.rooms[0]?.pricePerNight || a.priceRange.min;
        const priceB = b.rooms[0]?.pricePerNight || b.priceRange.min;

        if (sortBy === 'price_asc') return priceA - priceB;
        if (sortBy === 'price_desc') return priceB - priceA;
        return b.rating - a.rating;
      });
  }, [hotels, cityParam, selectedType, minRating, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Summary Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1769D2]">
              <Building2 className="w-4 h-4" />
              <span>Akomodasi Hotel & Resort</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172B4D]">
              Hotel & Resort di {cityParam}
            </h1>
            <p className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <span>{checkInParam} - {checkOutParam}</span>
              <span>·</span>
              <span>{nights} Malam</span>
              <span>·</span>
              <span>{roomsParam} Kamar, {guestsParam} Tamu</span>
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-xs font-semibold text-[#1769D2] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
          >
            Ubah Tanggal / Destinasi
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Filters Sidebar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-sm text-[#172B4D]">
                <SlidersHorizontal className="w-4 h-4 text-[#1769D2]" />
                <span>Filter Hotel</span>
              </div>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setMinRating(0);
                  setMaxPrice(10000000);
                  setSortBy('rating_desc');
                }}
                className="text-xs text-[#1769D2] hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Harga Maksimum / Malam</label>
              <input
                type="range"
                min={1000000}
                max={10000000}
                step={500000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1769D2]"
              />
              <div className="flex justify-between text-xs text-slate-500 tabular-nums">
                <span>Rp 1 jt</span>
                <span className="font-semibold text-slate-900">{formatIDR(maxPrice)}</span>
              </div>
            </div>

            {/* Accommodation Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Tipe Akomodasi</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hotelType"
                    checked={selectedType === 'all'}
                    onChange={() => setSelectedType('all')}
                    className="accent-[#1769D2]"
                  />
                  <span>Semua Tipe</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hotelType"
                    checked={selectedType === 'Resort'}
                    onChange={() => setSelectedType('Resort')}
                    className="accent-[#1769D2]"
                  />
                  <span>Resort Mewah</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hotelType"
                    checked={selectedType === 'Hotel'}
                    onChange={() => setSelectedType('Hotel')}
                    className="accent-[#1769D2]"
                  />
                  <span>Hotel Berbintang</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hotelType"
                    checked={selectedType === 'Villa'}
                    onChange={() => setSelectedType('Villa')}
                    className="accent-[#1769D2]"
                  />
                  <span>Private Villa</span>
                </label>
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Rating Penginapan</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 0}
                    onChange={() => setMinRating(0)}
                    className="accent-[#1769D2]"
                  />
                  <span>Semua Rating</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 4.5}
                    onChange={() => setMinRating(4.5)}
                    className="accent-[#1769D2]"
                  />
                  <span>Luar Biasa: 4.5 ke atas</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 4.8}
                    onChange={() => setMinRating(4.8)}
                    className="accent-[#1769D2]"
                  />
                  <span>Istimewa: 4.8 ke atas</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Sorting bar */}
            <div className="bg-white rounded-xl px-4 py-2.5 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">
                Ditemukan <strong className="text-slate-900">{filteredHotels.length}</strong> akomodasi siap huni
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none"
                >
                  <option value="rating_desc">Rating Tertinggi</option>
                  <option value="price_asc">Harga Terendah</option>
                  <option value="price_desc">Harga Tertinggi</option>
                </select>
              </div>
            </div>

            {filteredHotels.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <Info className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Tidak ada hotel yang sesuai kriteria</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Coba ubah filter rentang harga atau pilih tipe akomodasi yang lain.
                </p>
              </div>
            ) : (
              filteredHotels.map(hotel => {
                const startPrice = hotel.rooms[0]?.pricePerNight || hotel.priceRange.min;
                const estimatedTotal = startPrice * nights * roomsParam;
                return (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all overflow-hidden flex flex-col md:flex-row"
                  >
                    {/* Hotel Image */}
                    <div className="relative md:w-72 aspect-16/10 md:aspect-auto shrink-0 overflow-hidden bg-slate-100">
                      <img
                        src={hotel.mainImage}
                        alt={hotel.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() =>
                          toggleWishlist({
                            id: `wish-${hotel.id}`,
                            itemType: 'hotel',
                            itemId: hotel.id,
                            title: hotel.name,
                            subtitle: `${hotel.city}, ${hotel.province}`,
                            image: hotel.mainImage,
                            price: startPrice,
                            rating: hotel.rating
                          })
                        }
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                          isWishlisted(hotel.id, 'hotel')
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/80 text-slate-700 hover:text-rose-500'
                        }`}
                        title="Simpan ke Wishlist"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Hotel Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-[#1769D2]">
                            {hotel.type} · {hotel.city}
                          </span>
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-slate-900">{hotel.rating}</span>
                            <span className="text-slate-400">({hotel.reviewCount} ulasan)</span>
                          </div>
                        </div>

                        <h2
                          onClick={() => navigate(`/hotels/${hotel.id}`)}
                          className="text-base sm:text-lg font-bold text-[#172B4D] hover:text-[#1769D2] cursor-pointer mt-1"
                        >
                          {hotel.name}
                        </h2>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="line-clamp-1">{hotel.address}</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-3">
                          {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                            >
                              ✓ {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing and Action */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <div>
                          <p className="text-[11px] text-slate-400">
                            Estimasi total ({nights} malam, {roomsParam} kamar):
                          </p>
                          <p className="text-lg font-extrabold text-[#172B4D] tabular-nums">
                            {formatIDR(estimatedTotal)}
                            <span className="text-xs font-normal text-slate-500">
                              {' '}({formatIDR(startPrice)} /malam)
                            </span>
                          </p>
                          <p className="text-[10px] text-emerald-600 font-medium">
                            ✓ Termasuk sarapan pagi & pajak
                          </p>
                        </div>

                        <button
                          onClick={() => navigate(`/hotels/${hotel.id}`)}
                          className="px-5 py-2.5 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                        >
                          Lihat Kamar & Pesan
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
