import clsx from 'clsx'

export default function MainNavbar() {
  return (
    <>
      <div className='navbar bg-base-200'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-5 w-5 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </div>
          </div>
          <a className='btn btn-ghost text-xl'>Crypto APP</a>
        </div>
      </div>
    </>
  )
}
