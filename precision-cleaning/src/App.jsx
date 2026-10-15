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
  goldDark: "#8F6A2A",
  goldPale: "#F5ECD7",
  cream: "#FAF7F0",
  white: "#FFFFFF",
  gray100: "#F8F9FA",
  gray200: "#E9ECEF",
  gray400: "#ADB5BD",
  gray600: "#6C757D",
  gray800: "#343A40",
};

// ─── Fonts (loaded via Google Fonts link in HTML head) ───
const FONT = {
  display: "'Playfair Display', serif",
  body: "'DM Sans', sans-serif",
  accent: "'Cormorant Garamond', serif",
};

// ─── Shared SVG Icon Set (stroke-style, inherits currentColor) ───
const ICON_PATHS = {
  sofa: <><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" /><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" /><path d="M4 18v2" /><path d="M20 18v2" /></>,
  layers: <><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>,
  sparkles: <><path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z" /><path d="M5 3v4" /><path d="M3 5h4" /><path d="M19 17v4" /><path d="M17 19h4" /></>,
  rug: <><rect x="5" y="3" width="14" height="18" rx="1" /><path d="m12 8 3 4-3 4-3-4 3-4Z" /><path d="M5 6h14" /><path d="M5 18h14" /></>,
  bed: <><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" /><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" /><path d="M12 4v6" /><path d="M2 18h20" /></>,
  car: <><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10.5 15.8 7.7c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></>,
  home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><path d="M9 22V12h6v10" /></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /><path d="M12 14h.01" /></>,
  store: <><path d="M3 9l1.5-5h15L21 9" /><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" /><path d="M9 21v-5h6v5" /></>,
  bell: <><path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H3Z" /><path d="M20 16a8 8 0 1 0-16 0" /><path d="M12 4v4" /><path d="M10 4h4" /></>,
  cross: <><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2Z" /></>,
  utensils: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z" /><path d="M21 15v7" /></>,
  hardhat: <><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2Z" /><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" /><path d="M4 15v-3a6 6 0 0 1 6-6" /><path d="M14 6a6 6 0 0 1 6 6v3" /></>,
  wind: <><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /><path d="M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2" /></>,
  waves: <><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></>,
  anchor: <><circle cx="12" cy="5" r="3" /><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></>,
  shieldCheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  badgeCheck: <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></>,
  zap: <><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
  homeHeart: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><path d="M12 17.2s-3.2-1.9-3.2-4c0-1.1.9-2 2-2 .7 0 1.2.5 1.2.5s.5-.5 1.2-.5c1.1 0 2 .9 2 2 0 2.1-3.2 4-3.2 4Z" /></>,
  clipboard: <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></>,
  phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></>,
  check: <><path d="M20 6 9 17l-5-5" /></>,
  star: <><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  chevronDown: <><path d="m6 9 6 6 6-6" /></>,
  droplet: <><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
};

function Icon({ name, size = 24, strokeWidth = 1.8, filled = false, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: "block", ...style }} aria-hidden="true" focusable="false">
      {ICON_PATHS[name]}
    </svg>
  );
}

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
        icon: "sofa",
        title: "Upholstery Cleaning",
        description: "Deep extraction cleaning for sofas, chairs, sectionals, and ottomans. We remove embedded dirt, allergens, pet dander, and stains while preserving fabric integrity.",
        details: ["Fabric-specific treatment protocols", "Stain pre-treatment & odor neutralization", "Scotchgard protection available", "Safe for delicate & designer fabrics"],
      },
      {
        icon: "layers",
        title: "Carpet Deep Cleaning",
        description: "Hot water extraction and steam cleaning that reaches deep into carpet fibers, removing years of buildup, allergens, and bacteria.",
        details: ["Full room & whole-home packages", "Pet stain & odor specialty treatment", "High-traffic area restoration", "Hypoallergenic & eco-friendly options"],
      },
      {
        icon: "sparkles",
        title: "Tile & Grout Restoration",
        description: "High-pressure cleaning and grout color sealing that makes tile floors, showers, and backsplashes look brand new again.",
        details: ["Kitchen & bathroom specialists", "Grout recoloring & sealing", "Natural stone safe methods", "Mold & mildew elimination"],
      },
      {
        icon: "rug",
        title: "Area Rug Cleaning",
        description: "Specialized care for Oriental, Persian, silk, and wool rugs. On-site or pickup service with full inspection and hand-finishing.",
        details: ["Fringe cleaning & repair", "Color testing & fiber analysis", "Moth & pest treatment", "Padding cleaning & replacement"],
      },
      {
        icon: "bed",
        title: "Mattress Sanitization",
        description: "UV sanitization and deep extraction to remove dust mites, allergens, sweat, and stains from mattresses of all sizes.",
        details: ["Hypoallergenic treatment", "Stain & odor removal", "All mattress types accepted", "Same-day service available"],
      },
      {
        icon: "car",
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
        icon: "building",
        title: "Office Carpet Cleaning",
        description: "Low-moisture, fast-drying carpet cleaning designed for minimal business disruption. After-hours and weekend scheduling available.",
        details: ["Encapsulation & HWE methods", "Cubicle & open floor plans", "After-hours scheduling", "Fast-dry for next-day readiness"],
      },
      {
        icon: "store",
        title: "Retail Floor Care",
        description: "High-traffic tile, VCT, and carpet cleaning that keeps your retail space looking sharp and inviting for customers.",
        details: ["VCT stripping & waxing", "Tile & grout deep cleaning", "Carpet extraction & bonnet cleaning", "Entrance mat programs"],
      },
      {
        icon: "bell",
        title: "Hospitality Cleaning",
        description: "Hotel, Airbnb, and short-term rental cleaning with fast turnaround. Guest-ready results every time.",
        details: ["Room turnover cleaning", "Lobby & common area maintenance", "Upholstery & drapery service", "Odor treatment & sanitization"],
      },
      {
        icon: "cross",
        title: "Medical & Healthcare",
        description: "Sanitization-grade cleaning for medical offices, clinics, and wellness centers meeting healthcare facility standards.",
        details: ["EPA-registered disinfection", "Waiting room deep cleaning", "Exam room sanitization", "HIPAA-conscious service protocols"],
      },
      {
        icon: "utensils",
        title: "Restaurant & Kitchen",
        description: "Degreasing, tile cleaning, and upholstery care for dining areas, kitchens, and bar spaces.",
        details: ["Kitchen tile degreasing", "Booth & banquette cleaning", "Bar area deep clean", "Health code compliance support"],
      },
      {
        icon: "hardhat",
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
      subtitle: "Hot-water steam extraction that lifts salt, sunscreen and mildew — and returns a tired interior to showroom condition.",
      tagline: "MARINE INTERIOR SPECIALISTS",
      image: "/images/marine/hero-salon",
    },
    pricing: {
      startingAt: "$395",
      scope: "Boats up to 68 ft",
      note: "Vessels above 68 ft — custom pricing available",
      image: "/images/marine/salon",
      imageAlt: "Freshly cleaned yacht salon with ivory carpet and cream upholstery",
    },
    restores: ["Carpet steam extraction", "Yellowing & oxidation", "Salon & staterooms", "Vinyl & leather care", "Carpet trim & binding", "Cushions & seat covers", "Headliners & panels", "Stain, spot & odor removal"],
    gallery: [
      { image: "/images/marine/carpet-salon", title: "Salon Carpet", caption: "Traffic lanes & ground-in soiling lifted", alt: "Yacht salon carpet before and after steam extraction" },
      { image: "/images/marine/carpet-stairs", title: "Companionway Stairs", caption: "Every tread deep cleaned, walls masked & protected", alt: "Yacht companionway stair carpet before and after cleaning" },
      { image: "/images/marine/carpet-passage", title: "Passageway Carpet", caption: "Heavy soiling & spotting extracted", alt: "Yacht passageway carpet before and after steam extraction" },
      { image: "/images/marine/carpet-staircase", title: "Interior Staircase", caption: "Traffic soiling lifted & pile restored on every step", alt: "Yacht interior staircase carpet before and after cleaning" },
      { image: "/images/marine/carpet-water-stain", title: "Water Stain Removal", caption: "Brown water staining lifted from light carpet", alt: "Light yacht carpet with brown water stains before and after cleaning" },
    ],
    services: [
      {
        icon: "sofa",
        title: "Salon Upholstery Cleaning",
        description: "Deep extraction cleaning for all salon cushions, settees, and cabin upholstery. We pull out salt, sweat, mildew, and embedded grime while protecting marine-grade fabrics.",
        details: ["Hot water extraction on all cushion types", "Salt & mineral deposit removal", "Mildew & musty odor elimination", "Fabric protection treatment applied"],
      },
      {
        icon: "layers",
        title: "Yacht Carpet Cleaning",
        description: "Full deep cleaning for salon carpets, stateroom flooring, and flybridge mats. We restore color, lift stains, and leave zero soapy residue behind.",
        details: ["Diesel, fish & bilge odor treatment", "Stain pre-treatment on every visit", "Fast-dry methods for quick turnaround", "All carpet types including berber & marine cut-pile"],
      },
      {
        icon: "rug",
        title: "Area Rug & Mat Cleaning",
        description: "On-site deep cleaning for cockpit mats, interior area rugs, and decorative rugs. We treat each piece based on its fiber and condition.",
        details: ["Color-safe cleaning for all rug types", "Non-skid backing preserved", "Fringe & edge cleaning", "UV damage & fading assessment"],
      },
      {
        icon: "wind",
        title: "Mildew & Odor Removal",
        description: "Targeted treatment for that stubborn musty, mildewy smell that lives in cushions, carpet, and closed-up cabins. We don't mask it — we eliminate it at the source.",
        details: ["Enzyme-based odor neutralization", "Mildew spore extraction & treatment", "Bilge, diesel & fish odor elimination", "Preventative anti-mildew coating available"],
      },
      {
        icon: "bed",
        title: "Cabin & Mattress Sanitization",
        description: "Deep cleaning for stateroom mattresses and bedding surfaces. Removes sweat, salt residue, mildew, and allergens so every night aboard feels fresh.",
        details: ["UV sanitization treatment", "Salt & moisture extraction", "All mattress sizes & types", "Odor neutralization included"],
      },
      {
        icon: "waves",
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

// Tab order everywhere tabs are listed; the first tab is the landing tab
const TABS = ["marine", "commercial", "residential"];

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

// ─── Responsive srcSet for images exported as `${base}-${width}.jpg` ───
const srcSet = (base, widths) => widths.map((w) => `${base}-${w}.jpg ${w}w`).join(", ");

// ─── Main App ───
export default function PrecisionCleaning() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; overflow-x: clip; max-width: 100vw; }
        body { font-family: ${FONT.body}; color: ${COLORS.gray800}; background: ${COLORS.white}; -webkit-font-smoothing: antialiased; overflow-x: clip; max-width: 100vw; }

        ::selection { background: ${COLORS.gold}; color: ${COLORS.navy}; }

        /* Subtle grain overlay */
        .grain::before {
          content: '';
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
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
        .plan-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(11, 29, 58, 0.12); }
        .plan-card.popular { transform: scale(1.02); }
        .plan-card.popular:hover { transform: scale(1.02) translateY(-6px); }

        .gold-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: ${COLORS.gold}; color: ${COLORS.navy};
          font-family: ${FONT.body}; font-weight: 600; font-size: 15px;
          border: none; border-radius: 4px; cursor: pointer; letter-spacing: 0.5px;
          transition: all 0.3s ease; text-decoration: none;
        }
        .gold-btn:hover { background: ${COLORS.goldLight}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(196, 148, 61, 0.3); }

        .outline-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: transparent; color: ${COLORS.white};
          font-family: ${FONT.body}; font-weight: 600; font-size: 15px;
          border: 2px solid rgba(255,255,255,0.4); border-radius: 4px; cursor: pointer; letter-spacing: 0.5px;
          transition: all 0.3s ease; text-decoration: none;
        }
        .outline-btn:hover { border-color: ${COLORS.white}; background: rgba(255,255,255,0.1); }

        .dark-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: ${COLORS.navy}; color: ${COLORS.white};
          font-family: ${FONT.body}; font-weight: 600; font-size: 15px;
          border: none; border-radius: 4px; cursor: pointer; letter-spacing: 0.5px;
          transition: all 0.3s ease; text-decoration: none;
        }
        .dark-btn:hover { background: ${COLORS.navyLight}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(11, 29, 58, 0.3); }

        .gold-btn:focus-visible, .outline-btn:focus-visible, .dark-btn:focus-visible { outline: 2px solid ${COLORS.goldLight}; outline-offset: 3px; }
        .gold-btn:active, .dark-btn:active { transform: translateY(0); }
        .plan-pill:hover { border-color: ${COLORS.navy} !important; }
        .footer-link { transition: color 0.3s ease; }
        .footer-link:hover { color: rgba(255,255,255,0.9) !important; }

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

        .hero-image-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(11, 29, 58, 0.96) 0%, rgba(11, 29, 58, 0.86) 40%, rgba(11, 29, 58, 0.45) 75%, rgba(11, 29, 58, 0.3) 100%); }

        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .gallery-grid > * { flex-basis: 100% !important; }
          .price-card { position: relative !important; right: auto !important; bottom: auto !important; margin: -64px 16px 0; }
        }

        @media (max-width: 768px) {
          .hero-image-overlay { background: linear-gradient(180deg, rgba(11, 29, 58, 0.78) 0%, rgba(11, 29, 58, 0.9) 55%, rgba(11, 29, 58, 0.97) 100%); }
          .restore-grid { grid-template-columns: 1fr !important; }
          .hero-price { gap: 14px !important; padding: 12px 16px !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .hero-title { font-size: 36px !important; }
          .section-h2 { font-size: 32px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .results-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column !important; gap: 24px !important; margin-bottom: 60px !important; }
          .stat-divider { width: 50px !important; height: 1px !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .scroll-indicator { display: none !important; }
        }

        .nav-mobile-toggle { display: none !important; }
        .mobile-menu { display: none !important; }
        @media (max-width: 960px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>

      <div className="grain">
        {/* ─── NAVIGATION ─── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled || mobileMenuOpen ? "rgba(11, 29, 58, 0.97)" : "transparent",
          backdropFilter: scrolled || mobileMenuOpen ? "blur(20px)" : "none",
          transition: "all 0.4s ease",
          borderBottom: scrolled || mobileMenuOpen ? `1px solid rgba(196, 148, 61, 0.15)` : "1px solid transparent",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 100 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={logoImg} alt="Precision Cleaning Services" style={{ height: 120, width: "auto" }} />
            </div>

            {/* Desktop Nav */}
            <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {TABS.map((tab) => (
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
              {TABS.map((tab) => (
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
          {data.hero.image && (
            <>
              <img src={`${data.hero.image}-2000.jpg`} srcSet={srcSet(data.hero.image, [1000, 2000])} sizes="100vw" alt=""
                fetchPriority="high" decoding="async"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "70% center" }} />
              <div className="hero-image-overlay" />
            </>
          )}

          {/* Decorative elements */}
          <div style={{ position: "absolute", top: "10%", right: "-5%", width: "min(400px, 50vw)", height: "min(400px, 50vw)", borderRadius: "50%", border: `1px solid rgba(196, 148, 61, 0.08)` }} />
          <div style={{ position: "absolute", top: "20%", right: "5%", width: "min(250px, 35vw)", height: "min(250px, 35vw)", borderRadius: "50%", border: `1px solid rgba(196, 148, 61, 0.05)` }} />
          <div style={{ position: "absolute", bottom: "15%", left: "-5%", width: "min(300px, 40vw)", height: "min(300px, 40vw)", borderRadius: "50%", background: `radial-gradient(circle, rgba(196, 148, 61, 0.06), transparent)` }} />

          {/* Gold accent line */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 4, height: "100%", background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, transparent)` }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "150px 24px 110px", width: "100%", position: "relative", zIndex: 2 }}>
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

            {data.pricing && (
              <FadeIn delay={0.25}>
                <div className="hero-price" style={{
                  display: "inline-flex", alignItems: "center", gap: 20, padding: "14px 24px", marginBottom: 36,
                  background: "rgba(11, 29, 58, 0.6)", border: "1px solid rgba(196, 148, 61, 0.45)", borderRadius: 8,
                  backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                }}>
                  <div>
                    <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: COLORS.goldLight, letterSpacing: 2, textTransform: "uppercase", whiteSpace: "nowrap" }}>Starting at</div>
                    <div style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.white, lineHeight: 1.1 }}>{data.pricing.startingAt}</div>
                  </div>
                  <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.18)" }} />
                  <div style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                    <div style={{ fontWeight: 600, color: COLORS.white }}>{data.pricing.scope}</div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                      <span style={{ color: COLORS.goldLight, display: "inline-flex", marginTop: 5 }}><Icon name="anchor" size={14} strokeWidth={2} /></span>
                      Dockside service at your slip
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.3}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="gold-btn" onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  Explore Services <Icon name="arrowRight" size={16} strokeWidth={2} />
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
        <section style={{ background: COLORS.white, borderBottom: `1px solid ${COLORS.gray200}`, position: "sticky", top: 100, zIndex: 100, overflowX: "hidden" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 0, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            {TABS.map((tab) => (
              <button key={tab} onClick={() => switchTab(tab)} style={{
                padding: "16px 28px", fontFamily: FONT.body, fontSize: 13, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: 1.5, cursor: "pointer",
                background: "none", border: "none",
                color: activeTab === tab ? COLORS.navy : COLORS.gray600,
                borderBottom: activeTab === tab ? `3px solid ${COLORS.gold}` : "3px solid transparent",
                transition: "all 0.3s ease", whiteSpace: "nowrap",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                <Icon name={tab === "residential" ? "home" : tab === "commercial" ? "building" : "anchor"} size={15} strokeWidth={2} />
                {tab === "residential" ? "Residential" : tab === "commercial" ? "Commercial" : "Marine"}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button onClick={() => setShowMaintenance(!showMaintenance)} style={{
              padding: "16px 28px", fontFamily: FONT.body, fontSize: 13, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: 1.5, cursor: "pointer",
              background: showMaintenance ? COLORS.goldPale : "none", border: "none",
              color: showMaintenance ? COLORS.navy : COLORS.gray600,
              borderBottom: showMaintenance ? `3px solid ${COLORS.gold}` : "3px solid transparent",
              transition: "all 0.3s ease", borderRadius: showMaintenance ? "4px 4px 0 0" : 0,
              display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
            }}>
              <Icon name="clipboard" size={15} strokeWidth={2} />
              Maintenance Plans
            </button>
          </div>
        </section>

        {/* ─── BEFORE / AFTER GALLERY (tabs with gallery data) ─── */}
        {!showMaintenance && data.gallery && (
          <section style={{ background: COLORS.navy, padding: "80px 0", overflow: "hidden" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
              <FadeIn>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                    <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>Before &amp; After</span>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  </div>
                  <h2 className="section-h2" style={{ fontFamily: FONT.display, fontSize: 42, fontWeight: 700, color: COLORS.white, lineHeight: 1.15 }}>
                    See the Difference
                  </h2>
                  <p style={{ fontFamily: FONT.accent, fontSize: 19, color: "rgba(255,255,255,0.6)", marginTop: 14, fontStyle: "italic" }}>
                    Actual before &amp; after photos from our recent yacht jobs
                  </p>
                </div>
              </FadeIn>

              {/* Flex rather than grid so a short last row sits centred */}
              <div className="gallery-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
                {data.gallery.map((item, i) => (
                  <FadeIn key={item.image} delay={(i % 3) * 0.1} style={{ flex: "0 1 calc((100% - 48px) / 3)" }}>
                    <div style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
                      <img
                        src={`${item.image}-1400.jpg`}
                        srcSet={srcSet(item.image, [800, 1400])}
                        sizes="(max-width: 900px) 100vw, 368px"
                        width={1400} height={922}
                        alt={item.alt}
                        loading="lazy" decoding="async"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <div style={{ flex: 1, background: COLORS.navyLight, padding: "16px 24px" }}>
                        <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, color: COLORS.white }}>{item.title}</div>
                        <div style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>{item.caption}</div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <FadeIn delay={0.2}>
                <div style={{ textAlign: "center", marginTop: 64 }}>
                  <a href="tel:3052096985" className="gold-btn" style={{ fontSize: "clamp(13px, 3vw, 16px)", padding: "14px clamp(16px, 4vw, 44px)", whiteSpace: "nowrap", maxWidth: "100%", boxSizing: "border-box" }}>
                    Get Results Like These — (305) 209-6985
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* ─── STARTING PRICE & WHAT WE RESTORE (tabs with pricing data) ─── */}
        {!showMaintenance && data.pricing && (
          <section style={{ background: COLORS.white, padding: "96px 0", overflow: "hidden" }}>
            <div className="pricing-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
              <FadeIn direction="right">
                <div style={{ position: "relative" }}>
                  <img src={`${data.pricing.image}-1400.jpg`} srcSet={srcSet(data.pricing.image, [800, 1400])} sizes="(max-width: 900px) 100vw, 560px"
                    alt={data.pricing.imageAlt} loading="lazy" decoding="async"
                    style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block", borderRadius: 12, boxShadow: "0 24px 60px rgba(11, 29, 58, 0.18)" }} />
                  <div className="price-card" style={{
                    position: "absolute", right: -28, bottom: -36, background: COLORS.navy, borderTop: `3px solid ${COLORS.gold}`,
                    borderRadius: 12, padding: "24px 32px", boxShadow: "0 24px 60px rgba(11, 29, 58, 0.35)",
                  }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: COLORS.goldLight, letterSpacing: 2.5, textTransform: "uppercase" }}>
                      {data.pricing.scope}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 6 }}>
                      <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", letterSpacing: 1.5, textTransform: "uppercase" }}>Starting at</span>
                      <span style={{ fontFamily: FONT.display, fontSize: 56, fontWeight: 700, color: COLORS.white, lineHeight: 1 }}>{data.pricing.startingAt}</span>
                    </div>
                    <div style={{ fontFamily: FONT.body, fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 10 }}>
                      {data.pricing.note}
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.15} direction="left">
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>What We Restore</span>
                </div>
                <h2 className="section-h2" style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.navy, lineHeight: 1.2 }}>
                  Showroom Condition,<br />Right at Your Slip
                </h2>
                <p style={{ fontFamily: FONT.accent, fontSize: 19, color: COLORS.gray600, fontStyle: "italic", lineHeight: 1.6, marginTop: 14 }}>
                  Dockside service at your slip — low-moisture methods and fast dry times get you back aboard quickly.
                </p>
                <div className="restore-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 24px", margin: "32px 0" }}>
                  {data.restores.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", background: COLORS.goldPale, color: COLORS.goldDark, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name="check" size={12} strokeWidth={3} />
                      </span>
                      <span style={{ fontFamily: FONT.body, fontSize: 15, fontWeight: 500, color: COLORS.navy }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, paddingTop: 24, borderTop: `1px solid ${COLORS.gray200}`, marginBottom: 32 }}>
                  {[
                    { icon: "droplet", label: "Low-Moisture" },
                    { icon: "clock", label: "Fast Dry Times" },
                    { icon: "leaf", label: "Marine-Safe Products" },
                  ].map((badge) => (
                    <span key={badge.label} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: COLORS.cream, border: `1px solid ${COLORS.gray200}`, color: COLORS.navy }}>
                      <span style={{ color: COLORS.goldDark, display: "inline-flex" }}><Icon name={badge.icon} size={15} strokeWidth={2} /></span>
                      <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{badge.label}</span>
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <a href="tel:3052096985" className="gold-btn">Call (305) 209-6985</a>
                  <span style={{ fontFamily: FONT.body, fontSize: 14, color: COLORS.gray600 }}>Free estimates</span>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* ─── SERVICES SECTION ─── */}
        {!showMaintenance && (
          <section id="services" style={{ background: COLORS.cream, padding: "80px 0", scrollMarginTop: 160 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
              <FadeIn>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                    <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>
                      {data.hero.tagline}
                    </span>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  </div>
                  <h2 className="section-h2" style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.navy, lineHeight: 1.2 }}>
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
                        background: COLORS.white, borderRadius: 12, padding: 32, cursor: "pointer",
                        border: expandedService === i ? `1px solid ${COLORS.gold}` : `1px solid ${COLORS.gray200}`,
                        height: "100%", display: "flex", flexDirection: "column",
                      }}>
                      <div style={{ width: 56, height: 56, borderRadius: 14, background: COLORS.goldPale, color: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                        <Icon name={service.icon} size={28} strokeWidth={1.6} />
                      </div>
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
                              <span style={{ color: COLORS.goldDark, marginTop: 3, flexShrink: 0, display: "inline-flex" }}><Icon name="check" size={13} strokeWidth={3} /></span>
                              <span style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.gray600, lineHeight: 1.5 }}>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, color: COLORS.goldDark, fontSize: 13, fontWeight: 600, letterSpacing: 0.3 }}>
                        {expandedService === i ? "Show less" : "View details"} <span style={{ display: "inline-flex", transition: "transform 0.3s", transform: expandedService === i ? "rotate(180deg)" : "none" }}><Icon name="chevronDown" size={14} strokeWidth={2} /></span>
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
          <section style={{ background: COLORS.navy, padding: "80px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
              <FadeIn>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                    <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>Real Results</span>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  </div>
                  <h2 className="section-h2" style={{ fontFamily: FONT.display, fontSize: 42, fontWeight: 700, color: COLORS.white, lineHeight: 1.15, margin: 0 }}>
                    See the Difference
                  </h2>
                  <p style={{ fontFamily: FONT.accent, fontSize: 19, color: "rgba(255,255,255,0.6)", marginTop: 14, fontStyle: "italic" }}>
                    Actual before &amp; after photos from our jobs
                  </p>
                </div>
              </FadeIn>

              <div className="results-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }}>

                {/* Carpet */}
                <FadeIn delay={0} style={{ height: "100%" }}>
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
                    <img
                      src="/images/carpet-comparison.jpg"
                      alt="Carpet before and after deep cleaning"
                      loading="lazy" decoding="async"
                      style={{ width: "100%", display: "block", objectFit: "cover", flex: 1 }}
                    />
                    <div style={{ background: COLORS.navyLight, padding: "16px 24px" }}>
                      <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, color: COLORS.white }}>Carpet Deep Cleaning</div>
                      <div style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>Stains, odor & allergens fully extracted</div>
                    </div>
                  </div>
                </FadeIn>

                {/* Tile */}
                <FadeIn delay={0.1} style={{ height: "100%" }}>
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
                    <img
                      src="/images/tile-comparison.jpg"
                      alt="Tile and grout before and after cleaning"
                      loading="lazy" decoding="async"
                      style={{ width: "100%", display: "block", objectFit: "cover", flex: 1 }}
                    />
                    <div style={{ background: COLORS.navyLight, padding: "16px 24px" }}>
                      <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, color: COLORS.white }}>Tile &amp; Grout Restoration</div>
                      <div style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>Grout restored to bright white — no replacement needed</div>
                    </div>
                  </div>
                </FadeIn>

              </div>

              <FadeIn delay={0.2}>
                <div style={{ textAlign: "center", marginTop: 52 }}>
                  <a href="tel:3052096985" className="gold-btn" style={{ fontSize: "clamp(13px, 3vw, 16px)", padding: "14px clamp(16px, 4vw, 44px)", whiteSpace: "nowrap", maxWidth: "100%", boxSizing: "border-box" }}>
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
                    <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>
                      {activeTab} PLANS
                    </span>
                    <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  </div>
                  <h2 className="section-h2" style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.navy, lineHeight: 1.2 }}>
                    {data.maintenance.title}
                  </h2>
                  <p style={{ fontFamily: FONT.accent, fontSize: 18, color: COLORS.gray600, fontStyle: "italic", maxWidth: 500, margin: "12px auto 0" }}>
                    {data.maintenance.subtitle}
                  </p>
                </div>
              </FadeIn>

              {/* Plan selector tabs */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 48 }}>
                {TABS.map((tab) => (
                  <button key={tab} className="plan-pill" onClick={() => setActiveTab(tab)} style={{
                    padding: "10px 24px", fontFamily: FONT.body, fontSize: 13, fontWeight: 600,
                    background: activeTab === tab ? COLORS.navy : COLORS.white,
                    color: activeTab === tab ? COLORS.white : COLORS.gray600,
                    border: `1px solid ${activeTab === tab ? COLORS.navy : COLORS.gray200}`,
                    borderRadius: 4, cursor: "pointer", transition: "all 0.3s",
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
                          background: COLORS.gold, color: COLORS.navy, textAlign: "center",
                          padding: "6px 0", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                          flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        }}>
                          <Icon name="star" size={12} filled />
                          Most Popular
                        </div>
                      )}
                      <div style={{ padding: 32, display: "flex", flexDirection: "column", flex: 1, boxSizing: "border-box" }}>
                        <h3 style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>
                          {plan.name}
                        </h3>
                        <div style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.goldDark, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>
                          {plan.frequency}
                        </div>
                        <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, color: COLORS.navy, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${COLORS.gray200}` }}>
                          {plan.price}
                        </div>
                        <div style={{ flex: 1 }}>
                          {plan.features.map((feature, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                              <span style={{ color: COLORS.goldDark, marginTop: 2, flexShrink: 0, display: "inline-flex" }}><Icon name="check" size={16} strokeWidth={2.2} /></span>
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
                  <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>Why Choose Us</span>
                  <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                </div>
                <h2 className="section-h2" style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.navy, lineHeight: 1.2 }}>
                  Built on Trust, Backed by Results
                </h2>
              </div>
            </FadeIn>

            <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
              {[
                { icon: "homeHeart", title: "Family-Owned & Local", desc: "We're your neighbors. Precision Cleaning is a Miami-born business that treats every home like our own." },
                { icon: "zap", title: "Same-Day Availability", desc: "Need it done today? We offer fast turnaround and same-day scheduling so your space is clean when you need it." },
                { icon: "shieldCheck", title: "Licensed & Insured", desc: "Fully licensed, fully insured, and backed by a satisfaction guarantee on every single job. No exceptions." },
                { icon: "leaf", title: "Eco-Friendly Options", desc: "We use environmentally conscious products that are safe for families, pets, and marine environments." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} style={{ height: "100%" }}>
                  <div style={{ height: "100%", boxSizing: "border-box", textAlign: "center", padding: 32, borderRadius: 12, border: `1px solid ${COLORS.gray200}`, background: COLORS.gray100 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.goldPale, color: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <Icon name={item.icon} size={30} strokeWidth={1.6} />
                    </div>
                    <h3 style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>{item.title}</h3>
                    <p style={{ fontFamily: FONT.body, fontSize: 14, color: COLORS.gray600, lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── REVIEWS ─── */}
        <section style={{ background: COLORS.cream, padding: "80px 0", overflow: "hidden" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", marginBottom: 60 }}>
            <FadeIn>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                  <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>Testimonials</span>
                  <div style={{ width: 30, height: 1, background: COLORS.gold }} />
                </div>
                <h2 className="section-h2" style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.navy, lineHeight: 1.2 }}>
                  Real Reviews From Real Customers
                </h2>
              </div>
            </FadeIn>
          </div>

          <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)", maskImage: "linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)" }}>
            <div className="review-track">
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <div key={i} style={{
                  minWidth: "min(360px, calc(100vw - 48px))", maxWidth: "min(360px, calc(100vw - 48px))", background: COLORS.white, borderRadius: 12,
                  padding: 32, border: `1px solid ${COLORS.gray200}`, flexShrink: 0,
                }}>
                  <div role="img" aria-label={`${review.stars} out of 5 stars`} style={{ color: COLORS.gold, display: "flex", alignItems: "center", gap: 3, marginBottom: 16 }}>
                    {Array.from({ length: review.stars }).map((_, s) => (
                      <Icon key={s} name="star" size={18} filled />
                    ))}
                  </div>
                  <p style={{ fontFamily: FONT.accent, fontSize: 16, color: COLORS.gray800, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>
                    "{review.text}"
                  </p>
                  <div style={{ borderTop: `1px solid ${COLORS.gray200}`, paddingTop: 16 }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{review.author}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.gray600 }}>{review.location}</div>
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
              <h2 className="section-h2" style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: COLORS.white, lineHeight: 1.2, marginBottom: 16 }}>
                Ready for a Cleaner Space?
              </h2>
              <p style={{ fontFamily: FONT.accent, fontSize: 20, color: "rgba(255,255,255,0.6)", fontStyle: "italic", marginBottom: 40 }}>
                Get a free, no-obligation quote today. Same-day appointments available across Miami.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="tel:3052096985" className="gold-btn" style={{ fontSize: 16, padding: "16px 36px" }}>
                  Call (305) 209-6985
                </a>
                <a href="mailto:ethan@precisioncleaning.com" className="outline-btn" style={{ fontSize: 16, padding: "16px 36px" }}>
                  Send an Email
                </a>
              </div>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: 36 }}>
                {[
                  { icon: "shieldCheck", label: "Licensed & Insured" },
                  { icon: "badgeCheck", label: "Satisfaction Guaranteed" },
                  { icon: "star", label: "5-Star Rated", filled: true },
                  { icon: "leaf", label: "Eco-Friendly" },
                ].map((badge) => (
                  <span key={badge.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.75)", padding: "0 4px" }}>
                    <span style={{ color: COLORS.goldLight, display: "inline-flex" }}>
                      <Icon name={badge.icon} size={15} strokeWidth={1.8} filled={badge.filled} />
                    </span>
                    <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{badge.label}</span>
                  </span>
                ))}
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
                <p style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 300 }}>
                  Family-owned and locally operated, delivering same-day deep cleaning across Miami since 2011.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20, color: "rgba(255,255,255,0.6)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: COLORS.goldLight, display: "inline-flex" }}><Icon name="shieldCheck" size={14} strokeWidth={2} /></span>
                    <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Licensed & Insured</span>
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: COLORS.goldLight, display: "inline-flex" }}><Icon name="star" size={14} filled /></span>
                    <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>5-Star Rated</span>
                  </span>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Services</h4>
                {["Marine", "Commercial", "Residential"].map((s) => (
                  <div key={s} className="footer-link" style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 10, cursor: "pointer" }}
                    onClick={() => switchTab(s.toLowerCase())}>{s}</div>
                ))}
              </div>

              {/* Company */}
              <div>
                <h4 style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Company</h4>
                {["About Us", "Reviews", "Service Areas", "Careers"].map((s) => (
                  <div key={s} style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 10 }}>{s}</div>
                ))}
              </div>

              {/* Contact */}
              <div>
                <h4 style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: COLORS.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
                <div style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: COLORS.goldLight, display: "inline-flex" }}><Icon name="phone" size={15} /></span>
                  (305) 209-6985
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: COLORS.goldLight, display: "inline-flex" }}><Icon name="mail" size={15} /></span>
                  ethan@precisioncleaning.com
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: COLORS.goldLight, display: "inline-flex" }}><Icon name="mapPin" size={15} /></span>
                  Miami, FL
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                © 2026 Precision Cleaning Services. All rights reserved. Miami, FL.
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                {["Privacy Policy", "Terms of Service"].map((s) => (
                  <span key={s} className="footer-link" style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.55)", cursor: "pointer" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
