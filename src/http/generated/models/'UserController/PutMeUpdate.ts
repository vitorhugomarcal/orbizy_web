export const userUpdatedTypeEnum = {
  basic: 'basic',
  team: 'team',
  pro: 'pro',
} as const

export type UserUpdatedTypeEnum = (typeof userUpdatedTypeEnum)[keyof typeof userUpdatedTypeEnum]

export const userUpdatedRoleEnum = {
  MASTER: 'MASTER',
  BASIC: 'BASIC',
} as const

export type UserUpdatedRoleEnum = (typeof userUpdatedRoleEnum)[keyof typeof userUpdatedRoleEnum]

/**
 * @description User updated successfully
 */
export type PutMeUpdate201 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type object
   */
  userUpdated: {
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
    company_id: string
    /**
     * @type string
     */
    type: UserUpdatedTypeEnum
    /**
     * @type string
     */
    role: UserUpdatedRoleEnum
  }
}

/**
 * @description Unauthorized
 */
export type PutMeUpdate401 = {
  /**
   * @type string
   */
  message: string
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