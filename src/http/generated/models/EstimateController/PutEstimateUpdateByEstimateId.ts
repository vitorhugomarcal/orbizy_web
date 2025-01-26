export type PutEstimateUpdateByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

/**
 * @description Orçamento atualizado com sucesso
 */
export type PutEstimateUpdateByEstimateId201 = {
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
  }
}

/**
 * @description Unauthorized
 */
export type PutEstimateUpdateByEstimateId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Orçamento não encontrado
 */
export type PutEstimateUpdateByEstimateId404 = {
  /**
   * @type string
   */
  message: string
}

export type PutEstimateUpdateByEstimateIdMutationRequest = {
  /**
   * @type string | undefined
   */
  estimate_number?: string
  /**
   * @type string | undefined
   */
  status?: string
  /**
   * @type string | undefined
   */
  notes?: string
  /**
   * @type number | undefined
   */
  sub_total?: number
  /**
   * @type number | undefined
   */
  total?: number
}

export type PutEstimateUpdateByEstimateIdMutationResponse = PutEstimateUpdateByEstimateId201

export type PutEstimateUpdateByEstimateIdMutation = {
  Response: PutEstimateUpdateByEstimateId201
  Request: PutEstimateUpdateByEstimateIdMutationRequest
  PathParams: PutEstimateUpdateByEstimateIdPathParams
  Errors: PutEstimateUpdateByEstimateId401 | PutEstimateUpdateByEstimateId404
}