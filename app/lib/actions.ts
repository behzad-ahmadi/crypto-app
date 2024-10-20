'use server'

import { revalidatePath as nextRevalidatePath } from 'next/cache'

export const revalidatePaths = async (path: string) => {
  nextRevalidatePath(path)
}
