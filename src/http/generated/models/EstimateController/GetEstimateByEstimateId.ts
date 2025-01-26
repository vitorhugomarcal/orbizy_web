export type GetEstimateByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

/**
 * @description Orçamento encontrado
 */
export type GetEstimateByEstimateId200 = {
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
    client_id: string
  }
}

/**
 * @description Unauthorized
 */
export type GetEstimateByEstimateId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Orçamento não encontrado
 */
export type GetEstimateByEstimateId404 = {
  /**
   * @type string
   */
  message: string
}

export type GetEstimateByEstimateIdQueryResponse = GetEstimateByEstimateId200

export type GetEstimateByEstimateIdQuery = {
  Response: GetEstimateByEstimateId200
  PathParams: GetEstimateByEstimateIdPathParams
  Errors: GetEstimateByEstimateId401 | GetEstimateByEstimateId404
}