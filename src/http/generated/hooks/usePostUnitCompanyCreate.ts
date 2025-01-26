import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostUnitCompanyCreateMutationRequest,
  PostUnitCompanyCreateMutationResponse,
  PostUnitCompanyCreate400,
  PostUnitCompanyCreate401,
} from '../models/UnitController/PostUnitCompanyCreate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postUnitCompanyCreateMutationKey = () => [{ url: '/unit/company/create' }] as const

export type PostUnitCompanyCreateMutationKey = ReturnType<typeof postUnitCompanyCreateMutationKey>

/**
 * @description Create a new custom unit for a company
 * {@link /unit/company/create}
 */
export async function postUnitCompanyCreate(
  data: PostUnitCompanyCreateMutationRequest,
  config: Partial<RequestConfig<PostUnitCompanyCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostUnitCompanyCreateMutationResponse,
    ResponseErrorConfig<PostUnitCompanyCreate400 | PostUnitCompanyCreate401>,
    PostUnitCompanyCreateMutationRequest
  >({ method: 'POST', url: `/unit/company/create`, baseURL: 'https://api.orbizy.app', data, ...requestConfig })
  return res.data
}

/**
 * @description Create a new custom unit for a company
 * {@link /unit/company/create}
 */
export function usePostUnitCompanyCreate(
  options: {
    mutation?: UseMutationOptions<
      PostUnitCompanyCreateMutationResponse,
      ResponseErrorConfig<PostUnitCompanyCreate400 | PostUnitCompanyCreate401>,
      { data: PostUnitCompanyCreateMutationRequest }
    >
    client?: Partial<RequestConfig<PostUnitCompanyCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postUnitCompanyCreateMutationKey()

  return useMutation<
    PostUnitCompanyCreateMutationResponse,
    ResponseErrorConfig<PostUnitCompanyCreate400 | PostUnitCompanyCreate401>,
    { data: PostUnitCompanyCreateMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postUnitCompanyCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}