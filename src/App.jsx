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
  ChevronDown,
  Grid,
  LayoutGrid,
  Compass,
  ArrowUp,
  MapPin,
  Navigation,
  ExternalLink,
  Clock,
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

  // Mobile layout & filter states
  const [mobileGridCols, setMobileGridCols] = useState(2);
  const [filterWishlistOnly, setFilterWishlistOnly] = useState(false);

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
      const matchesWishlist = !filterWishlistOnly || wishlist.includes(p.id);
      const matchesCat =
        activeCategory === 'All' || p.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q);
      return matchesWishlist && matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, filterWishlistOnly, wishlist]);

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
    <div className="min-h-screen bg-[#F9F8F6] text-[#141414] relative pb-20 lg:pb-0">
      {/* ================================================================= */}
      {/* STICKY GLASSMORPHIC HEADER                                        */}
      {/* ================================================================= */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#E5E0D8] py-3'
            : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent py-4 sm:py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left Nav */}
            <div className="flex items-center gap-3 sm:gap-6">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="p-1.5 hover:opacity-70 active:scale-95 transition-all"
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
                <a href="#location" className="hover:opacity-60 transition-opacity">
                  Store
                </a>
              </nav>
            </div>

            {/* Brand Wordmark */}
            <a
              href="#"
              className="font-editorial text-lg sm:text-2xl md:text-3xl tracking-[0.15em] sm:tracking-[0.22em] font-light uppercase text-center truncate max-w-[210px] sm:max-w-none"
            >
              ShreeJi Apparels
            </a>

            {/* Right Utilities */}
            <div className="flex items-center gap-1.5 sm:gap-5">
              {/* Expandable Live Search on Desktop */}
              <div className="hidden sm:flex items-center">
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
                  className="p-1.5 hover:opacity-65 active:scale-95 transition-all"
                >
                  {searchOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Mobile Search Toggle Button */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Toggle mobile search"
                className="sm:hidden p-1.5 hover:opacity-65 active:scale-95 transition-all"
              >
                {searchOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>

              {/* Wishlist Indicator */}
              <button
                onClick={() => {
                  setFilterWishlistOnly((prev) => !prev);
                  document
                    .getElementById('collection')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Saved items"
                className={`relative p-1.5 hover:opacity-65 active:scale-95 transition-all ${
                  filterWishlistOnly ? 'scale-105' : ''
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    filterWishlistOnly ? 'fill-current' : ''
                  }`}
                />
                {wishlist.length > 0 && (
                  <span
                    className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                      scrolled
                        ? 'bg-[#141414] text-[#F9F8F6]'
                        : 'bg-white text-[#141414]'
                    }`}
                  >
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Bag Button */}
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Shopping bag"
                className={`relative flex items-center gap-1.5 text-xs tracking-[0.14em] uppercase p-1.5 hover:opacity-70 active:scale-95 transition-all ${
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

          {/* Mobile Search Dropdown Bar */}
          {searchOpen && (
            <div className="sm:hidden mt-2.5 pt-2.5 border-t border-current/15 animate-modal-in">
              <div
                className={`flex items-center rounded-full px-3.5 py-1.5 ${
                  scrolled
                    ? 'bg-[#141414]/5 text-[#141414]'
                    : 'bg-white/15 text-white backdrop-blur-sm'
                }`}
              >
                <Search className="w-3.5 h-3.5 opacity-60 mr-2 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (window.scrollY < 300) {
                      document
                        .getElementById('collection')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  placeholder="Search coat, merino, cashmere..."
                  className="w-full text-xs bg-transparent focus:outline-none placeholder:opacity-50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 opacity-60 hover:opacity-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
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
          className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        />
        <div
          className={`absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#F9F8F6] p-6 sm:p-7 flex flex-col justify-between transition-transform duration-300 ease-out shadow-2xl ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-[#E5E0D8]">
              <span className="font-editorial text-xl tracking-[0.2em]">
                ShreeJi Apparels
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 hover:opacity-70 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions in Drawer */}
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setFilterWishlistOnly(true);
                  document
                    .getElementById('collection')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#E5E0D8]/45 border border-[#E5E0D8] rounded-xs hover:bg-[#E5E0D8] active:scale-95 transition-all"
              >
                <Heart className="w-3.5 h-3.5 text-[#141414]" />
                <span className="font-medium">Saved ({wishlist.length})</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCartOpen(true);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#141414] text-[#F9F8F6] rounded-xs active:scale-95 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="font-medium">Bag ({cartCount})</span>
              </button>
            </div>

            {/* Main Navigation Links */}
            <nav className="mt-7 flex flex-col gap-4 text-xs tracking-[0.2em] uppercase font-medium">
              <p className="text-[10px] tracking-[0.24em] text-[#6E6A63] uppercase mb-0.5">
                Explore House
              </p>
              {[
                { label: 'Collection', href: '#collection' },
                { label: 'Lookbook Study', href: '#lookbook' },
                { label: 'Atelier & Craft', href: '#atelier' },
                { label: 'Store Location', href: '#location' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-[#141414] border-b border-transparent hover:border-[#141414] w-fit active:translate-x-1 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Wardrobe Categories Quick Filter */}
            <div className="mt-7 pt-5 border-t border-[#E5E0D8]">
              <p className="text-[10px] tracking-[0.24em] text-[#6E6A63] uppercase mb-3">
                Curated Categories
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setFilterWishlistOnly(false);
                      setMobileMenuOpen(false);
                      document
                        .getElementById('collection')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 text-[10px] sm:text-[11px] tracking-wider uppercase border active:scale-95 transition-all ${
                      activeCategory === cat && !filterWishlistOnly
                        ? 'bg-[#141414] text-[#F9F8F6] border-[#141414]'
                        : 'border-[#E5E0D8] bg-transparent text-[#6E6A63]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E5E0D8] space-y-2 text-xs text-[#6E6A63]">
            <a
              href="https://maps.app.goo.gl/sPNFa2axQUCDRqHN7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#141414] font-medium tracking-wide hover:underline"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Gonda Flagship · View on Google Maps →</span>
            </a>
            <p className="text-[11px] text-[#6E6A63]/80">
              Gaytree Puram Colony, Jhanjhari Block, Gonda, UP 271001
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* FULL-VIEWPORT EDITORIAL HERO                                      */}
      {/* ================================================================= */}
      <section className="relative h-[100dvh] min-h-[580px] sm:min-h-[680px] flex items-end overflow-hidden bg-[#141414]">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85')`,
            transform: `scale(${heroScale})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/40 to-[#141414]/35" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 pb-14 sm:pb-24 text-[#F9F8F6]">
          <p className="animate-hero-1 text-[11px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#E5E0D8] mb-3 sm:mb-4">
            Autumn / Winter Atelier Collection
          </p>
          <h1 className="animate-hero-2 font-editorial text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-light leading-[1.05] sm:leading-[0.98] max-w-3xl">
            Quiet Form, <br />
            <span className="italic font-light text-[#E5E0D8]">
              Enduring Tailoring.
            </span>
          </h1>
          <p className="animate-hero-3 mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-[#E5E0D8]/90 max-w-md font-light leading-relaxed">
            Architectural silhouettes crafted in small batches from traceable
            Australian merino, Grade-A cashmere, and Italian virgin wool.
          </p>
          <div className="animate-hero-4 mt-7 sm:mt-9 flex flex-row items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
            <a
              href="#collection"
              className="group inline-flex items-center justify-center gap-3 bg-white text-[#141414] px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-medium hover:bg-[#E5E0D8] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
            </a>
            <a
              href="#lookbook"
              className="inline-flex items-center justify-center border border-white/40 bg-white/5 backdrop-blur-xs text-[#F9F8F6] px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-medium hover:bg-white/15 hover:border-white active:scale-[0.98] transition-all whitespace-nowrap"
            >
              View Lookbook
            </a>
          </div>
        </div>

        {/* Scroll indicator for mobile & desktop */}
        <a
          href="#collection"
          aria-label="Scroll to collection"
          className="animate-bounce-down absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-10 hidden xs:flex flex-col items-center gap-1 text-[#E5E0D8]/60 hover:text-[#F9F8F6] transition-colors"
        >
          <span className="text-[9px] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </a>
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
        className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-28"
      >
        <Reveal>
          <div className="flex flex-col gap-6 mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.24em] uppercase text-[#6E6A63] mb-2">
                  Curated Wardrobe
                </p>
                <h2 className="font-editorial text-3xl sm:text-5xl font-light">
                  The Collection
                </h2>
              </div>

              {/* Mobile View Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                <span className="text-xs tracking-[0.14em] uppercase text-[#6E6A63]">
                  {filteredProducts.length} Pieces
                </span>
                <div className="flex items-center border border-[#E5E0D8] rounded p-0.5 sm:hidden">
                  <button
                    onClick={() => setMobileGridCols(1)}
                    aria-label="Single column view"
                    className={`p-1.5 rounded transition-colors ${
                      mobileGridCols === 1
                        ? 'bg-[#141414] text-[#F9F8F6]'
                        : 'text-[#6E6A63]'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setMobileGridCols(2)}
                    aria-label="Two column view"
                    className={`p-1.5 rounded transition-colors ${
                      mobileGridCols === 2
                        ? 'bg-[#141414] text-[#F9F8F6]'
                        : 'text-[#6E6A63]'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sliding Indicator Category Filter (Horizontal Scroll with no-scrollbar) */}
            <div className="relative inline-flex items-center bg-[#E5E0D8]/60 p-1 rounded-full overflow-x-auto no-scrollbar max-w-full">
              <span
                className="absolute top-1 bottom-1 bg-[#141414] rounded-full transition-all duration-300 ease-out"
                style={{
                  left: `${pillStyle.left}px`,
                  width: `${pillStyle.width}px`,
                }}
              />
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat && !filterWishlistOnly;
                return (
                  <button
                    key={cat}
                    ref={(el) => (tabRefs.current[cat] = el)}
                    onClick={() => {
                      setActiveCategory(cat);
                      setFilterWishlistOnly(false);
                    }}
                    className={`relative z-10 px-3.5 sm:px-5 py-2 text-xs tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-300 ${
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

            {/* Active Wishlist Filter Notice */}
            {filterWishlistOnly && (
              <div className="flex items-center justify-between bg-[#141414] text-[#F9F8F6] px-4 py-2.5 text-xs rounded-xs animate-modal-in">
                <span className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 fill-current text-[#E5E0D8]" />
                  Viewing Saved Pieces ({filteredProducts.length})
                </span>
                <button
                  onClick={() => setFilterWishlistOnly(false)}
                  className="text-[11px] tracking-wider uppercase underline underline-offset-2 hover:opacity-75"
                >
                  View All Pieces
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20 border border-[#E5E0D8] px-4">
            <p className="font-editorial text-2xl mb-2">No pieces found</p>
            <p className="text-xs sm:text-sm text-[#6E6A63] mb-5">
              {filterWishlistOnly
                ? 'You have not added any pieces to your wishlist yet.'
                : 'Try clearing your search or selecting another category.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setFilterWishlistOnly(false);
              }}
              className="text-xs tracking-[0.18em] uppercase underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid ${
              mobileGridCols === 1 ? 'grid-cols-1' : 'grid-cols-2'
            } sm:grid-cols-2 lg:grid-cols-4 gap-x-3.5 sm:gap-x-6 gap-y-7 sm:gap-y-12`}
          >
            {filteredProducts.map((product, index) => {
              const isWished = wishlist.includes(product.id);
              return (
                <Reveal key={product.id} delay={(index % 4) * 60}>
                  <article className="group flex flex-col h-full">
                    {/* Image Card with Crossfade Swap & Mobile Touch-friendly Controls */}
                    <div
                      onClick={() => openQuickView(product)}
                      className="relative aspect-[3/4] overflow-hidden bg-[#E5E0D8]/50 cursor-pointer rounded-xs"
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
                        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#F9F8F6]/90 backdrop-blur-xs text-[#141414] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] tracking-[0.16em] uppercase">
                          {product.badge}
                        </span>
                      )}

                      {/* Top-right actions */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2 z-10">
                        <button
                          onClick={(e) => toggleWishlist(product.id, e)}
                          aria-label="Toggle wishlist"
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F9F8F6]/95 backdrop-blur-xs flex items-center justify-center hover:bg-[#141414] hover:text-[#F9F8F6] active:scale-90 transition-all shadow-sm ${
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
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F9F8F6]/95 backdrop-blur-xs flex items-center justify-center sm:opacity-0 sm:translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 hover:bg-[#141414] hover:text-[#F9F8F6] active:scale-90 shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quick-Add Size Bar on Hover (Desktop) or 1-Col Mobile */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 bg-[#F9F8F6]/95 backdrop-blur-md px-2 sm:px-3 py-2 sm:py-2.5 transition-all duration-300 ${
                          mobileGridCols === 1
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                        }`}
                      >
                        <p className="text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#6E6A63] mb-1 sm:mb-1.5 text-center">
                          Quick Add
                        </p>
                        <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={() =>
                                addToCart(product, sz, product.colors[0].name)
                              }
                              className="min-w-[26px] sm:min-w-[30px] h-6 sm:h-7 px-1.5 sm:px-2 text-[10px] sm:text-[11px] border border-[#E5E0D8] hover:border-[#141414] hover:bg-[#141414] hover:text-[#F9F8F6] active:scale-95 transition-all"
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="pt-3 sm:pt-4 flex flex-col gap-1 flex-1 justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1.5">
                          <h3
                            onClick={() => openQuickView(product)}
                            className="font-editorial text-sm sm:text-lg leading-snug cursor-pointer hover:opacity-70 transition-opacity line-clamp-1 sm:line-clamp-none"
                          >
                            {product.name}
                          </h3>
                          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                            ${product.price}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#6E6A63]">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1">
                            {product.colors.map((c) => (
                              <span
                                key={c.name}
                                title={c.name}
                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black/15"
                                style={{ backgroundColor: c.hex }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Mobile 2-column Quick Add Button */}
                      {mobileGridCols === 2 && (
                        <button
                          onClick={() => openQuickView(product)}
                          className="sm:hidden mt-2.5 w-full py-1.5 text-[10px] tracking-[0.14em] uppercase border border-[#E5E0D8] text-[#141414] hover:border-[#141414] active:bg-[#141414] active:text-[#F9F8F6] transition-colors"
                        >
                          Select Size +
                        </button>
                      )}
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
        className="bg-[#E5E0D8]/45 border-y border-[#E5E0D8] py-16 sm:py-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
              <div>
                <p className="text-xs tracking-[0.24em] uppercase text-[#6E6A63] mb-2">
                  Editorial Study 04
                </p>
                <h2 className="font-editorial text-3xl sm:text-5xl font-light">
                  Interactive Lookbook
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6E6A63] max-w-md">
                Select any pulsing atelier marker to inspect styling notes and
                shop the garment directly.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Asymmetric Frame 1 */}
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#141414] rounded-xs">
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
                        className="relative w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <span className="hotspot-ring absolute inset-0 rounded-full bg-[#F9F8F6]" />
                        <span className="relative w-4 h-4 sm:w-3.5 sm:h-3.5 rounded-full bg-[#F9F8F6] border-2 border-[#141414] shadow-md" />
                      </button>

                      {isOpen && (
                        <div className="animate-sheet-up sm:animate-modal-in fixed sm:absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:mt-3 sm:w-64 z-40 bg-[#F9F8F6]/95 backdrop-blur-md p-4 shadow-2xl sm:shadow-xl border border-[#E5E0D8] rounded-xs">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[10px] tracking-[0.2em] uppercase text-[#6E6A63]">
                                {prod.category}
                              </p>
                              <h4 className="font-editorial text-base sm:text-lg leading-snug mt-0.5">
                                {prod.name}
                              </h4>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveHotspot(null);
                              }}
                              aria-label="Close tooltip"
                              className="p-1 text-[#6E6A63] hover:text-[#141414] -mt-1 -mr-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-[#6E6A63] mt-1.5 leading-relaxed">
                            {hs.note}
                          </p>
                          <div className="mt-3 pt-3 border-t border-[#E5E0D8] flex items-center justify-between">
                            <span className="text-xs font-semibold">
                              ${prod.price}
                            </span>
                            <button
                              onClick={() => {
                                setActiveHotspot(null);
                                openQuickView(prod);
                              }}
                              className="text-[11px] tracking-[0.16em] uppercase underline underline-offset-4 hover:opacity-65 active:opacity-40"
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
              <div className="relative aspect-[3/4] overflow-hidden bg-[#141414] rounded-xs">
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
                        className="relative w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <span className="hotspot-ring absolute inset-0 rounded-full bg-[#F9F8F6]" />
                        <span className="relative w-4 h-4 sm:w-3.5 sm:h-3.5 rounded-full bg-[#F9F8F6] border-2 border-[#141414] shadow-md" />
                      </button>

                      {isOpen && (
                        <div className="animate-sheet-up sm:animate-modal-in fixed sm:absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:mt-3 sm:w-60 z-40 bg-[#F9F8F6]/95 backdrop-blur-md p-4 shadow-2xl sm:shadow-xl border border-[#E5E0D8] rounded-xs">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[10px] tracking-[0.2em] uppercase text-[#6E6A63]">
                                {prod.category}
                              </p>
                              <h4 className="font-editorial text-base sm:text-lg leading-snug mt-0.5">
                                {prod.name}
                              </h4>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveHotspot(null);
                              }}
                              aria-label="Close tooltip"
                              className="p-1 text-[#6E6A63] hover:text-[#141414] -mt-1 -mr-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-[#6E6A63] mt-1.5 leading-relaxed">
                            {hs.note}
                          </p>
                          <div className="mt-3 pt-3 border-t border-[#E5E0D8] flex items-center justify-between">
                            <span className="text-xs font-semibold">
                              ${prod.price}
                            </span>
                            <button
                              onClick={() => {
                                setActiveHotspot(null);
                                openQuickView(prod);
                              }}
                              className="text-[11px] tracking-[0.16em] uppercase underline underline-offset-4 hover:opacity-65 active:opacity-40"
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
      {/* BOUTIQUE LOCATION & GOOGLE MAPS                                   */}
      {/* ================================================================= */}
      <section id="location" className="bg-[#E5E0D8]/35 border-t border-[#E5E0D8] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs tracking-[0.24em] uppercase text-[#6E6A63] mb-2 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#141414]" />
                  Flagship Store &amp; Atelier
                </p>
                <h2 className="font-editorial text-3xl sm:text-5xl font-light">
                  Visit ShreeJi Apparels
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6E6A63] max-w-md leading-relaxed">
                Experience our curated seasonal silhouettes, tactile natural fabrics, and bespoke atelier appointments in person.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Store Information Card */}
            <Reveal className="lg:col-span-5 flex flex-col justify-between bg-[#F9F8F6] p-7 sm:p-9 border border-[#E5E0D8] shadow-sm">
              <div className="space-y-7">
                <div>
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#6E6A63] block mb-1.5 font-medium">
                    Store Address
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-light mb-2">
                    Shreeji Apparels
                  </h3>
                  <p className="text-sm text-[#141414]/85 leading-relaxed">
                    Gaytree Puram Colony, Jhanjhari Block,
                    <br />
                    Gonda, Uttar Pradesh 271001, India
                  </p>
                </div>

                <div className="pt-5 border-t border-[#E5E0D8] space-y-3.5">
                  <div className="flex items-start gap-3 text-xs text-[#141414]/80">
                    <Clock className="w-4 h-4 text-[#6E6A63] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#141414]">Opening Hours</p>
                      <p className="text-[#6E6A63] mt-0.5">Monday – Saturday: 10:00 AM – 8:30 PM</p>
                      <p className="text-[#6E6A63]">Sunday: 11:00 AM – 7:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-[#141414]/80 pt-2">
                    <Sparkles className="w-4 h-4 text-[#6E6A63] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#141414]">In-Store Services</p>
                      <p className="text-[#6E6A63] mt-0.5">Custom Tailoring · Personal Styling · Fabric Consultations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E0D8] flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.app.goo.gl/sPNFa2axQUCDRqHN7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#141414] text-[#F9F8F6] px-6 py-3.5 text-xs tracking-[0.18em] uppercase font-medium hover:bg-[#2c2c2c] active:scale-[0.98] transition-all text-center"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Directions
                </a>
                <a
                  href="https://maps.app.goo.gl/sPNFa2axQUCDRqHN7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#141414]/30 text-[#141414] px-5 py-3.5 text-xs tracking-[0.16em] uppercase hover:bg-[#141414]/5 active:scale-[0.98] transition-all text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Google Maps
                </a>
              </div>
            </Reveal>

            {/* Interactive Embedded Google Map */}
            <Reveal delay={120} className="lg:col-span-7 overflow-hidden border border-[#E5E0D8] shadow-sm relative min-h-[380px] sm:min-h-[440px] bg-[#E5E0D8]/50">
              <iframe
                title="ShreeJi Apparels Google Map Location"
                src="https://maps.google.com/maps?q=Shreeji+Apparels,+Gaytree+Puram+Colony,+Jhanjhari+Block,+Gonda,+Uttar+Pradesh+271001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 pointer-events-none bg-[#F9F8F6]/90 backdrop-blur-xs px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-[#141414] border border-[#141414]/10 shadow-sm hidden sm:block">
                📍 Shreeji Apparels · Gonda, UP
              </div>
            </Reveal>
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
                <p className="tracking-[0.2em] uppercase text-[#E5E0D8]/50 mb-4 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#E5E0D8]/70" />
                  Boutique &amp; Store
                </p>
                <div className="text-[#E5E0D8]/80 space-y-1.5 leading-relaxed">
                  <p className="font-medium text-[#F9F8F6]">Shreeji Apparels</p>
                  <p>Gaytree Puram Colony,</p>
                  <p>Jhanjhari Block, Gonda,</p>
                  <p>Uttar Pradesh 271001</p>
                  <a
                    href="https://maps.app.goo.gl/sPNFa2axQUCDRqHN7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#E5E0D8] underline underline-offset-4 hover:text-white pt-2 text-[11px] uppercase tracking-wider transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
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
      {/* QUICK VIEW MODAL / MOBILE BOTTOM SHEET                           */}
      {/* ================================================================= */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div
            onClick={() => setQuickViewProduct(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          <div className="animate-sheet-up sm:animate-modal-in relative z-10 bg-[#F9F8F6] max-w-3xl w-full rounded-t-2xl sm:rounded-none grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl max-h-[88vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Mobile Drag Handle */}
            <div className="md:hidden pt-3 pb-1 flex justify-center sticky top-0 bg-[#F9F8F6] z-30">
              <div className="w-10 h-1 rounded-full bg-[#141414]/25" />
            </div>

            <button
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close modal"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F9F8F6]/90 flex items-center justify-center hover:bg-[#141414] hover:text-[#F9F8F6] active:scale-90 transition-all shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/3] xs:aspect-[3/4] md:aspect-auto bg-[#E5E0D8] max-h-[340px] sm:max-h-none">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#6E6A63]">
                  {quickViewProduct.category}
                </p>
                <h3 className="font-editorial text-2xl sm:text-3xl font-light mt-1">
                  {quickViewProduct.name}
                </h3>
                <p className="text-base sm:text-lg font-medium mt-1.5 sm:mt-2">
                  ${quickViewProduct.price}
                </p>
                <p className="text-xs sm:text-sm text-[#6E6A63] mt-3 sm:mt-4 leading-relaxed">
                  {quickViewProduct.description}
                </p>
                <p className="text-[11px] sm:text-xs text-[#141414]/80 mt-3 pt-3 border-t border-[#E5E0D8]">
                  <span className="uppercase tracking-[0.14em] text-[#6E6A63]">
                    Fabric:{' '}
                  </span>
                  {quickViewProduct.fabric}
                </p>

                {/* Color Swatches */}
                <div className="mt-5 sm:mt-6">
                  <p className="text-[11px] tracking-[0.16em] uppercase text-[#6E6A63] mb-2">
                    Color: <span className="text-[#141414] font-medium">{qvColor}</span>
                  </p>
                  <div className="flex items-center gap-2.5">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setQvColor(c.name)}
                        title={c.name}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0.5 border transition-all active:scale-95 ${
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
                <div className="mt-5 sm:mt-6">
                  <p className="text-[11px] tracking-[0.16em] uppercase text-[#6E6A63] mb-2">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setQvSize(sz)}
                        className={`min-w-[44px] h-10 px-3.5 text-xs tracking-wider border active:scale-95 transition-all ${
                          qvSize === sz
                            ? 'bg-[#141414] text-[#F9F8F6] border-[#141414] font-medium'
                            : 'border-[#E5E0D8] hover:border-[#141414]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-[#F9F8F6] pt-4 pb-safe border-t border-[#E5E0D8]/60 sm:border-0 sm:static mt-6">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, qvSize, qvColor);
                    setQuickViewProduct(null);
                    setCartOpen(true);
                  }}
                  className="w-full bg-[#141414] text-[#F9F8F6] py-3.5 sm:py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#2c2c2c] active:scale-[0.99] transition-all font-medium"
                >
                  Add to Bag — ${quickViewProduct.price}
                </button>
              </div>
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
          <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-[#E5E0D8] flex items-center justify-between">
            <h3 className="font-editorial text-xl sm:text-2xl">
              Shopping Bag ({cartCount})
            </h3>
            <button
              onClick={() => setCartOpen(false)}
              aria-label="Close bag"
              className="p-1.5 hover:opacity-65 active:scale-90 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {!checkoutDone && (
            <div className="px-5 sm:px-6 py-3.5 bg-[#E5E0D8]/40 border-b border-[#E5E0D8]">
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
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 sm:py-5">
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
                  className="mt-8 border border-[#141414] px-6 py-3 text-xs tracking-[0.18em] uppercase hover:bg-[#141414] hover:text-[#F9F8F6] active:scale-95 transition-all"
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
                    className="py-4 sm:py-5 flex gap-3.5 sm:gap-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 sm:w-20 h-24 sm:h-26 object-cover bg-[#E5E0D8] shrink-0 rounded-xs"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-editorial text-base sm:text-lg leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeCartItem(idx)}
                            aria-label="Remove item"
                            className="p-1 text-[#6E6A63] hover:text-[#141414] active:scale-90 transition-transform"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-[#6E6A63] mt-0.5">
                          {item.color} · Size {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-[#E5E0D8] rounded-xs">
                          <button
                            onClick={() => updateCartQty(idx, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#E5E0D8]/50 active:bg-[#E5E0D8]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(idx, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#E5E0D8]/50 active:bg-[#E5E0D8]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
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
            <div className="p-5 sm:p-6 border-t border-[#E5E0D8] bg-[#F9F8F6] pb-safe">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-[#6E6A63]">Subtotal</span>
                <span className="font-medium">${cartSubtotal}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6E6A63] mb-4 sm:mb-5">
                <span>Shipping</span>
                <span>
                  {cartSubtotal >= freeShippingThreshold
                    ? 'Complimentary'
                    : '$25'}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#141414] text-[#F9F8F6] py-3.5 sm:py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#2a2a2a] active:scale-[0.99] transition-all font-medium"
              >
                Proceed to Checkout — ${cartSubtotal + (cartSubtotal >= freeShippingThreshold ? 0 : 25)}
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* ================================================================= */}
      {/* MOBILE FLOATING NAVIGATION DOCK                                   */}
      {/* ================================================================= */}
      <nav
        aria-label="Mobile quick dock"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 lg:hidden flex items-center gap-1 bg-[#141414]/90 backdrop-blur-md text-[#F9F8F6] px-3.5 py-2 rounded-full shadow-2xl border border-white/15 animate-dock select-none"
      >
        <a
          href="#"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-xs uppercase tracking-wider"
        >
          <Compass className="w-4 h-4" />
          <span className="text-[11px] font-medium hidden xs:inline">Atelier</span>
        </a>
        <a
          href="#collection"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-xs uppercase tracking-wider"
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="text-[11px] font-medium hidden xs:inline">Shop</span>
        </a>
        <button
          onClick={() => {
            setFilterWishlistOnly((prev) => !prev);
            document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-xs uppercase tracking-wider ${
            filterWishlistOnly ? 'bg-white text-[#141414]' : ''
          }`}
          aria-label="Toggle wishlist filter"
        >
          <Heart className={`w-4 h-4 ${filterWishlistOnly ? 'fill-current' : ''}`} />
          {wishlist.length > 0 && (
            <span
              className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                filterWishlistOnly ? 'bg-[#141414] text-[#F9F8F6]' : 'bg-[#F9F8F6] text-[#141414]'
              }`}
            >
              {wishlist.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#141414] active:scale-95 transition-all text-xs uppercase tracking-wider font-semibold"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-[11px]">{cartCount}</span>
        </button>
      </nav>

      {/* ================================================================= */}
      {/* FLOATING TOAST NOTIFICATION                                       */}
      {/* ================================================================= */}
      {toast && (
        <div className="animate-modal-in fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#141414] text-[#F9F8F6] px-5 py-3 text-xs tracking-[0.12em] shadow-xl flex items-center gap-2.5 rounded-xs">
          <Check className="w-3.5 h-3.5 text-[#E5E0D8]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
