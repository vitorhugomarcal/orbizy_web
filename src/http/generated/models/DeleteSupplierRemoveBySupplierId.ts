export type DeleteSupplierRemoveBySupplierIdPathParams = {
  /**
   * @type string
   */
  supplierId: string
}

export type DeleteSupplierRemoveBySupplierId204 = {
  /**
   * @description Supplier removed successfully
   * @type string
   */
  message: string
}

export type DeleteSupplierRemoveBySupplierId400 = {
  /**
   * @description Supplier ID and Company ID is required
   * @type string
   */
  error: string
}

export type DeleteSupplierRemoveBySupplierId401 = {
  /**
   * @description Unauthorized
   * @type string
   */
  error: string
}

export type DeleteSupplierRemoveBySupplierId404 = {
  /**
   * @description Supplier not found or not associated with this user
   * @type string
   */
  error: string
}

export type DeleteSupplierRemoveBySupplierIdMutationResponse = DeleteSupplierRemoveBySupplierId204

export type DeleteSupplierRemoveBySupplierIdMutation = {
  Response: DeleteSupplierRemoveBySupplierId204
  PathParams: DeleteSupplierRemoveBySupplierIdPathParams
  Errors: DeleteSupplierRemoveBySupplierId400 | DeleteSupplierRemoveBySupplierId401 | DeleteSupplierRemoveBySupplierId404
}