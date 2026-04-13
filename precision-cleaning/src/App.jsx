import React from "react";
import { useState, useEffect, useRef } from "react";
import logoImg from "./assets/logo.png";

// ─── Color & Design Tokens ───
const COLORS = {
  navy: "#0B1D3A",
  navyLight: "#132B4F",
  navyMid: "#1A3A66",
  gold: "#C4943D",
  goldLight: "#D4A94E",
  goldPale: "#F5ECD7",
  cream: "#FAF7F0",
  white: "#FFFFFF",
  gray100: "#F8F9FA",
  gray200: "#E9ECEF",
  gray400: "#ADB5BD",
  gray600: "#6C757D",
  gray800: "#343A40",
  blue: "#2E6B9E",
  blueLight: "#E8F1F8",
};

// ─── Fonts (loaded via Google Fonts link in HTML head) ───
const FONT = {
  display: "'Playfair Display', serif",
  body: "'DM Sans', sans-serif",
  accent: "'Cormorant Garamond', serif",
};

// ─── Service Data ───
const SERVICE_DATA = {
  residential: {
    hero: {
      title: "Your Home,\nImmaculately Restored",
      subtitle: "Premium deep cleaning for Miami's finest residences",
      tagline: "RESIDENTIAL SERVICES",
    },
    services: [
      {
        icon: "🛋️",
        title: "Upholstery Cleaning",
        description: "Deep extraction cleaning for sofas, chairs, sectionals, and ottomans. We remove embedded dirt, allergens, pet dander, and stains while preserving fabric integrity.",
        details: ["Fabric-specific treatment protocols", "Stain pre-treatment & odor neutralization", "Scotchgard protection available", "Safe for delicate & designer fabrics"],
      },
      {
        icon: "🏠",
        title: "Carpet Deep Cleaning",
        description: "Hot water extraction and steam cleaning that reaches deep into carpet fibers, removing years of buildup, allergens, and bacteria.",
        details: ["Full room & whole-home packages", "Pet stain & odor specialty treatment", "High-traffic area restoration", "Hypoallergenic & eco-friendly options"],
      },
      {
        icon: "✨",
        title: "Tile & Grout Restoration",
        description: "High-pressure cleaning and grout color sealing that makes tile floors, showers, and backsplashes look brand new again.",
        details: ["Kitchen & bathroom specialists", "Grout recoloring & sealing", "Natural stone safe methods", "Mold & mildew elimination"],
      },
      {
        icon: "🪟",
        title: "Area Rug Cleaning",
        description: "Specialized care for Oriental, Persian, silk, and wool rugs. On-site or pickup service with full inspection and hand-finishing.",
        details: ["Fringe cleaning & repair", "Color testing & fiber analysis", "Moth & pest treatment", "Padding cleaning & replacement"],
      },
      {
        icon: "🛏️",
        title: "Mattress Sanitization",
        description: "UV sanitization and deep extraction to remove dust mites, allergens, sweat, and stains from mattresses of all sizes.",
        details: ["Hypoallergenic treatment", "Stain & odor removal", "All mattress types accepted", "Same-day service available"],
      },
      {
        icon: "🚗",
        title: "Auto Interior Detailing",
        description: "Complete interior cleaning for your vehicle—seats, carpets, headliner, and trunk. Leather conditioning and fabric protection included.",
        details: ["Leather care & conditioning", "Carpet & floor mat deep clean", "Dashboard & console detailing", "Odor elimination treatment"],
      },
    ],
    maintenance: {
      title: "Home Maintenance Plans",
      subtitle: "Keep your home pristine year-round with scheduled deep cleanings",
      plans: [
        {
          name: "Essential",
          frequency: "Quarterly",
          price: "Starting at $149/month",
          features: ["Carpet cleaning for up to 3 rooms", "One upholstery piece per visit", "10% off additional services", "Priority scheduling", "Consistent technician assignment"],
          popular: false,
        },
        {
          name: "Premium",
          frequency: "Quarterly",
          price: "Starting at $279/month",
          features: ["Carpet cleaning for up to 5 rooms", "Two upholstery pieces per visit", "Tile & grout in one bathroom", "15% off additional services", "Same-day emergency service", "Annual Scotchgard application"],
          popular: true,
        },
        {
          name: "Elite",
          frequency: "Monthly",
          price: "Starting at $449/month",
          features: ["Whole-home carpet cleaning", "All upholstery included", "Full tile & grout service", "20% off additional services", "24/7 priority emergency line", "Annual rug cleaning included", "Mattress sanitization bi-annually"],
          popular: false,
        },
      ],
    },
  },
  commercial: {
    hero: {
      title: "Spaces That\nMean Business",
      subtitle: "Professional cleaning solutions for Miami's commercial properties",
      tagline: "COMMERCIAL SERVICES",
    },
    services: [
      {
        icon: "🏢",
        title: "Office Carpet Cleaning",
        description: "Low-moisture, fast-drying carpet cleaning designed for minimal business disruption. After-hours and weekend scheduling available.",
        details: ["Encapsulation & HWE methods", "Cubicle & open floor plans", "After-hours scheduling", "Fast-dry for next-day readiness"],
      },
      {
        icon: "🏪",
        title: "Retail Floor Care",
        description: "High-traffic tile, VCT, and carpet cleaning that keeps your retail space looking sharp and inviting for customers.",
        details: ["VCT stripping & waxing", "Tile & grout deep cleaning", "Carpet extraction & bonnet cleaning", "Entrance mat programs"],
      },
      {
        icon: "🏨",
        title: "Hospitality Cleaning",
        description: "Hotel, Airbnb, and short-term rental cleaning with fast turnaround. Guest-ready results every time.",
        details: ["Room turnover cleaning", "Lobby & common area maintenance", "Upholstery & drapery service", "Odor treatment & sanitization"],
      },
      {
        icon: "🏥",
        title: "Medical & Healthcare",
        description: "Sanitization-grade cleaning for medical offices, clinics, and wellness centers meeting healthcare facility standards.",
        details: ["EPA-registered disinfection", "Waiting room deep cleaning", "Exam room sanitization", "HIPAA-conscious service protocols"],
      },
      {
        icon: "🍽️",
        title: "Restaurant & Kitchen",
        description: "Degreasing, tile cleaning, and upholstery care for dining areas, kitchens, and bar spaces.",
        details: ["Kitchen tile degreasing", "Booth & banquette cleaning", "Bar area deep clean", "Health code compliance support"],
      },
      {
        icon: "🏗️",
        title: "Post-Construction",
        description: "Final-phase cleaning for new builds and renovations—dust removal, surface cleaning, and floor finishing.",
        details: ["Construction dust extraction", "Window & surface cleaning", "Floor polishing & sealing", "Move-in ready preparation"],
      },
    ],
    maintenance: {
      title: "Commercial Maintenance Plans",
      subtitle: "Reliable scheduling to keep your business looking professional",
      plans: [
        {
          name: "Standard",
          frequency: "Monthly",
          price: "Custom Quote",
          features: ["Carpet cleaning up to 2,000 sq ft", "Common area tile maintenance", "Quarterly deep clean included", "After-hours service", "Dedicated account manager"],
          popular: false,
        },
        {
          name: "Professional",
          frequency: "Monthly",
          price: "Custom Quote",
          features: ["Carpet cleaning up to 5,000 sq ft", "Full tile & grout maintenance", "Upholstery rotation program", "Emergency spill response", "Monthly detailed reports", "Weekend availability"],
          popular: true,
        },
        {
          name: "Enterprise",
          frequency: "Monthly",
          price: "Custom Quote",
          features: ["Unlimited square footage", "All surfaces covered", "24/7 emergency response", "Multi-location management", "Quarterly strategic reviews", "Dedicated on-call team", "Custom KPI tracking"],
          popular: false,
        },
      ],
    },
  },
  marine: {
    hero: {
      title: "Yacht Interiors,\nPerfected",
      subtitle: "Expert marine cleaning for Miami's yachts, boats, and vessels",
      tagline: "MARINE SERVICES",
    },
    services: [
      {
        icon: "🛋️",
        title: "Salon Upholstery Cleaning",
        description: "Deep extraction cleaning for all salon cushions, settees, and cabin upholstery. We pull out salt, sweat, mildew, and embedded grime while protecting marine-grade fabrics.",
        details: ["Hot water extraction on all cushion types", "Salt & mineral deposit removal", "Mildew & musty odor elimination", "Fabric protection treatment applied"],
      },
      {
        icon: "🧶",
        title: "Yacht Carpet Cleaning",
        description: "Full deep cleaning for salon carpets, stateroom flooring, and flybridge mats. We restore color, lift stains, and leave zero soapy residue behind.",
        details: ["Diesel, fish & bilge odor treatment", "Stain pre-treatment on every visit", "Fast-dry methods for quick turnaround", "All carpet types including berber & marine cut-pile"],
      },
      {
        icon: "🪨",
        title: "Area Rug & Mat Cleaning",
        description: "On-site deep cleaning for cockpit mats, interior area rugs, and decorative rugs. We treat each piece based on its fiber and condition.",
        details: ["Color-safe cleaning for all rug types", "Non-skid backing preserved", "Fringe & edge cleaning", "UV damage & fading assessment"],
      },
      {
        icon: "💨",
        title: "Mildew & Odor Removal",
        description: "Targeted treatment for that stubborn musty, mildewy smell that lives in cushions, carpet, and closed-up cabins. We don't mask it — we eliminate it at the source.",
        details: ["Enzyme-based odor neutralization", "Mildew spore extraction & treatment", "Bilge, diesel & fish odor elimination", "Preventative anti-mildew coating available"],
      },
      {
        icon: "🛏️",
        title: "Cabin & Mattress Sanitization",
        description: "Deep cleaning for stateroom mattresses and bedding surfaces. Removes sweat, salt residue, mildew, and allergens so every night aboard feels fresh.",
        details: ["UV sanitization treatment", "Salt & moisture extraction", "All mattress sizes & types", "Odor neutralization included"],
      },
      {
        icon: "🌊",
        title: "Pre-Charter & Post-Season Refresh",
        description: "Full interior soft-surface refresh before charter guests arrive or after a long season. Carpets, cushions, rugs, and cabins — all done in one visit.",
        details: ["Complete upholstery & carpet service", "Mold & mildew inspection included", "Charter-ready same-day turnaround", "Seasonal storage prep treatment"],
      },
    ],
    maintenance: {
      title: "Marine Maintenance Plans",
      subtitle: "Protect your investment with regular professional interior care",
      plans: [
        {
          name: "Dockside",
          frequency: "Monthly",
          price: "Starting at $349/month",
          features: ["Salon & cabin carpet cleaning", "Main upholstery maintenance", "Quick mildew inspection", "Priority scheduling", "Vessels up to 40ft"],
          popular: false,
        },
        {
          name: "Captain's Choice",
          frequency: "Monthly",
          price: "Starting at $599/month",
          features: ["Full interior carpet & upholstery", "Galley tile & grout service", "Mattress rotation program", "Emergency pre-charter cleaning", "Vessels up to 65ft", "Salt protection treatments"],
          popular: true,
        },
        {
          name: "Fleet",
          frequency: "Monthly",
          price: "Custom Quote",
          features: ["Unlimited vessel size", "Complete interior program", "24/7 charter-ready service", "Multi-vessel discounts", "Dedicated marine team", "Seasonal deep clean included", "Priority storm-prep support"],
          popular: false,
        },
      ],
    },
  },
};

const REVIEWS = [
  { text: "Called in the morning, they were at my door by 2pm. My carpets haven't looked this good since move-in day. Incredible turnaround.", author: "Maria L.", location: "Brickell", stars: 5 },
  { text: "We had tile and grout cleaned in our kitchen and bathrooms. The difference was night and day. Professional, on time, and very fair pricing.", author: "James & Carla T.", location: "Coral Gables", stars: 5 },
  { text: "Ethan's team saved our couch — we were ready to replace it. The upholstery looks brand new. Will absolutely use them again.", author: "David R.", location: "Coconut Grove", stars: 5 },
  { text: "They clean our 52ft Azimut every two weeks. The salon carpets and cushions always look perfect for charter guests.", author: "Captain Mike D.", location: "Miami Beach Marina", stars: 5 },
  { text: "Our office carpets see hundreds of people daily. Precision keeps them looking like new with zero disruption to business.", author: "Sandra K.", location: "Downtown Miami", stars: 5 },
];

// ─── Animated Counter ───
function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Fade In Component ───
function FadeIn({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", none: "none" };

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Main App ───
export default function PrecisionCleaning() {
  const [activeTab, setActiveTab] = useState("residential");
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedService, setExpandedService] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const data = SERVICE_DATA[activeTab];

  const switchTab = (tab) => {
    setActiveTab(tab);
    setShowMaintenance(false);
    setExpandedService(null);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; overflow-x: hidden; max-width: 100vw; }
        body { font-family: ${FONT.body}; color: ${COLORS.gray800}; background: ${COLORS.white}; -webkit-font-smoothing: antialiased; overflow-x: hidden; max-width: 100vw; }

        ::selection { background: ${COLORS.gold}; color: ${COLORS.white}; }

        /* Subtle grain overlay */
        .grain::before {
          content: '';
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
        }

        .nav-tab { position: relative; padding: 8px 0; font-weight: 500; letter-spacing: 0.5px; cursor: pointer; transition: color 0.3s; }
        .nav-tab::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: ${COLORS.gold}; transition: width 0.3s ease; }
        .nav-tab:hover::after, .nav-tab.active::after { width: 100%; }
        .nav-tab.active { color: ${COLORS.gold}; }

        .service-card { transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(11, 29, 58, 0.12); }

        .plan-card { transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .plan-card:hover { transform: translateY(-6px); }
        .plan-card.popular { border: 2px solid ${COLORS.gold}; transform: scale(1.02); }
        .plan-card.popular:hover { transform: scale(1.02) translateY(-6px); }

        .gold-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: ${COLORS.gold}; color: ${COLORS.white};
          font-family: ${FONT.body}; font-weight: 600; font-size: 15px;
          border: none; border-radius: 4px; cursor: pointer; letter-spacing: 0.5px;
          transition: all 0.3s ease; text-decoration: none;
        }
        .gold-btn:hover { background: ${COLORS.goldLight}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(196, 148, 61, 0.3); }

        .outline-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: transparent; color: ${COLORS.white};
          font-family: ${FONT.body}; font-weight: 600; font-size: 15px;
          border: 2px solid rgba(255,255,255,0.4); border-radius: 4px; cursor: pointer;
          transition: all 0.3s ease; text-decoration: none;
        }
        .outline-btn:hover { border-color: ${COLORS.white}; background: rgba(255,255,255,0.1); }

        .dark-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: ${COLORS.navy}; color: ${COLORS.white};
          font-family: ${FONT.body}; font-weight: 600; font-size: 15px;
          border: none; border-radius: 4px; cursor: pointer;
          transition: all 0.3s ease; text-decoration: none;
        }
        .dark-btn:hover { background: ${COLORS.navyLight}; transform: translateY(-2px); }

        .stat-divider { width: 1px; height: 50px; background: rgba(255,255,255,0.2); }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

        .review-track {
          display: flex; gap: 24px;
          animation: scroll-reviews 30s linear infinite;
          width: max-content;
        }
        .review-track:hover { animation-play-state: paused; }
        @keyframes scroll-reviews { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .hero-title { font-size: 36px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column !important; gap: 24px !important; margin-bottom: 60px !important; }
          .stat-divider { width: 50px !important; height: 1px !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .scroll-indicator { display: none !important; }
        }

        @media (min-width: 769px) {
          .nav-mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <div className="grain" style={{ overflowX: "hidden", maxWidth: "100vw" }}>
        {/* ─── NAVIGATION ─── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? "rgba(11, 29, 58, 0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "all 0.4s ease",
          borderBottom: scrolled ? `1px solid rgba(196, 148, 61, 0.15)` : "1px solid transparent",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 100 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={logoImg} alt="Precision Cleaning Services" style={{ height: 120, width: "auto" }} />
            </div>

            {/* Desktop Nav */}
            <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {["residential", "commercial", "marine"].map((tab) => (
                <span key={tab} className={`nav-tab ${activeTab === tab && !showMaintenance ? "active" : ""}`}
                  onClick={() => switchTab(tab)}
                  style={{ color: activeTab === tab && !showMaintenance ? COLORS.gold : "rgba(255,255,255,0.75)", fontSize: 13, textTransform: "uppercase", letterSpacing: 1.5 }}>
                  {tab}
                </span>
              ))}
              <span style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />
              <span className={`nav-tab ${showMaintenance ? "active" : ""}`}
                onClick={() => setShowMaintenance(!showMaintenance)}
                style={{ color: showMaintenance ? COLORS.gold : "rgba(255,255,255,0.75)", fontSize: 13, textTransform: "uppercase", letterSpacing: 1.5 }}>
                Maintenance Plans
              </span>
              <a href="tel:3052096985" className="gold-btn hide-mobile" style={{ padding: "10px 24px", fontSize: 13, whiteSpace: "nowrap" }}>
                (305) 209-6985
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="nav-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 8 }}>
              <span style={{ width: 24, height: 2, background: COLORS.white, transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ width: 24, height: 2, background: COLORS.white, transition: "all 0.3s", opacity: mobileMenuOpen ? 0 : 1 }} />
              <span style={{ width: 24, height: 2, background: COLORS.white, transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu" style={{ background: COLORS.navy, padding: "16px 24px 24px", borderTop: `1px solid rgba(255,255,255,0.08)` }}>
              {["residential", "commercial", "marine"].map((tab) => (
                <div key={tab} onClick={() => switchTab(tab)}
                  style={{ padding: "12px 0", color: activeTab === tab ? COLORS.gold : "rgba(255,255,255,0.7)", fontSize: 14, textTransform: "uppercase", letterSpacing: 1.5, cursor: "pointer", fontWeight: 500 }}>
                  {tab}
                </div>
              ))}
              <div onClick={() => { setShowMaintenance(!showMaintenance); setMobileMenuOpen(false); }}
                style={{ padding: "12px 0", color: showMaintenance ? COLORS.gold : "rgba(255,255,255,0.7)", fontSize: 14, textTransform: "uppercase", letterSpacing: 1.5, cursor: "pointer", fontWeight: 500 }}>
                Maintenance Plans
              </div>
              <a href="tel:3052096985" className="gold-btn" style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>(305) 209-6985</a>
            </div>
          )}
        </nav>

        {/* ─── HERO SECTION ─── */}
        <section style={{
          position: "relative", minHeight: "60vh", display: "flex", alignItems: "center",
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 50%, ${COLORS.navyMid} 100%)`,
          overflow: "hidden",
        }}>
          {/* Decorative elements */}
          <div style={{ position: "absolute", top: "10%", right: "-5%", width: "min(400px, 50vw)", height: "min(400px, 50vw)", borderRadius: "50%", border: `1px solid rgba(196, 148, 61, 0.08)` }} />
          <div style={{ position: "absolute", top: "20%", right: "5%", width: "min(250px, 35vw)", height: "min(250px, 35vw)", borderRadius: "50%", border: `1px solid rgba(196, 148, 61, 0.05)` }} />
          <div style={{ position: "absolute", bottom: "15%", left: "-5%", width: "min(300px, 40vw)", height: "min(300px, 40vw)", borderRadius: "50%", background: `radial-gradient(circle, rgba(196, 148, 61, 0.06), transparent)` }} />

          {/* Gold accent line */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 4, height: "100%", background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, transparent)` }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 48px", width: "100%", position: "relative", zIndex: 2 }}>
            <FadeIn>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 40, height: 1, background: COLORS.gold }} />
                <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>
                  {data.hero.tagline}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="hero-title" style={{
                fontFamily: FONT.display, fontSize: 64, fontWeight: 700, color: COLORS.white,
                lineHeight: 1.1, marginBottom: 24, whiteSpace: "pre-line", maxWidth: 650,
              }}>
                {data.hero.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p style={{ fontFamily: FONT.accent, fontSize: 22, color: "rgba(255,255,255,0.6)", maxWidth: 500, lineHeight: 1.6, fontStyle: "italic", marginBottom: 40 }}>
                {data.hero.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="gold-btn" onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  Explore Services →
                </button>
                <a href="tel:3052096985" className="outline-btn">
                  Get a Free Quote
                </a>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.5}>
              <div className="stats-row" style={{
                display: "flex", alignItems: "center", gap: 40, marginTop: 80,
                paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)",
              }}>
                {(activeTab === "residential" ? [
                  { num: 500, suffix: "+", label: "Homes Cleaned" },
                  { num: 15, suffix: "+", label: "Years Experience" },
                  { num: 100, suffix: "%", label: "Satisfaction Rate" },
                ] : activeTab === "commercial" ? [
                  { num: 300, suffix: "+", label: "Businesses Served" },
                  { num: 15, suffix: "+", label: "Years Experience" },
                  { num: 100, suffix: "%", label: "Satisfaction Rate" },
                ] : [
                  { num: 200, suffix: "+", label: "Vessels Cleaned" },
                  { num: 15, suffix: "+", label: "Years Experience" },
                  { num: 100, suffix: "%", label: "Satisfaction Rate" },
                ]).map((stat, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="stat-divider" />}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: FONT.display, fontSize: 42, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>
                        <AnimatedCounter end={stat.num} suffix={stat.suffix} />
                      </div>
                      <div style={{ fontFamily: FONT.body, fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8, letterSpacing: 1, textTransform: "uppercase" }}>
                        {stat.label}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator" style={{
            position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4,
          }}>
            <span style={{ fontSize: 10, color: COLORS.white, letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
            <div style={{ width: 1, height: 30, background: `linear-gradient(to bottom, ${COLORS.white}, transparent)` }} />
          </div>
        </section>

        {/* ─── TAB SELECTOR BAR ─── */}
        <section style={{ background: COLORS.white, borderBottom: `1px solid ${COLORS.gray200}`, position: "sticky", top: 72, zIndex: 100, overflowX: "hidden" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 0, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            {["residential", "commercial", "marine"].map((tab) => (
              <button key={tab} onClick={() => switchTab(tab)} style={{
                padding: "16px 28px", fontFamily: FONT.body, fontSize: 13, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: 1.5, cursor: "pointer",
                background: "none", border: "none",
                color: activeTab === tab ? COLORS.navy : COLORS.gray400,
                borderBottom: activeTab === tab ? `3px solid ${COLORS.gold}` : "3px solid transparent",
                transition: "all 0.3s ease", whiteSpace: "nowrap",
              }}>
                {tab === "residential" ? "🏠 Residential" : tab === "commercial" ? "🏢 Commercial" : "⛵ Marine"}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button onClick={() => setShowMaintenance(!showMaintenance)} style={{
              padding: "16px 28px", fontFamily: FONT.body, fontSize: 13, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: 1.5, cursor: "pointer",
              background: showMaintenance ? COLORS.goldPale : "none", border: "none",
              color: showMaintenance ? COLORS.gold : COLORS.gray400,
              borderBottom: showMaintenance ? `3px solid ${COLORS.gold}` : "3px solid transparent",
              transition: "all 0.3s ease", borderRadius: showMaintenance ? "4px 4px 0 0" : 0,
            }}>
              📋 Maintenance Plans
            </button>
          </div>
        </section>

        {/* ─── SERVICES SECTION ─── */}
        {!showMaintenance && (
          <section id="services" style={{ background: COLORS.cream, padding: "80px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
              <FadeIn>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                    <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>
                      {data.hero.tagline}
                    </span>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  </div>
                  <h2 style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.navy, lineHeight: 1.2 }}>
                    What We Do
                  </h2>
                  <p style={{ fontFamily: FONT.accent, fontSize: 18, color: COLORS.gray600, marginTop: 12, fontStyle: "italic" }}>
                    Comprehensive {activeTab} cleaning services tailored to your needs
                  </p>
                </div>
              </FadeIn>

              <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {data.services.map((service, i) => (
                  <FadeIn key={`${activeTab}-${i}`} delay={i * 0.08}>
                    <div className="service-card"
                      onClick={() => setExpandedService(expandedService === i ? null : i)}
                      style={{
                        background: COLORS.white, borderRadius: 8, padding: 32, cursor: "pointer",
                        border: expandedService === i ? `1px solid ${COLORS.gold}` : `1px solid ${COLORS.gray200}`,
                        height: "100%", display: "flex", flexDirection: "column",
                      }}>
                      <div style={{ fontSize: 36, marginBottom: 16 }}>{service.icon}</div>
                      <h3 style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>
                        {service.title}
                      </h3>
                      <p style={{ fontFamily: FONT.body, fontSize: 14, color: COLORS.gray600, lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
                        {service.description}
                      </p>

                      {/* Expanded details */}
                      <div style={{
                        maxHeight: expandedService === i ? 300 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}>
                        <div style={{ paddingTop: 16, borderTop: `1px solid ${COLORS.gray200}` }}>
                          {service.details.map((detail, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                              <span style={{ color: COLORS.gold, fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                              <span style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.gray600, lineHeight: 1.5 }}>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, color: COLORS.gold, fontSize: 13, fontWeight: 500 }}>
                        {expandedService === i ? "Show less" : "View details"} <span style={{ transition: "transform 0.3s", transform: expandedService === i ? "rotate(180deg)" : "none" }}>↓</span>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── BEFORE / AFTER RESULTS ─── */}
        {!showMaintenance && activeTab !== "marine" && (
          <section style={{ background: COLORS.navy, padding: "90px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
              <FadeIn>
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                    <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>Real Results</span>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  </div>
                  <h2 style={{ fontFamily: FONT.display, fontSize: 42, fontWeight: 700, color: COLORS.white, lineHeight: 1.15, margin: 0 }}>
                    See the Difference
                  </h2>
                  <p style={{ fontFamily: FONT.accent, fontSize: 19, color: "rgba(255,255,255,0.45)", marginTop: 14, fontStyle: "italic" }}>
                    Actual before &amp; after photos from our jobs
                  </p>
                </div>
              </FadeIn>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }}>

                {/* Carpet */}
                <FadeIn delay={0} style={{ height: "100%" }}>
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
                    <img
                      src="/images/carpet-comparison.jpg"
                      alt="Carpet before and after deep cleaning"
                      style={{ width: "100%", display: "block", objectFit: "cover", flex: 1 }}
                    />
                    <div style={{ background: COLORS.navyLight, padding: "16px 24px" }}>
                      <div style={{ fontFamily: FONT.display, fontSize: 17, fontWeight: 600, color: COLORS.white }}>Carpet Deep Cleaning</div>
                      <div style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>Stains, odor & allergens fully extracted</div>
                    </div>
                  </div>
                </FadeIn>

                {/* Tile */}
                <FadeIn delay={0.1} style={{ height: "100%" }}>
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
                    <img
                      src="/images/tile-comparison.jpg"
                      alt="Tile and grout before and after cleaning"
                      style={{ width: "100%", display: "block", objectFit: "cover", flex: 1 }}
                    />
                    <div style={{ background: COLORS.navyLight, padding: "16px 24px" }}>
                      <div style={{ fontFamily: FONT.display, fontSize: 17, fontWeight: 600, color: COLORS.white }}>Tile &amp; Grout Restoration</div>
                      <div style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>Grout restored to bright white — no replacement needed</div>
                    </div>
                  </div>
                </FadeIn>

              </div>

              <FadeIn delay={0.2}>
                <div style={{ textAlign: "center", marginTop: 52 }}>
                  <a href="tel:3052096985" className="gold-btn" style={{ fontSize: 15, padding: "16px 44px" }}>
                    Get Results Like These — (305) 209-6985
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* ─── MAINTENANCE PLANS SECTION ─── */}
        {showMaintenance && (
          <section style={{ background: COLORS.cream, padding: "80px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
              {/* Sub-tabs for plan category */}
              <FadeIn>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                    <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>
                      {activeTab} PLANS
                    </span>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  </div>
                  <h2 style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.navy, lineHeight: 1.2 }}>
                    {data.maintenance.title}
                  </h2>
                  <p style={{ fontFamily: FONT.accent, fontSize: 18, color: COLORS.gray600, marginTop: 12, fontStyle: "italic", maxWidth: 500, margin: "12px auto 0" }}>
                    {data.maintenance.subtitle}
                  </p>
                </div>
              </FadeIn>

              {/* Plan selector tabs */}
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48 }}>
                {["residential", "commercial", "marine"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    padding: "10px 24px", fontFamily: FONT.body, fontSize: 13, fontWeight: 600,
                    background: activeTab === tab ? COLORS.navy : COLORS.white,
                    color: activeTab === tab ? COLORS.white : COLORS.gray600,
                    border: `1px solid ${activeTab === tab ? COLORS.navy : COLORS.gray200}`,
                    borderRadius: 100, cursor: "pointer", transition: "all 0.3s",
                    textTransform: "uppercase", letterSpacing: 1,
                  }}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="plans-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }}>
                {data.maintenance.plans.map((plan, i) => (
                  <FadeIn key={`${activeTab}-plan-${i}`} delay={i * 0.1} style={{ height: "100%" }}>
                    <div className={`plan-card ${plan.popular ? "popular" : ""}`} style={{
                      height: "100%", boxSizing: "border-box",
                      background: COLORS.white, borderRadius: 12, overflow: "hidden",
                      border: plan.popular ? `2px solid ${COLORS.gold}` : `1px solid ${COLORS.gray200}`,
                      display: "flex", flexDirection: "column",
                    }}>
                      {plan.popular && (
                        <div style={{
                          background: COLORS.gold, color: COLORS.white, textAlign: "center",
                          padding: "6px 0", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                          flexShrink: 0,
                        }}>
                          Most Popular
                        </div>
                      )}
                      <div style={{ padding: 32, display: "flex", flexDirection: "column", flex: 1, boxSizing: "border-box" }}>
                        <h3 style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>
                          {plan.name}
                        </h3>
                        <div style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.gold, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>
                          {plan.frequency}
                        </div>
                        <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, color: COLORS.navy, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${COLORS.gray200}` }}>
                          {plan.price}
                        </div>
                        <div style={{ flex: 1 }}>
                          {plan.features.map((feature, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                              <span style={{ color: COLORS.gold, fontSize: 16, marginTop: 1, flexShrink: 0 }}>✓</span>
                              <span style={{ fontFamily: FONT.body, fontSize: 14, color: COLORS.gray600, lineHeight: 1.5 }}>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <a href="tel:3052096985" className={plan.popular ? "gold-btn" : "dark-btn"}
                          style={{ width: "100%", justifyContent: "center", marginTop: 24, boxSizing: "border-box" }}>
                          Get Started
                        </a>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── WHY CHOOSE US ─── */}
        <section style={{ background: COLORS.white, padding: "80px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>Why Choose Us</span>
                  <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                </div>
                <h2 style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.navy }}>
                  Built on Trust, Backed by Results
                </h2>
              </div>
            </FadeIn>

            <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
              {[
                { icon: "🏠", title: "Family-Owned & Local", desc: "We're your neighbors. Precision Cleaning is a Miami-born business that treats every home like our own." },
                { icon: "⚡", title: "Same-Day Availability", desc: "Need it done today? We offer fast turnaround and same-day scheduling so your space is clean when you need it." },
                { icon: "✅", title: "Licensed & Insured", desc: "Fully licensed, fully insured, and backed by a satisfaction guarantee on every single job. No exceptions." },
                { icon: "🌿", title: "Eco-Friendly Options", desc: "We use environmentally conscious products that are safe for families, pets, and marine environments." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} style={{ height: "100%" }}>
                  <div style={{ height: "100%", boxSizing: "border-box", textAlign: "center", padding: 32, borderRadius: 8, border: `1px solid ${COLORS.gray200}`, background: COLORS.gray100 }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                    <h3 style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>{item.title}</h3>
                    <p style={{ fontFamily: FONT.body, fontSize: 14, color: COLORS.gray600, lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── REVIEWS ─── */}
        <section style={{ background: COLORS.cream, padding: "80px 0", overflow: "hidden" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", marginBottom: 40 }}>
            <FadeIn>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>Testimonials</span>
                  <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                </div>
                <h2 style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.navy }}>
                  Real Reviews From Real Customers
                </h2>
              </div>
            </FadeIn>
          </div>

          <div style={{ overflow: "hidden" }}>
            <div className="review-track">
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <div key={i} style={{
                  minWidth: 360, maxWidth: 360, background: COLORS.white, borderRadius: 8,
                  padding: 32, border: `1px solid ${COLORS.gray200}`, flexShrink: 0,
                }}>
                  <div style={{ color: COLORS.gold, fontSize: 20, marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
                  <p style={{ fontFamily: FONT.accent, fontSize: 16, color: COLORS.gray800, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>
                    "{review.text}"
                  </p>
                  <div style={{ borderTop: `1px solid ${COLORS.gray200}`, paddingTop: 16 }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{review.author}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.gray400 }}>{review.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA SECTION ─── */}
        <section style={{
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyMid} 100%)`,
          padding: "80px 0", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "50%", right: "10%", width: 300, height: 300, borderRadius: "50%", border: `1px solid rgba(196, 148, 61, 0.1)`, transform: "translateY(-50%)" }} />
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 2 }}>
            <FadeIn>
              <h2 style={{ fontFamily: FONT.display, fontSize: 42, fontWeight: 700, color: COLORS.white, lineHeight: 1.2, marginBottom: 16 }}>
                Ready for a Cleaner Space?
              </h2>
              <p style={{ fontFamily: FONT.accent, fontSize: 20, color: "rgba(255,255,255,0.6)", fontStyle: "italic", marginBottom: 40 }}>
                Get a free, no-obligation quote today. Same-day appointments available across Miami.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="tel:3052096985" className="gold-btn" style={{ fontSize: 16, padding: "16px 36px" }}>
                  Call (305) 209-6985
                </a>
                <a href="mailto:info@precisioncleaning.com" className="outline-btn" style={{ fontSize: 16, padding: "16px 36px" }}>
                  Send an Email
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ background: COLORS.navy, padding: "60px 0 30px", borderTop: `1px solid rgba(196, 148, 61, 0.15)` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
              {/* Brand */}
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                  <img src={logoImg} alt="Precision Cleaning Services" style={{ height: 68, width: "auto" }} />
                </div>
                <p style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 300 }}>
                  Family-owned and locally operated, delivering same-day deep cleaning across Miami since 2011.
                </p>
              </div>

              {/* Services */}
              <div>
                <h4 style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Services</h4>
                {["Residential", "Commercial", "Marine"].map((s) => (
                  <div key={s} style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 10, cursor: "pointer" }}
                    onClick={() => switchTab(s.toLowerCase())}>{s}</div>
                ))}
              </div>

              {/* Company */}
              <div>
                <h4 style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Company</h4>
                {["About Us", "Reviews", "Service Areas", "Careers"].map((s) => (
                  <div key={s} style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>{s}</div>
                ))}
              </div>

              {/* Contact */}
              <div>
                <h4 style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
                <div style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>📞 (305) 209-6985</div>
                <div style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>📧 info@precisioncleaning.com</div>
                <div style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>📍 Miami, FL</div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                © 2026 Precision Cleaning Services. All rights reserved. Miami, FL.
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                {["Privacy Policy", "Terms of Service"].map((s) => (
                  <span key={s} style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
