// hooks/useNativeWebSocket.ts
import { useState, useEffect } from 'react'

interface WebSocketOptions {
  onOpen?: () => void
  onMessage?: (data: any) => void
  onClose?: () => void
  onError?: (error: Event) => void
}

const useNativeWebSocket = (url: string, options: WebSocketOptions = {}) => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = new WebSocket(url)

    socket.onopen = () => {
      console.log('WebSocket connection established')
      options.onOpen?.()
      setIsConnected(true)
    }

    socket.onmessage = event => {
      const data = JSON.parse(event.data)
      options.onMessage?.(data)
    }

    socket.onerror = error => {
      console.error('WebSocket error:', error)
      options.onError?.(error)
      setIsConnected(false)
    }

    socket.onclose = () => {
      console.log('WebSocket connection closed')
      options.onClose?.()
      setIsConnected(false)
    }

    setWs(socket)

    return () => {
      socket.close()
    }
  }, [url])

  const sendMessage = (message: object) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    } else {
      console.error('WebSocket is not open')
    }
  }

  return { sendMessage, isConnected }
}

export default useNativeWebSocket
