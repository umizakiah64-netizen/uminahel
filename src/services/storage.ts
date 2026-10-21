import {
  FlightOffer,
  TrainOffer,
  BusOffer,
  Hotel,
  TourPackage,
  Activity,
  Voucher,
  UserProfile,
  Booking,
  WishlistItem
} from '../types';
import {
  MOCK_FLIGHTS,
  MOCK_TRAINS,
  MOCK_BUSES,
  MOCK_HOTELS,
  MOCK_PACKAGES,
  MOCK_ACTIVITIES,
  MOCK_VOUCHERS,
  MOCK_BOOKINGS,
  INITIAL_USER,
  INITIAL_ADMIN_USER
} from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'jelajahin_user_profile',
  ROLE: 'jelajahin_active_role',
  FLIGHTS: 'jelajahin_flights',
  TRAINS: 'jelajahin_trains',
  BUSES: 'jelajahin_buses',
  HOTELS: 'jelajahin_hotels',
  PACKAGES: 'jelajahin_packages',
  ACTIVITIES: 'jelajahin_activities',
  VOUCHERS: 'jelajahin_vouchers',
  BOOKINGS: 'jelajahin_bookings',
  WISHLIST: 'jelajahin_wishlist'
};

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage for key ${key}:`, error);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage for key ${key}:`, error);
  }
}

export const StorageService = {
  // User & Auth
  getUser(): UserProfile {
    const role = this.getActiveRole();
    if (role === 'admin') {
      return getStoredItem<UserProfile>(STORAGE_KEYS.USER + '_admin', INITIAL_ADMIN_USER);
    }
    return getStoredItem<UserProfile>(STORAGE_KEYS.USER, INITIAL_USER);
  },

  saveUser(user: UserProfile): void {
    const role = user.role;
    if (role === 'admin') {
      setStoredItem(STORAGE_KEYS.USER + '_admin', user);
    } else {
      setStoredItem(STORAGE_KEYS.USER, user);
    }
  },

  getActiveRole(): 'user' | 'admin' {
    return getStoredItem<'user' | 'admin'>(STORAGE_KEYS.ROLE, 'user');
  },

  setActiveRole(role: 'user' | 'admin'): void {
    setStoredItem(STORAGE_KEYS.ROLE, role);
  },

  // Flights CRUD
  getFlights(): FlightOffer[] {
    return getStoredItem<FlightOffer[]>(STORAGE_KEYS.FLIGHTS, MOCK_FLIGHTS);
  },

  saveFlights(flights: FlightOffer[]): void {
    setStoredItem(STORAGE_KEYS.FLIGHTS, flights);
  },

  // Trains CRUD
  getTrains(): TrainOffer[] {
    return getStoredItem<TrainOffer[]>(STORAGE_KEYS.TRAINS, MOCK_TRAINS);
  },

  saveTrains(trains: TrainOffer[]): void {
    setStoredItem(STORAGE_KEYS.TRAINS, trains);
  },

  // Buses CRUD
  getBuses(): BusOffer[] {
    return getStoredItem<BusOffer[]>(STORAGE_KEYS.BUSES, MOCK_BUSES);
  },

  saveBuses(buses: BusOffer[]): void {
    setStoredItem(STORAGE_KEYS.BUSES, buses);
  },

  // Hotels CRUD
  getHotels(): Hotel[] {
    return getStoredItem<Hotel[]>(STORAGE_KEYS.HOTELS, MOCK_HOTELS);
  },

  saveHotels(hotels: Hotel[]): void {
    setStoredItem(STORAGE_KEYS.HOTELS, hotels);
  },

  // Tour Packages CRUD
  getPackages(): TourPackage[] {
    return getStoredItem<TourPackage[]>(STORAGE_KEYS.PACKAGES, MOCK_PACKAGES);
  },

  savePackages(packages: TourPackage[]): void {
    setStoredItem(STORAGE_KEYS.PACKAGES, packages);
  },

  // Activities CRUD
  getActivities(): Activity[] {
    return getStoredItem<Activity[]>(STORAGE_KEYS.ACTIVITIES, MOCK_ACTIVITIES);
  },

  saveActivities(activities: Activity[]): void {
    setStoredItem(STORAGE_KEYS.ACTIVITIES, activities);
  },

  // Vouchers CRUD
  getVouchers(): Voucher[] {
    return getStoredItem<Voucher[]>(STORAGE_KEYS.VOUCHERS, MOCK_VOUCHERS);
  },

  saveVouchers(vouchers: Voucher[]): void {
    setStoredItem(STORAGE_KEYS.VOUCHERS, vouchers);
  },

  // Bookings CRUD
  getBookings(): Booking[] {
    return getStoredItem<Booking[]>(STORAGE_KEYS.BOOKINGS, MOCK_BOOKINGS);
  },

  saveBookings(bookings: Booking[]): void {
    setStoredItem(STORAGE_KEYS.BOOKINGS, bookings);
  },

  addBooking(booking: Booking): void {
    const list = this.getBookings();
    list.unshift(booking);
    this.saveBookings(list);
  },

  updateBooking(updated: Booking): void {
    const list = this.getBookings();
    const index = list.findIndex(b => b.id === updated.id);
    if (index !== -1) {
      list[index] = updated;
      this.saveBookings(list);
    }
  },

  // Wishlist
  getWishlist(): WishlistItem[] {
    return getStoredItem<WishlistItem[]>(STORAGE_KEYS.WISHLIST, []);
  },

  saveWishlist(items: WishlistItem[]): void {
    setStoredItem(STORAGE_KEYS.WISHLIST, items);
  },

  toggleWishlist(item: Omit<WishlistItem, 'addedAt'>): boolean {
    const list = this.getWishlist();
    const existsIndex = list.findIndex(w => w.itemId === item.itemId && w.itemType === item.itemType);
    if (existsIndex >= 0) {
      list.splice(existsIndex, 1);
      this.saveWishlist(list);
      return false; // removed
    } else {
      list.unshift({
        ...item,
        addedAt: new Date().toISOString()
      });
      this.saveWishlist(list);
      return true; // added
    }
  },

  isWishlisted(itemId: string, itemType: string): boolean {
    const list = this.getWishlist();
    return list.some(w => w.itemId === itemId && w.itemType === itemType);
  },

  // Reset to default demo data
  resetAll(): void {
    Object.values(STORAGE_KEYS).forEach(k => {
      localStorage.removeItem(k);
      localStorage.removeItem(k + '_admin');
    });
  }
};
