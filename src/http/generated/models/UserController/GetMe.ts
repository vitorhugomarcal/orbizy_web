export const userTypeEnum = {
  basic: 'basic',
  team: 'team',
  pro: 'pro',
} as const

export type UserTypeEnum = (typeof userTypeEnum)[keyof typeof userTypeEnum]

export const userRoleEnum = {
  MASTER: 'MASTER',
  BASIC: 'BASIC',
} as const

export type UserRoleEnum = (typeof userRoleEnum)[keyof typeof userRoleEnum]

/**
 * @description Profile retrieved successfully
 */
export type GetMe200 = {
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
    company_id: string
    /**
     * @type string
     */
    type: UserTypeEnum
    /**
     * @type string
     */
    role: UserRoleEnum
    /**
     * @type object
     */
    Company: {
      /**
       * @type string
       */
      id: string
      /**
       * @type string
       */
      cnpj: string
      /**
       * @type string
       */
      phone: string
      /**
       * @type string
       */
      state: string
      /**
       * @type string
       */
      city: string
      /**
       * @type string
       */
      cep: string
      /**
       * @type string
       */
      address: string
      /**
       * @type string
       */
      neighborhood: string
      /**
       * @type string
       */
      address_number: string
      /**
       * @type string
       */
      company_name: string
      /**
       * @type string
       */
      owner_id: string
    }
  }
}

/**
 * @description Unauthorized
 */
export type GetMe401 = {
  /**
   * @type string
   */
  message: string
}

export type GetMeQueryResponse = GetMe200

export type GetMeQuery = {
  Response: GetMe200
  Errors: GetMe401
}