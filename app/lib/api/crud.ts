import { toSnakeCase, toSnakeCaseArray } from '@/app/lib/helper'
import {
  DeleteParamsType,
  GetParamsType,
  PostPutPatchParamsType,
} from './crud.d'
import fetchData from '@/app/lib/api/fetch'
import { handleRequestError, handleResponse } from '@/app/lib/api/errorHandlers'

export const get = async (params: GetParamsType): Promise<ResponseType> => {
  try {
    const {
      url,
      params: queryParams = {},
      convertKeys = true,
      token,
      cache,
      signal,
      next,
    } = params
    const queryString = new URLSearchParams(
      convertKeys ? toSnakeCaseArray(queryParams) : queryParams
    ).toString()
    const finalUrl = queryString ? `${url}?${queryString}` : url

    const options: RequestInit = {
      method: 'GET',
      cache: cache || 'default',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      signal,
      next,
    }

    const responseData: ResponseType = await fetchData(
      finalUrl,
      options,
      convertKeys
    )

    handleResponse(responseData)

    return responseData
  } catch (error) {
    if (error instanceof Error) {
      handleRequestError(error)
    } else {
      console.error('An unexpected error occurred:', error)
    }
    // TODO make responses better approach
    return {} as ResponseType
    // throw Error('An unexpected error occurred!!', {})
  }
}

export const option = async (
  params: GetParamsType
): Promise<ResponseType | undefined> => {
  try {
    const { url, params: queryParams = {}, convertKeys = true, token } = params
    const queryString = new URLSearchParams(
      convertKeys ? toSnakeCase(queryParams) : queryParams
    ).toString()
    const finalUrl = `${url}?${queryString}`

    const options: RequestInit = {
      method: 'OPTIONS',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const responseData: ResponseType = await fetchData(
      finalUrl,
      options,
      convertKeys
    )

    handleResponse(responseData)

    return responseData
  } catch (error) {
    if (error instanceof Error) {
      handleRequestError(error)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}

export const post = async (
  params: PostPutPatchParamsType
): Promise<ResponseType | undefined> => {
  try {
    const { url, data = {}, convertKeys = true, token } = params

    const isFormData = data instanceof FormData

    const options: RequestInit = {
      method: 'POST',
      cache: 'default',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
      },
      body: isFormData
        ? data // FormData should be passed as-is
        : JSON.stringify(convertKeys ? toSnakeCase(data) : data),
      ...params,
    }

    const responseData: ResponseType = await fetchData(
      url,
      options,
      convertKeys
    )

    handleResponse(responseData)

    return responseData
  } catch (error) {
    if (error instanceof Error) {
      handleRequestError(error)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}

export const put = async (
  params: PostPutPatchParamsType
): Promise<ResponseType | undefined> => {
  try {
    const { url, data = {}, convertKeys = true, token } = params

    const options: RequestInit = {
      method: 'PUT',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(convertKeys ? toSnakeCase(data) : data),
      ...params,
    }

    const responseData: ResponseType = await fetchData(
      url,
      options,
      convertKeys
    )

    handleResponse(responseData)

    return responseData
  } catch (error) {
    if (error instanceof Error) {
      handleRequestError(error)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}

export const del = async (
  params: DeleteParamsType
): Promise<ResponseType | undefined> => {
  try {
    const { url, token } = params

    const options: RequestInit = {
      method: 'DELETE',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const responseData: ResponseType = await fetchData(url, options, false)

    handleResponse(responseData)

    return responseData
  } catch (error) {
    if (error instanceof Error) {
      handleRequestError(error)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}

export const patch = async (
  params: PostPutPatchParamsType
): Promise<ResponseType | undefined> => {
  try {
    const { url, data = {}, convertKeys = true, token } = params

    const options: RequestInit = {
      method: 'PATCH',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(convertKeys ? toSnakeCase(data) : data),
    }

    const responseData: ResponseType = await fetchData(
      url,
      options,
      convertKeys
    )

    handleResponse(responseData)

    return responseData
  } catch (error) {
    if (error instanceof Error) {
      handleRequestError(error)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}
