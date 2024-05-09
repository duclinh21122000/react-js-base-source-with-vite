import { IIconProps } from '../interfaces/IIconProps'

const IconRightArrow = ({ color = '', width = 14, className = '' }: IIconProps) => {
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
        d='M9 18.9999L14.5118 13.2373C15.1627 12.5567 15.1627 11.4431 14.5118 10.7625L9 4.99988'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconRightArrow
