//CLient side cookies
import Cookies from 'js-cookie'
import { Constants } from '@/app/lib/config/constants'
import {
  serverDestroySession,
  serverGetToken,
  serverSetToken,
} from '@/app/lib/serverSession'

const sessionName = Constants.SessionName
const expireTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // one week
export async function setToken(token: string) {
  if (typeof window !== 'undefined') {
    Cookies.set(sessionName, token, {
      expires: expireTime,
    })
  } else {
    await serverSetToken(token)
  }
}

// Function to logout by destroying the session
export async function destroySession() {
  if (typeof window !== 'undefined') {
    Cookies.set(sessionName, '', { expires: new Date(0) })
  } else {
    await serverDestroySession()
  }
}

export async function getToken() {
  if (typeof window !== 'undefined') {
    const session = Cookies.get(sessionName)

    if (!session) return undefined
    return session
  } else {
    return await serverGetToken()
  }
}
