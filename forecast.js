const indexSelect = document.getElementById('indexSelect');
const horizonSelect = document.getElementById('horizonSelect');
const currentValueInput = document.getElementById('currentValue');
const sentimentSelect = document.getElementById('sentimentSelect');
const forecastBtn = document.getElementById('forecastBtn');
const statusText = document.getElementById('statusText');
const resultSection = document.getElementById('resultSection');
const rangeValue = document.getElementById('rangeValue');
const cagrValue = document.getElementById('cagrValue');
const confidenceValue = document.getElementById('confidenceValue');

const defaultValues = {
  'NIFTY 50': 21800,
  SENSEX: 72500,
};

function estimateForecast(baseValue, days, sentiment) {
  const drift = sentiment === 'optimistic' ? 0.00048 : sentiment === 'conservative' ? 0.00012 : 0.00028;
  const volatility = sentiment === 'optimistic' ? 0.0092 : sentiment === 'conservative' ? 0.0042 : 0.0068;
  let low = baseValue;
  let high = baseValue;

  for (let i = 0; i < days; i += 1) {
    const shock = (Math.random() * 2 - 1) * volatility;
    const dailyMove = drift + shock;
    low *= 1 + dailyMove * 0.8;
    high *= 1 + dailyMove * 1.2;
  }

  if (low > high) [low, high] = [high, low];
  const cagr = Math.pow(high / baseValue, 365 / days) - 1;
  const confidence = 70 + (sentiment === 'conservative' ? 7 : sentiment === 'optimistic' ? -6 : 0);

  return {
    low: Math.round(Math.max(0, low)),
    high: Math.round(Math.max(0, high)),
    cagr: cagr * 100,
    confidence,
  };
}

function formatNumber(value) {
  return value.toLocaleString('en-IN');
}

function loadDefaultValue() {
  currentValueInput.value = defaultValues[indexSelect.value];
}

indexSelect.addEventListener('change', loadDefaultValue);

forecastBtn.addEventListener('click', () => {
  const indexName = indexSelect.value;
  const horizon = Number(horizonSelect.value);
  const sentiment = sentimentSelect.value;
  let currentValue = Number(currentValueInput.value);

  if (!currentValue || currentValue <= 0) {
    currentValue = defaultValues[indexName];
    currentValueInput.value = currentValue;
  }

  statusText.textContent = 'Generating outlook...';
  resultSection.hidden = true;

  window.setTimeout(() => {
    const forecast = estimateForecast(currentValue, horizon, sentiment);
    rangeValue.textContent = `${formatNumber(forecast.low)} — ${formatNumber(forecast.high)}`;
    cagrValue.textContent = `${forecast.cagr.toFixed(2)}%`;
    confidenceValue.textContent = `${forecast.confidence}%`;
    resultSection.hidden = false;
    statusText.textContent = `Forecast based on ${indexName}, ${horizon} days, ${sentiment}.`;
  }, 180);
});
