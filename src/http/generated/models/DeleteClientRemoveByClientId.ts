export type DeleteClientRemoveByClientIdPathParams = {
  /**
   * @type string
   */
  clientId: string
}

export type DeleteClientRemoveByClientId204 = {
  /**
   * @description Client removed successfully
   * @type string
   */
  message: string
}

export type DeleteClientRemoveByClientId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type DeleteClientRemoveByClientIdMutationResponse = DeleteClientRemoveByClientId204

export type DeleteClientRemoveByClientIdMutation = {
  Response: DeleteClientRemoveByClientId204
  PathParams: DeleteClientRemoveByClientIdPathParams
  Errors: DeleteClientRemoveByClientId401
}