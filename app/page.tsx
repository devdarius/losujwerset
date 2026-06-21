"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Quote, quotes } from "./data/quotes";

// Sound synthesizer using Web Audio API
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
    
    // A5 (880 Hz) and E6 (1318.51 Hz) - pure perfect fifth for a peaceful, celestial vibe
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
  wdziecznosc: "Wdzięczność"
};

export default function Home() {
  // Application State
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("wszystkie");
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [canvasTheme, setCanvasTheme] = useState<string>("gradient-gold");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  
  // Toast notifications state
  const [toastText, setToastText] = useState<string>("");
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  
  // Canvas sharing refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewImgRef = useRef<HTMLImageElement | null>(null);
  
  // Background particles canvas ref
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger toast alert
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

  // Initial draw & reading query string
  useEffect(() => {
    // Check local storage preferences
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setIsLightMode(true);
      document.documentElement.classList.add("light-mode");
    }
    
    const storedSound = localStorage.getItem("sound");
    if (storedSound === "false") {
      setIsSoundEnabled(false);
    }

    // Router matching via query parameter
    const params = new URLSearchParams(window.location.search);
    const paramId = params.get("id");
    
    if (paramId) {
      const idNum = parseInt(paramId, 10);
      const found = quotes.find(q => q.id === idNum);
      if (found) {
        setCurrentQuote(found);
        setActiveCategory(found.category);
        return;
      }
    }
    
    // Default: draw a random quote
    drawRandomQuote("wszystkie", false);
  }, [triggerToast]);

  // Handle URL updating without page reload
  const updateUrlQuery = (id: number) => {
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?id=${id}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  // Draw random quote
  const drawRandomQuote = (category: string = "wszystkie", animate: boolean = true) => {
    const filtered = category === "wszystkie" 
      ? quotes 
      : quotes.filter(q => q.category === category);
      
    if (filtered.length === 0) return;

    const selectNew = () => {
      // Avoid drawing the same quote twice if there are multiple options
      let chosen = filtered[Math.floor(Math.random() * filtered.length)];
      if (filtered.length > 1 && currentQuote && chosen.id === currentQuote.id) {
        const remaining = filtered.filter(q => q.id !== currentQuote.id);
        chosen = remaining[Math.floor(Math.random() * remaining.length)];
      }
      
      setCurrentQuote(chosen);
      updateUrlQuery(chosen.id);
      
      if (isSoundEnabled && animate) {
        playChimeSound();
      }
    };

    if (animate) {
      setIsTransitioning(true);
      setTimeout(() => {
        selectNew();
        setIsTransitioning(false);
      }, 400); // matching CSS transitions
    } else {
      selectNew();
    }
  };

  // Sound switch toggle
  const toggleSound = () => {
    const nextState = !isSoundEnabled;
    setIsSoundEnabled(nextState);
    localStorage.setItem("sound", String(nextState));
    triggerToast(nextState ? "DŹWIĘK WŁĄCZONY" : "DŹWIĘK WYCISZONY");
  };

  // Light/Dark Theme Switch
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

  // Copy to clipboard helper
  const copyToClipboard = () => {
    if (!currentQuote) return;
    const shareText = `„${currentQuote.text}” – ${currentQuote.reference} (Otwórz Słowo)`;
    navigator.clipboard.writeText(shareText)
      .then(() => triggerToast("SKOPIOWANO Werset!"))
      .catch(() => triggerToast("BŁĄD KOPIOWANIA"));
  };

  // Copy URL to clipboard
  const copyLink = () => {
    if (!currentQuote) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?id=${currentQuote.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => triggerToast("LINK SKOPIOWANY!"))
      .catch(() => triggerToast("BŁĄD KOPIOWANIA"));
  };

  // Category change wrapper
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    drawRandomQuote(category, true);
  };

  // Canvas Drawing & Image Generation
  const generateShareImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentQuote) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set fixed square size for high quality Instagram post (1080x1080)
    const size = 1080;
    canvas.width = size;
    canvas.height = size;
    
    // Clear canvas completely to prevent ghosting artifacts
    ctx.clearRect(0, 0, size, size);
    
    // 1. Draw Background
    if (canvasTheme === "gradient-gold") {
      const gradient = ctx.createRadialGradient(size/2, size/2, 50, size/2, size/2, size * 0.75);
      gradient.addColorStop(0, "#161b2b");
      gradient.addColorStop(1, "#060709");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
      // Radiant subtle golden halo
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
    
    // 2. Draw Frames (Złote lub ciemnobrązowe ramki)
    const frameInset = 50;
    ctx.lineWidth = 1;
    ctx.strokeStyle = canvasTheme === "gradient-sand" ? "rgba(163, 127, 28, 0.35)" : "rgba(212, 175, 55, 0.3)";
    ctx.strokeRect(frameInset, frameInset, size - frameInset * 2, size - frameInset * 2);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = canvasTheme === "gradient-sand" ? "rgba(163, 127, 28, 0.7)" : "rgba(212, 175, 55, 0.6)";
    ctx.strokeRect(frameInset + 10, frameInset + 10, size - (frameInset + 10) * 2, size - (frameInset + 10) * 2);

    // 3. Draw Decorative Cross at the top
    ctx.strokeStyle = canvasTheme === "gradient-sand" ? "#a37f1c" : "#d4af37";
    ctx.lineWidth = 3;
    const center = size / 2;
    const symbolY = 160;
    ctx.beginPath();
    ctx.moveTo(center, symbolY - 20); // vertical line
    ctx.lineTo(center, symbolY + 20);
    ctx.moveTo(center - 15, symbolY - 5); // horizontal line
    ctx.lineTo(center + 15, symbolY - 5);
    ctx.stroke();
    
    // 4. Wrap & Draw Quote Text (Wyśrodkowanie w strefie cytatu)
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = canvasTheme === "gradient-sand" ? "#1f2937" : "#f3f4f6";
    
    // Używamy bezpiecznych fontów systemowych na wypadek gdyby Google Fonts się ładowały
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
    
    // Precyzyjne pionowe wyśrodkowanie tekstu w środkowej sekcji (centerY = 490)
    const centerY = 490;
    const totalHeight = lines.length * lineHeight;
    const startY = centerY - (totalHeight / 2) + (lineHeight / 2);
    
    lines.forEach((line, index) => {
      ctx.fillText(line, center, startY + index * lineHeight);
    });
    
    // 5. Draw Reference (Księga i werset) - Stała pozycja Y = 810 dla idealnego podziału
    ctx.font = "bold 23px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillStyle = canvasTheme === "gradient-sand" ? "#a37f1c" : "#d4af37";
    
    const referenceY = 810;
    ctx.fillText(currentQuote.reference.toUpperCase(), center, referenceY);
    
    // 6. Draw Translation - Stała pozycja Y = 850
    ctx.font = "500 15px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillStyle = canvasTheme === "gradient-sand" ? "#4b5563" : "#9ca3af";
    ctx.fillText("NOWA BIBLIA GDAŃSKA (NBG)", center, referenceY + 40);
    
    // 7. Footer branding - Stała pozycja Y = 950
    ctx.font = "bold 18px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillStyle = canvasTheme === "gradient-sand" ? "#a37f1c" : "rgba(212, 175, 55, 0.65)";
    ctx.fillText("LOSUJWERSET.PL", center, size - 120);
    
    // Convert canvas image to source of image tag
    if (previewImgRef.current) {
      previewImgRef.current.src = canvas.toDataURL("image/png");
    }
  }, [currentQuote, canvasTheme]);

  // Trigger modal open and draw canvas
  const openShareModal = () => {
    setIsModalOpen(true);
    setTimeout(generateShareImage, 100);
  };

  const closeShareModal = () => {
    setIsModalOpen(false);
  };

  // Redraw when theme option is changed in modal
  useEffect(() => {
    if (isModalOpen) {
      generateShareImage();
    }
  }, [canvasTheme, isModalOpen, generateShareImage]);

  // Auto redraw when Google Fonts are fully loaded in the browser
  useEffect(() => {
    if (typeof document !== "undefined" && (document as any).fonts) {
      (document as any).fonts.ready.then(() => {
        if (isModalOpen) {
          generateShareImage();
        }
      });
    }
  }, [isModalOpen, generateShareImage]);

  // Canvas download handler
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentQuote) return;
    
    const link = document.createElement("a");
    link.download = `Werset_${currentQuote.reference.replace(/\s+/g, "_").replace(/:/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    triggerToast("ZAPISANO GRAFIKĘ!");
  };

  // Background particle system effect
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
    
    // Draw / Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Adapt color based on dark/light mode
      const particleColor = isLightMode ? "163, 127, 28" : "212, 175, 55";
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
        
        // Soft glowing shadows for particles in dark mode
        if (!isLightMode) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(212, 175, 55, 0.3)";
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        
        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;
        
        // Smooth blinking
        if (p.alpha <= 0.1 || p.alpha >= 0.8) {
          p.alphaSpeed = -p.alphaSpeed;
        }
        
        // Boundary check (respawn at bottom if goes off-screen)
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
      {/* Background Animated Canvas */}
      <canvas id="particle-canvas" ref={particleCanvasRef} />
      
      {/* App Container */}
      <div className="app-container">
        
        {/* Header Section */}
        <header>
          <div className="logo" onClick={() => drawRandomQuote(activeCategory, true)}>
            <h1>Losuj<span>Werset</span></h1>
            <p>Wersety z Pisma Świętego</p>
          </div>
          
          <div className="controls">
            {/* Audio Toggle button */}
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
            
            {/* Theme Toggle button */}
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
        
        {/* Main Content Area */}
        <main>
          {currentQuote && (
            <div className="quote-card">
              {/* Category indicator */}
              <div className="category-badge">
                {categoryTranslations[currentQuote.category] || currentQuote.category}
              </div>
              
              {/* Animated Text Container with Decorative Quotes */}
              <div className="quote-text-container">
                <span className="quote-decor quote-decor-left">“</span>
                <blockquote 
                  className={`quote-text ${isTransitioning ? "fade-out" : ""}`}
                >
                  {currentQuote.text}
                </blockquote>
                <span className="quote-decor quote-decor-right">”</span>
              </div>
              
              {/* Source/Reference details */}
              <div className={`quote-reference ${isTransitioning ? "fade-out" : ""}`}>
                <a href={currentQuote.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {currentQuote.reference}
                </a>
              </div>
              
              <div className={`quote-translation ${isTransitioning ? "fade-out" : ""}`}>
                Nowa Biblia Gdańska (NBG)
              </div>
              
              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  className="btn-primary" 
                  onClick={() => drawRandomQuote(activeCategory, true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                  Otwórz Słowo Ponownie
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
          )}
        </main>
        
        {/* Category filtering section with responsive wrapper */}
        <section className="categories-bar-wrapper">
          <div className="categories-bar">
            {["wszystkie", "pokoj", "milosc", "nadzieja", "sila", "wiara", "wdziecznosc"].map((cat) => (
              <button
                key={cat}
                className={`category-filter ${activeCategory === cat ? "active" : ""}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {categoryTranslations[cat]}
              </button>
            ))}
          </div>
        </section>
        
        {/* Footer Section */}
        <footer>
          <div>
            Inspirowane serwisem <a href="https://otwórz.pl" target="_blank" rel="noopener noreferrer">otwórz.pl</a>. Wszystkie wersety losowane są z równym prawdopodobieństwem.
          </div>
          <div>
            © {new Date().getFullYear()} LosujWerset.pl.
          </div>
        </footer>
      </div>
      
      {/* Toast Notification Box */}
      <div className={`toast ${isToastVisible ? "show" : ""}`}>
        {toastText}
      </div>

      {/* Share Image Generator Modal overlay */}
      <div className={`modal-overlay ${isModalOpen ? "open" : ""}`} onClick={closeShareModal}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeShareModal} title="Zamknij">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          
          <h3 className="modal-title">Stwórz Grafikę</h3>
          
          {/* Theme Gradient selector */}
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

          {/* Hidden HTML5 Canvas */}
          <canvas ref={canvasRef} id="share-canvas" />

          {/* Live image preview */}
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
    </>
  );
}
