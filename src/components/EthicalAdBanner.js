import React, { useState } from 'react';

function EthicalAdBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div style={{
      marginTop: 30,
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 10px',
        backgroundColor: '#f0f0f0'
      }}>
        <span style={{ fontSize: 10, color: '#999', letterSpacing: 1, fontWeight: 600 }}>
          ADVERTISEMENT
        </span>
        <button
          onClick={function() { setDismissed(true); }}
          style={{
            background: 'none',
            border: 'none',
            color: '#999',
            cursor: 'pointer',
            fontSize: 14,
            padding: '4px 8px'
          }}
        >
          Close
        </button>
      </div>
      <div style={{ padding: 15 }}>
        <p style={{ color: '#888', fontSize: 13, textAlign: 'center', margin: 0, fontStyle: 'italic' }}>
          Ad space - In production, this displays a non-intrusive banner
          from ethical advertisers (renewable energy, sustainable products).
        </p>
      </div>
    </div>
  );
}

export default EthicalAdBanner;
