/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { BookingProvider } from './context/BookingContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { FlightsPage } from './pages/FlightsPage';
import { TrainsPage } from './pages/TrainsPage';
import { BusesPage } from './pages/BusesPage';
import { HotelsPage } from './pages/HotelsPage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentSimulationPage } from './pages/PaymentSimulationPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { WishlistPage } from './pages/WishlistPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { HelpPage } from './pages/HelpPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  const renderRoute = () => {
    // Root
    if (path === '/' || path === '') {
      return <HomePage />;
    }

    // Flights
    if (path === '/flights') {
      return <FlightsPage />;
    }

    // Trains
    if (path === '/trains') {
      return <TrainsPage />;
    }

    // Buses
    if (path === '/buses') {
      return <BusesPage />;
    }

    // Hotels
    if (path === '/hotels') {
      return <HotelsPage />;
    }
    if (path.startsWith('/hotels/')) {
      return <HotelDetailPage />;
    }

    // Packages
    if (path === '/packages') {
      return <PackagesPage />;
    }
    if (path.startsWith('/packages/')) {
      return <PackageDetailPage />;
    }

    // Activities
    if (path === '/activities') {
      return <ActivitiesPage />;
    }
    if (path.startsWith('/activities/')) {
      return <ActivityDetailPage />;
    }

    // Checkout & Payment
    if (path === '/checkout') {
      return <CheckoutPage />;
    }
    if (path === '/payment') {
      return <PaymentSimulationPage />;
    }
    if (path.startsWith('/booking/')) {
      return <BookingConfirmationPage />;
    }

    // User & Bookings
    if (path === '/my-bookings') {
      return <MyBookingsPage />;
    }
    if (path === '/wishlist') {
      return <WishlistPage />;
    }
    if (path === '/profile') {
      return <UserProfilePage />;
    }
    if (path === '/login') {
      return <LoginPage />;
    }
    if (path === '/register') {
      return <RegisterPage />;
    }

    // Help & FAQ
    if (path === '/help') {
      return <HelpPage />;
    }

    // Admin routes
    if (
      path === '/admin' ||
      path.startsWith('/admin/') ||
      path === '/admin/products' ||
      path === '/admin/bookings' ||
      path === '/admin/vouchers' ||
      path === '/admin/users'
    ) {
      return <AdminDashboard />;
    }

    return <NotFoundPage />;
  };

  const isAdminRoute = path.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />
      <main className="flex-1">{renderRoute()}</main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <WishlistProvider>
          <BookingProvider>
            <AppContent />
          </BookingProvider>
        </WishlistProvider>
      </AuthProvider>
    </RouterProvider>
  );
}
