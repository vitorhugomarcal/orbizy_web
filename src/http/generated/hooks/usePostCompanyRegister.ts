import client from '@kubb/plugin-client/clients/axios'
import type {
  PostCompanyRegisterMutationRequest,
  PostCompanyRegisterMutationResponse,
  PostCompanyRegister400,
  PostCompanyRegister401,
} from "../models/'CompanyController/PostCompanyRegister.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postCompanyRegister } from '../clients/postCompanyRegister.ts'
import { useMutation } from '@tanstack/react-query'

export const postCompanyRegisterMutationKey = () => [{ url: '/company/register' }] as const

export type PostCompanyRegisterMutationKey = ReturnType<typeof postCompanyRegisterMutationKey>

/**
 * @description Register a new company (individual or corporate)
 * {@link /company/register}
 */
export function usePostCompanyRegister(
  options: {
    mutation?: UseMutationOptions<
      PostCompanyRegisterMutationResponse,
      ResponseErrorConfig<PostCompanyRegister400 | PostCompanyRegister401>,
      { data: PostCompanyRegisterMutationRequest }
    >
    client?: Partial<RequestConfig<PostCompanyRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postCompanyRegisterMutationKey()

  return useMutation<
    PostCompanyRegisterMutationResponse,
    ResponseErrorConfig<PostCompanyRegister400 | PostCompanyRegister401>,
    { data: PostCompanyRegisterMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postCompanyRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}