export type GetItens200 = {
  /**
   * @description Itens found successfully
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

export type GetItens401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetItens404 = {
  /**
   * @description Itens not found
   * @type string
   */
  error: string
}

export type GetItensQueryResponse = GetItens200

export type GetItensQuery = {
  Response: GetItens200
  Errors: GetItens401 | GetItens404
}