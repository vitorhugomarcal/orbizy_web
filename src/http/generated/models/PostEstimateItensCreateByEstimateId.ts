export type PostEstimateItensCreateByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

export type PostEstimateItensCreateByEstimateId201 = {
  /**
   * @description Item cadastrado com sucesso
   * @type string
   */
  message: string
  /**
   * @type object
   */
  item: {
    /**
     * @type string
     */
    id: string
    /**
     * @type string
     */
    name: string
    /**
     * @type number
     */
    quantity: number
    /**
     * @type number
     */
    price: number
    /**
     * @type string
     */
    unit: string
    /**
     * @type number
     */
    total: number
  }
}

export type PostEstimateItensCreateByEstimateId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type PostEstimateItensCreateByEstimateId404 = {
  /**
   * @description Orçamento não encontrado
   * @type string
   */
  error: string
}

export type PostEstimateItensCreateByEstimateIdMutationRequest = {
  /**
   * @type string
   */
  name: string
  /**
   * @type number
   */
  quantity: number
  /**
   * @type number
   */
  price: number
  /**
   * @type string
   */
  unit: string
  /**
   * @type number
   */
  total: number
}

export type PostEstimateItensCreateByEstimateIdMutationResponse = PostEstimateItensCreateByEstimateId201

export type PostEstimateItensCreateByEstimateIdMutation = {
  Response: PostEstimateItensCreateByEstimateId201
  Request: PostEstimateItensCreateByEstimateIdMutationRequest
  PathParams: PostEstimateItensCreateByEstimateIdPathParams
  Errors: PostEstimateItensCreateByEstimateId401 | PostEstimateItensCreateByEstimateId404
}