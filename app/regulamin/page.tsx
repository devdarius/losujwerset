"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Terms() {
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

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

  return (
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

      <div className="legal-wrapper">
        <Link href="/" className="legal-back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Powrót do losowania
        </Link>

        <div className="legal-card">
          <div className="legal-header">
            <h1>Regulamin Serwisu</h1>
            <p>Ostatnia aktualizacja: 21 czerwca 2026 r.</p>
          </div>

          <div className="legal-body">
            <p>Poniższy regulamin określa zasady korzystania z serwisu internetowego <strong>LosujWerset.pl</strong>.</p>

            <h2>1. Postanowienia Ogólne</h2>
            <p>Serwis LosujWerset.pl jest niezależnym projektem cyfrowym, udostępniającym bezpłatnie wersety z Pisma Świętego. Korzystanie z serwisu oznacza akceptację postanowień niniejszego regulaminu.</p>

            <h2>2. Warunki Korzystania z Serwisu</h2>
            <ul>
              <li>Korzystanie z serwisu jest dobrowolne, całkowicie bezpłatne i nie wymaga rejestracji.</li>
              <li>Wersety losowane są w sposób zautomatyzowany z równym prawdopodobieństwem z bazy danych wbudowanej w aplikację.</li>
              <li>Materiały biblijne prezentowane na stronie są oparte na publicznie dostępnych tłumaczeniach (Nowa Biblia Gdańska).</li>
            </ul>

            <h2>3. Generator Grafik i Prawa Autorskie</h2>
            <p>Serwis udostępnia narzędzie pozwalające na generowanie i pobieranie grafik zawierających wersety biblijne:</p>
            <ul>
              <li>Wygenerowane grafiki mogą być swobodnie pobierane i udostępniane przez użytkowników w celach prywatnych, ewangelizacyjnych oraz niekomercyjnych (np. w mediach społecznościowych).</li>
              <li>Zabrania się masowego, zautomatyzowanego pobierania zasobów witryny oraz wykorzystywania kodu aplikacji w celach zarobkowych bez zgody właścicieli projektu.</li>
            </ul>

            <h2>4. Odpowiedzialność</h2>
            <p>Serwis jest udostępniany w stanie, w jakim się znajduje („as is”). Dokładamy wszelkich starań, aby strona działała bez zakłóceń, jednak nie gwarantujemy stałej dostępności serwisu ani bezbłędnego działania mechanizmów sieciowych w każdym środowisku.</p>

            <h2>5. Zmiany Regulaminu</h2>
            <p>Regulamin może być aktualizowany. Wszelkie zmiany wchodzą w życie z chwilą ich publikacji na tej stronie.</p>
          </div>
        </div>
      </div>

      <footer>
        <div>
          Wszystkie wersety z Pisma Świętego losowane są z równym prawdopodobieństwem.
        </div>
        <div>
          © {new Date().getFullYear()} LosujWerset.pl.
        </div>
      </footer>
    </div>
  );
}
