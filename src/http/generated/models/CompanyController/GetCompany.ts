/**
 * @description Company found
 */
export type GetCompany200 = {
  /**
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
  }
}

/**
 * @description Company not found
 */
export type GetCompany400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type GetCompany401 = {
  /**
   * @type string
   */
  message: string
}

export type GetCompanyQueryResponse = GetCompany200

export type GetCompanyQuery = {
  Response: GetCompany200
  Errors: GetCompany400 | GetCompany401
}