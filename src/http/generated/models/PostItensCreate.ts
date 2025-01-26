export type PostItensCreate201 = {
  /**
   * @description Item cadastrado com sucesso
   * @type string
   */
  message: string
  /**
   * @type object
   */
  item: {
    /**
     * @type string
     */
    id: string
    /**
     * @type string
     */
    name: string
    /**
     * @type number
     */
    price: number
    /**
     * @type string
     */
    description: string
    /**
     * @type string
     */
    unit: string
  }
}

export type PostItensCreate400 = {
  /**
   * @description Item já cadastrado
   * @type string
   */
  error: string
}

export type PostItensCreate401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type PostItensCreateMutationRequest = {
  /**
   * @type string
   */
  name: string
  /**
   * @type number
   */
  price: number
  /**
   * @type string
   */
  description: string
  /**
   * @type string
   */
  unit: string
}

export type PostItensCreateMutationResponse = PostItensCreate201

export type PostItensCreateMutation = {
  Response: PostItensCreate201
  Request: PostItensCreateMutationRequest
  Errors: PostItensCreate400 | PostItensCreate401
}