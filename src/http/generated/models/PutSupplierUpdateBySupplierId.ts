export type PutSupplierUpdateBySupplierIdPathParams = {
  /**
   * @type string
   */
  supplierId: string
}

export type PutSupplierUpdateBySupplierId201 = {
  /**
   * @description Supplier updated successfully
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
     * @type string | undefined
     */
    company_name?: string
    /**
     * @type string | undefined
     */
    cnpj?: string
    /**
     * @type string | undefined
     */
    phone?: string
    /**
     * @type string | undefined
     */
    state?: string
    /**
     * @type string | undefined
     */
    city?: string
    /**
     * @type string | undefined
     */
    cep?: string
    /**
     * @type string | undefined
     */
    address_number?: string
    /**
     * @type string | undefined
     */
    email_address?: string
    /**
     * @type string | undefined
     */
    address?: string
    /**
     * @type string | undefined
     */
    neighborhood?: string
  }
}

export type PutSupplierUpdateBySupplierId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type PutSupplierUpdateBySupplierId404 = {
  /**
   * @description Supplier not found
   * @type string
   */
  error: string
}

export type PutSupplierUpdateBySupplierIdMutationRequest = {
  /**
   * @type string | undefined
   */
  company_name?: string
  /**
   * @type string | undefined
   */
  cnpj?: string
  /**
   * @type string | undefined
   */
  phone?: string
  /**
   * @type string | undefined
   */
  state?: string
  /**
   * @type string | undefined
   */
  city?: string
  /**
   * @type string | undefined
   */
  cep?: string
  /**
   * @type string | undefined
   */
  address_number?: string
  /**
   * @type string | undefined
   */
  email_address?: string
  /**
   * @type string | undefined
   */
  address?: string
  /**
   * @type string | undefined
   */
  neighborhood?: string
}

export type PutSupplierUpdateBySupplierIdMutationResponse = PutSupplierUpdateBySupplierId201

export type PutSupplierUpdateBySupplierIdMutation = {
  Response: PutSupplierUpdateBySupplierId201
  Request: PutSupplierUpdateBySupplierIdMutationRequest
  PathParams: PutSupplierUpdateBySupplierIdPathParams
  Errors: PutSupplierUpdateBySupplierId401 | PutSupplierUpdateBySupplierId404
}