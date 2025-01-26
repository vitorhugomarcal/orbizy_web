/**
 * @description Link de autenticação enviado com sucesso
 */
export type PostAuthMagicLink201 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Erro ao enviar link de autenticação
 */
export type PostAuthMagicLink400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Email não encontrado
 */
export type PostAuthMagicLink404 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Limite de requisições excedido
 */
export type PostAuthMagicLink429 = {
  /**
   * @type string
   */
  message: string
}

export type PostAuthMagicLinkMutationRequest = {
  /**
   * @type string, email
   */
  email: string
}

export type PostAuthMagicLinkMutationResponse = PostAuthMagicLink201

export type PostAuthMagicLinkMutation = {
  Response: PostAuthMagicLink201
  Request: PostAuthMagicLinkMutationRequest
  Errors: PostAuthMagicLink400 | PostAuthMagicLink404 | PostAuthMagicLink429
}