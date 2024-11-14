import useData from '@/app/hook/useData'
import useModal from '@/app/hook/useModal'
import { Data } from '@/app/lib/api/global'
import { Hash } from '@/app/lib/config/constants'
import InputText from '@/app/ui/inputText'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

export default function SearchInput() {
  // const [order, setOrder] = useQueryState('market_cap_desc')
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  })
  const { data, isLoading, error } = useData()
  const [list, setList] = useState<Data[]>([])
  const [showList, setShowList] = useState(false)
  const router = useRouter()

  const handleModal = () => {
    router.push(Hash.modalChart)
  }

  useEffect(() => {
    if (data) setList(data)
  }, [data])

  useEffect(() => {
    if (search) {
      const filteredList = data?.filter(item => {
        return item.name.toLowerCase().includes(search.toLowerCase())
      })
      setList(filteredList || [])
    }
  }, [search])

  const handleSearch = (search: string) => setSearch(search)

  return (
    <div className='relative'>
      <InputText
        placeholder='Search'
        onChange={e => handleSearch(e.target.value)}
        value={search}
        onFocus={() => setShowList(true)}
        onBlur={() =>
          setTimeout(() => {
            setShowList(false)
          }, 250)
        }
      />

      <div
        className={clsx(
          'absolute bg-slate-700 rounded-md py-2 mt-2 no-scrollbar',
          'w-full max-h-60 overflow-auto z-10',
          showList ? 'block' : 'hidden'
        )}
      >
        {list?.map((item, i) => (
          <div
            className='cursor-pointer hover:bg-slate-600 py-3 px-2 flex gap-2 border-b border-gray-500'
            onClick={() => {
              // setSearch(item.name)
              handleModal()
            }}
            key={i}
          >
            <img
              src={item.image}
              alt='coin'
              width={20}
              height={20}
              className='object-contain'
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}
