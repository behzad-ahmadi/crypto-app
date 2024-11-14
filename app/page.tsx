import CryptoList from '@/app/ui/cryptoList'
import MainNavbar from '@/app/ui/navbar'
import SearchSection from '@/app/ui/searchSection'

interface Props {
  searchParams: { vs_currency: string }
}

export default async function Home({ searchParams }: Props) {
  return (
    <>
      <div className='container mx-auto overflow-hidden'>
        <MainNavbar />
        <SearchSection />

        <CryptoList />
      </div>
    </>
  )
}
