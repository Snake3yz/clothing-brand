import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Layers, ShieldCheck, HeartHandshake, Scissors, ArrowRight, Flame } from 'lucide-react';
import { getAssetUrl } from '@/utils/assetUrl';

export default function About() {
  return (
    <div>
      {/* Editorial Hero */}
      <div
        style={{
          position: 'relative',
          height: '480px',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '60px',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <img
          src={getAssetUrl('/products/kayoo-brand-banner.jpeg')}
          alt="KAYOO Streetwear Archive Heritage"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(12, 12, 14, 0.92) 0%, rgba(12, 12, 14, 0.45) 60%, rgba(12, 12, 14, 0.75) 100%)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge badge-gold" style={{ marginBottom: 12, backgroundColor: 'rgba(168, 85, 247, 0.2)', borderColor: '#A855F7', color: '#D8B4FE' }}>
            KAMPUCHEA ASPIRE YOUTH ORIGINAL OUTFIT
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', marginBottom: 12 }}>
            The Architecture of Khmer Street Culture
          </h1>
          <p style={{ color: '#DFDDD9', fontSize: '1.05rem', maxWidth: '680px', lineHeight: 1.6 }}>
            KAYOO is an independent Cambodian streetwear archive engineered between the ancient stone heritage of Angkor and the raw underground energy of Phnom Penh youth.
          </p>
        </div>
      </div>

      {/* Origin Narrative */}
      <div className="section">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
              The KAYOO Manifesto
            </span>
            <h2 style={{ marginTop: 8, marginBottom: 16 }}>Born in Phnom Penh, Built for the Streets</h2>
            <div style={{ width: 48, height: 2, backgroundColor: '#A855F7', margin: '0 auto 24px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              KAYOO stands for <strong>Kampuchea Aspire Youth Original Outfit</strong>. Founded in Phnom Penh as a direct rebellion against disposable fast-fashion and counterfeit logos, KAYOO represents the unapologetic ambition of Cambodia's next generation. We engineer heavyweight streetwear garments featuring custom 320GSM to 500GSM combed cotton, architectural oversized cuts, and silkscreen hand-prints that command respect in every city.
            </p>
          </div>

          {/* Dual Imagery Showcase */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 64 }} className="about-photos-grid">
            <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '420px', backgroundColor: '#000' }}>
              <img
                src={getAssetUrl('/products/kayoo-tee-duo.jpeg')}
                alt="KAYOO Starburst Heavyweight Tee Campaign"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '420px', backgroundColor: '#000' }}>
              <img
                src={getAssetUrl('/products/kayoo-jersey-hanuman.jpeg')}
                alt="KAYOO Athletic Jersey King of Hanuman"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars of Craft */}
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
              Our Pillars
            </span>
            <h2 style={{ marginTop: 6 }}>The KAYOO Design Code</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <Layers size={28} color="#A855F7" style={{ marginBottom: 16 }} />
              <h4 style={{ marginBottom: 10 }}>320GSM Custom Combed Cotton</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                We refuse paper-thin blanks. Every KAYOO tee is cut from high-density, 320GSM 100% combed cotton jersey that maintains structural shape, crisp shoulders, and zero bacon-neck wash after wash.
              </p>
            </div>

            <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <Scissors size={28} color="#A855F7" style={{ marginBottom: 16 }} />
              <h4 style={{ marginBottom: 10 }}>Architectural Boxy Cut</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Engineered with dropped shoulder seams, widened chest proportions, reinforced high-collar ribbing, and relaxed sleeve openings for the definitive modern streetwear silhouette.
              </p>
            </div>

            <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <Flame size={28} color="#A855F7" style={{ marginBottom: 16 }} />
              <h4 style={{ marginBottom: 10 }}>Silkscreen Hand-Print Artistry</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Hand-pulled plastisol and puff-ink applications. From our signature starburst graphic to our Hanuman athletic mythology, every print is heat-cured to outlast hundreds of wears without cracking.
              </p>
            </div>

            <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <ShieldCheck size={28} color="#A855F7" style={{ marginBottom: 16 }} />
              <h4 style={{ marginBottom: 10 }}>Authentic Studio Guarantee</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Every genuine KAYOO garment ships with our holographic woven syndicate label and archival certificate. We back our construction with our lifetime seam guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Material Provenance Table */}
      <section id="sustainability" style={{ backgroundColor: 'var(--bg-secondary)', padding: '80px 0' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
              Textile Transparency
            </span>
            <h2 style={{ marginTop: 6, marginBottom: 12 }}>Material Specifications & Knitting</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              We develop custom-milled knits tailored for tropical durability and international streetwear longevity.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', overflowX: 'auto', WebkitOverflowScrolling: 'touch', border: '1px solid var(--border-medium)' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-medium)' }}>
                  <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: 700 }}>Material</th>
                  <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: 700 }}>Weight / Origin</th>
                  <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: 700 }}>Finish & Print</th>
                  <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: 700 }}>KAYOO Garment</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700 }}>Custom Combed Cotton</td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>320 GSM • Cambodia Milled</td>
                  <td style={{ padding: '14px 18px' }}><span className="badge badge-gold" style={{ borderColor: '#A855F7', color: '#9333EA' }}>Pre-Shrunk Bio-Wash</span></td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>KAYOO Starburst "Rock-On" Graphic Tee</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700 }}>Performance Hydro-Mesh</td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>220 GSM • Moisture-Wicking</td>
                  <td style={{ padding: '14px 18px' }}><span className="badge badge-gold" style={{ borderColor: '#A855F7', color: '#9333EA' }}>Sublimated Silk Inks</span></td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>KAYOO Official Athletic Jersey ("Hanuman")</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700 }}>Dense Brushed French Terry</td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>380 GSM • Heavyweight Knit</td>
                  <td style={{ padding: '14px 18px' }}><span className="badge badge-gold" style={{ borderColor: '#A855F7', color: '#9333EA' }}>Chalk Reactive Dye</span></td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>KAYOO Pure-Chalk Street Joggers</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 18px', fontWeight: 700 }}>Diagonal Loopback Cotton</td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>480 GSM • Double-Fleece</td>
                  <td style={{ padding: '14px 18px' }}><span className="badge badge-gold" style={{ borderColor: '#A855F7', color: '#9333EA' }}>Acid-Wash Mineral Dip</span></td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>KAYOO Monolith Boxy Zip Hoodie</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/shop" className="btn btn-primary">
              Discover All KAYOO Pieces <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-photos-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
