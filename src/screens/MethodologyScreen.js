import React from 'react';
import emissionData from '../data/emissionFactors.json';

function MethodologyScreen(props) {
  var transportModes = Object.entries(emissionData.transportation);

  var h2Style = {
    fontSize: 18,
    fontWeight: 600,
    color: '#0d7377',
    marginBottom: 12,
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: 8
  };

  var pStyle = {
    fontSize: 15,
    color: '#5c5c5c',
    lineHeight: 1.7,
    marginBottom: 10
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20, paddingBottom: 60 }}>
      <button
        onClick={props.onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#0d7377',
          fontSize: 16,
          cursor: 'pointer',
          padding: '12px 0'
        }}
      >
        Back
      </button>

      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0d7377', marginTop: 10, marginBottom: 30 }}>
        Methodology and Data Sources
      </h1>

      <div style={{ marginBottom: 30 }}>
        <h2 style={h2Style}>How This App Works</h2>
        <p style={pStyle}>
          All calculations are performed locally on your device.
          No personal data is collected, stored on servers, or shared with third parties.
          We use peer-reviewed, publicly available emission factors from government agencies
          and academic research.
        </p>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2 style={h2Style}>What is CO2e?</h2>
        <p style={pStyle}>
          CO2e (carbon dioxide equivalent) is a standard unit that expresses the impact
          of different greenhouse gases in terms of the amount of CO2 that would create
          the same warming effect. This allows us to compare different emission sources
          on a single scale.
        </p>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2 style={h2Style}>Transportation Emission Factors</h2>
        <p style={pStyle}>
          Formula: Distance (miles) x Emission Factor (kg CO2e/mile) = Total Emissions
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10, fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #e0e0e0', padding: '8px 10px', textAlign: 'left', backgroundColor: '#f5f5f5', fontWeight: 600, color: '#5c5c5c' }}>Mode</th>
                <th style={{ border: '1px solid #e0e0e0', padding: '8px 10px', textAlign: 'left', backgroundColor: '#f5f5f5', fontWeight: 600, color: '#5c5c5c' }}>Factor</th>
                <th style={{ border: '1px solid #e0e0e0', padding: '8px 10px', textAlign: 'left', backgroundColor: '#f5f5f5', fontWeight: 600, color: '#5c5c5c' }}>Unit</th>
                <th style={{ border: '1px solid #e0e0e0', padding: '8px 10px', textAlign: 'left', backgroundColor: '#f5f5f5', fontWeight: 600, color: '#5c5c5c' }}>Source</th>
              </tr>
            </thead>
            <tbody>
              {transportModes.map(function(entry) {
                var key = entry[0];
                var data = entry[1];
                return (
                  <tr key={key}>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px 10px', color: '#5c5c5c' }}>{key.replace(/_/g, ' ')}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px 10px', color: '#5c5c5c' }}>{data.factor}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px 10px', color: '#5c5c5c' }}>{data.unit}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px 10px', color: '#5c5c5c' }}>
                      {data.source_url ? (
                        <a href={data.source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#0d7377', fontSize: 12 }}>
                          {data.source}
                        </a>
                      ) : data.source}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2 style={h2Style}>Known Limitations</h2>
        <ul style={{ paddingLeft: 20, color: '#5c5c5c', fontSize: 15, lineHeight: 1.7 }}>
          <li style={{ marginBottom: 8 }}>Vehicle emission factors represent national averages.</li>
          <li style={{ marginBottom: 8 }}>Electric vehicle emissions depend on your local electricity grid.</li>
          <li style={{ marginBottom: 8 }}>Public transit factors assume typical ridership levels.</li>
          <li style={{ marginBottom: 8 }}>These calculations cover direct emissions only.</li>
          <li style={{ marginBottom: 8 }}>All estimates have an uncertainty of approximately 10-20%.</li>
        </ul>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2 style={h2Style}>About Ethical Design</h2>
        <p style={pStyle}>
          This app follows ethical design principles inspired by the{' '}
          <a href="https://www.humanetech.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0d7377' }}>
            Center for Humane Technology
          </a>.
        </p>
        <ul style={{ paddingLeft: 20, color: '#5c5c5c', fontSize: 15, lineHeight: 1.7 }}>
          <li style={{ marginBottom: 8 }}>No guilt-tripping or fear-based language</li>
          <li style={{ marginBottom: 8 }}>All data sources cited and verifiable</li>
          <li style={{ marginBottom: 8 }}>No personal data collected or transmitted</li>
          <li style={{ marginBottom: 8 }}>Ads clearly labeled and dismissible</li>
        </ul>
      </div>
    </div>
  );
}

export default MethodologyScreen;
