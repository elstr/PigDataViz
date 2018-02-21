export const getMinYear = data => Math.min(...data.map(d => d.year))
export const getMaxYear = data => Math.max(...data.map(d => d.year))

export const validateYear = (year, minValidYear) => {
  /* First check if year has been passed and is an integer */
  const yearParamValue = parseInt(year)

  /* If it's a valid year value and more or eq to the minimum valid year, return it
  * otherwise return minimum valid year
  * Validates year=2 when min year is 2000 for example */
  return yearParamValue && (yearParamValue >= minValidYear) ? yearParamValue : minValidYear
}
export const getYearsFromData = data => {
  return data.reduce((acc, val) => {
    if(!acc) {acc = []}
    acc.indexOf(val.year) === -1 && acc.push(val.year)
    return acc
  }, [])
}
export const roundNumberWithTwoDecimals = number => Math.round(number*100)/100