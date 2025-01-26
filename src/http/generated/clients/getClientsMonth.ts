import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios"
import client from "@kubb/plugin-client/clients/axios"
import type {
  GetClientsMonth401,
  GetClientsMonth404,
  GetClientsMonthQueryResponse,
} from "../models/ClientsController/GetClientsMonth.ts"

export function getGetClientsMonthUrl() {
  return `https://api.orbizy.app/clients/month` as const
}

/**
 * @description Retrieve client count for the current month
 * {@link /clients/month}
 */
export async function getClientsMonth(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetClientsMonthQueryResponse,
    ResponseErrorConfig<GetClientsMonth401 | GetClientsMonth404>,
    unknown
  >({
    method: "GET",
    url: getGetClientsMonthUrl().toString(),
    withCredentials: true,
    ...requestConfig,
  })
  return res.data
}
