export const formatNumber = (
  priceItem: number | string,
  decimalCount: number = 2,
  decimal: string = ",",
  thousands: string = "."
): string => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = Number(priceItem) < 0 ? "-" : ""

    let i = parseInt(
      (priceItem = Math.abs(Number(priceItem) || 0).toFixed(decimalCount))
    ).toString()
    let j = i.length > 3 ? i.length % 3 : 0

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(Number(priceItem) - Number(i))
            .toFixed(decimalCount)
            .slice(2)
        : "")
    )
  } catch (e) {
    console.log(e)
    return ""
  }
}
