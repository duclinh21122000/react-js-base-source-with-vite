import { IIconProps } from '../interfaces/IIconProps'

const IconLeftArrow = ({ color = '', width = 14, className = '' }: IIconProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={width}
      color={color || '#121926'}
      className={className}
    >
      <path
        d='M15 18.9999L9.4882 13.2373C8.83727 12.5567 8.83727 11.4431 9.4882 10.7625L15 4.99988'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconLeftArrow
