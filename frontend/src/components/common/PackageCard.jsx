import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, ArrowUpRight, Shield } from 'lucide-react';

const PackageCard = ({ pkg }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group glass-card rounded-[32px] overflow-hidden flex flex-col h-full bg-white/40 backdrop-blur-md border border-white/60"
    >
      {}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <Star size={14} className="text-cta fill-cta" />
            <span className="text-xs font-black text-dark">4.9</span>
          </div>
          {pkg.price > 2000 && (
            <div className="bg-primary/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <Shield size={14} className="text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-tighter">Premium</span>
            </div>
          )}
        </div>
        {}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60"></div>
        {}
        <div className="absolute bottom-4 left-4">
          <p className="text-white text-3xl font-black tracking-tighter">
            ₹{pkg.price.toLocaleString('en-IN')}<span className="text-sm font-medium opacity-80 ml-1">/person</span>
          </p>
        </div>
      </div>

      {}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
          <MapPin size={14} />
          {pkg.destination}
        </div>
        
        <h3 className="text-2xl font-black text-dark mb-4 leading-tight group-hover:text-primary transition-colors">
          {pkg.title}
        </h3>
        
        <p className="text-dark/60 font-medium text-sm line-clamp-3 mb-6 leading-relaxed">
          {pkg.description}
        </p>

        <div className="mt-auto pt-6 border-t border-dark/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-dark/50 text-xs font-bold">
            <Calendar size={14} />
            <span>Seasonal Availability</span>
          </div>
          
          <Link 
            to={`/package/${pkg._id}`}
            className="w-12 h-12 rounded-2xl bg-dark text-white flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:rotate-45"
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;