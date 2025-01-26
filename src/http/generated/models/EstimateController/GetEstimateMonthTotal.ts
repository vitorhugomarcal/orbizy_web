/**
 * @description Estatísticas do mês obtidas com sucesso
 */
export type GetEstimateMonthTotal200 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type number
   */
  stats: number
}

/**
 * @description Unauthorized
 */
export type GetEstimateMonthTotal401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Orçamentos não encontrados
 */
export type GetEstimateMonthTotal404 = {
  /**
   * @type string
   */
  message: string
}

export type GetEstimateMonthTotalQueryResponse = GetEstimateMonthTotal200

export type GetEstimateMonthTotalQuery = {
  Response: GetEstimateMonthTotal200
  Errors: GetEstimateMonthTotal401 | GetEstimateMonthTotal404
}