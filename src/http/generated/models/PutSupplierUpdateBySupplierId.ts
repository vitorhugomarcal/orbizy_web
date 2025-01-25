export type PutSupplierUpdateBySupplierIdPathParams = {
  /**
   * @type string
   */
  supplierId: string
}

export type PutSupplierUpdateBySupplierId200 = any

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

export type PutSupplierUpdateBySupplierIdMutationResponse = PutSupplierUpdateBySupplierId200

export type PutSupplierUpdateBySupplierIdMutation = {
  Response: PutSupplierUpdateBySupplierId200
  Request: PutSupplierUpdateBySupplierIdMutationRequest
  PathParams: PutSupplierUpdateBySupplierIdPathParams
  Errors: any
}