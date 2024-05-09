import { Attributes, MouseEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { DATE_FORMATS } from '@/utils/constants'
import IconDoubleArrowLeft from '@/utils/icons/IconDoubleArrowLeft'
import IconDoubleArrowRight from '@/utils/icons/IconDoubleArrowRight'
import IconLeftArrow from '@/utils/icons/IconLeftArrow'
import IconRightArrow from '@/utils/icons/IconRightArrow'

import CalendarDate from './date'
import CalendarMonth from './month'
import CalendarYear from './year'

export interface InterfaceMonthDate {
  month: number
  year: number
}

export type renderHeaderProps = (
  onChange: ({ year, month }: InterfaceMonthDate) => void,
  { year, month }: InterfaceMonthDate,
  onChangeMode: (mode: IModes) => void
) => React.ReactElement

export type renderSelectedDateProps = (
  date: number,
  value: Date | null,
  onSelectedDate: (e: MouseEvent, date: Date) => void
) => React.JSX.Element

export type onChangeDateProps = (date: string | string[]) => void
export interface CalendarProps {
  visible?: boolean
  format?: string
  disabledHoliday?: boolean
  disabledDate?: string[]
  disabledRange?: (date: string) => boolean
  onChangeDate?: onChangeDateProps
  selectedDate?: string
  selectedDateArr?: string[]
  width?: React.CSSProperties['width']
  renderSelectedDate?: renderSelectedDateProps
  footer?: React.ReactNode | void
  renderHeader?: renderHeaderProps
  multiple?: boolean
  hasFooter?: boolean
  type?: 'date' | 'month' | 'year'
  className?: string
  months?: number
  years?: number
  style?: Attributes
  selectedRange?: {
    fromDate: string
    toDate: string
  }
  setHoverValue?: (val: string) => void
  hoverValue?: string
  onChangeMonthLeftCalendar?: (month: number) => void
  onChangeMonthRightCalendar?: (month: number) => void
  onChangeYear?: (year: number) => void
}

export const arrMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export type IModes = 'date' | 'month' | 'year'

export const Calendar: React.FC<CalendarProps> = ({
  visible = false,
  multiple = false,
  hasFooter = true,
  disabledHoliday = false,
  format = DATE_FORMATS.MDY,
  selectedDate = '',
  disabledDate = [''],
  width = '300px',
  footer = '',
  type = 'date',
  renderHeader,
  disabledRange,
  onChangeDate = () => {},
  renderSelectedDate,
  selectedDateArr,
  months,
  years,
  className = '',
  style,
  selectedRange,
  setHoverValue,
  hoverValue = '',
  onChangeMonthLeftCalendar,
  onChangeMonthRightCalendar,
  onChangeYear
}) => {
  const { t } = useTranslation()
  const [time, setTime] = useState<{ year: number; month: number }>({
    year: 0,
    month: 0
  })
  const [value, setValue] = useState<string>()
  const [arrValue, setArrayValue] = useState<string[] | []>([])
  const [currentMode, setCurrentMode] = useState<IModes>(type)

  useEffect(() => {
    if (!months && !years) {
      const date = new Date()
      const currentMonth = moment(date, format).month()
      const currentYear = moment(date, format).year()
      setTime({ year: currentYear, month: currentMonth })
    }
  }, [])

  useEffect(() => {
    if (years && (months || months === 0)) {
      setTime({ year: years, month: months })
    }
  }, [years, months])

  useEffect(() => {
    switch (type) {
      case 'date':
        {
          if (selectedDate) {
            const m = moment(selectedDate, format).month()
            const y = moment(selectedDate, format).year()
            if (y !== time.year || m !== time.month) {
              setTime(() => {
                return { year: y, month: m }
              })
            }
            setValue(selectedDate)
          }
          if (selectedDate === '') {
            setValue('')
          }
        }
        break
      case 'month':
        {
          if (selectedDate) {
            const index = arrMonths.indexOf(selectedDate)
            setTime((state) => {
              return { ...state, month: index }
            })
            setValue(selectedDate)
          }
        }
        break
      default:
        break
    }
  }, [selectedDate])

  useEffect(() => {
    if (selectedDateArr) {
      setArrayValue(selectedDateArr)
    }
  }, [selectedDateArr])

  useEffect(() => {
    if (selectedRange?.fromDate === '' && selectedRange.toDate === '') {
      setValue('')
    }
  }, [JSON.stringify(selectedRange)])

  const fromDate = selectedRange?.fromDate ? moment(selectedRange?.fromDate, format).startOf('day').format(format) : ''
  const toDate = selectedRange?.toDate ? moment(selectedRange?.toDate, format).endOf('day').format(format) : ''

  const onSelectToday = () => {
    const today = moment().format(format)
    const month = moment(today, format).month()
    const year = moment(today, format).year()
    setTime({ year, month })
    setValue(today)
    onChangeDate(today)
  }

  const onSelectDate = (e: MouseEvent<HTMLLIElement, MouseEvent>, date: Date | null) => {
    e.stopPropagation()
    const formatDate = moment(date, format).format(format)

    if (multiple) {
      let newArr: string[] = [...arrValue]
      if (newArr.includes(formatDate)) {
        newArr = newArr.filter((x: string) => x !== formatDate)
      } else {
        newArr = [...new Set([...arrValue, formatDate])]
      }
      setArrayValue(newArr)
      onChangeDate(newArr)
    } else {
      if (fromDate || toDate) {
        setValue(formatDate)
        onChangeDate(formatDate)
      }
      if (formatDate === value) {
        setValue('')
        onChangeDate('')
        return
      }
      setValue(formatDate)
      onChangeDate(formatDate)
    }
  }

  const changeMonth = (date: Date | null) => {
    if (months && years) return false
    const month = moment(date, format).month()
    const year = moment(date, format).year()
    setTime({ year, month })
  }

  const checkDisabled = (date: string) => {
    let validateRange = false
    if (disabledRange) validateRange = disabledRange(date)
    const validateDate = disabledDate.find((d) => d === date)
    return !!validateDate || validateRange
  }

  const increaseMonth = () => {
    if (time.month === 11) return setTime({ year: time.year + 1, month: 0 })
    setTime((state) => {
      return { ...state, month: state.month + 1 }
    })
  }

  const decreaseMonth = () => {
    if (time.month === 0) return setTime({ year: time.year - 1, month: 11 })
    setTime((state) => {
      return { ...state, month: state.month - 1 }
    })
  }

  const increaseYear = () => {
    setTime((state) => {
      return { ...state, year: state.year + 1 }
    })
  }

  const decreaseYear = () => {
    setTime((state) => {
      return { ...state, year: state.year - 1 }
    })
  }

  const onChangeMonthYear = ({ month, year }: InterfaceMonthDate) => {
    setTime({ month, year })
  }

  const onChangeMode = (mode: IModes) => {
    setCurrentMode(mode)
  }

  const renderCalendar = () => {
    switch (currentMode) {
      case 'month': {
        return (
          <CalendarMonth
            arrMonths={arrMonths}
            value={value}
            arrValue={arrValue}
            setTime={setTime}
            multiple={multiple}
            setArrayValue={setArrayValue}
            setValue={setValue}
            onChangeDate={onChangeDate}
            type={type}
            setCurrentMode={setCurrentMode}
            month={time.month}
            onChangeMonthLeftCalendar={onChangeMonthLeftCalendar}
            onChangeMonthRightCalendar={onChangeMonthRightCalendar}
          />
        )
      }
      case 'year': {
        return (
          <CalendarYear
            time={time}
            setTime={setTime}
            type={type}
            setCurrentMode={setCurrentMode}
            onChangeDate={onChangeDate}
            multiple={multiple}
            arrValue={arrValue}
            setArrayValue={setArrayValue}
            value={value}
            setValue={setValue}
            onChangeYear={onChangeYear}
          />
        )
      }
      default: {
        return (
          <CalendarDate
            time={time}
            format={format}
            selectedRange={selectedRange}
            disabledHoliday={disabledHoliday}
            value={value}
            hoverValue={hoverValue}
            fromDate={fromDate}
            toDate={toDate}
            setHoverValue={setHoverValue}
            renderSelectedDate={renderSelectedDate}
            onSelectDate={onSelectDate}
            changeMonth={changeMonth}
            checkDisabled={checkDisabled}
          />
        )
      }
    }
  }

  const renderFooter = () => {
    if (footer !== '') return footer
    if (currentMode !== 'date' || !hasFooter) return null
    return (
      <div className='flex h-10 items-center justify-center border-t border-border-200'>
        <p
          onClick={onSelectToday}
          className={`${
            checkDisabled(moment().format(format))
              ? 'pointer-events-none opacity-50'
              : 'hover:opacity-70 cursor-pointer'
          }  font-bold text-primary-500 `}
        >
          {t('app.today')}
        </p>
      </div>
    )
  }

  const renderHeaders = () => {
    if (renderHeader && currentMode === 'date')
      return renderHeader(
        onChangeMonthYear,
        {
          year: time.year,
          month: time.month
        },
        onChangeMode
      )
    return currentMode === 'date' ? (
      <ul className={`flex select-none items-center justify-between border-b border-border-200 p-2`}>
        <li className='flex gap-2'>
          <span onClick={decreaseYear} className='hover:opacity-100 cursor-pointer opacity-70'>
            <IconDoubleArrowLeft color='var(--text-primary)' />
          </span>

          <span onClick={decreaseMonth} className='hover:opacity-100 cursor-pointer opacity-70'>
            <IconLeftArrow color='var(--text-primary)' />
          </span>
        </li>
        <li>
          <div className='flex gap-3'>
            <span onClick={() => setCurrentMode('month')} className='cursor-pointer font-medium hover:text-primary-500'>
              {arrMonths[time.month]}
            </span>
            <span onClick={() => setCurrentMode('year')} className='cursor-pointer font-medium hover:text-primary-500'>
              {time.year}
            </span>
          </div>
        </li>
        <li className='flex gap-2'>
          <span onClick={increaseMonth} className='hover:opacity-100 cursor-pointer opacity-70'>
            <IconRightArrow color='var(--text-primary)' />
          </span>

          <span onClick={increaseYear} className='hover:opacity-100 cursor-pointer opacity-70'>
            <IconDoubleArrowRight color='var(--text-primary)' />
          </span>
        </li>
      </ul>
    ) : null
  }

  return visible ? (
    <div
      style={{
        width: width,
        ...style
      }}
      className={`calendar rounded-lg bg-white text-sm shadow-lg ${className}`}
    >
      {renderHeaders()}
      <div className='m-auto w-full'>{renderCalendar()}</div>
      {renderFooter()}
    </div>
  ) : null
}
