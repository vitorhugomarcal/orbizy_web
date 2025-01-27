/**
 * @description Orçamentos encontrados
 */
export type GetClientsAll200 = {
  /**
   * @type array
   */
  clients: {
    /**
     * @type string
     */
    id: string
    /**
     * @type string
     */
    type: string
    cpf: string | null
    cnpj: string | null
    /**
     * @type string
     */
    name: string
    company_name: string | null
    /**
     * @type string
     */
    email_address: string
    /**
     * @type string
     */
    phone: string
    /**
     * @type string
     */
    cep: string
    /**
     * @type string
     */
    address: string
    /**
     * @type string
     */
    address_number: string
    /**
     * @type string
     */
    neighborhood: string
    /**
     * @type string
     */
    city: string
    /**
     * @type string
     */
    state: string
    company_id: string | null
    /**
     * @type string
     */
    createdAt: string
    /**
     * @type array
     */
    estimate: {
      /**
       * @type string
       */
      id: string
      /**
       * @type string
       */
      status: string
      /**
       * @type number
       */
      total: number
      /**
       * @type number
       */
      sub_total: number
      /**
       * @type string
       */
      createdAt: string
    }[]
  }[]
}

/**
 * @description Unauthorized
 */
export type GetClientsAll401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Orçamentos não encontrados
 */
export type GetClientsAll404 = {
  /**
   * @type string
   */
  message: string
}

export type GetClientsAllQueryResponse = GetClientsAll200

export type GetClientsAllQuery = {
  Response: GetClientsAll200
  Errors: GetClientsAll401 | GetClientsAll404
}