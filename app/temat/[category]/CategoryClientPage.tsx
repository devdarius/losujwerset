"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Quote } from "../../data/quotes";

interface CategoryClientPageProps {
  category: string;
  quotes: Quote[];
  title: string;
  intro: string;
}

export default function CategoryClientPage({ category, quotes, title, intro }: CategoryClientPageProps) {
  const router = useRouter();
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synchronize theme with localStorage or system local hour
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    let initialTheme = "dark";
    if (storedTheme) {
      initialTheme = storedTheme;
    } else {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 19) {
        initialTheme = "light";
      }
    }

    if (initialTheme === "light") {
      setIsLightMode(true);
      document.documentElement.classList.add("light-mode");
    } else {
      setIsLightMode(false);
      document.documentElement.classList.remove("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    const nextState = !isLightMode;
    setIsLightMode(nextState);
    if (nextState) {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  };

  // Background particles animation
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      alphaSpeed: number;
    }> = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 80);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -Math.random() * 0.3 - 0.1, // slowly drift upwards
          alpha: Math.random() * 0.5 + 0.2,
          alphaSpeed: (Math.random() - 0.5) * 0.005
        });
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particleColor = isLightMode ? "163, 127, 28" : "212, 175, 55";
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
        
        if (!isLightMode) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(212, 175, 55, 0.3)";
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
        
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;
        
        if (p.alpha <= 0.1 || p.alpha >= 0.8) {
          p.alphaSpeed = -p.alphaSpeed;
        }
        
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          p.vx = -p.vx;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLightMode]);

  return (
    <>
      <canvas id="particle-canvas" ref={particleCanvasRef} />
      
      <div className="app-container">
        <header>
          <Link href="/" className="logo">
            <h1>Losuj<span>Werset</span></h1>
            <p>Wersety z Pisma Świętego</p>
          </Link>
          <div className="controls">
            <button 
              className="control-btn" 
              onClick={toggleTheme}
              title={isLightMode ? "Zmień na motyw ciemny" : "Zmień na motyw jasny"}
            >
              {isLightMode ? (
                <svg viewBox="0 0 24 24">
                  <path d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8c.34 0 .67-.02 1-.06-1.24-1.26-2-2.99-2-4.94 0-3.97 3.23-7.2 7.2-7.2.4 0 .79.04 1.18.11-.78-2.31-2.97-3.91-5.38-3.91z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.03 0-1.41zm-12.37 12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41z"/>
              </svg>
              )}
            </button>
          </div>
        </header>

        <div className="legal-wrapper" style={{ padding: "1rem 1.5rem" }}>
          <Link href="/" className="legal-back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Powrót do losowania
          </Link>

          <div className="category-intro">
            <h2 className="legal-header" style={{ borderBottom: "none", marginBottom: "1rem", paddingBottom: 0 }}>
              <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontStyle: "italic" }}>
                {title}
              </span>
            </h2>
            <p className="category-intro-text">{intro}</p>

            <div className="category-cta-container">
              <button 
                className="btn-primary" 
                onClick={() => router.push(`/?cat=${category}`)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                Wylosuj Werset z tej Kategorii
              </button>
            </div>
          </div>

          <div className="verses-grid">
            {quotes.map((q) => (
              <div 
                key={q.id} 
                className="verse-item-card"
                onClick={() => router.push(`/werset/${q.id}`)}
              >
                <p className="verse-item-text">„{q.text}”</p>
                <div className="verse-item-meta">
                  <span className="verse-item-ref">{q.reference}</span>
                  <span className="verse-item-action">Pobierz grafikę →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer SEO Links */}
          <section className="footer-seo-links" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "4rem" }}>
            <h4 className="seo-links-title">Inne tematy i potrzeby</h4>
            <div className="seo-links-list">
              {["pokoj", "milosc", "nadzieja", "sila", "wiara", "wdziecznosc", "madrosc"]
                .filter(cat => cat !== category)
                .map(cat => {
                  const titles: Record<string, string> = {
                    pokoj: "Pokój i wyciszenie",
                    milosc: "Miłość i dobroć",
                    nadzieja: "Nadzieja i pocieszenie",
                    sila: "Siła i męstwo",
                    wiara: "Wiara i zaufanie",
                    wdziecznosc: "Wdzięczność i dziękczynienie",
                    madrosc: "Mądrość Boża"
                  };
                  return (
                    <Link key={cat} href={`/temat/${cat}`} className="seo-link">
                      {titles[cat]}
                    </Link>
                  );
                })}
            </div>
          </section>
        </div>

        <footer>
          <div>
            Wszystkie wersety z Pisma Świętego losowane są z równym prawdopodobieństwem.
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem", flexWrap: "wrap", justifyContent: "center", opacity: 0.8 }}>
              <Link href="/polityka-prywatnosci" style={{ textDecoration: "underline" }}>Polityka Prywatności</Link>
              <span>•</span>
              <Link href="/regulamin" style={{ textDecoration: "underline" }}>Regulamin</Link>
            </div>
          </div>
          <div>
            © {new Date().getFullYear()} LosujWerset.pl.
          </div>
        </footer>
      </div>
    </>
  );
}
