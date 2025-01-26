export type PutClientUpdateByClientIdPathParams = {
  /**
   * @type string
   */
  clientId: string
}

/**
 * @description Cliente atualizado com sucesso
 */
export type PutClientUpdateByClientId200 = {
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
  }
}

/**
 * @description Cliente já cadastrado
 */
export type PutClientUpdateByClientId400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type PutClientUpdateByClientId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Cliente não encontrado
 */
export type PutClientUpdateByClientId404 = {
  /**
   * @type string
   */
  message: string
}

export type PutClientUpdateByClientIdMutationRequest = {
  /**
   * @type string | undefined
   */
  type?: string
  /**
   * @type string | undefined
   */
  email_address?: string
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type string | undefined
   */
  company_name?: string
  /**
   * @type string | undefined
   */
  cpf?: string
  /**
   * @type string | undefined
   */
  cnpj?: string
  /**
   * @type string | undefined
   */
  phone?: string
  /**
   * @type string | undefined
   */
  cep?: string
  /**
   * @type string | undefined
   */
  address?: string
  /**
   * @type string | undefined
   */
  address_number?: string
  /**
   * @type string | undefined
   */
  neighborhood?: string
  /**
   * @type string | undefined
   */
  state?: string
  /**
   * @type string | undefined
   */
  city?: string
}

export type PutClientUpdateByClientIdMutationResponse = PutClientUpdateByClientId200

export type PutClientUpdateByClientIdMutation = {
  Response: PutClientUpdateByClientId200
  Request: PutClientUpdateByClientIdMutationRequest
  PathParams: PutClientUpdateByClientIdPathParams
  Errors: PutClientUpdateByClientId400 | PutClientUpdateByClientId401 | PutClientUpdateByClientId404
}