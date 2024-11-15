'use client'
import Table from '@/app/ui/table'
import useData from '@/app/hook/useData'
import { Suspense } from 'react'
export const CurrencyTypes = ['USD', 'EUR', 'JPY'] as const

const ColumnsHeaders = [
  { key: 'symbol', value: 'Coin' },
  { key: 'name', value: 'Name' },
  { key: 'currentPrice', value: 'Price' },
  { key: 'priceChangePercentage_24h', value: '24h' },
  { key: 'totalSupply', value: 'Total Volume' },
  { key: 'chart', value: '' },
]

export default function CryptoList() {
  const { data, error } = useData()

  if (error) {
    // toast.error('An unexpected error occurred')
  }

  return (
    <div className='w-full h-[500px] overflow-auto mt-44 no-scrollbar'>
      <Suspense>
        <Table columnHeader={ColumnsHeaders} columnData={data || []} />
      </Suspense>
    </div>
  )
}
