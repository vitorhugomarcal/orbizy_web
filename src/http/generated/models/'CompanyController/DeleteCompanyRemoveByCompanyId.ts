export type DeleteCompanyRemoveByCompanyIdPathParams = {
  /**
   * @type string
   */
  companyId: string
}

/**
 * @description Company removed successfully
 */
export type DeleteCompanyRemoveByCompanyId204 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Company not found
 */
export type DeleteCompanyRemoveByCompanyId400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type DeleteCompanyRemoveByCompanyId401 = {
  /**
   * @type string
   */
  message: string
}

export type DeleteCompanyRemoveByCompanyIdMutationResponse = DeleteCompanyRemoveByCompanyId204

export type DeleteCompanyRemoveByCompanyIdMutation = {
  Response: DeleteCompanyRemoveByCompanyId204
  PathParams: DeleteCompanyRemoveByCompanyIdPathParams
  Errors: DeleteCompanyRemoveByCompanyId400 | DeleteCompanyRemoveByCompanyId401
}