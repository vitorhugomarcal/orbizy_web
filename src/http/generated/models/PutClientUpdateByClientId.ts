export type PutClientUpdateByClientIdPathParams = {
  /**
   * @type string
   */
  clientId: string
}

export type PutClientUpdateByClientId200 = any

export type PutClientUpdateByClientIdMutationRequest = {
  /**
   * @type string | undefined
   */
  type?: string
  /**
   * @type string | undefined
   */
  email_address?: string
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type string | undefined
   */
  company_name?: string
  /**
   * @type string | undefined
   */
  cpf?: string
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
  cep?: string
  /**
   * @type string | undefined
   */
  address?: string
  /**
   * @type string | undefined
   */
  address_number?: string
  /**
   * @type string | undefined
   */
  neighborhood?: string
  /**
   * @type string | undefined
   */
  state?: string
  /**
   * @type string | undefined
   */
  city?: string
}

export type PutClientUpdateByClientIdMutationResponse = PutClientUpdateByClientId200

export type PutClientUpdateByClientIdMutation = {
  Response: PutClientUpdateByClientId200
  Request: PutClientUpdateByClientIdMutationRequest
  PathParams: PutClientUpdateByClientIdPathParams
  Errors: any
}