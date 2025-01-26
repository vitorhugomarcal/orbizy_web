export type DeleteItensEstimateRemoveByItemIdPathParams = {
  /**
   * @type string
   */
  itemId: string
}

/**
 * @description Item do orçamento removido com sucesso
 */
export type DeleteItensEstimateRemoveByItemId204 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type DeleteItensEstimateRemoveByItemId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Item do orçamento não encontrado
 */
export type DeleteItensEstimateRemoveByItemId404 = {
  /**
   * @type string
   */
  message: string
}

export type DeleteItensEstimateRemoveByItemIdMutationResponse = DeleteItensEstimateRemoveByItemId204

export type DeleteItensEstimateRemoveByItemIdMutation = {
  Response: DeleteItensEstimateRemoveByItemId204
  PathParams: DeleteItensEstimateRemoveByItemIdPathParams
  Errors: DeleteItensEstimateRemoveByItemId401 | DeleteItensEstimateRemoveByItemId404
}