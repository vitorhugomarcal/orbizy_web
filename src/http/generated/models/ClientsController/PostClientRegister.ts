/**
 * @description Cliente cadastrado com sucesso
 */
export type PostClientRegister201 = {
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
export type PostClientRegister400 = {
  /**
   * @type string
   */
  code: string
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type PostClientRegister401 = {
  /**
   * @type string
   */
  code: string
  /**
   * @type string
   */
  message: string
}

/**
 * @description Company not found
 */
export type PostClientRegister404 = {
  /**
   * @type string
   */
  code: string
  /**
   * @type string
   */
  message: string
}

export type PostClientRegisterMutationRequest = {
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

export type PostClientRegisterMutationResponse = PostClientRegister201

export type PostClientRegisterMutation = {
  Response: PostClientRegister201
  Request: PostClientRegisterMutationRequest
  Errors: PostClientRegister400 | PostClientRegister401 | PostClientRegister404
}