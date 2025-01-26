export type PutCompanyUpdateByCompanyIdPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type PutCompanyUpdateByCompanyId201 = {
  /**
   * @description Empresa atualizada com sucesso
   * @type string
   */
  message: string
  /**
   * @type object
   */
  company: {
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
    state?: string
    /**
     * @type string | undefined
     */
    city?: string
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
    neighborhood?: string
    /**
     * @type string | undefined
     */
    address_number?: string
    /**
     * @type string | undefined
     */
    company_name?: string
    /**
     * @type string | undefined
     */
    owner_id?: string
  }
}

export type PutCompanyUpdateByCompanyId400 = {
  /**
   * @description Invalid request
   * @type string
   */
  code: string
  /**
   * @description Invalid request
   * @type string
   */
  message: string
}

export type PutCompanyUpdateByCompanyId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  code: string
  /**
   * @description Unauthorized
   * @type string
   */
  message: string
}

export type PutCompanyUpdateByCompanyId404 = {
  /**
   * @description Company not found
   * @type string
   */
  code: string
  /**
   * @description Company not found
   * @type string
   */
  message: string
}

export type PutCompanyUpdateByCompanyIdMutationRequest = {
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
  state?: string
  /**
   * @type string | undefined
   */
  city?: string
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
  neighborhood?: string
  /**
   * @type string | undefined
   */
  address_number?: string
  /**
   * @type string | undefined
   */
  company_name?: string
  /**
   * @type string | undefined
   */
  owner_id?: string
}

export type PutCompanyUpdateByCompanyIdMutationResponse = PutCompanyUpdateByCompanyId201

export type PutCompanyUpdateByCompanyIdMutation = {
  Response: PutCompanyUpdateByCompanyId201
  Request: PutCompanyUpdateByCompanyIdMutationRequest
  PathParams: PutCompanyUpdateByCompanyIdPathParams
  Errors: PutCompanyUpdateByCompanyId400 | PutCompanyUpdateByCompanyId401 | PutCompanyUpdateByCompanyId404
}