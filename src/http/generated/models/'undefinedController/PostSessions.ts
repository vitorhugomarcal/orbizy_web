export type PostSessions200 = any

export type PostSessionsMutationRequest = {
  /**
   * @type string
   */
  email: string
}

export type PostSessionsMutationResponse = PostSessions200

export type PostSessionsMutation = {
  Response: PostSessions200
  Request: PostSessionsMutationRequest
  Errors: any
}