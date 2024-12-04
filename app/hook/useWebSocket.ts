import { useState, useEffect, useRef, useMemo } from 'react'
import crypto from 'crypto'

type UseWebSocketProps = {
  url: string
  subscribePayload?: object
  onMessage: (message: any) => void
  apiKey: string
  apiSecret: string
}

const generateSignature = (
  apiKey: string,
  apiSecret: string,
  params: object
): string => {
  const nonce = Date.now().toString()
  const queryString = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')

  const stringToSign = `${apiKey}${nonce}${queryString}${apiSecret}`
  return crypto.createHash('sha256').update(stringToSign).digest('hex')
}

const useWebSocket = ({
  url,
  subscribePayload,
  onMessage,
  apiKey,
  apiSecret,
}: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  const stablePayload = useMemo(() => subscribePayload, [subscribePayload])

  useEffect(() => {
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)

      if (stablePayload) {
        const signature = generateSignature(apiKey, apiSecret, stablePayload)

        const authPayload = {
          ...stablePayload,
          apiKey,
          signature,
        }

        ws.send(JSON.stringify(authPayload))
      }
    }

    ws.onmessage = event => {
      const message = JSON.parse(event.data)
      onMessage(message)
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
  }, [url, stablePayload, onMessage, apiKey, apiSecret])

  return { isConnected }
}

export default useWebSocket
