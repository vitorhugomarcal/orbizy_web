import client from '@kubb/plugin-client/clients/axios'
import type { DeleteUnitRemoveByUnitIdMutationResponse, DeleteUnitRemoveByUnitIdPathParams } from '../models/DeleteUnitRemoveByUnitId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteUnitRemoveByUnitIdUrl(unitId: DeleteUnitRemoveByUnitIdPathParams['unitId']) {
  return `https://api.orbizy.app/unit/remove/${unitId}` as const
}

/**
 * {@link /unit/remove/:unitId}
 */
export async function deleteUnitRemoveByUnitId(
  unitId: DeleteUnitRemoveByUnitIdPathParams['unitId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteUnitRemoveByUnitIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteUnitRemoveByUnitIdUrl(unitId).toString(),
    ...requestConfig,
  })
  return res.data
}