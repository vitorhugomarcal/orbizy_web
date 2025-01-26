export type PostEstimateCreatePathParams = {
  /**
   * @type string
   */
  clientId: string
}

/**
 * @description Orçamento cadastrado com sucesso
 */
export type PostEstimateCreate201 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type object
   */
  estimate: {
    /**
     * @type string
     */
    id: string
    /**
     * @type string
     */
    company_id: string
    /**
     * @type string
     */
    client_id: string
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
    /**
     * @type string
     */
    createdAt: string
  }
}

/**
 * @description Unauthorized
 */
export type PostEstimateCreate401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Client not found
 */
export type PostEstimateCreate404 = {
  /**
   * @type string
   */
  message: string
}

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

export type PostEstimateCreateMutationResponse = PostEstimateCreate201

export type PostEstimateCreateMutation = {
  Response: PostEstimateCreate201
  Request: PostEstimateCreateMutationRequest
  PathParams: PostEstimateCreatePathParams
  Errors: PostEstimateCreate401 | PostEstimateCreate404
}