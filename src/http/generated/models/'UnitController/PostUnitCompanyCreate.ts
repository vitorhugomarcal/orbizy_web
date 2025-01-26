/**
 * @description Unit created successfully
 */
export type PostUnitCompanyCreate201 = {
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
export type PostUnitCompanyCreate400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type PostUnitCompanyCreate401 = {
  /**
   * @type string
   */
  message: string
}

export type PostUnitCompanyCreateMutationRequest = {
  /**
   * @type string
   */
  name: string
}

export type PostUnitCompanyCreateMutationResponse = PostUnitCompanyCreate201

export type PostUnitCompanyCreateMutation = {
  Response: PostUnitCompanyCreate201
  Request: PostUnitCompanyCreateMutationRequest
  Errors: PostUnitCompanyCreate400 | PostUnitCompanyCreate401
}