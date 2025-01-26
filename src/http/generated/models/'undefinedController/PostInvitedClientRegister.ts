export type PostInvitedClientRegister200 = any

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

export type PostInvitedClientRegisterMutationResponse = PostInvitedClientRegister200

export type PostInvitedClientRegisterMutation = {
  Response: PostInvitedClientRegister200
  Request: PostInvitedClientRegisterMutationRequest
  Errors: any
}