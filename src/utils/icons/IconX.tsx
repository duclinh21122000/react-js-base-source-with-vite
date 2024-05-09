import { IIconProps } from '../interfaces/IIconProps'

const IconX = ({ className, color, width = 14 }: IIconProps) => {
  return (
    <svg
      width={width}
      height={width}
      className={className}
      color={color}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 14 14'
      fill='none'
    >
      <path
        d='M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconX
