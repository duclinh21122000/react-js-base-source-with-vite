import { tv } from 'tailwind-variants'

const disabledClass = 'text-text-500 bg-gray-100 cursor-not-allowed'

const container = tv({
  base: `group/icon select-none rounded-lg border border-border-200 text-sm bg-white`,
  variants: {
    disabled: {
      true: disabledClass,
      false: 'hover:border-border-primary'
    },
    visible: {
      true: 'border-border-primary'
    },
    multiple: {
      true: 'h-auto',
      false: 'h-10'
    }
  }
})

const input = tv({
  base: 'h-9 w-full select-none text-text-main focus:outline-none',
  variants: {
    showArrow: {
      true: 'text-center',
      false: 'text-left'
    },
    disabled: {
      true: disabledClass,
      false: 'bg-white'
    }
  }
})

const closeIcon = tv({
  base: 'hidden cursor-pointer',
  variants: {
    hover: {
      true: 'group-hover/icon:block'
    }
  }
})
const suffixIcon = tv({
  base: 'block',
  variants: {
    hidden: {
      true: 'group-hover/icon:hidden'
    }
  }
})

export const datePickerStyles = { container, input, closeIcon, suffixIcon }
