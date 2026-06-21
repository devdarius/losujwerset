"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
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
            <h1>Polityka Prywatności</h1>
            <p>Ostatnia aktualizacja: 21 czerwca 2026 r.</p>
          </div>

          <div className="legal-body">
            <p>Serwis <strong>LosujWerset.pl</strong> szanuje prywatność swoich użytkowników. Poniżej przedstawiamy zasady dotyczące zbierania i wykorzystywania danych w ramach działania aplikacji.</p>

            <h2>1. Zbieranie Danych Osobowych</h2>
            <p>Serwis LosujWerset.pl <strong>nie zbiera, nie przetwarza ani nie przechowuje żadnych danych osobowych</strong> użytkowników. Nie wymagamy rejestracji, zakładania konta ani podawania danych kontaktowych (takich jak e-mail czy imię).</p>

            <h2>2. Pliki Cookies i Pamięć Lokalna (Local Storage)</h2>
            <p>Aplikacja nie wykorzystuje żadnych śledzących plików cookies o charakterze reklamowym ani profilującym. Używamy jedynie mechanizmu <strong>Local Storage</strong> (pamięci lokalnej przeglądarki) w celu zachowania preferencji użytkownika:</p>
            <ul>
              <li>Wybranego motywu graficznego (ciemny / jasny piaskowy),</li>
              <li>Ustawienia dźwięku (włączony / wyłączony),</li>
              <li>Zaakceptowania komunikatu o ciasteczkach (aby baner nie wyświetlał się przy kolejnej wizycie).</li>
            </ul>

            <h2>3. Narzędzia Analityczne i Statystyczne</h2>
            <p>W celu optymalizacji działania serwisu oraz analizy statystyk ruchu korzystamy z narzędzia <strong>Google Analytics</strong> dostarczanego przez Google Ireland Limited. Narzędzie to wykorzystuje pliki cookies do zbierania anonimowych informacji (takich jak liczba odwiedzin, czas spędzony na stronie, najczęściej klikane przyciski czy pobieranie grafik).</p>
            <p>Wszystkie adresy IP użytkowników są <strong>anonimizowane</strong> przez Google przed ich przetworzeniem. Użytkownik może w każdej chwili zablokować pliki cookies w ustawieniach swojej przeglądarki lub nie wyrazić zgody na ich zapisywanie w naszym banerze cookies.</p>

            <h2>4. Odnośniki do Zewnętrznych Stron</h2>
            <p>Nasza strona zawiera linki prowadzące do zewnętrznego portalu <strong>bible.com</strong> (w celu przeczytania pełnego kontekstu wersetów). Nie ponosimy odpowiedzialności za polityki prywatności oraz zasady korzystania z ciasteczek obowiązujące na zewnętrznych witrynach.</p>

            <h2>5. Kontakt</h2>
            <p>W przypadku jakichkolwiek pytań dotyczących funkcjonowania serwisu, zapraszamy do kontaktu poprzez nasze repozytorium GitHub.</p>
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
