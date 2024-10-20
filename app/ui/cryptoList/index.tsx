'use client'
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=2000&page=1&x_cg_demo_api_key=CG-Sq1dVc1fvuR8d1NWg7YCGadr
import fetchData from '@/app/lib/api/fetch'
import { Constants } from '@/app/lib/config/constants'
import Table from '@/app/ui/table'
import { debounce } from 'lodash'
import { useQueryState } from 'nuqs'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { useMemo, useState, useEffect } from 'react'
import { Data } from '@/app/lib/api/global'

export const CurrencyTypes = ['USD', 'EUR', 'JPY'] as const

interface Props {}

const ColumnsHeaders = [
  { key: 'image', value: 'Image' },
  { key: 'symbol', value: 'Coin' },
  { key: 'name', value: 'Name' },
  { key: 'currentPrice', value: 'Price' },
  { key: 'priceChangePercentage_24h', value: '24h' },
  { key: 'totalSupply', value: 'Total Volume' },
]

const CryptoList: React.FC<Props> = () => {
  const [currency, setCurrency] = useQueryState('vs_currency', {
    defaultValue: CurrencyTypes[0],
    clearOnDefault: false,
  })
  const [order, setOrder] = useQueryState('market_cap_desc')
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  })
  const [debouncedUrl, setDebouncedUrl] = useState<string>('')

  const fetchUrl = useMemo(() => {
    return `${Constants.ApiBseURL}?vs_currency=${currency}`
  }, [currency])

  const url = useMemo(() => {
    let baseUrl = `${Constants.ApiBseURL}?`
    if (search) baseUrl += `&search=${search}`
    if (currency) baseUrl += `&vs_currency=${currency}`
    if (order) baseUrl += `&order=${order}`
    baseUrl += `&x_cg_demo_api_key=CG-Sq1dVc1fvuR8d1NWg7YCGadr`
    return baseUrl
  }, [search, order])

  // Debounce effect to delay URL change
  useEffect(() => {
    const handler = debounce(() => setDebouncedUrl(url), 2000)
    handler()
    return () => handler.cancel()
  }, [url])

  const { data, isLoading, error } = useSWR<Data[]>(
    fetchUrl,
    () => fetchData(fetchUrl, {}, true),
    {
      revalidateOnFocus: false,
    }
  )

  if (error) {
    toast.error('An unexpected error occurred')
  }

  return (
    <div className='w-full h-[500px] overflow-auto mt-44'>
      <Table columnHeader={ColumnsHeaders} columnData={data || []} />
    </div>
  )
}

export default CryptoList
