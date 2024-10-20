/**
 * Parameters for GET and OPTIONS requests.
 */
export interface GetParamsType extends RequestInit {
  url: string // The URL for the request
  params?: Record<string, any> // Query parameters for the request
  convertKeys?: boolean // Flag to map keys to snake_case
  token?: string // Authorization token
  showMsg?: boolean // Flag to show response message
  cache?: RequestCache // Cache mode for the request
}

/**
 * Parameters for POST and PUT requests.
 */
export interface PostPutPatchParamsType extends RequestInit {
  id?: number | string // Optional identifier
  url: string // The URL for the request
  data: Record<string, any> // Data to be sent in the request body
  convertKeys?: boolean // Flag to map keys to snake_case
  token?: string // Authorization token
  showMsg?: boolean // Flag to show response message
}

/**
 * Parameters for DELETE requests.
 */
export interface DeleteParamsType {
  url: string // The URL for the request
  convertKeys?: boolean // Flag to map keys to snake_case
  token: string | undefined // Authorization token
  showMsg?: boolean // Flag to show response message
}
