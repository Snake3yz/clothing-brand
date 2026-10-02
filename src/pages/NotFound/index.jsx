import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section text-center" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
      <div className="container-narrow">
        <Compass size={48} color="var(--accent-gold)" style={{ margin: '0 auto 20px' }} />
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginBottom: 12 }}>404 — Page In Exile</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 32px' }}>
          The requested coordinate does not exist within the current KAYOO archive or seasonal drop.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
          <Link to="/" className="btn btn-primary">
            Return to KAYOO Home
          </Link>
          <Link to="/shop" className="btn btn-secondary">
            Discover Creations <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
