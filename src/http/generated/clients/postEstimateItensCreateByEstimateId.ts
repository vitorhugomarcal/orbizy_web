import client from '@kubb/plugin-client/clients/axios'
import type {
  PostEstimateItensCreateByEstimateIdMutationRequest,
  PostEstimateItensCreateByEstimateIdMutationResponse,
  PostEstimateItensCreateByEstimateIdPathParams,
  PostEstimateItensCreateByEstimateId401,
  PostEstimateItensCreateByEstimateId404,
} from '../models/EstimateItemController/PostEstimateItensCreateByEstimateId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostEstimateItensCreateByEstimateIdUrl(estimateId: PostEstimateItensCreateByEstimateIdPathParams['estimateId']) {
  return `https://api.orbizy.app/estimate/itens/create/${estimateId}` as const
}

/**
 * @description Create a new estimate item
 * {@link /estimate/itens/create/:estimateId}
 */
export async function postEstimateItensCreateByEstimateId(
  estimateId: PostEstimateItensCreateByEstimateIdPathParams['estimateId'],
  data: PostEstimateItensCreateByEstimateIdMutationRequest,
  config: Partial<RequestConfig<PostEstimateItensCreateByEstimateIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostEstimateItensCreateByEstimateIdMutationResponse,
    ResponseErrorConfig<PostEstimateItensCreateByEstimateId401 | PostEstimateItensCreateByEstimateId404>,
    PostEstimateItensCreateByEstimateIdMutationRequest
  >({ method: 'POST', url: getPostEstimateItensCreateByEstimateIdUrl(estimateId).toString(), data, ...requestConfig })
  return res.data
}