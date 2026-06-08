import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Briefcase, PlusCircle, LogOut, User, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Compass size={18} /> },
    { name: 'Destinations', path: '/packages', icon: <Briefcase size={18} /> },
  ];

  if (user) {
    navLinks.push({ name: 'My Bookings', path: '/bookings', icon: <User size={18} /> });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 px-6 py-4 ${
        isScrolled ? 'md:pt-4' : 'md:pt-8'
      }`}
    >
      <div 
        className={`max-w-[1400px] mx-auto transition-all duration-500 rounded-3xl flex items-center justify-between px-8 ${
          isScrolled 
          ? 'glass-panel h-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-2' 
          : 'bg-transparent h-20 py-4'
        }`}
      >
        {}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <Compass size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-dark">
            Travel<span className="text-primary">Ease</span>
          </span>
        </Link>

        {}
        <ul className="hidden md:flex items-center gap-8 m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-2 font-semibold transition-all duration-300 relative group ${
                  location.pathname === link.path ? 'text-primary' : 'text-dark/70 hover:text-primary'
                }`}
              >
                <span>{link.name}</span>
                <motion.div 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  } transition-all duration-300`}
                />
              </Link>
            </li>
          ))}
          
          {user && user.role === 'admin' && (
            <li>
              <Link 
                to="/add-package" 
                className="flex items-center gap-2 text-cta font-bold hover:scale-105 transition-transform"
              >
                <PlusCircle size={18} />
                <span>Add Package</span>
              </Link>
            </li>
          )}
        </ul>

        {}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link 
                to="/login" 
                className="text-dark font-bold hover:text-primary transition-colors px-4"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="btn-premium bg-primary text-white px-8 py-2.5 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-white/50 py-1.5 pl-1.5 pr-4 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold text-dark">{user.name.split(' ')[0]}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-2xl bg-white/50 border border-white/50 text-dark hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300"
                title="Log Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>

        {}
        <button 
          className="md:hidden p-2 text-dark hover:bg-white/50 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 overflow-hidden rounded-3xl glass-panel shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                    location.pathname === link.path ? 'bg-primary text-white' : 'bg-white/50 text-dark hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span className="font-bold">{link.name}</span>
                  </div>
                  <ChevronRight size={18} />
                </Link>
              ))}
              
              <div className="h-px bg-dark/5 my-2" />
              
              {!user ? (
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center p-4 rounded-2xl bg-white/50 text-dark font-bold"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center p-4 rounded-2xl bg-primary text-white font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 text-red-600 font-bold"
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;