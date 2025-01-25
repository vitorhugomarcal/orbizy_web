export type PostEstimateCreatePathParams = {
  /**
   * @type string
   */
  clientId: string
}

export type PostEstimateCreate200 = any

export type PostEstimateCreateMutationRequest = {
  /**
   * @type string
   */
  estimate_number: string
  /**
   * @type string
   */
  status: string
  /**
   * @type string
   */
  notes: string
  /**
   * @type number
   */
  sub_total: number
  /**
   * @type number
   */
  total: number
}

export type PostEstimateCreateMutationResponse = PostEstimateCreate200

export type PostEstimateCreateMutation = {
  Response: PostEstimateCreate200
  Request: PostEstimateCreateMutationRequest
  PathParams: PostEstimateCreatePathParams
  Errors: any
}