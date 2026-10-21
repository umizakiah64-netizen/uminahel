import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useWishlist } from '../context/WishlistContext';
import { useBooking } from '../context/BookingContext';
import { SearchBar } from '../components/SearchBar';
import {
  POPULAR_DESTINATIONS,
  MOCK_HOTELS,
  MOCK_PACKAGES,
  MOCK_ACTIVITIES,
  MOCK_VOUCHERS,
  DEMO_TESTIMONIALS,
  ARTICLES_INSPIRATION,
  ASSET_HERO_TRAVEL
} from '../data/mockData';
import { formatIDR } from '../utils/format';
import {
  Sparkles,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  Star,
  Copy,
  Check,
  Calendar,
  Clock,
  Compass
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { startBooking } = useBooking();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleQuickBookHotel = (hotel: typeof MOCK_HOTELS[0]) => {
    startBooking({
      productType: 'hotel',
      productId: hotel.id,
      productTitle: hotel.name,
      productSubtitle: `${hotel.rooms[0]?.name || 'Standard Room'} · ${hotel.city}`,
      productImage: hotel.mainImage,
      basePrice: hotel.rooms[0]?.pricePerNight || hotel.priceRange.min,
      travelDate: '2026-11-15',
      travelEndDate: '2026-11-17',
      quantity: 2,
      unitName: 'Malam Menginap'
    });
    navigate('/checkout');
  };

  const handleQuickBookPackage = (pkg: typeof MOCK_PACKAGES[0]) => {
    startBooking({
      productType: 'package',
      productId: pkg.id,
      productTitle: pkg.name,
      productSubtitle: `${pkg.durationDays} Hari · ${pkg.tripType} · ${pkg.destination}`,
      productImage: pkg.mainImage,
      basePrice: pkg.pricePerPerson,
      travelDate: pkg.departureDates[0] || '2026-11-15',
      quantity: 1,
      unitName: 'Peserta'
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] pb-16">
      {/* 1. Hero Section */}
      <section className="relative bg-[#172B4D] text-white pt-8 pb-36 lg:pb-44 overflow-hidden">
        {/* Background Image Scrim */}
        <div className="absolute inset-0 z-0 opacity-35 mix-blend-overlay">
          <img
            src={ASSET_HERO_TRAVEL}
            alt="Pemandangan Lautan Labuan Bajo Indonesia"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#172B4D]/90 via-[#172B4D]/80 to-[#172B4D] z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl space-y-3 pt-4 sm:pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#FFB547] text-xs font-semibold border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Platform Travel & Booking Terpercaya No. 1 Indonesia</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Liburan Impian, <br className="hidden sm:inline" />
              <span className="text-[#FFB547]">Dimulai di Sini.</span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Temukan tiket pesawat, kereta api, bus shuttle, hotel mewah, dan paket wisata terbaik untuk menjelajahi keindahan Indonesia dengan harga transparan.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Search Bar container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-20">
        <SearchBar />
      </div>

      {/* 2. Destinasi Populer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2]">Destinasi Unggulan</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">Eksplorasi Keindahan Nusantara</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dari surga bahari Raja Ampat hingga magisnya matahari terbit di Gunung Bromo.
            </p>
          </div>
          <button
            onClick={() => navigate('/packages')}
            className="text-xs sm:text-sm font-semibold text-[#1769D2] hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Lihat Semua Destinasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_DESTINATIONS.slice(0, 4).map(dest => (
            <div
              key={dest.id}
              onClick={() => navigate(`/hotels?city=${encodeURIComponent(dest.name)}`)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-medium text-amber-300">{dest.province}</p>
                  <h3 className="text-lg font-bold">{dest.name}</h3>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.tagline}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{dest.hotelCount}</span>
                  <span className="font-semibold text-[#1769D2]">Tiket dr {dest.flightFrom}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Promo & Voucher Section */}
      <section id="promo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-[#172B4D] via-[#1a3869] to-[#1769D2] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB547]/20 text-[#FFB547] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VOUCHER PROMO AKTIF</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Hemat Hingga 20% Liburan Musim Ini
              </h2>
              <p className="text-xs sm:text-sm text-slate-200">
                Gunakan kode voucher resmi di bawah saat checkout untuk potongan harga instan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {MOCK_VOUCHERS.slice(0, 2).map(voucher => (
                <div
                  key={voucher.code}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#FFB547] uppercase tracking-wider block">
                      {voucher.title}
                    </span>
                    <p className="text-lg font-mono font-extrabold tracking-wider text-white">
                      {voucher.code}
                    </p>
                    <p className="text-[10px] text-slate-300">
                      Min transaksi Rp {voucher.minTransaction.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyVoucher(voucher.code)}
                    className="p-2.5 rounded-xl bg-white text-[#172B4D] hover:bg-[#FFB547] transition-colors shrink-0 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                    title="Salin Kode Voucher"
                  >
                    {copiedCode === voucher.code ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-[11px] font-bold text-emerald-700">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-[11px]">Salin</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rekomendasi Hotel & Resort */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2]">Akomodasi Pilihan</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">Hotel, Resort & Villa Terbaik</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fasilitas bintang lima, pemandangan memukau, dan ulasan terpercaya.
            </p>
          </div>
          <button
            onClick={() => navigate('/hotels')}
            className="text-xs sm:text-sm font-semibold text-[#1769D2] hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Jelajahi Hotel Lainnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_HOTELS.slice(0, 3).map(hotel => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
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
                        price: hotel.priceRange.min,
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
                  <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{hotel.rating}</span>
                    <span className="text-slate-300">({hotel.reviewCount} ulasan)</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <p className="text-xs font-semibold text-[#1769D2]">{hotel.type} · {hotel.city}</p>
                  <h3
                    onClick={() => navigate(`/hotels/${hotel.id}`)}
                    className="font-bold text-[#172B4D] hover:text-[#1769D2] cursor-pointer line-clamp-1 transition-colors text-base"
                  >
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {hotel.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Mulai dari</span>
                    <p className="text-base font-extrabold text-[#172B4D] tabular-nums">
                      {formatIDR(hotel.rooms[0]?.pricePerNight || hotel.priceRange.min)}
                      <span className="text-[11px] font-normal text-slate-500"> /malam</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/hotels/${hotel.id}`)}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleQuickBookHotel(hotel)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#1769D2] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Paket Wisata Unggulan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2]">Petualangan Terbaik</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">Paket Wisata & Open Trip Pilihan</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Jadwal pasti, pemandu lokal bersertifikasi, dan dokumentasi lengkap.
            </p>
          </div>
          <button
            onClick={() => navigate('/packages')}
            className="text-xs sm:text-sm font-semibold text-[#1769D2] hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Semua Paket Tur</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PACKAGES.slice(0, 3).map(pkg => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={pkg.mainImage}
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#172B4D]/85 backdrop-blur-sm text-[#FFB547] text-xs font-bold">
                    {pkg.tripType} · {pkg.durationDays}H{(pkg.durationDays || 2) - 1}M
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
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                      isWishlisted(pkg.id, 'package')
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/80 text-slate-700 hover:text-rose-500'
                    }`}
                    title="Simpan ke Wishlist"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{pkg.destination}</span>
                    <span>·</span>
                    <span>{pkg.category}</span>
                  </div>
                  <h3
                    onClick={() => navigate(`/packages/${pkg.id}`)}
                    className="font-bold text-[#172B4D] hover:text-[#1769D2] cursor-pointer line-clamp-1 transition-colors text-base"
                  >
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Termasuk makan, tiket masuk, & dokumentasi</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Harga per orang</span>
                    <p className="text-base font-extrabold text-[#172B4D] tabular-nums">
                      {formatIDR(pkg.pricePerPerson)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/packages/${pkg.id}`)}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => handleQuickBookPackage(pkg)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#1769D2] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Aktivitas & Tiket Atraksi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2]">Pengalaman Seru</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">Tiket Atraksi & Tur Lokal</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Konfirmasi instan, tanpa antre di loket, dan kebijakan pembatalan fleksibel.
            </p>
          </div>
          <button
            onClick={() => navigate('/activities')}
            className="text-xs sm:text-sm font-semibold text-[#1769D2] hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Semua Aktivitas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_ACTIVITIES.slice(0, 4).map(act => (
            <div
              key={act.id}
              onClick={() => navigate(`/activities/${act.id}`)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
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
                  <h3 className="font-bold text-xs sm:text-sm text-[#172B4D] line-clamp-2 leading-snug">
                    {act.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">{act.rating}</span>
                    <span className="text-slate-400">({act.reviewCount})</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Mulai dari</span>
                  <span className="text-sm font-extrabold text-[#172B4D] tabular-nums">
                    {formatIDR(act.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Keunggulan Layanan Jelajahin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2]">Mengapa Memilih Kami</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172B4D] mt-1">Keunggulan Layanan Jelajahin</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standar pelayanan profesional untuk kenyamanan dan keamanan perjalanan Anda sekeluarga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769D2] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#172B4D] text-base">Harga Transparan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Semua harga tiket dan hotel sudah termasuk rincian pajak dan biaya layanan tanpa ada biaya siluman saat checkout.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#172B4D] text-base">Pilihan Terlengkap</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Integrasi pesawat, kereta KAI, bus shuttle, dan penginapan di lebih dari 50+ destinasi wisata se-Indonesia.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#172B4D] text-base">Refund Transparan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kemudahan pengajuan pembatalan dan refund langsung melalui halaman riwayat pesanan dengan status terpantau.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#172B4D] text-base">Customer Support 24/7</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tim spesialis perjalanan siap mendampingi kebutuhan Anda sebelum, selama, dan sesudah perjalanan.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Cara Melakukan Pemesanan (Step by step) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2]">Panduan Pemesanan</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B4D] mt-1">4 Langkah Mudah Pesan di Jelajahin</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#1769D2] text-white font-bold text-sm flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                1
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm">Cari & Bandingkan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pilih layanan perjalanan yang Anda perlukan, masukkan rute tanggal, dan gunakan filter harga untuk opsi terbaik.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#1769D2] text-white font-bold text-sm flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                2
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm">Isi Data & Pasang Promo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lengkapi identitas penumpang dengan akurat dan masukkan kode voucher diskon untuk penghematan maksimal.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#1769D2] text-white font-bold text-sm flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                3
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm">Simulasi Pembayaran</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pilih kanal pembayaran demo (QRIS, VA Bank, atau E-wallet) untuk memverifikasi pesanan secara instan.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#1769D2] text-white font-bold text-sm flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                4
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm">E-Ticket & Siap Berangkat</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dapatkan bukti ringkasan pesanan dan kode booking digital yang dapat diunduh atau ditunjukkan saat check-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Testimoni Demo Terverifikasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-2">
            <span>Contoh Ulasan Nyata Wisatawan (Data Demo Terverifikasi)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">Apa Kata Pelancong Kami</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1769D2]/10 text-[#1769D2] font-bold text-xs flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-xs text-[#172B4D]">{t.author}</p>
                  <p className="text-[11px] text-slate-500">{t.role} · {t.city}</p>
                  <p className="text-[10px] text-[#1769D2] font-medium">{t.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Inspirasi & Artikel Liburan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2]">Inspirasi Liburan</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">Tips & Panduan Perjalanan</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_INSPIRATION.map(art => (
            <div
              key={art.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="text-[#1769D2] font-semibold">{art.category}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#172B4D] leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-[#1769D2] flex items-center gap-1">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
