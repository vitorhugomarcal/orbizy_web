/**
 * @description Itens found successfully
 */
export type GetItens200 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type array
   */
  formattedItens: {
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
  }[]
}

/**
 * @description Unauthorized
 */
export type GetItens401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Itens not found
 */
export type GetItens404 = {
  /**
   * @type string
   */
  message: string
}

export type GetItensQueryResponse = GetItens200

export type GetItensQuery = {
  Response: GetItens200
  Errors: GetItens401 | GetItens404
}