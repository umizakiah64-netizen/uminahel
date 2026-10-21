import {
  FlightOffer,
  TrainOffer,
  BusOffer,
  Hotel,
  TourPackage,
  Activity,
  Voucher,
  UserProfile,
  Booking
} from '../types';

// Asset imports bundled for production
import heroTravelImg from '../assets/images/hero_indonesia_travel_1792545905435.jpg';
import baliResortImg from '../assets/images/dest_bali_resort_1792545906313.jpg';
import bromoSunriseImg from '../assets/images/dest_bromo_sunrise_1792545906613.jpg';
import rajaAmpatImg from '../assets/images/dest_raja_ampat_islands_1792545907283.jpg';

export const ASSET_HERO_TRAVEL = heroTravelImg;
export const ASSET_BALI_RESORT = baliResortImg;
export const ASSET_BROMO_SUNRISE = bromoSunriseImg;
export const ASSET_RAJA_AMPAT = rajaAmpatImg;

export const INITIAL_USER: UserProfile = {
  id: 'usr-001',
  name: 'Budi Pratama',
  email: 'budi.pratama@gmail.com',
  phone: '081234567890',
  role: 'user',
  savedTravelers: [
    {
      title: 'Tuan',
      fullName: 'Budi Pratama',
      idType: 'KTP',
      idNumber: '3171012304900001',
      type: 'Dewasa',
      nationality: 'Indonesia'
    },
    {
      title: 'Nyonya',
      fullName: 'Siti Rahmawati',
      idType: 'KTP',
      idNumber: '3171016509920002',
      type: 'Dewasa',
      nationality: 'Indonesia'
    }
  ]
};

export const INITIAL_ADMIN_USER: UserProfile = {
  id: 'adm-999',
  name: 'Admin Jelajahin',
  email: 'admin@jelajahin.id',
  phone: '08118889999',
  role: 'admin',
  savedTravelers: []
};

export const POPULAR_DESTINATIONS = [
  {
    id: 'dest-bali',
    name: 'Bali',
    province: 'Bali',
    image: ASSET_BALI_RESORT,
    tagline: 'Pantai eksotis, pura megah, dan budaya spiritual',
    hotelCount: '450+ Penginapan',
    flightFrom: 'Rp 780.000',
    popularActivities: ['Ubud Rice Terrace', 'Nusa Penida', 'Kecak Uluwatu']
  },
  {
    id: 'dest-labuan-bajo',
    name: 'Labuan Bajo',
    province: 'Nusa Tenggara Timur',
    image: ASSET_HERO_TRAVEL,
    tagline: 'Habitat komodo dan gugusan pulau surga bahari',
    hotelCount: '120+ Resort & Hotel',
    flightFrom: 'Rp 1.450.000',
    popularActivities: ['Sailing Komodo', 'Pulau Padar', 'Pink Beach']
  },
  {
    id: 'dest-bromo',
    name: 'Bromo & Malang',
    province: 'Jawa Timur',
    image: ASSET_BROMO_SUNRISE,
    tagline: 'Lautan pasir magis dan sunrise gunung berapi tercantik',
    hotelCount: '210+ Penginapan',
    flightFrom: 'Rp 650.000',
    popularActivities: ['Jeep 4x4 Tour', 'Kawah Bromo', 'Bukit Teletubbies']
  },
  {
    id: 'dest-raja-ampat',
    name: 'Raja Ampat',
    province: 'Papua Barat Daya',
    image: ASSET_RAJA_AMPAT,
    tagline: 'Ibukota terumbu karang dunia dan laguna karst zamrud',
    hotelCount: '65+ Eco Resort',
    flightFrom: 'Rp 2.850.000',
    popularActivities: ['Wayag Viewpoint', 'Pianemo Lagoon', 'Manta Sandy Diving']
  },
  {
    id: 'dest-yogyakarta',
    name: 'Yogyakarta',
    province: 'DI Yogyakarta',
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    tagline: 'Warisan keraton, candi megah, dan kuliner legendaris',
    hotelCount: '380+ Hotel & Homestay',
    flightFrom: 'Rp 590.000',
    popularActivities: ['Candi Borobudur', 'Candi Prambanan', 'Malioboro Night Walk']
  },
  {
    id: 'dest-lombok',
    name: 'Lombok & Gili',
    province: 'Nusa Tenggara Barat',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80',
    tagline: 'Pesona pantai jernih, Gili Trawangan, dan Gunung Rinjani',
    hotelCount: '260+ Hotel & Villa',
    flightFrom: 'Rp 820.000',
    popularActivities: ['Snorkeling Gili Trawangan', 'Pantai Tanjung Aan', 'Bukit Merese']
  },
  {
    id: 'dest-bandung',
    name: 'Bandung',
    province: 'Jawa Barat',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    tagline: 'Kesejukan dataran tinggi, kebun teh, dan surga belanja',
    hotelCount: '410+ Hotel',
    flightFrom: 'Rp 450.000',
    popularActivities: ['Kawah Putih', 'Orchid Forest Cikole', 'Kuliner Dago Heritage']
  }
];

export const MOCK_FLIGHTS: FlightOffer[] = [
  {
    id: 'fl-01',
    airline: 'Garuda Indonesia',
    airlineCode: 'GA-408',
    flightNumber: 'GA-408',
    logo: '🇮🇩',
    originCity: 'Jakarta',
    originAirport: 'Soekarno-Hatta Intl (CGK)',
    originCode: 'CGK',
    destinationCity: 'Bali (Denpasar)',
    destinationAirport: 'Ngurah Rai Intl (DPS)',
    destinationCode: 'DPS',
    departureTime: '06:15',
    arrivalTime: '09:05',
    duration: '1j 50m',
    stops: 0,
    cabinClass: 'Ekonomi',
    price: 1820000,
    baggage: 'Bagasi 20 kg + Kabin 7 kg',
    aircraft: 'Boeing 737-800',
    facilities: ['Makanan & Minuman Gratis', 'Hiburan Layar Sentuh', 'USB Port']
  },
  {
    id: 'fl-02',
    airline: 'Batik Air',
    airlineCode: 'ID-6502',
    flightNumber: 'ID-6502',
    logo: '✈️',
    originCity: 'Jakarta',
    originAirport: 'Soekarno-Hatta Intl (CGK)',
    originCode: 'CGK',
    destinationCity: 'Bali (Denpasar)',
    destinationAirport: 'Ngurah Rai Intl (DPS)',
    destinationCode: 'DPS',
    departureTime: '08:30',
    arrivalTime: '11:20',
    duration: '1j 50m',
    stops: 0,
    cabinClass: 'Ekonomi',
    price: 1350000,
    baggage: 'Bagasi 20 kg + Kabin 7 kg',
    aircraft: 'Airbus A320',
    facilities: ['Snack Ringan', 'Hiburan Nirkabel', 'Legroom Nyaman']
  },
  {
    id: 'fl-03',
    airline: 'Citilink',
    airlineCode: 'QG-682',
    flightNumber: 'QG-682',
    logo: '🟢',
    originCity: 'Jakarta',
    originAirport: 'Halim Perdanakusuma (HLP)',
    originCode: 'HLP',
    destinationCity: 'Bali (Denpasar)',
    destinationAirport: 'Ngurah Rai Intl (DPS)',
    destinationCode: 'DPS',
    departureTime: '10:45',
    arrivalTime: '13:35',
    duration: '1j 50m',
    stops: 0,
    cabinClass: 'Ekonomi',
    price: 1120000,
    baggage: 'Bagasi 20 kg + Kabin 7 kg',
    aircraft: 'Airbus A320neo',
    facilities: ['Kabin Modern', 'Air Mineral', 'USB Charging']
  },
  {
    id: 'fl-04',
    airline: 'Super Air Jet',
    airlineCode: 'IU-752',
    flightNumber: 'IU-752',
    logo: '⚡',
    originCity: 'Jakarta',
    originAirport: 'Soekarno-Hatta Intl (CGK)',
    originCode: 'CGK',
    destinationCity: 'Bali (Denpasar)',
    destinationAirport: 'Ngurah Rai Intl (DPS)',
    destinationCode: 'DPS',
    departureTime: '14:20',
    arrivalTime: '17:10',
    duration: '1j 50m',
    stops: 0,
    cabinClass: 'Ekonomi',
    price: 980000,
    baggage: 'Bagasi 20 kg + Kabin 7 kg',
    aircraft: 'Airbus A320',
    facilities: ['Hiburan Tripper', 'Kabin Muda', 'Proses Cepat']
  },
  {
    id: 'fl-05',
    airline: 'Batik Air',
    airlineCode: 'ID-8540',
    flightNumber: 'ID-8540',
    logo: '✈️',
    originCity: 'Jakarta',
    originAirport: 'Soekarno-Hatta Intl (CGK)',
    originCode: 'CGK',
    destinationCity: 'Labuan Bajo (LBJ)',
    destinationAirport: 'Komodo Airport (LBJ)',
    destinationCode: 'LBJ',
    departureTime: '07:10',
    arrivalTime: '10:35',
    duration: '2j 25m',
    stops: 0,
    cabinClass: 'Ekonomi',
    price: 1950000,
    baggage: 'Bagasi 20 kg + Kabin 7 kg',
    aircraft: 'Airbus A320',
    facilities: ['Snack Box', 'Pemandangan Flores', 'Kabin Bersih']
  },
  {
    id: 'fl-06',
    airline: 'Garuda Indonesia',
    airlineCode: 'GA-7026',
    flightNumber: 'GA-7026',
    logo: '🇮🇩',
    originCity: 'Jakarta',
    originAirport: 'Soekarno-Hatta Intl (CGK)',
    originCode: 'CGK',
    destinationCity: 'Labuan Bajo (LBJ)',
    destinationAirport: 'Komodo Airport (LBJ)',
    destinationCode: 'LBJ',
    departureTime: '11:15',
    arrivalTime: '14:40',
    duration: '2j 25m',
    stops: 0,
    cabinClass: 'Ekonomi',
    price: 2450000,
    baggage: 'Bagasi 20 kg + Kabin 7 kg',
    aircraft: 'Boeing 737-800',
    facilities: ['Hot Meals', 'Hiburan Digital', 'Check-in Prioritas']
  },
  {
    id: 'fl-07',
    airline: 'Garuda Indonesia',
    airlineCode: 'GA-682',
    flightNumber: 'GA-682',
    logo: '🇮🇩',
    originCity: 'Jakarta',
    originAirport: 'Soekarno-Hatta Intl (CGK)',
    originCode: 'CGK',
    destinationCity: 'Sorong (Raja Ampat)',
    destinationAirport: 'Domine Eduard Osok (SOQ)',
    destinationCode: 'SOQ',
    departureTime: '00:30',
    arrivalTime: '06:35',
    duration: '4j 05m',
    stops: 0,
    cabinClass: 'Ekonomi',
    price: 3850000,
    baggage: 'Bagasi 20 kg + Kabin 7 kg',
    aircraft: 'Boeing 737-800',
    facilities: ['Sarapan Hangat', 'Selimut & Bantal', 'In-flight Entertainment']
  },
  {
    id: 'fl-08',
    airline: 'Citilink',
    airlineCode: 'QG-102',
    flightNumber: 'QG-102',
    logo: '🟢',
    originCity: 'Jakarta',
    originAirport: 'Halim Perdanakusuma (HLP)',
    originCode: 'HLP',
    destinationCity: 'Yogyakarta',
    destinationAirport: 'Yogyakarta Intl (YIA)',
    destinationCode: 'YIA',
    departureTime: '07:30',
    arrivalTime: '08:40',
    duration: '1j 10m',
    stops: 0,
    cabinClass: 'Ekonomi',
    price: 780000,
    baggage: 'Bagasi 20 kg + Kabin 7 kg',
    aircraft: 'Airbus A320',
    facilities: ['Ketepatan Waktu', 'Air Mineral', 'Kabin Nyaman']
  }
];

export const MOCK_TRAINS: TrainOffer[] = [
  {
    id: 'tr-01',
    operator: 'KAI (Kereta Api Indonesia)',
    trainName: 'Taksaka Hype Trip',
    trainNumber: 'PLB 68',
    originStation: 'Stasiun Gambir',
    originCity: 'Jakarta',
    originCode: 'GMR',
    destinationStation: 'Stasiun Yogyakarta',
    destinationCity: 'Yogyakarta',
    destinationCode: 'YK',
    departureTime: '09:20',
    arrivalTime: '15:35',
    duration: '6j 15m',
    trainClass: 'Eksekutif',
    price: 580000,
    seatsLeft: 18,
    facilities: ['Kursi Reclining Ergonomis', 'Stopkontak Tiap Kursi', 'Free Wi-Fi', 'Kereta Makan']
  },
  {
    id: 'tr-02',
    operator: 'KAI (Kereta Api Indonesia)',
    trainName: 'Argo Dwipangga Luxury',
    trainNumber: '10L',
    originStation: 'Stasiun Gambir',
    originCity: 'Jakarta',
    originCode: 'GMR',
    destinationStation: 'Stasiun Yogyakarta',
    destinationCity: 'Yogyakarta',
    destinationCode: 'YK',
    departureTime: '20:50',
    arrivalTime: '03:10',
    duration: '6j 20m',
    trainClass: 'Luxury',
    price: 1250000,
    seatsLeft: 6,
    facilities: ['Sleeper Seat 170°', 'Layar AVOD Pribadi', 'Makan Malam Gratis', 'Layanan Pramugari']
  },
  {
    id: 'tr-03',
    operator: 'KAI (Kereta Api Indonesia)',
    trainName: 'Argo Bromo Anggrek',
    trainNumber: '1',
    originStation: 'Stasiun Gambir',
    originCity: 'Jakarta',
    originCode: 'GMR',
    destinationStation: 'Stasiun Surabaya Pasarturi',
    destinationCity: 'Surabaya',
    destinationCode: 'SBI',
    departureTime: '08:20',
    arrivalTime: '16:25',
    duration: '8j 05m',
    trainClass: 'Eksekutif',
    price: 760000,
    seatsLeft: 24,
    facilities: ['Kursi Mewah', 'AC Dingin', 'Toilet Bersih', 'Bahan Bacaan']
  },
  {
    id: 'tr-04',
    operator: 'KAI (Kereta Api Indonesia)',
    trainName: 'Argo Parahyangan Panoramic',
    trainNumber: '36P',
    originStation: 'Stasiun Gambir',
    originCity: 'Jakarta',
    originCode: 'GMR',
    destinationStation: 'Stasiun Bandung',
    destinationCity: 'Bandung',
    destinationCode: 'BD',
    departureTime: '06:30',
    arrivalTime: '09:15',
    duration: '2j 45m',
    trainClass: 'Eksekutif',
    price: 400000,
    seatsLeft: 12,
    facilities: ['Kaca Panoramic Luas', 'Pemandangan Jembatan Cisomang', 'Snack & Minuman']
  },
  {
    id: 'tr-05',
    operator: 'KAI (Kereta Api Indonesia)',
    trainName: 'Gajayana',
    trainNumber: '56',
    originStation: 'Stasiun Gambir',
    originCity: 'Jakarta',
    originCode: 'GMR',
    destinationStation: 'Stasiun Malang',
    destinationCity: 'Malang',
    destinationCode: 'ML',
    departureTime: '18:50',
    arrivalTime: '07:05',
    duration: '12j 15m',
    trainClass: 'Eksekutif',
    price: 810000,
    seatsLeft: 14,
    facilities: ['Selimut Bersih', 'Bantal Nyaman', 'Reclining Seat', 'Layanan Pagi Hari']
  }
];

export const MOCK_BUSES: BusOffer[] = [
  {
    id: 'bus-01',
    operator: 'Cititrans Shuttle',
    busType: 'Executive Toyota HiAce Premio',
    originTerminal: 'Dipatiukur Hub',
    originCity: 'Bandung',
    destinationTerminal: 'SCBD Point Jakarta',
    destinationCity: 'Jakarta',
    departureTime: '07:00',
    arrivalTime: '09:45',
    duration: '2j 45m',
    price: 185000,
    seatsLeft: 5,
    facilities: ['Captain Seat 1-1', 'USB Fast Charging', 'Air Mineral', 'Full AC']
  },
  {
    id: 'bus-02',
    operator: 'DayTrans Shuttle',
    busType: 'Premiere Shuttle 8-Seater',
    originTerminal: 'Pasteur Pool',
    originCity: 'Bandung',
    destinationTerminal: 'FX Sudirman',
    destinationCity: 'Jakarta',
    departureTime: '08:30',
    arrivalTime: '11:15',
    duration: '2j 45m',
    price: 165000,
    seatsLeft: 3,
    facilities: ['Captain Seat', 'Bagasi Luas', 'Layanan Antar Titik', 'AC Dingin']
  },
  {
    id: 'bus-03',
    operator: 'Gunung Harta Transport Solutions',
    busType: 'Double Decker Sleeper & Executive',
    originTerminal: 'Terminal Pulo Gebang',
    originCity: 'Jakarta',
    destinationTerminal: 'Terminal Mengwi',
    destinationCity: 'Bali (Denpasar)',
    departureTime: '12:30',
    arrivalTime: '09:30 (+1)',
    duration: '21j 00m',
    price: 650000,
    seatsLeft: 8,
    facilities: ['Sleeper Cabin Lantai 1', 'Makan Prasmanan 2x', 'AVOD Personal', 'Toilet di Dalam Bus']
  },
  {
    id: 'bus-04',
    operator: 'DAMRI Royal Class',
    busType: 'Mercedes-Benz Super High Deck',
    originTerminal: 'Terminal Kemayoran',
    originCity: 'Jakarta',
    destinationTerminal: 'Terminal Giwangan',
    destinationCity: 'Yogyakarta',
    departureTime: '19:00',
    arrivalTime: '03:45 (+1)',
    duration: '8j 45m',
    price: 320000,
    seatsLeft: 16,
    facilities: ['Legrest Lebar', 'Snack Box & Kopi', 'Wi-Fi Onboard', 'Selimut Hangat']
  }
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'ht-01',
    name: 'Maya Ubud Resort & Spa Sanctuary',
    city: 'Ubud',
    province: 'Bali',
    address: 'Jl. Gunung Sari Peliatan, Ubud, Gianyar, Bali 80571',
    rating: 4.9,
    reviewCount: 1420,
    stars: 5,
    type: 'Resort',
    mainImage: ASSET_BALI_RESORT,
    gallery: [
      ASSET_BALI_RESORT,
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Terletak di lembah sungai tersembunyi Ubud dengan pemandangan lembah tropis hijau yang memukau. Nikmati kedamaian sejati dengan infinity pool kelas dunia, spa sungai yang menenangkan, dan keramahan khas Bali.',
    amenities: ['Infinity Pool Sungai', 'Spa Terapung', 'Wi-Fi Cepat', 'Restoran Organik', 'Pusat Kebugaran', 'Shuttle Gratis ke Pusat Ubud', 'Ruang Yoga'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    cancellationPolicy: 'Gratis pembatalan hingga 48 jam sebelum jadwal check-in.',
    priceRange: { min: 2850000, max: 6200000 },
    rooms: [
      {
        id: 'rm-01',
        name: 'Superior Forest View Room',
        bedType: '1 King Bed atau 2 Twin Beds',
        maxGuests: 2,
        breakfastIncluded: true,
        pricePerNight: 2850000,
        availableCount: 4,
        amenities: ['Balkon Pribadi Hutan Tropis', 'Bathtub Marmer', 'Smart TV 55"', 'Mesin Espresso'],
        imageUrl: ASSET_BALI_RESORT
      },
      {
        id: 'rm-02',
        name: 'Deluxe Pool Villa with Valley Vista',
        bedType: '1 King Bed Super Luxurious',
        maxGuests: 3,
        breakfastIncluded: true,
        pricePerNight: 5100000,
        availableCount: 2,
        amenities: ['Private Plunge Pool', 'Gazebo Bale Tradisional', 'Outdoor Rain Shower', 'Butler 24 Jam'],
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'ht-02',
    name: 'Plataran Komodo Secluded Beach Resort',
    city: 'Labuan Bajo',
    province: 'Nusa Tenggara Timur',
    address: 'Pantai Waecicu, Labuan Bajo, Manggarai Barat, NTT',
    rating: 4.8,
    reviewCount: 890,
    stars: 5,
    type: 'Resort',
    mainImage: ASSET_HERO_TRAVEL,
    gallery: [
      ASSET_HERO_TRAVEL,
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Resort tepi pantai privat terbaik di Labuan Bajo. Dikelilingi perbukitan hijau dan laut Flores yang jernih, resort ini memiliki dermaga pribadi untuk memulai petualangan kapal phinisi ke Pulau Komodo dan Padar.',
    amenities: ['Pantai Pasir Putih Privat', 'Dermaga Phinisi', 'Restoran Atlantis on the Rock', 'Kayak & Snorkeling Gratis', 'Kolam Renang Tepi Laut', 'Spa Tradisional'],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    cancellationPolicy: 'Pembatalan gratis hingga 7 hari sebelum kedatangan.',
    priceRange: { min: 3600000, max: 8500000 },
    rooms: [
      {
        id: 'rm-03',
        name: 'Deluxe Garden Villa',
        bedType: '1 King Bed',
        maxGuests: 2,
        breakfastIncluded: true,
        pricePerNight: 3600000,
        availableCount: 3,
        amenities: ['Teras Tropis', 'Kamar Mandi Semi-Terbuka', 'Kopi Flores Premium', 'Akses Langsung Pantai'],
        imageUrl: ASSET_HERO_TRAVEL
      },
      {
        id: 'rm-04',
        name: 'Grand Ocean Beachfront Residence',
        bedType: '1 King Bed + 1 Daybed',
        maxGuests: 3,
        breakfastIncluded: true,
        pricePerNight: 6750000,
        availableCount: 1,
        amenities: ['Langkah Kaki ke Pasir Pantai', 'Pemandangan Sunset Labuan Bajo', 'Afternoon Tea Harian'],
        imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'ht-03',
    name: 'Jiwa Jawa Resort Bromo Volcanic Sanctuary',
    city: 'Bromo (Probolinggo)',
    province: 'Jawa Timur',
    address: 'Jl. Raya Bromo, Wonotoro, Sukapura, Probolinggo, Jawa Timur',
    rating: 4.7,
    reviewCount: 650,
    stars: 4,
    type: 'Resort',
    mainImage: ASSET_BROMO_SUNRISE,
    gallery: [
      ASSET_BROMO_SUNRISE,
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Resort ramah lingkungan di dataran tinggi Bromo dengan ketinggian 2.000 meter dpl. Menampilkan galeri seni fotografi alam, amfiteater terbuka Jazz Gunung Bromo, dan penghangat ruangan modern di tengah hawa sejuk pegunungan.',
    amenities: ['Pemanas Ruangan (Heater)', 'Galeri Foto Alam', 'Restoran Masakan Jawa Timur', 'Penyewaan Jeep Bromo', 'Taman Bunga Edelweiss', 'Area Api Unggun'],
    checkInTime: '14:00',
    checkOutTime: '11:00',
    cancellationPolicy: 'Bisa dijadwalkan ulang 1x tanpa biaya hingga H-3.',
    priceRange: { min: 1850000, max: 3200000 },
    rooms: [
      {
        id: 'rm-05',
        name: 'Executive Hillside Room',
        bedType: '1 King Bed atau 2 Single Beds',
        maxGuests: 2,
        breakfastIncluded: true,
        pricePerNight: 1850000,
        availableCount: 5,
        amenities: ['Mountain View', 'Water Heater Cepat', 'Teh Hangat & Jahe Sambutan'],
        imageUrl: ASSET_BROMO_SUNRISE
      }
    ]
  },
  {
    id: 'ht-04',
    name: 'The Phoenix Hotel Yogyakarta - Heritage MGallery',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    address: 'Jl. Jenderal Sudirman No. 9, Yogyakarta 55233',
    rating: 4.8,
    reviewCount: 2100,
    stars: 5,
    type: 'Hotel',
    mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hotel bersejarah peninggalan era 1918 yang memadukan arsitektur kolonial klasik, nuansa Jawa kental, dan fasilitas modern bintang lima di dekat kawasan legendaris Malioboro.',
    amenities: ['Kolam Renang Halaman Kolonial', 'MySpa Tradisional Jawa', 'Restoran Paprika Courtyard', 'Dekat Malioboro & Tugu Jogja', 'Koleksi Barang Antik'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    cancellationPolicy: 'Gratis pembatalan sampai pukul 18:00 pada H-1 kedatangan.',
    priceRange: { min: 1350000, max: 2900000 },
    rooms: [
      {
        id: 'rm-06',
        name: 'Superior Heritage Courtyard Room',
        bedType: '1 Queen Bed',
        maxGuests: 2,
        breakfastIncluded: true,
        pricePerNight: 1350000,
        availableCount: 6,
        amenities: ['Dekorasi Ukiran Kayu Jati', 'Balkon Kolonial', 'Free Minibar Pertama'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'ht-05',
    name: 'Raja Ampat Misool Eco Lagoon Resort',
    city: 'Raja Ampat',
    province: 'Papua Barat Daya',
    address: 'Kepulauan Misool Selatan, Raja Ampat, Papua Barat Daya',
    rating: 5.0,
    reviewCount: 380,
    stars: 5,
    type: 'Resort',
    mainImage: ASSET_RAJA_AMPAT,
    gallery: [
      ASSET_RAJA_AMPAT,
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Resort pulau pribadi eksklusif yang dibangun di atas laguna zamrud yang terlindung. Pintu masuk langsung menuju terumbu karang hidup dengan keanekaragaman biota laut terkaya di planet bumi.',
    amenities: ['Water Villa di Atas Air', 'PADI Dive Center 5-Star', 'All-Inclusive Full Board Meals', 'Konservasi Laut Privat', 'Peralatan Snorkeling Lengkap'],
    checkInTime: '13:00',
    checkOutTime: '10:00',
    cancellationPolicy: 'Pembatalan fleksibel dengan deposit disimpan untuk jadwal berikutnya.',
    priceRange: { min: 6900000, max: 12500000 },
    rooms: [
      {
        id: 'rm-07',
        name: 'Overwater Coral Lagoon Villa',
        bedType: '1 King Bed Kanopi',
        maxGuests: 2,
        breakfastIncluded: true,
        pricePerNight: 6900000,
        availableCount: 2,
        amenities: ['Tangga Langsung Turun ke Laut', 'Hammock di Atas Air', 'Full Board Makan 3x Sehari'],
        imageUrl: ASSET_RAJA_AMPAT
      }
    ]
  }
];

export const MOCK_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-01',
    name: 'Liveaboard Phinisi Komodo & Labuan Bajo VIP 3H2M',
    destination: 'Labuan Bajo',
    province: 'Nusa Tenggara Timur',
    durationDays: 3,
    tripType: 'Open Trip',
    category: 'Pantai & Pulau',
    pricePerPerson: 3750000,
    mainImage: ASSET_HERO_TRAVEL,
    gallery: [
      ASSET_HERO_TRAVEL,
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Jelajahi keajaiban Taman Nasional Komodo dengan kapal Phinisi kayu tradisional ber-AC. Menginap di laut, mendaki Pulau Padar saat matahari terbit, melihat kadal purba Komodo di habitat aslinya, dan berenang bersama pari manta.',
    meetingPoint: 'Pelabuhan Marina Labuan Bajo (Pukul 09.30 WITA)',
    minParticipants: 1,
    included: [
      'Kabin Kapal Phinisi Ber-AC 2 Malam',
      'Makan 3x Sehari (Chef on Board) + Buah Segar',
      'Tiket Masuk TN Komodo & Ranger Guide',
      'Peralatan Snorkeling & Life Jacket',
      'Dokumentasi Kamera DSLR + Drone',
      'Air Mineral, Kopi, dan Teh Sepuasnya'
    ],
    excluded: [
      'Tiket Pesawat PP ke Labuan Bajo',
      'Pengeluaran Pribadi & Tipping Kru',
      'Asuransi Tambahan'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Pulau Kelor, Manjarite, & Sunset Kalong',
        description: 'Penjemputan di hotel/bandara ke pelabuhan Marina. Berlayar ke Pulau Kelor untuk trekking pemandangan laut toska, snorkeling di terumbu karang Manjarite, dan menikmati ribuan kelelawar terbang saat matahari terbenam di Pulau Kalong.',
        activities: ['Trekking Pulau Kelor', 'Snorkeling Manjarite', 'Sunset Pulau Kalong']
      },
      {
        day: 2,
        title: 'Sunrise Padar, Pink Beach, & Komodo Dragon',
        description: 'Trekking pagi hari ke puncak ikonik Pulau Padar. Berjemur dan snorkeling di Pink Beach pasir merah muda yang langka, lalu observasi Komodo di Pulau Komodo atau Rinca bersama ranger resmi.',
        activities: ['Puncak Padar Sunrise', 'Foto & Renang Pink Beach', 'Observasi Komodo']
      },
      {
        day: 3,
        title: 'Manta Point & Pulau Kanawa',
        description: 'Berenang bersama pari manta raksasa di Manta Point, lanjut relaksasi di pulau cantik Kanawa sebelum kembali berlayar ke Marina Labuan Bajo sore hari.',
        activities: ['Manta Ray Encounter', 'Snorkeling Kanawa', 'Kepulangan ke Marina']
      }
    ],
    departureDates: ['2026-11-06', '2026-11-13', '2026-11-20', '2026-11-27'],
    rating: 4.9,
    reviewCount: 412
  },
  {
    id: 'pkg-02',
    name: 'Ekspedisi Sunrise Bromo, Madakaripura & Kawah Ijen Blue Fire 3H2M',
    destination: 'Bromo & Ijen',
    province: 'Jawa Timur',
    durationDays: 3,
    tripType: 'Open Trip',
    category: 'Gunung',
    pricePerPerson: 1850000,
    mainImage: ASSET_BROMO_SUNRISE,
    gallery: [
      ASSET_BROMO_SUNRISE,
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Petualangan gunung berapi terhebat di Pulau Jawa. Saksikan golden sunrise Bromo dengan armada Jeep 4x4, sejuknya air terjun Madakaripura, dan fenomena langka api biru (Blue Fire) di kawah belerang Ijen.',
    meetingPoint: 'Stasiun Kota Malang / Stasiun Surabaya Gubeng (Pukul 23.00 WIB)',
    minParticipants: 2,
    included: [
      'Transportasi AC Pariwisata Antar Kota',
      'Armada Jeep 4x4 Bromo Sunrise',
      'Penginapan 1 Malam di Kawasan Ijen',
      'Tiket Masuk Bromo & Kawah Ijen',
      'Masker Gas Belerang & Senter Kepala',
      'Local Guide Berlisensi'
    ],
    excluded: [
      'Sewa Kuda di Lautan Pasir Bromo',
      'Tipping Driver & Tour Leader',
      'Makan Siang dan Malam di Luar Paket'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Penjemputan Tengah Malam & Sunrise Bromo',
        description: 'Tiba di Bromo dini hari, naik jeep menuju Penanjakan 1 untuk sunrise. Lanjut eksplorasi Kawah Bromo, Pasir Berbisik, dan Bukit Teletubbies savana.',
        activities: ['Sunrise Penanjakan', 'Kawah Aktif Bromo', 'Savana Bromo']
      },
      {
        day: 2,
        title: 'Air Terjun Madakaripura & Perjalanan ke Banyuwangi',
        description: 'Menuju air terjun abadi Patih Gajah Mada, kemudian perjalanan darat menuju hotel di Banyuwangi untuk istirahat persiapan dini hari.',
        activities: ['Air Terjun Madakaripura', 'Check-in Hotel Ijen']
      },
      {
        day: 3,
        title: 'Trekking Blue Fire Kawah Ijen & Kepulangan',
        description: 'Mulai mendaki kawah pukul 01.30 WIB. Menyaksikan fenomena Blue Fire spektakuler dan danau kawah toska asam terbesar dunia saat terbit matahari.',
        activities: ['Fenomena Blue Fire', 'Sunrise Danau Kawah Ijen', 'Drop Off Banyuwangi / Surabaya']
      }
    ],
    departureDates: ['2026-11-07', '2026-11-14', '2026-11-21', '2026-11-28'],
    rating: 4.8,
    reviewCount: 356
  },
  {
    id: 'pkg-03',
    name: 'Surga Zamrud Raja Ampat: Pianemo & Wayag Icons 4H3M',
    destination: 'Raja Ampat',
    province: 'Papua Barat Daya',
    durationDays: 4,
    tripType: 'Private Trip',
    category: 'Pantai & Pulau',
    pricePerPerson: 7450000,
    mainImage: ASSET_RAJA_AMPAT,
    gallery: [
      ASSET_RAJA_AMPAT,
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perjalanan seumur hidup ke jantung segitiga karang dunia. Jelajahi panorama bukit karst Pianemo, laguna bintang Telaga Bintang, snorkeling bersama hiu karang di Yenbuba, dan keindahan pulau pasir timbul.',
    meetingPoint: 'Pelabuhan Rakyat Sorong (Pukul 08.00 WIT)',
    minParticipants: 2,
    included: [
      'Speedboat Pribadi Khusus Keliling Raja Ampat',
      'Penginapan Resort Tepi Laut 3 Malam di Waisai',
      'Makan Lengkap 3x Sehari Selama Tur',
      'Peralatan Snorkeling & Lifevest',
      'Pemandu Lokal Asli Raja Ampat',
      'Tiket Masuk Destinasi Wisata'
    ],
    excluded: [
      'PIN Kartu Konservasi Raja Ampat (KJL)',
      'Tiket Pesawat ke Sorong (SOQ)',
      'Pengeluaran Pribadi'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ferry Cepat ke Waisai & Check-in Eco Resort',
        description: 'Penyeberangan dari Sorong ke Waisai. Istirahat dan pemanasan snorkeling santai di house reef resort.',
        activities: ['Ferry VIP Sorong - Waisai', 'House Reef Snorkeling']
      },
      {
        day: 2,
        title: 'Pianemo Karst, Telaga Bintang & Sauwandarek',
        description: 'Trekking tangga kayu ke puncak ikonik gugusan pulau karang Pianemo. Snorkeling di dermaga Sauwandarek bersama penyu laut.',
        activities: ['Puncak Pianemo', 'Telaga Bintang', 'Snorkeling Penyu Sauwandarek']
      },
      {
        day: 3,
        title: 'Pasir Timbul, Friwen Beach & Yenbuba',
        description: 'Mengunjungi pulau pasir putih di tengah laut Pasir Timbul, menikmati kelapa muda di Pantai Friwen, dan snorkeling di Yenbuba Jetty.',
        activities: ['Pasir Timbul', 'Makan Siang Friwen', 'Snorkeling Yenbuba']
      },
      {
        day: 4,
        title: 'Belanja Oleh-Oleh Waisai & Kembali ke Sorong',
        description: 'Sarapan pagi, belanja cinderamata lokal noken Papua, dan perjalanan kembali ke Sorong.',
        activities: ['Souvenir Shopping', 'Transfer Boat ke Sorong']
      }
    ],
    departureDates: ['2026-11-10', '2026-11-18', '2026-11-25'],
    rating: 5.0,
    reviewCount: 184
  },
  {
    id: 'pkg-04',
    name: 'Pesona Budaya Yogyakarta: Borobudur, Prambanan & Merapi Lava Tour 3H2M',
    destination: 'Yogyakarta',
    province: 'DI Yogyakarta',
    durationDays: 3,
    tripType: 'Open Trip',
    category: 'Budaya & Sejarah',
    pricePerPerson: 1450000,
    mainImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Menyusuri kearifan sejarah Nusantara di Yogyakarta. Mengunjungi Candi Borobudur mahakarya Buddha, kemegahan candi Hindu Prambanan, serta petualangan seru offroad Jeep Lava Tour di lereng Gunung Merapi.',
    meetingPoint: 'Stasiun Yogyakarta (Tugu) / Bandara YIA (Pukul 09.00 WIB)',
    minParticipants: 2,
    included: [
      'Transportasi AC Pariwisata Nyaman',
      'Hotel Bintang 3 Kawasan Malioboro 2 Malam',
      'Jeep Merapi Lava Tour Rute Pendek',
      'Tiket Masuk Borobudur, Prambanan, Keraton',
      'Makan Sesuai Program Termasuk Gudeg Legendaris'
    ],
    excluded: ['Tiket Pesawat / Kereta ke Yogyakarta', 'Belanja Oleh-Oleh Bakpia'],
    itinerary: [
      {
        day: 1,
        title: 'Keraton Jogja, Tamansari & Malioboro',
        description: 'Mengunjungi istana Kesultanan Ngayogyakarta Hadiningrat, keindahan arsitektur kolam Tamansari, dan suasana malam Malioboro.',
        activities: ['Keraton Yogyakarta', 'Tamansari Water Castle', 'Malioboro Stroll']
      },
      {
        day: 2,
        title: 'Borobudur Heritage & Jeep Merapi Lava Tour',
        description: 'Eksplorasi relief candi Borobudur dengan pemandu arkeolog, dilanjutkan susur bekas erupsi Merapi dengan Jeep terbuka.',
        activities: ['Candi Borobudur', 'Jeep Lava Tour Merapi', 'Bunker Kaliadem']
      },
      {
        day: 3,
        title: 'Kemegahan Prambanan & Sentra Bakpia',
        description: 'Kagumi arsitektur candi Siwa Prambanan dan berbelanja bakpia kukus hangat sebelum diantar ke stasiun atau bandara.',
        activities: ['Candi Prambanan', 'Pusat Bakpia Jogja']
      }
    ],
    departureDates: ['2026-11-06', '2026-11-13', '2026-11-20', '2026-11-27'],
    rating: 4.8,
    reviewCount: 290
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-01',
    name: 'Tiket Masuk & Pagelaran Tari Garuda Wisnu Kencana (GWK)',
    category: 'Atraksi',
    city: 'Kuta Selatan',
    location: 'Ungasan, Bali',
    duration: '1 Hari Akses Fleksibel',
    price: 125000,
    rating: 4.7,
    reviewCount: 2450,
    mainImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Saksikan salah satu patung monumen tertinggi di dunia setinggi 121 meter, serta 15 pertunjukan tari tradisional Bali gratis setiap harinya termasuk Tari Barong dan Kecak.',
    highlights: ['Akses Taman Budaya GWK', 'Pertunjukan Tari Bali Setiap Jam', 'Museum dan Galeri Seni', 'Spot Foto Ikonik'],
    inclusions: ['Tiket Masuk GWK Cultural Park', 'Akses Semua Pagelaran Tari Reguler', 'Welcome Drink'],
    meetingPoint: 'Loket Tiket Utama Gate 1 GWK Bali',
    cancellationPolicy: 'Dapat dibatalkan hingga 24 jam sebelum tanggal kunjungan.'
  },
  {
    id: 'act-02',
    name: 'Sunrise Jeep Tour Bromo 4x4 & Lautan Pasir Berbisik',
    category: 'Petualangan',
    city: 'Bromo',
    location: 'Sukapura, Probolinggo',
    duration: '6 Jam (Dini Hari)',
    price: 375000,
    rating: 4.9,
    reviewCount: 1820,
    mainImage: ASSET_BROMO_SUNRISE,
    description: 'Petualangan offroad legendaris dengan armada Toyota Land Cruiser 4x4. Menyaksikan matahari terbit spektakuler di Penanjakan, kawah aktif, dan savana rumput hijau.',
    highlights: ['Jeep 4x4 Asli Bromo', 'Spot Sunrise Penanjakan 1', 'Kawah Berasap Bromo', 'Bukit Teletubbies & Pasir Berbisik'],
    inclusions: ['Jeep 4x4 Eksklusif / Sharing', 'Driver Lokal Berpengalaman', 'Bahan Bakar & Parkir'],
    meetingPoint: 'Basecamp Sukapura atau Hotel Area Bromo',
    cancellationPolicy: 'Gratis pembatalan H-2 sebelum aktivitas.'
  },
  {
    id: 'act-03',
    name: 'White Water Rafting Sungai Ayung Ubud Grade 2-3',
    category: 'Air & Bahari',
    city: 'Ubud',
    location: 'Kedewatan, Ubud, Bali',
    duration: '3.5 Jam (12 km Jeram)',
    price: 250000,
    rating: 4.8,
    reviewCount: 1230,
    mainImage: ASSET_BALI_RESORT,
    description: 'Arung jeram seru di sungai terpanjang Bali, melewati ngarai batu dengan ukiran relief Ramayana kuno, air terjun tersembunyi, dan hutan tropis lebat.',
    highlights: ['Jeram Menantang & Aman untuk Pemula', 'Pemandangan Relief Tebing Kuno', 'Air Terjun Alami untuk Berenang', 'Makan Siang Prasmanan Indonesia'],
    inclusions: ['Instruktur Rafting Bersertifikat', 'Peralatan Helm & Pelampung Standar Internasional', 'Makan Siang Buffet Lezat', 'Asuransi Peserta'],
    meetingPoint: 'Lobby Rafting Center Jl. Raya Kedewatan Ubud',
    cancellationPolicy: 'Bisa dijadwalkan ulang gratis.'
  },
  {
    id: 'act-04',
    name: 'Day Tour Nusa Penida Barat: Kelingking Beach & Broken Beach',
    category: 'Tur Lokal',
    city: 'Nusa Penida',
    location: 'Nusa Penida, Bali',
    duration: '10 Jam Penuh',
    price: 495000,
    rating: 4.8,
    reviewCount: 980,
    mainImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    description: 'Jelajahi keajaiban pulau tetangga Bali dengan fast boat pulang-pergi. Kunjungi tebing kepala T-Rex Pantai Kelingking yang viral di seluruh dunia, Angel’s Billabong, dan Broken Beach.',
    highlights: ['Fast Boat PP Sanur - Nusa Penida', 'Mobil AC Pribadi di Pulau Penida', 'Tebing Ikonik Kelingking T-Rex', 'Kolam Alami Angel\'s Billabong'],
    inclusions: ['Tiket Fast Boat PP', 'Transportasi Mobil Pulau + Driver', 'Makan Siang Restoran Lokal', 'Tiket Masuk Wisata'],
    meetingPoint: 'Pelabuhan Fast Boat Sanur Bali',
    cancellationPolicy: 'Pembatalan fleksibel hingga 24 jam sebelum berangkat.'
  }
];

export const MOCK_VOUCHERS: Voucher[] = [
  {
    code: 'JELAJAHINDONESIA',
    title: 'Diskon 15% Semua Perjalanan',
    description: 'Hemat 15% untuk seluruh pemesanan tiket, hotel, atau paket wisata tanpa syarat rumit.',
    discountType: 'percentage',
    discountValue: 15,
    minTransaction: 500000,
    maxDiscount: 300000,
    validUntil: '2026-12-31',
    applicableCategory: 'all',
    usageLimit: 1000,
    usedCount: 342,
    active: true
  },
  {
    code: 'LIBURANSERU',
    title: 'Potongan Rp 150.000',
    description: 'Potongan harga langsung sebesar Rp 150.000 untuk transaksi minimal Rp 1.000.000.',
    discountType: 'fixed',
    discountValue: 150000,
    minTransaction: 1000000,
    validUntil: '2026-11-30',
    applicableCategory: 'all',
    usageLimit: 500,
    usedCount: 189,
    active: true
  },
  {
    code: 'HOTELHEMAT',
    title: 'Diskon 10% Khusus Hotel & Resort',
    description: 'Nikmati menginap hemat di hotel dan resort pilihan dengan potongan 10%.',
    discountType: 'percentage',
    discountValue: 10,
    minTransaction: 400000,
    maxDiscount: 250000,
    validUntil: '2026-12-15',
    applicableCategory: 'hotels',
    usageLimit: 800,
    usedCount: 420,
    active: true
  },
  {
    code: 'WISATAASIK',
    title: 'Diskon 20% Paket Wisata & Tur',
    description: 'Diskon spesial 20% untuk petualangan ke Labuan Bajo, Bromo, dan Raja Ampat.',
    discountType: 'percentage',
    discountValue: 20,
    minTransaction: 800000,
    maxDiscount: 500000,
    validUntil: '2026-12-31',
    applicableCategory: 'packages',
    usageLimit: 300,
    usedCount: 77,
    active: true
  },
  {
    code: 'KERETANYAMAN',
    title: 'Potongan Rp 50.000 Kereta Api',
    description: 'Potongan langsung untuk tiket kereta api eksekutif dan luxury KAI.',
    discountType: 'fixed',
    discountValue: 50000,
    minTransaction: 250000,
    validUntil: '2026-11-15',
    applicableCategory: 'trains',
    usageLimit: 400,
    usedCount: 310,
    active: true
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bkg-demo-101',
    orderNumber: 'ORD-2026-8812',
    bookingCode: 'JLJ-2026-8812',
    userId: 'usr-001',
    productType: 'flight',
    productId: 'fl-01',
    productTitle: 'Garuda Indonesia GA-408 (CGK → DPS)',
    productSubtitle: 'Jakarta ke Bali · 2 Penumpang · Ekonomi',
    productImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    bookingDate: '2026-10-18',
    travelDate: '2026-11-15',
    quantity: 2,
    unitName: 'Penumpang',
    contactDetails: {
      fullName: 'Budi Pratama',
      email: 'budi.pratama@gmail.com',
      phone: '081234567890'
    },
    travelers: [
      {
        title: 'Tuan',
        fullName: 'Budi Pratama',
        idType: 'KTP',
        idNumber: '3171012304900001',
        type: 'Dewasa',
        nationality: 'Indonesia'
      },
      {
        title: 'Nyonya',
        fullName: 'Siti Rahmawati',
        idType: 'KTP',
        idNumber: '3171016509920002',
        type: 'Dewasa',
        nationality: 'Indonesia'
      }
    ],
    priceBreakdown: {
      basePrice: 1820000,
      units: 2,
      subtotal: 3640000,
      tax: 400400,
      serviceFee: 15000,
      discount: 300000,
      appliedVoucherCode: 'JELAJAHINDONESIA',
      totalAmount: 3755400
    },
    paymentMethod: 'BCA Virtual Account (Demo)',
    paymentStatus: 'berhasil',
    bookingStatus: 'Dikonfirmasi',
    createdAt: '2026-10-18T10:30:00Z',
    paidAt: '2026-10-18T10:45:00Z'
  },
  {
    id: 'bkg-demo-102',
    orderNumber: 'ORD-2026-9043',
    bookingCode: 'JLJ-2026-9043',
    userId: 'usr-001',
    productType: 'hotel',
    productId: 'ht-01',
    productTitle: 'Maya Ubud Resort & Spa Sanctuary',
    productSubtitle: 'Superior Forest View Room · 2 Malam',
    productImage: ASSET_BALI_RESORT,
    bookingDate: '2026-10-19',
    travelDate: '2026-11-15',
    travelEndDate: '2026-11-17',
    quantity: 2,
    unitName: 'Malam Menginap',
    contactDetails: {
      fullName: 'Budi Pratama',
      email: 'budi.pratama@gmail.com',
      phone: '081234567890'
    },
    travelers: [
      {
        title: 'Tuan',
        fullName: 'Budi Pratama',
        idType: 'KTP',
        idNumber: '3171012304900001',
        type: 'Dewasa',
        nationality: 'Indonesia'
      }
    ],
    priceBreakdown: {
      basePrice: 2850000,
      units: 2,
      subtotal: 5700000,
      tax: 627000,
      serviceFee: 20000,
      discount: 250000,
      appliedVoucherCode: 'HOTELHEMAT',
      totalAmount: 6097000
    },
    paymentMethod: 'QRIS Gopay/Dana (Demo)',
    paymentStatus: 'berhasil',
    bookingStatus: 'Dikonfirmasi',
    createdAt: '2026-10-19T14:10:00Z',
    paidAt: '2026-10-19T14:15:00Z'
  }
];

export const DEMO_TESTIMONIALS = [
  {
    id: 't-1',
    author: 'Rian Prasetyo',
    role: 'Traveler Solo',
    city: 'Surabaya',
    trip: 'Open Trip Liveaboard Komodo 3H2M',
    text: 'Pengalaman pertama memesan tur melalui Jelajahin sangat mulus. Informasi itinerary sangat transparan, kru kapal ramah, dan spot diving manta di Labuan Bajo luar biasa memuaskan.',
    avatar: 'RP',
    rating: 5
  },
  {
    id: 't-2',
    author: 'Dian & Satrio',
    role: 'Pasangan Bulan Madu',
    city: 'Jakarta Selatan',
    trip: 'Resort Maya Ubud & Tur Nusa Penida',
    text: 'Harga yang tertera di awal sama persis dengan tagihan akhir tanpa biaya tersembunyi. Proses check-in hotel langsung terverifikasi dengan voucher digital demo yang rapi.',
    avatar: 'DS',
    rating: 5
  },
  {
    id: 't-3',
    author: 'Keluarga Hendra Wijaya',
    role: 'Liburan Keluarga (4 Orang)',
    city: 'Bandung',
    trip: 'Kereta Taksaka & Tur Candi Yogyakarta',
    text: 'Pilihan tiket kereta eksekutif dan tur budaya untuk keluarga sangat praktis. Customer support responsif saat kami menanyakan petunjuk penjemputan stasiun.',
    avatar: 'HW',
    rating: 5
  }
];

export const ARTICLES_INSPIRATION = [
  {
    id: 'art-01',
    title: 'Panduan Lengkap Liburan ke Labuan Bajo: Rute, Tiket & Waktu Terbaik',
    readTime: '6 menit baca',
    category: 'Panduan Wisata',
    image: ASSET_HERO_TRAVEL,
    summary: 'Ketahui musim terbaik untuk berlayar di laut Flores, tips memilih kapal Phinisi yang tepat, dan barang bawaan wajib saat trekking ke puncak Pulau Padar.'
  },
  {
    id: 'art-02',
    title: '5 Spot Sunrise Tercantik di Bromo Selain Penanjakan 1',
    readTime: '4 menit baca',
    category: 'Inspirasi Alam',
    image: ASSET_BROMO_SUNRISE,
    summary: 'Hindari kerumunan wisatawan dengan mendatangi spot sunrise alternatif seperti Bukit Cinta, King Kong Hill, dan Seruni Point dengan view lautan pasir megah.'
  },
  {
    id: 'art-03',
    title: 'Tips Memilih Villa & Hotel Keluarga Nyaman di Ubud Bali',
    readTime: '5 menit baca',
    category: 'Akomodasi',
    image: ASSET_BALI_RESORT,
    summary: 'Rekomendasi area menginap yang ramah anak, dekat persawahan asri, dan memiliki akses mudah ke restoran lokal serta galeri seni Ubud.'
  }
];
