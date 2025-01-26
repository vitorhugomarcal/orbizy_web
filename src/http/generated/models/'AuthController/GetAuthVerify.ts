export type GetAuthVerifyQueryParams = {
  /**
   * @type string
   */
  code: string
  /**
   * @type string
   */
  redirect: string
}

/**
 * @description Redirecionado com sucesso
 */
export type GetAuthVerify301 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Link inválido ou expirado
 */
export type GetAuthVerify401 = {
  /**
   * @type string
   */
  message: string
}

export type GetAuthVerifyQueryResponse = any

export type GetAuthVerifyQuery = {
  Response: any
  QueryParams: GetAuthVerifyQueryParams
  Errors: GetAuthVerify401
}