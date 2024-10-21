'use client'

import { Constants, Hash } from '@/app/lib/config/constants'
import { CurrencyTypes } from '@/app/ui/cryptoList'
import Modal from '@/app/ui/modal'
import SearchInput from '@/app/ui/searchSection/searchInput'
import Select from '@/app/ui/select'
import { useQueryState } from 'nuqs'

export default function SearchSection() {
  const [currency, setCurrency] = useQueryState('vs_currency', {
    defaultValue: CurrencyTypes[0],
    clearOnDefault: false,
  })

  const handleCurrency = (currency: string) => {
    setCurrency(currency)
  }

  return (
    <>
      <Modal content={<div>Content</div>} hash={Hash.modalChart} />
      <div className='flex gap-4'>
        <SearchInput />

        <Select
          onChange={e => {
            e.target.value && handleCurrency(e.target.value)
          }}
          value={currency}
        >
          {CurrencyTypes.map(currency => (
            <option key={currency} value={currency.toLocaleLowerCase()}>
              {currency}
            </option>
          ))}
        </Select>
      </div>
    </>
  )
}
