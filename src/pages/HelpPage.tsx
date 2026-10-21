import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import {
  HelpCircle,
  PhoneCall,
  Mail,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara mengajukan pembatalan dan refund tiket atau hotel?',
      a: 'Anda dapat mengajukan pembatalan secara langsung melalui menu Pesanan Saya (My Bookings). Pilih pesanan yang ingin dibatalkan, kemudian klik "Ajukan Refund / Batal". Status refund Anda dapat dipantau langsung secara real-time.'
    },
    {
      q: 'Apakah harga yang ditampilkan sudah termasuk pajak dan biaya layanan?',
      a: 'Ya, seluruh harga yang tertera di Jelajahin telah mencakup rincian lengkap harga dasar, PPN 11%, dan biaya layanan. Tidak ada biaya tersembunyi (hidden fees) saat konfirmasi pembayaran.'
    },
    {
      q: 'Bagaimana cara menggunakan kode voucher promo?',
      a: 'Pada halaman ringkasan checkout (Langkah 1), terdapat kolom "Gunakan Voucher Diskon". Masukkan kode voucher seperti JELAJAHINDONESIA atau LIBURANSERU dan klik tombol Pasang. Potongan harga akan langsung terhitung pada total pembayaran.'
    },
    {
      q: 'Kapan saya menerima bukti e-ticket atau voucher hotel?',
      a: 'Setelah pembayaran terverifikasi, e-ticket digital beserta QR code dan kode booking resmi akan langsung diterbitkan secara instan dan dapat diunduh atau dicetak kapan saja.'
    },
    {
      q: 'Apakah bisa melakukan perubahan jadwal (reschedule)?',
      a: 'Perubahan jadwal dapat dilakukan dengan menghubungi layanan pelanggan resmi Jelajahin maksimal 24 jam sebelum waktu keberangkatan dengan penyesuaian ketersediaan dan ketentuan operator.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 py-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2]">Pusat Bantuan Jelajahin</span>
          <h1 className="text-3xl font-extrabold text-[#172B4D]">Ada yang Bisa Kami Bantu?</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Temukan jawaban seputar pemesanan tiket, kebijakan refund, voucher promo, dan bantuan darurat perjalanan.
          </p>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1769D2] flex items-center justify-center mx-auto">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#172B4D]">Call Center 24 Jam</h3>
            <p className="text-xs text-slate-500">+62 21 5088 7700</p>
            <span className="text-[10px] text-emerald-600 font-semibold block">Bebas Pulsa · Selalu Siap</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#172B4D]">Email Support</h3>
            <p className="text-xs text-slate-500">bantuan@jelajahin.id</p>
            <span className="text-[10px] text-slate-400 block">Respon dalam 15 menit</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#172B4D]">Pengajuan Refund</h3>
            <p className="text-xs text-slate-500">Proses 1x24 Jam Kerja</p>
            <span className="text-[10px] text-[#1769D2] font-semibold block">Otomatis & Transparan</span>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#172B4D]">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal Policies Brief */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs text-slate-600 leading-relaxed">
          <h2 className="text-lg font-bold text-[#172B4D]">Kebijakan Refund & Pembatalan Transparan</h2>
          <p>
            Jelajahin berkomitmen menjaga hak konsumen dengan transparansi penuh. Pembatalan penerbangan, kereta api, hotel, dan paket wisata mengikuti ketentuan tarif maskapai dan akomodasi masing-masing, dengan biaya pembatalan yang diinformasikan secara jelas sebelum transaksi dikonfirmasi.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => navigate('/my-bookings')}
              className="px-4 py-2 bg-[#1769D2] text-white rounded-xl font-semibold cursor-pointer"
            >
              Cek Status Booking Anda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
