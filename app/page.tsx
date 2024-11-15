import CryptoList from '@/app/ui/cryptoList'
import MainNavbar from '@/app/ui/navbar'
import SearchSection from '@/app/ui/searchSection'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <>
      <div className='container mx-auto overflow-hidden'>
        <MainNavbar />
        <Suspense>
          <SearchSection />
        </Suspense>

        <CryptoList />
      </div>
    </>
  )
}
