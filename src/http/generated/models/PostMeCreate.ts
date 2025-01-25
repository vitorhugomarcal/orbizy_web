export type PostMeCreate200 = any

export type PostMeCreateMutationRequest = {
  /**
   * @type string
   */
  name: string
  /**
   * @type string
   */
  email: string
}

export type PostMeCreateMutationResponse = PostMeCreate200

export type PostMeCreateMutation = {
  Response: PostMeCreate200
  Request: PostMeCreateMutationRequest
  Errors: any
}