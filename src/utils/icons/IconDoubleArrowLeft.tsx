import { IIconProps } from '../interfaces/IIconProps'

const IconDoubleArrowLeft = ({ className, color, width = 14 }: IIconProps) => {
  return (
    <svg
      width={width}
      height={width}
      className={className}
      color={color}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        stroke='currentColor'
        d='M19 19L13.4882 13.2374C12.8373 12.5568 12.8373 11.4432 13.4882 10.7626L19 5'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        stroke='currentColor'
        d='M11 19L5.4882 13.2374C4.83727 12.5568 4.83727 11.4432 5.4882 10.7626L11 5'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconDoubleArrowLeft
