import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useWishlist } from '../context/WishlistContext';
import { formatIDR } from '../utils/format';
import { Bookmark, Star, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { navigate } = useRouter();
  const { items, toggleWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#172B4D]">Daftar Keinginan (Wishlist)</h1>
            <p className="text-xs text-slate-500 mt-1">
              Simpan hotel dan paket wisata favorit Anda untuk dipesan saat waktu liburan tiba.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-[#1769D2]">
            {items.length} Item Tersimpan
          </span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Belum ada destinasi impian di wishlist Anda</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Jelajahi hotel atau paket wisata dan klik ikon simpan untuk menyimpannya di sini.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('/hotels')}
                className="px-4 py-2 bg-[#1769D2] text-white rounded-xl text-xs font-semibold"
              >
                Cari Hotel
              </button>
              <button
                onClick={() => navigate('/packages')}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold"
              >
                Cari Paket Wisata
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() =>
                        toggleWishlist({
                          id: item.id,
                          itemType: item.itemType,
                          itemId: item.itemId,
                          title: item.title,
                          subtitle: item.subtitle,
                          image: item.image,
                          price: item.price,
                          rating: item.rating
                        })
                      }
                      className="absolute top-3 right-3 p-2 bg-rose-500 text-white rounded-full shadow-xs cursor-pointer hover:bg-rose-600 transition-colors"
                      title="Hapus dari Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#1769D2]">{item.itemType}</span>
                    <h3 className="font-bold text-sm text-[#172B4D] line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.subtitle}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.rating} / 5.0</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Harga</span>
                      <span className="text-base font-extrabold text-[#172B4D] tabular-nums">
                        {formatIDR(item.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (item.itemType === 'hotel') navigate(`/hotels/${item.itemId}`);
                        else if (item.itemType === 'package') navigate(`/packages/${item.itemId}`);
                        else navigate(`/activities/${item.itemId}`);
                      }}
                      className="px-3 py-1.5 bg-[#1769D2] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
