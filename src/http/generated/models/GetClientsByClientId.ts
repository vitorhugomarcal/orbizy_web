export type GetClientsByClientIdPathParams = {
  /**
   * @type string
   */
  clientId: string
}

export type GetClientsByClientId200 = any

export type GetClientsByClientIdQueryResponse = GetClientsByClientId200

export type GetClientsByClientIdQuery = {
  Response: GetClientsByClientId200
  PathParams: GetClientsByClientIdPathParams
  Errors: any
}