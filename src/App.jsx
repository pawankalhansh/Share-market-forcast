import { useEffect, useMemo, useState } from 'react'
import './App.css'

const categories = ['All', 'Finance', 'Tax & GST', 'Investment', 'Retirement', 'Daily Life', 'Converters']

const calculators = [
  { name: 'Basic Calc', category: 'All' },
  { name: 'EMI / Loan', category: 'Finance' },
  { name: 'Interest', category: 'Finance' },
  { name: 'Discount', category: 'Daily Life' },
  { name: 'Tip & Split', category: 'Daily Life' },
  { name: 'Income Tax', category: 'Tax & GST' },
  { name: 'GST', category: 'Tax & GST' },
  { name: 'SIP', category: 'Investment' },
  { name: 'Lump Sum', category: 'Investment' },
  { name: 'Mutual Fund', category: 'Investment' },
  { name: 'Goal Planner', category: 'Retirement' },
  { name: 'NPS / Pension', category: 'Retirement' },
  { name: 'Retirement Need', category: 'Retirement' },
  { name: 'EPFO / PF', category: 'Retirement' },
  { name: 'BMI', category: 'Daily Life' },
  { name: 'Age', category: 'Daily Life' },
  { name: 'Currency', category: 'Converters' },
  { name: 'Fuel', category: 'Daily Life' },
  { name: 'Unit Convert', category: 'Converters' }
]

const buttons = ['C', '+/-', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=']
const operators = ['/', '*', '-', '+']

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCalc, setSelectedCalc] = useState('Basic Calc')
  const [display, setDisplay] = useState('0')
  const [overwrite, setOverwrite] = useState(false)

  const visibleCalculators = useMemo(() => {
    if (selectedCategory === 'All') return calculators
    return calculators.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    if (!visibleCalculators.some((item) => item.name === selectedCalc)) {
      setSelectedCalc(visibleCalculators[0]?.name || 'Basic Calc')
    }
  }, [selectedCategory, selectedCalc, visibleCalculators])

  const formatResult = (value) => {
    const number = Number(value)
    return Number.isFinite(number) ? String(parseFloat(number.toFixed(10))) : 'Error'
  }

  const evaluateExpression = (expression) => {
    const sanitized = expression.replace(/%/g, '/100')
    const result = Function(`"use strict"; return (${sanitized})`)()
    return formatResult(result)
  }

  const handleButton = (value) => {
    if (selectedCalc !== 'Basic Calc') return

    if (value === 'AC') {
      setDisplay('0')
      setOverwrite(false)
      return
    }

    if (value === '+/-') {
      setDisplay((prev) => (prev.startsWith('-') ? prev.slice(1) : prev !== '0' ? `-${prev}` : prev))
      return
    }

    if (value === 'DEL') {
      if (overwrite || display.length === 1) {
        setDisplay('0')
        setOverwrite(false)
        return
      }
      setDisplay(display.slice(0, -1))
      return
    }

    if (value === '=') {
      try {
        const result = evaluateExpression(display)
        setDisplay(result)
        setOverwrite(true)
      } catch {
        setDisplay('Error')
        setOverwrite(true)
      }
      return
    }

    if (operators.includes(value)) {
      setOverwrite(false)
      setDisplay((prev) => {
        if (operators.includes(prev.slice(-1))) {
          return prev.slice(0, -1) + value
        }
        return prev + value
      })
      return
    }

    if (value === '%') {
      setOverwrite(false)
      setDisplay((prev) => (prev === '0' ? '0%' : prev + '%'))
      return
    }

    if (value === '.') {
      if (overwrite) {
        setDisplay('0.')
        setOverwrite(false)
        return
      }
      const lastSection = display.split(/[/\-*+]/).slice(-1)[0]
      if (lastSection.includes('.')) return
      setDisplay((prev) => prev + '.')
      return
    }

    if (overwrite) {
      setDisplay(value)
      setOverwrite(false)
      return
    }

    setDisplay((prev) => (prev === '0' ? value : prev + value))
  }

  return (
    <div className="app-shell">
      <div className="top-card">
        <div className="title-row">
          <div>
            <h1>All-in-One Calculator</h1>
            <div className="tags-row">
              <span className="pill badge">16 Calculators</span>
              <span className="pill">Daily Life</span>
              <span className="pill">India</span>
            </div>
          </div>
        </div>

        <div className="category-row">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-pill ${selectedCategory === item ? 'active' : ''}`}
              onClick={() => setSelectedCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="calculator-list-card">
          {visibleCalculators.map((item) => (
            <button
              key={item.name}
              className={`calc-pill ${selectedCalc === item.name ? 'active' : ''}`}
              onClick={() => setSelectedCalc(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="main-panel">
        <div className="calculator-card">
          <div className="panel-header">
            <div>
              <h2>{selectedCalc}</h2>
              <p>{selectedCalc === 'Basic Calc' ? 'Use the calculator below to perform quick math.' : 'This mode is a placeholder for the selected calculator type.'}</p>
            </div>
            <span className="status-pill">{selectedCategory}</span>
          </div>

          <div className="screen">
            <div className="display">{display}</div>
          </div>

          <div className="buttons-grid">
            {buttons.map((button) => (
              <button
                key={button}
                className={`calc-btn ${button === '=' ? 'equal-btn' : ''} ${operators.includes(button) || button === '%' ? 'operator-btn' : ''} ${button === 'AC' || button === 'DEL' || button === '+/-' ? 'action-btn' : ''} ${button === '0' ? 'zero-btn' : ''}`}
                onClick={() => handleButton(button)}
              >
                {button}
              </button>
            ))}
          </div>

          {selectedCalc !== 'Basic Calc' && (
            <div className="placeholder-panel">
              <h3>{selectedCalc} coming soon</h3>
              <p>Selected calculators in this app are shown for the UI model. The Basic Calc is fully functional.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
