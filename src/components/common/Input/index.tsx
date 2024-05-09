import React, {
  FocusEvent,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState
} from 'react'

import IconArrowDown from '@/utils/icons/IconArrowDown'
import IconArrowUp from '@/utils/icons/IconArrowUp'
import IconCloseX from '@/utils/icons/IconCloseX'
import IconHalfCircleLoad from '@/utils/icons/IconHalfCircleLoad'

import Spinner from '../Spinner'

import { inputStyles } from './style'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'prefix'> {
  value?: string | number
  defaultValue?: string | number
  label?: string
  prefix?: React.ReactNode
  placeholder?: string
  width?: number
  size?: 'sm' | 'md' | 'lg' | number
  type?: HTMLInputTypeAttribute
  hintText?: string
  error?: string
  suffix?: React.ReactNode
  addonAfter?: React.ReactNode
  addonBefore?: React.ReactNode
  disabled?: boolean
  required?: boolean
  optional?: boolean
  fullWidth?: boolean
  allowClear?: boolean
  loading?: boolean
  separator?: string
  showCount?: boolean
  maxLength?: number
  formatter?: (value: string | number, separator: string) => string | number
  parse?: (value: string | number, separator: string) => string | number
  onChange?: (value: string, option?: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void
  /**
   * @deprecated Use Form component.
   */
  register?: object
  className?: HTMLAttributes<HTMLDivElement>['className']
  inputClassName?: HTMLAttributes<HTMLDivElement>['className']
  readOnly?: boolean
  onClickSuffix?: (e: React.MouseEvent) => void
  step?: number
  onStep?: (currentValue: number, type: 'up' | 'down') => void
  showArrows?: boolean
  decimal?: number
}

const Input = ({
  defaultValue,
  value,
  label,
  placeholder = '',
  width,
  size = 'md',
  type = 'text',
  hintText,
  error,
  prefix,
  suffix,
  addonAfter,
  addonBefore,
  fullWidth = false,
  required = false,
  optional = false,
  disabled = false,
  loading = false,
  showCount = false,
  allowClear = true,
  separator = ',',
  formatter,
  parse,
  onChange,
  onBlur,
  register,
  className = '',
  inputClassName = '',
  min,
  max,
  maxLength,
  onClickSuffix = () => {},
  step = 0,
  onStep = () => {},
  showArrows = false,
  decimal = 0,
  ...rest
}: InputProps) => {
  const isControlled = typeof value != 'undefined'
  const hasDefaultValue = typeof defaultValue != 'undefined'
  const inputRef = useRef<HTMLInputElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)
  const addonBeforeRef = useRef<HTMLDivElement>(null)
  const addonAfterRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState<string | number>(hasDefaultValue ? defaultValue : '')

  const setValueChange = (value: string | undefined) => {
    if (!value) {
      setInputValue('')
      return ''
    }
    if (formatter && parse && inputRef?.current) {
      const parseValue = parse(value, separator)
      const formatValue = formatter(value, separator)
      inputRef.current.value = formatValue.toString()
      setInputValue(formatValue)
      return parseValue
    } else {
      setInputValue(value)
      if (inputRef?.current) inputRef.current.value = value
      return value
    }
  }

  const changeNumber = (type: 'up' | 'down') => {
    if (disabled) return
    const value = inputRef?.current?.value || inputValue
    if (parse) {
      let newValue = 0
      const parseValue = +parse(value, separator)
      if (type === 'up') {
        const increaseNumber = (parseValue + step).toFixed(decimal)
        if (max !== undefined && Number(increaseNumber) > Number(max)) {
          newValue = +max
        } else {
          newValue = +increaseNumber
        }
        onStep(newValue, 'up')
      }
      if (type === 'down') {
        const decreaseNumber = (parseValue - step).toFixed(decimal)
        if (min !== undefined && Number(decreaseNumber) < Number(min)) {
          newValue = +min
        } else {
          newValue = +decreaseNumber
        }
        onStep(newValue, 'down')
      }
      const changedValue = setValueChange(newValue.toString())
      if (onChange) onChange(changedValue.toString())
    }
  }

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (min !== undefined && parse) {
      const parseValue = parse(value, separator)
      if (Number(parseValue) < Number(min)) {
        setValueChange(min.toString())
        if (onChange) onChange(min.toString(), e)
        return
      }
    }
    if (max !== undefined && parse) {
      const parseValue = parse(value, separator)
      if (Number(parseValue) > Number(max)) {
        setValueChange(max.toString())
        if (onChange) onChange(max.toString(), e)
        return
      }
    }
    const changedValue = setValueChange(value)
    if (onChange) onChange(changedValue.toString(), e)
  }

  useEffect(() => {
    if (inputRef?.current && value !== undefined) {
      inputRef.current.value = value.toString()
    }
  }, [value])

  const inputWidth = fullWidth ? '100%' : width && width > 0 ? width : 'fit-content'
  const isSizeNum = typeof size === 'number'

  const renderAddonBefore = addonBefore && (
    <div
      ref={addonBeforeRef}
      className={inputStyles.tvAddonBefore({
        disabled,
        loading,
        string: typeof addonBefore === 'string'
      })}
    >
      {addonBefore}
    </div>
  )

  const renderAddonAfter = addonAfter && (
    <div
      ref={addonAfterRef}
      className={inputStyles.tvAddonAfter({
        disabled,
        loading,
        string: typeof addonBefore === 'string'
      })}
    >
      {addonAfter}
    </div>
  )

  const renderArrow = () => {
    return (
      <div className='flex h-full w-4 flex-col items-center justify-center gap-1'>
        <span onClick={() => changeNumber('up')} className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          <IconArrowUp width={10} height={6.25} />
        </span>
        <span onClick={() => changeNumber('down')} className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          <IconArrowDown width={10} height={6.25} />
        </span>
      </div>
    )
  }

  return (
    <div className={inputStyles.wrapper({ fullWidth })}>
      {label && (
        <label className='mb-1 block font-medium text-text-primary'>
          {label} {required && <span className='text-error'>*</span>}
          {optional && <span className='text-sm text-text-500'>(Optional)</span>}
        </label>
      )}
      <div
        className={inputStyles.sizeContainer({
          size: isSizeNum ? undefined : size,
          disabled: disabled || loading
        })}
        style={{ height: isSizeNum ? size : undefined }}
      >
        {renderAddonBefore}
        <div
          ref={inputContainerRef}
          style={{
            width: inputWidth,
            height: isSizeNum ? size : undefined
          }}
          className={inputStyles.container({
            size: isSizeNum ? undefined : size,
            disabled,
            loading,
            addonAfter: Boolean(addonAfter),
            addonBefore: Boolean(addonBefore),
            className
          })}
        >
          {prefix && <div className='leading-[normal]'>{prefix}</div>}
          <div className='relative flex h-full w-full items-center'>
            <input
              ref={inputRef}
              type={type}
              className={inputStyles.input({
                disabled: disabled || loading,
                loading,
                className: inputClassName
              })}
              placeholder={placeholder}
              value={isControlled ? value : inputValue}
              required={required}
              disabled={disabled || loading}
              onChange={onChangeValue}
              autoComplete='off'
              onBlur={onBlur}
              min={min}
              max={max}
              maxLength={maxLength}
              {...register}
              {...rest}
            />
            {showArrows && !loading ? renderArrow() : null}
            {!showCount && allowClear && !disabled && !loading && (
              <span
                onClick={() => {
                  if (inputRef?.current) {
                    inputRef.current.value = ''
                    setInputValue('')
                    if (onChange) onChange('')
                  }
                }}
                className={inputStyles.iconClear({
                  show: Boolean(allowClear && (inputValue || value))
                })}
              >
                <IconCloseX color='var(--text-500)' />
              </span>
            )}
            {showCount && maxLength && (
              <span>
                {inputValue?.toString().length}/{maxLength}
              </span>
            )}
            {loading && <Spinner indicator={<IconHalfCircleLoad width={16} className='fill-bg-bg-primary' />} />}
          </div>
          {suffix && !loading && (
            <div className='leading-[normal]' onClick={onClickSuffix}>
              {suffix}
            </div>
          )}
        </div>
        {renderAddonAfter}
      </div>
      {hintText && <span className='mt-1 block text-text-600'>{hintText}</span>}
      {error && <span className='mt-1 block text-error'>{error}</span>}
    </div>
  )
}

export default Input
