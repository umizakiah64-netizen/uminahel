import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, Voucher, ContactDetail, TravelerDetail, BookingStatus, PaymentStatus, StatusHistoryItem } from '../types';
import { StorageService } from '../services/storage';
import { generateBookingCode, generateOrderNumber } from '../utils/format';

export interface BookingDraft {
  productType: 'flight' | 'hotel' | 'train' | 'bus' | 'package' | 'activity';
  productId: string;
  productTitle: string;
  productSubtitle: string;
  productImage: string;
  travelDate: string;
  travelEndDate?: string;
  quantity: number;
  unitName: string;
  basePrice: number;
  contactDetails: ContactDetail;
  travelers: TravelerDetail[];
  additionalNotes?: string;
  appliedVoucher?: Voucher | null;
}

interface BookingContextType {
  draft: BookingDraft | null;
  bookings: Booking[];
  startBooking: (draftInit: Partial<BookingDraft> & {
    productType: 'flight' | 'hotel' | 'train' | 'bus' | 'package' | 'activity';
    productId: string;
    productTitle: string;
    productSubtitle: string;
    productImage: string;
    basePrice: number;
    travelDate: string;
    quantity: number;
    unitName: string;
  }) => void;
  updateDraft: (updated: Partial<BookingDraft>) => void;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;
  confirmBooking: (paymentMethod?: string) => Booking | null;
  processPaymentSimulation: (
    bookingId: string,
    result: 'berhasil' | 'gagal' | 'kedaluwarsa',
    selectedMethodName?: string
  ) => Booking | null;
  updateBookingStatus: (
    bookingId: string,
    newStatus: BookingStatus,
    newPaymentStatus?: PaymentStatus,
    note?: string
  ) => void;
  requestCancellation: (bookingId: string) => void;
  getBookingById: (id: string) => Booking | undefined;
  refreshBookings: () => void;
  calculatePricing: () => {
    subtotal: number;
    tax: number;
    serviceFee: number;
    discount: number;
    totalAmount: number;
  };
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draft, setDraft] = useState<BookingDraft | null>(() => {
    try {
      const saved = sessionStorage.getItem('jelajahin_booking_draft');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>([]);

  const refreshBookings = () => {
    setBookings(StorageService.getBookings());
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  useEffect(() => {
    if (draft) {
      sessionStorage.setItem('jelajahin_booking_draft', JSON.stringify(draft));
    } else {
      sessionStorage.removeItem('jelajahin_booking_draft');
    }
  }, [draft]);

  const startBooking = (draftInit: any) => {
    const user = StorageService.getUser();
    const quantity = Math.max(1, draftInit.quantity || 1);

    const initialTravelers: TravelerDetail[] = [];
    for (let i = 0; i < quantity; i++) {
      if (i === 0 && user.savedTravelers?.[0]) {
        initialTravelers.push({ ...user.savedTravelers[0] });
      } else if (user.savedTravelers?.[i]) {
        initialTravelers.push({ ...user.savedTravelers[i] });
      } else if (i === 0) {
        initialTravelers.push({
          title: 'Tuan',
          fullName: user.name || 'Pelanggan Jelajahin',
          idType: 'KTP',
          idNumber: '3171012304900001',
          type: 'Dewasa',
          nationality: 'Indonesia'
        });
      } else {
        initialTravelers.push({
          title: i % 2 === 1 ? 'Nyonya' : 'Tuan',
          fullName: '',
          idType: 'KTP',
          idNumber: '',
          type: 'Dewasa',
          nationality: 'Indonesia'
        });
      }
    }

    const newDraft: BookingDraft = {
      productType: draftInit.productType,
      productId: draftInit.productId,
      productTitle: draftInit.productTitle,
      productSubtitle: draftInit.productSubtitle,
      productImage: draftInit.productImage,
      travelDate: draftInit.travelDate,
      travelEndDate: draftInit.travelEndDate,
      quantity,
      unitName: draftInit.unitName || 'Orang',
      basePrice: draftInit.basePrice,
      contactDetails: {
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '081234567890'
      },
      travelers: initialTravelers,
      additionalNotes: '',
      appliedVoucher: null,
      ...draftInit
    };

    setDraft(newDraft);
  };

  const updateDraft = (updated: Partial<BookingDraft>) => {
    setDraft(prev => (prev ? { ...prev, ...updated } : null));
  };

  const calculatePricing = () => {
    if (!draft) {
      return { subtotal: 0, tax: 0, serviceFee: 0, discount: 0, totalAmount: 0 };
    }

    const subtotal = draft.basePrice * draft.quantity;
    const tax = Math.round(subtotal * 0.11); // PPN 11%
    const serviceFee = 15000; // Biaya layanan standar
    let discount = 0;

    if (draft.appliedVoucher && draft.appliedVoucher.active) {
      const v = draft.appliedVoucher;
      if (v.discountType === 'percentage') {
        let disc = Math.round((subtotal * v.discountValue) / 100);
        if (v.maxDiscount && disc > v.maxDiscount) {
          disc = v.maxDiscount;
        }
        discount = disc;
      } else {
        discount = v.discountValue;
      }
    }

    const totalAmount = Math.max(0, subtotal + tax + serviceFee - discount);
    return { subtotal, tax, serviceFee, discount, totalAmount };
  };

  const applyVoucher = (code: string): { success: boolean; message: string } => {
    if (!draft) return { success: false, message: 'Tidak ada pemesanan aktif' };

    const vouchers = StorageService.getVouchers();
    const found = vouchers.find(v => v.code.toUpperCase() === code.trim().toUpperCase());

    if (!found) {
      return { success: false, message: 'Kode voucher tidak ditemukan atau telah kedaluwarsa' };
    }

    if (!found.active) {
      return { success: false, message: 'Voucher ini sedang dinonaktifkan' };
    }

    // Check category match
    if (found.applicableCategory !== 'all') {
      const catMap: Record<string, string> = {
        flights: 'flight',
        hotels: 'hotel',
        trains: 'train',
        buses: 'bus',
        packages: 'package',
        activities: 'activity'
      };
      if (catMap[found.applicableCategory] !== draft.productType) {
        return {
          success: false,
          message: `Voucher ini khusus untuk kategori ${found.applicableCategory}, tidak berlaku untuk ${draft.productType}`
        };
      }
    }

    const subtotal = draft.basePrice * draft.quantity;
    if (subtotal < found.minTransaction) {
      return {
        success: false,
        message: `Minimal transaksi untuk voucher ini adalah Rp ${found.minTransaction.toLocaleString('id-ID')}`
      };
    }

    setDraft(prev => (prev ? { ...prev, appliedVoucher: found } : null));
    return { success: true, message: `Voucher ${found.code} berhasil dipasang!` };
  };

  const removeVoucher = () => {
    setDraft(prev => (prev ? { ...prev, appliedVoucher: null } : null));
  };

  const confirmBooking = (paymentMethod: string = 'Menunggu Pembayaran'): Booking | null => {
    if (!draft) return null;

    const user = StorageService.getUser();
    const pricing = calculatePricing();
    const code = generateBookingCode();
    const orderNum = generateOrderNumber();
    const bookingId = `bkg-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const newBooking: Booking = {
      id: bookingId,
      orderNumber: orderNum,
      bookingCode: code,
      userId: user.id || 'usr-demo',
      productType: draft.productType,
      productId: draft.productId,
      productTitle: draft.productTitle,
      productSubtitle: draft.productSubtitle,
      productImage: draft.productImage,
      bookingDate: nowIso.split('T')[0],
      travelDate: draft.travelDate,
      travelEndDate: draft.travelEndDate,
      quantity: draft.quantity,
      unitName: draft.unitName,
      contactDetails: { ...draft.contactDetails },
      travelers: [...draft.travelers],
      additionalNotes: draft.additionalNotes,
      priceBreakdown: {
        basePrice: draft.basePrice,
        units: draft.quantity,
        subtotal: pricing.subtotal,
        tax: pricing.tax,
        serviceFee: pricing.serviceFee,
        discount: pricing.discount,
        appliedVoucherCode: draft.appliedVoucher?.code,
        totalAmount: pricing.totalAmount
      },
      paymentMethod,
      paymentStatus: 'PENDING_PAYMENT',
      bookingStatus: 'PENDING_PAYMENT',
      createdAt: nowIso,
      statusHistory: [
        {
          status: 'PENDING_PAYMENT',
          timestamp: nowIso,
          note: 'Pesanan berhasil dibuat, menunggu proses simulasi pembayaran.'
        }
      ]
    };

    StorageService.addBooking(newBooking);
    refreshBookings();
    return newBooking;
  };

  const processPaymentSimulation = (
    bookingId: string,
    result: 'berhasil' | 'gagal' | 'kedaluwarsa',
    selectedMethodName?: string
  ): Booking | null => {
    const list = StorageService.getBookings();
    const b = list.find(item => item.id === bookingId || item.bookingCode === bookingId || item.orderNumber === bookingId);
    if (!b) return null;

    const nowIso = new Date().toISOString();
    if (selectedMethodName) {
      b.paymentMethod = selectedMethodName;
    }
    if (!b.statusHistory) {
      b.statusHistory = [];
    }

    if (result === 'berhasil') {
      b.paymentStatus = 'PAID';
      b.bookingStatus = 'CONFIRMED';
      b.paidAt = nowIso;
      b.statusHistory.push({
        status: 'CONFIRMED',
        timestamp: nowIso,
        note: `Simulasi pembayaran berhasil lunas via ${b.paymentMethod || 'Metode Terpilih'}. E-ticket terbit.`
      });
    } else if (result === 'gagal') {
      b.paymentStatus = 'FAILED';
      b.bookingStatus = 'CANCELLED';
      b.statusHistory.push({
        status: 'CANCELLED',
        timestamp: nowIso,
        note: 'Simulasi pembayaran gagal atau ditolak oleh sistem pembayaran demo.'
      });
    } else if (result === 'kedaluwarsa') {
      b.paymentStatus = 'EXPIRED';
      b.bookingStatus = 'CANCELLED';
      b.statusHistory.push({
        status: 'EXPIRED',
        timestamp: nowIso,
        note: 'Batas waktu pembayaran simulasi telah habis. Pesanan dibatalkan otomatis.'
      });
    }

    StorageService.updateBooking(b);
    refreshBookings();
    return b;
  };

  const updateBookingStatus = (
    bookingId: string,
    newStatus: BookingStatus,
    newPaymentStatus?: PaymentStatus,
    note?: string
  ) => {
    const list = StorageService.getBookings();
    const b = list.find(item => item.id === bookingId || item.bookingCode === bookingId || item.orderNumber === bookingId);
    if (!b) return;

    const nowIso = new Date().toISOString();
    b.bookingStatus = newStatus;
    if (newPaymentStatus) {
      b.paymentStatus = newPaymentStatus;
    } else if (newStatus === 'CONFIRMED' || newStatus === 'Dikonfirmasi' || newStatus === 'Dibayar') {
      b.paymentStatus = 'PAID';
      if (!b.paidAt) b.paidAt = nowIso;
    } else if (newStatus === 'CANCELLED' || newStatus === 'Dibatalkan') {
      b.paymentStatus = 'FAILED';
    } else if (newStatus === 'REFUNDED' || newStatus === 'Refund Selesai') {
      b.paymentStatus = 'REFUNDED';
    }

    if (!b.statusHistory) {
      b.statusHistory = [];
    }
    b.statusHistory.push({
      status: newStatus,
      timestamp: nowIso,
      note: note || `Status pesanan diperbarui oleh Admin menjadi ${newStatus}.`
    });

    StorageService.updateBooking(b);
    refreshBookings();
  };

  const requestCancellation = (bookingId: string) => {
    const list = StorageService.getBookings();
    const b = list.find(item => item.id === bookingId || item.bookingCode === bookingId || item.orderNumber === bookingId);
    if (!b) return;

    const nowIso = new Date().toISOString();
    b.bookingStatus = 'Refund Diproses';
    b.paymentStatus = 'REFUND_PENDING' as any;
    if (!b.statusHistory) {
      b.statusHistory = [];
    }
    b.statusHistory.push({
      status: 'Refund Diproses',
      timestamp: nowIso,
      note: 'Pengajuan pembatalan & pengembalian dana diterima, menunggu verifikasi admin.'
    });

    StorageService.updateBooking(b);
    refreshBookings();
  };

  const getBookingById = (id: string): Booking | undefined => {
    if (!id) return undefined;
    const cleanId = id.trim();
    // 1. Check in state
    const fromState = bookings.find(
      b => b.id === cleanId || b.bookingCode === cleanId || b.orderNumber === cleanId
    );
    if (fromState) return fromState;

    // 2. Fresh fallback directly from StorageService
    const fromStorage = StorageService.getBookings().find(
      b => b.id === cleanId || b.bookingCode === cleanId || b.orderNumber === cleanId
    );
    return fromStorage;
  };

  return (
    <BookingContext.Provider
      value={{
        draft,
        bookings,
        startBooking,
        updateDraft,
        applyVoucher,
        removeVoucher,
        confirmBooking,
        processPaymentSimulation,
        updateBookingStatus,
        requestCancellation,
        getBookingById,
        refreshBookings,
        calculatePricing
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
