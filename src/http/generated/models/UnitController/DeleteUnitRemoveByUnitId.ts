export type DeleteUnitRemoveByUnitIdPathParams = {
  /**
   * @type string
   */
  unitId: string
}

/**
 * @description Unit removed successfully
 */
export type DeleteUnitRemoveByUnitId204 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type DeleteUnitRemoveByUnitId401 = {
  /**
   * @type string
   */
  message: string
}

export type DeleteUnitRemoveByUnitIdMutationResponse = DeleteUnitRemoveByUnitId204

export type DeleteUnitRemoveByUnitIdMutation = {
  Response: DeleteUnitRemoveByUnitId204
  PathParams: DeleteUnitRemoveByUnitIdPathParams
  Errors: DeleteUnitRemoveByUnitId401
}