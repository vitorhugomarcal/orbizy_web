export type PostClientRegister201 = {
  /**
   * @description Cliente cadastrado com sucesso
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
  }
}

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
}

export type PostClientRegisterMutationResponse = PostClientRegister201

export type PostClientRegisterMutation = {
  Response: PostClientRegister201
  Request: PostClientRegisterMutationRequest
  Errors: PostClientRegister400 | PostClientRegister401
}