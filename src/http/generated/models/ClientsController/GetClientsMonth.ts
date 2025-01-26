/**
 * @description Client count for the current month
 */
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

/**
 * @description Unauthorized
 */
export type GetClientsMonth401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Clients not found
 */
export type GetClientsMonth404 = {
  /**
   * @type string
   */
  message: string
}

export type GetClientsMonthQueryResponse = GetClientsMonth200

export type GetClientsMonthQuery = {
  Response: GetClientsMonth200
  Errors: GetClientsMonth401 | GetClientsMonth404
}