export type PutItensUpdateByItemIdPathParams = {
  /**
   * @type string
   */
  itemId: string
}

export type PutItensUpdateByItemId200 = any

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

export type PutItensUpdateByItemIdMutationResponse = PutItensUpdateByItemId200

export type PutItensUpdateByItemIdMutation = {
  Response: PutItensUpdateByItemId200
  Request: PutItensUpdateByItemIdMutationRequest
  PathParams: PutItensUpdateByItemIdPathParams
  Errors: any
}