import { IIconProps } from '../interfaces/IIconProps'

const IconArrowDown = ({ width = 8, height = 5, color = '#9AA4B2', className = '' }: IIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      className={className}
      color={color}
      viewBox='0 0 8 5'
      fill='none'
    >
      <path
        d='M7.02394 0.52124H3.8439H0.980335C0.490313 0.52124 0.245302 1.11335 0.592401 1.46045L3.23648 4.10453C3.66014 4.52819 4.34924 4.52819 4.7729 4.10453L5.77847 3.09896L7.41698 1.46045C7.75897 1.11335 7.51396 0.52124 7.02394 0.52124Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default IconArrowDown
