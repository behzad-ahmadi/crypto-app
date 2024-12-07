'use client'

import { useState, useEffect, useRef } from 'react'
import pako from 'pako'

type UseWebSocketProps = {
  url: string
  subscribePayload?: Record<string, any>
  onMessage: (message: any) => void
}

const useWebSocket = ({
  url,
  subscribePayload,
  onMessage,
}: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    console.log('Connecting to WebSocket:', url)
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
      setIsConnected(true)
      if (subscribePayload) {
        ws.send(JSON.stringify(subscribePayload))
      }
    }

    ws.onmessage = async event => {
      try {
        if (event.data instanceof Blob) {
          const arrayBuffer = await event.data.arrayBuffer()
          const decompressed = pako.inflate(arrayBuffer, { to: 'string' })
          const messageData = JSON.parse(decompressed)
          onMessage(messageData)
        } else {
          const messageData = JSON.parse(event.data)
          onMessage(messageData)
        }
      } catch (err) {
        setError(
          'Error processing WebSocket message: ' + (err as Error).message
        )
        console.error('Error processing WebSocket message:', err)
      }
    }

    ws.onerror = error => {
      setError('WebSocket encountered an error: ' + error)
      console.error('WebSocket error:', error)
    }

    ws.onclose = event => {
      setIsConnected(false)
      console.log('WebSocket disconnected', event)
    }

    return () => {
      console.log('Cleaning up WebSocket connection')
      wsRef.current?.close()
      wsRef.current = null
    }
  }, [url]) // Reconnect only if the URL changes

  // Resend subscription payload if the payload changes while connected
  useEffect(() => {
    if (isConnected && subscribePayload && wsRef.current) {
      console.log('Sending subscription payload:', subscribePayload)
      wsRef.current?.send(JSON.stringify(subscribePayload))
    }
  }, [subscribePayload, isConnected])

  const unsubscribe = () => {
    if (wsRef.current) {
      wsRef.current.send(
        JSON.stringify({
          method: 'state.unsubscribe',
          params: { market_list: [] },
          id: 1,
        })
      )
    }
  }

  const close = () => wsRef.current?.close()

  return { isConnected, error, unsubscribe, close }
}

export default useWebSocket
