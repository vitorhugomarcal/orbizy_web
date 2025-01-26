export type DeleteUnitRemoveByUnitIdPathParams = {
  /**
   * @type string
   */
  unitId: string
}

export type DeleteUnitRemoveByUnitId204 = {
  /**
   * @description Unit removed successfully
   * @type string
   */
  message: string
}

export type DeleteUnitRemoveByUnitId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type DeleteUnitRemoveByUnitIdMutationResponse = DeleteUnitRemoveByUnitId204

export type DeleteUnitRemoveByUnitIdMutation = {
  Response: DeleteUnitRemoveByUnitId204
  PathParams: DeleteUnitRemoveByUnitIdPathParams
  Errors: DeleteUnitRemoveByUnitId401
}