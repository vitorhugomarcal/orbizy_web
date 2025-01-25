export type PostSupplierRegister200 = any

export type PostSupplierRegisterMutationRequest = {
  /**
   * @type string
   */
  company_name: string
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
  address_number: string
  /**
   * @type string
   */
  email_address: string
  /**
   * @type string
   */
  address: string
  /**
   * @type string
   */
  neighborhood: string
}

export type PostSupplierRegisterMutationResponse = PostSupplierRegister200

export type PostSupplierRegisterMutation = {
  Response: PostSupplierRegister200
  Request: PostSupplierRegisterMutationRequest
  Errors: any
}