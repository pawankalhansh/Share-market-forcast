import { useState } from 'react'
import './App.css'

const buttons = [
  'AC', 'DEL', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
]

function App() {
  const [display, setDisplay] = useState('0')
  const [overwrite, setOverwrite] = useState(false)

  const operators = ['/', '*', '-', '+']

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
    if (value === 'AC') {
      setDisplay('0')
      setOverwrite(false)
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
    <div className="app">
      <div className="calculator-card">
        <div className="calculator-header">
          <div>
            <h1>All In One Calculator</h1>
            <p>Fast math operations, percentage and clear controls.</p>
          </div>
        </div>

        <div className="screen">
          <div className="display">{display}</div>
        </div>

        <div className="buttons-grid">
          {buttons.map((button) => (
            <button
              key={button}
              className={`calc-btn ${button === '=' ? 'equal-btn' : ''} ${operators.includes(button) || button === '%' ? 'operator-btn' : ''} ${button === 'AC' || button === 'DEL' ? 'action-btn' : ''} ${button === '0' ? 'zero-btn' : ''}`}
              onClick={() => handleButton(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
