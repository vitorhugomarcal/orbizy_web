export type PostCompanyRegister200 = any

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

export type PostCompanyRegisterMutationResponse = PostCompanyRegister200

export type PostCompanyRegisterMutation = {
  Response: PostCompanyRegister200
  Request: PostCompanyRegisterMutationRequest
  Errors: any
}