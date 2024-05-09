import { ReactNode, useEffect, useState } from 'react'

import IconEyeInvisible from '@/utils/icons/IconEyeInvisible'
import IconEyeTwoTone from '@/utils/icons/IconEyeTwoTone'

import Input, { InputProps } from '../Input'

export interface InputPasswordProps extends Omit<InputProps, 'type'> {
  iconRender?: (visible: boolean) => ReactNode
  visibilityToggle?: boolean | { visible: boolean; onVisibleChange: (visible: boolean) => void }
}

const InputPassword = ({ iconRender, visibilityToggle, ...rest }: InputPasswordProps) => {
  const [visible, setVisible] = useState(false)
  const renderIcon = () => {
    if (iconRender) {
      return iconRender(visible)
    }
    return visible ? <IconEyeTwoTone width={14} /> : <IconEyeInvisible width={14} />
  }

  const handleToggle = () => {
    setVisible(!visible)
    if (typeof visibilityToggle === 'object') {
      visibilityToggle.onVisibleChange(!visibilityToggle.visible)
    }
  }

  useEffect(() => {
    if (visibilityToggle !== undefined) {
      if (typeof visibilityToggle === 'boolean') {
        setVisible(visibilityToggle)
      }
      if (typeof visibilityToggle === 'object') {
        setVisible(visibilityToggle.visible)
      }
    }
  }, [JSON.stringify(visibilityToggle)])

  return (
    <Input
      type={visible ? 'text' : 'password'}
      allowClear={false}
      {...rest}
      suffix={<span className='cursor-pointer'>{renderIcon()}</span>}
      onClickSuffix={handleToggle}
    />
  )
}

export default InputPassword
