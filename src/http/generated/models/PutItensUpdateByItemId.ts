export type PutItensUpdateByItemIdPathParams = {
  /**
   * @type string
   */
  itemId: string
}

export type PutItensUpdateByItemId201 = {
  /**
   * @description Item atualizado com sucesso
   * @type string
   */
  message: string
  /**
   * @type object
   */
  formattedItem: {
    /**
     * @type string | undefined
     */
    name?: string
    /**
     * @type number | undefined
     */
    price?: number
    /**
     * @type string | undefined
     */
    description?: string
    /**
     * @type string | undefined
     */
    unit?: string
  }
}

export type PutItensUpdateByItemId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type PutItensUpdateByItemId404 = {
  /**
   * @description Item não encontrado
   * @type string
   */
  error: string
}

export type PutItensUpdateByItemIdMutationRequest = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type number | undefined
   */
  price?: number
  /**
   * @type string | undefined
   */
  description?: string
  /**
   * @type string | undefined
   */
  unit?: string
}

export type PutItensUpdateByItemIdMutationResponse = PutItensUpdateByItemId201

export type PutItensUpdateByItemIdMutation = {
  Response: PutItensUpdateByItemId201
  Request: PutItensUpdateByItemIdMutationRequest
  PathParams: PutItensUpdateByItemIdPathParams
  Errors: PutItensUpdateByItemId401 | PutItensUpdateByItemId404
}