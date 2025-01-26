export type DeleteEstimateRemoveByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

/**
 * @description Estimate removed successfully
 */
export type DeleteEstimateRemoveByEstimateId204 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type DeleteEstimateRemoveByEstimateId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Estimate not found
 */
export type DeleteEstimateRemoveByEstimateId404 = {
  /**
   * @type string
   */
  message: string
}

export type DeleteEstimateRemoveByEstimateIdMutationResponse = DeleteEstimateRemoveByEstimateId204

export type DeleteEstimateRemoveByEstimateIdMutation = {
  Response: DeleteEstimateRemoveByEstimateId204
  PathParams: DeleteEstimateRemoveByEstimateIdPathParams
  Errors: DeleteEstimateRemoveByEstimateId401 | DeleteEstimateRemoveByEstimateId404
}