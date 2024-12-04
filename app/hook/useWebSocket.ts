import { useState, useEffect, useRef, useMemo } from 'react'
import crypto from 'crypto'

type UseWebSocketProps = {
  url: string
  subscribePayload?: Record<string, any>
  onMessage: (message: any) => void
  apiKey: string
  apiSecret: string
}

const generateSignature = (
  apiKey: string,
  apiSecret: string,
  timestamp: number,
  params: Record<string, any>
): string => {
  try {
    // Create the string to sign, similar to Python's "timestamp + apiKey + params"
    const preparedStr = `${timestamp}${apiKey}`
    const queryString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&')

    const stringToSign = preparedStr + queryString
    console.log('String to sign:', stringToSign)

    // Perform HMAC-SHA256 signing using apiSecret
    const signedStr = crypto
      .createHmac('sha256', apiSecret)
      .update(stringToSign)
      .digest('hex')
    return signedStr
  } catch (error) {
    console.error('Error generating signature:', error)
    throw new Error('Failed to generate signature')
  }
}

const useWebSocket = ({
  url,
  subscribePayload,
  onMessage,
  apiKey,
  apiSecret,
}: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  const stablePayload = useMemo(() => subscribePayload, [subscribePayload])

  const signature = useMemo(() => {
    try {
      if (stablePayload) {
        const timestamp = Date.now()
        return generateSignature(apiKey, apiSecret, timestamp, stablePayload)
      }
    } catch (error) {
      setError('Signature generation failed')
      console.error('Error in signature generation:', error)
    }
    return ''
  }, [apiKey, apiSecret, stablePayload])

  useEffect(() => {
    if (!apiKey || !apiSecret || !url || !onMessage || !stablePayload) {
      console.warn('Missing required parameters for WebSocket connection')
      return
    }

    console.log('Connecting to WebSocket:', url)
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
      setIsConnected(true)

      if (stablePayload) {
        const authPayload = {
          ...stablePayload,
          apiKey,
          signature,
        }

        console.log('Sending auth payload:', authPayload)
        ws.send(JSON.stringify(authPayload))
      }
    }

    ws.onmessage = event => {
      try {
        const message = JSON.parse(event.data)
        console.log('WebSocket message received:', message)
        onMessage(message)
      } catch (error) {
        console.error('Error parsing WebSocket message:', event.data, error)
      }
    }

    ws.onerror = error => {
      console.error('WebSocket error:', error)
      setError('WebSocket encountered an error')
    }

    ws.onclose = event => {
      console.log('WebSocket disconnected', event)
      setIsConnected(false)
    }

    return () => {
      console.log('Cleaning up WebSocket connection')
      ws.close()
    }
  }, [url, stablePayload, onMessage, apiKey, apiSecret, signature])

  return { isConnected, error }
}

export default useWebSocket
