import emissionData from '../data/emissionFactors.json';

export const calculateTransportEmissions = (vehicleType, distanceMiles, frequency) => {
  const vehicleData = emissionData.transportation[vehicleType];

  if (!vehicleData) {
    return { error: 'Unknown vehicle type' };
  }

  const factor = vehicleData.factor;
  const tripTotal = factor * distanceMiles;

  let annualized = 0;
  let frequencyLabel = '';

  switch (frequency) {
    case 'daily':
      annualized = tripTotal * 365;
      frequencyLabel = 'per year (daily)';
      break;
    case 'weekly':
      annualized = tripTotal * 52;
      frequencyLabel = 'per year (weekly)';
      break;
    case 'monthly':
      annualized = tripTotal * 12;
      frequencyLabel = 'per year (monthly)';
      break;
    default:
      annualized = tripTotal;
      frequencyLabel = 'one-time';
  }

  return {
    tripTotalKg: parseFloat(tripTotal.toFixed(2)),
    annualizedKg: parseFloat(annualized.toFixed(2)),
    annualizedTons: parseFloat((annualized / 1000).toFixed(3)),
    frequencyLabel,
    source: vehicleData.source,
    sourceUrl: vehicleData.source_url,
    lastUpdated: vehicleData.last_updated,
    formula: distanceMiles + ' miles x ' + factor + ' ' + vehicleData.unit + ' = ' + tripTotal.toFixed(2) + ' kg CO2e'
  };
};

export const getEquivalencies = (kgCO2) => {
  const eq = emissionData.equivalencies;
  const natAvg = emissionData.national_averages;

  return {
    smartphonesCharged: Math.round(kgCO2 * eq.smartphones_charged_per_kg_co2),
    treeDaysToAbsorb: Math.round((kgCO2 / 1000) * eq.tree_years_per_ton_co2 * 365),
    percentOfUSAnnual: parseFloat(((kgCO2 / 1000) / natAvg.us_annual_per_capita_tons * 100).toFixed(2)),
    milesInAvgCar: parseFloat((kgCO2 * eq.miles_driven_avg_car_per_kg_co2).toFixed(1))
  };
};

export const compareAllModes = (distanceMiles) => {
  const modes = Object.keys(emissionData.transportation);

  return modes
    .map(function(mode) {
      return {
        mode: mode.replace(/_/g, ' '),
        key: mode,
        kgCO2: parseFloat((emissionData.transportation[mode].factor * distanceMiles).toFixed(2)),
        factor: emissionData.transportation[mode].factor
      };
    })
    .sort(function(a, b) { return a.kgCO2 - b.kgCO2; });
};
