import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowLeft, ArrowRight, Compass, Filter, IndianRupee, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import packageService from '../services/packageService';
import PackageCard from '../components/common/PackageCard';
import useDebounce from '../hooks/useDebounce';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const PackageListing = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('-createdAt');

  
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalRecords: 0
  });
  const limit = 6;

  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  useEffect(() => {
    fetchPackages();
  }, [debouncedSearchTerm, debouncedMinPrice, debouncedMaxPrice, sort, page]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      
      const params = {
        sort,
        page,
        limit
      };

      if (debouncedSearchTerm) {
        params.destination = debouncedSearchTerm;
      }
      if (debouncedMinPrice) {
        params.minPrice = debouncedMinPrice;
      }
      if (debouncedMaxPrice) {
        params.maxPrice = debouncedMaxPrice;
      }

      const response = await packageService.getPackages(params);
      setPackages(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSort('-createdAt');
    setPage(1);
  }

  const getPaginationNumbers = () => {
    const total = pagination.totalPages;
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (page <= 3) {
      return [1, 2, 3, 4, '...', total];
    }
    if (page >= total - 2) {
      return [1, '...', total - 3, total - 2, total - 1, total];
    }
    return [1, '...', page - 1, page, page + 1, '...', total];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden bg-bg">
      {}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] opacity-70 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-black text-sm uppercase tracking-[0.2em] mb-4 block">Destination Discovery</span>
          <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter">
            Where to <span className="text-gradient">Next?</span>
          </h1>
          <p className="text-dark/60 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Uncover the world's most extraordinary hidden gems and legendary landmarks.
          </p>

          {user && user.role === 'admin' && (
            <div className="mt-8 flex justify-center">
              <Link
                to="/add-package"
                className="btn-premium inline-flex items-center gap-2 bg-dark text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-dark/20 hover:bg-primary transition-all"
              >
                <Plus size={18} /> Add New Package
              </Link>
            </div>
          )}
        </motion.div>

        {/* Filters Bar - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-[32px] p-6 mb-12 shadow-xl shadow-dark/5"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-end">

            {/* Name/Destination Search */}
            <div className="relative flex-grow w-full">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/40 mb-2 block ml-2">Search Destination</label>
              <Search className="absolute left-6 bottom-5 text-primary" size={20} />
              <input
                type="text"
                placeholder="Where are you going?"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-14 pr-6 py-4 bg-white/50 border border-white/80 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all text-dark font-bold placeholder-dark/30 shadow-inner"
              />
            </div>

            {/* Price Filter (Min) */}
            <div className="relative w-full lg:w-48 shrink-0">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/40 mb-2 block ml-2">Min Price</label>
              <IndianRupee className="absolute left-4 bottom-5 text-dark/40" size={16} />
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-4 bg-white/50 border border-white/80 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all text-dark font-bold placeholder-dark/30 shadow-inner"
              />
            </div>

            {/* Price Filter (Max) */}
            <div className="relative w-full lg:w-48 shrink-0">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/40 mb-2 block ml-2">Max Price</label>
              <IndianRupee className="absolute left-4 bottom-5 text-dark/40" size={16} />
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-4 bg-white/50 border border-white/80 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all text-dark font-bold placeholder-dark/30 shadow-inner"
              />
            </div>

            {/* Sort */}
            <div className="w-full lg:w-64 shrink-0 relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/40 mb-2 block ml-2">Sort By</label>
              <Filter className="absolute left-6 bottom-5 text-primary" size={20} />
              <select
                value={sort}
                onChange={handleSortChange}
                className="w-full pl-14 pr-10 py-4 bg-white/50 border border-white/80 rounded-2xl outline-none cursor-pointer font-bold text-dark focus:ring-4 focus:ring-primary/10 transition-all appearance-none shadow-inner"
              >
                <option value="-createdAt">Newest Experiences</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute right-6 bottom-5 text-dark/30 pointer-events-none" size={18} />
            </div>

          </div>
        </motion.div>

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10 flex justify-between items-center px-4"
          >
            <p className="text-dark/50 font-black tracking-widest uppercase text-xs">
              Showing <span className="text-primary">{pagination.totalRecords}</span> unique experiences
            </p>
            {(searchTerm || minPrice || maxPrice || sort !== '-createdAt') && (
              <button onClick={clearFilters} className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors">
                Clear Filters
              </button>
            )}
          </motion.div>
        )}

        {/* Grid Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full mb-6"
              />
              <p className="text-dark/40 font-bold uppercase tracking-widest text-sm">Curating Results...</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20"
            >
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <motion.div
                    key={pkg._id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    <PackageCard pkg={pkg} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full glass-panel rounded-[40px] p-24 text-center border-dashed border-2"
                >
                  <div className="w-24 h-24 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Compass className="text-primary/30" size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-dark mb-4 tracking-tighter">No results found</h3>
                  <p className="text-dark/60 font-medium max-w-sm mx-auto leading-relaxed">
                    We couldn't find any destinations matching your exact search criteria. Try adjusting your price range or destination keywords.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-8 bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {}
        {!loading && pagination.totalPages > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 bg-white/40 backdrop-blur-md p-4 md:p-6 rounded-3xl border border-white/60 shadow-lg"
          >
            <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-dark/60 bg-white/50 px-4 py-3 rounded-2xl border border-white/80 shadow-sm w-full md:w-auto justify-center md:justify-start">
              <span>Show</span>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-transparent font-black text-primary outline-none cursor-pointer"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
              <span>per page</span>
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 md:gap-4 w-full md:w-auto flex-wrap">
                <button
                  disabled={page === 1}
                  onClick={() => { setPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white border border-dark/5 text-dark hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="flex items-center gap-1 md:gap-2">
                  {getPaginationNumbers().map((num, i) => (
                    <button
                      key={i}
                      disabled={num === '...'}
                      onClick={() => {
                        if (num !== '...') {
                          setPage(num);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl font-black text-sm md:text-base transition-all ${page === num
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : num === '...'
                          ? 'bg-transparent text-dark/40 cursor-default'
                          : 'bg-white border border-dark/5 text-dark/40 hover:text-dark hover:border-dark/20'
                        }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === pagination.totalPages}
                  onClick={() => { setPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white border border-dark/5 text-dark hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PackageListing;