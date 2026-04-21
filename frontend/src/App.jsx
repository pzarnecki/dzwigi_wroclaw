import React, { useState, useEffect } from 'react';
import './styles/App.css';

// Dane dźwigów - wszystkie 12 modeli z oryginalnej strony
const cranes = [
  {
    id: "ltm-1200",
    name: "LTM 1200-5.1",
    capacity: "200 t",
    reach: "72 m + 16 m",
    image: import.meta.env.BASE_URL + "images/ltm-1200.jpg",
    pdf: "LTM_1200-5.1_Volledigebrochure.pdf",
    featured: true
  },
  {
    id: "ltm-1160",
    name: "LTM 1160-5.1",
    capacity: "160 t",
    reach: "62 m + 22 m",
    image: import.meta.env.BASE_URL + "images/ltm-1160.jpg",
    pdf: "LiebherrLTM1160-5.1.pdf",
    featured: true
  },
  {
    id: "ltm-1130",
    name: "LTM 1130-5.1",
    capacity: "130 t",
    reach: "60 m + 19 m",
    image: import.meta.env.BASE_URL + "images/ltm-1130.jpg",
    pdf: "LTM_1130-5.1.pdf",
    featured: true
  },
  {
    id: "ltm-1100",
    name: "LTM 1100-4.1",
    capacity: "100 t",
    reach: "52 m + 19 m",
    image: import.meta.env.BASE_URL + "images/ltm-1100.jpg",
    pdf: "LTM 1100-4.1.pdf",
    featured: false
  },
  {
    id: "ltm-1095",
    name: "LTM 1095-5.1",
    capacity: "95 t",
    reach: "58 m + 26 m",
    image: import.meta.env.BASE_URL + "images/ltm-1095.jpg",
    pdf: "LTM 1095-5.1.pdf",
    featured: false
  },
  {
    id: "ltm-1090",
    name: "LTM 1090-4.1",
    capacity: "90 t",
    reach: "50 m + 26 m",
    image: import.meta.env.BASE_URL + "images/ltm-1090.jpg",
    pdf: "LTM 1090-4.1.pdf",
    featured: false
  },
  {
    id: "ltm-1070",
    name: "LTM 1070-4.1",
    capacity: "70 t",
    reach: "50 m + 17 m",
    image: import.meta.env.BASE_URL + "images/ltm-1070.jpg",
    pdf: "LTM 1070-4.1.pdf",
    featured: false
  },
  {
    id: "ltm-1060",
    name: "LTM 1060/2",
    capacity: "60 t",
    reach: "42 m + 18 m",
    image: import.meta.env.BASE_URL + "images/ltm-1060.png",
    pdf: "LTM-1060-2.pdf",
    featured: false
  },
  {
    id: "ltm-1055",
    name: "LTM 1055-3.2",
    capacity: "55 t",
    reach: "40 m + 16 m",
    image: import.meta.env.BASE_URL + "images/ltm-1055.jpg",
    pdf: "LTM 1055-3.2.pdf",
    featured: false
  },
  {
    id: "ltm-1050",
    name: "LTM 1050-3.1",
    capacity: "50 t",
    reach: "38 m + 16 m",
    image: import.meta.env.BASE_URL + "images/ltm-1050.jpg",
    pdf: "LTM 1050-3.1.pdf",
    featured: false
  },
  {
    id: "ltm-1040",
    name: "LTM 1040-2.1",
    capacity: "40 t",
    reach: "35 m + 10 m",
    image: import.meta.env.BASE_URL + "images/ltm-1040.jpg",
    pdf: "LTM 1040-2.1.pdf",
    featured: false
  },
  {
    id: "ltm-1030",
    name: "LTM 1030-2.1",
    capacity: "35 t",
    reach: "30 m + 15 m",
    image: import.meta.env.BASE_URL + "images/ltm-1030.jpg",
    pdf: "LTM 1030-2.1.pdf",
    featured: false
  }
];

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* HEADER */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-content">
          <div className="logo">
            DŹWIGI<span className="logo-accent">PL</span>
          </div>
          <nav className="nav">
            <a href="#home" className="nav-link active">Start</a>
            <a href="#cranes" className="nav-link">Oferta</a>
            <a href="#about" className="nav-link">O firmie</a>
            <a href="#contact" className="nav-link">Kontakt</a>
          </nav>
          <div className="phone-cta">
            <a href="tel:600057140" className="phone-link">600 057 140</a>
            <a href="tel:728600690" className="phone-link">728 600 690</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-subtitle">Profesjonalne usługi dźwigowe 24/7</div>
            <h1 className="hero-title">
              <span className="text-gradient">DŹWIGI</span> I ŻURAWIE<br />
              DO <span className="text-highlight">200 TON</span>
            </h1>
            <p className="hero-description">
              Oferujemy wynajem dźwigów Liebherr o udźwigu do 200 ton i wysięgu do 100 metrów. 
              Działamy na terenie całej Polski, ze szczególnym uwzględnieniem województwa dolnośląskiego.
            </p>
            <div className="hero-cta">
              <a href="tel:600057140" className="btn btn-primary">
                Zadzwoń teraz →
              </a>
              <a href="#cranes" className="btn btn-secondary">
                Zobacz park maszynowy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">200t</span>
              <span className="stat-label">Maksymalny udźwig</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Dźwigów w parku</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100m</span>
              <span className="stat-label">Maksymalny wysięg</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Dostępność</span>
            </div>
          </div>
        </div>
      </section>

      {/* CRANES SECTION */}
      <section className="cranes-section" id="cranes">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle">Nasz park maszynowy</div>
            <h2>Dźwigi <span className="text-gradient">Liebherr</span></h2>
          </div>
          
          <div className="cranes-grid">
            {cranes.map((crane) => (
              <div key={crane.id} className="crane-card">
                <img 
                  src={crane.image} 
                  alt={crane.name}
                  className="crane-card-image"
                />
                <div className="crane-card-content">
                  <h3 className="crane-card-title">{crane.name}</h3>
                  <div className="crane-card-specs">
                    <div className="spec-item">
                      <span className="spec-label">Udźwig</span>
                      <span className="spec-value">{crane.capacity}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Wysięg</span>
                      <span className="spec-value">{crane.reach}</span>
                    </div>
                  </div>
                  <a href={`#${crane.id}`} className="crane-card-link">
                    Więcej informacji →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle">O nas</div>
            <h2>Usługi dźwigowe – <span className="text-gradient">wynajem</span></h2>
            <h3 style={{fontSize: '1.8rem', marginTop: '1rem', color: '#b0b0b0', fontWeight: 400, textTransform: 'none'}}>
              Kompetencje, doświadczenie i szeroka oferta
            </h3>
          </div>
          <div className="about-content" style={{maxWidth: '1100px', margin: '0 auto'}}>
            <p className="about-text">
              <strong>DŹWIGI PL</strong> to firma, która już od początku swego istnienia stawiała na doświadczenie, 
              szeroką ofertę oraz nowoczesne rozwiązania stosowane w branży dźwigowej. W początkowych latach rozwoju 
              przedsiębiorstwa zdobywaliśmy specjalistyczną wiedzę na temat maszyn budowlanych, aby jak najlepiej 
              odpowiedzieć na oczekiwania Klientów. Systematycznie, coraz lepiej orientując się w branży, poszerzaliśmy 
              park maszyn o kolejne rozwiązania na <strong>wynajem</strong>, obejmujące <strong>dźwigi</strong> oraz 
              inne maszyny budowlane.
            </p>
            <p className="about-text">
              Dziś od tego momentu dzieli nas wiele lat, a jednocześnie całe mnóstwo zrealizowanych usług na terenie 
              <strong> Oleśnicy</strong> i nie tylko. <strong>Wynajem dźwigów</strong>, podnośników i 
              <strong> żurawi samojezdnych</strong> realizujemy na terenie Wrocławia i województwa dolnośląskiego, 
              ale także całego kraju. Wiemy, jak istotny jest dostęp do nowoczesnych maszyn budowlanych. Nie każda 
              firma może pozwolić sobie na zakup tak wymagającego sprzętu.
            </p>
            <p className="about-text">
              Na szczęście jesteśmy my: proponujemy nie tylko możliwość wynajmu maszyn przygotowanych do pracy 
              w najbardziej wymagających warunkach, jak również <strong>usługi dźwigowe</strong>. Z naszą pomocą 
              bez problemu wyburzysz budynek na działce, przetransportujesz ciężkie materiały lub przeprowadzisz 
              remont ulicy.
            </p>
            <p className="about-text">
              <strong>Usługi dźwigowe</strong> świadczymy na terenie całego kraju, a w szczególności w województwie 
              dolnośląskim – nasze urządzenia są regularnie wynajmowane przez Klientów z Wrocławia, Legnicy, Wałbrzycha, 
              Strzelina, Strzegomia, Brzegu Dolnego, Jawora, Trzebnicy, Oławy, <strong>Oleśnicy</strong> czy Środy Śląskiej.
            </p>
            <p className="about-text">
              Zaufanie wśród firm budowlanych oraz osób prywatnych zawdzięczamy nie tylko doświadczeniu i kompetencji 
              naszych pracowników, ale także szerokiej ofercie. Proponujemy bowiem wynajem <strong>żurawi samojezdnych</strong> i innych maszyn o udźwigu do stu ton i wysięgu do stu metrów w górę.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Kontakt</h3>
              <p>📞 <a href="tel:600057140">600 057 140</a></p>
              <p>📞 <a href="tel:728600690">728 600 690</a></p>
              <p>📧 <a href="mailto:biuro@dzwigipl.pl">biuro@dzwigipl.pl</a></p>
              <p style={{marginTop: '1rem'}}>🌍 English and German Support:</p>
              <p>Kamil Biok - <a href="tel:667431984">667 431 984</a></p>
            </div>
            
            <div className="footer-section">
              <h3>Adresy</h3>
              <p><strong>Siedziba główna:</strong></p>
              <p>ul. Granitowa 7</p>
              <p>55-311 Kostomłoty</p>
              <p style={{marginTop: '1rem'}}><strong>Biuro Wrocław:</strong></p>
              <p>ul. Osiniecka 9</p>
              <p>54-530 Wrocław</p>
            </div>
            
            <div className="footer-section">
              <h3>Firma</h3>
              <p><strong>DŹWIGI PL Sp. z o.o.</strong></p>
              <p>NIP: 9131626331</p>
              <p>KRS: 0000735980</p>
              <p style={{marginTop: '1rem'}}>Biuro: <a href="tel:602439433">602 439 433</a></p>
            </div>
            
            <div className="footer-section">
              <h3>Obszar działania</h3>
              <p><strong>Województwa:</strong></p>
              <p>
                <a href="#" style={{color: '#FFC107'}}>Dolnośląskie</a> • 
                <a href="#" style={{color: '#FFC107'}}> Śląskie</a> • 
                <a href="#" style={{color: '#FFC107'}}> Opolskie</a>
              </p>
              <p style={{marginTop: '1rem'}}><strong>Główne miasta:</strong></p>
              <p>Wrocław • Legnica • Opole<br />Katowice • Gliwice • Oława<br />Oleśnica • Trzebnica</p>
              <p style={{marginTop: '0.5rem', fontSize: '0.9rem', color: '#FFC107'}}>oraz całą Polskę</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2024 DŹWIGI PL Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
