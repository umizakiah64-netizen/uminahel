import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useWishlist } from '../context/WishlistContext';
import { useBooking } from '../context/BookingContext';
import { StorageService } from '../services/storage';
import { TourPackage } from '../types';
import { formatIDR } from '../utils/format';
import {
  MapPin,
  Calendar,
  Bookmark,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Info,
  Users
} from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const { searchParams, navigate } = useRouter();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { startBooking } = useBooking();

  const destParam = searchParams.get('destination') || searchParams.get('city') || '';
  const categoryParam = searchParams.get('category') || '';

  const [packages] = useState<TourPackage[]>(() => StorageService.getPackages());
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam && categoryParam !== 'Semua Kategori' ? categoryParam : 'all'
  );
  const [selectedTripType, setSelectedTripType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000000);

  const filteredPackages = useMemo(() => {
    return packages.filter(p => {
      if (destParam && destParam !== 'Semua Destinasi') {
        const matchDest = p.destination.toLowerCase().includes(destParam.toLowerCase()) || p.name.toLowerCase().includes(destParam.toLowerCase());
        if (!matchDest) return false;
      }

      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedTripType !== 'all' && p.tripType !== selectedTripType) return false;
      if (p.pricePerPerson > maxPrice) return false;

      return true;
    });
  }, [packages, destParam, selectedCategory, selectedTripType, maxPrice]);

  const handleQuickBook = (pkg: TourPackage) => {
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
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1769D2]">
              <MapPin className="w-4 h-4" />
              <span>Paket Wisata & Petualangan Nusantara</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172B4D]">
              Katalog Tour & Open Trip Indonesia
            </h1>
            <p className="text-xs text-slate-500">
              Jelajahi Labuan Bajo, Bromo, Raja Ampat, dan destinasi impian lainnya bersama pemandu berpengalaman.
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-xs font-semibold text-[#1769D2] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
          >
            Pencarian Baru
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Filters Sidebar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-sm text-[#172B4D]">
                <SlidersHorizontal className="w-4 h-4 text-[#1769D2]" />
                <span>Filter Tur</span>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTripType('all');
                  setMaxPrice(10000000);
                }}
                className="text-xs text-[#1769D2] hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Trip Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Tipe Perjalanan</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={selectedTripType === 'all'}
                    onChange={() => setSelectedTripType('all')}
                    className="accent-[#1769D2]"
                  />
                  <span>Semua Tipe</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={selectedTripType === 'Open Trip'}
                    onChange={() => setSelectedTripType('Open Trip')}
                    className="accent-[#1769D2]"
                  />
                  <span>Open Trip (Gabungan)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={selectedTripType === 'Private Trip'}
                    onChange={() => setSelectedTripType('Private Trip')}
                    className="accent-[#1769D2]"
                  />
                  <span>Private Trip (Keluarga / Grup)</span>
                </label>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Kategori Wisata</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="tourCategory"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="accent-[#1769D2]"
                  />
                  <span>Semua Kategori</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="tourCategory"
                    checked={selectedCategory === 'Pantai & Pulau'}
                    onChange={() => setSelectedCategory('Pantai & Pulau')}
                    className="accent-[#1769D2]"
                  />
                  <span>Pantai & Bahari</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="tourCategory"
                    checked={selectedCategory === 'Gunung'}
                    onChange={() => setSelectedCategory('Gunung')}
                    className="accent-[#1769D2]"
                  />
                  <span>Gunung & Kawah</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="tourCategory"
                    checked={selectedCategory === 'Budaya & Sejarah'}
                    onChange={() => setSelectedCategory('Budaya & Sejarah')}
                    className="accent-[#1769D2]"
                  />
                  <span>Budaya & Sejarah</span>
                </label>
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Harga Maksimum / Orang</label>
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
          </div>

          {/* Packages List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl px-4 py-2.5 border border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Menampilkan <strong className="text-slate-900">{filteredPackages.length}</strong> paket wisata aktif</span>
            </div>

            {filteredPackages.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <Info className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Paket wisata tidak ditemukan</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Silakan ubah filter kategori atau batas harga maksimum.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPackages.map(pkg => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                        <img
                          src={pkg.mainImage}
                          alt={pkg.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#172B4D]/85 backdrop-blur-sm text-[#FFB547] text-xs font-bold">
                          {pkg.tripType} · {pkg.durationDays}H
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
                          <span className="font-semibold text-[#1769D2]">{pkg.destination}</span>
                          <span>·</span>
                          <span>{pkg.category}</span>
                        </div>
                        <h2
                          onClick={() => navigate(`/packages/${pkg.id}`)}
                          className="font-bold text-[#172B4D] hover:text-[#1769D2] cursor-pointer text-base line-clamp-2"
                        >
                          {pkg.name}
                        </h2>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {pkg.description}
                        </p>
                        <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Makan, tiket, transportasi & pemandu</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                      <div className="flex items-center justify-between pt-3">
                        <div>
                          <span className="text-[10px] text-slate-400 block">per orang</span>
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
                            onClick={() => handleQuickBook(pkg)}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
