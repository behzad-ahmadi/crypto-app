'use client'

import useCoinExData from '@/app/hook/useWebSocket'
import React from 'react'

const CoinExMarket: React.FC = () => {
  const { data, isConnected } = useCoinExData()

  return (
    <div className='p-4 h-screen'>
      <h1 className='text-2xl font-bold'>CoinEx Market Data</h1>
      <p className='text-sm'>
        WebSocket Status: {isConnected ? 'Connected' : 'Disconnected'}
      </p>

      {data ? (
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
