/**
 * @description Supplier created successfully
 */
export type PostSupplierRegister201 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type object
   */
  supplier: {
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
}

/**
 * @description Supplier is already associated with this user
 */
export type PostSupplierRegister400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type PostSupplierRegister401 = {
  /**
   * @type string
   */
  message: string
}

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

export type PostSupplierRegisterMutationResponse = PostSupplierRegister201

export type PostSupplierRegisterMutation = {
  Response: PostSupplierRegister201
  Request: PostSupplierRegisterMutationRequest
  Errors: PostSupplierRegister400 | PostSupplierRegister401
}