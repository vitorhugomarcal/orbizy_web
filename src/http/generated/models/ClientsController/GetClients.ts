/**
 * @description Clients retrieved successfully
 */
export type GetClients200 = {
  /**
   * @type string
   */
  message: string
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
    /**
     * @type string
     */
    email_address: string
    /**
     * @type string
     */
    name: string
    /**
     * @type string
     */
    company_name: string
    /**
     * @type string
     */
    cpf: string
    /**
     * @type string
     */
    cnpj: string
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
    state: string
    /**
     * @type string
     */
    city: string
    /**
     * @type array
     */
    estimate: {
      /**
       * @type string
       */
      id: string
    }[]
  }[]
}

/**
 * @description Unauthorized
 */
export type GetClients401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Clients not found
 */
export type GetClients404 = {
  /**
   * @type string
   */
  message: string
}

export type GetClientsQueryResponse = GetClients200

export type GetClientsQuery = {
  Response: GetClients200
  Errors: GetClients401 | GetClients404
}