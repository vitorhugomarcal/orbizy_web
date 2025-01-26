export type PostInviteClientByCompanyIdPathParams = {
  /**
   * @type string
   */
  companyId: string
}

/**
 * @description Link de convite enviado com sucesso
 */
export type PostInviteClientByCompanyId201 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type string
   */
  inviteLink: string
}

/**
 * @description Erro ao enviar link de convite
 */
export type PostInviteClientByCompanyId400 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type string
   */
  error: string
}

/**
 * @description Empresa não encontrada
 */
export type PostInviteClientByCompanyId404 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type string
   */
  error: string
}

/**
 * @description Limite de requisições excedido
 */
export type PostInviteClientByCompanyId429 = {
  /**
   * @type string
   */
  message: string
  /**
   * @type string
   */
  error: string
}

export type PostInviteClientByCompanyIdMutationResponse = PostInviteClientByCompanyId201

export type PostInviteClientByCompanyIdMutation = {
  Response: PostInviteClientByCompanyId201
  PathParams: PostInviteClientByCompanyIdPathParams
  Errors: PostInviteClientByCompanyId400 | PostInviteClientByCompanyId404 | PostInviteClientByCompanyId429
}