export type PostItensCreate200 = any

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

export type PostItensCreateMutationResponse = PostItensCreate200

export type PostItensCreateMutation = {
  Response: PostItensCreate200
  Request: PostItensCreateMutationRequest
  Errors: any
}