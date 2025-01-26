export const userTypeEnum2 = {
  basic: 'basic',
  team: 'team',
  pro: 'pro',
} as const

export type UserTypeEnum2 = (typeof userTypeEnum2)[keyof typeof userTypeEnum2]

export const userRoleEnum2 = {
  MASTER: 'MASTER',
  BASIC: 'BASIC',
} as const

export type UserRoleEnum2 = (typeof userRoleEnum2)[keyof typeof userRoleEnum2]

/**
 * @description User created successfully
 */
export type PostMeCreate201 = {
  /**
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
    type: UserTypeEnum2
    /**
     * @type string
     */
    role: UserRoleEnum2
  }
}

/**
 * @description User already exists
 */
export type PostMeCreate400 = {
  /**
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