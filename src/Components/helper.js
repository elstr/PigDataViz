export const getMinYear = data => Math.min(...data.map(d => d.year))
export const getMaxYear = data => Math.max(...data.map(d => d.year))
export const getParamValue = param => param.substring(param.indexOf("=") + 1).toString()
export const validateYear = year => {
  /* First check if year has been passed and is an integer */
  const yearParamValue = parseInt(year && getParamValue(year))
  /* If it's a valid year value, return it, otherwise get the minimum year from data */
  return yearParamValue ? yearParamValue : getMinYear(this.data)
}