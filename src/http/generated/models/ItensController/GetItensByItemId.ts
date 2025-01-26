export type GetItensByItemIdPathParams = {
  /**
   * @type string
   */
  itemId: string
}

/**
 * @description Item encontrado
 */
export type GetItensByItemId200 = {
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

/**
 * @description Unauthorized
 */
export type GetItensByItemId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Item não encontrado
 */
export type GetItensByItemId404 = {
  /**
   * @type string
   */
  message: string
}

export type GetItensByItemIdQueryResponse = GetItensByItemId200

export type GetItensByItemIdQuery = {
  Response: GetItensByItemId200
  PathParams: GetItensByItemIdPathParams
  Errors: GetItensByItemId401 | GetItensByItemId404
}