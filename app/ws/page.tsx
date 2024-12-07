'use client'

import useWebSocket from '@/app/hook/useWebSocket'
import React, { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'

type TradingPair = {
  market: string
  last: string
  volume: string
  high: string
  low: string
}

type TradingPairData = {
  [pair: string]: {
    last: string
    volume: string
    high: string
    low: string
  }
}

interface WebSocketMessage {
  data: {
    state_list: TradingPair[]
  }
  method: string
  id: number | null
}

interface CoinGeckoData {
  id: string
  symbol: string
  name: string
  image: string
  currentPrice: number
  marketCap: number
  marketCapRank: number
  fullyDilutedValuation: number | null
  totalVolume: number
  high24h: number
  low24h: number
  priceChange24h: number
  priceChangePercentage24h: number
  marketCapChange24h: number
  marketCapChangePercentage24h: number
  circulatingSupply: number
  totalSupply: number | null
  maxSupply: number | null
  ath: number
  athChangePercentage: number
  athDate: string // ISO date format
  atl: number
  atlChangePercentage: number
  atlDate: string // ISO date format
  roi: number | null
  lastUpdated: string // ISO date format
}

const CoinExMarket: React.FC = () => {
  const [data, setData] = useState<TradingPairData>({})
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [coingeckoData, setCoinGeckoData] = useState<CoinGeckoData[]>([])

  useEffect(() => {
    const fetchCoinGeckoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        )
        const data = await response.json()
        setCoinGeckoData(data)
      } catch (err) {
        console.error('Error fetching CoinGecko data:', err)
        setError('Failed to fetch CoinGecko data.')
      }
    }

    fetchCoinGeckoData()
  }, [])

  const subscribePayload = useMemo(
    () => ({
      method: 'state.subscribe',
      params: { market_list: TopCryptos },
      id: 1,
    }),
    []
  )

  const { isConnected } = useWebSocket({
    url: 'wss://socket.coinex.com/v2/spot',
    subscribePayload,
    onMessage: (message: WebSocketMessage) => {
      try {
        if (message.method === 'state.update' && message.data?.state_list) {
          const updatedData: TradingPairData = {}
          message.data.state_list.forEach(state => {
            const { market, last, volume, high, low } = state
            updatedData[market] = { last, volume, high, low }
          })
          setData(prevData => ({ ...prevData, ...updatedData }))
        }
      } catch (err) {
        setError('Error processing WebSocket message.')
        console.error(err)
      }
    },
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredData = Object.entries(data).filter(([pair]) =>
    pair.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='p-4 h-screen'>
      <h1 className='text-2xl font-bold'>CoinEx Market Data</h1>
      <p className='text-sm'>
        WebSocket Status: {isConnected ? 'Connected' : 'Disconnected'}
      </p>
      {error && <p className='text-red-500'>{error}</p>}

      <div className='mt-4'>
        <input
          type='text'
          placeholder='Search for a pair...'
          className='input input-bordered w-full'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {filteredData.length > 0 ? (
        <div className='overflow-x-auto mt-4 max-h-96'>
          <table className='table table-zebra table-pin-rows w-full'>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Pair</th>
                <th>Last Price</th>
                <th>Volume</th>
                <th>24h High</th>
                <th>24h Low</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(([pair, { last, volume, high, low }]) => {
                const coinSymbol = pair.replace('USDT', '').toLowerCase()
                const coinData = coingeckoData.find(
                  coin => coin.symbol === coinSymbol
                )

                return (
                  <tr key={pair}>
                    <td>
                      {coinData?.image && (
                        <Image
                          src={coinData.image}
                          alt={pair}
                          width={32}
                          height={32}
                          className='object-contain rounded-full'
                        />
                      )}
                    </td>
                    <td className='font-semibold'>{pair}</td>
                    <td>{last}</td>
                    <td>{volume}</td>
                    <td>{high}</td>
                    <td>{low}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  )
}

export default CoinExMarket

const TopCryptos = [
  'BTCUSDT',
  'ETHUSDT',
  'DOGEUSDT',
  'LTCUSDT',
  'XRPUSDT',
  'BCHUSDT',
  'EOSUSDT',
  'ADAUSDT',
  'SOLUSDT',
  'DOTUSDT',
  'MATICUSDT',
  'AVAXUSDT',
  'SHIBUSDT',
  'LINKUSDT',
  'VETUSDT',
  'TRXUSDT',
  'FILUSDT',
  'UNIUSDT',
  'DOGEUSDT',
  'USDTUSDC',
  'BNBUSDT',
  'FTTUSDT',
  'CROUSDT',
  'AAVEUSDT',
  'XLMUSDT',
  'ICPUSDT',
  'SANDUSDT',
  'GALAUSDT',
  'MKRUSDT',
  'AAVEUSDT',
  'BNTUSDT',
  'STMXUSDT',
  'GMTUSDT',
  'ZRXUSDT',
  'LRCUSDT',
  'ENSUSDT',
  'CVCUSDT',
  'SUSHIUSDT',
  'MITHUSDT',
  'HOTUSDT',
  'HNTUSDT',
  'XEMUSDT',
  'STPTUSDT',
  'LENDUSDT',
  'RUNEUSDT',
  'QKCUSDT',
  'FETUSDT',
  'NKNUSDT',
  'SKLUSDT',
  '1INCHUSDT',
  'AKROUSDT',
  'BALUSDT',
]
