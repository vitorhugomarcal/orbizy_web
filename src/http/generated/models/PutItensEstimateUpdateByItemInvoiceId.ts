export type PutItensEstimateUpdateByItemInvoiceIdPathParams = {
  /**
   * @type string
   */
  itemInvoiceId: string
}

export type PutItensEstimateUpdateByItemInvoiceId201 = {
  /**
   * @description Item atualizado com sucesso
   * @type string
   */
  message: string
  /**
   * @type object
   */
  item: {
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
}

export type PutItensEstimateUpdateByItemInvoiceId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type PutItensEstimateUpdateByItemInvoiceId404 = {
  /**
   * @description Item não encontrado no orçamento
   * @type string
   */
  error: string
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