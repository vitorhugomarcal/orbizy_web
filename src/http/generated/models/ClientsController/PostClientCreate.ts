/**
 * @description Cliente cadastrado com sucesso
 */
export type PostClientCreate201 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Cliente já cadastrado
 */
export type PostClientCreate400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type PostClientCreate401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Company not found
 */
export type PostClientCreate404 = {
  /**
   * @type string
   */
  message: string
}

export type PostClientCreateMutationRequest = {
  /**
   * @type string
   */
  type: string
  /**
   * @type string
   */
  email_address: string
  /**
   * @type string
   */
  name: string
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
   * @type string
   */
  phone: string
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
  address_number: string
  /**
   * @type string
   */
  neighborhood: string
  /**
   * @type string
   */
  state: string
  /**
   * @type string
   */
  city: string
}

export type PostClientCreateMutationResponse = PostClientCreate201

export type PostClientCreateMutation = {
  Response: PostClientCreate201
  Request: PostClientCreateMutationRequest
  Errors: PostClientCreate400 | PostClientCreate401 | PostClientCreate404
}