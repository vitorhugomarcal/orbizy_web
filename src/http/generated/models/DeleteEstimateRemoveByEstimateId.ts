export type DeleteEstimateRemoveByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

export type DeleteEstimateRemoveByEstimateId204 = {
  /**
   * @description Estimate removed successfully
   * @type string
   */
  message: string
}

export type DeleteEstimateRemoveByEstimateId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type DeleteEstimateRemoveByEstimateIdMutationResponse = DeleteEstimateRemoveByEstimateId204

export type DeleteEstimateRemoveByEstimateIdMutation = {
  Response: DeleteEstimateRemoveByEstimateId204
  PathParams: DeleteEstimateRemoveByEstimateIdPathParams
  Errors: DeleteEstimateRemoveByEstimateId401
}