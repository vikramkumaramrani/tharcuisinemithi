import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  Facebook, 
  Instagram, 
  Utensils, 
  Calendar, 
  MessageSquare,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_DATA, REVIEWS_DATA, GALLERY_DATA } from './data';

// --- Components ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-[9999] hidden md:block"
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isHovering ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block"
            animate={{
              x: mousePosition.x - 3,
              y: mousePosition.y - 3,
            }}
            transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.1 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

const IftarBanner = () => {
  const [isIftarTime, setIsIftarTime] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInMinutes = hours * 60 + minutes;
      
      // Approx Maghrib (6:30 PM = 1110 mins) to 8:00 PM (1200 mins)
      setIsIftarTime(timeInMinutes >= 1110 && timeInMinutes <= 1200);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-secondary text-white py-2 px-4 text-center text-xs md:text-sm font-medium relative z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 md:space-x-4">
        <span className="flex items-center">
          <span className="mr-2">🌙</span>
          <span className="hidden sm:inline">Evening Iftar Special:</span>
          <span className="font-bold ml-1">Enjoy 10% Off from Maghrib to 8 PM!</span>
        </span>
        <div className="flex items-center space-x-2">
          {isIftarTime && (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
              LIVE NOW
            </span>
          )}
          <a href="#menu" className="underline hover:text-primary transition-colors">View Iftar Menu</a>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'top-0 bg-white shadow-md py-3' : 'top-0 bg-transparent pt-14 pb-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home" className={`text-2xl font-display font-bold ${isScrolled ? 'text-secondary' : 'text-white'}`}>
            Thar <span className="text-primary">Cuisine</span>
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? 'text-slate-700' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:+923072500888" 
            className="bg-primary hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center transition-all transform hover:scale-105"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isScrolled ? 'text-slate-900' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-primary hover:bg-warm-bg rounded-md"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:+923072500888" 
                className="w-full mt-4 bg-primary text-white px-5 py-3 rounded-xl text-center font-semibold flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call +92 307 2500888
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://mindtrip.ai/restaurants/2d31/9baa/af98/f3b3/70cc/c002/e8bc/ffbd" 
          alt="Thar Cuisine Ambiance" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-2 mb-4"
          >
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium tracking-wider uppercase">4.5 Stars (317 Reviews)</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
          >
            Authentic Flavors of <span className="text-primary italic">Thar</span> in Mithi
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed"
          >
            Experience the rich culinary heritage of Tharparkar. From spicy Karahis to sweet delights, we bring you the heart of local cuisine.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a 
              href="#menu" 
              className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-center transition-all flex items-center justify-center group"
            >
              View Menu
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-center transition-all"
            >
              Book a Table
            </a>
          </motion.div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md py-6 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-secondary">
          <div className="flex items-center space-x-3">
            <Clock className="text-primary" />
            <div>
              <p className="text-xs uppercase font-bold tracking-widest opacity-60">Hours</p>
              <p className="font-semibold">Open until 1:00 AM</p>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-300"></div>
          <div className="flex items-center space-x-3">
            <Utensils className="text-primary" />
            <div>
              <p className="text-xs uppercase font-bold tracking-widest opacity-60">Price Range</p>
              <p className="font-semibold">Rs 1,000 – 2,000</p>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-300"></div>
          <div className="flex items-center space-x-3">
            <MapPin className="text-primary" />
            <div>
              <p className="text-xs uppercase font-bold tracking-widest opacity-60">Location</p>
              <p className="font-semibold">Mithi, 69230, Pakistan</p>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-300"></div>
          <a 
            href="tel:+923072500888"
            className="flex items-center space-x-3 text-primary font-bold hover:underline"
          >
            <Phone />
            <span>+92 307 2500888</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].category);

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Our Signature Menu</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore our curated selection of traditional Thari dishes and modern favorites, prepared with the freshest local ingredients.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {MENU_DATA.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${activeCategory === cat.category ? 'bg-primary text-white shadow-lg' : 'bg-warm-bg text-secondary hover:bg-orange-100'}`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 col-span-2"
            >
              {MENU_DATA.find(c => c.category === activeCategory)?.items.map((item: any, idx) => (
                <div key={idx} className="flex justify-between items-start border-b border-slate-100 pb-6 group">
                  <div className="flex-1 pr-4">
                    <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">{item.description}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    {item.originalPrice && (
                      <span className="text-sm text-slate-400 line-through mb-1">{item.originalPrice}</span>
                    )}
                    <span className="text-lg font-bold text-primary">{item.price}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-6 italic">Prices are subject to change. Taxes may apply.</p>
          <a 
            href="tel:+923072500888" 
            className="inline-flex items-center text-primary font-bold hover:underline"
          >
            Order for Delivery or Pickup <ChevronRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Gallery</span>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
            A Glimpse into <span className="italic text-primary">Thar Cuisine</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From our cozy ambiance to our signature Thari dishes, explore the visual journey of our restaurant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{item.category}</span>
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-warm-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
                alt="Thar Cuisine Food" 
                className="w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block max-w-xs">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <CheckCircle2 className="text-primary w-6 h-6" />
                </div>
                <h4 className="font-bold text-secondary">Authentic Local Sourcing</h4>
              </div>
              <p className="text-sm text-slate-600">We source our spices and ingredients directly from local Tharparkar farmers.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8 leading-tight">
              Bringing the Heart of <span className="italic">Tharparkar</span> to Your Table
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Thar Cuisine was born from a passion for the unique and vibrant flavors of Mithi. We believe that food is a bridge to culture, and every dish we serve tells a story of the desert's resilience and warmth.
            </p>
            <p className="text-slate-600 mb-10 leading-relaxed">
              Our chefs specialize in traditional Thari recipes passed down through generations, combined with modern culinary techniques to ensure every bite is a memorable experience. Whether you're a local or a visitor, we welcome you to our home.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="text-2xl font-bold text-secondary">4.5</h4>
                <p className="text-sm text-slate-500">Google Rating</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="text-2xl font-bold text-secondary">300+</h4>
                <p className="text-sm text-slate-500">Happy Customers</p>
              </div>
            </div>

            <a 
              href="#contact" 
              className="inline-flex items-center bg-secondary text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all"
            >
              Learn More About Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">What Our Guests Say</h2>
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="font-bold text-secondary">4.5 / 5.0</span>
          </div>
          <p className="text-slate-600">Based on 317 verified Google reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-warm-bg p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="absolute top-8 right-8 text-primary/10">
                <MessageSquare className="w-12 h-12 fill-current" />
              </div>
              <div className="flex text-accent mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-8 leading-relaxed">"{review.comment}"</p>
              <div>
                <h4 className="font-bold text-secondary">{review.name}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://www.google.com/maps/search/Thar+Cuisine+Mithi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary font-bold hover:underline inline-flex items-center"
          >
            Read All Reviews on Google Maps <ChevronRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Get in Touch</h2>
            <p className="text-slate-400 mb-12 leading-relaxed max-w-md">
              Have a question about our menu? Want to book a table for a special occasion or inquire about catering? We're here to help.
            </p>
            
            <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl mb-12 max-w-md">
              <p className="text-primary font-bold text-sm mb-1 flex items-center">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Iftar Special Note
              </p>
              <p className="text-slate-300 text-sm italic">
                Reserve your Iftar table in advance and enjoy special discounts on our combo meals!
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Call Us Directly</h4>
                  <a href="tel:+923072500888" className="text-slate-400 hover:text-primary transition-colors">+92 307 2500888</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Visit Our Restaurant</h4>
                  <p className="text-slate-400">QQ9G+2F Mithi, 69230, Pakistan</p>
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Thar+Cuisine+Mithi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-sm font-bold hover:underline mt-2 inline-block"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <Clock className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Operating Hours</h4>
                  <p className="text-slate-400">Open Daily: 12:00 PM – 1:00 AM</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 flex space-x-4">
              <a href="https://www.facebook.com/share/1AjEQhmc1P/" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/tharcuisine/" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="bg-white text-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl">
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="bg-green-100 p-6 rounded-full mb-6">
                  <CheckCircle2 className="text-green-600 w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-8">Thank you for reaching out. We'll get back to you shortly.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <Calendar className="mr-3 text-primary" />
                  Reservations & Inquiries
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Viku Dev"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+92 XXX XXXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Inquiry Type</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      <option>Table Reservation</option>
                      <option>Catering Request</option>
                      <option>Special Event</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tell us about your request..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={formStatus === 'submitting'}
                    type="submit" 
                    className="w-full bg-primary hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Submit Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-500 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <a href="#home" className="text-2xl font-display font-bold text-white">
              Thar <span className="text-primary">Cuisine</span>
            </a>
            <p className="mt-2 text-sm">Authentic Thari flavors since 2026.</p>
          </div>
          
          <div className="flex space-x-8 mb-8 md:mb-0">
            <a href="#menu" className="hover:text-white transition-colors">Menu</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-sm">
            © 2026 Thar Cuisine. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <IftarBanner />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <GallerySection />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* Floating Mobile Call Button */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <a 
          href="tel:+923072500888" 
          className="bg-primary text-white p-4 rounded-full shadow-2xl flex items-center justify-center animate-bounce"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
