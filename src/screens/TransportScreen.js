import React, { useState } from 'react';
import { calculateTransportEmissions, getEquivalencies, compareAllModes } from '../utils/calculators';
import ResultCard from '../components/ResultCard';
import EthicalAdBanner from '../components/EthicalAdBanner';

var vehicleOptions = [
  { key: 'car_gasoline', label: 'Car (Gasoline)' },
  { key: 'car_diesel', label: 'Car (Diesel)' },
  { key: 'car_hybrid', label: 'Car (Hybrid)' },
  { key: 'car_plugin_hybrid', label: 'Plug-in Hybrid' },
  { key: 'car_electric', label: 'Car (Electric)' },
  { key: 'motorcycle', label: 'Motorcycle' },
  { key: 'bus', label: 'Bus' },
  { key: 'train', label: 'Train' },
  { key: 'ebike', label: 'E-Bike' },
  { key: 'bicycle', label: 'Bicycle' },
  { key: 'walk', label: 'Walk' }
];

var frequencyOptions = [
  { key: 'one-time', label: 'One-time' },
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' }
];

function TransportScreen(props) {
  const [vehicle, setVehicle] = useState('car_gasoline');
  const [distance, setDistance] = useState('16');
  const [frequency, setFrequency] = useState('one-time');
  const [result, setResult] = useState(null);
  const [equivalencies, setEquivalencies] = useState(null);
  const [comparison, setComparison] = useState(null);

  function handleCalculate() {
    var dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) return;

    var calcResult = calculateTransportEmissions(vehicle, dist, frequency);
    var relevantKg = frequency === 'one-time' ? calcResult.tripTotalKg : calcResult.annualizedKg;
    var equiv = getEquivalencies(relevantKg);
    var comp = compareAllModes(dist);

    setResult(calcResult);
    setEquivalencies(equiv);
    setComparison(comp);
  }

  function handleDistanceChange(e) {
    var val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setDistance(val);
    }
  }

  function chipStyle(isActive) {
    return {
      padding: '10px 16px',
      borderRadius: 20,
      border: '1px solid #0d7377',
      backgroundColor: isActive ? '#0d7377' : '#fff',
      color: isActive ? '#fff' : '#0d7377',
      cursor: 'pointer',
      fontSize: 14
    };
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, paddingBottom: 60 }}>
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

      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0d7377', marginTop: 10, marginBottom: 8 }}>
        Transportation
      </h1>
      <p style={{ fontSize: 14, color: '#5c5c5c', marginBottom: 30, lineHeight: 1.5 }}>
        Calculate the carbon footprint of a trip. Default distance is the U.S. average one-way commute (16 miles).
      </p>

      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 16, fontWeight: 500, color: '#5c5c5c', marginBottom: 10 }}>
          Vehicle / Mode
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {vehicleOptions.map(function(opt) {
            return (
              <button
                key={opt.key}
                style={chipStyle(vehicle === opt.key)}
                onClick={function() { setVehicle(opt.key); }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: 16, fontWeight: 500, color: '#5c5c5c', marginBottom: 10 }}>
          Distance (miles)
        </label>
        <input
          type="text"
          value={distance}
          onChange={handleDistanceChange}
          placeholder="Enter distance in miles"
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 8,
            border: '1px solid #ddd',
            fontSize: 16,
            color: '#333',
            backgroundColor: '#fff',
            boxSizing: 'border-box'
          }}
        />
        <span style={{ display: 'block', fontSize: 12, color: '#999', marginTop: 6 }}>
          U.S. average one-way commute: 16 miles (Census Bureau 2022)
        </span>
      </div>

      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 16, fontWeight: 500, color: '#5c5c5c', marginBottom: 10 }}>
          Frequency
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {frequencyOptions.map(function(opt) {
            return (
              <button
                key={opt.key}
                style={chipStyle(frequency === opt.key)}
                onClick={function() { setFrequency(opt.key); }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleCalculate}
        style={{
          width: '100%',
          padding: 16,
          borderRadius: 8,
          border: 'none',
          backgroundColor: '#0d7377',
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Calculate
      </button>

      <ResultCard
        result={result}
        equivalencies={equivalencies}
        comparison={comparison}
      />

      {result && <EthicalAdBanner />}
    </div>
  );
}

export default TransportScreen;
