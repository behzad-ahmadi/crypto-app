import { useState, useEffect, useRef } from 'react'
import crypto from 'crypto'

type TradingPairData = {
  [pair: string]: {
    last: string
    volume: string
    high: string
    low: string
  }
}

const generateSignature = (params: Record<string, any>, apiSecret: string) => {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')
  return crypto
    .createHmac('sha256', apiSecret)
    .update(sortedParams)
    .digest('hex')
}

const useCoinExData = (apiKey: string, apiSecret: string) => {
  const [data, setData] = useState<TradingPairData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('wss://socket.coinex.com/v2/spot/')
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)

      // Authenticate with the WebSocket
      const timestamp = Date.now()
      const authPayload = {
        id: 1,
        method: 'server.auth',
        params: [apiKey, timestamp],
      }
      const signature = generateSignature(
        { access_id: apiKey, tonce: timestamp },
        apiSecret
      )
      authPayload.params.push(signature)

      ws.send(JSON.stringify(authPayload))

      // Subscribe to specific trading pairs after authentication
      ws.send(
        JSON.stringify({
          id: 2,
          method: 'state.subscribe',
          params: ['BTCUSDT'], // Replace with your desired trading pairs
        })
      )
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
  }, [apiKey])

  return { data, isConnected }
}

export default useCoinExData
