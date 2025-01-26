/**
 * @description Unit created successfully
 */
export type PostUnitCreate201 = {
  /**
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

/**
 * @description Item já cadastrado
 */
export type PostUnitCreate400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type PostUnitCreate401 = {
  /**
   * @type string
   */
  message: string
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