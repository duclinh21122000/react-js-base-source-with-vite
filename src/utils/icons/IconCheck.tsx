import { IIconProps } from '../interfaces/IIconProps'

const IconCheck = ({ className, color, width = 18 }: IIconProps) => {
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
        d='M5 12.7L8.63433 17.826C9.03753 18.3947 9.88428 18.3867 10.2767 17.8105L19 5'
        stroke='currentColor'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconCheck
