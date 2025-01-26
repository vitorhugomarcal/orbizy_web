/**
 * @description Units retrieved successfully
 */
export type GetUnits200 = {
  /**
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

/**
 * @description Unauthorized
 */
export type GetUnits401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Not found
 */
export type GetUnits404 = {
  /**
   * @type string
   */
  message: string
}

export type GetUnitsQueryResponse = GetUnits200

export type GetUnitsQuery = {
  Response: GetUnits200
  Errors: GetUnits401 | GetUnits404
}