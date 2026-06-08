import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { ShieldCheck, CreditCard, Users, CheckCircle2, ArrowRight, ArrowLeft, Info, Lock, Check } from 'lucide-react';
import packageService from '../services/packageService';
import bookingService from '../services/bookingService';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    defaultValues: { seats: 1, customerName: '', email: '' },
    mode: 'onTouched'
  });

  const requestedSeats = watch('seats');
  const formData = watch();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await packageService.getPackageById(id);
        setPkg(response.data.data);
      } catch (error) {
        toast.error('Failed to load details');
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
    window.scrollTo(0, 0);
  }, [id]);

  const handleNextStep = async () => {
    const isStepValid = await trigger(['customerName', 'email', 'seats']);
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setServerError('');
    try {
      await bookingService.createBooking({ packageId: id, ...data });
      setIsSuccess(true);
      setTimeout(() => navigate('/bookings'), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Booking failed. Please try again.';
      setServerError(msg);
      setCurrentStep(1); 
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-bg">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full mb-6" />
      <p className="text-dark/40 font-black uppercase tracking-widest text-sm">Securing Connection...</p>
    </div>
  );
  
  if (!pkg) return <div className="text-center py-40 text-dark font-black text-2xl">Experience not found.</div>;

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full glass-panel p-12 md:p-20 rounded-[48px] shadow-2xl text-center border-2 border-white/60">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }} className="w-24 h-24 bg-cta/10 text-cta rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-dark leading-tight">Booking Confirmed</h1>
          <p className="text-dark/60 mb-10 text-lg font-medium leading-relaxed">
            Congratulations, <span className="text-primary font-bold">{watch('customerName')}</span>. Your spot for <span className="text-primary font-bold">{pkg.title}</span> is secured.
          </p>
          <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden mb-6">
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3 }} className="h-full bg-primary" />
          </div>
          <p className="text-[10px] font-black text-dark/30 uppercase tracking-[0.3em]">Redirecting to your trips...</p>
        </motion.div>
      </div>
    );
  }

  
  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-60 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white border border-white/60 rounded-full z-0"></div>
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0"
              initial={{ width: '0%' }}
              animate={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
              transition={{ duration: 0.4 }}
            ></motion.div>
            
            {[
              { num: 1, label: 'Traveler Details' },
              { num: 2, label: 'Review & Verify' },
              { num: 3, label: 'Secure Payment' }
            ].map((step) => (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-colors duration-300 ${
                  currentStep > step.num ? 'bg-primary border-primary text-white' :
                  currentStep === step.num ? 'bg-white border-primary text-primary shadow-lg shadow-primary/20' :
                  'bg-white/50 border-white text-dark/30 backdrop-blur-md'
                }`}>
                  {currentStep > step.num ? <Check size={16} /> : step.num}
                </div>
                <span className={`absolute top-14 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap ${currentStep >= step.num ? 'text-primary' : 'text-dark/30'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          {}
          <div className="lg:col-span-7">
            <div className="glass-panel p-10 md:p-14 rounded-[40px] shadow-xl border-2 border-white/60 min-h-[500px]">
              
              {serverError && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl mb-8 flex items-start gap-4 text-sm font-bold">
                  <Info size={20} className="shrink-0" />
                  <p>{serverError}</p>
                </div>
              )}

              <AnimatePresence mode="wait">
                {}
                {currentStep === 1 && (
                  <motion.div key="step1" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-black text-dark tracking-tighter mb-2">Traveler Details</h2>
                      <p className="text-dark/50 font-medium">Please provide the lead guest information.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Primary Guest Name</label>
                        <input 
                          {...register('customerName', { required: 'Name is required' })}
                          className={`w-full px-6 py-4 bg-white/50 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.customerName ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                          placeholder="e.g. Alexander Pierce"
                        />
                        {errors.customerName && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.customerName.message}</p>}
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Email Address</label>
                        <input 
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                          })}
                          className={`w-full px-6 py-4 bg-white/50 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                          placeholder="alex@luxury.travel"
                        />
                        {errors.email && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.email.message}</p>}
                      </div>

                      <div className="pt-6 border-t border-dark/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-2 block">Number of Travelers</label>
                        </div>
                        <div className="flex items-center gap-4 bg-white/40 p-2 rounded-2xl border border-white/60">
                          <input 
                            type="number"
                            {...register('seats', { 
                              required: 'Required',
                              min: { value: 1, message: 'Min 1' },
                              max: { value: pkg.availableSeats, message: `Max ${pkg.availableSeats}` }
                            })}
                            className={`w-24 px-4 py-3 bg-white border border-white/80 rounded-xl outline-none text-center text-xl font-black text-primary ${errors.seats ? 'border-red-400' : 'focus:ring-2 focus:ring-primary/20'}`}
                          />
                          <div className="pr-4 text-xs font-black text-dark/30 uppercase tracking-widest flex items-center gap-2">
                            <Users size={14} /> Guests
                          </div>
                        </div>
                      </div>
                      {errors.seats && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-right">{errors.seats.message}</p>}
                    </div>

                    <div className="pt-8">
                      <button type="button" onClick={handleNextStep} className="btn-premium group w-full bg-primary text-white py-5 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:bg-dark transition-all flex items-center justify-center gap-3">
                        Continue to Review <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {}
                {currentStep === 2 && (
                  <motion.div key="step2" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-black text-dark tracking-tighter mb-2">Review Details</h2>
                      <p className="text-dark/50 font-medium">Verify your information before final payment.</p>
                    </div>

                    <div className="bg-white/40 rounded-3xl p-8 border border-white/80 space-y-6">
                      <div>
                        <p className="text-[10px] font-black text-dark/40 uppercase tracking-widest mb-1">Lead Guest</p>
                        <p className="text-lg font-black text-dark">{formData.customerName}</p>
                        <p className="text-dark/60 font-medium">{formData.email}</p>
                      </div>
                      <div className="h-px bg-dark/5" />
                      <div>
                        <p className="text-[10px] font-black text-dark/40 uppercase tracking-widest mb-1">Experience</p>
                        <p className="text-lg font-black text-dark">{pkg.title}</p>
                        <p className="text-dark/60 font-medium">{pkg.destination}</p>
                      </div>
                      <div className="h-px bg-dark/5" />
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-dark/40 uppercase tracking-widest">Party Size</p>
                        <p className="text-lg font-black text-primary">{formData.seats} Travelers</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={handlePrevStep} className="px-6 py-5 rounded-2xl bg-white text-dark font-black hover:bg-dark/5 transition-colors border border-white/80 flex items-center justify-center shrink-0">
                        <ArrowLeft size={20} />
                      </button>
                      <button type="button" onClick={() => setCurrentStep(3)} className="btn-premium group flex-1 bg-primary text-white py-5 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:bg-dark transition-all flex items-center justify-center gap-3">
                        Proceed to Payment <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {}
                {currentStep === 3 && (
                  <motion.div key="step3" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-black text-dark tracking-tighter mb-2">Secure Payment</h2>
                      <p className="text-dark/50 font-medium">Complete your reservation securely.</p>
                    </div>

                    <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-start gap-4">
                      <Lock className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-black text-dark mb-1">One-Click Secure Checkout</h4>
                        <p className="text-sm font-medium text-dark/60">This is a simulated premium checkout. Clicking confirm will finalize the booking in the system.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-8">
                      <button type="button" onClick={handlePrevStep} className="px-6 py-5 rounded-2xl bg-white text-dark font-black hover:bg-dark/5 transition-colors border border-white/80 flex items-center justify-center shrink-0">
                        <ArrowLeft size={20} />
                      </button>
                      <button type="button" onClick={handleSubmit(onSubmit)} disabled={submitting} className="btn-premium group flex-1 bg-cta text-white py-5 rounded-2xl text-lg font-black shadow-xl shadow-cta/20 hover:bg-green-600 transition-all flex items-center justify-center gap-3">
                        {submitting ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Info size={24} /></motion.div>
                        ) : (
                          <>
                            <CreditCard size={20} />
                            Pay ${(pkg.price * (requestedSeats || 1)).toLocaleString()}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="glass-panel p-8 rounded-[40px] border border-white/60 bg-white/40 sticky top-32 shadow-2xl shadow-dark/5"
            >
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8 shadow-lg">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white font-black text-xs uppercase tracking-widest">
                  {pkg.destination}
                </div>
              </div>

              <h3 className="text-2xl font-black text-dark mb-8 tracking-tighter leading-tight">{pkg.title}</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-dark/40 uppercase tracking-widest text-[10px]">Investment</span>
                  <span className="text-dark">₹{pkg.price.toLocaleString('en-IN')} × {requestedSeats || 1}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-dark/40 uppercase tracking-widest text-[10px]">Taxes & Fees</span>
                  <span className="text-cta flex items-center gap-1">Included</span>
                </div>
                <div className="h-px bg-dark/5" />
                <div className="flex justify-between items-center py-2">
                  <span className="text-dark/50 font-black uppercase tracking-[0.2em] text-xs">Total Amount</span>
                  <span className="text-4xl font-black text-primary tracking-tighter">₹{(pkg.price * (requestedSeats || 1)).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-white/50 rounded-2xl p-6 border border-white/80">
                <h4 className="text-[10px] font-black text-dark uppercase tracking-widest mb-4">Reservation Policy</h4>
                <ul className="space-y-3">
                  {['Free cancellation up to 30 days prior', 'Dedicated travel concierge assigned', 'All-inclusive premium experience'].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-dark/60">
                      <CheckCircle2 size={12} className="text-cta" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;