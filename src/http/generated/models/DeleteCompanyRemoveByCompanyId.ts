export type DeleteCompanyRemoveByCompanyIdPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type DeleteCompanyRemoveByCompanyId204 = {
  /**
   * @description Company removed successfully
   * @type string
   */
  message: string
}

export type DeleteCompanyRemoveByCompanyId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type DeleteCompanyRemoveByCompanyIdMutationResponse = DeleteCompanyRemoveByCompanyId204

export type DeleteCompanyRemoveByCompanyIdMutation = {
  Response: DeleteCompanyRemoveByCompanyId204
  PathParams: DeleteCompanyRemoveByCompanyIdPathParams
  Errors: DeleteCompanyRemoveByCompanyId401
}