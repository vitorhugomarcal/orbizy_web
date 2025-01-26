export type PostEstimateCreateByClientIdPathParams = {
  /**
   * @type string
   */
  clientId: string
}

/**
 * @description Orçamento cadastrado com sucesso
 */
export type PostEstimateCreateByClientId201 = {
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
export type PostEstimateCreateByClientId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Client not found
 */
export type PostEstimateCreateByClientId404 = {
  /**
   * @type string
   */
  message: string
}

export type PostEstimateCreateByClientIdMutationRequest = {
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

export type PostEstimateCreateByClientIdMutationResponse = PostEstimateCreateByClientId201

export type PostEstimateCreateByClientIdMutation = {
  Response: PostEstimateCreateByClientId201
  Request: PostEstimateCreateByClientIdMutationRequest
  PathParams: PostEstimateCreateByClientIdPathParams
  Errors: PostEstimateCreateByClientId401 | PostEstimateCreateByClientId404
}