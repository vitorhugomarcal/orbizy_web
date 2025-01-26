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

export type GetAuthVerify200 = any

export type GetAuthVerifyQueryResponse = GetAuthVerify200

export type GetAuthVerifyQuery = {
  Response: GetAuthVerify200
  QueryParams: GetAuthVerifyQueryParams
  Errors: any
}