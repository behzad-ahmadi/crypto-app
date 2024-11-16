'use client'
import { useWebSocket } from '@/app/hook/useWebSocket'
import { useEffect } from 'react'

const SOCKET_URL = 'wss://socket.coinex.com/v2/spot'

const Home = () => {
  const { isConnected, sendMessage } = useWebSocket(SOCKET_URL, {
    onMessage: data => {
      console.log('WebSocket message received:', data)
    },
    pingInterval: 10000, // Send ping every 10 seconds
  })

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        method: 'state.subscribe',
        params: ['BTCUSDT'], // Adjust to the specific market or data you want
      })
    }
  }, [isConnected, sendMessage])

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold'>CoinEx WebSocket Example</h1>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
    </div>
  )
}

export default Home
