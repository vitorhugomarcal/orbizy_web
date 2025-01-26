export type DeleteItensRemoveByItemIdPathParams = {
  /**
   * @type string
   */
  itemId: string
}

export type DeleteItensRemoveByItemId204 = {
  /**
   * @description Item removido com sucesso
   * @type string
   */
  message: string
}

export type DeleteItensRemoveByItemId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type DeleteItensRemoveByItemIdMutationResponse = DeleteItensRemoveByItemId204

export type DeleteItensRemoveByItemIdMutation = {
  Response: DeleteItensRemoveByItemId204
  PathParams: DeleteItensRemoveByItemIdPathParams
  Errors: DeleteItensRemoveByItemId401
}