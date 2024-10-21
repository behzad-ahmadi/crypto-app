import { Data } from '@/app/lib/api/global'
import { CurrencyTypes } from '@/app/ui/cryptoList'
import TableSkeleton from '@/app/ui/skeleton/tableSkeleton'
import clsx from 'clsx'
import { useQueryState } from 'nuqs'

interface Props {
  columnHeader: { key: string; value: string }[]
  columnData: Data[]
  loading?: boolean
}

export default function Table({ columnData, columnHeader, loading }: Props) {
  const [currency] = useQueryState('vs_currency', {
    defaultValue: CurrencyTypes[0],
  })

  if (!Array.isArray(columnData)) return <></>

  if (loading) return <TableSkeleton />

  return (
    <div>
      <table className='table-auto w-full relative border-separate border-spacing-0'>
        <thead className='bg-gray-600 sticky top-0 rounded-xl'>
          <tr className='text-left'>
            {columnHeader?.map((item, index) => (
              <th
                key={index}
                className={clsx('p-2 first:rounded-tl-xl last:rounded-tr-xl')}
              >
                {item?.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columnData?.map((item, index) => (
            <tr
              key={index}
              className={clsx(
                'hover:bg-gray-700',
                index === columnData.length - 1 && 'last:rounded-b-xl'
              )}
            >
              {columnHeader.map(header => (
                <td
                  key={header.key}
                  className='py-4 px-2 border-t border-gray-600'
                >
                  {renderValue(
                    header.key,
                    (item as any)[header.key],
                    currency,
                    item
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const renderValue = (
  key: string,
  value: any,
  currency: string,
  columnData: Data
) => {
  if (key == 'symbol') {
    return (
      <span className='flex gap-2'>
        <img
          src={columnData.image}
          alt='coin'
          width={20}
          height={20}
          className='object-contain'
        />
        {value.toUpperCase()}
      </span>
    )
  }

  if (key === 'priceChangePercentage_24h') {
    const textColor = Number(value) > 0 ? 'text-green-500' : 'text-red-500'
    return (
      <span className={textColor}>
        {(Math.round(value * 100) / 100).toFixed(2)}%
      </span>
    )
  }

  if (key == 'totalSupply') {
    return value?.toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
    })
  }

  if (key == 'currentPrice') {
    return value?.toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
    })
  }

  if (key == 'chart') {
    if (columnData.priceChangePercentage_24h < 0)
      return (
        <img src={'/images/chart-down.svg'} alt='coin' width={80} height={60} />
      )
    else
      return (
        <img src={'/images/chart-up.svg'} alt='coin' width={80} height={60} />
      )
  }

  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value)
  }

  return value
}
