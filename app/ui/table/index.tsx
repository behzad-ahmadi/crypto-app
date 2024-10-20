import { Data } from '@/app/lib/api/global'

interface Props {
  columnHeader: { key: string; value: string }[]
  columnData: Data[]
}

export default function Table({ columnData, columnHeader }: Props) {
  const renderValue = (key: string, value: any) => {
    if (key === 'image') {
      return <img src={value} alt='coin' width={20} height={20} />
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
        currency: 'USD',
      })
    }

    if (key == 'currentPrice') {
      return value?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value)
    }

    return value
  }

  if (!Array.isArray(columnData)) return <></>

  return (
    <div>
      <table className='table-auto w-full'>
        <thead>
          <tr className='border-b text-left'>
            {columnHeader?.map((item, index) => (
              <th key={index}>{item?.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columnData?.map((item, index) => (
            <tr key={index} className=''>
              {columnHeader.map(header => (
                <td key={header.key}>
                  {renderValue(header.key, (item as any)[header.key])}
                </td>
              ))}
              <td>
                <img
                  src={'/images/chart-down.svg'}
                  alt='coin'
                  width={80}
                  height={60}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
