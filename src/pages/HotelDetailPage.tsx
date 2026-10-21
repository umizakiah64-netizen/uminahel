import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { useWishlist } from '../context/WishlistContext';
import { StorageService } from '../services/storage';
import { Hotel, RoomType } from '../types';
import { formatIDR } from '../utils/format';
import {
  Building2,
  MapPin,
  Star,
  Bookmark,
  Calendar,
  Users,
  Clock,
  ShieldCheck,
  Check,
  Coffee,
  Wifi,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const HotelDetailPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const { startBooking } = useBooking();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const hotelId = params.id;
  const hotels = StorageService.getHotels();
  const hotel = hotels.find(h => h.id === hotelId) || hotels[0];

  const [activePhoto, setActivePhoto] = useState<string>(hotel?.mainImage || '');
  const [checkInDate, setCheckInDate] = useState('2026-11-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-17');
  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Hotel tidak ditemukan</h2>
        <button
          onClick={() => navigate('/hotels')}
          className="mt-4 px-4 py-2 bg-[#1769D2] text-white rounded-xl text-xs font-semibold"
        >
          Kembali ke Daftar Hotel
        </button>
      </div>
    );
  }

  // Calculate nights
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 2;

  const handleSelectRoom = (room: RoomType) => {
    startBooking({
      productType: 'hotel',
      productId: hotel.id,
      productTitle: hotel.name,
      productSubtitle: `${room.name} · ${nights} Malam (${roomCount} Kamar, ${guestCount} Tamu)`,
      productImage: room.imageUrl || hotel.mainImage,
      basePrice: room.pricePerNight * nights,
      travelDate: checkInDate,
      travelEndDate: checkOutDate,
      quantity: roomCount,
      unitName: 'Kamar'
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <button
          onClick={() => navigate('/hotels')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769D2] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pencarian Hotel</span>
        </button>

        {/* Hotel Title & Badges */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1769D2] uppercase tracking-wider">
                  {hotel.type} Mewah
                </span>
                <span className="text-slate-300">·</span>
                <div className="flex items-center text-amber-400">
                  {[...Array(hotel.stars || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">{hotel.name}</h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{hotel.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  toggleWishlist({
                    id: `wish-${hotel.id}`,
                    itemType: 'hotel',
                    itemId: hotel.id,
                    title: hotel.name,
                    subtitle: `${hotel.city}, ${hotel.province}`,
                    image: hotel.mainImage,
                    price: hotel.rooms[0]?.pricePerNight || hotel.priceRange.min,
                    rating: hotel.rating
                  })
                }
                className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
                  isWishlisted(hotel.id, 'hotel')
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isWishlisted(hotel.id, 'hotel') ? 'Tersimpan' : 'Simpan'}</span>
              </button>

              <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-center">
                <div className="flex items-center justify-center gap-1 text-[#1769D2] font-bold text-sm">
                  <Star className="w-4 h-4 fill-[#1769D2]" />
                  <span>{hotel.rating} / 5.0</span>
                </div>
                <span className="text-[10px] text-slate-500">{hotel.reviewCount} ulasan tamu</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 aspect-16/10 rounded-xl overflow-hidden bg-slate-100">
              <img
                src={activePhoto || hotel.mainImage}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex md:flex-col gap-3 overflow-x-auto">
              {hotel.gallery.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhoto(img)}
                  className={`flex-1 aspect-16/10 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    activePhoto === img ? 'border-[#1769D2] opacity-100' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${hotel.name} foto ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details & Room Types Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Description & Amenities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#172B4D]">Tentang Penginapan</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {hotel.description}
              </p>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1769D2]" />
                  <div>
                    <span className="font-bold text-slate-800">Waktu Check-in: </span>
                    <span className="text-slate-600">{hotel.checkInTime} WIB</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1769D2]" />
                  <div>
                    <span className="font-bold text-slate-800">Waktu Check-out: </span>
                    <span className="text-slate-600">{hotel.checkOutTime} WIB</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{hotel.cancellationPolicy}</span>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#172B4D]">Fasilitas Utama</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Types Catalog */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#172B4D]">Pilih Tipe Kamar</h2>
              {hotel.rooms.map(room => {
                const totalRoomPrice = room.pricePerNight * nights * roomCount;
                return (
                  <div
                    key={room.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row gap-6 items-start"
                  >
                    <div className="w-full sm:w-56 aspect-4/3 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-base text-[#172B4D]">{room.name}</h3>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          Tersedia {room.availableCount} Kamar
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                        <span>🛏️ {room.bedType}</span>
                        <span>👥 Maks {room.maxGuests} Tamu</span>
                        {room.breakfastIncluded && (
                          <span className="text-emerald-700 font-semibold">☕ Sarapan Termasuk</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {room.amenities.map((item, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs text-slate-400">Total untuk {nights} malam ({roomCount} kamar):</p>
                          <p className="text-lg font-extrabold text-[#172B4D] tabular-nums">
                            {formatIDR(totalRoomPrice)}
                            <span className="text-xs font-normal text-slate-500">
                              {' '}({formatIDR(room.pricePerNight)} /malam)
                            </span>
                          </p>
                        </div>

                        <button
                          onClick={() => handleSelectRoom(room)}
                          className="px-6 py-2.5 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          Pilih Kamar Ini
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Stay Selector */}
          <div className="sticky top-20 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-5">
            <h3 className="font-bold text-sm text-[#172B4D]">Sesuaikan Jadwal Menginap</h3>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">Tanggal Check-in</label>
              <input
                type="date"
                value={checkInDate}
                onChange={e => setCheckInDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">Tanggal Check-out</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={e => setCheckOutDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500">Jumlah Kamar</label>
                <select
                  value={roomCount}
                  onChange={e => setRoomCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value={1}>1 Kamar</option>
                  <option value={2}>2 Kamar</option>
                  <option value={3}>3 Kamar</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500">Jumlah Tamu</label>
                <select
                  value={guestCount}
                  onChange={e => setGuestCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value={1}>1 Tamu</option>
                  <option value={2}>2 Tamu</option>
                  <option value={3}>3 Tamu</option>
                  <option value={4}>4 Tamu</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl text-xs text-[#1769D2] font-medium">
              Durasi menginap: <strong>{nights} malam</strong>
            </div>

            <button
              onClick={() => {
                const room = hotel.rooms[0];
                if (room) handleSelectRoom(room);
              }}
              className="w-full py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer text-center"
            >
              Lanjut Pilih Kamar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
