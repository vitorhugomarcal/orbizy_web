export type PostUnitCreate201 = {
  /**
   * @description Unit created successfully
   * @type string
   */
  message: string
  /**
   * @type object
   */
  unit: {
    /**
     * @type string
     */
    name: string
  }
}

export type PostUnitCreate400 = {
  /**
   * @description Item já cadastrado
   * @type string
   */
  error: string
}

export type PostUnitCreate401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type PostUnitCreateMutationRequest = {
  /**
   * @type string
   */
  name: string
}

export type PostUnitCreateMutationResponse = PostUnitCreate201

export type PostUnitCreateMutation = {
  Response: PostUnitCreate201
  Request: PostUnitCreateMutationRequest
  Errors: PostUnitCreate400 | PostUnitCreate401
}