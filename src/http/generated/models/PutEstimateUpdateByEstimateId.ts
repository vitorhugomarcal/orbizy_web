export type PutEstimateUpdateByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

export type PutEstimateUpdateByEstimateId201 = {
  /**
   * @description Orçamento atualizado com sucesso
   * @type string
   */
  message: string
  /**
   * @type object
   */
  estimate: {
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
}

export type PutEstimateUpdateByEstimateId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type PutEstimateUpdateByEstimateId404 = {
  /**
   * @description Orçamento não encontrado
   * @type string
   */
  error: string
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