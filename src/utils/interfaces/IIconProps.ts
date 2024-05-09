import { HTMLAttributes } from 'react'

export interface IIconProps {
  color?: string
  width?: number | string
  height?: number | string
  className?: HTMLAttributes<HTMLOrSVGElement>['className']
}
