"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Quote, quotes } from "../../data/quotes";

interface VerseClientPageProps {
  initialQuote: Quote;
  relatedQuotes: Quote[];
}

const playChimeSound = () => {
  if (typeof window === "undefined") return;
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.0);
    
    const osc1 = audioCtx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, audioCtx.currentTime);
    
    const osc2 = audioCtx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1318.51, audioCtx.currentTime);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(audioCtx.destination);
    
    osc1.start();
    osc2.start();
    
    osc1.stop(audioCtx.currentTime + 2.1);
    osc2.stop(audioCtx.currentTime + 2.1);
  } catch (e) {
    console.error("Synthesizer error:", e);
  }
};

const categoryTranslations: Record<string, string> = {
  wszystkie: "Wszystkie",
  pokoj: "Pokój",
  milosc: "Miłość",
  nadzieja: "Nadzieja",
  sila: "Siła",
  wiara: "Wiara",
  wdziecznosc: "Wdzięczność",
  madrosc: "Mądrość"
};

export default function VerseClientPage({ initialQuote, relatedQuotes }: VerseClientPageProps) {
  const [currentQuote, setCurrentQuote] = useState<Quote>(initialQuote);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [canvasTheme, setCanvasTheme] = useState<string>("gradient-gold");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [showCookiesBanner, setShowCookiesBanner] = useState<boolean>(false);
  
  const [toastText, setToastText] = useState<string>("");
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewImgRef = useRef<HTMLImageElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const triggerToast = useCallback((text: string) => {
    setToastText(text);
    setIsToastVisible(true);
  }, []);

  useEffect(() => {
    if (isToastVisible) {
      const timer = setTimeout(() => setIsToastVisible(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isToastVisible]);

  // Read preferences and load theme
  useEffect(() => {
    setCurrentQuote(initialQuote);
    
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
    
    const storedSound = localStorage.getItem("sound");
    if (storedSound === "false") {
      setIsSoundEnabled(false);
    }

    const cookiesAccepted = localStorage.getItem("cookies-accepted");
    if (cookiesAccepted !== "true") {
      setTimeout(() => setShowCookiesBanner(true), 800);
    }
  }, [initialQuote]);

  // Draw another quote from the same category
  const drawRandomQuote = (animate: boolean = true) => {
    const filtered = quotes.filter(q => q.category === initialQuote.category);
    if (filtered.length === 0) return;

    const selectNew = () => {
      let chosen = filtered[Math.floor(Math.random() * filtered.length)];
      if (filtered.length > 1 && chosen.id === currentQuote.id) {
        const remaining = filtered.filter(q => q.id !== currentQuote.id);
        chosen = remaining[Math.floor(Math.random() * remaining.length)];
      }
      
      setCurrentQuote(chosen);
      
      // Update browser URL silently
      if (typeof window !== "undefined") {
        const newUrl = `${window.location.origin}/werset/${chosen.id}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
      
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "draw_quote_verse_page", {
          quote_id: chosen.id,
          quote_ref: chosen.reference,
          category: chosen.category,
        });
      }

      if (isSoundEnabled && animate) {
        playChimeSound();
      }
    };

    if (animate) {
      setIsTransitioning(true);
      setTimeout(() => {
        selectNew();
        setIsTransitioning(false);
      }, 400);
    } else {
      selectNew();
    }
  };

  const toggleSound = () => {
    const nextState = !isSoundEnabled;
    setIsSoundEnabled(nextState);
    localStorage.setItem("sound", String(nextState));
    triggerToast(nextState ? "DŹWIĘK WŁĄCZONY" : "DŹWIĘK WYCISZONY");
  };

  const toggleTheme = () => {
    const nextState = !isLightMode;
    setIsLightMode(nextState);
    if (nextState) {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
      triggerToast("MOTYW PIASKOWY");
    } else {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
      triggerToast("MOTYW MISTYCZNY");
    }
  };

  const copyToClipboard = () => {
    const shareText = `„${currentQuote.text}” – ${currentQuote.reference} (LosujWerset.pl)`;
    navigator.clipboard.writeText(shareText)
      .then(() => {
        triggerToast("SKOPIOWANO WERSET!");
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "copy_quote_text", {
            quote_id: currentQuote.id,
            quote_ref: currentQuote.reference,
          });
        }
      })
      .catch(() => triggerToast("BŁĄD KOPIOWANIA"));
  };

  const copyLink = () => {
    const shareUrl = `${window.location.origin}/werset/${currentQuote.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        triggerToast("LINK SKOPIOWANY!");
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "copy_quote_link", {
            quote_id: currentQuote.id,
            quote_ref: currentQuote.reference,
          });
        }
      })
      .catch(() => triggerToast("BŁĄD KOPIOWANIA"));
  };

  // Canvas draw logic
  const generateShareImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const size = 1080;
    canvas.width = size;
    canvas.height = size;
    
    ctx.clearRect(0, 0, size, size);
    
    if (canvasTheme === "gradient-gold") {
      const gradient = ctx.createRadialGradient(size/2, size/2, 50, size/2, size/2, size * 0.75);
      gradient.addColorStop(0, "#161b2b");
      gradient.addColorStop(1, "#060709");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
      const glowGrad = ctx.createRadialGradient(size/2, size/3, 10, size/2, size/3, 400);
      glowGrad.addColorStop(0, "rgba(212, 175, 55, 0.08)");
      glowGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, size, size);
    } else if (canvasTheme === "gradient-dark") {
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, "#050608");
      gradient.addColorStop(1, "#12141a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    } else if (canvasTheme === "gradient-sand") {
      const gradient = ctx.createRadialGradient(size/2, size/2, 50, size/2, size/2, size * 0.75);
      gradient.addColorStop(0, "#faf8f4");
      gradient.addColorStop(1, "#ebdcc3");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    } else if (canvasTheme === "gradient-dusk") {
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, "#2c1538");
      gradient.addColorStop(1, "#070408");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    
    const frameInset = 50;
    ctx.lineWidth = 1;
    ctx.strokeStyle = canvasTheme === "gradient-sand" ? "rgba(163, 127, 28, 0.35)" : "rgba(212, 175, 55, 0.3)";
    ctx.strokeRect(frameInset, frameInset, size - frameInset * 2, size - frameInset * 2);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = canvasTheme === "gradient-sand" ? "rgba(163, 127, 28, 0.7)" : "rgba(212, 175, 55, 0.6)";
    ctx.strokeRect(frameInset + 10, frameInset + 10, size - (frameInset + 10) * 2, size - (frameInset + 10) * 2);

    ctx.strokeStyle = canvasTheme === "gradient-sand" ? "#a37f1c" : "#d4af37";
    ctx.lineWidth = 3;
    const center = size / 2;
    const symbolY = 160;
    ctx.beginPath();
    ctx.moveTo(center, symbolY - 20);
    ctx.lineTo(center, symbolY + 20);
    ctx.moveTo(center - 15, symbolY - 5);
    ctx.lineTo(center + 15, symbolY - 5);
    ctx.stroke();
    
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = canvasTheme === "gradient-sand" ? "#1f2937" : "#f3f4f6";
    ctx.font = "italic 42px 'Playfair Display', Georgia, serif";
    
    const maxTextWidth = size - 220;
    const lineHeight = 66;
    
    const wrapText = (text: string, maxWidth: number) => {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = "";
      
      for (let n = 0; n < words.length; n++) {
        const testLine = currentLine + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines.push(currentLine.trim());
          currentLine = words[n] + " ";
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine.trim());
      return lines;
    };
    
    const lines = wrapText(`„${currentQuote.text}”`, maxTextWidth);
    
    const centerY = 490;
    const totalHeight = lines.length * lineHeight;
    const startY = centerY - (totalHeight / 2) + (lineHeight / 2);
    
    lines.forEach((line, index) => {
      ctx.fillText(line, center, startY + index * lineHeight);
    });
    
    ctx.font = "bold 23px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillStyle = canvasTheme === "gradient-sand" ? "#a37f1c" : "#d4af37";
    
    const referenceY = 810;
    ctx.fillText(currentQuote.reference.toUpperCase(), center, referenceY);
    
    ctx.font = "500 15px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillStyle = canvasTheme === "gradient-sand" ? "#4b5563" : "#9ca3af";
    ctx.fillText("NOWA BIBLIA GDAŃSKA (NBG)", center, referenceY + 40);
    
    ctx.font = "bold 18px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillStyle = canvasTheme === "gradient-sand" ? "#a37f1c" : "rgba(212, 175, 55, 0.65)";
    ctx.fillText("LOSUJWERSET.PL", center, size - 120);
    
    if (previewImgRef.current) {
      previewImgRef.current.src = canvas.toDataURL("image/png");
    }
  }, [currentQuote, canvasTheme]);

  const openShareModal = () => {
    setIsModalOpen(true);
    setTimeout(generateShareImage, 100);
  };

  const closeShareModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      generateShareImage();
    }
  }, [canvasTheme, isModalOpen, generateShareImage]);

  useEffect(() => {
    if (typeof document !== "undefined" && (document as any).fonts) {
      (document as any).fonts.ready.then(() => {
        if (isModalOpen) {
          generateShareImage();
        }
      });
    }
  }, [isModalOpen, generateShareImage]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = `Werset_${currentQuote.reference.replace(/\s+/g, "_").replace(/:/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    triggerToast("ZAPISANO GRAFIKĘ!");

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "download_quote_graphic", {
        quote_id: currentQuote.id,
        quote_ref: currentQuote.reference,
        canvas_theme: canvasTheme,
      });
    }
  };

  const acceptCookies = () => {
    localStorage.setItem("cookies-accepted", "true");
    setShowCookiesBanner(false);
  };

  // Particles background system
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
          vy: -Math.random() * 0.3 - 0.1,
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
              onClick={toggleSound}
              title={isSoundEnabled ? "Wycisz dźwięk" : "Włącz dźwięk"}
            >
              {isSoundEnabled ? (
                <svg viewBox="0 0 24 24">
                  <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2.5 15.57l-4.5-4h-4v-5.6h4l4.5-4v13.6zm1.5-6.8c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              )}
            </button>
            
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
        
        <main>
          <div className="quote-card" style={{ transition: "all 0.5s" }}>
            <div className="category-badge">
              <Link href={`/temat/${currentQuote.category}`}>
                {categoryTranslations[currentQuote.category] || currentQuote.category}
              </Link>
            </div>
            
            <div className="quote-text-container">
              <span className="quote-decor quote-decor-left">“</span>
              <blockquote className={`quote-text ${isTransitioning ? "fade-out" : ""}`}>
                {currentQuote.text}
              </blockquote>
              <span className="quote-decor quote-decor-right">”</span>
            </div>
            
            <div className={`quote-reference ${isTransitioning ? "fade-out" : ""}`}>
              <a href={currentQuote.sourceUrl} target="_blank" rel="noopener noreferrer">
                {currentQuote.reference}
              </a>
            </div>
            
            <div className={`quote-translation ${isTransitioning ? "fade-out" : ""}`}>
              Nowa Biblia Gdańska (NBG)
            </div>
            
            <div className="action-buttons">
              <button 
                className="btn-primary" 
                onClick={() => drawRandomQuote(true)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                Wylosuj inny z tej kategorii
              </button>
              
              <button className="btn-secondary" onClick={copyToClipboard}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Kopiuj Tekst
              </button>
              
              <button className="btn-secondary" onClick={openShareModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                Stwórz Grafikę
              </button>
              
              <button className="btn-secondary" onClick={copyLink}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Kopiuj Link
              </button>
            </div>
          </div>
        </main>

        {/* Related Verses Section */}
        {relatedQuotes.length > 0 && (
          <section className="related-section">
            <h3 className="related-title">
              Inne wersety z kategorii: {categoryTranslations[initialQuote.category]}
            </h3>
            <div className="verses-grid">
              {relatedQuotes.map((q) => (
                <Link key={q.id} href={`/werset/${q.id}`} className="verse-item-card">
                  <p className="verse-item-text" style={{ fontSize: "0.95rem" }}>„{q.text}”</p>
                  <div className="verse-item-meta">
                    <span className="verse-item-ref" style={{ fontSize: "0.75rem" }}>{q.reference}</span>
                    <span className="verse-item-action" style={{ fontSize: "0.75rem" }}>Czytaj →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer SEO Links */}
        <section className="footer-seo-links" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", marginTop: "3rem" }}>
          <h4 className="seo-links-title">Szukaj wersetów według potrzeb i tematów</h4>
          <div className="seo-links-list">
            <Link href="/temat/pokoj" className="seo-link">Pokój i wyciszenie</Link>
            <Link href="/temat/milosc" className="seo-link">Miłość i dobroć</Link>
            <Link href="/temat/nadzieja" className="seo-link">Nadzieja i pocieszenie</Link>
            <Link href="/temat/sila" className="seo-link">Siła i męstwo</Link>
            <Link href="/temat/wiara" className="seo-link">Wiara i zaufanie</Link>
            <Link href="/temat/wdziecznosc" className="seo-link">Wdzięczność i dziękczynienie</Link>
            <Link href="/temat/madrosc" className="seo-link">Mądrość Boża</Link>
          </div>
        </section>

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

      <div className={`toast ${isToastVisible ? "show" : ""}`}>
        {toastText}
      </div>

      {/* Share Image Generator Modal */}
      <div className={`modal-overlay ${isModalOpen ? "open" : ""}`} onClick={closeShareModal}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeShareModal} title="Zamknij">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          
          <h3 className="modal-title">Stwórz Grafikę</h3>
          
          <div className="theme-selector">
            {["gradient-gold", "gradient-dark", "gradient-sand", "gradient-dusk"].map((theme) => (
              <div 
                key={theme}
                className={`theme-option ${theme} ${canvasTheme === theme ? "active" : ""}`}
                onClick={() => setCanvasTheme(theme)}
                title={`Motyw: ${theme.replace("gradient-", "")}`}
              />
            ))}
          </div>

          <canvas ref={canvasRef} id="share-canvas" />

          <div className="canvas-preview-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              ref={previewImgRef} 
              alt="Podgląd grafiki" 
              className="canvas-preview-img"
            />
          </div>

          <button className="btn-primary" onClick={downloadImage} style={{ width: "100%", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "none" }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Pobierz jako PNG
          </button>
        </div>
      </div>

      <div className={`cookies-banner ${showCookiesBanner ? "show" : ""}`}>
        <p className="cookies-text">
          Używamy informacji zapisanych w pamięci lokalnej (Local Storage) do zapamiętania Twojego motywu oraz ustawień dźwięku. Szczegóły znajdziesz w naszej{" "}
          <Link href="/polityka-prywatnosci">Polityce Prywatności</Link>.
        </p>
        <button className="cookies-btn" onClick={acceptCookies}>
          Rozumiem
        </button>
      </div>
    </>
  );
}
