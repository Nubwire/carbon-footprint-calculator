import React, { useState } from 'react';

function SourceCitation(props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ margin: '15px 0', width: '100%' }}>
      <button
        onClick={function() { setShowDetails(!showDetails); }}
        style={{
          background: 'none',
          border: 'none',
          color: '#5c5c5c',
          fontSize: 12,
          cursor: 'pointer',
          textDecoration: 'underline',
          padding: 8
        }}
      >
        {'Source: ' + props.source + ' - ' + (showDetails ? 'Hide details' : 'How was this calculated?')}
      </button>

      {showDetails && (
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 15,
          marginTop: 8,
          fontSize: 13,
          color: '#5c5c5c',
          lineHeight: 1.6
        }}>
          <p><strong>Formula:</strong> {props.formula}</p>
          <p><strong>Data source:</strong> {props.source}</p>
          <p><strong>Last updated:</strong> {props.lastUpdated}</p>
          {props.sourceUrl && (
            <p>
              <a
                href={props.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0d7377' }}
              >
                View original source
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SourceCitation;
