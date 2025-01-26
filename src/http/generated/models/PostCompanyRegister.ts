export type PostCompanyRegister201 = {
  /**
   * @description Cliente cadastrado com sucesso
   * @type string
   */
  message: string
  /**
   * @type object
   */
  company: {
    /**
     * @type string
     */
    id: string
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
    state: string
    /**
     * @type string
     */
    city: string
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
    neighborhood: string
    /**
     * @type string
     */
    address_number: string
    /**
     * @type string
     */
    company_name: string
    /**
     * @type string
     */
    owner_id: string
    createdAt: string | string | number
  }
}

export type PostCompanyRegister400 = {
  /**
   * @description Company already exists
   * @type string
   */
  code: string
  /**
   * @description Company already exists
   * @type string
   */
  message: string
}

export type PostCompanyRegister401 = {
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

export type PostCompanyRegisterMutationRequest = {
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
  state: string
  /**
   * @type string
   */
  city: string
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
  neighborhood: string
  /**
   * @type string
   */
  address_number: string
  /**
   * @type string
   */
  company_name: string
  /**
   * @type string
   */
  owner_id: string
}

export type PostCompanyRegisterMutationResponse = PostCompanyRegister201

export type PostCompanyRegisterMutation = {
  Response: PostCompanyRegister201
  Request: PostCompanyRegisterMutationRequest
  Errors: PostCompanyRegister400 | PostCompanyRegister401
}