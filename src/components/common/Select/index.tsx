import { FC, Key, ReactNode, Ref, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { portalIds } from '@/utils/constants/portal-key'
import { useCalculatePosition } from '@/utils/hooks/useCalculatePosition'
import { useClickOutside } from '@/utils/hooks/useClickOutside'
import { useWheelModal } from '@/utils/hooks/useWheelModal'
import IconCheck from '@/utils/icons/IconCheck'
import IconCloseX from '@/utils/icons/IconCloseX'
import IconDownArrow from '@/utils/icons/IconDownArrow'
import IconHalfCircleLoad from '@/utils/icons/IconHalfCircleLoad'
import IconX from '@/utils/icons/IconX'

import { Empty } from '../Empty'
import Spinner from '../Spinner'

export interface Children {
  value: string
  children: ReactNode
  label: string
  disabled?: boolean
  className?: string
  style?: {
    [key: string]: string | number
  }
}

export interface OptionsProps {
  value: string
  label: string | ReactNode | any
  disable?: boolean
}

export type SelectValueProps = string | string[]

type ChildrenProps = {
  props: Children
}

export type SelectValueChangeProps = string | number | (string | number | undefined)[]

export interface SelectProps {
  children?: ChildrenProps[]
  suffixIcon?: ReactNode
  defaultValue?: string | string[]
  /**
   * @deprecated Use {@link defaultValue} instead.
   */
  defaultValueArr?: string[]
  /**
   * @deprecated Use {@link value} instead.
   */
  values?: string[] | string
  value?: string[] | string
  onChange?: (val: SelectValueProps, option?: OptionsProps | OptionsProps[]) => void
  /**
   * @deprecated Use {@link onChange} instead.
   */
  onValuesChange?: (val: SelectValueProps) => void
  onSearch?: (val: Key) => void
  className?: string
  width?: string | number
  maxHeight?: number
  style?: {
    [key: string]: string | number
  }
  register?: object
  isLoading?: boolean
  disabled?: boolean
  showSearch?: boolean
  multiple?: boolean
  allowClear?: boolean
  options?: OptionsProps[]
  placeholder?: string
  renderOptions?: (label: ReactNode) => ReactNode
  renderLabels?: (label: ReactNode) => ReactNode
  renderEmpty?: () => ReactNode
  renderMultiple?: (label: string, onClear: (e: MouseEvent) => void) => ReactNode
  prefix?: ReactNode
  validateErrors?: boolean
  filterOption?: boolean | ((options: OptionsProps[], searchKey: string) => OptionsProps[])
  handleScroll?: (ref: Ref<HTMLElement>) => void
  placement?: 'left' | 'right'
  descriptionEmpty?: string
  imageEmpty?: ReactNode
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void
  onClear?: () => void
  onScrollToBottom?: () => void
  deSelect?: boolean
  header?: ReactNode
  footer?: ReactNode
}
type SelectComponent = FC<SelectProps> & { Option: FC<Children> }

const portalId = portalIds.select
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

export const Select: SelectComponent = (props) => {
  const {
    children,
    onChange = () => {},
    onValuesChange = () => {},
    defaultValue,
    values: value1,
    value: value2,
    width = 'fit-content',
    maxHeight = 300,
    className = '',
    placement,
    style,
    isLoading = false,
    disabled = false,
    showSearch = false,
    multiple = false,
    allowClear = true,
    validateErrors = false,
    suffixIcon,
    options,
    placeholder = '',
    renderOptions,
    renderLabels,
    renderMultiple,
    renderEmpty,
    register,
    prefix,
    onSearch = () => {},
    filterOption = true,
    handleScroll = () => {},
    descriptionEmpty,
    imageEmpty,
    onKeyDown = () => {},
    onClear = () => {},
    onScrollToBottom = () => {},
    deSelect = true,
    header,
    footer
  } = props
  const { t } = useTranslation()
  const placeholderValue = placeholder || t('app.placeholderSelect')
  const selectRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<any>(null)
  const inputRef = useRef<any>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const minHeightOption = 200

  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [valueState, setValueState] = useState<string | undefined>(
    typeof defaultValue === 'string' ? defaultValue : undefined
  )
  const [labels, setLabels] = useState<string | React.ReactNode>(placeholderValue)
  const [arrValueState, setArrValueState] = useState<string[]>(typeof defaultValue === 'object' ? defaultValue : [])
  const [visible, setVisible] = useState<boolean>(false)
  const [searchKey, setSearchKey] = useState<string>('')

  const value = value2 || value1

  const renderLabelChildren = () => {
    const item =
      children &&
      children.find((child) => {
        return child?.props?.value === valueState
      })
    setLabels(item?.props.children)
    setVisible(false)
  }

  const renderLabelOptions = () => {
    const item =
      options &&
      options.find((child) => {
        return child?.value === valueState
      })
    const string = item?.label
    setLabels(string)
    setVisible(false)
  }

  const onRemoveAnimate = () => {
    dropdownRef.current?.classList.remove('animate-fade-up')
    setVisible(false)
  }

  useClickOutside({
    ref: selectRef,
    handler: () => {
      dropdownRef.current?.classList.add('animate-fade-up')
      dropdownRef.current?.addEventListener('animationend', () => {
        onRemoveAnimate()
      })
      setSearchKey('')
    },
    childrenRef: dropdownRef
  })
  useCalculatePosition({
    actionRef: selectRef,
    dropdownRef,
    visible,
    container,
    placement,
    dependencies: { values: arrValueState, searchKey }
  })

  useEffect(() => {
    if (!valueState || !arrValueState) setLabels(placeholderValue)
  }, [valueState, JSON.stringify(arrValueState)])

  useEffect(() => {
    if (visible) {
      if (showSearch) inputRef.current.focus()
      handleScrollItem()
      dropdownRef.current?.classList.add('animate-fade-down')
    } else {
      dropdownRef.current?.classList.remove('animate-fade-down')
      dropdownRef.current?.removeEventListener('animationend', () => {
        onRemoveAnimate()
      })
    }
  }, [visible])

  useWheelModal({
    callback: () => setVisible(false)
  })

  const handleObserver = ([entries]: IntersectionObserverEntry[]) => {
    if (entries.isIntersecting && !isLoading) {
      onScrollToBottom()
    }
  }

  useEffect(() => {
    if (loaderRef.current && options?.length) {
      const observer = new IntersectionObserver(handleObserver, {
        root: dropdownRef.current,
        rootMargin: '20px',
        threshold: 1.0
      })
      if (loaderRef && loaderRef.current) {
        observer.observe(loaderRef.current)
      }
      if (!visible && loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [visible])

  useEffect(() => {
    if (valueState) options ? renderLabelOptions() : renderLabelChildren()
  }, [valueState, options])

  useEffect(() => {
    if (defaultValue === undefined) {
      if (value === undefined || value === null) {
        setValueState(undefined)
        setArrValueState([])
      } else {
        typeof value === 'string' ? setValueState(value) : setArrValueState(value || [])
      }
    }
  }, [value, defaultValue])

  useEffect(() => {
    const containerData = createContainer()
    setContainer(containerData)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value.trimStart()
    if (disabled || isLoading) return
    setSearchKey(key)
    onSearch(key)
  }

  const onSelect = (e: MouseEvent | any, option: OptionsProps) => {
    e.stopPropagation()
    // multiple just support on options
    const deepArr = arrValueState ? [...arrValueState] : []
    if (multiple && !options) return false
    const { value: val } = option
    if (multiple) {
      let newArr: string[] = deepArr
      if (newArr.includes(val)) {
        newArr = newArr.filter((x) => x !== val)
      } else {
        newArr = [...new Set([...deepArr, val])]
      }
      const list = options?.filter((i) => newArr.includes(i.value))
      setArrValueState(newArr)
      onChange(newArr, list)
      onValuesChange(newArr)
      setSearchKey('')
    } else {
      if (val === valueState) {
        if (deSelect) {
          setValueState('')
          onChange('', option)
          onValuesChange('')
        }
      } else {
        setValueState(val)
        onChange(val, option)
        onValuesChange(val)
      }
      setSearchKey('')
    }
  }

  const onCancelSelect = (e: MouseEvent | any, value: string) => {
    e.stopPropagation()
    const arr = arrValueState ? [...arrValueState] : []
    const filter = arr.filter((item) => item !== value)
    setArrValueState(filter)
    const list = options?.filter((i) => filter.includes(i.value))
    onChange(filter, list)
    onValuesChange(filter)
  }

  const handleClear = (e: MouseEvent | any) => {
    e.stopPropagation()
    setArrValueState([])
    setValueState(undefined)
    onChange('')
    onValuesChange('')
    onClear()
  }

  const currentRef = useRef<HTMLLIElement | null>(null)
  const handleScrollItem = () => {
    const top = (currentRef?.current?.offsetTop || 0) - 4
    if (dropdownRef && dropdownRef.current) {
      dropdownRef.current.scroll({
        top: top,
        behavior: 'smooth'
      })
    }
  }

  const renderSimple = () => {
    return (
      <div className='w-full px-1'>
        {showSearch ? (
          <input
            ref={inputRef}
            className={`bg-white text-main ${!visible ? 'hidden' : 'w-full'}`}
            type='search'
            value={searchKey}
            placeholder={placeholderValue}
            disabled={disabled || isLoading}
            onChange={handleSearch}
            onClick={(e) => {
              const check = !disabled && !isLoading
              check && setVisible(true)
              e.stopPropagation()
              return false
            }}
            autoComplete='off'
          />
        ) : null}
        <span
          className={`select-none appearance-none truncate text-main ${
            visible && showSearch ? 'hidden' : 'w-full'
          } ${valueState ? '' : 'opacity-70'}`}
        >
          {renderLabels && options ? renderLabels(labels) : labels}
        </span>
      </div>
    )
  }

  const renderMultipleSelect = () => {
    const arr = options && options.filter((i) => (arrValueState || []).includes(i.value))
    return (
      <>
        {arr && arr.length > 0
          ? arr.map((item: OptionsProps) => {
              return renderMultiple ? (
                renderMultiple(item.label, (e) => onCancelSelect(e, item.value))
              ) : (
                <div
                  key={item.value}
                  className='flex w-fit items-center justify-between gap-2 rounded-lg border border-border-200 px-2 py-1 text-main'
                >
                  <span className='text-sm font-medium'>{item.label}</span>
                  <span
                    onClick={(e) => !disabled && !isLoading && onCancelSelect(e, item.value)}
                    style={{
                      cursor: disabled || isLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <IconX color='var(--text-primary)' />
                  </span>
                </div>
              )
            })
          : null}
        {showSearch ? (
          <input
            ref={inputRef}
            onChange={handleSearch}
            type='text'
            value={searchKey}
            style={{
              display: visible || !arrValueState.length ? 'block' : 'none',
              width: visible ? 50 : 1,
              background: disabled || isLoading ? 'var(--bg-disabled)' : 'var(--bg-secondary)',
              cursor: disabled || isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={disabled || isLoading}
            className={`h-5 flex-1 p-1 text-main focus:outline-none`}
            size={10}
            placeholder={arrValueState && arrValueState.length > 0 ? '' : placeholderValue}
            onClick={(e) => {
              const check = !disabled && !isLoading
              check && setVisible(true)
              e.stopPropagation()
              return false
            }}
          />
        ) : null}
        {arrValueState && arrValueState.length === 0 && !showSearch ? (
          <span style={{ opacity: multiple ? 0.7 : 1 }} className='px-1 text-main'>
            {labels}
          </span>
        ) : null}
      </>
    )
  }

  const renderSuffixIcon = () => {
    if (isLoading) return <Spinner indicator={<IconHalfCircleLoad width={18} />} />
    const isClear = !disabled && allowClear && ((arrValueState && arrValueState.length > 0) || !!valueState)
    return (
      <>
        <span className={`${isClear && 'group-hover/icon:block'} hidden `} onClick={(e) => handleClear(e)}>
          <IconCloseX color='var(--text-500)' />
        </span>
        <div className={`flex h-full items-center justify-center ${isClear && 'group-hover/icon:hidden'} `}>
          {suffixIcon || (
            <span className='flex w-[18px] justify-center'>
              <IconDownArrow width={14} color='var(--text-primary)' />
            </span>
          )}
        </div>
      </>
    )
  }

  // render dropdown menu
  const renderChildren = () => {
    if (children?.length === 0)
      return renderEmpty ? renderEmpty() : <Empty description={descriptionEmpty} src={imageEmpty} />

    return (
      children &&
      children.map((child) => {
        const { props } = child
        const selected = valueState === props.value ? 'text-text-primary bg-bg-100 font-medium cursor-pointer' : ''
        const normal =
          valueState !== props.value && !props.disabled
            ? 'hover:bg-bg-50 cursor-pointer transition duration-100 ease-in-out'
            : ''
        const disabled = props.disabled ? 'cursor-not-allowed opacity-25' : ''
        return (
          <li
            onClick={(e) => {
              if (props.disabled) return false
              onSelect(e, {
                label: props.label,
                value: props.value,
                disable: props.disabled
              })
            }}
            key={props.value}
            className={`flex h-9 select-none items-center px-3 py-1 text-left ${selected} ${normal} ${disabled}`}
          >
            {props.children}
          </li>
        )
      })
    )
  }

  const renderOption = () => {
    let arrMap: OptionsProps[] = []
    if (typeof filterOption === 'boolean' && options) {
      if (filterOption) {
        const filter = options.filter((item) => item.label.toString().toLowerCase().includes(searchKey.toLowerCase()))
        arrMap = [...filter]
      } else {
        arrMap = [...options]
      }
    }
    if (typeof filterOption === 'function' && options) {
      arrMap = [...filterOption(options, searchKey)]
    }

    if (arrMap?.length === 0)
      return renderEmpty ? renderEmpty() : <Empty description={descriptionEmpty} src={imageEmpty} />
    return arrMap
      ? arrMap.map((opt) => {
          const firstOption = options?.find((i) => (arrValueState || []).includes(i.value))

          const checkMultiSelected = (arrValueState || []).includes(opt.value)
          const selectCurrentRef = valueState
            ? valueState === opt.value
              ? currentRef
              : null
            : firstOption && firstOption?.value === opt.value
              ? currentRef
              : null

          const selected =
            valueState === opt.value || checkMultiSelected
              ? 'text-text-primary bg-bg-100 font-medium cursor-pointer'
              : ''
          const normal =
            valueState !== opt.value && !opt.disable
              ? 'hover:bg-bg-50 cursor-pointer transition duration-100 ease-in-out'
              : ''
          const disabled = opt.disable ? 'cursor-not-allowed opacity-25' : ''
          const multiples = multiple ? 'justify-between' : ''
          const createLabel = `${t('select.create')} "${searchKey}"`
          const searchSelectedCss =
            options && (searchKey === opt.label || createLabel === opt.label) ? 'bg-primary-200' : ''
          return (
            <li
              ref={selectCurrentRef}
              onClick={(e) => {
                e.stopPropagation()
                if (opt.disable) return false
                onSelect(e, opt)
              }}
              key={opt.value}
              className={`flex ${searchSelectedCss} h-[36px] select-none items-center rounded px-3 py-1 text-left ${selected} ${normal} ${disabled} ${multiples}`}
            >
              {renderOptions ? renderOptions(opt.label) : <span className='truncate text-main'>{opt.label}</span>}
              {selected && multiple ? <IconCheck width={18} color='var(--primary-500)' /> : null}
            </li>
          )
        })
      : null
  }

  const normalClass = !isLoading && !disabled ? 'cursor-pointer hover:border-primary-500' : ''
  const disabledClass = disabled || isLoading ? 'text-gray-500 !bg-bg-100 cursor-not-allowed' : ''
  const errorClass = validateErrors ? 'border-error-500' : 'border-border-200'

  const onClose = () => {
    if (disabled || isLoading) return false
    setVisible((state) => !state)
  }

  const renderDropdown = () => {
    return container ? (
      <>
        {createPortal(
          <ul
            ref={dropdownRef}
            onScroll={() => handleScroll(dropdownRef)}
            style={{
              zIndex: 999,
              transition: 'height 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
              minHeight: options && options?.length > 0 ? 'fit-content' : minHeightOption,
              maxHeight,
              padding: !visible ? 0 : ''
            }}
            className={`absolute overflow-y-auto overflow-x-hidden rounded-lg border border-border-200 bg-white py-[4px] text-sm shadow-xl`}
          >
            {header ? header : null}
            {options ? renderOption() : renderChildren()}
            {options && !!options.length ? <div ref={loaderRef} /> : null}
            {footer ? footer : null}
          </ul>,
          container
        )}
      </>
    ) : null
  }

  return (
    <div
      onKeyDown={(e) => {
        onKeyDown(e)
        if (e.key === 'Enter') {
          setSearchKey('')
        }
      }}
      ref={selectRef}
      onClick={onClose}
      style={{
        width: width,
        minHeight: 40,
        opacity: disabled || isLoading ? 0.7 : 1,
        ...style
      }}
      className={`group/icon relative flex items-center rounded-lg border bg-white px-2 py-1 text-sm ${errorClass} ${normalClass} ${disabledClass} ${className}`}
    >
      <div className='flex w-full items-center justify-between gap-1'>
        {prefix}
        <div className='flex w-full flex-wrap items-center gap-1 overflow-hidden'>
          {multiple ? renderMultipleSelect() : renderSimple()}
        </div>
        {renderSuffixIcon()}
      </div>
      {visible ? renderDropdown() : null}
      {register && <input value={valueState} className='h-0 w-0' {...register} />}
    </div>
  )
}

const SelectOption = () => {
  return <div />
}
Select.Option = SelectOption
