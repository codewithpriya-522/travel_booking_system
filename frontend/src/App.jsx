import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import AdminRoute from './components/common/AdminRoute';
import Home from './pages/Home';
import PackageListing from './pages/PackageListing';
import PackageDetails from './pages/PackageDetails';
import BookingPage from './pages/BookingPage';
import AddPackage from './pages/AddPackage';
import Bookings from './pages/Bookings';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-bg">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/packages" element={<PackageListing />} />
              <Route path="/package/:id" element={<PackageDetails />} />
              <Route path="/book/:id" element={<BookingPage />} />
              <Route 
                path="/add-package" 
                element={
                  <AdminRoute>
                    <AddPackage />
                  </AdminRoute>
                } 
              />
              <Route path="/bookings" element={<Bookings />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
