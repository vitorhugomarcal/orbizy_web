export type DeleteItensRemoveByItemIdPathParams = {
  /**
   * @type string
   */
  itemId: string
}

/**
 * @description Item removido com sucesso
 */
export type DeleteItensRemoveByItemId204 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type DeleteItensRemoveByItemId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Item não encontrado
 */
export type DeleteItensRemoveByItemId404 = {
  /**
   * @type string
   */
  message: string
}

export type DeleteItensRemoveByItemIdMutationResponse = DeleteItensRemoveByItemId204

export type DeleteItensRemoveByItemIdMutation = {
  Response: DeleteItensRemoveByItemId204
  PathParams: DeleteItensRemoveByItemIdPathParams
  Errors: DeleteItensRemoveByItemId401 | DeleteItensRemoveByItemId404
}