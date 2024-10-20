import { ResponseType } from '@/lib/api/global'
import AppMessages from '@/lib/config/appMessages'
import { toast } from 'react-toastify'

const handleSuccess = (text: string) => {
  if (typeof window !== 'undefined') toast(text, { type: 'success' })
}

export const handleResponse = (response: ResponseType, showMsg = true) => {
  const showErrorToast = (message: string) => {
    if (typeof window !== 'undefined' && showMsg) {
      toast(message, { type: 'error' })
    }
  }

  if (response.status >= 200 && response.status < 300) {
    if (showMsg && response?.message) {
      handleSuccess(response.message)
    }
  } else {
    if (response.status === 401) {
      // Handle unauthorized status
      const msg = response?.message || (response.error as any)?.message
      showMsg && showErrorToast(msg)
    } else {
      const msg = response?.message || (response.error as any)?.message
      showMsg && showErrorToast(msg)
    }
  }
}

export const handleRequestError = async (error: Error) => {
  console.log('error?.cause', error?.cause)
  console.log('error?.message', error?.message)
  console.log('error?.name', error?.name)

  if (typeof window !== 'undefined') {
    toast(AppMessages.retryErr, { type: 'error' })
  }

  if (error?.name === 'AbortError') {
    // return
  }
}
