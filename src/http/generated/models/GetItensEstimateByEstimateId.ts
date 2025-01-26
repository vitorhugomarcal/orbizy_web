export type GetItensEstimateByEstimateIdPathParams = {
  /**
   * @type string
   */
  estimateId: string
}

export type GetItensEstimateByEstimateId200 = {
  /**
   * @description Itens do orçamento
   * @type string
   */
  message: string
  /**
   * @type array
   */
  formattedItens: {
    id: string | null
    name: string | null
    quantity: number | null
    price: number | null
    unit: string | null
    total: number | null
  }[]
}

export type GetItensEstimateByEstimateId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  message: string
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type GetItensEstimateByEstimateId404 = {
  /**
   * @description Orçamento não encontrado
   * @type string
   */
  message: string
  /**
   * @description Orçamento não encontrado
   * @type string
   */
  error: string
}

export type GetItensEstimateByEstimateIdQueryResponse = GetItensEstimateByEstimateId200

export type GetItensEstimateByEstimateIdQuery = {
  Response: GetItensEstimateByEstimateId200
  PathParams: GetItensEstimateByEstimateIdPathParams
  Errors: GetItensEstimateByEstimateId401 | GetItensEstimateByEstimateId404
}