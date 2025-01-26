export type GetItensByItemIdPathParams = {
  /**
   * @type string
   */
  itemId: string
}

export type GetItensByItemId200 = {
  /**
   * @description Item encontrado
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
    id: string
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

export type GetItensByItemId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetItensByItemId404 = {
  /**
   * @description Item não encontrado
   * @type string
   */
  error: string
}

export type GetItensByItemIdQueryResponse = GetItensByItemId200

export type GetItensByItemIdQuery = {
  Response: GetItensByItemId200
  PathParams: GetItensByItemIdPathParams
  Errors: GetItensByItemId401 | GetItensByItemId404
}