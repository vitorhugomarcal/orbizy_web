export type PutMeUpdate201 = {
  /**
   * @description User updated successfully
   * @type string
   */
  message: string
  /**
   * @type object
   */
  userUpdated: {
    /**
     * @type string | undefined
     */
    id?: string
    /**
     * @type string | undefined
     */
    name?: string
    /**
     * @type string | undefined
     */
    email?: string
    company_id: string | null
    /**
     * @type string | undefined
     */
    type?: string
    /**
     * @type string | undefined
     */
    role?: string
  }
}

export type PutMeUpdate401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type PutMeUpdateMutationRequest = {
  /**
   * @type string | undefined
   */
  name?: string
}

export type PutMeUpdateMutationResponse = PutMeUpdate201

export type PutMeUpdateMutation = {
  Response: PutMeUpdate201
  Request: PutMeUpdateMutationRequest
  Errors: PutMeUpdate401
}