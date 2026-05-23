import React, { useState } from 'react';
import { LayoutDashboard, Anchor, FileText, Mail, Settings, LogOut, Menu, X, ShoppingCart } from 'lucide-react';
import '../styles/Panel.css';

function Panel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cranes, setCranes] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const [editingCrane, setEditingCrane] = useState(null);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', capacity: '', reach: '', featured: false, pdf: '', image: 'images/ltm-placeholder.jpg' });
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    fetch('http://localhost:8000/api/cranes')
      .then(res => res.json())
      .then(data => setCranes(data))
      .catch(err => console.error("Błąd pobierania dźwigów:", err));

    fetch('http://localhost:8000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Błąd pobierania zamówień:", err));
  }, []);

  const handleEditClick = (crane) => {
    setIsAddingMode(false);
    setEditingCrane(crane);
    setEditForm({
      name: crane.name,
      capacity: crane.capacity,
      reach: crane.reach,
      featured: crane.featured,
      pdf: crane.pdf || '',
      image: crane.image || 'images/ltm-placeholder.jpg'
    });
  };

  const handleAddClick = () => {
    setIsAddingMode(true);
    setEditingCrane({});
    setEditForm({ name: '', capacity: '', reach: '', featured: false, pdf: '', image: 'images/ltm-placeholder.jpg' });
  };

  const handleDeleteClick = async (craneId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę maszynę?")) return;
    try {
      const response = await fetch(`http://localhost:8000/api/cranes/${craneId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCranes(cranes.filter(c => c.id !== craneId));
      }
    } catch (error) {
      console.error("Błąd podczas usuwania:", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await fetch('http://localhost:8000/api/upload/pdf', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setEditForm({ ...editForm, pdf: data.filename });
      } else {
        console.error("Błąd przesyłania", response.statusText);
      }
    } catch (err) {
      console.error("Błąd przesyłania:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const url = isAddingMode 
        ? 'http://localhost:8000/api/cranes' 
        : `http://localhost:8000/api/cranes/${editingCrane.id}`;
      const method = isAddingMode ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (response.ok) {
        const data = await response.json();
        if (isAddingMode) {
          setCranes([...cranes, data.crane]);
        } else {
          setCranes(cranes.map(c => c.id === editingCrane.id ? { ...c, ...editForm } : c));
        }
        setEditingCrane(null);
        setIsAddingMode(false);
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania:", error);
    }
  };

  return (
    <div className="panel-layout">
      {/* Sidebar */}
      <aside className={`panel-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            DŹWIGI<span className="logo-accent">PL</span>
          </div>
          <button className="mobile-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} />
            <span>Pulpit</span>
          </button>
          <button className={`nav-item ${activeTab === 'cranes' ? 'active' : ''}`} onClick={() => setActiveTab('cranes')}>
            <Anchor size={20} />
            <span>Flota Maszyn</span>
          </button>
          <button className={`nav-item ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
            <FileText size={20} />
            <span>Treści Strony</span>
          </button>
          <button className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={20} />
            <span>Zamówienia</span>
          </button>
          <button className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            <Mail size={20} />
            <span>Wiadomości</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={20} />
            <span>Ustawienia SEO</span>
          </button>
          <button className="nav-item text-danger">
            <LogOut size={20} />
            <span>Wyloguj</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="panel-main">
        <header className="panel-header">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
          <div className="user-profile">
            <div className="avatar">P</div>
            <span>Administrator</span>
          </div>
        </header>

        <div className="panel-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-view animate-fade-in">
              <h2 className="view-title">Podsumowanie strony</h2>
              
              <div className="stats-cards">
                <div className="stat-card">
                  <div className="stat-icon"><Anchor size={24} /></div>
                  <div className="stat-info">
                    <h3>Maszyny w ofercie</h3>
                    <p className="stat-value">{cranes.length}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon"><Mail size={24} /></div>
                  <div className="stat-info">
                    <h3>Nowe Wiadomości</h3>
                    <p className="stat-value">3</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity-section">
                <h3>Ostatnie zapytania ze strony</h3>
                <div className="activity-list glass-panel">
                  <div className="activity-item">
                    <span className="activity-time">Dzisiaj</span>
                    <span className="activity-desc">Zapytanie o wynajem LTM 1200 - Jan Kowalski</span>
                    <span className="badge badge-warning">Nowe</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-time">Wczoraj</span>
                    <span className="activity-desc">Kontakt w sprawie współpracy - Budimex</span>
                    <span className="badge badge-info">Przeczytane</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cranes' && (
            <div className="cranes-view animate-fade-in">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
                <h2 className="view-title" style={{marginBottom: 0}}>Flota Maszyn</h2>
                <button onClick={handleAddClick} className="btn btn-primary" style={{padding: '0.5rem 1.5rem', fontSize: '1rem'}}>+ Dodaj maszynę</button>
              </div>
              
              <div className="glass-panel" style={{padding: 0, overflow: 'hidden'}}>
                <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                  <thead>
                    <tr style={{borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)'}}>
                      <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500}}>Model</th>
                      <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500}}>Udźwig</th>
                      <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500}}>Wysięg</th>
                      <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500}}>Wyróżniony</th>
                      <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500, textAlign: 'right'}}>Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cranes.map((crane) => (
                      <tr key={crane.id} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                        <td style={{padding: '16px', fontWeight: 500}}>{crane.name}</td>
                        <td style={{padding: '16px', color: '#FFC107'}}>{crane.capacity}</td>
                        <td style={{padding: '16px'}}>{crane.reach}</td>
                        <td style={{padding: '16px'}}>
                          {crane.featured ? <span className="badge badge-success">Tak</span> : <span className="badge badge-info" style={{opacity: 0.5}}>Nie</span>}
                        </td>
                        <td style={{padding: '16px', textAlign: 'right'}}>
                          <button onClick={() => handleEditClick(crane)} style={{background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer', marginRight: '16px'}}>Edytuj</button>
                          <button onClick={() => handleDeleteClick(crane.id)} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer'}}>Usuń</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="orders-view animate-fade-in">
              <h2 className="view-title">Zamówienia / Zapytania o wynajem</h2>
              <div className="glass-panel" style={{padding: 0, overflow: 'hidden'}}>
                {orders.length === 0 ? (
                  <p style={{padding: '32px', textAlign: 'center', color: '#a0a0a0'}}>Brak nowych zamówień.</p>
                ) : (
                  <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                    <thead>
                      <tr style={{borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)'}}>
                        <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500}}>ID / Data</th>
                        <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500}}>Klient</th>
                        <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500}}>Maszyna</th>
                        <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500}}>Termin</th>
                        <th style={{padding: '16px', color: '#a0a0a0', fontWeight: 500}}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                          <td style={{padding: '16px'}}>
                            <div style={{fontWeight: 500}}>{order.id}</div>
                            <div style={{fontSize: '0.8rem', color: '#a0a0a0'}}>{new Date(order.created_at).toLocaleDateString('pl-PL')}</div>
                          </td>
                          <td style={{padding: '16px'}}>
                            <div style={{fontWeight: 500}}>{order.customer_name}</div>
                            <div style={{fontSize: '0.8rem', color: '#a0a0a0'}}>{order.phone}</div>
                          </td>
                          <td style={{padding: '16px', color: '#FFC107'}}>{order.crane_name}</td>
                          <td style={{padding: '16px'}}>{new Date(order.rental_date).toLocaleDateString('pl-PL')}</td>
                          <td style={{padding: '16px'}}>
                            <span className="badge badge-warning">{order.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'cranes' && activeTab !== 'orders' && (
            <div className="placeholder-view animate-fade-in">
              <h2 className="view-title">Moduł {activeTab === 'content' ? 'Edycji Treści' : 'Wiadomości'}</h2>
              <p>Wkrótce tutaj pojawi się możliwość edycji danych.</p>
            </div>
          )}

          {/* Modal Edycji */}
          {editingCrane && (
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
              backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
            }}>
              <div style={{
                background: '#151515', border: '1px solid #333', borderRadius: '12px',
                padding: '32px', width: '100%', maxWidth: '500px'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
                  <h3 style={{fontSize: '1.5rem', margin: 0}}>{isAddingMode ? 'Dodaj nową maszynę' : `Edytuj: ${editingCrane.name}`}</h3>
                  <button onClick={() => { setEditingCrane(null); setIsAddingMode(false); }} style={{background: 'none', border: 'none', color: '#fff', cursor: 'pointer'}}>
                    <X size={24} />
                  </button>
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#a0a0a0'}}>Nazwa (Model)</label>
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      style={{width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '6px'}}
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#a0a0a0'}}>Udźwig</label>
                    <input 
                      type="text" 
                      value={editForm.capacity} 
                      onChange={(e) => setEditForm({...editForm, capacity: e.target.value})}
                      style={{width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '6px'}}
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#a0a0a0'}}>Wysięg</label>
                    <input 
                      type="text" 
                      value={editForm.reach} 
                      onChange={(e) => setEditForm({...editForm, reach: e.target.value})}
                      style={{width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '6px'}}
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#a0a0a0'}}>Broszura (PDF)</label>
                    <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        style={{display: 'none'}}
                        id="pdf-upload"
                      />
                      <label 
                        htmlFor="pdf-upload" 
                        className="btn btn-secondary" 
                        style={{padding: '8px 16px', fontSize: '0.9rem', cursor: 'pointer', opacity: uploading ? 0.5 : 1}}
                      >
                        {uploading ? 'Wgrywanie...' : 'Wybierz nowy plik PDF'}
                      </label>
                      <span style={{color: '#fff', fontSize: '0.9rem'}}>{editForm.pdf}</span>
                    </div>
                  </div>
                  
                  <label style={{display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginTop: '8px'}}>
                    <input 
                      type="checkbox" 
                      checked={editForm.featured}
                      onChange={(e) => setEditForm({...editForm, featured: e.target.checked})}
                      style={{width: '18px', height: '18px', accentColor: '#FFC107'}}
                    />
                    Wyróżnij maszynę na głównej
                  </label>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px'}}>
                  <button onClick={() => { setEditingCrane(null); setIsAddingMode(false); }} style={{padding: '10px 20px', background: 'transparent', border: '1px solid #555', color: '#fff', borderRadius: '6px', cursor: 'pointer'}}>Anuluj</button>
                  <button onClick={handleSaveEdit} className="btn btn-primary" style={{padding: '10px 20px', fontSize: '1rem', borderRadius: '6px'}}>{isAddingMode ? 'Dodaj' : 'Zapisz zmiany'}</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default Panel;
