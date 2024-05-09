import type { Attributes, MouseEvent } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { DATE_FORMATS } from '@/utils/constants'
import { useCalculatePosition } from '@/utils/hooks/useCalculatePosition'
import { useClickOutside } from '@/utils/hooks/useClickOutside'
import { useWheelModal } from '@/utils/hooks/useWheelModal'
import CalendarIcon from '@/utils/icons/CalendarIcon'
import IconCloseX from '@/utils/icons/IconCloseX'
import IconLeftArrow from '@/utils/icons/IconLeftArrow'
import IconRightArrow from '@/utils/icons/IconRightArrow'
import IconX from '@/utils/icons/IconX'

import { arrMonths, Calendar, InterfaceMonthDate, renderSelectedDateProps } from '../Calendar'

import { datePickerStyles } from './style'

const portalId = 'date-picker-portal'
const createContainer = () => {
  let element = document.getElementById(portalId)

  if (element) {
    return element
  }

  element = document.createElement('div')
  element.className = `absolute z-6 top-0 left-0 w-full`
  element.setAttribute('id', portalId)
  document.body.appendChild(element)
  return element
}

export interface DatePickerProps {
  format?: string
  placeholder?: string
  disabled?: boolean
  value?: string
  defaultValue?: string | string[]
  disabledDate?: string[]
  disabledRange?: (date: string) => boolean
  allowClear?: boolean
  className?: string
  style?: Attributes
  suffixIcon?: React.ReactNode
  showArrow?: boolean
  onChange?: (value: string[] | string) => void
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  renderSelectedDate?: renderSelectedDateProps
  renderDate?: (
    date: number,
    value: Date,
    onSelectedDate: (e: MouseEvent, date: Date) => void,
    status: {
      isDisabled: boolean
      isSelected: boolean
      isCurrent: boolean
    }
  ) => React.JSX.Element
  renderHeader?: (
    onChange: ({ year, month }: InterfaceMonthDate) => void,
    { year, month }: InterfaceMonthDate
  ) => React.ReactElement
  footer?: React.ReactNode | void
  multiple?: boolean
  type?: 'date' | 'month' | 'year'
  register?: object
  placement?: 'left' | 'right'
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    format = DATE_FORMATS.MDY,
    placeholder = '',
    type = 'date',
    placement = 'left',
    disabled = false,
    value,
    defaultValue = '',
    disabledDate,
    disabledRange,
    allowClear = true,
    multiple = false,
    style,
    className,
    onChange = () => {},
    renderSelectedDate,
    suffixIcon = <CalendarIcon className='text-gray-500' />,
    showArrow = false,
    width,
    height,
    footer,
    renderHeader,
    register
  } = props
  const { t } = useTranslation()

  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [values, setValues] = useState<string | string[] | undefined>(defaultValue)
  const [arrValue, setArrayValue] = useState<string[]>([...defaultValue])

  const ref = useRef<any>(null)
  const calendarRef = useRef<any>(null)

  useEffect(() => {
    const containerData = createContainer()
    setContainer(containerData)
  }, [])

  useEffect(() => {
    setValues(value || '')
  }, [value])

  useWheelModal({
    callback: () => setVisible(false)
  })

  useEffect(() => {
    if (visible) {
      calendarRef.current?.classList.add('animate-fade-down')
    } else {
      calendarRef.current?.classList.remove('animate-fade-down')
    }
  }, [visible])

  useClickOutside({
    ref,
    handler: () => {
      if (setVisible) setVisible(false)
    },
    childrenRef: calendarRef
  })
  useCalculatePosition({
    actionRef: ref,
    dropdownRef: calendarRef,
    visible,
    autoWidth: false,
    placement
  })

  const increaseTime = () => {
    if (type === 'date') {
      const tempDate = moment(values?.toString(), format).add(1, 'days').format(format)
      return setValues(tempDate)
    }
    if (values) {
      const index = arrMonths.indexOf(values.toString())
      if (index === 11) return false
      const currentMonth = arrMonths[index + 1]
      return setValues(currentMonth)
    }
  }

  const decreaseTime = () => {
    if (type === 'date') {
      const tempDate = moment(values?.toString(), format).add(-1, 'days').format(format)
      return setValues(tempDate)
    }
    if (values) {
      const index = arrMonths.indexOf(values.toString())
      if (index === 0) return false
      const currentMonth = arrMonths[index - 1]
      return setValues(currentMonth)
    }
  }

  const onChangeDate = (date: string[] | string) => {
    onChange(date)
    if (typeof date === 'string') {
      setValues(date)
      setVisible(false)
    } else {
      if (date) setArrayValue(date)
    }
  }

  // delete date simple
  const onClear = () => {
    setValues('')
    setArrayValue([])
    onChange('')
  }

  // delete date multiple
  const onDeleteDate = (index: number) => {
    const arr = [...arrValue]
    arr.splice(index, 1)
    setArrayValue(arr)
  }

  const renderSuffixIcon = () => {
    const isClear = allowClear && (arrValue.length > 0 || values)
    return (
      <>
        <span
          className={datePickerStyles.closeIcon({
            hover: Boolean(isClear && !disabled)
          })}
          onClick={onClear}
        >
          <IconCloseX color='var(--text-500)' />
        </span>
        <div
          className={datePickerStyles.suffixIcon({
            hidden: Boolean(isClear && !disabled)
          })}
        >
          {suffixIcon}
        </div>
      </>
    )
  }

  const renderSimple = () => {
    return (
      <div className={`flex h-full w-full items-center justify-between px-3`}>
        {showArrow && type === 'date' ? (
          <span className='cursor-pointer opacity-70 hover:opacity-100' onClick={decreaseTime}>
            <IconLeftArrow color='var(--text-primary)' />
          </span>
        ) : null}
        <input
          disabled={disabled}
          className={datePickerStyles.input({ showArrow, disabled })}
          readOnly
          type='text'
          value={values}
          placeholder={placeholder || t('app.selectDate')}
          maxLength={8}
        />
        {!showArrow && renderSuffixIcon()}
        {showArrow && type === 'date' ? (
          <span className='cursor-pointer opacity-70 hover:opacity-100' onClick={increaseTime}>
            <IconRightArrow color='var(--text-primary)' />
          </span>
        ) : null}
      </div>
    )
  }

  const renderMultiple = () => {
    return (
      <div style={{ minHeight: 40 }} className='flex w-full items-center justify-between gap-1 rounded-lg px-3 py-1'>
        <div className='flex flex-wrap gap-1'>
          {arrValue.length > 0 ? (
            arrValue.map((item: string, index: number) => {
              return (
                <>
                  <div
                    key={item}
                    className='flex items-center justify-between gap-2 rounded-lg border border-border-200 px-2 py-1'
                  >
                    <span className='text-sm font-medium'>{item}</span>
                    <span onClick={() => onDeleteDate(index)} className='cursor-pointer'>
                      <IconX />
                    </span>
                  </div>
                </>
              )
            })
          ) : (
            <span style={{ opacity: 0.37 }}>{placeholder || t('app.selectDate')}</span>
          )}
        </div>
        <div style={{ width: '20px' }}>{!showArrow && renderSuffixIcon()}</div>
      </div>
    )
  }

  return (
    <div
      onClick={() => {
        if (disabled) return false
        setVisible(true)
      }}
      ref={ref}
      style={{
        minHeight: 40,
        width: width,
        height: height,
        opacity: disabled ? 0.7 : 1,
        ...style
      }}
      className={datePickerStyles.container({
        disabled,
        visible,
        multiple,
        className
      })}
    >
      {multiple && !showArrow ? renderMultiple() : renderSimple()}
      {register && <input className='h-0 w-0' {...register} />}
      {container && visible
        ? createPortal(
            <div className={'absolute'} style={{ zIndex: 999 }} ref={calendarRef}>
              <Calendar
                visible={visible}
                onChangeDate={onChangeDate}
                format={format}
                disabledDate={disabledDate}
                disabledRange={disabledRange}
                selectedDate={values?.toString()}
                selectedDateArr={arrValue}
                renderSelectedDate={renderSelectedDate}
                footer={footer}
                multiple={multiple}
                renderHeader={renderHeader}
                type={type}
              />
            </div>,
            container
          )
        : null}
    </div>
  )
}
