/**
 * @description Orçamentos encontrados
 */
export type GetEstimate200 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type array
   */
  estimates: {
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
    /**
     * @type string
     */
    createdAt: string
  }[]
}

/**
 * @description Unauthorized
 */
export type GetEstimate401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Orçamentos não encontrados
 */
export type GetEstimate404 = {
  /**
   * @type string
   */
  message: string
}

export type GetEstimateQueryResponse = GetEstimate200

export type GetEstimateQuery = {
  Response: GetEstimate200
  Errors: GetEstimate401 | GetEstimate404
}