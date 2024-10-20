//CLient side cookies
import { Constants } from '@/lib/config/constants'
import {
  serverDestroySession,
  serverGetToken,
  serverSetToken,
} from '@/lib/serverSession'
import Cookies from 'js-cookie'

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
