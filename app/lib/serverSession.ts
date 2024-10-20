'use server'
import { Constants } from '@/lib/config/constants'
import { cookies } from 'next/headers'

const sessionName = Constants.SessionName
const expireTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // one week

export async function serverSetToken(token: string) {
  cookies().set(sessionName, token, {
    expires: expireTime,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}

// Function to logout by destroying the session
export async function serverDestroySession() {
  cookies().set(sessionName, '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
}

export async function serverGetToken() {
  const session = cookies().get(sessionName)?.value

  if (!session) return undefined
  return session
}
