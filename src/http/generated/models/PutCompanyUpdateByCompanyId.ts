export type PutCompanyUpdateByCompanyIdPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type PutCompanyUpdateByCompanyId200 = any

export type PutCompanyUpdateByCompanyIdMutationRequest = {
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
  address?: string
  /**
   * @type string | undefined
   */
  neighborhood?: string
  /**
   * @type string | undefined
   */
  address_number?: string
  /**
   * @type string | undefined
   */
  company_name?: string
  /**
   * @type string | undefined
   */
  owner_id?: string
}

export type PutCompanyUpdateByCompanyIdMutationResponse = PutCompanyUpdateByCompanyId200

export type PutCompanyUpdateByCompanyIdMutation = {
  Response: PutCompanyUpdateByCompanyId200
  Request: PutCompanyUpdateByCompanyIdMutationRequest
  PathParams: PutCompanyUpdateByCompanyIdPathParams
  Errors: any
}