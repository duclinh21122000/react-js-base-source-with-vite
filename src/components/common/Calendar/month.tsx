import { CalendarProps, IModes } from '.'

interface ICalendarMonth extends CalendarProps {
  arrMonths: string[]
  value?: string
  setValue: (val: string) => void
  setTime: (state: any) => void
  arrValue: string[]
  setArrayValue: (val: string[]) => void
  month: number
  setCurrentMode?: (state: IModes) => void
}

const CalendarMonth = (props: ICalendarMonth) => {
  const {
    arrMonths,
    value,
    arrValue,
    setTime,
    multiple = false,
    setArrayValue = () => {},
    onChangeDate = () => {},
    setValue = () => {},
    type,
    setCurrentMode = () => {},
    month,
    onChangeMonthLeftCalendar,
    onChangeMonthRightCalendar
  } = props

  const onSelectMonth = (name: string, month: number) => {
    if (onChangeMonthLeftCalendar) onChangeMonthLeftCalendar(month)
    if (onChangeMonthRightCalendar) onChangeMonthRightCalendar(month)
    setTime((state: any) => {
      return { ...state, month }
    })
    if (type === 'date') {
      setCurrentMode('date')
      return
    }
    if (type === 'month') {
      if (multiple) {
        let newArr: string[] = [...arrValue]
        if (newArr.includes(name)) {
          newArr = newArr.filter((x: string) => x !== name)
        } else {
          newArr = [...new Set([...arrValue, name])]
        }
        setArrayValue(newArr)
        onChangeDate(newArr)
      } else {
        if (name === value) {
          setValue('')
          onChangeDate('')
          return
        }
        setValue(name)
        onChangeDate(name)
      }
    }
  }

  const renderHeaders = () => {
    const monthName = arrMonths[month]
    return (
      <ul className={`flex select-none items-center justify-center border-b border-border-200 p-2`}>
        <li>
          <span onClick={() => setCurrentMode('month')} className='font-medium'>
            {monthName}
          </span>
        </li>
      </ul>
    )
  }

  const renderMonth = () => {
    return arrMonths.map((months, index) => {
      const monthStyle =
        arrMonths[month] === months || arrValue.find((item) => item === months)
          ? 'bg-bg-primary text-white font-medium'
          : 'hover:bg-bg-100 '

      return (
        <div
          key={months}
          className='flex cursor-pointer items-center justify-center p-2'
          onClick={() => onSelectMonth(months, index)}
        >
          <span className={`rounded-md px-4 py-2 text-text-primary ${monthStyle}`}>{months.substring(0, 3)}</span>
        </div>
      )
    })
  }

  return (
    <>
      {renderHeaders()}
      <div className='grid grid-flow-row grid-cols-3 gap-4'>{renderMonth()}</div>
    </>
  )
}

export default CalendarMonth
