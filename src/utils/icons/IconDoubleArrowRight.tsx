import { IIconProps } from '../interfaces/IIconProps'

const IconDoubleArrowRight = ({ className, color, width = 14 }: IIconProps) => {
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
        d='M5 19L10.5118 13.2374C11.1627 12.5568 11.1627 11.4432 10.5118 10.7626L5 5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13 19L18.5118 13.2374C19.1627 12.5568 19.1627 11.4432 18.5118 10.7626L13 5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconDoubleArrowRight
