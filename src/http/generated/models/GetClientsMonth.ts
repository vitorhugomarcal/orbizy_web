export type GetClientsMonth200 = {
  /**
   * @description Total number of clients
   * @type number
   */
  total: number
  /**
   * @description Number of new clients in the current month
   * @type number
   */
  new: number
}

export type GetClientsMonth401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetClientsMonthQueryResponse = GetClientsMonth200

export type GetClientsMonthQuery = {
  Response: GetClientsMonth200
  Errors: GetClientsMonth401
}