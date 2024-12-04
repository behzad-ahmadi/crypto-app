import { useState, useEffect, useRef } from 'react'

// Access ID AC9709B77462456EA98CC93851A95D05
// Secret Key 9A8F0B5B10DA151E56917C369927B9647048F4360B0B5695

type TradingPairData = {
  [pair: string]: {
    last: string
    volume: string
    high: string
    low: string
  }
}

const useCoinExData = () => {
  const [data, setData] = useState<TradingPairData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('wss://socket.coinex.com/')
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)

      // Subscribe to all trading pairs
      const subscribePayload = {
        method: 'state.subscribe',
        params: [],
        id: 1,
      }
      ws.send(JSON.stringify(subscribePayload))
    }

    ws.onmessage = event => {
      const message = JSON.parse(event.data)

      // Handle updates for trading pairs
      if (message.method === 'state.update' && message.params) {
        const marketData = message.params[0] as TradingPairData
        setData(prevData => ({
          ...prevData,
          ...marketData,
        }))
      }
    }

    ws.onerror = error => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      setIsConnected(false)
    }

    return () => {
      ws.close()
    }
  }, [])

  return { data, isConnected }
}

export default useCoinExData
