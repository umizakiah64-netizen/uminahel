import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { StorageService } from '../../services/storage';
import { formatIDR, formatDateIndo } from '../../utils/format';
import {
  Hotel,
  TourPackage,
  FlightOffer,
  Voucher,
  Booking,
  BookingStatus
} from '../../types';
import {
  ShieldCheck,
  LayoutDashboard,
  Building2,
  Plane,
  MapPin,
  CreditCard,
  Tag,
  Users,
  Plus,
  Trash2,
  Edit3,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  LogOut,
  SlidersHorizontal,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { path, navigate } = useRouter();
  const { role, switchRole, user } = useAuth();
  const { bookings, refreshBookings, updateBookingStatus } = useBooking();

  // Active admin section tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'bookings' | 'vouchers' | 'users'>('overview');

  // Search in admin
  const [searchQuery, setSearchQuery] = useState('');

  // Bookings Filter & Search State
  const [bookingSearchQuery, setBookingSearchQuery] = useState('');
  const [bookingProductFilter, setBookingProductFilter] = useState<string>('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');
  const [selectedDetailBooking, setSelectedDetailBooking] = useState<Booking | null>(null);

  // Products CRUD State
  const [productCategory, setProductCategory] = useState<'hotels' | 'packages' | 'flights'>('hotels');
  const [hotelsList, setHotelsList] = useState<Hotel[]>(() => StorageService.getHotels());
  const [packagesList, setPackagesList] = useState<TourPackage[]>(() => StorageService.getPackages());
  const [flightsList, setFlightsList] = useState<FlightOffer[]>(() => StorageService.getFlights());
  const [vouchersList, setVouchersList] = useState<Voucher[]>(() => StorageService.getVouchers());

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<{ type: string; id: string; name: string } | null>(null);

  // New Item Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCity, setNewItemCity] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(1500000);

  // Security check: Role Based Access Control
  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#F5F8FC] py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-[#172B4D]">Akses Terbatas: Hanya Administrator</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Halaman ini dilindungi dengan kontrol akses berbasis peran (RBAC). Anda sedang masuk sebagai wisatawan biasa ({user.email}).
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => switchRole('admin')}
              className="w-full py-2.5 bg-[#172B4D] hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Beralih ke Akun Administrator (Demo Auth)
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Real KPIs based on current dataset
  const totalBookingsCount = bookings.length;
  const waitingPaymentCount = bookings.filter(
    b => b.bookingStatus === 'Menunggu Pembayaran' || b.bookingStatus === 'PENDING_PAYMENT'
  ).length;
  const confirmedCount = bookings.filter(
    b =>
      b.bookingStatus === 'Dikonfirmasi' ||
      b.bookingStatus === 'CONFIRMED' ||
      b.bookingStatus === 'Dibayar' ||
      b.paymentStatus === 'PAID' ||
      b.paymentStatus === 'berhasil'
  ).length;
  const totalTransactionValue = bookings
    .filter(
      b =>
        b.bookingStatus === 'Dikonfirmasi' ||
        b.bookingStatus === 'CONFIRMED' ||
        b.bookingStatus === 'Dibayar' ||
        b.paymentStatus === 'PAID' ||
        b.paymentStatus === 'berhasil'
    )
    .reduce((sum, b) => sum + b.priceBreakdown.totalAmount, 0);

  // Status changer for admin
  const handleUpdateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    updateBookingStatus(bookingId, newStatus);
    if (selectedDetailBooking && (selectedDetailBooking.id === bookingId || selectedDetailBooking.bookingCode === bookingId)) {
      const refreshed = StorageService.getBookings().find(b => b.id === bookingId || b.bookingCode === bookingId);
      if (refreshed) setSelectedDetailBooking(refreshed);
    }
  };

  // Delete handler
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'hotel') {
      const updated = hotelsList.filter(h => h.id !== deleteTarget.id);
      setHotelsList(updated);
      StorageService.saveHotels(updated);
    } else if (deleteTarget.type === 'package') {
      const updated = packagesList.filter(p => p.id !== deleteTarget.id);
      setPackagesList(updated);
      StorageService.savePackages(updated);
    } else if (deleteTarget.type === 'flight') {
      const updated = flightsList.filter(f => f.id !== deleteTarget.id);
      setFlightsList(updated);
      StorageService.saveFlights(updated);
    } else if (deleteTarget.type === 'voucher') {
      const updated = vouchersList.filter(v => v.code !== deleteTarget.id);
      setVouchersList(updated);
      StorageService.saveVouchers(updated);
    }

    setDeleteTarget(null);
  };

  // Add Item Handler
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    if (productCategory === 'hotels') {
      const newHotel: Hotel = {
        id: `ht-custom-${Date.now()}`,
        name: newItemName,
        city: newItemCity || 'Bali',
        province: 'Indonesia',
        address: `Jl. Wisata No. ${Math.floor(Math.random() * 100)}, ${newItemCity || 'Bali'}`,
        rating: 4.8,
        reviewCount: 1,
        stars: 4,
        type: 'Hotel',
        mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
        description: 'Akomodasi baru yang ditambahkan melalui panel admin Jelajahin.',
        amenities: ['Wi-Fi Cepat', 'Kolam Renang', 'Restoran', 'AC'],
        checkInTime: '14:00',
        checkOutTime: '12:00',
        cancellationPolicy: 'Gratis pembatalan H-2.',
        priceRange: { min: newItemPrice, max: newItemPrice * 2 },
        rooms: [
          {
            id: `rm-${Date.now()}`,
            name: 'Standard Deluxe Room',
            bedType: '1 King Bed',
            maxGuests: 2,
            breakfastIncluded: true,
            pricePerNight: newItemPrice,
            availableCount: 5,
            amenities: ['AC', 'TV', 'Balkon'],
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
          }
        ]
      };
      const updated = [newHotel, ...hotelsList];
      setHotelsList(updated);
      StorageService.saveHotels(updated);
    } else if (productCategory === 'packages') {
      const newPkg: TourPackage = {
        id: `pkg-custom-${Date.now()}`,
        name: newItemName,
        destination: newItemCity || 'Labuan Bajo',
        province: 'Indonesia',
        durationDays: 3,
        tripType: 'Open Trip',
        category: 'Pantai & Pulau',
        pricePerPerson: newItemPrice,
        mainImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'],
        description: 'Paket tur baru yang dikelola langsung via dashboard admin.',
        meetingPoint: 'Bandara / Stasiun Kedatangan',
        minParticipants: 2,
        included: ['Transportasi AC', 'Makan Lengkap', 'Pemandu Lokal'],
        excluded: ['Pengeluaran Pribadi'],
        itinerary: [
          { day: 1, title: 'Kedatangan & Eksplorasi', description: 'Penjemputan dan check-in.', activities: ['Check-in', 'Sunset Tour'] },
          { day: 2, title: 'Destinasi Utama', description: 'Eksplorasi seharian.', activities: ['Trekking', 'Snorkeling'] }
        ],
        departureDates: ['2026-11-20', '2026-11-27'],
        rating: 4.9,
        reviewCount: 1
      };
      const updated = [newPkg, ...packagesList];
      setPackagesList(updated);
      StorageService.savePackages(updated);
    }

    setNewItemName('');
    setNewItemCity('');
    setShowAddModal(false);
  };

  const handleToggleVoucher = (code: string) => {
    const updated = vouchersList.map(v => {
      if (v.code === code) return { ...v, active: !v.active };
      return v;
    });
    setVouchersList(updated);
    StorageService.saveVouchers(updated);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC]">
      {/* Admin Top Banner */}
      <div className="bg-[#172B4D] text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFB547] text-[#172B4D] font-black text-xs flex items-center justify-center">
            ADM
          </div>
          <div>
            <span className="font-bold text-sm">Portal Administrator Jelajahin</span>
            <span className="text-[10px] text-slate-300 block">RBAC: Level Penuh (Super Admin Demo)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => switchRole('user')}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-medium rounded-lg text-slate-200 transition-colors cursor-pointer"
          >
            Beralih ke Tampilan Wisatawan
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1.5 bg-[#1769D2] hover:bg-blue-600 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer"
          >
            Lihat Website
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-[#1769D2] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Ringkasan Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'products' ? 'bg-[#1769D2] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Katalog Produk (CRUD)</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings' ? 'bg-[#1769D2] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Kelola Pesanan ({totalBookingsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('vouchers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'vouchers' ? 'bg-[#1769D2] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Voucher Diskon</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'users' ? 'bg-[#1769D2] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Pengguna & Tamu</span>
          </button>
        </div>

        {/* 1. OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-slate-400">Total Seluruh Pesanan</span>
                <p className="text-3xl font-extrabold text-[#172B4D] tabular-nums">{totalBookingsCount}</p>
                <span className="text-[11px] text-emerald-600 font-medium">Berdasarkan pesanan aktif</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-slate-400">Menunggu Pembayaran</span>
                <p className="text-3xl font-extrabold text-amber-600 tabular-nums">{waitingPaymentCount}</p>
                <span className="text-[11px] text-amber-700 font-medium">Perlu tindak lanjut simulasi</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-slate-400">Booking Dikonfirmasi</span>
                <p className="text-3xl font-extrabold text-emerald-600 tabular-nums">{confirmedCount}</p>
                <span className="text-[11px] text-emerald-600 font-medium">E-ticket terbit</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-slate-400">Total Nilai Transaksi</span>
                <p className="text-2xl font-extrabold text-[#1769D2] tabular-nums">
                  {formatIDR(totalTransactionValue)}
                </p>
                <span className="text-[11px] text-slate-400 font-medium">Berdasarkan data demo aktual</span>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#172B4D]">Pemesanan Terbaru Pelanggan</h3>
                  <p className="text-xs text-slate-500">Daftar transaksi masuk yang dapat dikelola secara instan.</p>
                </div>
                <button
                  onClick={refreshBookings}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Segarkan</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Kode Booking</th>
                      <th className="py-3 px-4 font-semibold">Produk</th>
                      <th className="py-3 px-4 font-semibold">Pemesan</th>
                      <th className="py-3 px-4 font-semibold">Tanggal Trip</th>
                      <th className="py-3 px-4 font-semibold">Total Nilai</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.slice(0, 5).map(b => (
                      <tr key={b.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-mono font-bold text-[#1769D2]">{b.bookingCode}</td>
                        <td className="py-3 px-4 font-medium text-slate-800 line-clamp-1 max-w-[200px]">
                          {b.productTitle}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{b.contactDetails.fullName}</td>
                        <td className="py-3 px-4 text-slate-500">{formatDateIndo(b.travelDate)}</td>
                        <td className="py-3 px-4 font-bold text-slate-800 tabular-nums">
                          {formatIDR(b.priceBreakdown.totalAmount)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              b.bookingStatus === 'Dikonfirmasi'
                                ? 'bg-emerald-50 text-emerald-700'
                                : b.bookingStatus === 'Menunggu Pembayaran'
                                ? 'bg-amber-50 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {b.bookingStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => navigate(`/booking/${b.id}`)}
                            className="text-[#1769D2] hover:underline font-semibold"
                          >
                            Buka Tiket
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS MANAGER (CRUD) */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Product Subtabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setProductCategory('hotels')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                    productCategory === 'hotels' ? 'bg-[#172B4D] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Hotel & Resort ({hotelsList.length})
                </button>
                <button
                  onClick={() => setProductCategory('packages')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                    productCategory === 'packages' ? 'bg-[#172B4D] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Paket Wisata ({packagesList.length})
                </button>
                <button
                  onClick={() => setProductCategory('flights')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                    productCategory === 'flights' ? 'bg-[#172B4D] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Penerbangan ({flightsList.length})
                </button>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-[#1769D2] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            {/* Hotels Table */}
            {productCategory === 'hotels' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Nama Hotel & Lokasi</th>
                      <th className="py-3 px-4">Tipe</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Harga Mulai</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {hotelsList.map(h => (
                      <tr key={h.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{h.name}</p>
                          <p className="text-[11px] text-slate-400">{h.address}</p>
                        </td>
                        <td className="py-3 px-4">{h.type}</td>
                        <td className="py-3 px-4">★ {h.rating} ({h.reviewCount})</td>
                        <td className="py-3 px-4 font-bold tabular-nums">
                          {formatIDR(h.rooms[0]?.pricePerNight || h.priceRange.min)}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => navigate(`/hotels/${h.id}`)}
                            className="text-[#1769D2] hover:underline"
                          >
                            Lihat
                          </button>
                          <button
                            onClick={() => setDeleteTarget({ type: 'hotel', id: h.id, name: h.name })}
                            className="text-rose-600 hover:underline"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Packages Table */}
            {productCategory === 'packages' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Nama Paket Tur</th>
                      <th className="py-3 px-4">Destinasi</th>
                      <th className="py-3 px-4">Durasi & Tipe</th>
                      <th className="py-3 px-4">Harga / Orang</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {packagesList.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                        <td className="py-3 px-4">{p.destination}</td>
                        <td className="py-3 px-4">{p.durationDays} Hari ({p.tripType})</td>
                        <td className="py-3 px-4 font-bold tabular-nums">{formatIDR(p.pricePerPerson)}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => navigate(`/packages/${p.id}`)}
                            className="text-[#1769D2] hover:underline"
                          >
                            Lihat
                          </button>
                          <button
                            onClick={() => setDeleteTarget({ type: 'package', id: p.id, name: p.name })}
                            className="text-rose-600 hover:underline"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Flights Table */}
            {productCategory === 'flights' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Maskapai & No</th>
                      <th className="py-3 px-4">Rute</th>
                      <th className="py-3 px-4">Jadwal & Durasi</th>
                      <th className="py-3 px-4">Harga Tiket</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {flightsList.map(f => (
                      <tr key={f.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {f.airline} ({f.airlineCode})
                        </td>
                        <td className="py-3 px-4 font-medium">{f.originCode} → {f.destinationCode}</td>
                        <td className="py-3 px-4">{f.departureTime} - {f.arrivalTime} ({f.duration})</td>
                        <td className="py-3 px-4 font-bold tabular-nums">{formatIDR(f.price)}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setDeleteTarget({ type: 'flight', id: f.id, name: f.airlineCode })}
                            className="text-rose-600 hover:underline"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 3. BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="font-bold text-base text-[#172B4D]">Manajemen Reservasi & Status Pembayaran</h3>
                <p className="text-xs text-slate-500">
                  Data pesanan membaca langsung dari penyimpanan lokal Jelajahin secara dinamis ({bookings.length} total pesanan).
                </p>
              </div>
              <button
                type="button"
                onClick={refreshBookings}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Segarkan Data</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={bookingSearchQuery}
                  onChange={e => setBookingSearchQuery(e.target.value)}
                  placeholder="Cari ID pesanan, kode booking, pemesan..."
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1769D2]"
                />
              </div>

              {/* Product Filter */}
              <div>
                <select
                  value={bookingProductFilter}
                  onChange={e => setBookingProductFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:bg-white focus:border-[#1769D2]"
                >
                  <option value="all">Semua Layanan / Produk</option>
                  <option value="flight">Pesawat</option>
                  <option value="hotel">Hotel & Resort</option>
                  <option value="train">Kereta Api</option>
                  <option value="bus">Bus & Shuttle</option>
                  <option value="package">Paket Wisata</option>
                  <option value="activity">Aktivitas</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={bookingStatusFilter}
                  onChange={e => setBookingStatusFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:bg-white focus:border-[#1769D2]"
                >
                  <option value="all">Semua Status Pesanan</option>
                  <option value="PENDING">Menunggu Pembayaran (PENDING)</option>
                  <option value="CONFIRMED">Dikonfirmasi / Lunas (PAID)</option>
                  <option value="CANCELLED">Dibatalkan (CANCELLED)</option>
                  <option value="REFUND">Refund / Pengembalian</option>
                </select>
              </div>
            </div>

            {/* Filtered Bookings Table */}
            {(() => {
              const filteredList = bookings.filter(b => {
                if (bookingSearchQuery.trim()) {
                  const q = bookingSearchQuery.toLowerCase().trim();
                  const matchOrder = (b.orderNumber || '').toLowerCase().includes(q);
                  const matchCode = (b.bookingCode || '').toLowerCase().includes(q);
                  const matchName = (b.contactDetails?.fullName || '').toLowerCase().includes(q);
                  const matchEmail = (b.contactDetails?.email || '').toLowerCase().includes(q);
                  const matchPhone = (b.contactDetails?.phone || '').toLowerCase().includes(q);
                  const matchProduct = (b.productTitle || '').toLowerCase().includes(q);
                  if (!matchOrder && !matchCode && !matchName && !matchEmail && !matchPhone && !matchProduct) {
                    return false;
                  }
                }

                if (bookingProductFilter !== 'all' && b.productType !== bookingProductFilter) {
                  return false;
                }

                if (bookingStatusFilter !== 'all') {
                  if (bookingStatusFilter === 'PENDING') {
                    if (b.bookingStatus !== 'PENDING_PAYMENT' && b.bookingStatus !== 'Menunggu Pembayaran') return false;
                  } else if (bookingStatusFilter === 'CONFIRMED') {
                    if (
                      b.bookingStatus !== 'CONFIRMED' &&
                      b.bookingStatus !== 'Dikonfirmasi' &&
                      b.bookingStatus !== 'Dibayar' &&
                      b.paymentStatus !== 'PAID' &&
                      b.paymentStatus !== 'berhasil'
                    )
                      return false;
                  } else if (bookingStatusFilter === 'CANCELLED') {
                    if (b.bookingStatus !== 'CANCELLED' && b.bookingStatus !== 'Dibatalkan') return false;
                  } else if (bookingStatusFilter === 'REFUND') {
                    if (!b.bookingStatus.includes('Refund') && b.paymentStatus !== 'REFUNDED') return false;
                  }
                }

                return true;
              });

              if (filteredList.length === 0) {
                return (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <CreditCard className="w-10 h-10 mx-auto text-slate-300" />
                    <p className="font-semibold text-slate-700">Tidak ada pesanan yang sesuai dengan filter.</p>
                    <p className="text-[11px]">Coba ubah kata kunci pencarian atau reset filter.</p>
                  </div>
                );
              }

              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                      <tr>
                        <th className="py-3 px-3 font-semibold">No. Pesanan & Kode</th>
                        <th className="py-3 px-3 font-semibold">Pemesan & Kontak</th>
                        <th className="py-3 px-3 font-semibold">Layanan & Produk</th>
                        <th className="py-3 px-3 font-semibold">Jadwal Trip</th>
                        <th className="py-3 px-3 font-semibold">Total Tagihan</th>
                        <th className="py-3 px-3 font-semibold">Metode Bayar</th>
                        <th className="py-3 px-3 font-semibold">Status</th>
                        <th className="py-3 px-3 font-semibold">Ubah Status</th>
                        <th className="py-3 px-3 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredList.map(b => {
                        const isPaid =
                          b.bookingStatus === 'Dikonfirmasi' ||
                          b.bookingStatus === 'CONFIRMED' ||
                          b.bookingStatus === 'Dibayar' ||
                          b.paymentStatus === 'PAID' ||
                          b.paymentStatus === 'berhasil';

                        const isPending =
                          b.bookingStatus === 'PENDING_PAYMENT' ||
                          b.bookingStatus === 'Menunggu Pembayaran';

                        return (
                          <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                            {/* Order & Booking code */}
                            <td className="py-3 px-3">
                              <p className="font-bold text-slate-900 font-mono text-[11px]">
                                {b.orderNumber || b.id}
                              </p>
                              <span className="font-mono font-bold text-[10px] text-[#1769D2] bg-blue-50 px-1.5 py-0.5 rounded">
                                {b.bookingCode}
                              </span>
                            </td>

                            {/* Customer info */}
                            <td className="py-3 px-3">
                              <p className="font-semibold text-slate-800">{b.contactDetails.fullName}</p>
                              <p className="text-[10px] text-slate-400">{b.contactDetails.email}</p>
                              <p className="text-[10px] text-slate-400">{b.contactDetails.phone}</p>
                            </td>

                            {/* Product */}
                            <td className="py-3 px-3 max-w-[200px]">
                              <span className="text-[9px] font-bold uppercase text-[#1769D2] block">
                                {b.productType} ({b.quantity} {b.unitName})
                              </span>
                              <p className="font-medium text-slate-800 truncate" title={b.productTitle}>
                                {b.productTitle}
                              </p>
                            </td>

                            {/* Dates */}
                            <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                              <p className="font-medium">{formatDateIndo(b.travelDate)}</p>
                              <p className="text-[10px] text-slate-400">
                                Pesan: {formatDateIndo(b.bookingDate || b.createdAt)}
                              </p>
                            </td>

                            {/* Total amount */}
                            <td className="py-3 px-3 font-bold text-slate-900 tabular-nums">
                              {formatIDR(b.priceBreakdown.totalAmount)}
                            </td>

                            {/* Payment method */}
                            <td className="py-3 px-3 text-slate-600 text-[11px]">
                              {b.paymentMethod || 'Simulasi Transfer'}
                            </td>

                            {/* Status badge */}
                            <td className="py-3 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-block ${
                                  isPaid
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : isPending
                                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                    : b.bookingStatus === 'Dibatalkan' || b.bookingStatus === 'CANCELLED'
                                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                    : 'bg-purple-50 text-purple-700 border border-purple-200'
                                }`}
                              >
                                {isPaid
                                  ? 'CONFIRMED'
                                  : isPending
                                  ? 'PENDING'
                                  : b.bookingStatus}
                              </span>
                            </td>

                            {/* Status updater */}
                            <td className="py-3 px-3">
                              <select
                                value={
                                  b.bookingStatus === 'Dikonfirmasi' || b.bookingStatus === 'Dibayar'
                                    ? 'CONFIRMED'
                                    : b.bookingStatus === 'Menunggu Pembayaran'
                                    ? 'PENDING_PAYMENT'
                                    : b.bookingStatus === 'Dibatalkan'
                                    ? 'CANCELLED'
                                    : b.bookingStatus
                                }
                                onChange={e => handleUpdateBookingStatus(b.id, e.target.value as BookingStatus)}
                                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 text-[11px] font-medium focus:bg-white focus:border-[#1769D2]"
                              >
                                <option value="PENDING_PAYMENT">PENDING_PAYMENT (Menunggu)</option>
                                <option value="CONFIRMED">CONFIRMED (Lunas)</option>
                                <option value="CANCELLED">CANCELLED (Batal)</option>
                                <option value="Refund Diproses">Refund Diproses</option>
                                <option value="Refund Selesai">Refund Selesai</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-3 text-right whitespace-nowrap space-x-2">
                              <button
                                type="button"
                                onClick={() => setSelectedDetailBooking(b)}
                                className="text-[#1769D2] hover:underline font-semibold"
                              >
                                Detail
                              </button>
                              <button
                                type="button"
                                onClick={() => navigate(`/booking/${b.id}`)}
                                className="text-slate-600 hover:text-slate-900 font-semibold underline"
                              >
                                E-Ticket
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        )}

        {/* 4. VOUCHERS MANAGER */}
        {activeTab === 'vouchers' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#172B4D]">Daftar Voucher Diskon Promo</h3>
              <span className="text-xs text-slate-500">Klik toggle untuk mengaktifkan atau menonaktifkan kode</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vouchersList.map(v => (
                <div
                  key={v.code}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    v.active ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm text-[#1769D2] bg-blue-50 px-2 py-0.5 rounded">
                        {v.code}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {v.applicableCategory}
                      </span>
                    </div>
                    <p className="font-bold text-xs text-slate-800">{v.title}</p>
                    <p className="text-[11px] text-slate-500">
                      Diskon: {v.discountType === 'percentage' ? `${v.discountValue}%` : formatIDR(v.discountValue)} · Min Trx: {formatIDR(v.minTransaction)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleVoucher(v.code)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                        v.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {v.active ? 'Aktif' : 'Nonaktif'}
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: 'voucher', id: v.code, name: v.code })}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. USERS DIRECTORY */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-base text-[#172B4D]">Data Pelanggan & Tamu Terdaftar</h3>
            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>{user.name} ({user.email})</span>
                <span className="text-[#1769D2] font-semibold">{user.phone}</span>
              </div>
              <p className="text-slate-500">Jumlah Penumpang Tersimpan: {user.savedTravelers?.length || 0}</p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-[#172B4D]">Konfirmasi Penghapusan Data</h3>
              <p className="text-xs text-slate-500">
                Apakah Anda yakin ingin menghapus data <strong>{deleteTarget.name}</strong>? Tindakan ini dapat dibatalkan melalui reset data demo.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#172B4D]">Tambah Produk Baru ({productCategory})</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nama Produk / Hotel / Tur *</label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  placeholder="Contoh: The Seminyak Beachfront Villa"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Kota / Destinasi *</label>
                <input
                  type="text"
                  value={newItemCity}
                  onChange={e => setNewItemCity(e.target.value)}
                  placeholder="Contoh: Bali"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Harga Dasar (IDR) *</label>
                <input
                  type="number"
                  value={newItemPrice}
                  onChange={e => setNewItemPrice(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl tabular-nums"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1769D2] hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Modal for Admin */}
      {selectedDetailBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-[#172B4D]">
                    Detail Pesanan #{selectedDetailBooking.orderNumber || selectedDetailBooking.id}
                  </h3>
                  <span className="font-mono text-xs font-bold text-[#1769D2] bg-blue-50 px-2 py-0.5 rounded">
                    {selectedDetailBooking.bookingCode}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Dibuat pada: {formatDateIndo(selectedDetailBooking.bookingDate || selectedDetailBooking.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetailBooking(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Changer Banner inside Modal */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Status Saat Ini:</span>
                <span className="font-bold text-sm text-[#172B4D]">
                  {selectedDetailBooking.bookingStatus} ({selectedDetailBooking.paymentStatus})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold text-xs">Ubah Status:</span>
                <select
                  value={
                    selectedDetailBooking.bookingStatus === 'Dikonfirmasi' || selectedDetailBooking.bookingStatus === 'Dibayar'
                      ? 'CONFIRMED'
                      : selectedDetailBooking.bookingStatus === 'Menunggu Pembayaran'
                      ? 'PENDING_PAYMENT'
                      : selectedDetailBooking.bookingStatus === 'Dibatalkan'
                      ? 'CANCELLED'
                      : selectedDetailBooking.bookingStatus
                  }
                  onChange={e => handleUpdateBookingStatus(selectedDetailBooking.id, e.target.value as BookingStatus)}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-slate-800 font-semibold focus:border-[#1769D2]"
                >
                  <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                  <option value="CONFIRMED">CONFIRMED (Lunas)</option>
                  <option value="CANCELLED">CANCELLED (Batal)</option>
                  <option value="Refund Diproses">Refund Diproses</option>
                  <option value="Refund Selesai">Refund Selesai</option>
                </select>
              </div>
            </div>

            {/* Grid Details: Customer & Product */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-xs border-b border-slate-100 pb-1.5">
                  Data Kontak Pemesan
                </span>
                <p className="font-semibold text-slate-800">{selectedDetailBooking.contactDetails.fullName}</p>
                <p className="text-slate-500">{selectedDetailBooking.contactDetails.email}</p>
                <p className="text-slate-500">{selectedDetailBooking.contactDetails.phone}</p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-xs border-b border-slate-100 pb-1.5">
                  Informasi Layanan & Jadwal
                </span>
                <span className="text-[10px] font-bold uppercase text-[#1769D2] bg-blue-50 px-2 py-0.5 rounded">
                  {selectedDetailBooking.productType}
                </span>
                <p className="font-semibold text-slate-800">{selectedDetailBooking.productTitle}</p>
                <p className="text-slate-500">Jadwal: {formatDateIndo(selectedDetailBooking.travelDate)}</p>
                <p className="text-slate-500">
                  Kuantitas: {selectedDetailBooking.quantity} {selectedDetailBooking.unitName}
                </p>
              </div>
            </div>

            {/* Travelers List */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-slate-800 block">
                Daftar Penumpang / Tamu ({selectedDetailBooking.travelers?.length || 0})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedDetailBooking.travelers?.map((t, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
                    <p className="font-bold text-slate-800">
                      {i + 1}. {t.title} {t.fullName}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {t.idType}: {t.idNumber} · {t.nationality || 'Indonesia'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-800 block border-b border-slate-100 pb-1.5">
                Rincian Biaya Transaksi
              </span>
              <div className="flex justify-between text-slate-600">
                <span>Harga Dasar ({selectedDetailBooking.quantity} {selectedDetailBooking.unitName})</span>
                <span className="font-semibold tabular-nums">{formatIDR(selectedDetailBooking.priceBreakdown.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pajak PPN (11%)</span>
                <span className="font-semibold tabular-nums">{formatIDR(selectedDetailBooking.priceBreakdown.tax)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Biaya Layanan</span>
                <span className="font-semibold tabular-nums">{formatIDR(selectedDetailBooking.priceBreakdown.serviceFee)}</span>
              </div>
              {selectedDetailBooking.priceBreakdown.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Diskon Promo ({selectedDetailBooking.priceBreakdown.appliedVoucherCode})</span>
                  <span className="tabular-nums">- {formatIDR(selectedDetailBooking.priceBreakdown.discount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-[#172B4D]">
                <span>Total Pembayaran</span>
                <span className="text-[#1769D2] tabular-nums">
                  {formatIDR(selectedDetailBooking.priceBreakdown.totalAmount)}
                </span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 flex justify-between">
                <span>Metode Pembayaran:</span>
                <span className="font-semibold text-slate-700">{selectedDetailBooking.paymentMethod || 'Simulasi Transfer'}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedDetailBooking(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  handleUpdateBookingStatus(selectedDetailBooking.id, 'CONFIRMED');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Tandai Lunas (CONFIRMED)
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = selectedDetailBooking.id;
                  setSelectedDetailBooking(null);
                  navigate(`/booking/${id}`);
                }}
                className="px-4 py-2 bg-[#1769D2] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Buka E-Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

