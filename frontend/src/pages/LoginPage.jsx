import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Compass, Mail, Lock, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await login(data.email, data.password);
      const from = location.state?.from || '/packages';
      navigate(from);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
      {}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] opacity-60 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 glass-panel rounded-[48px] overflow-hidden shadow-2xl border-2 border-white/60"
      >
        {}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-90"></div>
          {}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse"></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 text-white mb-16">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                <Compass size={28} />
              </div>
              <span className="text-3xl font-black tracking-tighter">TravelEase</span>
            </Link>
            
            <h2 className="text-5xl font-black text-white leading-tight mb-8 tracking-tighter">
              Discover the <br/> World's Finest <br/> <span className="text-secondary">Destinations</span>
            </h2>
            <p className="text-white/70 text-lg font-medium max-w-sm">
              Join our exclusive community of travelers and unlock bespoke experiences crafted just for you.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4 text-white/80 font-bold">
              <CheckCircle2 className="text-secondary" size={20} />
              <span>Verified Luxury Stays</span>
            </div>
            <div className="flex items-center gap-4 text-white/80 font-bold">
              <CheckCircle2 className="text-secondary" size={20} />
              <span>24/7 Global Concierge</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white/40 backdrop-blur-md">
          <div className="mb-10 lg:hidden">
            <Link to="/" className="flex items-center gap-2 text-dark mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <Compass size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter">TravelEase</span>
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-dark tracking-tighter mb-4">Welcome Back</h1>
            <p className="text-dark/50 font-medium">Please enter your details to access your account.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 mb-3 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input 
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className={`w-full pl-14 pr-6 py-4 bg-white/50 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                  placeholder="name@luxury.travel"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/40 block">Password</label>
                <a href="#" className="text-[10px] uppercase tracking-widest font-black text-primary hover:text-dark transition-colors">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input 
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className={`w-full pl-14 pr-6 py-4 bg-white/50 border rounded-2xl outline-none focus:ring-4 transition-all text-dark font-bold placeholder-dark/20 ${errors.password ? 'border-red-400 focus:ring-red-100' : 'border-white/80 focus:ring-primary/10'}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="btn-premium group w-full bg-primary text-white py-5 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:bg-dark transition-all flex items-center justify-center gap-3"
            >
              {submitting ? 'Authenticating...' : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-dark/5 text-center">
            <p className="text-dark/50 font-medium mb-4">New to TravelEase?</p>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:text-dark transition-colors"
            >
              Create an Account
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-10 bg-primary/5 rounded-2xl p-4 border border-primary/10 flex items-start gap-3">
            <Info size={16} className="text-primary mt-0.5 shrink-0" />
            <p className="text-[10px] font-bold text-dark/60 leading-relaxed">
              Admin roles can be assigned during registration for testing purposes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;