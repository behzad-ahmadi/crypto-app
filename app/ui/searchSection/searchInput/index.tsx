import fetchData from '@/app/lib/api/fetch'
import InputText from '@/app/ui/inputText'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import useSWR from 'swr'

const url = 'https://api.coingecko.com/api/v3/coins/list'

export default function SearchInput() {
  const [order, setOrder] = useQueryState('market_cap_desc')
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  })
  const router = useRouter()

  const { data, isLoading, error } = useSWR(
    url,
    (url: string) => fetchData(url, {}, true),
    { revalidateOnFocus: false }
  )

  const handleSearch = (search: string) => setSearch(search)

  return (
    <div className='relative'>
      <InputText
        placeholder='Search'
        onChange={e => handleSearch(e.target.value)}
        value={search}
      />
      <div className={clsx('absolute bg-slate-700 rounded-md p-2 mt-1')}>
        <p>asasfa</p>
        <p>asasfa</p>
        <p>asasfa</p>
      </div>
    </div>
  )
}
