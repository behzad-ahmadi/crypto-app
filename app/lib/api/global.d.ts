import { UploadFolder } from '@/lib/config/constants'

/**
 * Generic data type for response data.
 */
export type DataType = {
  [key: string]: any // Any additional properties
  type?: { text: string; value: number }[] // Optional type array
  errors?: Record<string, any> // Optional errors object
  pagination?: Pagination
  list?: any[]
  totalCount?: number
  trends?: string[]
}

/**
 * Interface for API response.
 */
export type ResponseType = Data[]

interface Data {
  id: string
  symbol: string
  name: string
  image: string
  currentPrice: number
  marketCap: number
  marketCapRank: number
  fullyDilutedValuation: number
  totalVolume: number
  high24h: number
  low24h: number
  priceChange24h: number
  priceChangePercentage24h: number
  marketCapChange24h: number
  marketCapChangePercentage24h: number
  circulatingSupply: number
  totalSupply: number
  maxSupply: number
  ath: number
  athChangePercentage: number
  athDate: string
  atl: number
  atlChangePercentage: number
  atlDate: string
  roi: null | number
  lastUpdated: string
}

interface MetadataProps {
  title?: string
  description?: string
  url?: string
  image?: string
  websiteTitle?: string
}
