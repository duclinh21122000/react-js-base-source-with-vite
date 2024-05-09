import { useEffect, useState } from 'react'
import { groupBy } from 'lodash'

import IconDoubleArrowLeft from '@/utils/icons/IconDoubleArrowLeft'
import IconDoubleArrowRight from '@/utils/icons/IconDoubleArrowRight'

import { CalendarProps, IModes } from '.'

export interface ICalendarYear extends CalendarProps {
  time: { year: number; month: number }
  setTime?: (state: any) => void
  setCurrentMode?: (state: IModes) => void
  value?: string
  setValue?: (val: string) => void
  arrValue?: string[]
  setArrayValue?: (val: string[]) => void
}

const CalendarYear = (props: ICalendarYear) => {
  const {
    time,
    setTime = () => {},
    type,
    setCurrentMode = () => {},
    multiple,
    value,
    setValue = () => {},
    arrValue = [],
    setArrayValue = () => {},
    onChangeDate = () => {},
    onChangeYear
  } = props

  const [currentDecadeIndex, setDecadeIndex] = useState<number>(0)

  useEffect(() => {
    const index = Object.values(decadesObject).findIndex((item: any) => {
      return item.some((i: number) => i === time.year)
    })
    setDecadeIndex(index)
  }, [JSON.stringify(time.year)])

  const startYear = 1959
  const numberAr = new Array(152).fill(1)
  const arrYears = numberAr.map((_item, index) => startYear + index)

  const arrs = arrYears.map((item) => item / 10)

  const groupYear = groupBy(arrs, Math.trunc)

  const decadesObject: any = {}
  Object.keys(groupYear).forEach((key, index) => {
    decadesObject[index] = groupYear[key].map((year) => year * 10)
  })

  const onSelectYear = (year: number) => {
    const yearString = year.toString()
    if (onChangeYear) onChangeYear(year)
    setTime((state: any) => {
      return { ...state, year }
    })
    if (type === 'date') {
      setCurrentMode('date')
      return
    }
    if (type === 'year') {
      if (multiple) {
        let newArr: string[] = [...arrValue]

        if (newArr.includes(yearString)) {
          newArr = newArr.filter((x: string) => x !== yearString)
        } else {
          newArr = [...arrValue, yearString]
        }
        setArrayValue(newArr)
        onChangeDate(newArr)
      } else {
        if (yearString === value) {
          setValue('')
          onChangeDate('')
          return
        }
        setValue(yearString)
        onChangeDate(yearString)
      }
    }
  }

  const renderPreviousDecade = () => {
    const decades = decadesObject[currentDecadeIndex - 1] || []
    const item = decades.length > 1 ? decades[9] : decades[0]
    return item ? (
      <div
        key={item}
        className='flex cursor-pointer items-center justify-center p-2'
        onClick={() => onSelectYear(item)}
      >
        <span className={`rounded-md px-4 py-2 text-text-500 hover:bg-bg-100`}>{item}</span>
      </div>
    ) : (
      <div key={item} className='flex cursor-pointer items-center justify-center p-2'>
        <span className={`rounded-md px-4 py-2 text-text-500 hover:bg-bg-100`}>END</span>
      </div>
    )
  }

  const renderCurrentDecade = () => {
    return decadesObject[currentDecadeIndex].map((item: number) => {
      const yearStyle =
        time.year === item || arrValue.includes(item.toString())
          ? 'bg-bg-primary text-white font-medium'
          : 'hover:bg-bg-100 '
      return (
        <div
          key={item}
          className='flex cursor-pointer items-center justify-center p-2'
          onClick={() => onSelectYear(item)}
        >
          <span className={`rounded-md px-4 py-2 text-text-primary ${yearStyle}`}>{item}</span>
        </div>
      )
    })
  }

  const renderNextDecade = () => {
    const decades = decadesObject[currentDecadeIndex + 1] || []
    const item = decades[0]
    return item ? (
      <div
        key={item}
        className='flex cursor-pointer items-center justify-center p-2'
        onClick={() => onSelectYear(item)}
      >
        <span className={`rounded-md px-4 py-2 text-text-500  hover:bg-bg-100`}>{item}</span>
      </div>
    ) : (
      <div key={item} className='flex cursor-pointer items-center justify-center p-2'>
        <span className={`rounded-md px-4 py-2 text-text-500  hover:bg-bg-100`}>END</span>
      </div>
    )
  }

  const renderHeaders = () => {
    const decade = decadesObject[currentDecadeIndex]
    return (
      <ul className={`flex select-none items-center justify-between border-b border-border-200 p-2`}>
        <li className='flex gap-2'>
          {currentDecadeIndex === 0 ? null : (
            <span
              onClick={() => {
                setDecadeIndex(currentDecadeIndex - 1)
              }}
              className='hover:opacity-100 cursor-pointer opacity-70'
            >
              <IconDoubleArrowLeft color='var(--text-primary)' />
            </span>
          )}
        </li>
        <li>
          <div className='flex gap-1'>
            <span onClick={() => setCurrentMode('month')} className='font-medium'>
              {decade[0]}
            </span>
            {decade[0] && decade[9] ? '-' : null}
            <span onClick={() => setCurrentMode('year')} className='font-medium'>
              {decade[9]}
            </span>
          </div>
        </li>
        <li className='flex gap-2'>
          {currentDecadeIndex === 16 ? null : (
            <span
              onClick={() => {
                setDecadeIndex(currentDecadeIndex + 1)
              }}
              className='hover:opacity-100 cursor-pointer opacity-70'
            >
              <IconDoubleArrowRight color='var(--text-primary)' />
            </span>
          )}
        </li>
      </ul>
    )
  }

  return (
    <>
      {renderHeaders()}
      <div className='grid grid-flow-row grid-cols-3 gap-4'>
        {renderPreviousDecade()}
        {renderCurrentDecade()}
        {renderNextDecade()}
      </div>
    </>
  )
}

export default CalendarYear
