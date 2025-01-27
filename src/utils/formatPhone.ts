export function formatPhone(phoneNumber: string) {
  const digitsOnly = phoneNumber.replace(/\D/g, "")
  if (digitsOnly.length === 10) {
    return digitsOnly.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
  } else if (digitsOnly.length === 11) {
    return digitsOnly.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }
  return phoneNumber
}
