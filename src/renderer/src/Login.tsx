import { useState } from 'react'
import styles from './style.module.css';

type Props = {
  onLogin: (username: string) => void
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [activeField, setActiveField] = useState<'username' | 'pin'>('username')

  function handleLogin() {
    if (username === '1234' && pin === '1234') {
      onLogin(username)
    }else {
      alert('Invalid login')
      setUsername('')
      setPin('')
      setActiveField('username')
    }
  }

  function keypadPress(value: string) {
  if (activeField === 'username') {
    setUsername((current) => current + value)
    } else {
    setPin((current) => current + value)
      }
    }

    function keypadClear() {
      if (activeField === 'username') {
        setUsername('')
      } else {
        setPin('')
      }
    }

    function keypadBackspace() {
      if (activeField === 'username') {
        setUsername((current) => current.slice(0, -1))
      } else {
        setPin((current) => current.slice(0, -1))
      }
    }

    function keypadEnter() {
      if (activeField === 'username') {
        setActiveField('pin')
      } else {
        handleLogin()
      }
    }

  return (
    <div style={{minHeight: '100vh', background: '#1e1e1e', color: 'white', padding: 20}}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
      <div style={{ background: '#2b2b2b', padding: 30, borderRadius: 12 }}>
        <h1 style={{ padding: 20}}>Point Of Sale Login</h1>
        <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setActiveField('username')}
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 16,
              borderRadius: 8,
              border: activeField === 'username' ? '2px solid #4da6ff' : 'none',
              boxSizing: 'border-box'
            }}
          />

          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onFocus={() => setActiveField('pin')}
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 16,
              borderRadius: 8,
              border: activeField === 'pin' ? '2px solid #4da6ff' : 'none',
              boxSizing: 'border-box'
            }}
          />
      </div>
      <div style={{ background: '#2b2b2b', padding: 16, borderRadius: 12 }}>
          <div
              style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12
              }}
          >
              <button onClick={() => keypadPress('7')} className={styles.keyStyle}>7</button>
              <button onClick={() => keypadPress('8')} className={styles.keyStyle}>8</button>
              <button onClick={() => keypadPress('9')} className={styles.keyStyle}>9</button>
              <button onClick={keypadBackspace} className={styles.actionKeyStyle}>Back</button>

              <button onClick={() => keypadPress('4')} className={styles.keyStyle}>4</button>
              <button onClick={() => keypadPress('5')} className={styles.keyStyle}>5</button>
              <button onClick={() => keypadPress('6')} className={styles.keyStyle}>6</button>
              <button onClick={keypadClear} className={styles.actionKeyStyle}>Clear</button>

              <button onClick={() => keypadPress('1')} className={styles.keyStyle}>1</button>
              <button onClick={() => keypadPress('2')} className={styles.keyStyle}>2</button>
              <button onClick={() => keypadPress('3')} className={styles.keyStyle}>3</button>
              <button onClick={keypadEnter} className={styles.enterKeyStyle}>Enter</button>

              <button onClick={() => keypadPress('0')} className={styles.enterKeyStyle} style={{ gridColumn: 'span 4' }}>
              0
              </button>
          </div>
        </div>
        </div>
    </div>
  )
}