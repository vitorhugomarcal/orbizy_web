/**
 * @description Suppliers found successfully
 */
export type GetSupplierCompany200 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type array
   */
  suppliers: {
    /**
     * @type string
     */
    id: string
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
  }[]
}

/**
 * @description Unauthorized
 */
export type GetSupplierCompany401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Company not found
 */
export type GetSupplierCompany404 = {
  /**
   * @type string
   */
  message: string
}

export type GetSupplierCompanyQueryResponse = GetSupplierCompany200

export type GetSupplierCompanyQuery = {
  Response: GetSupplierCompany200
  Errors: GetSupplierCompany401 | GetSupplierCompany404
}