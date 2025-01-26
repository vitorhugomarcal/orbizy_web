export type GetMe200 = {
  /**
   * @description Profile retrieved successfully
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
    name: string | null
    /**
     * @type string
     */
    email: string
    company_id: string | null
    /**
     * @type string
     */
    type: string
    /**
     * @type string
     */
    role: string
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
      createdAt: string | string | number
    } | null
  }
}

export type GetMe401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetMeQueryResponse = GetMe200

export type GetMeQuery = {
  Response: GetMe200
  Errors: GetMe401
}