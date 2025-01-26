/**
 * @description Sessão criada com sucesso
 */
export type PostSessions201 = {
  /**
   * @type string
   */
  message: string
}

export type PostSessionsMutationRequest = {
  /**
   * @type string
   */
  email: string
}

export type PostSessionsMutationResponse = PostSessions201

export type PostSessionsMutation = {
  Response: PostSessions201
  Request: PostSessionsMutationRequest
  Errors: any
}