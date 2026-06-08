import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, MapPin, Star, ShieldCheck, Globe, Zap, Users, Calendar, Award, MessageCircle, HelpCircle, ChevronDown } from 'lucide-react';

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass-card rounded-3xl overflow-hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="p-8 flex items-center justify-between gap-4">
        <h3 className="text-xl font-black text-dark flex items-start gap-3 m-0">
          <HelpCircle className="text-primary shrink-0 mt-1" size={20} />
          {faq.q}
        </h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={24} className="text-dark/40" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <p className="text-dark/60 font-medium px-8 pb-8 pl-14 m-0">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
import packageService from '../services/packageService';
import PackageCard from '../components/common/PackageCard';

const Home = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await packageService.getPackages({ limit: 3 });
        setPackages(response.data.data);
      } catch (error) {
        console.error('Error fetching featured packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      
      navigate(`/packages?search=${searchQuery}`);
    } else {
      navigate('/packages');
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="w-full pt-32 pb-20 bg-bg">
      {}
      {}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        <motion.div 
          className="relative z-10 max-w-[1000px] mx-auto text-center w-full"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-primary font-bold text-xs uppercase tracking-widest shadow-sm">
            <Star size={14} className="fill-primary" /> The Gold Standard in Luxury Travel
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-dark mb-8 leading-[1.1] tracking-tighter">
            Escape to the <br/> <span className="text-gradient">Extraordinary</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-dark/60 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Unlock exclusive access to the world's most breathtaking destinations and bespoke experiences.
          </motion.p>
          
          <motion.form variants={fadeUp} onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border border-white p-2 rounded-full shadow-2xl flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center px-6 gap-3">
              <Search className="text-primary" size={20} />
              <input 
                type="text" 
                placeholder="Where do you want to go?" 
                className="w-full bg-transparent border-none outline-none py-4 text-dark font-bold placeholder-dark/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-primary text-white px-8 py-4 rounded-full font-black hover:bg-dark transition-colors shrink-0">
              Search
            </button>
          </motion.form>
        </motion.div>
      </section>

      {/* 2. POPULAR DESTINATIONS */}
      {/* Conversion Goal: Visual inspiration. Reduces paradox of choice by offering curated categories. */}
      <section className="py-24 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">Trending Locations</h2>
            <p className="text-dark/60 text-lg font-medium">Explore the most sought-after regions this season.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'European Alps', img: 'https:
              { name: 'Kyoto, Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', span: 'col-span-2 md:col-span-1' },
              { name: 'Santorini', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac542?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', span: 'col-span-2 md:col-span-1' },
              { name: 'Tulum, Greece', img: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', span: 'col-span-2 md:col-span-2' }
            ].map((dest, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl overflow-hidden group cursor-pointer h-64 md:h-auto min-h-[250px] ${dest.span}`}
              >
                <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-white text-2xl font-black">{dest.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 relative bg-white/30 backdrop-blur-3xl rounded-[60px] mx-4 md:mx-8 shadow-inner border border-white/40">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-primary font-black text-sm uppercase tracking-widest mb-4 block">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl text-dark font-black mb-4 leading-tight">Featured Experiences</h2>
              <p className="text-dark/60 text-lg font-medium">Handpicked itineraries representing the pinnacle of global travel.</p>
            </div>
            <Link to="/packages" className="group btn-premium bg-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-primary transition-colors">
              Explore All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-20"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>
            ) : packages.map((pkg, i) => (
              <motion.div key={pkg._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <PackageCard pkg={pkg} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      {}
      <section className="py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">The TravelEase Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck />, title: 'Secure Booking', desc: 'Bank-level encryption and flexible cancellation policies for complete peace of mind.' },
              { icon: <Globe />, title: 'Expert Curation', desc: 'Every itinerary is personally verified by our network of local luxury travel experts.' },
              { icon: <Zap />, title: '24/7 Concierge', desc: 'Dedicated global support via chat, phone, or email throughout your entire journey.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-10 rounded-[32px] text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">{React.cloneElement(f.icon, { size: 32 })}</div>
                <h3 className="text-2xl font-black text-dark mb-4">{f.title}</h3>
                <p className="text-dark/60 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      {}
      <section className="py-20 bg-dark text-white rounded-[60px] mx-4 md:mx-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { num: '10K+', label: 'Happy Travelers', icon: <Users /> },
              { num: '50+', label: 'Countries', icon: <MapPin /> },
              { num: '4.9', label: 'Average Rating', icon: <Star /> },
              { num: '15+', label: 'Years Experience', icon: <Award /> }
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex justify-center mb-4 text-primary opacity-80">{React.cloneElement(stat.icon, { size: 28 })}</div>
                <div className="text-4xl md:text-5xl font-black mb-2">{stat.num}</div>
                <div className="text-xs uppercase tracking-widest text-white/60 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-16 text-center">Traveler Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Jenkins', loc: 'Maldives Retreat', text: '"Absolutely flawless execution. The concierge team anticipated needs we didn\'t even know we had. Best vacation of our lives."' },
              { name: 'David Chen', loc: 'Swiss Alps Expedition', text: '"The premium accommodations were breathtaking. A seamless experience from booking to departure."' },
              { name: 'Elena Rodriguez', loc: 'Kyoto Cultural Tour', text: '"TravelEase gave us access to experiences that felt truly exclusive. Worth every penny for the peace of mind."' }
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel p-10 rounded-[32px]">
                <div className="flex gap-1 text-cta mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-cta" />)}
                </div>
                <p className="text-dark/80 text-lg font-medium italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-black text-dark">{t.name}</h4>
                    <p className="text-xs font-bold text-dark/40 uppercase tracking-widest">{t.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-16 border-y border-dark/5 bg-white/50">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-dark/40 mb-8">Trusted by Global Carriers</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {}
            <div className="text-2xl font-black tracking-tighter">Emirates</div>
            <div className="text-2xl font-black tracking-tighter">Singapore Airlines</div>
            <div className="text-2xl font-black tracking-tighter">Delta</div>
            <div className="text-2xl font-black tracking-tighter">Qatar</div>
          </div>
        </div>
      </section>

      {}
      <section className="py-32 max-w-[800px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-6">
          {[
            { q: 'What is included in the premium packages?', a: 'Our packages are all-inclusive: luxury accommodations, expert private guides, curated dining, and 24/7 concierge support. Flights are handled separately unless specified.' },
            { q: 'What is your cancellation policy?', a: 'We offer full refunds for cancellations made up to 30 days before departure on most packages. Specific terms vary by destination.' },
            { q: 'Can itineraries be customized?', a: 'Absolutely. Once you secure a spot, our concierge team will reach out to tailor the experience to your specific preferences.' }
          ].map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </section>

      {}
      <section className="py-32 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-[1200px] mx-auto bg-primary rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full -ml-20 -mb-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-white font-black mb-6 leading-tight">Ready for your next adventure?</h2>
            <p className="text-white/80 text-xl font-medium mb-10">Join our inner circle for exclusive offers and hidden gems.</p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md font-bold" />
              <button type="submit" className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg hover:bg-dark hover:text-white transition-all shadow-xl">
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      {}
    </div>
  );
};

export default Home;