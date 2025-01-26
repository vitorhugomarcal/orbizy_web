export type GetEstimate200 = {
  /**
   * @description Orçamentos encontrados
   * @type string
   */
  message: string
  /**
   * @type array
   */
  formattedEstimates: {
    estimate_number: string | null
    status: string | null
    notes: string | null
    sub_total: number | null
    total: number | null
    client_id: string | null
  }[]
}

export type GetEstimate401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetEstimate404 = {
  /**
   * @description Orçamentos não encontrados
   * @type string
   */
  error: string
}

export type GetEstimateQueryResponse = GetEstimate200

export type GetEstimateQuery = {
  Response: GetEstimate200
  Errors: GetEstimate401 | GetEstimate404
}