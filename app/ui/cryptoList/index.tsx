'use client'
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=2000&page=1&x_cg_demo_api_key=CG-Sq1dVc1fvuR8d1NWg7YCGadr
import Table from '@/app/ui/table'
import { toast } from 'react-toastify'
import useData from '@/app/hook/useData'
export const CurrencyTypes = ['USD', 'EUR', 'JPY'] as const

interface Props {}

const ColumnsHeaders = [
  { key: 'symbol', value: 'Coin' },
  { key: 'name', value: 'Name' },
  { key: 'currentPrice', value: 'Price' },
  { key: 'priceChangePercentage_24h', value: '24h' },
  { key: 'totalSupply', value: 'Total Volume' },
]

const CryptoList: React.FC<Props> = () => {
  const { data, isLoading, error } = useData()

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
