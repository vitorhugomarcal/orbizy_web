export type PostEstimateCreatePathParams = {
  /**
   * @type string
   */
  clientId: string
}

export type PostEstimateCreate201 = {
  /**
   * @description Orçamento cadastrado com sucesso
   * @type string
   */
  message: string
  /**
   * @type object
   */
  formattedEstimate: {
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
    created_at: string
    /**
     * @type string
     */
    updated_at: string
  }
}

export type PostEstimateCreate401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type PostEstimateCreate404 = {
  /**
   * @description Client not found
   * @type string
   */
  error: string
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