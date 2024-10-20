import { ResponseType } from '@/app/lib/api/global'
import { Metadata } from 'next'
import { toast } from 'react-toastify'

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export function toCamelCase(obj: any): Record<string, any> {
  const camelCaseObj: Record<string, any> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, group) =>
        group.toUpperCase()
      )

      if (Array.isArray(obj[key])) {
        camelCaseObj[camelCaseKey] =
          Array.isArray(obj[key]) && typeof obj[key][0] === 'object'
            ? toCamelCaseArray(obj[key])
            : obj[key] // Just copy the array if it's not an array of objects
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        camelCaseObj[camelCaseKey] = toCamelCase(obj[key])
      } else {
        camelCaseObj[camelCaseKey] = obj[key]
      }
    }
  }

  return camelCaseObj
}

export function toCamelCaseArray(arr: any[]): ResponseType {
  if (!arr) return arr

  return arr.map(item => (typeof item === 'object' ? toCamelCase(item) : item))
}

export function toSnakeCase(obj: Record<string, any>): Record<string, any> {
  const snakeCaseObj: Record<string, any> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeCaseKey = key.replace(/[A-Z\d]/g, match =>
        /[A-Z]/.test(match) ? `_${match.toLowerCase()}` : `_${match}`
      )

      if (Array.isArray(obj[key])) {
        // Apply toSnakeCase to each element in the array
        snakeCaseObj[snakeCaseKey] = obj[key].map((item: any) =>
          typeof item === 'object' && item !== null ? toSnakeCase(item) : item
        )
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        snakeCaseObj[snakeCaseKey] = toSnakeCase(obj[key])
      } else {
        snakeCaseObj[snakeCaseKey] = obj[key]
      }
    }
  }

  return snakeCaseObj
}

export function toSnakeCaseArray(
  arr: Record<string, any>[] | undefined
): Record<string, any>[] | undefined {
  if (!arr) return arr

  return arr.map(obj => toSnakeCase(obj))
}

/**
 * Removes all commas from string values in a given object.
 *
 * @param {Record<string, any>} values - The object containing key-value pairs where some values may be strings with commas.
 * @returns {Record<string, any>} cleanedValues - A new object with the same keys, where string values have commas removed.
 *
 * This function iterates over each key-value pair in the input object. If the value is a string,
 * it removes all commas from that string. If the value is not a string, it is copied as-is to the new object.
 *
 * Example:
 * const original = { name: "John, Doe", age: 30, address: "123, Elm St, Apt 4", homePrice: 1,000,000 };
 * const cleaned = removeComma(original);
 * console.log(cleaned);
 * Output: { name: "John Doe", age: 30, address: "123 Elm St Apt 4", homePrice: 1000000}
 */
export function removeComma(values: Record<string, any>): Record<string, any> {
  const cleanedValues: Record<string, any> = {}

  Object.keys(values).forEach(key => {
    const value = values[key]
    cleanedValues[key] =
      typeof value === 'string' ? value.replace(/,/g, '') : value
  })

  return cleanedValues
}

export const priceFormatter = (value: string): string => {
  const sanitizedInput = value.replace(/[^0-9+]/g, '')
  if (sanitizedInput.length === 0) return ''
  return Number(sanitizedInput).toLocaleString()
}

export const numberFormatter = (value: string): string => {
  // Remove all non-numeric characters except the leading plus sign
  return value.replace(/[^0-9+]/g, '')
}

export const mobileNumberFormatter = (
  value: string,
  countryCode: string = '+98'
): string => {
  // Remove all non-numeric characters except the leading plus sign
  const sanitizedInput = value.replace(/[^0-9+]/g, '')

  if (sanitizedInput.length < 3) return sanitizedInput

  // Ensure the number starts with the country code, if not prepend it
  let inputWithCountryCode = sanitizedInput.startsWith(countryCode)
    ? sanitizedInput
    : `${countryCode}${sanitizedInput}`

  // Remove the leading zero after the country code if present
  if (inputWithCountryCode.startsWith(`${countryCode}0`)) {
    inputWithCountryCode = `${countryCode}${inputWithCountryCode.slice(
      countryCode.length + 1
    )}`
  }

  // Extract the digits after the country code
  const numberWithoutCountryCode = inputWithCountryCode.slice(
    countryCode.length
  )

  // Ensure the local part starts with '9' and is exactly 10 digits long
  const validNumber = numberWithoutCountryCode.match(/^9[0-9]{10}$/)

  if (validNumber) {
    // Return the formatted number with the country code
    return `${countryCode}${validNumber[0]}`
  }

  // If the input does not match the required pattern, return the sanitized input
  return inputWithCountryCode
}

export const applyMask = (value: string, mask: string): string => {
  let maskedValue = '' // Initialize the masked value
  let valueIndex = 0 // Index for the input value

  // Iterate through the mask to build the masked value
  for (let i = 0; i < mask.length; i++) {
    if (valueIndex >= value.length) break // Stop if all input characters are masked

    if (mask[i] === 'X') {
      maskedValue += value[valueIndex] // Add character from the value
      valueIndex++
    } else {
      maskedValue += mask[i] // Add mask character (e.g., separators)
    }
  }

  return maskedValue
}

export const copyTextToClipboard = async (
  text: string,
  showMessage: boolean = true
): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    if (showMessage) toast('کپی شد!', { type: 'info', autoClose: 500 })
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

export const toB64 = (str: string | number) => {
  // if (process.env.NODE_ENV === 'development') return str
  return Buffer.from(str + '', 'utf8').toString('base64')
}

export const fromB64 = (str: string) => {
  // if (process.env.NODE_ENV === 'development') return str
  return Buffer.from(str, 'base64').toString('utf8')
}

export function formatViewCount(count: number | undefined): string {
  if (count === undefined) return '0'
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(0)}M`
  } else if (count >= 10000) {
    return `${(count / 1000).toFixed(0)}k`
  } else {
    return count.toString()
  }
}

export const base64ToFile = (base64String: string, filename: string): File => {
  // Split the Base64 string into parts
  const [base64Header, base64Data] = base64String.split(',')

  // Decode the Base64 string
  const byteString = atob(base64Data)
  const mimeString = base64Header.split(':')[1].split(';')[0]
  const ab = new Uint8Array(byteString.length)

  // Convert byteString to Uint8Array
  for (let i = 0; i < byteString.length; i++) {
    ab[i] = byteString.charCodeAt(i)
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([ab], { type: mimeString })

  // Return a File object
  return new File([blob], filename, { type: mimeString })
}

// Dynamically generate metadata
export async function createMetadata({
  description,
  image,
  title,
  url,
  websiteTitle,
}: MetadataProps): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_BASE_URL || 'https://wikilook.ir'

  const imageUrl = image
    ? new URL(image, siteUrl).toString()
    : `${siteUrl}/images/logo.jpg`

  return {
    metadataBase: new URL(siteUrl),
    title: title,
    description: description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: websiteTitle,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} image`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
  }
}
