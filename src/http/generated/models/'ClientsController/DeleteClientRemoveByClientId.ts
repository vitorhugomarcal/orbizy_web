export type DeleteClientRemoveByClientIdPathParams = {
  /**
   * @type string
   */
  clientId: string
}

/**
 * @description Client removed successfully
 */
export type DeleteClientRemoveByClientId204 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description ID do cliente não fornecido
 */
export type DeleteClientRemoveByClientId400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type DeleteClientRemoveByClientId401 = {
  /**
   * @type string
   */
  message: string
}

export type DeleteClientRemoveByClientIdMutationResponse = DeleteClientRemoveByClientId204

export type DeleteClientRemoveByClientIdMutation = {
  Response: DeleteClientRemoveByClientId204
  PathParams: DeleteClientRemoveByClientIdPathParams
  Errors: DeleteClientRemoveByClientId400 | DeleteClientRemoveByClientId401
}