/**
 * @description Estatísticas do mês obtidas com sucesso
 */
export type GetEstimateMonth200 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type object
   */
  stats: {
    /**
     * @type number
     */
    total: number
    /**
     * @type number
     */
    percentageChange: number
  }
}

/**
 * @description Unauthorized
 */
export type GetEstimateMonth401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Orçamentos não encontrados
 */
export type GetEstimateMonth404 = {
  /**
   * @type string
   */
  message: string
}

export type GetEstimateMonthQueryResponse = GetEstimateMonth200

export type GetEstimateMonthQuery = {
  Response: GetEstimateMonth200
  Errors: GetEstimateMonth401 | GetEstimateMonth404
}