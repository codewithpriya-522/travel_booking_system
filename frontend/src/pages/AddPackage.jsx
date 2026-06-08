import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  PackagePlus, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Users, 
  Calendar as CalendarIcon, 
  Image as ImageIcon, 
  AlignLeft,
  ArrowLeft,
  CheckCircle2,
  Info
} from 'lucide-react';
import packageService from '../services/packageService';

const AddPackage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await packageService.addPackage(data);
      toast.success('Package added successfully!');
      navigate('/packages');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add package.');
    } finally {
      setSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg relative overflow-hidden">
      {}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] opacity-60 pointer-events-none"></div>

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-dark/40 font-bold hover:text-primary transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center md:text-left"
        >
          <span className="text-primary font-black text-sm uppercase tracking-[0.2em] mb-4 block">Admin Controls</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-dark leading-tight">
            Create <span className="text-gradient">Experience</span>
          </h1>
          <p className="text-dark/50 font-medium text-lg mt-4 max-w-2xl">
            Design and publish a new luxury travel package to the global portfolio.
          </p>
        </motion.div>

        <motion.div 
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="glass-panel p-8 md:p-14 rounded-[48px] shadow-2xl border-2 border-white/60 bg-white/40"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {}
            <div className="bg-white/50 p-6 md:p-8 rounded-[32px] border border-white/80 shadow-sm">
              <h3 className="text-lg font-black text-dark flex items-center gap-2 mb-6">
                <PackagePlus className="text-primary" size={20} />
                Core Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Package Title</label>
                  <div className="relative">
                    <input 
                      {...register('title', { required: 'Title is required' })}
                      className={`w-full px-6 py-4 bg-white/80 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.title ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                      placeholder="e.g. Exclusive Alpine Ski Resort"
                    />
                  </div>
                  {errors.title && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <input 
                      {...register('destination', { required: 'Destination is required' })}
                      className={`w-full pl-14 pr-6 py-4 bg-white/80 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.destination ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                      placeholder="e.g. Swiss Alps"
                    />
                  </div>
                  {errors.destination && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.destination.message}</p>}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Price per person</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <input 
                      type="number"
                      {...register('price', { required: 'Price is required', min: { value: 0, message: 'Must be positive' } })}
                      className={`w-full pl-14 pr-6 py-4 bg-white/80 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.price ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                      placeholder="e.g. 150000"
                    />
                  </div>
                  {errors.price && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.price.message}</p>}
                </div>
              </div>
            </div>

            {}
            <div className="bg-white/50 p-6 md:p-8 rounded-[32px] border border-white/80 shadow-sm">
              <h3 className="text-lg font-black text-dark flex items-center gap-2 mb-6">
                <Clock className="text-primary" size={20} />
                Logistics & Availability
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Duration String</label>
                  <div className="relative">
                    <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <input 
                      {...register('duration', { required: 'Duration is required' })}
                      className={`w-full pl-14 pr-6 py-4 bg-white/80 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.duration ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                      placeholder="e.g. 5 Days / 4 Nights"
                    />
                  </div>
                  {errors.duration && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.duration.message}</p>}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Total Capacity (Seats)</label>
                  <div className="relative">
                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <input 
                      type="number"
                      {...register('availableSeats', { required: 'Required', min: { value: 1, message: 'Min 1' } })}
                      className={`w-full pl-14 pr-6 py-4 bg-white/80 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.availableSeats ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                      placeholder="e.g. 12"
                    />
                  </div>
                  {errors.availableSeats && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.availableSeats.message}</p>}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Start Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <input 
                      type="date"
                      {...register('startDate', { required: 'Start date is required' })}
                      className={`w-full pl-14 pr-6 py-4 bg-white/80 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold text-sm ${errors.startDate ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                    />
                  </div>
                  {errors.startDate && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.startDate.message}</p>}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Cover Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <input 
                      {...register('image', { required: 'Image URL is required' })}
                      className={`w-full pl-14 pr-6 py-4 bg-white/80 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.image ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                      placeholder="https://..."
                    />
                  </div>
                  {errors.image && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.image.message}</p>}
                </div>
              </div>
            </div>

            {}
            <div className="bg-white/50 p-6 md:p-8 rounded-[32px] border border-white/80 shadow-sm">
              <h3 className="text-lg font-black text-dark flex items-center gap-2 mb-6">
                <AlignLeft className="text-primary" size={20} />
                Experience Narrative
              </h3>
              
              <div>
                <textarea 
                  {...register('description', { required: 'Description is required' })}
                  className={`w-full px-6 py-5 bg-white/80 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-medium placeholder-dark/20 h-48 resize-none ${errors.description ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                  placeholder="Craft a compelling story about this luxury experience..."
                ></textarea>
                {errors.description && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.description.message}</p>}
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={submitting}
                className="btn-premium group w-full bg-primary text-white py-6 rounded-3xl text-xl font-black shadow-2xl shadow-primary/20 hover:bg-dark transition-all flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Info size={24} /></motion.div>
                ) : (
                  <>
                    <CheckCircle2 size={24} />
                    Publish Experience
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPackage;