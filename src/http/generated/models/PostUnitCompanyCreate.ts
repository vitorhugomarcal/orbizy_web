export type PostUnitCompanyCreate201 = {
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

export type PostUnitCompanyCreate400 = {
  /**
   * @description Item já cadastrado
   * @type string
   */
  error: string
}

export type PostUnitCompanyCreate401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
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