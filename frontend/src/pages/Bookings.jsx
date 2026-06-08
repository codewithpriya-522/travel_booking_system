import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  Users, 
  ChevronRight, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  X, 
  CreditCard, 
  ArrowRight,
  Info,
  ShieldCheck,
  Ticket
} from 'lucide-react';
import bookingService from '../services/bookingService';
import { Link } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.getAllBookings();
        setBookings(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg relative overflow-hidden">
      {}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-60 pointer-events-none"></div>

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-primary font-black text-sm uppercase tracking-[0.2em] mb-4 block text-center md:text-left">Your Travel Portfolio</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-dark leading-tight text-center md:text-left">
            My <span className="text-gradient">Bookings</span>
          </h1>
          <p className="text-dark/50 font-medium text-lg mt-4 text-center md:text-left">
            Manage your exclusive journeys and upcoming adventures in one place.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full mb-6" />
            <p className="text-dark/40 font-black uppercase tracking-widest text-xs">Accessing Records...</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <motion.div 
                  key={booking._id} 
                  variants={itemVariants}
                  onClick={() => setSelectedBooking(booking)}
                  className="group glass-panel p-6 md:p-8 rounded-[32px] cursor-pointer hover:shadow-2xl hover:shadow-primary/5 transition-all border-2 border-white/60 flex flex-col md:flex-row gap-8 items-center"
                >
                  {}
                  <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                    <img 
                      src={booking.packageId?.image || 'https://via.placeholder.com/400'} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-grow text-center md:text-left w-full">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                      <h3 className="text-2xl font-black text-dark tracking-tight leading-none">
                        {booking.packageId?.title || 'Bespoke Experience'}
                      </h3>
                      <span className={`inline-flex self-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        booking.status === 'confirmed' ? 'bg-cta/10 text-cta' : 
                        booking.status === 'cancelled' ? 'bg-red-50 text-red-600' : 
                        'bg-primary/10 text-primary'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-sm font-bold text-dark/40 uppercase tracking-tight">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        <span>{booking.packageId?.destination || 'Global'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-primary" />
                        <span>{booking.seats} Guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-primary" />
                        <span>{new Date(booking.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:text-right shrink-0 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-dark/5 flex flex-row md:flex-col justify-between items-center md:items-end gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Investment</p>
                      <p className="text-3xl font-black text-primary tracking-tighter">₹{booking.totalPrice?.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-dark/5 flex items-center justify-center text-dark/20 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div variants={itemVariants} className="glass-panel p-20 rounded-[40px] border-dashed border-2 text-center">
                <div className="w-24 h-24 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Briefcase className="text-primary/30" size={48} />
                </div>
                <h3 className="text-3xl font-black text-dark mb-4 tracking-tighter">No journeys found</h3>
                <p className="text-dark/50 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                  You haven't secured any reservations yet. Discover our curated collection of extraordinary destinations.
                </p>
                <Link to="/packages" className="btn-premium inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-primary/20">
                  Begin Exploring <ArrowRight size={20} />
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-2xl w-full bg-white rounded-[48px] overflow-hidden shadow-2xl border-2 border-white/60 my-8 max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedBooking(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-dark transition-all"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto scrollbar-hide scroll-smooth flex-1">
                {/* Header */}
                <div className="relative h-48 md:h-64 overflow-hidden shrink-0">
                  <img 
                    src={selectedBooking.packageId?.image || 'https:
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                </div>

                <div className="px-10 pb-12 -mt-12 relative z-10">
                <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl border border-dark/5">
                  <div className="flex justify-between items-start gap-4 mb-8">
                    <div>
                      <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Reservation ID: #{selectedBooking._id.slice(-6).toUpperCase()}</span>
                      <h2 className="text-3xl font-black text-dark tracking-tighter leading-tight">
                        {selectedBooking.packageId?.title}
                      </h2>
                    </div>
                    <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shrink-0 ${
                      selectedBooking.status === 'confirmed' ? 'bg-cta/10 text-cta' : 'bg-primary/10 text-primary'
                    }`}>
                      {selectedBooking.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-4">Traveler Information</h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                              <Ticket size={16} />
                            </div>
                            <span className="text-sm font-bold text-dark">{selectedBooking.customerName}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                              <Users size={16} />
                            </div>
                            <span className="text-sm font-bold text-dark">{selectedBooking.seats} Travelers Reserved</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-4">Destination</h4>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                            <MapPin size={16} />
                          </div>
                          <span className="text-sm font-bold text-dark">{selectedBooking.packageId?.destination}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-bg rounded-3xl p-6 border border-dark/5">
                        <h4 className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-6">Financial Summary</h4>
                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-dark/50">Base Investment</span>
                            <span className="text-dark">₹{selectedBooking.packageId?.price.toLocaleString('en-IN')} × {selectedBooking.seats}</span>
                          </div>
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-dark/50">Service & Concierge</span>
                            <span className="text-cta uppercase tracking-widest text-[10px]">Included</span>
                          </div>
                          <div className="h-px bg-dark/5" />
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-dark/40 tracking-widest">Total Paid</span>
                            <span className="text-2xl font-black text-primary tracking-tighter">₹{selectedBooking.totalPrice.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-cta uppercase tracking-widest">
                          <ShieldCheck size={12} />
                          Securely Processed
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => setSelectedBooking(null)}
                      className="flex-1 px-8 py-5 rounded-2xl bg-dark text-white font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-dark/10"
                    >
                      Close Details
                    </button>
                    <Link 
                      to={`/package/${selectedBooking.packageId?._id}`}
                      className="flex-1 px-8 py-5 rounded-2xl bg-white border border-dark/10 text-dark font-black text-sm uppercase tracking-widest hover:bg-bg transition-all flex items-center justify-center gap-2"
                    >
                      View Destination <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bookings;