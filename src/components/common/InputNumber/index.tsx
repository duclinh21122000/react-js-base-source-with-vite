import { currencyFormatter, currencyParse, numberFormatter } from '@/utils/functions'

import Input, { InputProps } from '../Input'

export interface InputNumberProps extends Omit<InputProps, 'type' | 'onChange'> {
  separator?: string
  formatted?: boolean
  onChange?: (val: number) => void
  min?: number
  max?: number
}

const InputNumber = ({
  separator = ',',
  defaultValue,
  formatted = false,
  onChange = () => {},
  min,
  max,
  step = 1,
  decimal = 0,
  ...rest
}: InputNumberProps) => {
  return (
    <Input
      type='text'
      formatter={formatted ? currencyFormatter : numberFormatter}
      parse={formatted ? currencyParse : numberFormatter}
      defaultValue={defaultValue}
      separator={separator}
      min={min}
      max={max}
      onChange={(val) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (val.slice(-1) === '.') return onChange(val as any)
        else return onChange(+val)
      }}
      allowClear={false}
      showArrows
      step={step}
      decimal={decimal}
      {...rest}
    />
  )
}

export default InputNumber
