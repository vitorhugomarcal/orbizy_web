export type GetItensEstimateByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

/**
 * @description Itens do orçamento
 */
export type GetItensEstimateByEstimateId200 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type array
   */
  formattedItens: {
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
  }[]
}

/**
 * @description Unauthorized
 */
export type GetItensEstimateByEstimateId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Orçamento não encontrado
 */
export type GetItensEstimateByEstimateId404 = {
  /**
   * @type string
   */
  message: string
}

export type GetItensEstimateByEstimateIdQueryResponse = GetItensEstimateByEstimateId200

export type GetItensEstimateByEstimateIdQuery = {
  Response: GetItensEstimateByEstimateId200
  PathParams: GetItensEstimateByEstimateIdPathParams
  Errors: GetItensEstimateByEstimateId401 | GetItensEstimateByEstimateId404
}