export type PostAuthMagicLink200 = any

export type PostAuthMagicLinkMutationRequest = {
  /**
   * @type string, email
   */
  email: string
}

export type PostAuthMagicLinkMutationResponse = PostAuthMagicLink200

export type PostAuthMagicLinkMutation = {
  Response: PostAuthMagicLink200
  Request: PostAuthMagicLinkMutationRequest
  Errors: any
}