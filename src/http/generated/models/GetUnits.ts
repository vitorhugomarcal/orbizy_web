export type GetUnits200 = {
  /**
   * @description Units retrieved successfully
   * @type string
   */
  message: string
  /**
   * @type array
   */
  units: {
    /**
     * @type string
     */
    id: string
    /**
     * @type string
     */
    name: string
  }[]
}

export type GetUnits401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetUnitsQueryResponse = GetUnits200

export type GetUnitsQuery = {
  Response: GetUnits200
  Errors: GetUnits401
}