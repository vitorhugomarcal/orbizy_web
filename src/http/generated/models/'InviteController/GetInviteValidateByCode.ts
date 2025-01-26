export type GetInviteValidateByCodePathParams = {
  /**
   * @type string
   */
  code: string
}

/**
 * @description Código de convite válido
 */
export type GetInviteValidateByCode200 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type boolean
   */
  isValid: boolean
}

/**
 * @description Código de convite inválido
 */
export type GetInviteValidateByCode400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Solicite um novo link de convite
 */
export type GetInviteValidateByCode429 = {
  /**
   * @type string
   */
  message: string
}

export type GetInviteValidateByCodeQueryResponse = GetInviteValidateByCode200

export type GetInviteValidateByCodeQuery = {
  Response: GetInviteValidateByCode200
  PathParams: GetInviteValidateByCodePathParams
  Errors: GetInviteValidateByCode400 | GetInviteValidateByCode429
}