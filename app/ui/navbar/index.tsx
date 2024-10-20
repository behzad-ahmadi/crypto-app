import clsx from 'clsx'

export default function MainNavbar() {
  return (
    <>
      <nav className={clsx('flex justify-between rounded-md bg-blue-400 p-2')}>
        <div>
          <h1>Crypto App</h1>
        </div>
        <div className='flex gap-1'>
          <span>Modern Idea</span>
          <span>|</span>
          <span>Next.js Full Course</span>
        </div>
      </nav>
    </>
  )
}
