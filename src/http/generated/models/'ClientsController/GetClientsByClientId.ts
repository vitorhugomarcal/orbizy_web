export type GetClientsByClientIdPathParams = {
  /**
   * @type string
   */
  clientId: string
}

/**
 * @description Cliente encontrado
 */
export type GetClientsByClientId200 = {
  /**
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
  }
}

/**
 * @description ID do cliente não fornecido
 */
export type GetClientsByClientId400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type GetClientsByClientId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Cliente não encontrado
 */
export type GetClientsByClientId404 = {
  /**
   * @type string
   */
  message: string
}

export type GetClientsByClientIdQueryResponse = GetClientsByClientId200

export type GetClientsByClientIdQuery = {
  Response: GetClientsByClientId200
  PathParams: GetClientsByClientIdPathParams
  Errors: GetClientsByClientId400 | GetClientsByClientId401 | GetClientsByClientId404
}