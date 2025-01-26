export type GetClients200 = {
  /**
   * @description Clients retrieved successfully
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
    company_name: string | null
    cpf: string | null
    cnpj: string | null
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

export type GetClients401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetClientsQueryResponse = GetClients200

export type GetClientsQuery = {
  Response: GetClients200
  Errors: GetClients401
}