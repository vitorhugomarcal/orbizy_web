import client from '@kubb/plugin-client/clients/axios'
import type {
  PostSupplierRegisterMutationRequest,
  PostSupplierRegisterMutationResponse,
  PostSupplierRegister400,
  PostSupplierRegister401,
} from '../models/SupplierController/PostSupplierRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostSupplierRegisterUrl() {
  return `https://api.orbizy.app/supplier/register` as const
}

/**
 * @description Create a new supplier
 * {@link /supplier/register}
 */
export async function postSupplierRegister(
  data: PostSupplierRegisterMutationRequest,
  config: Partial<RequestConfig<PostSupplierRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostSupplierRegisterMutationResponse,
    ResponseErrorConfig<PostSupplierRegister400 | PostSupplierRegister401>,
    PostSupplierRegisterMutationRequest
  >({ method: 'POST', url: getPostSupplierRegisterUrl().toString(), data, ...requestConfig })
  return res.data
}