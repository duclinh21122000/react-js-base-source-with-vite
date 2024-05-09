import { currencyData } from '../constants'

export const parseLocaleNumber = (stringNumber: string, locale: string): number | string => {
  const thousandSeparator = Intl.NumberFormat(locale)
    .format(11111)
    .replace(/\p{Number}/gu, '')
  const decimalSeparator = Intl.NumberFormat(locale)
    .format(1.1)
    .replace(/\p{Number}/gu, '')

  return stringNumber
    .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
    .replace(new RegExp('\\' + decimalSeparator), '.')
}

export const currencyParse = (value?: string | number, currency = 'USD'): number | string => {
  if (!value) return 0
  if (value === '-') return value // allow negative number

  const localeData = Object.values(currencyData).find((item) => item.code === currency)
  let locale = 'en-US'
  if (localeData) locale = localeData.locale
  const result = parseLocaleNumber(value.toString(), locale)
  if (isNaN(+result)) {
    return 0
  }
  return result
}

export const currencyFormatter = (value: number | string, currency = 'USD') => {
  if (value === '-') return value // allow negative number
  const parseValue = currencyParse(value, currency)
  const localeData = Object.values(currencyData).find((item) => item.code === currency)
  let locale = 'en-US'
  if (localeData) locale = localeData.locale
  const result = new Intl.NumberFormat(locale).format(+parseValue)
  const lastItem = value.toString().slice(-1)
  if (lastItem === '.') return `${result}.`
  return result
}

export const numberFormatter = (value: string | number): string | number => {
  if (value === '-') return value // allow negative number
  const result = value.toString().replace(/\$\s?|(,*)/g, '')
  if (isNaN(+result)) {
    return result.slice(0, -1)
  }
  return result
}
