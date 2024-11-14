'use client'
import Table from '@/app/ui/table'
import { toast } from 'react-toastify'
import useData from '@/app/hook/useData'
import Modal from '@/app/ui/modal'
export const CurrencyTypes = ['USD', 'EUR', 'JPY'] as const

interface Props {}

const ColumnsHeaders = [
  { key: 'symbol', value: 'Coin' },
  { key: 'name', value: 'Name' },
  { key: 'currentPrice', value: 'Price' },
  { key: 'priceChangePercentage_24h', value: '24h' },
  { key: 'totalSupply', value: 'Total Volume' },
  { key: 'chart', value: '' },
]

const CryptoList: React.FC<Props> = () => {
  const { data, isLoading, error } = useData()

  if (error) {
    toast.error('An unexpected error occurred')
  }

  return (
    <div className='w-full h-[500px] overflow-auto mt-44 no-scrollbar'>
      <Table columnHeader={ColumnsHeaders} columnData={data || []} />
    </div>
  )
}

export default CryptoList
