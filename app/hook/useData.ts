import fetchData from '@/app/lib/api/fetch'
import { Data } from '@/app/lib/api/global'
import { Constants } from '@/app/lib/config/constants'
import { CurrencyTypes } from '@/app/ui/cryptoList'
import { useQueryState } from 'nuqs'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function useData() {
  const [currency] = useQueryState('vs_currency', {
    defaultValue: CurrencyTypes[0],
  })

  const fetchUrl = useMemo(() => {
    return `${Constants.ApiBseURL}?vs_currency=${currency}`
  }, [currency])

  const { data, isLoading, error } = useSWR<Data[]>(
    fetchUrl,
    () => fetchData(fetchUrl, {}, true),
    {
      revalidateOnFocus: false,
    }
  )

  return { data, isLoading, error }
}
