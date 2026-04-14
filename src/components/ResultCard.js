import React from 'react';
import SourceCitation from './SourceCitation';

function ResultCard(props) {
  var result = props.result;
  var equivalencies = props.equivalencies;
  var comparison = props.comparison;

  if (!result) return null;

  var maxKg = 1;
  if (comparison) {
    for (var i = 0; i < comparison.length; i++) {
      if (comparison[i].kgCO2 > maxKg) {
        maxKg = comparison[i].kgCO2;
      }
    }
  }

  return (
    <div style={{
      marginTop: 30,
      padding: 25,
      backgroundColor: '#e0f2f1',
      borderRadius: 12,
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
        <span style={{ fontSize: 42, fontWeight: 700, color: '#0d7377' }}>
          {result.tripTotalKg}
        </span>
        <span style={{ fontSize: 18, color: '#0d7377', fontWeight: 500 }}>
          kg CO2e
        </span>
      </div>
      <p style={{ fontSize: 14, color: '#5c5c5c', marginTop: 4 }}>
        {result.frequencyLabel}
      </p>

      {result.annualizedKg !== result.tripTotalKg && (
        <div style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: 'rgba(255,255,255,0.6)',
          borderRadius: 8
        }}>
          <span style={{ fontWeight: 600, color: '#0d7377' }}>
            {result.annualizedKg} kg
          </span>
          <span style={{ color: '#5c5c5c', fontSize: 14 }}>
            {' (' + result.annualizedTons + ' tons) annualized'}
          </span>
        </div>
      )}

      {equivalencies && (
        <div style={{ marginTop: 20, textAlign: 'left' }}>
          <h3 style={{ fontSize: 14, color: '#5c5c5c', fontWeight: 600, marginBottom: 10 }}>
            For context:
          </h3>
          <div style={{
            backgroundColor: '#fff',
            padding: '10px 14px',
            borderRadius: 8,
            fontSize: 14,
            color: '#5c5c5c',
            marginBottom: 8
          }}>
            {'Equivalent to charging ' + equivalencies.smartphonesCharged.toLocaleString() + ' smartphones'}
          </div>
          <div style={{
            backgroundColor: '#fff',
            padding: '10px 14px',
            borderRadius: 8,
            fontSize: 14,
            color: '#5c5c5c',
            marginBottom: 8
          }}>
            {'Would take a tree approximately ' + equivalencies.treeDaysToAbsorb + ' days to absorb'}
          </div>
          <div style={{
            backgroundColor: '#fff',
            padding: '10px 14px',
            borderRadius: 8,
            fontSize: 14,
            color: '#5c5c5c',
            marginBottom: 8
          }}>
            {'Approximately ' + equivalencies.percentOfUSAnnual + '% of the average Americans annual footprint'}
          </div>
        </div>
      )}

      {comparison && comparison.length > 0 && (
        <div style={{ marginTop: 25, textAlign: 'left' }}>
          <h3 style={{ fontSize: 14, color: '#5c5c5c', fontWeight: 600, marginBottom: 12 }}>
            Same distance, different modes:
          </h3>
          {comparison.map(function(mode) {
            var barWidth = maxKg > 0 ? (mode.kgCO2 / maxKg) * 100 : 0;
            if (mode.kgCO2 > 0 && barWidth < 2) barWidth = 2;

            return (
              <div key={mode.key} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8
              }}>
                <span style={{
                  fontSize: 11,
                  color: '#5c5c5c',
                  width: 100,
                  textAlign: 'right',
                  flexShrink: 0
                }}>
                  {mode.mode}
                </span>
                <div style={{
                  flexGrow: 1,
                  height: 14,
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: barWidth + '%',
                    backgroundColor: '#4a90d9',
                    borderRadius: 4
                  }} />
                </div>
                <span style={{
                  fontSize: 11,
                  color: '#5c5c5c',
                  width: 55,
                  flexShrink: 0
                }}>
                  {mode.kgCO2} kg
                </span>
              </div>
            );
          })}
        </div>
      )}

      <SourceCitation
        source={result.source}
        sourceUrl={result.sourceUrl}
        formula={result.formula}
        lastUpdated={result.lastUpdated}
      />
    </div>
  );
}

export default ResultCard;
