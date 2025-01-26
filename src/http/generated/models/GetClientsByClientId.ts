export type GetClientsByClientIdPathParams = {
  /**
   * @type string
   */
  clientId: string
}

export type GetClientsByClientId200 = {
  /**
   * @description Cliente encontrado
   * @type string
   */
  message: string
  /**
   * @type object
   */
  client: {
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
  }
}

export type GetClientsByClientId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetClientsByClientId404 = {
  /**
   * @description Cliente não encontrado
   * @type string
   */
  error: string
}

export type GetClientsByClientIdQueryResponse = GetClientsByClientId200

export type GetClientsByClientIdQuery = {
  Response: GetClientsByClientId200
  PathParams: GetClientsByClientIdPathParams
  Errors: GetClientsByClientId401 | GetClientsByClientId404
}