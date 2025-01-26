export type GetSupplierCompanyBySupplierIdPathParams = {
  /**
   * @type string
   */
  supplierId: string
}

export type GetSupplierCompanyBySupplierId200 = {
  /**
   * @description Supplier found successfully
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

export type GetSupplierCompanyBySupplierId400 = {
  /**
   * @description Supplier ID is required
   * @type string
   */
  error: string
}

export type GetSupplierCompanyBySupplierId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetSupplierCompanyBySupplierId404 = {
  /**
   * @description Supplier not found
   * @type string
   */
  error: string
}

export type GetSupplierCompanyBySupplierIdQueryResponse = GetSupplierCompanyBySupplierId200

export type GetSupplierCompanyBySupplierIdQuery = {
  Response: GetSupplierCompanyBySupplierId200
  PathParams: GetSupplierCompanyBySupplierIdPathParams
  Errors: GetSupplierCompanyBySupplierId400 | GetSupplierCompanyBySupplierId401 | GetSupplierCompanyBySupplierId404
}