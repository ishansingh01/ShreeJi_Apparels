import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ArrowRight,
  Plus,
  Minus,
  Check,
  Sparkles,
  Trash2,
  Eye,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Curated Product Data (8 Editorial Garments)
// ---------------------------------------------------------------------------
const PRODUCTS = [
  {
    id: 'vs-01',
    name: 'L’Atelier Double-Faced Wool Coat',
    category: 'Outerwear',
    price: 780,
    badge: 'Signature',
    fabric: '100% Traceable Australian Merino Wool, hand-finished seams',
    description:
      'Architectural dropped-shoulder silhouette crafted from double-faced brushed wool. Unlined for fluid drape with horn buttons and welt pockets.',
    colors: [
      { name: 'Obsidian', hex: '#141414' },
      { name: 'Warm Stone', hex: '#C7BEB1' },
      { name: 'Espresso', hex: '#3B2F2A' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=900&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'vs-02',
    name: 'Sculpted Cashmere Rib Turtleneck',
    category: 'Knitwear',
    price: 420,
    badge: 'New Arrival',
    fabric: '100% Grade-A Inner Mongolian Cashmere (7-gauge)',
    description:
      'Plush fishermen’s rib knit with elongated cuffs and a softly structured funnel neck designed for effortless winter layering.',
    colors: [
      { name: 'Alabaster', hex: '#EDEAE4' },
      { name: 'Oatmeal', hex: '#CFC5B6' },
      { name: 'Charcoal', hex: '#343434' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'vs-03',
    name: 'Relaxed Pleated Virgin Wool Trouser',
    category: 'Tailoring',
    price: 360,
    badge: null,
    fabric: '96% Virgin Wool, 4% Elastane — Biella Mill, Italy',
    description:
      'High-waisted tailored trousers featuring double forward pleats, an elongated wide-leg drape, and an interior satin-bound waistband.',
    colors: [
      { name: 'Slate', hex: '#4C4C4A' },
      { name: 'Obsidian', hex: '#141414' },
      { name: 'Sand', hex: '#D8CFC2' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'vs-04',
    name: 'Cropped Technical Gabardine Trench',
    category: 'Outerwear',
    price: 640,
    badge: 'Limited',
    fabric: 'Organic Water-Repellent Cotton Gabardine',
    description:
      'A contemporary reinterpretation of the Parisian trench in a cropped architectural cut with storm flaps and brushed gunmetal hardware.',
    colors: [
      { name: 'Warm Khaki', hex: '#B9AC98' },
      { name: 'Obsidian', hex: '#141414' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'vs-05',
    name: 'Single-Breasted Raw Silk Blazer',
    category: 'Tailoring',
    price: 590,
    badge: 'Atelier Edit',
    fabric: '72% Mulberry Raw Silk, 28% Organic Linen',
    description:
      'Sharp padded shoulders paired with a softly nipped waist. Subtle slub texture gives the matte silk an organic editorial character.',
    colors: [
      { name: 'Bone', hex: '#E6E1D8' },
      { name: 'Obsidian', hex: '#141414' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=900&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'vs-06',
    name: 'Brushed Alpaca Oversized Cardigan',
    category: 'Knitwear',
    price: 390,
    badge: null,
    fabric: '78% Peruvian Baby Alpaca, 22% Recycled Polyamide',
    description:
      'Cloud-like lofty handle with subtle tonal corozo nut buttons and deep patch pockets for effortless trans-seasonal warmth.',
    colors: [
      { name: 'Taupe', hex: '#A59A8E' },
      { name: 'Ivory', hex: '#F3EFE9' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'vs-07',
    name: 'Sculptural Calfskin Atelier Tote',
    category: 'Accessories',
    price: 540,
    badge: 'Signature',
    fabric: '100% Vegetable-Tanned Italian Calfskin',
    description:
      'Minimalist gusseted silhouette with hand-painted raw edges, suede-lined interior, and discreet magnetic bridge closure.',
    colors: [
      { name: 'Obsidian', hex: '#141414' },
      { name: 'Saddle', hex: '#7A5438' },
    ],
    sizes: ['OS'],
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'vs-08',
    name: 'Merino Fringed Studio Scarf',
    category: 'Accessories',
    price: 195,
    badge: null,
    fabric: '100% Extra-Fine Combed Merino Wool',
    description:
      'Generously proportioned blanket scarf finished with hand-twisted fringe and a tonal woven ShreeJi Apparels atelier label.',
    colors: [
      { name: 'Warm Stone', hex: '#D8D1C7' },
      { name: 'Obsidian', hex: '#141414' },
      { name: 'Moss', hex: '#555B50' },
    ],
    sizes: ['OS'],
    image:
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=900&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=85',
  },
];

const CATEGORIES = ['All', 'Outerwear', 'Knitwear', 'Tailoring', 'Accessories'];

const LOOKBOOK_HOTSPOTS = [
  {
    id: 'hs-1',
    productId: 'vs-01',
    x: 46,
    y: 36,
    note: 'Layered over tonal knitwear for architectural movement.',
  },
  {
    id: 'hs-2',
    productId: 'vs-03',
    x: 52,
    y: 72,
    note: 'Fluid wide-leg drape elongates the silhouette.',
  },
];

const LOOKBOOK_HOTSPOTS_2 = [
  {
    id: 'hs-3',
    productId: 'vs-05',
    x: 48,
    y: 40,
    note: 'Raw mulberry silk catches natural winter light.',
  },
  {
    id: 'hs-4',
    productId: 'vs-07',
    x: 68,
    y: 66,
    note: 'Vegetable-tanned Italian calfskin ages with patina.',
  },
];

const SUSTAINABILITY_STATS = [
  { label: 'Traceable Natural Fibers', value: 100, suffix: '%' },
  { label: 'Partner Artisan Ateliers', value: 42, suffix: '' },
  { label: 'Virgin Plastics Used', value: 0, suffix: '%' },
  { label: 'Weeks Craft Cycle', value: 18, suffix: '' },
];

// ---------------------------------------------------------------------------
// Utility Components: Scroll Reveal & Animated Counter
// ---------------------------------------------------------------------------
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.14 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (target === 0) {
      setCount(0);
      return;
    }
    const duration = 1200;
    const startTime = performance.now();
    let frameId;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main Application
// ---------------------------------------------------------------------------
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search & Filter
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});

  // Wishlist, Cart, Quick View, Lookbook Hotspots
  const [wishlist, setWishlist] = useState(['vs-01']);
  const [heartPulseId, setHeartPulseId] = useState(null);
  const [cart, setCart] = useState([
    {
      product: PRODUCTS[1],
      size: 'M',
      color: PRODUCTS[1].colors[0].name,
      quantity: 1,
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bagPulse, setBagPulse] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [qvSize, setQvSize] = useState('M');
  const [qvColor, setQvColor] = useState('');

  const [activeHotspot, setActiveHotspot] = useState('hs-1');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [toast, setToast] = useState(null);

  // Track scroll for sticky glassmorphic header + hero parallax
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setScrolled(y > 32);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dynamically measure sliding category pill
  useEffect(() => {
    const updatePill = () => {
      const el = tabRefs.current[activeCategory];
      if (el) {
        setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
      }
    };
    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [activeCategory]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCat =
        activeCategory === 'All' || p.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Show temporary toast
  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2600);
  };

  // Wishlist toggle
  const toggleWishlist = (id, e) => {
    if (e) e.stopPropagation();
    setHeartPulseId(id);
    setTimeout(() => setHeartPulseId(null), 380);
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add to bag
  const addToCart = (product, size, colorName) => {
    const chosenSize = size || product.sizes[0];
    const chosenColor = colorName || product.colors[0].name;

    setCart((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === chosenSize &&
          item.color === chosenColor
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return updated;
      }
      return [
        ...prev,
        { product, size: chosenSize, color: chosenColor, quantity: 1 },
      ];
    });

    setCheckoutDone(false);
    setBagPulse(true);
    setTimeout(() => setBagPulse(false), 450);
    triggerToast(`Added ${product.name} (${chosenSize}) to bag`);
  };

  const updateCartQty = (index, delta) => {
    setCart((prev) =>
      prev
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setQvSize(product.sizes.includes('M') ? 'M' : product.sizes[0]);
    setQvColor(product.colors[0].name);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 500;
  const freeShippingProgress = Math.min(
    (cartSubtotal / freeShippingThreshold) * 100,
    100
  );

  const handleCheckout = () => {
    setCheckoutDone(true);
    setTimeout(() => {
      setCart([]);
    }, 500);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  // Hero parallax scale
  const heroScale = 1 + Math.min(scrollY * 0.00025, 0.14);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#141414] relative">
      {/* ================================================================= */}
      {/* STICKY GLASSMORPHIC HEADER                                        */}
      {/* ================================================================= */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F9F8F6]/85 backdrop-blur-md border-b border-[#E5E0D8] py-3.5'
            : 'bg-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Left Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-1.5 hover:opacity-70 transition-opacity"
            >
              <Menu className="w-5 h-5" />
            </button>
            <nav className="hidden lg:flex items-center gap-7 text-xs tracking-[0.18em] uppercase font-medium">
              <a href="#collection" className="hover:opacity-60 transition-opacity">
                Collection
              </a>
              <a href="#lookbook" className="hover:opacity-60 transition-opacity">
                Lookbook
              </a>
              <a href="#atelier" className="hover:opacity-60 transition-opacity">
                Atelier
              </a>
            </nav>
          </div>

          {/* Brand Wordmark */}
          <a
            href="#"
            className="font-editorial text-2xl sm:text-3xl tracking-[0.22em] font-light uppercase"
          >
            ShreeJi Apparels
          </a>

          {/* Right Utilities */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Expandable Live Search */}
            <div className="flex items-center">
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  searchOpen ? 'w-36 sm:w-52 opacity-100 mr-2' : 'w-0 opacity-0'
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (window.scrollY < 400) {
                      document
                        .getElementById('collection')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  placeholder="Search pieces..."
                  className={`w-full text-xs bg-transparent border-b pb-1 focus:outline-none ${
                    scrolled
                      ? 'border-[#141414]/40 placeholder:text-[#6E6A63]'
                      : 'border-white/50 placeholder:text-white/70 text-white'
                  }`}
                />
              </div>
              <button
                onClick={() => {
                  setSearchOpen((v) => !v);
                  if (searchOpen) setSearchQuery('');
                }}
                aria-label="Search"
                className="p-1.5 hover:opacity-65 transition-opacity"
              >
                {searchOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Wishlist Indicator */}
            <a
              href="#collection"
              aria-label="Saved items"
              className="relative p-1.5 hover:opacity-65 transition-opacity hidden sm:inline-flex"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#141414] text-[#F9F8F6] text-[10px] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Bag Button */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Shopping bag"
              className={`relative flex items-center gap-1.5 text-xs tracking-[0.14em] uppercase p-1.5 hover:opacity-70 transition-transform ${
                bagPulse ? 'scale-110' : 'scale-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span
                className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-medium transition-colors ${
                  scrolled
                    ? 'bg-[#141414] text-[#F9F8F6]'
                    : 'bg-white text-[#141414]'
                }`}
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/45 backdrop-blur-xs"
        />
        <div
          className={`absolute top-0 left-0 bottom-0 w-72 bg-[#F9F8F6] p-7 flex flex-col justify-between transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#E5E0D8]">
              <span className="font-editorial text-xl tracking-[0.2em]">
                ShreeJi Apparels
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-5 text-sm tracking-[0.16em] uppercase">
              {['Collection', 'Lookbook', 'Atelier'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 border-b border-transparent hover:border-[#141414] w-fit transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <p className="text-xs text-[#6E6A63] tracking-wide">
            Paris · Milan · Tokyo
          </p>
        </div>
      </div>

      {/* ================================================================= */}
      {/* FULL-VIEWPORT EDITORIAL HERO                                      */}
      {/* ================================================================= */}
      <section className="relative h-screen min-h-[680px] flex items-end overflow-hidden bg-[#141414]">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85')`,
            transform: `scale(${heroScale})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-[#141414]/30 to-[#141414]/35" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 pb-16 sm:pb-24 text-[#F9F8F6]">
          <p className="animate-hero-1 text-xs tracking-[0.28em] uppercase text-[#E5E0D8] mb-4">
            Autumn / Winter Atelier Collection
          </p>
          <h1 className="animate-hero-2 font-editorial text-5xl sm:text-7xl lg:text-8xl font-light leading-[0.98] max-w-3xl">
            Quiet Form, <br />
            <span className="italic font-light text-[#E5E0D8]">
              Enduring Tailoring.
            </span>
          </h1>
          <p className="animate-hero-3 mt-6 text-sm sm:text-base text-[#E5E0D8]/90 max-w-md font-light leading-relaxed">
            Architectural silhouettes crafted in small batches from traceable
            Australian merino, Grade-A cashmere, and Italian virgin wool.
          </p>
          <div className="animate-hero-4 mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#collection"
              className="group inline-flex items-center gap-3 bg-[#F9F8F6] text-[#141414] px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#E5E0D8] transition-colors"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#lookbook"
              className="inline-flex items-center gap-2 border border-[#F9F8F6]/50 text-[#F9F8F6] px-7 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[#F9F8F6]/10 transition-colors"
            >
              View Lookbook
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* INFINITE EDITORIAL MARQUEE                                        */}
      {/* ================================================================= */}
      <div className="marquee-wrapper bg-[#141414] text-[#E5E0D8] border-y border-white/10 py-3.5 overflow-hidden select-none">
        <div className="animate-marquee">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex items-center gap-10 pr-10 text-xs tracking-[0.26em] uppercase whitespace-nowrap"
            >
              <span>Complimentary Express Shipping Over $500</span>
              <span className="text-[#6E6A63]">✦</span>
              <span>100% Traceable Natural Fibers</span>
              <span className="text-[#6E6A63]">✦</span>
              <span>Hand-Finished in Paris &amp; Biella</span>
              <span className="text-[#6E6A63]">✦</span>
              <span>Limited Seasonal Editions</span>
              <span className="text-[#6E6A63]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================= */}
      {/* INTERACTIVE COLLECTION GRID                                       */}
      {/* ================================================================= */}
      <section
        id="collection"
        className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28"
      >
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-xs tracking-[0.24em] uppercase text-[#6E6A63] mb-2">
                Curated Wardrobe
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-light">
                The Collection
              </h2>
            </div>

            {/* Sliding Indicator Category Filter */}
            <div className="relative inline-flex items-center bg-[#E5E0D8]/60 p-1 rounded-full overflow-x-auto max-w-full">
              <span
                className="absolute top-1 bottom-1 bg-[#141414] rounded-full transition-all duration-300 ease-out"
                style={{
                  left: `${pillStyle.left}px`,
                  width: `${pillStyle.width}px`,
                }}
              />
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    ref={(el) => (tabRefs.current[cat] = el)}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative z-10 px-4 sm:px-5 py-2 text-xs tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-300 ${
                      active
                        ? 'text-[#F9F8F6]'
                        : 'text-[#141414]/75 hover:text-[#141414]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-[#E5E0D8]">
            <p className="font-editorial text-2xl mb-2">No pieces found</p>
            <p className="text-sm text-[#6E6A63] mb-5">
              Try clearing your search or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="text-xs tracking-[0.18em] uppercase underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product, index) => {
              const isWished = wishlist.includes(product.id);
              return (
                <Reveal key={product.id} delay={(index % 4) * 70}>
                  <article className="group flex flex-col">
                    {/* Image Card with Crossfade Swap & Quick-Add Size Bar */}
                    <div
                      onClick={() => openQuickView(product)}
                      className="relative aspect-[3/4] overflow-hidden bg-[#E5E0D8]/50 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                      />
                      <img
                        src={product.hoverImage}
                        alt={`${product.name} alternate view`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-[#F9F8F6]/90 backdrop-blur-xs text-[#141414] px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase">
                          {product.badge}
                        </span>
                      )}

                      {/* Top-right actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          onClick={(e) => toggleWishlist(product.id, e)}
                          aria-label="Toggle wishlist"
                          className={`w-8 h-8 rounded-full bg-[#F9F8F6]/90 backdrop-blur-xs flex items-center justify-center hover:bg-[#141414] hover:text-[#F9F8F6] transition-colors ${
                            heartPulseId === product.id
                              ? 'animate-heart-pop'
                              : ''
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isWished ? 'fill-current text-[#141414]' : ''
                            }`}
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product);
                          }}
                          aria-label="Quick view"
                          className="w-8 h-8 rounded-full bg-[#F9F8F6]/90 backdrop-blur-xs flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#141414] hover:text-[#F9F8F6]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quick-Add Size Bar on Hover */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-x-3 bottom-3 bg-[#F9F8F6]/95 backdrop-blur-md px-3 py-2.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <p className="text-[10px] tracking-[0.18em] uppercase text-[#6E6A63] mb-1.5 text-center">
                          Quick Add
                        </p>
                        <div className="flex items-center justify-center gap-1.5">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={() =>
                                addToCart(product, sz, product.colors[0].name)
                              }
                              className="min-w-[30px] h-7 px-2 text-[11px] border border-[#E5E0D8] hover:border-[#141414] hover:bg-[#141414] hover:text-[#F9F8F6] transition-colors"
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="pt-4 flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          onClick={() => openQuickView(product)}
                          className="font-editorial text-lg leading-snug cursor-pointer hover:opacity-70 transition-opacity"
                        >
                          {product.name}
                        </h3>
                        <span className="text-sm font-medium whitespace-nowrap">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[11px] tracking-[0.14em] uppercase text-[#6E6A63]">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {product.colors.map((c) => (
                            <span
                              key={c.name}
                              title={c.name}
                              className="w-3 h-3 rounded-full border border-black/15"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      {/* ================================================================= */}
      {/* INTERACTIVE EDITORIAL LOOKBOOK WITH HOTSPOTS                      */}
      {/* ================================================================= */}
      <section
        id="lookbook"
        className="bg-[#E5E0D8]/45 border-y border-[#E5E0D8] py-20 sm:py-28"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-xs tracking-[0.24em] uppercase text-[#6E6A63] mb-2">
                  Editorial Study 04
                </p>
                <h2 className="font-editorial text-4xl sm:text-5xl font-light">
                  Interactive Lookbook
                </h2>
              </div>
              <p className="text-sm text-[#6E6A63] max-w-md">
                Select any pulsing atelier marker to inspect styling notes and
                shop the garment directly.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Asymmetric Frame 1 */}
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#141414]">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
                  alt="Editorial Look 01"
                  className="w-full h-full object-cover"
                />
                {LOOKBOOK_HOTSPOTS.map((hs) => {
                  const prod = PRODUCTS.find((p) => p.id === hs.productId);
                  const isOpen = activeHotspot === hs.id;
                  return (
                    <div
                      key={hs.id}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        onClick={() => setActiveHotspot(isOpen ? null : hs.id)}
                        aria-label={`Inspect ${prod.name}`}
                        className="relative w-7 h-7 flex items-center justify-center"
                      >
                        <span className="hotspot-ring absolute inset-0 rounded-full bg-[#F9F8F6]" />
                        <span className="relative w-3.5 h-3.5 rounded-full bg-[#F9F8F6] border-2 border-[#141414] shadow-md" />
                      </button>

                      {isOpen && (
                        <div className="animate-modal-in absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-[#F9F8F6]/95 backdrop-blur-md p-4 shadow-xl border border-[#E5E0D8]">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-[#6E6A63]">
                            {prod.category}
                          </p>
                          <h4 className="font-editorial text-lg leading-snug mt-0.5">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-[#6E6A63] mt-1.5 leading-relaxed">
                            {hs.note}
                          </p>
                          <div className="mt-3 pt-3 border-t border-[#E5E0D8] flex items-center justify-between">
                            <span className="text-xs font-medium">
                              ${prod.price}
                            </span>
                            <button
                              onClick={() => openQuickView(prod)}
                              className="text-[11px] tracking-[0.16em] uppercase underline underline-offset-4 hover:opacity-65"
                            >
                              Quick View
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs tracking-[0.16em] uppercase text-[#6E6A63]">
                Look 01 — Paris Rue Saint-Honoré
              </p>
            </Reveal>

            {/* Asymmetric Frame 2 */}
            <Reveal delay={140} className="lg:col-span-5 lg:mt-16">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#141414]">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
                  alt="Editorial Look 02"
                  className="w-full h-full object-cover"
                />
                {LOOKBOOK_HOTSPOTS_2.map((hs) => {
                  const prod = PRODUCTS.find((p) => p.id === hs.productId);
                  const isOpen = activeHotspot === hs.id;
                  return (
                    <div
                      key={hs.id}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        onClick={() => setActiveHotspot(isOpen ? null : hs.id)}
                        aria-label={`Inspect ${prod.name}`}
                        className="relative w-7 h-7 flex items-center justify-center"
                      >
                        <span className="hotspot-ring absolute inset-0 rounded-full bg-[#F9F8F6]" />
                        <span className="relative w-3.5 h-3.5 rounded-full bg-[#F9F8F6] border-2 border-[#141414] shadow-md" />
                      </button>

                      {isOpen && (
                        <div className="animate-modal-in absolute left-1/2 -translate-x-1/2 mt-3 w-60 bg-[#F9F8F6]/95 backdrop-blur-md p-4 shadow-xl border border-[#E5E0D8]">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-[#6E6A63]">
                            {prod.category}
                          </p>
                          <h4 className="font-editorial text-lg leading-snug mt-0.5">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-[#6E6A63] mt-1.5 leading-relaxed">
                            {hs.note}
                          </p>
                          <div className="mt-3 pt-3 border-t border-[#E5E0D8] flex items-center justify-between">
                            <span className="text-xs font-medium">
                              ${prod.price}
                            </span>
                            <button
                              onClick={() => openQuickView(prod)}
                              className="text-[11px] tracking-[0.16em] uppercase underline underline-offset-4 hover:opacity-65"
                            >
                              Quick View
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs tracking-[0.16em] uppercase text-[#6E6A63]">
                Look 02 — Raw Silk &amp; Vegetable-Tanned Leather
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SUSTAINABILITY & ATELIER METRICS                                  */}
      {/* ================================================================= */}
      <section id="atelier" className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <p className="text-xs tracking-[0.24em] uppercase text-[#6E6A63] mb-3">
              Conscious Craftsmanship
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl font-light leading-tight">
              Designed to outlast seasons, not chase them.
            </h2>
            <p className="mt-5 text-sm text-[#6E6A63] leading-relaxed">
              Every ShreeJi Apparels garment is cut in numbered runs with
              family-owned mills across Italy, Japan, and France. We eliminate
              synthetic blends in favor of biodegradable natural fibers and
              lifetime atelier repair.
            </p>
          </Reveal>

          <div className="lg:col-span-7 grid grid-cols-2 gap-6 sm:gap-8">
            {SUSTAINABILITY_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <div className="border-t border-[#141414]/20 pt-6">
                  <p className="font-editorial text-5xl sm:text-6xl font-light text-[#141414]">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs tracking-[0.16em] uppercase text-[#6E6A63]">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* ATELIER FOOTER WITH ANIMATED NEWSLETTER                           */}
      {/* ================================================================= */}
      <footer className="bg-[#141414] text-[#F9F8F6] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            <div className="lg:col-span-5">
              <p className="font-editorial text-3xl tracking-[0.2em] uppercase mb-4">
                ShreeJi Apparels
              </p>
              <p className="text-sm text-[#E5E0D8]/70 max-w-sm leading-relaxed">
                Receive private invitations to seasonal archive sales, atelier
                appointments, and early access to limited editions.
              </p>

              <div className="mt-7 max-w-md">
                {newsletterSubscribed ? (
                  <div className="animate-modal-in flex items-center gap-3 border border-white/20 bg-white/5 px-4 py-3.5 text-sm text-[#E5E0D8]">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>
                      Welcome to the Atelier. Your private dispatch is confirmed.
                    </span>
                  </div>
                ) : (
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex items-center border-b border-white/30 pb-2 focus-within:border-white transition-colors"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-transparent text-sm placeholder:text-white/40 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="text-xs tracking-[0.2em] uppercase pl-4 hover:opacity-70 transition-opacity whitespace-nowrap"
                    >
                      Join
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
              <div>
                <p className="tracking-[0.2em] uppercase text-[#E5E0D8]/50 mb-4">
                  Boutiques
                </p>
                <ul className="space-y-2.5 text-[#E5E0D8]/80">
                  <li>Paris — Le Marais</li>
                  <li>Milan — Brera</li>
                  <li>Tokyo — Aoyama</li>
                  <li>New York — SoHo</li>
                </ul>
              </div>
              <div>
                <p className="tracking-[0.2em] uppercase text-[#E5E0D8]/50 mb-4">
                  Client Care
                </p>
                <ul className="space-y-2.5 text-[#E5E0D8]/80">
                  <li>Shipping &amp; Returns</li>
                  <li>Garment Care Guide</li>
                  <li>Lifetime Repair</li>
                  <li>Private Appointments</li>
                </ul>
              </div>
              <div>
                <p className="tracking-[0.2em] uppercase text-[#E5E0D8]/50 mb-4">
                  House
                </p>
                <ul className="space-y-2.5 text-[#E5E0D8]/80">
                  <li>Our Mills</li>
                  <li>Traceability Report</li>
                  <li>Careers</li>
                  <li>Press Inquiries</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.14em] uppercase text-[#E5E0D8]/45">
            <p>© {new Date().getFullYear()} ShreeJi Apparels. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================================================================= */}
      {/* QUICK VIEW MODAL                                                  */}
      {/* ================================================================= */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setQuickViewProduct(null)}
            className="absolute inset-0 bg-black/55 backdrop-blur-xs"
          />
          <div className="animate-modal-in relative z-10 bg-[#F9F8F6] max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#F9F8F6]/90 flex items-center justify-center hover:bg-[#141414] hover:text-[#F9F8F6] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[3/4] md:aspect-auto bg-[#E5E0D8]">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#6E6A63]">
                  {quickViewProduct.category}
                </p>
                <h3 className="font-editorial text-3xl font-light mt-1">
                  {quickViewProduct.name}
                </h3>
                <p className="text-lg font-medium mt-2">
                  ${quickViewProduct.price}
                </p>
                <p className="text-sm text-[#6E6A63] mt-4 leading-relaxed">
                  {quickViewProduct.description}
                </p>
                <p className="text-xs text-[#141414]/80 mt-3 pt-3 border-t border-[#E5E0D8]">
                  <span className="uppercase tracking-[0.14em] text-[#6E6A63]">
                    Fabric:{' '}
                  </span>
                  {quickViewProduct.fabric}
                </p>

                {/* Color Swatches */}
                <div className="mt-6">
                  <p className="text-[11px] tracking-[0.16em] uppercase text-[#6E6A63] mb-2">
                    Color: <span className="text-[#141414]">{qvColor}</span>
                  </p>
                  <div className="flex items-center gap-2.5">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setQvColor(c.name)}
                        title={c.name}
                        className={`w-7 h-7 rounded-full p-0.5 border transition-all ${
                          qvColor === c.name
                            ? 'border-[#141414] scale-110'
                            : 'border-transparent hover:border-[#6E6A63]'
                        }`}
                      >
                        <span
                          className="block w-full h-full rounded-full border border-black/15"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-6">
                  <p className="text-[11px] tracking-[0.16em] uppercase text-[#6E6A63] mb-2">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setQvSize(sz)}
                        className={`min-w-[44px] h-10 px-3 text-xs tracking-wider border transition-colors ${
                          qvSize === sz
                            ? 'bg-[#141414] text-[#F9F8F6] border-[#141414]'
                            : 'border-[#E5E0D8] hover:border-[#141414]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(quickViewProduct, qvSize, qvColor);
                  setQuickViewProduct(null);
                  setCartOpen(true);
                }}
                className="mt-8 w-full bg-[#141414] text-[#F9F8F6] py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[#2c2c2c] transition-colors"
              >
                Add to Bag — ${quickViewProduct.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SLIDE-OUT SHOPPING BAG DRAWER                                     */}
      {/* ================================================================= */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          cartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={() => setCartOpen(false)}
          className="absolute inset-0 bg-black/45 backdrop-blur-xs"
        />
        <aside
          className={`absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#F9F8F6] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            cartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-[#E5E0D8] flex items-center justify-between">
            <h3 className="font-editorial text-2xl">
              Shopping Bag ({cartCount})
            </h3>
            <button
              onClick={() => setCartOpen(false)}
              aria-label="Close bag"
              className="p-1.5 hover:opacity-65"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {!checkoutDone && (
            <div className="px-6 py-3.5 bg-[#E5E0D8]/40 border-b border-[#E5E0D8]">
              <p className="text-xs text-[#141414]/85 mb-2">
                {cartSubtotal >= freeShippingThreshold ? (
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5" /> Complimentary Express
                    Shipping unlocked
                  </span>
                ) : (
                  <>
                    Add{' '}
                    <span className="font-medium">
                      ${freeShippingThreshold - cartSubtotal}
                    </span>{' '}
                    more for complimentary express shipping
                  </>
                )}
              </p>
              <div className="h-1 bg-[#E5E0D8] overflow-hidden">
                <div
                  className="h-full bg-[#141414] transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {checkoutDone ? (
              <div className="animate-modal-in h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-[#141414] text-[#F9F8F6] flex items-center justify-center mb-5">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-3xl mb-2">
                  Order Confirmed
                </h4>
                <p className="text-sm text-[#6E6A63] max-w-xs leading-relaxed">
                  Thank you for your patronage. Our Paris atelier is preparing
                  your pieces in signature garment bags.
                </p>
                <button
                  onClick={() => {
                    setCheckoutDone(false);
                    setCartOpen(false);
                  }}
                  className="mt-8 border border-[#141414] px-6 py-3 text-xs tracking-[0.18em] uppercase hover:bg-[#141414] hover:text-[#F9F8F6] transition-colors"
                >
                  Continue Exploring
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-8 h-8 text-[#6E6A63] mb-3 stroke-[1.3]" />
                <p className="font-editorial text-2xl mb-1">Your bag is empty</p>
                <p className="text-xs text-[#6E6A63]">
                  Explore the Autumn / Winter collection to add pieces.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-[#E5E0D8]">
                {cart.map((item, idx) => (
                  <li
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="py-5 flex gap-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-26 object-cover bg-[#E5E0D8] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-editorial text-lg leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeCartItem(idx)}
                            aria-label="Remove item"
                            className="text-[#6E6A63] hover:text-[#141414]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-[#6E6A63] mt-0.5">
                          {item.color} · Size {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-[#E5E0D8]">
                          <button
                            onClick={() => updateCartQty(idx, -1)}
                            className="px-2 py-1 hover:bg-[#E5E0D8]/50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(idx, 1)}
                            className="px-2 py-1 hover:bg-[#E5E0D8]/50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Drawer Footer */}
          {!checkoutDone && cart.length > 0 && (
            <div className="p-6 border-t border-[#E5E0D8] bg-[#F9F8F6]">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-[#6E6A63]">Subtotal</span>
                <span className="font-medium">${cartSubtotal}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6E6A63] mb-5">
                <span>Shipping</span>
                <span>
                  {cartSubtotal >= freeShippingThreshold
                    ? 'Complimentary'
                    : '$25'}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#141414] text-[#F9F8F6] py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[#2a2a2a] transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* ================================================================= */}
      {/* FLOATING TOAST NOTIFICATION                                       */}
      {/* ================================================================= */}
      {toast && (
        <div className="animate-modal-in fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#141414] text-[#F9F8F6] px-5 py-3 text-xs tracking-[0.12em] shadow-xl flex items-center gap-2.5">
          <Check className="w-3.5 h-3.5 text-[#E5E0D8]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
