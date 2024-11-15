'use client'

import useNativeWebSocket from '@/app/hook/useWebSocket'
import { useEffect, useState } from 'react'

export default function Page() {
  const [marketData, setMarketData] = useState<any[]>([])

  const { sendMessage, isConnected } = useNativeWebSocket(
    'wss://socket.coinex.com/v2/spot',
    {
      onMessage: data => {
        if (data && data.channel === 'state.subscribe') {
          setMarketData(prev => [...prev, data])
        }
      },
    }
  )

  useEffect(() => {
    const subscription = {
      method: 'state.subscribe',
      params: { market_list: [] },
      id: 1,
    }

    if (isConnected) sendMessage(subscription)

    return () => {
      const unsubscription = {
        method: 'state.unsubscribe',
        params: ['market.ticker'],
        id: 1,
      }
      sendMessage(unsubscription)
    }
  }, [sendMessage, isConnected])

  console.log('marketData', marketData)
  return <></>
}
