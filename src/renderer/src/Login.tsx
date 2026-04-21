import { useState } from 'react'

type Props = {
  onLogin: (username: string) => void
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')

  function handleLogin() {
    if (username === '1234' && pin === '1234') {
      onLogin(username)
    } else {
      alert('Invalid login')
    }
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#1e1e1e',
      color: 'white'
    }}>
      <div style={{ background: '#2b2b2b', padding: 30, borderRadius: 12 }}>
        <h2>Cashier Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: 'block', marginBottom: 10, padding: 10 }}
        />

        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={{ display: 'block', marginBottom: 10, padding: 10 }}
        />

        <button onClick={handleLogin} style={{ padding: 10 }}>
          Login
        </button>
      </div>
    </div>
  )
}