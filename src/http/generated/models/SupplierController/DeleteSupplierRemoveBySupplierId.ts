export type DeleteSupplierRemoveBySupplierIdPathParams = {
  /**
   * @type string
   */
  supplierId: string
}

/**
 * @description Supplier removed successfully
 */
export type DeleteSupplierRemoveBySupplierId204 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Supplier ID and Company ID is required
 */
export type DeleteSupplierRemoveBySupplierId400 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Unauthorized
 */
export type DeleteSupplierRemoveBySupplierId401 = {
  /**
   * @type string
   */
  message: string
}

/**
 * @description Supplier not found or not associated with this user
 */
export type DeleteSupplierRemoveBySupplierId404 = {
  /**
   * @type string
   */
  message: string
}

export type DeleteSupplierRemoveBySupplierIdMutationResponse = DeleteSupplierRemoveBySupplierId204

export type DeleteSupplierRemoveBySupplierIdMutation = {
  Response: DeleteSupplierRemoveBySupplierId204
  PathParams: DeleteSupplierRemoveBySupplierIdPathParams
  Errors: DeleteSupplierRemoveBySupplierId400 | DeleteSupplierRemoveBySupplierId401 | DeleteSupplierRemoveBySupplierId404
}