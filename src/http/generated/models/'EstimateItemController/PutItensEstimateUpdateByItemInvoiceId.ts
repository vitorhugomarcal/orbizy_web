export type PutItensEstimateUpdateByItemInvoiceIdPathParams = {
  /**
   * @type string
   */
  itemInvoiceId: string
}

/**
 * @description Item atualizado com sucesso
 */
export type PutItensEstimateUpdateByItemInvoiceId201 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type object
   */
  item: {
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
  }
}

/**
 * @description Unauthorized
 */
export type PutItensEstimateUpdateByItemInvoiceId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Item não encontrado no orçamento
 */
export type PutItensEstimateUpdateByItemInvoiceId404 = {
  /**
   * @type string
   */
  message: string
}

export type PutItensEstimateUpdateByItemInvoiceIdMutationRequest = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type number | undefined
   */
  quantity?: number
  /**
   * @type number | undefined
   */
  price?: number
  /**
   * @type string | undefined
   */
  unit?: string
  /**
   * @type number | undefined
   */
  total?: number
}

export type PutItensEstimateUpdateByItemInvoiceIdMutationResponse = PutItensEstimateUpdateByItemInvoiceId201

export type PutItensEstimateUpdateByItemInvoiceIdMutation = {
  Response: PutItensEstimateUpdateByItemInvoiceId201
  Request: PutItensEstimateUpdateByItemInvoiceIdMutationRequest
  PathParams: PutItensEstimateUpdateByItemInvoiceIdPathParams
  Errors: PutItensEstimateUpdateByItemInvoiceId401 | PutItensEstimateUpdateByItemInvoiceId404
}