import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Mail, Phone, MapPin } from 'lucide-react';

const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>);

const Footer = () => {
  return (
    <footer className="mt-32 relative overflow-hidden bg-white/30 backdrop-blur-3xl border-t border-white/60">
      {}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <Compass size={28} />
              </div>
              <span className="text-3xl font-black tracking-tighter text-dark">
                Travel<span className="text-primary">Ease</span>
              </span>
            </Link>
            <p className="text-dark/60 text-xl font-medium max-w-md mb-10 leading-relaxed">
              Curating extraordinary journeys and luxury accommodations for the discerning modern explorer.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <TwitterIcon />, label: 'Twitter' },
                { icon: <LinkedinIcon />, label: 'LinkedIn' },
                { icon: <Mail size={20} />, label: 'Email' }
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white border border-dark/5 flex items-center justify-center text-dark/40 hover:bg-primary hover:text-white hover:scale-110 transition-all shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {}
          <div className="lg:col-span-2">
            <h4 className="font-black text-dark text-xs uppercase tracking-[0.2em] mb-8">Discover</h4>
            <ul className="space-y-4 text-dark/60 font-bold">
              <li><Link to="/packages" className="hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Destinations</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Our Story</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Private Travel</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Concierge</a></li>
            </ul>
          </div>

          {}
          <div className="lg:col-span-3">
            <h4 className="font-black text-dark text-xs uppercase tracking-[0.2em] mb-8">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <p className="text-dark/60 font-bold text-sm leading-relaxed">
                  123 Luxury Lane, Elite Plaza<br />London, W1S 2PB, UK
                </p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Phone size={18} />
                </div>
                <p className="text-dark/60 font-bold text-sm">+44 (0) 20 7946 0000</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-dark/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-dark/40 font-bold text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} TravelEase. Registered in England & Wales.
          </p>
          <div className="flex items-center gap-2 text-dark/40 font-bold text-xs uppercase tracking-widest">
            Crafted with <Heart size={14} className="text-cta fill-cta" /> for global explorers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;