import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Compass, ShieldCheck, HelpCircle, PhoneCall, Mail, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#172B4D] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-[#1769D2] flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Jelajahin<span className="text-[#FFB547]">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Platform pemesanan perjalanan terintegrasi untuk mengeksplorasi keindahan Nusantara. Temukan penerbangan, tiket kereta, bus shuttle, hotel, resort, dan paket tur impianmu dengan harga transparan.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFB547]" />
                <span>Menara Jelajahin Lt. 18, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#FFB547]" />
                <span>Customer Care: +62 21 5088 7700 (24 Jam)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFB547]" />
                <span>bantuan@jelajahin.id</span>
              </div>
            </div>
          </div>

          {/* Produk & Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Layanan Travel</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/flights')} className="hover:text-white transition-colors">
                  Tiket Pesawat Domestik
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/trains')} className="hover:text-white transition-colors">
                  Tiket Kereta Api KAI
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/buses')} className="hover:text-white transition-colors">
                  Bus Antarkota & Shuttle
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/hotels')} className="hover:text-white transition-colors">
                  Hotel, Villa & Resort
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/packages')} className="hover:text-white transition-colors">
                  Paket Wisata & Open Trip
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/activities')} className="hover:text-white transition-colors">
                  Tiket Atraksi & Tur Lokal
                </button>
              </li>
            </ul>
          </div>

          {/* Destinasi Populer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Destinasi Populer</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/hotels?city=Bali')} className="hover:text-white transition-colors">
                  Liburan ke Bali
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/packages?city=Labuan+Bajo')} className="hover:text-white transition-colors">
                  Sailing Labuan Bajo & Komodo
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/packages?city=Bromo')} className="hover:text-white transition-colors">
                  Sunrise Jeep Bromo & Ijen
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/packages?city=Raja+Ampat')} className="hover:text-white transition-colors">
                  Eksplorasi Karst Raja Ampat
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/trains?destination=Yogyakarta')} className="hover:text-white transition-colors">
                  Wisata Budaya Yogyakarta
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/buses?destination=Bandung')} className="hover:text-white transition-colors">
                  Wisata Sejuk Bandung
                </button>
              </li>
            </ul>
          </div>

          {/* Bantuan & Ketentuan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bantuan & Legal</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/help')} className="hover:text-white transition-colors">
                  Pusat Bantuan & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/help')} className="hover:text-white transition-colors">
                  Kebijakan Refund & Reschedule
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/help')} className="hover:text-white transition-colors">
                  Syarat & Ketentuan Pemesanan
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/help')} className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Portal Administrator</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Notice Banner & Partners */}
        <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Metode Pembayaran Demo:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">QRIS</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">BCA Virtual Account</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Mandiri VA</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">BNI VA</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">GoPay / OVO</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Indomaret</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Simulasi Pembayaran — Data Demo, Bukan Transaksi Nyata</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 Jelajahin Platform Perjalanan Indonesia. Hak Cipta Dilindungi.</p>
          <p>Dirancang untuk wisatawan Indonesia dan pelancong global.</p>
        </div>
      </div>
    </footer>
  );
};
