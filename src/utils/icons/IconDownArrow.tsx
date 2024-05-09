import { IIconProps } from '../interfaces/IIconProps'

export default function IconDownArrow({ color = '#4B5565', width = 16, className = '' }: IIconProps) {
  return (
    <svg
      viewBox='0 0 16 9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={width}
      color={color}
      className={className}
    >
      <path
        d='M1.5 1L8 7.5L14.5 1'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
