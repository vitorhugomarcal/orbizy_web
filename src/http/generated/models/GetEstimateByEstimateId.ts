export type GetEstimateByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

export type GetEstimateByEstimateId200 = {
  /**
   * @description Orçamento encontrado
   * @type string
   */
  message: string
  /**
   * @type object
   */
  formattedEstimate: {
    estimate_number: string | null
    status: string | null
    notes: string | null
    sub_total: number | null
    total: number | null
    client_id: string | null
  }
}

export type GetEstimateByEstimateId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetEstimateByEstimateId404 = {
  /**
   * @description Orçamento não encontrado
   * @type string
   */
  error: string
}

export type GetEstimateByEstimateIdQueryResponse = GetEstimateByEstimateId200

export type GetEstimateByEstimateIdQuery = {
  Response: GetEstimateByEstimateId200
  PathParams: GetEstimateByEstimateIdPathParams
  Errors: GetEstimateByEstimateId401 | GetEstimateByEstimateId404
}