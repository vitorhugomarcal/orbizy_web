export function formatCurrency(value: string): string {
  const cleanValue = value.replace(/\D/g, "") // Remove all non-digit characters
  const formattedValue = (parseFloat(cleanValue) / 100).toFixed(2) // Divide by 100 to consider cents and fix to two decimal places
  const parts = formattedValue.split(".") // Split the integer and decimal parts
  return parts.join(".") // Join the integer and decimal parts with a comma
}
