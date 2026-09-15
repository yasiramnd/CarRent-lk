import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const showcaseCars = [
  {
    id: 1,
    name: "Sports Coupe",
    tagline: "Pure Performance",
    image: "/assets/images/car_3d_white.jpg",
    color: "#e2e8f0",
  },
  {
    id: 2,
    name: "Grand Tourer",
    tagline: "Iconic Power",
    image: "/assets/images/car_3d_red.jpg",
    color: "#fca5a5",
  },
  {
    id: 3,
    name: "Classic Sport",
    tagline: "Timeless Elegance",
    image: "/assets/images/car_3d_black.jpg",
    color: "#94a3b8",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [activeCar, setActiveCar] = useState(0);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    navigate(`/vehicles${params.toString() ? `?${params}` : ""}`);
  };

  const nextCar = () => setActiveCar((prev) => (prev + 1) % showcaseCars.length);
  const prevCar = () => setActiveCar((prev) => (prev - 1 + showcaseCars.length) % showcaseCars.length);

  return (
    <section className="hero-wrapper">
      {/* Background Image Layer */}
      <div className="hero-bg-image" />

      {/* Ambient glow that changes with active car */}
      <motion.div
        className="hero-ambient-glow"
        animate={{
          background: `radial-gradient(ellipse at center bottom, ${showcaseCars[activeCar].color}44 0%, transparent 70%)`,
        }}
        transition={{ duration: 1 }}
      />

      {/* Floating particles */}
      <div className="hero-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      <div className="hero-main">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="hero-content"
        >
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Sri Lanka's #1 car sharing marketplace.
          </div>

          <h1 className="hero-title">
            Find Your Perfect Car, <br />
            Drive Your <span className="dreams-text">Dreams.</span>
          </h1>

          <p className="hero-subtitle">
            Rent verified vehicles from trusted hosts across the island — or
            list your own car and start earning in minutes.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/vehicles")}>
              Browse Cars <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => navigate("/choose-listing-type")}>
              List Your Vehicle
            </button>
          </div>
        </motion.div>

        {/* 3D Car Showcase */}
        <motion.div
          className="car-showcase-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="car-showcase-stage">
            {/* 3D Perspective Container */}
            <div className="car-3d-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCar}
                  className="car-3d-hero"
                  initial={{ opacity: 0, y: 80, scale: 0.7, rotateX: 15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                  }}
                  exit={{ opacity: 0, y: -40, scale: 0.9 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="car-img-wrapper">
                    <motion.img
                      src={showcaseCars[activeCar].image}
                      alt={showcaseCars[activeCar].name}
                      className="car-3d-img"
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Reflection under the car */}
                  <motion.div
                    className="car-reflection"
                    animate={{
                      opacity: [0.15, 0.25, 0.15],
                      scaleX: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Ground shadow */}
                  <motion.div
                    className="car-ground-shadow"
                    animate={{
                      scaleX: [0.85, 0.95, 0.85],
                      opacity: [0.2, 0.35, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Side preview cars (thumbnails) */}
              <div className="car-side-previews">
                {showcaseCars.map((car, i) => {
                  if (i === activeCar) return null;
                  const isLeft = i < activeCar || (activeCar === 0 && i === showcaseCars.length - 1);
                  return (
                    <motion.div
                      key={car.id}
                      className={`car-side-preview ${isLeft ? 'left' : 'right'}`}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.6 }}
                      animate={{ opacity: 0.5, x: 0, scale: 0.65 }}
                      whileHover={{ opacity: 0.8, scale: 0.7 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => setActiveCar(i)}
                    >
                      <div className="car-preview-img-wrapper">
                        <img src={car.image} alt={car.name} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Car info + navigation */}
            <div className="car-showcase-controls">
              <button className="car-nav-btn" onClick={prevCar} aria-label="Previous car">
                <ChevronLeft size={20} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCar}
                  className="car-info-badge"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="car-info-name">{showcaseCars[activeCar].name}</span>
                  <span className="car-info-divider">•</span>
                  <span className="car-info-tagline">{showcaseCars[activeCar].tagline}</span>
                </motion.div>
              </AnimatePresence>

              <button className="car-nav-btn" onClick={nextCar} aria-label="Next car">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="car-dots">
              {showcaseCars.map((_, i) => (
                <button
                  key={i}
                  className={`car-dot ${i === activeCar ? 'active' : ''}`}
                  onClick={() => setActiveCar(i)}
                  aria-label={`Show car ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search Card */}
      <motion.div
        className="search-card-wrapper"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="search-card">
          <div className="search-field">
            <label>Location</label>
            <div className="input-group">
              <MapPin size={20} className="input-icon" />
              <input
                type="text"
                placeholder="Colombo, Kandy, Galle..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="search-field">
            <label>Pick-up Date</label>
            <div className="input-group">
              <Calendar size={20} className="input-icon" />
              <input
                type="date"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>
          </div>

          <div className="search-field">
            <label>Return Date</label>
            <div className="input-group">
              <Calendar size={20} className="input-icon" />
              <input
                type="date"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-search" onClick={handleSearch}>
            <Search size={20} />
            Search Cars
          </button>
        </div>
      </motion.div>

      <style>{`
        .hero-wrapper {
          background-color: #FDF8F2;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          font-family: var(--font-body);
          color: #111111;
          display: flex;
          flex-direction: column;
        }

        .hero-bg-image {
          position: absolute;
          inset: 0;
          background-image: url('/assets/images/hero_bg_matching.png');
          background-size: cover;
          background-position: center bottom;
          opacity: 1;
          pointer-events: none;
          z-index: 0;
        }

        .hero-bg-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(253, 248, 242, 0.82) 0%,
            rgba(253, 248, 242, 0.55) 35%,
            rgba(253, 248, 242, 0.25) 60%,
            rgba(253, 248, 242, 0.1) 100%
          );
          z-index: 1;
        }

        .hero-ambient-glow {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* Floating Particles */
        .hero-particles {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          background: rgba(255, 138, 0, 0.3);
          border-radius: 50%;
          animation: particleFloat linear infinite;
        }

        @keyframes particleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
        }

        /* Main Content */
        .hero-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          z-index: 10;
          padding-top: 7rem;
          padding-bottom: 7rem;
          text-align: center;
        }

        /* Text Content */
        .hero-content {
          position: relative;
          z-index: 30;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: auto;
        }

        .hero-badge {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          color: #111111;
          padding: 0.4rem 1rem 0.4rem 0.5rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #FF8A00;
          border-radius: 50%;
          display: block;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4.2rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1rem;
          max-width: 920px;
          letter-spacing: -0.03em;
          text-shadow: 0 4px 40px rgba(253, 248, 242, 0.9), 0 0 20px rgba(253, 248, 242, 0.8), 0 0 10px rgba(255, 255, 255, 1);
        }

        .dreams-text {
          font-family: var(--font-accent);
          color: #FF8A00;
          font-style: italic;
          font-weight: 500;
          font-size: 1.05em;
        }

        .hero-subtitle {
          font-size: 1.05rem;
          color: #333333;
          font-weight: 500;
          max-width: 650px;
          margin: 0 auto 1.5rem;
          line-height: 1.6;
          text-shadow: 0 4px 20px rgba(253, 248, 242, 0.9), 0 0 10px rgba(255, 255, 255, 1);
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-primary {
          background: #FF8A00;
          color: white;
          padding: 0.8rem 1.8rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(255, 138, 0, 0.3);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .btn-primary:hover {
          background: #FF9100;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(255, 138, 0, 0.4);
        }

        .btn-secondary {
          background: rgba(253, 248, 242, 0.8);
          backdrop-filter: blur(4px);
          color: #111111;
          padding: 0.8rem 1.8rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 1rem;
          border: 2px solid #111111;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: #111111;
          color: white;
        }

        /* ===== 3D Car Showcase ===== */
        .car-showcase-section {
          width: 100%;
          margin-top: 1.5rem;
          position: relative;
          z-index: 15;
        }

        .car-showcase-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .car-3d-container {
          position: relative;
          width: 100%;
          max-width: 700px;
          height: 320px;
          perspective: 1200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .car-3d-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-style: preserve-3d;
        }

        .car-img-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background: linear-gradient(180deg, 
            rgba(253, 248, 242, 1) 0%,
            rgba(250, 245, 238, 1) 30%,
            rgba(248, 242, 234, 1) 60%,
            rgba(245, 240, 232, 1) 100%
          );
          mask-image: radial-gradient(ellipse 85% 90% at center center, black 50%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 85% 90% at center center, black 50%, transparent 100%);
        }

        .car-3d-img {
          width: 520px;
          max-width: 85vw;
          height: auto;
          object-fit: contain;
          display: block;
          mix-blend-mode: multiply;
          cursor: pointer;
          transition: filter 0.3s ease;
        }

        .car-3d-img:hover {
          filter: brightness(1.05) contrast(1.05);
        }

        /* Reflection effect */
        .car-reflection {
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%) scaleY(-1);
          width: 400px;
          max-width: 70vw;
          height: 80px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.08), transparent);
          border-radius: 50%;
          filter: blur(8px);
          pointer-events: none;
        }

        /* Ground shadow */
        .car-ground-shadow {
          position: absolute;
          bottom: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          max-width: 55vw;
          height: 20px;
          background: radial-gradient(ellipse, rgba(0, 0, 0, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* Side Preview Cars */
        .car-side-previews {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          pointer-events: none;
          display: flex;
          justify-content: space-between;
          padding: 0 0;
        }

        .car-side-preview {
          pointer-events: auto;
          cursor: pointer;
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .car-side-preview.left {
          position: absolute;
          left: -60px;
          top: 50%;
          transform: translateY(-50%);
        }

        .car-side-preview.right {
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%);
        }

        .car-preview-img-wrapper {
          background: rgba(253, 248, 242, 1);
          border-radius: 16px;
          overflow: hidden;
          mask-image: radial-gradient(ellipse 80% 85% at center center, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 85% at center center, black 40%, transparent 100%);
        }

        .car-side-preview img {
          width: 180px;
          height: auto;
          object-fit: contain;
          display: block;
          mix-blend-mode: multiply;
          transition: filter 0.3s ease;
        }

        .car-side-preview:hover img {
          filter: brightness(1.05);
        }

        /* Controls */
        .car-showcase-controls {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .car-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #111;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .car-nav-btn:hover {
          background: #FF8A00;
          color: white;
          border-color: #FF8A00;
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(255, 138, 0, 0.3);
        }

        .car-info-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          padding: 0.55rem 1.25rem;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
        }

        .car-info-name {
          font-weight: 700;
          font-size: 0.9rem;
          color: #111;
        }

        .car-info-divider {
          color: #ccc;
        }

        .car-info-tagline {
          font-size: 0.85rem;
          color: #FF8A00;
          font-weight: 600;
        }

        /* Dot indicators */
        .car-dots {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }

        .car-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.15);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .car-dot.active {
          background: #FF8A00;
          width: 24px;
          border-radius: 999px;
          box-shadow: 0 0 8px rgba(255, 138, 0, 0.4);
        }

        /* Search Card */
        .search-card-wrapper {
          position: relative;
          z-index: 20;
          padding: 0 5%;
          display: flex;
          justify-content: center;
          margin-top: -2rem;
          padding-bottom: 3rem;
        }

        .search-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 24px 50px rgba(0,0,0,0.06);
          width: 100%;
          max-width: 1100px;
          flex-wrap: wrap;
          border: 1px solid rgba(0,0,0,0.03);
          position: relative;
          z-index: 20;
        }

        .search-field {
          flex: 1;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          padding: 0.25rem 1rem;
          border-right: 1px solid #EEEEEE;
        }
        
        .search-field:nth-last-child(2) {
          border-right: none;
        }

        .search-field label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .input-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
        }

        .input-group input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: #111111;
          font-weight: 600;
          font-family: inherit;
        }
        
        .input-group input::placeholder {
          color: #AAAAAA;
          font-weight: 500;
        }

        .input-group input[type="date"] {
          color: #111111;
          text-transform: uppercase;
          font-size: 0.9rem;
        }
        
        .input-group input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .input-icon {
          color: #FF8A00;
          flex-shrink: 0;
        }

        .btn-search {
          background: #FF8A00;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 1rem 2rem;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(255, 138, 0, 0.3);
          transition: transform 0.2s, background 0.2s;
          height: 100%;
          min-height: 56px;
        }

        .btn-search:hover {
          background: #FF9100;
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-wrapper {
            min-height: auto;
          }
          .car-3d-container {
            height: 280px;
          }
          .car-3d-img {
            width: 420px;
          }
          .car-side-preview {
            display: none;
          }
          .search-card {
            border-radius: 16px;
          }
        }

        @media (max-width: 900px) {
          .search-card {
            flex-direction: column;
            gap: 1rem;
          }
          .search-field {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #EEEEEE;
            padding: 0 0 0.75rem 0;
          }
          .search-field:nth-last-child(2) {
            border-bottom: none;
            padding-bottom: 0;
          }
          .btn-search {
            width: 100%;
            justify-content: center;
            min-height: 50px;
            margin-top: 0.5rem;
          }
          .car-3d-container {
            height: 250px;
          }
          .car-3d-img {
            width: 380px;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(2.2rem, 7vw, 3rem);
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }
          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }
          .car-3d-container {
            height: 220px;
          }
          .car-3d-img {
            width: 320px;
          }
        }

        @media (max-width: 480px) {
          .hero-main {
            padding-top: 6rem;
            padding-bottom: 5rem;
          }
          .car-3d-container {
            height: 180px;
          }
          .car-3d-img {
            width: 280px;
          }
          .car-info-badge {
            padding: 0.4rem 0.85rem;
          }
          .car-info-name {
            font-size: 0.8rem;
          }
          .car-info-tagline {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
