import { tv } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center gap-2 font-medium',
  variants: {
    color: {
      primary: '',
      secondary: '',
      success: '',
      danger: ''
    },
    variant: {
      outlined: `border bg-transparent hover:bg-transparent`,
      text: `bg-transparent hover:bg-transparent`,
      default: 'text-white shadow'
    },
    size: {
      sm: 'h-[32px] px-3 text-xs',
      md: 'h-[40px] px-4 text-sm',
      lg: 'h-[48px] px-5 text-base'
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-fit'
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50'
    },
    borderRadius: {
      none: 'rounded-none',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'default',
      className: 'bg-bg-primary hover:bg-bg-primary-500'
    },
    {
      color: 'primary',
      variant: 'outlined',
      className: 'border-bg-primary bg-white text-text-primary'
    },
    {
      color: 'primary',
      variant: 'text',
      className: 'text-text-primary hover:text-bg-primary-500'
    },
    {
      color: 'secondary',
      variant: 'default',
      className: 'bg-gray-500 hover:bg-gray-600'
    },
    {
      color: 'secondary',
      variant: 'outlined',
      className: 'hover:bg-gray-600 text-gray-500'
    },
    {
      color: 'secondary',
      variant: 'text',
      className: 'text-gray-500'
    }
  ]
})

export const buttonStyles = { button }
