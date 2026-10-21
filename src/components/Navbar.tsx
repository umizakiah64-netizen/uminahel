import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import {
  Compass,
  Plane,
  Train,
  Bus,
  Building2,
  MapPin,
  Ticket,
  Percent,
  HelpCircle,
  Bookmark,
  User,
  ShieldCheck,
  Menu,
  X,
  CreditCard,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { path, navigate } = useRouter();
  const { user, role, switchRole, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Pesawat', href: '/flights' },
    { label: 'Kereta', href: '/trains' },
    { label: 'Bus & Shuttle', href: '/buses' },
    { label: 'Hotel & Resort', href: '/hotels' },
    { label: 'Paket Wisata', href: '/packages' },
    { label: 'Aktivitas', href: '/activities' },
    { label: 'Promo', href: '/#promo' },
    { label: 'Bantuan', href: '/help' }
  ];

  const handleNavClick = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-[#172B4D] text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <p className="text-[11px] md:text-xs font-normal text-slate-200 truncate">
            ✨ Promo Spesial Liburan Indonesia: Diskon hingga 20% dengan kode <span className="font-semibold text-[#FFB547]">JELAJAHINDONESIA</span>
          </p>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-300">
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/help')}>
              Bantuan Pelanggan 24/7
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-[#FFB547] font-medium">Demo Mode Aktif</span>
          </div>
        </div>
      </div>

      {/* Main 1-row Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 cursor-pointer select-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1769D2] flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#172B4D]">
                Jelajahin<span className="text-[#1769D2]">.</span>
              </span>
            </div>
          </div>

          {/* Zone 2: Clean single-line desktop navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
            {navLinks.map(link => {
              const isActive = path === link.href;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`cursor-pointer whitespace-nowrap transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#1769D2] font-semibold'
                      : 'hover:text-[#172B4D]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1769D2] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions, Wishlist & User Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Wishlist Icon */}
            <button
              onClick={() => handleNavClick('/wishlist')}
              className="relative p-2 text-slate-600 hover:text-[#1769D2] rounded-lg hover:bg-slate-50 transition-colors"
              title="Daftar Keinginan (Wishlist)"
            >
              <Bookmark className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1769D2] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* My Bookings Quick Link */}
            <button
              onClick={() => handleNavClick('/my-bookings')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#1769D2]" />
              <span>Pesanan Saya</span>
            </button>

            {/* Role Switcher Pill for Demo ease */}
            <button
              onClick={() => switchRole(role === 'admin' ? 'user' : 'admin')}
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                role === 'admin'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                  : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
              }`}
              title="Klik untuk beralih mode pengujian Admin atau Wisatawan"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{role === 'admin' ? 'Mode: Admin' : 'Mode: Wisatawan'}</span>
            </button>

            {/* User Dropdown / Login button */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 pr-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#1769D2]/10 text-[#1769D2] font-semibold text-xs flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline text-xs font-medium text-slate-800 max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>

              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs text-slate-700 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/50">
                    <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                        {role === 'admin' ? 'Administrator' : 'Wisatawan Terverifikasi'}
                      </span>
                    </div>
                  </div>

                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigate('/admin');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 text-[#1769D2] font-medium flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Dashboard Admin</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/my-bookings');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4 text-slate-500" />
                    <span>Riwayat Pemesanan</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/wishlist');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Bookmark className="w-4 h-4 text-slate-500" />
                    <span>Daftar Keinginan ({wishlistItems.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Profil Pengguna & Penumpang</span>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => {
                      switchRole(role === 'admin' ? 'user' : 'admin');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-600 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Ganti ke {role === 'admin' ? 'Mode Wisatawan' : 'Mode Admin'}</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => handleNavClick('/flights')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50/60 text-[#1769D2] text-xs font-medium"
            >
              <Plane className="w-4 h-4" /> Pesawat
            </button>
            <button
              onClick={() => handleNavClick('/hotels')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50/60 text-[#1769D2] text-xs font-medium"
            >
              <Building2 className="w-4 h-4" /> Hotel & Resort
            </button>
            <button
              onClick={() => handleNavClick('/trains')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium"
            >
              <Train className="w-4 h-4" /> Kereta Api
            </button>
            <button
              onClick={() => handleNavClick('/buses')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium"
            >
              <Bus className="w-4 h-4" /> Bus & Shuttle
            </button>
            <button
              onClick={() => handleNavClick('/packages')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium"
            >
              <MapPin className="w-4 h-4" /> Paket Wisata
            </button>
            <button
              onClick={() => handleNavClick('/activities')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium"
            >
              <Ticket className="w-4 h-4" /> Aktivitas
            </button>
          </div>

          <div className="space-y-1 pt-1">
            <button
              onClick={() => handleNavClick('/my-bookings')}
              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Pesanan Saya</span>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleNavClick('/wishlist')}
              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Daftar Keinginan</span>
              <span className="text-[10px] bg-blue-100 text-[#1769D2] px-2 py-0.5 rounded-full font-bold">
                {wishlistItems.length}
              </span>
            </button>
            {role === 'admin' && (
              <button
                onClick={() => handleNavClick('/admin')}
                className="w-full text-left px-3 py-2 text-xs font-medium text-[#1769D2] rounded-lg bg-blue-50 flex items-center justify-between"
              >
                <span>Dashboard Administrator</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                switchRole(role === 'admin' ? 'user' : 'admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-amber-800 rounded-lg bg-amber-50 flex items-center justify-between"
            >
              <span>Beralih ke {role === 'admin' ? 'Mode Wisatawan' : 'Mode Admin'}</span>
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            </button>
            <button
              onClick={() => handleNavClick('/help')}
              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Pusat Bantuan & Refund</span>
              <HelpCircle className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
