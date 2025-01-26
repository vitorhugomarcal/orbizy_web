export type PutSupplierUpdateBySupplierIdPathParams = {
  /**
   * @type string
   */
  supplierId: string
}

/**
 * @description Supplier updated successfully
 */
export type PutSupplierUpdateBySupplierId201 = {
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
 * @description Supplier is already associated with this user
 */
export type PutSupplierUpdateBySupplierId400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type PutSupplierUpdateBySupplierId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Supplier not found
 */
export type PutSupplierUpdateBySupplierId404 = {
  /**
   * @type string
   */
  message: string
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
  Errors: PutSupplierUpdateBySupplierId400 | PutSupplierUpdateBySupplierId401 | PutSupplierUpdateBySupplierId404
}