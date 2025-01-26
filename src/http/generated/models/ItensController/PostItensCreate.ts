/**
 * @description Item cadastrado com sucesso
 */
export type PostItensCreate201 = {
  /**
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

/**
 * @description Item já cadastrado
 */
export type PostItensCreate400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type PostItensCreate401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Company not found
 */
export type PostItensCreate404 = {
  /**
   * @type string
   */
  message: string
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
  Errors: PostItensCreate400 | PostItensCreate401 | PostItensCreate404
}