import { IIconProps } from '../interfaces/IIconProps'

const IconArrowUp = ({ width = 8, height = 5, color = '#9AA4B2', className = '' }: IIconProps) => {
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
        d='M7.41079 3.53971L5.77228 1.9012L4.77182 0.895629C4.34815 0.471965 3.65906 0.471965 3.2354 0.895629L0.59132 3.53971C0.244221 3.8868 0.494336 4.47891 0.979254 4.47891H3.84282H7.02286C7.51288 4.47891 7.75789 3.8868 7.41079 3.53971Z'
        fill='currentColor'
      />
    </svg>
  )
}
export default IconArrowUp
