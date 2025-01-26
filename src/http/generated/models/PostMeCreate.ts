export type PostMeCreate201 = {
  /**
   * @description User created successfully
   * @type string
   */
  message: string
  /**
   * @type object
   */
  user: {
    /**
     * @type string
     */
    id: string
    /**
     * @type string
     */
    name: string
    /**
     * @type string
     */
    email: string
    /**
     * @type string
     */
    type: string
    /**
     * @type string
     */
    role: string
  }
}

export type PostMeCreate400 = {
  /**
   * @description User already exists
   * @type string
   */
  message: string
}

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

export type PostMeCreateMutationResponse = PostMeCreate201

export type PostMeCreateMutation = {
  Response: PostMeCreate201
  Request: PostMeCreateMutationRequest
  Errors: PostMeCreate400
}