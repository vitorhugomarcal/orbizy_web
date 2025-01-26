export type PostEstimateItensCreateByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

/**
 * @description Item cadastrado com sucesso
 */
export type PostEstimateItensCreateByEstimateId201 = {
  /**
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

/**
 * @description Unauthorized
 */
export type PostEstimateItensCreateByEstimateId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Orçamento não encontrado
 */
export type PostEstimateItensCreateByEstimateId404 = {
  /**
   * @type string
   */
  message: string
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