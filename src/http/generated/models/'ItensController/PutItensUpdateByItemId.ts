export type PutItensUpdateByItemIdPathParams = {
  /**
   * @type string
   */
  itemId: string
}

/**
 * @description Item atualizado com sucesso
 */
export type PutItensUpdateByItemId201 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type object
   */
  formattedItem: {
    /**
     * @type string
     */
    name: string
    /**
     * @type number
     */
    price: number
    /**
     * @type string
     */
    description: string
    /**
     * @type string
     */
    unit: string
  }
}

/**
 * @description Unauthorized
 */
export type PutItensUpdateByItemId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Item não encontrado
 */
export type PutItensUpdateByItemId404 = {
  /**
   * @type string
   */
  message: string
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