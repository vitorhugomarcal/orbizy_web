/**
 * @description Estatísticas dos meses obtidas com sucesso
 */
export type GetEstimateChart200 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type array
   */
  stats: {
    /**
     * @type string
     */
    month: string
    /**
     * @type number
     */
    monthTotal: number
  }[]
}

/**
 * @description Unauthorized
 */
export type GetEstimateChart401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Orçamentos não encontrados
 */
export type GetEstimateChart404 = {
  /**
   * @type string
   */
  message: string
}

export type GetEstimateChartQueryResponse = GetEstimateChart200

export type GetEstimateChartQuery = {
  Response: GetEstimateChart200
  Errors: GetEstimateChart401 | GetEstimateChart404
}