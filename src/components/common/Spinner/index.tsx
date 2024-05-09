import React from 'react'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  spinning?: boolean
  tip?: string
  indicator?: React.ReactNode
  classes?: React.ComponentProps<'div'>['className']
  color?: 'primary' | 'secondary'
}

const Spinner = ({
  size = 'md',
  spinning = true,
  tip,
  indicator = null,
  classes = '',
  color = 'primary',
  ...rest
}: SpinnerProps) => {
  const getSpinClass = () => {
    let spinClass = 'max-h-fit max-w-fit'
    spinClass += spinning ? ' animate-spin' : ''

    if (!indicator) {
      spinClass += 'grid grid-rows-2 grid-cols-2'
    }
    const sizeClasses = {
      sm: ' gap-0.5 [&>*]:text-sm [&>*]:p-0.5 [&>*]:round-full',
      md: ' gap-1 [&>*]:text-base [&>*]:p-1 [&>*]:round-full',
      lg: ' gap-1.5 [&>*]:text-lg [&>*]:p-2 [&>*]:round-full'
    }
    spinClass += indicator ? '' : sizeClasses[size] || sizeClasses.md

    const colorClasses = {
      primary: ' [&>*]:bg-bg-primary hover:[&>*]:bg-bg-primary',
      secondary: ' [&>*]:bg-bg-secondary hover:[&>*]:bg-bg-secondary'
    }
    spinClass += indicator ? ' bg-transparent' : colorClasses[color] || colorClasses.primary

    if (classes) {
      spinClass += ` ${classes}`
    }
    return spinClass
  }

  const getTipCLass = () => {
    let tipClass = ''
    const colorTip = {
      primary: ' text-text-primary',
      secondary: ' text-text-secondary'
    }
    tipClass += colorTip[color] || colorTip.primary

    const sizeTip = {
      sm: ' text-sm',
      md: ' text-base',
      lg: ' text-lg'
    }
    tipClass += sizeTip[size] || sizeTip.md

    return tipClass
  }

  return (
    <div className='flex max-h-fit max-w-fit flex-col items-center space-y-2 text-center' {...rest}>
      <div className={getSpinClass()}>
        {indicator || (
          <>
            <span className='rounded-full brightness-75'></span>
            <span className='rounded-full brightness-95'></span>
            <span className='rounded-full brightness-150'></span>
            <span className='rounded-full brightness-125'></span>
          </>
        )}
        {Boolean(tip) && <div className={getTipCLass()}>{tip}</div>}
      </div>
    </div>
  )
}

export default Spinner
