export type RequestConfig<TData = unknown> = {
  baseURL?: string
  url?: string
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE"
  params?: object
  data?: TData | FormData
  responseType?:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream"
  signal?: AbortSignal
  headers?: HeadersInit
  credentials?: RequestCredentials
}

export type ResponseConfig<TData = unknown> = {
  data: TData
  status: number
  statusText: string
}

export type ResponseErrorConfig<TError = unknown> = {
  data: TError
  status: number
  statusText: string
}

export const httpClient = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const response = await fetch(`${config.baseURL}${config.url}`, {
    method: config.method.toUpperCase(),
    body: JSON.stringify(config.data),
    signal: config.signal,
    headers: config.headers,
    credentials: config.credentials || "include",
  })

  const data = await response.json()

  if (!response.ok) {
    const errorResponse: ResponseErrorConfig<TError> = {
      data: data as TError,
      status: response.status,
      statusText: response.statusText,
    }
    return Promise.reject(errorResponse)
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
  }
}

export default httpClient
