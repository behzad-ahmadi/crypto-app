import { ResponseType } from '@/app/lib/api/global'
import { toCamelCase, toCamelCaseArray } from '@/app/lib/helper'

const fetchData = async (
  url: string,
  options: RequestInit,
  convertKeys: true,
  timeout: number = 18000
): Promise<ResponseType> => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { ...options, signal: controller.signal })

    let responseData: ResponseType = await response.json()

    if (convertKeys) {
      if (Array.isArray(responseData)) {
        responseData = toCamelCaseArray(responseData)
      }
    }

    return responseData
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Request timed out')
      // You might want to handle specific logic for timeouts here
    } else {
      console.error('Fetch error:', error.message)
    }
    throw error // Rethrow the error after handling
  } finally {
    clearTimeout(id)
  }
}

export default fetchData
