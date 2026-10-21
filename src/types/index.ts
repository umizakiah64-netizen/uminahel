export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  savedTravelers: TravelerDetail[];
}

export interface FlightOffer {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  logo: string;
  originCity: string;
  originAirport: string;
  originCode: string;
  destinationCity: string;
  destinationAirport: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number; // 0 for direct
  cabinClass: 'Ekonomi' | 'Bisnis' | 'First Class';
  price: number;
  baggage: string;
  aircraft: string;
  facilities: string[];
}

export interface TrainOffer {
  id: string;
  operator: string; // PT Kereta Api Indonesia
  trainName: string;
  trainNumber: string;
  originStation: string;
  originCity: string;
  originCode: string;
  destinationStation: string;
  destinationCity: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  trainClass: 'Ekonomi' | 'Bisnis' | 'Eksekutif' | 'Luxury';
  price: number;
  seatsLeft: number;
  facilities: string[];
}

export interface BusOffer {
  id: string;
  operator: string;
  busType: string;
  originTerminal: string;
  originCity: string;
  destinationTerminal: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsLeft: number;
  facilities: string[];
}

export interface RoomType {
  id: string;
  name: string;
  bedType: string;
  maxGuests: number;
  breakfastIncluded: boolean;
  pricePerNight: number;
  availableCount: number;
  amenities: string[];
  imageUrl: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  rating: number; // e.g. 4.8
  reviewCount: number;
  stars: number; // 1-5
  type: 'Hotel' | 'Resort' | 'Villa' | 'Penginapan';
  mainImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  rooms: RoomType[];
  priceRange: { min: number; max: number };
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface TourPackage {
  id: string;
  name: string;
  destination: string;
  province: string;
  durationDays: number;
  tripType: 'Open Trip' | 'Private Trip';
  category: 'Pantai & Pulau' | 'Wisata Alam' | 'Gunung' | 'Budaya & Sejarah' | 'Keluarga' | 'Kuliner' | 'Petualangan';
  pricePerPerson: number;
  mainImage: string;
  gallery: string[];
  description: string;
  meetingPoint: string;
  minParticipants: number;
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  departureDates: string[];
  rating: number;
  reviewCount: number;
}

export interface Activity {
  id: string;
  name: string;
  category: 'Atraksi' | 'Tur Lokal' | 'Petualangan' | 'Kuliner' | 'Budaya' | 'Air & Bahari';
  city: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  meetingPoint: string;
  cancellationPolicy: string;
}

export interface Voucher {
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // percentage (e.g. 15 for 15%) or fixed amount in IDR
  minTransaction: number;
  maxDiscount?: number;
  validUntil: string;
  applicableCategory: 'all' | 'flights' | 'hotels' | 'trains' | 'buses' | 'packages' | 'activities';
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export interface ContactDetail {
  fullName: string;
  email: string;
  phone: string;
}

export interface TravelerDetail {
  title: 'Tuan' | 'Nyonya' | 'Nona';
  fullName: string;
  idType: 'KTP' | 'Paspor';
  idNumber: string;
  type: 'Dewasa' | 'Anak' | 'Bayi';
  nationality: string;
}

export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'Menunggu Pembayaran'
  | 'CONFIRMED'
  | 'Dibayar'
  | 'Dikonfirmasi'
  | 'CANCELLED'
  | 'Dibatalkan'
  | 'REFUND_PENDING'
  | 'Refund Diproses'
  | 'REFUNDED'
  | 'Refund Selesai';

export type PaymentStatus =
  | 'PENDING_PAYMENT'
  | 'pending'
  | 'PAID'
  | 'berhasil'
  | 'FAILED'
  | 'gagal'
  | 'EXPIRED'
  | 'kedaluwarsa'
  | 'REFUNDED';

export interface StatusHistoryItem {
  status: string;
  timestamp: string;
  note: string;
  actor?: string;
}

export interface Booking {
  id: string;
  orderNumber: string; // e.g. ORD-2026-XXXX
  bookingCode: string; // e.g. JLJ-2026-XXXX
  userId: string;
  productType: 'flight' | 'hotel' | 'train' | 'bus' | 'package' | 'activity';
  productId: string;
  productTitle: string;
  productSubtitle: string;
  productImage: string;
  bookingDate: string;
  travelDate: string;
  travelEndDate?: string;
  quantity: number; // e.g., passengers or rooms
  unitName: string; // e.g., "Penumpang", "Kamar / Malam", "Peserta"
  contactDetails: ContactDetail;
  travelers: TravelerDetail[];
  additionalNotes?: string;
  priceBreakdown: {
    basePrice: number;
    units: number;
    subtotal: number;
    tax: number; // PPN 11%
    serviceFee: number;
    discount: number;
    appliedVoucherCode?: string;
    totalAmount: number;
  };
  paymentMethod?: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  createdAt: string;
  paidAt?: string;
  statusHistory?: StatusHistoryItem[];
}

export interface WishlistItem {
  id: string;
  itemType: 'hotel' | 'package' | 'activity';
  itemId: string;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  rating: number;
  addedAt: string;
}
