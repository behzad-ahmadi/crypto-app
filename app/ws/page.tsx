'use client'

import useWebSocket from '@/app/hook/useWebSocket'
import React, { useState, useEffect } from 'react'

type TradingPairData = {
  [pair: string]: {
    last: string
    volume: string
    high: string
    low: string
  }
}

const CoinExMarket: React.FC = () => {
  const [data, setData] = useState<TradingPairData>({})
  const [error, setError] = useState<string | null>(null)

  const { isConnected } = useWebSocket({
    url: 'wss://socket.coinex.com/v2/spot/',
    subscribePayload: {
      method: 'depth.subscribe',
      params: ['BTCUSDT', 5, '0'],
      id: 1,
    },
    onMessage: message => {
      try {
        const parsedMessage = message?.result
        if (parsedMessage && parsedMessage[0]) {
          const [pair, marketData] = parsedMessage
          const { last, volume, high, low } = marketData
          setData(prev => ({
            ...prev,
            [pair]: { last, volume, high, low },
          }))
        }
      } catch (err) {
        console.error('Error processing message:', err)
      }
    },
    apiKey: process.env.NEXT_PUBLIC_COINEX_API_KEY || '',
    apiSecret: process.env.NEXT_PUBLIC_COINEX_API_SECRET || '',
  })

  // useEffect(() => {
  //   console.log(
  //     'keys',
  //     process.env.NEXT_PUBLIC_COINEX_API_KEY,
  //     process.env.NEXT_PUBLIC_COINEX_API_SECRET
  //   )
  // }, [])

  return (
    <div className='p-4 h-screen'>
      <h1 className='text-2xl font-bold'>CoinEx Market Data</h1>
      <p className='text-sm'>
        WebSocket Status: {isConnected ? 'Connected' : 'Disconnected'}
      </p>
      {error && <p className='text-red-500'>{error}</p>}

      {Object.keys(data).length > 0 ? (
        <div className='overflow-x-auto mt-4 max-h-96'>
          <table className='table table-zebra table-pin-rows w-full'>
            {/* Table Head */}
            <thead>
              <tr>
                <th>Pair</th>
                <th>Last Price</th>
                <th>Volume</th>
                <th>24h High</th>
                <th>24h Low</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {Object.entries(data).map(
                ([pair, { last, volume, high, low }]) => (
                  <tr key={pair}>
                    <td className='font-semibold'>{pair}</td>
                    <td>{last}</td>
                    <td>{volume}</td>
                    <td>{high}</td>
                    <td>{low}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading market data...</p>
      )}
    </div>
  )
}

export default CoinExMarket
