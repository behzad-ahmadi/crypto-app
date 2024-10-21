'use client'

import useHash from '@/app/hook/useHash'
import { useRouter } from 'next/navigation'

interface Props {
  title?: React.ReactNode
  content: React.ReactNode
  footer?: React.ReactNode
  hash: string
}

export default function Modal({ content, footer, title, hash }: Props) {
  const urlHash = useHash()
  const router = useRouter()

  if (urlHash != hash) return null

  const handleClose = () => {
    // Reset the hash to remove modal
    router.back()
  }

  return (
    <div
      className='fixed inset-0 z-40'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      {/* Modal */}
      <div className='inset-0 z-40 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div
            className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'
            onClick={e => e.stopPropagation()} // Prevents click event from propagating to the backdrop
          >
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <h3
                    className='text-base font-semibold leading-6 text-gray-900'
                    id='modal-title'
                  >
                    {title}
                  </h3>
                  <div className='mt-2'>{content}</div>
                </div>
              </div>
            </div>
            <div className='px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              {footer}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity z-30'
        aria-hidden='true'
        onClick={handleClose} // This should trigger the modal close
      ></div>
    </div>
  )
}
