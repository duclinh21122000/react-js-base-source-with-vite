import { MouseEvent } from 'react'
import moment from 'moment'

import { CalendarProps, InterfaceMonthDate } from '.'

export interface ICalendarDate extends CalendarProps {
  time: { year: number; month: number }
  value?: string
  arrValue?: string[]
  fromDate?: string
  toDate?: string
  onSelectDate: (e: any, date: Date | null) => void
  changeMonth: (date: Date | null) => void
  checkDisabled: (date: string) => boolean
}

const CalendarDate = (props: ICalendarDate) => {
  const {
    time,
    format,
    selectedRange,
    disabledHoliday,
    value,
    arrValue,
    hoverValue,
    fromDate,
    toDate,
    setHoverValue = () => {},
    renderSelectedDate,
    onSelectDate = () => {},
    changeMonth = () => {},
    checkDisabled
  } = props
  const dayOfWeeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const innerDateNode = 'flex items-center justify-center rounded-md h-[25px] w-[25px]'
  const disabledInner = 'before:bg-gray-200 before:w-full before:h-[25px] before:absolute before:opacity-50 before:z-50'
  const selectedInner = 'before:bg-primary-200 before:w-full before:h-[25px] before:absolute before:z-10'
  const fromInner = 'before:left-1/2 before:w-1/2'
  const toInner = 'before:right-1/2 before:w-1/2'
  const hoverInner =
    'before:w-[95%] before:h-[25px] before:absolute before:z-10 before:border-t before:border-b before:border-border-primary before:border-dashed before:transition-colors'
  const startHoverInner = 'before:border-l before:rounded-l-lg'
  const endHoverInner = 'before:border-r before:rounded-r-lg'
  const disabledStyle = 'select-none text-text-500'
  const selectedStyle = 'bg-bg-primary font-semibold text-white'
  const fromToDateCss = '!bg-bg-primary font-semibold !rounded-none text-white'
  const fromDateStyle = '!rounded-l-md z-20'
  const toDateStyle = '!rounded-r-md z-20'

  // find index of first date of any month
  const getIndexFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // find index first date of selected month
  const indexFirstDayCurrentMonth = getIndexFirstDayOfMonth(time.year, time.month)

  // get all dates of any month, return to array include all dates information
  const getDaysInMonth = ({ year, month }: InterfaceMonthDate) => {
    const daysCount = new Date(year, month + 1, 0).getDate()
    const arr = new Array(daysCount).fill(1)
    const arrDateInMonth = arr.map((index) => {
      return index + 1 <= daysCount ? new Date(year, month, index + 1) : null
    })
    return arrDateInMonth
  }

  // generate list of dates in prev month - current month - next month
  const generatePrevMonth = () => {
    let dateOfPrevMonth = []
    if (time.month === 0) {
      dateOfPrevMonth = getDaysInMonth({
        year: time.year - 1,
        month: 11
      })
    } else {
      dateOfPrevMonth = getDaysInMonth({
        year: time.year,
        month: time.month - 1
      })
    }
    return dateOfPrevMonth
  }

  const generateCurrentMonth = () => {
    const dateOfCurrentMonth = getDaysInMonth({
      year: time.year,
      month: time.month
    })
    return dateOfCurrentMonth
  }

  const generateNextMonth = () => {
    let dateOfNextMonth = []
    if (time.month === 11) {
      dateOfNextMonth = getDaysInMonth({
        year: time.year + 1,
        month: 0
      })
    } else {
      dateOfNextMonth = getDaysInMonth({
        year: time.year,
        month: time.month + 1
      })
    }
    return dateOfNextMonth
  }

  // validate date

  const checkSelected = (date: string) => {
    if (selectedRange) {
      const validate =
        moment(selectedRange.toDate, format).isSame(moment(date, format), 'day') ||
        moment(selectedRange.fromDate, format).isSame(moment(date, format), 'day')
      return validate
    }
    if (value) {
      const validateString = moment(date, format).isSame(moment(value, format), 'day')
      return validateString
    }
    if (arrValue) {
      const validateArray = arrValue.find((d) => d === date)
      return !!validateArray
    }
    return false
  }

  const checkIsFromDate = (date: string) => {
    return date === fromDate
  }

  const checkIsToDate = (date: string) => {
    return date === toDate
  }

  const checkSelectedRange = (date: string) => {
    return moment(date, format).isBetween(moment(fromDate, format), moment(toDate, format))
  }

  const checkCurrent = (date: string) => {
    return moment(date, format).isSame(new Date(), 'day')
  }

  const checkIsHoverRange = (date: Date | null) => {
    if (hoverValue && (fromDate || toDate)) {
      const isInRange =
        moment(date, format).isBetween(moment(fromDate, format), moment(hoverValue, format)) ||
        moment(date, format).isBetween(moment(hoverValue, format), moment(fromDate, format)) ||
        moment(date, format).isBetween(moment(toDate, format), moment(hoverValue, format)) ||
        moment(date, format).isBetween(moment(hoverValue, format), moment(toDate, format))
      return isInRange
    }
    return false
  }

  // render date on calendar
  const renderDaysPrevMonth = () => {
    const arrayPrevMonth = generatePrevMonth()
    let sliceDate = []
    if (indexFirstDayCurrentMonth === 0) sliceDate = arrayPrevMonth.slice(-7)
    else sliceDate = arrayPrevMonth.slice(-indexFirstDayCurrentMonth)
    return sliceDate.map((day, index) => {
      const date = moment(day, format).format(format)
      const isSunday = moment(date, format).day() === 0
      const isSaturday = moment(date, format).day() === 6
      const isHoliday = isSunday || isSaturday
      const isDisabled = checkDisabled(date) || (isHoliday && disabledHoliday)
      const disabled = isDisabled ? `${disabledStyle} ${disabledInner}` : ''
      if (isDisabled) {
        return (
          <li
            key={`day-${index}`}
            className={`relative z-50 flex h-[36px] cursor-not-allowed items-center justify-center ${disabled}`}
            style={{ width: 'calc(100% / 7)' }}
          >
            <div title={date}>{arrayPrevMonth.length - sliceDate.length + index + 1}</div>
          </li>
        )
      }
      return (
        <li
          key={`day-${index}`}
          onClick={(e) => {
            onSelectDate(e as MouseEvent, day)
            changeMonth(day)
          }}
          className={`relative z-20 flex h-[36px] cursor-pointer items-center justify-center bg-white `}
          style={{ width: 'calc(100% / 7)' }}
        >
          <div title={date} className={`${innerDateNode} text-text-500 hover:bg-gray-100`}>
            {arrayPrevMonth.length - sliceDate.length + index + 1}
          </div>
        </li>
      )
    })
  }

  const renderDaysInMonth = () => {
    const arrayCurrentMonth = generateCurrentMonth()
    return arrayCurrentMonth.map((day, index) => {
      const date = moment(day, format).format(format)
      const isSunday = moment(date, format).day() === 0
      const isSaturday = moment(date, format).day() === 6
      const isHoliday = isSunday || isSaturday
      const isSelected = checkSelected(date)
      const selected = isSelected ? selectedStyle : ''
      const isDisabled = checkDisabled(date) || (isHoliday && disabledHoliday)
      const isCurrent = checkCurrent(date)
      const isInRange = checkSelectedRange(date)
      const isFromDate = checkIsFromDate(date)
      const isToDate = checkIsToDate(date)
      const isInHoverRange = checkIsHoverRange(day) && !isInRange
      const haveRange = fromDate !== '' && toDate !== ''
      let current = ''
      if (isCurrent) current = 'border border-border-primary'
      if (isCurrent && isDisabled) current = 'border border-gray-500'
      const disabled = isDisabled ? `${disabledStyle} ${disabledInner}` : ''
      let fromAndToCss = ''
      if (isFromDate && haveRange && fromDate !== toDate) fromAndToCss = `${fromToDateCss} ${fromDateStyle}`
      if (isToDate && haveRange && fromDate !== toDate) fromAndToCss = `${fromToDateCss} ${toDateStyle}`
      const rangeInnerCss = isInRange ? selectedInner : ''
      const fromInnerCss = isFromDate && haveRange && fromDate !== toDate ? `${selectedInner} ${fromInner}` : ''
      const toInnerCss = isToDate && haveRange && fromDate !== toDate ? `${selectedInner} ${toInner}` : ''
      const isRenderCustomSelected = renderSelectedDate !== undefined && checkSelected(date)
      const startHoverInnerCss = isInHoverRange && (index === 0 || isSunday) ? startHoverInner : ''
      const endHoverInnerCss =
        isInHoverRange && (arrayCurrentMonth.length - 1 === index || isSaturday) ? endHoverInner : ''
      const hoverInnerCss = isInHoverRange ? `${hoverInner} ${startHoverInnerCss} ${endHoverInnerCss}` : ''
      if (isDisabled) {
        return (
          <li
            key={`day-${index}`}
            className={`relative z-50 flex h-[36px] cursor-not-allowed items-center justify-center ${disabled} ${
              isSelected
                ? 'after:absolute after:h-[25px] after:w-[28px] after:rounded after:border after:border-primary-500'
                : ''
            }`}
            style={{ width: 'calc(100% / 7)' }}
          >
            <div title={date}>{index + 1}</div>
          </li>
        )
      }
      if (isRenderCustomSelected) {
        return renderSelectedDate(index + 1, day, onSelectDate)
      }

      return (
        <li
          onMouseOver={() => {
            setHoverValue ? setHoverValue(date) : false
          }}
          onMouseOut={() => {
            setHoverValue ? setHoverValue('') : false
          }}
          key={`day-${index}`}
          onClick={(e) => onSelectDate(e, day)}
          className={`relative flex h-[36px] cursor-pointer items-center justify-center text-text-main ${disabled} ${rangeInnerCss} ${fromInnerCss} ${toInnerCss} ${
            !isFromDate && !isToDate ? hoverInnerCss : ''
          } group/date`}
          style={{ width: 'calc(100% / 7)' }}
        >
          <div
            title={date}
            className={`${selected} ${current} ${innerDateNode} ${
              !selected && !current && !isInRange ? 'hover:bg-bg-300' : ''
            } ${isInRange ? 'relative z-20 text-gray-900' : ''} ${fromAndToCss} ${
              isSelected ? 'group-hover/date:bg-primary-700' : 'group-hover/date:bg-gray-200'
            }`}
          >
            {index + 1}
          </div>
        </li>
      )
    })
  }

  const renderDaysNextMonth = () => {
    const arrayCurrentMonth = generateCurrentMonth()
    const arrayNextMonth = generateNextMonth()
    const arrayPrevMonth = generatePrevMonth().slice(-indexFirstDayCurrentMonth)
    const calcLimit =
      indexFirstDayCurrentMonth === 0
        ? 35 - arrayCurrentMonth.length
        : 42 - arrayCurrentMonth.length - arrayPrevMonth.length
    return arrayNextMonth.map((day, index) => {
      const date = moment(day, format).format(format)
      const isSunday = moment(date, format).day() === 0
      const isSaturday = moment(date, format).day() === 6
      const isHoliday = isSunday || isSaturday
      const isDisabled = checkDisabled(date) || (isHoliday && disabledHoliday)
      const disabled = isDisabled ? `${disabledStyle} ${disabledInner}` : ''

      const render = () => {
        if (isDisabled) {
          return (
            <li
              key={`day-${index}`}
              className={`relative z-50 flex h-[36px] cursor-not-allowed items-center justify-center ${disabled}`}
              style={{ width: 'calc(100% / 7)' }}
            >
              <div title={date}>{index + 1}</div>
            </li>
          )
        }
        return (
          <li
            key={`day-${index}`}
            onClick={(e) => {
              onSelectDate(e, day)
              changeMonth(day)
            }}
            className={`relative z-20 flex h-[36px] cursor-pointer items-center justify-center bg-white ${disabled}`}
            style={{ width: 'calc(100% / 7)' }}
          >
            <div title={date} className={`${innerDateNode} hover:bg-gray-100 text-text-500`}>
              {index + 1}
            </div>
          </li>
        )
      }
      return index < calcLimit ? render() : null
    })
  }
  return (
    <>
      <ul className='flex w-full justify-between px-[10px] pt-1 text-text-primary'>
        {dayOfWeeks.map((week) => {
          return (
            <li
              key={week}
              className='flex h-[36px] items-center justify-center text-center'
              style={{ width: 'calc(100% / 7)' }}
            >
              {week}
            </li>
          )
        })}
      </ul>
      <div className='flex w-full flex-wrap px-[10px] py-1'>
        {renderDaysPrevMonth()}
        {renderDaysInMonth()}
        {renderDaysNextMonth()}
      </div>
    </>
  )
}

export default CalendarDate
