import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-[70vh] bg-[#F5F8FC] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1769D2] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <h1 className="text-3xl font-extrabold text-[#172B4D]">404</h1>
        <h2 className="text-base font-bold text-slate-800">Halaman Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Tampaknya rute perjalanan yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-[#1769D2] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Kembali ke Beranda Jelajahin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
