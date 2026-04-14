import React from 'react';

function HomeScreen(props) {
  var categories = [
    { name: 'Transportation', icon: '🚗', key: 'transport', available: true },
    { name: 'Food & Diet', icon: '🍽️', key: 'food', available: true },
    { name: 'Home Energy', icon: '🏠', key: 'energy', available: false },
    { name: 'Purchases', icon: '🛍️', key: 'purchases', available: false },
    { name: 'Travel', icon: '✈️', key: 'travel', available: false }
  ];

  return (
    <div style={{
      maxWidth: 600,
      margin: '0 auto',
      padding: 20,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ textAlign: 'center', marginTop: 40, marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0d7377', margin: 0 }}>
          Carbon Footprint Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#5c5c5c', marginTop: 8 }}>
          Transparent data. No guilt. No tracking.
        </p>
        <p style={{ fontSize: 13, color: '#999', marginTop: 4 }}>
          All calculations happen locally on your device.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginBottom: 30
      }}>
        {categories.map(function(cat) {
          return (
            <button
              key={cat.key}
              onClick={function() { if (cat.available) props.onNavigate(cat.key); }}
              disabled={!cat.available}
              style={{
                background: '#fff',
                border: '1px solid #e8e8e8',
                borderRadius: 12,
                padding: '24px 16px',
                textAlign: 'center',
                cursor: cat.available ? 'pointer' : 'not-allowed',
                opacity: cat.available ? 1 : 0.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span style={{ fontSize: 32 }}>{cat.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 500, color: '#5c5c5c' }}>
                {cat.name}
              </span>
              {!cat.available && (
                <span style={{ fontSize: 11, color: '#999', fontStyle: 'italic' }}>
                  Coming soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <button
          onClick={function() { props.onNavigate('methodology'); }}
          style={{
            background: 'none',
            border: 'none',
            color: '#0d7377',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: 14,
            padding: 12
          }}
        >
          View Methodology and Data Sources
        </button>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 'auto',
        padding: '20px 0',
        fontSize: 13,
        color: '#999'
      }}>
        <p>
          Built with{' '}
          <a
            href="https://www.humanetech.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0d7377' }}
          >
            ethical design principles
          </a>
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;
