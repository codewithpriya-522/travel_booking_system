import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, Shield, Clock, ArrowLeft, ArrowRight, Star, CheckCircle2, ChevronRight, Share2, Heart } from 'lucide-react';
import packageService from '../services/packageService';
import { AuthContext } from '../context/AuthContext';

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await packageService.getPackageById(id);
        setPkg(response.data.data);
      } catch (error) {
        console.error('Error fetching package details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full mb-6"
        />
        <p className="text-dark/40 font-black uppercase tracking-widest text-sm">Loading Experience...</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel rounded-[40px] p-16 text-center max-w-lg shadow-2xl"
        >
          <h2 className="text-4xl font-black text-dark mb-4 tracking-tighter">Package Not Found</h2>
          <p className="text-dark/60 mb-8 font-medium">The destination you are looking for might have been removed or is temporarily unavailable.</p>
          <Link to="/packages" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl font-black transition-all hover:bg-dark shadow-xl shadow-primary/20">
            <ArrowLeft size={20} />
            Explore Destinations
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-32 min-h-screen bg-bg relative overflow-hidden">
      {}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-70 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 pt-32 relative z-10">
        {}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/packages" className="inline-flex items-center gap-2 text-dark/50 font-bold hover:text-primary transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {}
          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-[48px] overflow-hidden shadow-2xl h-[60vh] group"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>

              <div className="absolute bottom-12 left-12 right-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <span className="py-2 px-5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-black text-xs uppercase tracking-widest shadow-sm">
                    Premium Experience
                  </span>
                  <div className="flex items-center gap-1 text-cta">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-cta" />)}
                  </div>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-tight"
                >
                  {pkg.title}
                </motion.h1>
              </div>

              {}
              <div className="absolute top-8 right-8 flex gap-3">
                <button className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                  <Heart size={20} />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>

            {}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Clock />, label: 'Duration', value: pkg.duration, color: 'text-primary' },
                { icon: <Users />, label: 'Availability', value: `${pkg.availableSeats} Seats`, color: 'text-secondary' },
                { icon: <Calendar />, label: 'Start Date', value: new Date(pkg.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), color: 'text-cta' },
                { icon: <Shield />, label: 'Quality', value: 'Verified', color: 'text-dark' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-card p-6 rounded-3xl flex flex-col items-center text-center group hover:bg-white transition-colors"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(stat.icon, { size: 20 })}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-dark/40 font-black mb-1">{stat.label}</span>
                  <span className="text-sm font-black text-dark">{stat.value}</span>
                </motion.div>
              ))}
            </div>

            {}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="glass-panel p-10 md:p-16 rounded-[48px]"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-10 bg-primary rounded-full"></div>
                <h3 className="text-4xl font-black text-dark tracking-tighter">The Journey</h3>
              </div>
              <p className="text-dark/70 text-xl leading-[1.8] whitespace-pre-line font-medium mb-12">
                {pkg.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-black text-dark mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-cta" size={20} />
                    What's Included
                  </h4>
                  {['Ultra-luxury accommodation', 'All internal logistics', 'Private gourmet dining', 'Bespoke guided tours'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-dark/60 font-bold">
                      <ChevronRight size={16} className="text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                  <h4 className="text-lg font-black text-primary mb-4">Pro Tip</h4>
                  <p className="text-dark/60 font-medium leading-relaxed">
                    We recommend booking at least 3 months in advance to ensure the best placement in our premium suites.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="sticky top-32 glass-panel p-10 rounded-[48px] border-2 border-white/60 bg-white/60 shadow-2xl shadow-dark/5"
            >
              <div className="text-center mb-10">
                <span className="text-dark/30 font-black tracking-[0.2em] text-[10px] uppercase mb-4 block">Exclusive Pricing</span>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl font-black text-dark/30 mt-2">₹</span>
                  <span className="text-7xl font-black text-primary tracking-tighter">{pkg.price.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-dark/50 font-bold text-sm tracking-wide">All-inclusive per traveler</p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center py-4 border-b border-dark/5">
                  <span className="text-dark/50 font-bold uppercase tracking-widest text-[10px]">Destination</span>
                  <span className="text-dark font-black flex items-center gap-1">
                    <MapPin size={14} className="text-primary" />
                    {pkg.destination}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-dark/5">
                  <span className="text-dark/50 font-bold uppercase tracking-widest text-[10px]">Experience</span>
                  <span className="text-dark font-black">Private Boutique</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-dark/50 font-bold uppercase tracking-widest text-[10px]">Status</span>
                  <span className="text-cta font-black flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    Available
                  </span>
                </div>
              </div>

              <Link
                to={user ? `/book/${pkg._id}` : `/login`}
                state={!user ? { from: `/book/${pkg._id}` } : null}
                className="btn-premium group block w-full text-center bg-primary text-white px-8 py-6 rounded-3xl text-xl font-black transition-all hover:bg-dark shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                Reserve Your Spot
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-8 flex items-center justify-center gap-4 text-dark/30">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-[10px] text-white font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest">
                  12 others booked recently
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;