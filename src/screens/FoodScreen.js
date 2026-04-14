import React, { useState } from 'react';
import emissionData from '../data/emissionFactors.json';
import { getEquivalencies } from '../utils/calculators';
import ResultCard from '../components/ResultCard';
import EthicalAdBanner from '../components/EthicalAdBanner';

var foodItems = [
  { key: 'beef', label: 'Beef' },
  { key: 'lamb', label: 'Lamb' },
  { key: 'pork', label: 'Pork' },
  { key: 'poultry', label: 'Poultry' },
  { key: 'fish_farmed', label: 'Fish (Farmed)' },
  { key: 'fish_wild', label: 'Fish (Wild)' },
  { key: 'cheese', label: 'Cheese' },
  { key: 'milk', label: 'Milk' },
  { key: 'eggs', label: 'Eggs' },
  { key: 'rice', label: 'Rice' },
  { key: 'wheat_bread', label: 'Bread' },
  { key: 'pasta', label: 'Pasta' },
  { key: 'tofu', label: 'Tofu' },
  { key: 'beans_lentils', label: 'Beans & Lentils' },
  { key: 'nuts', label: 'Nuts' },
  { key: 'vegetables', label: 'Vegetables' },
  { key: 'fruits', label: 'Fruits' },
  { key: 'potatoes', label: 'Potatoes' }
];

var portionOptions = [
  { key: 'small', label: 'Small (100g)' },
  { key: 'medium', label: 'Medium (200g)' },
  { key: 'large', label: 'Large (350g)' }
];

var dietOptions = [
  { key: 'omnivore', label: 'Omnivore' },
  { key: 'pescatarian', label: 'Pescatarian' },
  { key: 'vegetarian', label: 'Vegetarian' },
  { key: 'vegan', label: 'Vegan' }
];

function FoodScreen(props) {
  const [mode, setMode] = useState('meal');
  const [selectedFood, setSelectedFood] = useState('beef');
  const [portion, setPortion] = useState('medium');
  const [selectedDiet, setSelectedDiet] = useState('omnivore');
  const [result, setResult] = useState(null);
  const [equivalencies, setEquivalencies] = useState(null);
  const [comparison, setComparison] = useState(null);

  function calculateMeal() {
    var foodData = emissionData.food.single_items[selectedFood];
    var portionKg = emissionData.food.portion_sizes[portion];
    var totalKg = foodData.factor * portionKg;

    var mealResult = {
      tripTotalKg: parseFloat(totalKg.toFixed(2)),
      annualizedKg: parseFloat(totalKg.toFixed(2)),
      annualizedTons: parseFloat((totalKg / 1000).toFixed(3)),
      frequencyLabel: 'single serving (' + (portionKg * 1000) + 'g)',
      source: foodData.source,
      sourceUrl: foodData.source_url,
      lastUpdated: foodData.last_updated,
      formula: (portionKg * 1000) + 'g x ' + foodData.factor + ' ' + foodData.unit + ' = ' + totalKg.toFixed(2) + ' kg CO2e',
      waterLiters: foodData.water_liters_per_kg ? Math.round(foodData.water_liters_per_kg * portionKg) : null,
      landM2: foodData.land_m2_per_kg ? parseFloat((foodData.land_m2_per_kg * portionKg).toFixed(1)) : null
    };

    var equiv = getEquivalencies(totalKg);
    setEquivalencies(equiv);

    var comp = foodItems.map(function(item) {
      var data = emissionData.food.single_items[item.key];
      return {
        mode: item.label,
        key: item.key,
        kgCO2: parseFloat((data.factor * portionKg).toFixed(2)),
        factor: data.factor
      };
    }).sort(function(a, b) { return a.kgCO2 - b.kgCO2; });

    setResult(mealResult);
    setComparison(comp);
  }

  function calculateDiet() {
    var dietData = emissionData.food.diet_annual[selectedDiet];
    var annualKg = dietData.factor;

    var dietResult = {
      tripTotalKg: parseFloat((annualKg / 365).toFixed(2)),
      annualizedKg: annualKg,
      annualizedTons: parseFloat((annualKg / 1000).toFixed(1)),
      frequencyLabel: 'estimated annual food footprint',
      source: dietData.source,
      sourceUrl: dietData.source_url,
      lastUpdated: dietData.last_updated,
      formula: selectedDiet + ' diet = approximately ' + annualKg + ' kg CO2e per year (' + dietData.source + ')'
    };

    var equiv = getEquivalencies(annualKg);
    setEquivalencies(equiv);

    var comp = dietOptions.map(function(diet) {
      var data = emissionData.food.diet_annual[diet.key];
      return {
        mode: diet.label,
        key: diet.key,
        kgCO2: data.factor,
        factor: data.factor
      };
    }).sort(function(a, b) { return a.kgCO2 - b.kgCO2; });

    setResult(dietResult);
    setComparison(comp);
  }

  function handleCalculate() {
    if (mode === 'meal') {
      calculateMeal();
    } else {
      calculateDiet();
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

  function modeButtonStyle(isActive) {
    return {
      padding: '12px 24px',
      borderRadius: 8,
      border: '2px solid #0d7377',
      backgroundColor: isActive ? '#0d7377' : '#fff',
      color: isActive ? '#fff' : '#0d7377',
      cursor: 'pointer',
      fontSize: 15,
      fontWeight: 600,
      flex: 1
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
        Food and Diet
      </h1>
      <p style={{ fontSize: 14, color: '#5c5c5c', marginBottom: 20, lineHeight: 1.5 }}>
        Calculate the carbon footprint of a single meal or estimate your annual diet footprint.
      </p>

      {/* Mode Toggle */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
        <button
          style={modeButtonStyle(mode === 'meal')}
          onClick={function() { setMode('meal'); setResult(null); }}
        >
          Single Meal
        </button>
        <button
          style={modeButtonStyle(mode === 'diet')}
          onClick={function() { setMode('diet'); setResult(null); }}
        >
          Diet Pattern
        </button>
      </div>

      {/* Meal Mode */}
      {mode === 'meal' && (
        <div>
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 16, fontWeight: 500, color: '#5c5c5c', marginBottom: 10 }}>
              Food Item
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {foodItems.map(function(item) {
                return (
                  <button
                    key={item.key}
                    style={chipStyle(selectedFood === item.key)}
                    onClick={function() { setSelectedFood(item.key); }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 16, fontWeight: 500, color: '#5c5c5c', marginBottom: 10 }}>
              Portion Size
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {portionOptions.map(function(opt) {
                return (
                  <button
                    key={opt.key}
                    style={chipStyle(portion === opt.key)}
                    onClick={function() { setPortion(opt.key); }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <span style={{ display: 'block', fontSize: 12, color: '#999', marginTop: 6 }}>
              Portion sizes are approximate edible weight
            </span>
          </div>
        </div>
      )}

      {/* Diet Mode */}
      {mode === 'diet' && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: '#5c5c5c', marginBottom: 10 }}>
            Diet Type
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {dietOptions.map(function(opt) {
              return (
                <button
                  key={opt.key}
                  style={chipStyle(selectedDiet === opt.key)}
                  onClick={function() { setSelectedDiet(opt.key); }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <span style={{ display: 'block', fontSize: 12, color: '#999', marginTop: 6 }}>
            Estimates based on average dietary patterns (Scarborough et al. 2023)
          </span>
        </div>
      )}

      {/* Calculate Button */}
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

      {/* Extra food-specific results */}
      {result && result.waterLiters && (
        <div style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: '#e8f4f8',
          borderRadius: 8,
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: 14, color: '#5c5c5c', fontWeight: 600, marginBottom: 10 }}>
            Additional environmental data for this serving:
          </h3>
          <div style={{
            backgroundColor: '#fff',
            padding: '10px 14px',
            borderRadius: 8,
            fontSize: 14,
            color: '#5c5c5c',
            marginBottom: 8
          }}>
            {'Water usage: approximately ' + result.waterLiters + ' liters'}
          </div>
          {result.landM2 > 0 && (
            <div style={{
              backgroundColor: '#fff',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 14,
              color: '#5c5c5c',
              marginBottom: 8
            }}>
              {'Land use: approximately ' + result.landM2 + ' square meters'}
            </div>
          )}
          <span style={{ fontSize: 11, color: '#999' }}>
            Source: Poore and Nemecek 2018, Science
          </span>
        </div>
      )}

      {/* Results */}
      <ResultCard
        result={result}
        equivalencies={equivalencies}
        comparison={comparison}
      />

      {/* Ad only after results */}
      {result && <EthicalAdBanner />}
    </div>
  );
}

export default FoodScreen;
