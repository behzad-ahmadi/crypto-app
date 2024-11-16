import { useEffect, useRef, useState } from 'react'
import WebSocket from 'isomorphic-ws'

type Message = {
  method: string
  params: any
  id?: number
}

type UseWebSocketOptions = {
  onMessage?: (data: any) => void
  onError?: (error: Event) => void
  onClose?: (event: CloseEvent) => void
  pingInterval?: number // milliseconds
}

export const useWebSocket = (url: string, options?: UseWebSocketOptions) => {
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const pingRef = useRef<NodeJS.Timeout | null>(null)

  const connect = () => {
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)
      console.log('WebSocket connection opened')
    }

    ws.onmessage = event => {
      if (options?.onMessage) {
        const data = JSON.parse(event.data.toString())
        options.onMessage(data)
      }
    }

    ws.onerror = error => {
      console.error('WebSocket error', error)
      options?.onError?.(error)
    }

    ws.onclose = event => {
      setIsConnected(false)
      console.log('WebSocket connection closed', event)
      options?.onClose?.(event)

      // Attempt to reconnect
      setTimeout(() => {
        console.log('Reconnecting WebSocket...')
        connect()
      }, 3000) // Retry after 3 seconds
    }
  }

  useEffect(() => {
    connect()

    // Cleanup on component unmount
    return () => {
      if (wsRef.current) wsRef.current.close()
      if (pingRef.current) clearInterval(pingRef.current)
    }
  }, [url])

  useEffect(() => {
    if (isConnected && options?.pingInterval) {
      pingRef.current = setInterval(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ method: 'server.ping' }))
        }
      }, options.pingInterval)
    }

    return () => {
      if (pingRef.current) clearInterval(pingRef.current)
    }
  }, [isConnected, options?.pingInterval])

  const sendMessage = (message: Message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    }
  }

  return { isConnected, sendMessage }
}
