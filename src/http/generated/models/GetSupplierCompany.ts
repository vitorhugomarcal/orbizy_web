export type GetSupplierCompany200 = {
  /**
   * @description Suppliers found successfully
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

export type GetSupplierCompany401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetSupplierCompany404 = {
  /**
   * @description Company not found
   * @type string
   */
  error: string
}

export type GetSupplierCompanyQueryResponse = GetSupplierCompany200

export type GetSupplierCompanyQuery = {
  Response: GetSupplierCompany200
  Errors: GetSupplierCompany401 | GetSupplierCompany404
}