import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteUnitRemoveByUnitIdMutationResponse,
  DeleteUnitRemoveByUnitIdPathParams,
  DeleteUnitRemoveByUnitId401,
} from "../models/'UnitController/DeleteUnitRemoveByUnitId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteUnitRemoveByUnitIdUrl(unitId: DeleteUnitRemoveByUnitIdPathParams['unitId']) {
  return `https://api.orbizy.app/unit/remove/${unitId}` as const
}

/**
 * @description Remove a unit
 * {@link /unit/remove/:unitId}
 */
export async function deleteUnitRemoveByUnitId(
  unitId: DeleteUnitRemoveByUnitIdPathParams['unitId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteUnitRemoveByUnitIdMutationResponse, ResponseErrorConfig<DeleteUnitRemoveByUnitId401>, unknown>({
    method: 'DELETE',
    url: getDeleteUnitRemoveByUnitIdUrl(unitId).toString(),
    ...requestConfig,
  })
  return res.data
}