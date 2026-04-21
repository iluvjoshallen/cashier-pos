import { useMemo, useState, useRef, useEffect } from 'react'
import { products } from './data/products'
import type { Product } from './types/product'
import type { CartItem } from './types/cart'

import Login from './Login'

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [search, setSearch] = useState('')
  const [cashReceived, setCashReceived] = useState('')
  const [user, setUser] = useState<string | null>(null)
  const cartRef = useRef<HTMLDivElement>(null)

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(id: number) {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  function clearCart() {
    setCart([])
    setCashReceived('')
  }

  function keypadPress(value: string) {
  setSearch((current) => current + value)
}

function keypadClear() {
  setSearch('')
}

function keypadBackspace() {
  setSearch((current) => current.slice(0, -1))
}

function keypadEnter() {
  if (!search) return

  const match = products.find(
    (product) => product.barcode === search
  )

  if (match) {
    addToCart(match)
    setSearch('')
  }
}

useEffect(() => {
  if (cartRef.current) {
    cartRef.current.scrollTop = cartRef.current.scrollHeight
  }
}, [cart])

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cart])

  const tax = subtotal * 0.08
  const total = subtotal + tax
  const cash = Number(cashReceived) || 0
  const change = Math.max(0, cash - total)

    const keyStyle = {
    padding: '22px 0',
    fontSize: '1.4rem',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer'
    } as const

    const actionKeyStyle = {
    padding: '22px 0',
    fontSize: '1rem',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer'
    } as const

    const enterKeyStyle = {
    padding: '22px 0',
    fontSize: '1rem',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer'
    } as const

    if (!user) {
      return <Login onLogin={setUser} />
    }

  return (
    <div style={{ minHeight: '100vh', background: '#1e1e1e', color: 'white', padding: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
        <div style={{ background: '#2b2b2b', padding: 16, borderRadius: 12 }}>
        <input
        type="text"
        placeholder="Search item or scan barcode..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
            width: '100%',
            padding: 12,
            marginBottom: 16,
            borderRadius: 8,
            border: 'none',
            boxSizing: 'border-box'
        }}
        />

          <div ref={cartRef} style={{ height: 250, overflowY: 'auto', paddingRight: 6, scrollbarWidth: 'thin' }}>
            {cart.length === 0 ? (
              <p>No items added.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid #444'
                  }}
                >
                  <div>
                    <div>{item.name}</div>
                    <div style={{ fontSize: 13, opacity: 0.8 }}>
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 8,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div style={{ background: '#2b2b2b', padding: 16, borderRadius: 12 }}>
        <div
            style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12
            }}
        >
            <button onClick={() => keypadPress('7')} style={keyStyle}>7</button>
            <button onClick={() => keypadPress('8')} style={keyStyle}>8</button>
            <button onClick={() => keypadPress('9')} style={keyStyle}>9</button>
            <button onClick={keypadBackspace} style={actionKeyStyle}>Back</button>

            <button onClick={() => keypadPress('4')} style={keyStyle}>4</button>
            <button onClick={() => keypadPress('5')} style={keyStyle}>5</button>
            <button onClick={() => keypadPress('6')} style={keyStyle}>6</button>
            <button onClick={keypadClear} style={actionKeyStyle}>Clear</button>

            <button onClick={() => keypadPress('1')} style={keyStyle}>1</button>
            <button onClick={() => keypadPress('2')} style={keyStyle}>2</button>
            <button onClick={() => keypadPress('3')} style={keyStyle}>3</button>
            <button onClick={keypadEnter} style={enterKeyStyle}>Enter</button>

            <button onClick={() => keypadPress('0')} style={{ ...keyStyle, gridColumn: 'span 4' }}>
            0
            </button>
        </div>
        </div>

          <div style={{ marginTop: 20 }}>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h3>Total: ${total.toFixed(2)}</h3>

            <input
              type="number"
              step="0.01"
              placeholder="Cash received"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              style={{
                width: '100%',
                padding: 12,
                marginTop: 12,
                borderRadius: 8,
                border: 'none'
              }}
            />

            <p style={{ marginTop: 12 }}>Change Due: ${change.toFixed(2)}</p>

            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button
                style={{ flex: 1, padding: 12, borderRadius: 8, border: 'none', cursor: 'pointer' }}
              >
                Cash
              </button>
              <button
                style={{ flex: 1, padding: 12, borderRadius: 8, border: 'none', cursor: 'pointer' }}
              >
                Card
              </button>
              <button
                style={{ flex: 1, padding: 12, borderRadius: 8, border: 'none', cursor: 'pointer' }}
              >
                Personal Check
              </button>
            </div>

            <button
              onClick={clearCart}
              style={{
                width: '100%',
                marginTop: 12,
                padding: 12,
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Void Transaction
            </button>
          </div>
        </div>
      </div>
  )
}

export default App