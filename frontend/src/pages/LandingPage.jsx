import React, { useState, useEffect } from 'react';
import '../styles/App.css';

// Dane dźwigów będą pobierane z API

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [cranes, setCranes] = useState([]);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedCrane, setSelectedCrane] = useState(null);
  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    phone: '',
    email: '',
    rental_date: '',
    details: ''
  });
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Pobieranie danych dźwigów z backendu
    fetch('http://localhost:8000/api/cranes')
      .then(res => res.json())
      .then(data => setCranes(data))
      .catch(err => console.error("Błąd pobierania dźwigów:", err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openOrderModal = (crane) => {
    setSelectedCrane(crane);
    setOrderModalOpen(true);
    setOrderStatus(null);
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
    setSelectedCrane(null);
    setOrderForm({ customer_name: '', phone: '', email: '', rental_date: '', details: '' });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderStatus('submitting');
    
    try {
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crane_id: selectedCrane.id,
          crane_name: selectedCrane.name,
          ...orderForm
        })
      });
      
      if (response.ok) {
        setOrderStatus('success');
        setTimeout(() => closeOrderModal(), 3000);
      } else {
        setOrderStatus('error');
      }
    } catch (err) {
      console.error(err);
      setOrderStatus('error');
    }
  };

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
                  src={import.meta.env.BASE_URL + crane.image} 
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
                  <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                    <a href={`${import.meta.env.BASE_URL}pdfs/${crane.pdf}`} target="_blank" rel="noopener noreferrer" className="crane-card-link" style={{flex: 1, textAlign: 'center'}}>
                      Więcej informacji
                    </a>
                    <button onClick={() => openOrderModal(crane)} className="btn btn-primary" style={{padding: '8px 16px', fontSize: '0.9rem', borderRadius: '4px', border: 'none', cursor: 'pointer', flex: 1}}>
                      Wynajmij
                    </button>
                  </div>
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

      {/* Modal Zamówienia */}
      {orderModalOpen && selectedCrane && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px'
        }}>
          <div style={{
            background: '#151515', border: '1px solid #333', borderRadius: '12px',
            padding: '32px', width: '100%', maxWidth: '500px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h3 style={{fontSize: '1.5rem', margin: 0, color: '#fff'}}>Zapytanie o wynajem</h3>
              <button onClick={closeOrderModal} style={{background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer', fontSize: '1.5rem'}}>&times;</button>
            </div>
            
            <div style={{marginBottom: '20px', padding: '12px', background: 'rgba(255, 193, 7, 0.1)', borderLeft: '4px solid #FFC107', borderRadius: '0 4px 4px 0'}}>
              <strong style={{color: '#fff'}}>Wybrana maszyna:</strong> <span style={{color: '#FFC107'}}>{selectedCrane.name} ({selectedCrane.capacity})</span>
            </div>

            {orderStatus === 'success' ? (
              <div style={{textAlign: 'center', padding: '40px 0'}}>
                <div style={{color: '#4ade80', fontSize: '48px', marginBottom: '16px'}}>✓</div>
                <h4 style={{color: '#fff', fontSize: '1.2rem', marginBottom: '8px'}}>Zapytanie wysłane!</h4>
                <p style={{color: '#a0a0a0'}}>Skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: '#a0a0a0', fontSize: '0.9rem'}}>Imię i nazwisko / Firma *</label>
                  <input required type="text" value={orderForm.customer_name} onChange={e => setOrderForm({...orderForm, customer_name: e.target.value})} style={{width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '6px'}} />
                </div>
                
                <div style={{display: 'flex', gap: '16px'}}>
                  <div style={{flex: 1}}>
                    <label style={{display: 'block', marginBottom: '6px', color: '#a0a0a0', fontSize: '0.9rem'}}>Telefon *</label>
                    <input required type="tel" value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})} style={{width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '6px'}} />
                  </div>
                  <div style={{flex: 1}}>
                    <label style={{display: 'block', marginBottom: '6px', color: '#a0a0a0', fontSize: '0.9rem'}}>Email</label>
                    <input type="email" value={orderForm.email} onChange={e => setOrderForm({...orderForm, email: e.target.value})} style={{width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '6px'}} />
                  </div>
                </div>

                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: '#a0a0a0', fontSize: '0.9rem'}}>Proponowany termin wynajmu *</label>
                  <input required type="date" value={orderForm.rental_date} onChange={e => setOrderForm({...orderForm, rental_date: e.target.value})} style={{width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '6px', colorScheme: 'dark'}} />
                </div>

                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: '#a0a0a0', fontSize: '0.9rem'}}>Dodatkowe informacje (np. miejsce pracy, rodzaj ładunku)</label>
                  <textarea rows="3" value={orderForm.details} onChange={e => setOrderForm({...orderForm, details: e.target.value})} style={{width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '6px', resize: 'vertical'}}></textarea>
                </div>

                {orderStatus === 'error' && (
                  <div style={{color: '#ef4444', fontSize: '0.9rem', textAlign: 'center'}}>
                    Wystąpił błąd podczas wysyłania zapytania. Spróbuj ponownie.
                  </div>
                )}

                <div style={{marginTop: '16px'}}>
                  <button type="submit" className="btn btn-primary" disabled={orderStatus === 'submitting'} style={{width: '100%', padding: '14px', fontSize: '1rem', border: 'none', borderRadius: '6px', cursor: orderStatus === 'submitting' ? 'not-allowed' : 'pointer', opacity: orderStatus === 'submitting' ? 0.7 : 1}}>
                    {orderStatus === 'submitting' ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
