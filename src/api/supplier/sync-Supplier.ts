import { api } from "@/lib/axios"

interface SupplierData {
  supplierId: string
}

export async function syncSupplier(data: SupplierData) {
  const response = await api.post(
    `/supplier/create-in-company/${data.supplierId}`
  )

  return response.data
}
