export type DeleteItensEstimateRemoveByItemIdPathParams = {
  /**
   * @type string
   */
  itemId: string
}

export type DeleteItensEstimateRemoveByItemId204 = {
  /**
   * @description Item do orçamento removido com sucesso
   * @type string
   */
  message: string
}

export type DeleteItensEstimateRemoveByItemId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type DeleteItensEstimateRemoveByItemIdMutationResponse = DeleteItensEstimateRemoveByItemId204

export type DeleteItensEstimateRemoveByItemIdMutation = {
  Response: DeleteItensEstimateRemoveByItemId204
  PathParams: DeleteItensEstimateRemoveByItemIdPathParams
  Errors: DeleteItensEstimateRemoveByItemId401
}