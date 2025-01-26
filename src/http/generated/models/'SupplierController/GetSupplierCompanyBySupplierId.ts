export type GetSupplierCompanyBySupplierIdPathParams = {
  /**
   * @type string
   */
  supplierId: string
}

/**
 * @description Supplier found successfully
 */
export type GetSupplierCompanyBySupplierId200 = {
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
  }
}

/**
 * @description Supplier ID is required
 */
export type GetSupplierCompanyBySupplierId400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type GetSupplierCompanyBySupplierId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Supplier not found
 */
export type GetSupplierCompanyBySupplierId404 = {
  /**
   * @type string
   */
  message: string
}

export type GetSupplierCompanyBySupplierIdQueryResponse = GetSupplierCompanyBySupplierId200

export type GetSupplierCompanyBySupplierIdQuery = {
  Response: GetSupplierCompanyBySupplierId200
  PathParams: GetSupplierCompanyBySupplierIdPathParams
  Errors: GetSupplierCompanyBySupplierId400 | GetSupplierCompanyBySupplierId401 | GetSupplierCompanyBySupplierId404
}