/**
 * @description Cliente cadastrado com sucesso
 */
export type PostInvitedClientRegister201 = {
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
  }
}

/**
 * @description Cliente já cadastrado
 */
export type PostInvitedClientRegister400 = {
  /**
   * @type string
   */
  message: string
}

export type PostInvitedClientRegisterMutationRequest = {
  /**
   * @type string
   */
  code: string
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

export type PostInvitedClientRegisterMutationResponse = PostInvitedClientRegister201

export type PostInvitedClientRegisterMutation = {
  Response: PostInvitedClientRegister201
  Request: PostInvitedClientRegisterMutationRequest
  Errors: PostInvitedClientRegister400
}