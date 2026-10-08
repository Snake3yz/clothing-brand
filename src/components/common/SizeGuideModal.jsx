import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'
  const [genderTab, setGenderTab] = useState('men');

  if (!isOpen) return null;

  const dataInches = {
    men: [
      { size: 'XS', chest: '34 - 36', waist: '28 - 29', hips: '34 - 35', sleeve: '32.5' },
      { size: 'S', chest: '36 - 38', waist: '30 - 31', hips: '36 - 37', sleeve: '33.5' },
      { size: 'M', chest: '39 - 41', waist: '32 - 33', hips: '38 - 40', sleeve: '34.5' },
      { size: 'L', chest: '42 - 44', waist: '34 - 36', hips: '41 - 43', sleeve: '35.5' },
      { size: 'XL', chest: '45 - 47', waist: '37 - 39', hips: '44 - 46', sleeve: '36.5' }
    ],
    women: [
      { size: 'XS', bust: '31 - 32', waist: '24 - 25', hips: '34 - 35', length: '46' },
      { size: 'S', bust: '33 - 34', waist: '26 - 27', hips: '36 - 37', length: '47' },
      { size: 'M', bust: '35 - 37', waist: '28 - 29', hips: '38 - 40', length: '48' },
      { size: 'L', bust: '38 - 40', waist: '30 - 32', hips: '41 - 43', length: '49' }
    ]
  };

  const dataCm = {
    men: [
      { size: 'XS', chest: '86 - 91', waist: '71 - 74', hips: '86 - 89', sleeve: '82.5' },
      { size: 'S', chest: '91 - 96', waist: '76 - 79', hips: '91 - 94', sleeve: '85.0' },
      { size: 'M', chest: '99 - 104', waist: '81 - 84', hips: '96 - 101', sleeve: '87.5' },
      { size: 'L', chest: '106 - 112', waist: '86 - 91', hips: '104 - 109', sleeve: '90.0' },
      { size: 'XL', chest: '114 - 119', waist: '94 - 99', hips: '112 - 117', sleeve: '92.5' }
    ],
    women: [
      { size: 'XS', bust: '79 - 82', waist: '61 - 64', hips: '86 - 89', length: '117' },
      { size: 'S', bust: '84 - 87', waist: '66 - 69', hips: '91 - 94', length: '119' },
      { size: 'M', bust: '89 - 94', waist: '71 - 74', hips: '96 - 101', length: '122' },
      { size: 'L', bust: '96 - 102', waist: '76 - 81', hips: '104 - 109', length: '124' }
    ]
  };

  const currentTable = unit === 'in' ? dataInches[genderTab] : dataCm[genderTab];

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92%',
          maxWidth: '680px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-modal)',
          zIndex: 1300,
          padding: 'clamp(18px, 4vw, 32px)',
          maxHeight: 'min(90vh, 90dvh)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          animation: 'fadeIn 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Ruler size={22} color="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>KAYOO Sizing Guide</h3>
          </div>
          <button onClick={onClose} className="nav-icon-btn" aria-label="Close size guide">
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
          Our silhouettes feature contemporary architectural cuts with subtle relaxed ease. If you prefer a tailored slim silhouette, we recommend sizing down one increment.
        </p>

        {/* Tab & Unit Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setGenderTab('men')}
              className={`btn btn-sm ${genderTab === 'men' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Men / Unisex
            </button>
            <button
              onClick={() => setGenderTab('women')}
              className={`btn btn-sm ${genderTab === 'women' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Women
            </button>
          </div>

          <div style={{ display: 'flex', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
            <button
              onClick={() => setUnit('in')}
              style={{
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                backgroundColor: unit === 'in' ? 'var(--bg-dark)' : '#FFF',
                color: unit === 'in' ? '#FFF' : 'var(--text-secondary)'
              }}
            >
              INCHES
            </button>
            <button
              onClick={() => setUnit('cm')}
              style={{
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                backgroundColor: unit === 'cm' ? 'var(--bg-dark)' : '#FFF',
                color: unit === 'cm' ? '#FFF' : 'var(--text-secondary)'
              }}
            >
              CM
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 24 }}>
          <table style={{ width: '100%', minWidth: '460px', borderCollapse: 'collapse', fontSize: '0.86rem', whiteSpace: 'nowrap' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-medium)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Size</th>
                {genderTab === 'men' ? (
                  <>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Chest ({unit})</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Waist ({unit})</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Hips ({unit})</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Sleeve ({unit})</th>
                  </>
                ) : (
                  <>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Bust ({unit})</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Waist ({unit})</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Hips ({unit})</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Length ({unit})</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentTable.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>{row.size}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{row.chest || row.bust}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{row.waist}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{row.hips}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{row.sleeve || row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Guide Notes */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>How to Measure:</div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 16, listStyle: 'disc' }}>
            <li><strong>Chest/Bust:</strong> Measure around the fullest part of your chest, keeping tape level under arms.</li>
            <li><strong>Waist:</strong> Measure around your natural waistline, keeping tape comfortably loose.</li>
            <li><strong>Hips:</strong> Stand with feet together and measure around the fullest point of hips.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
