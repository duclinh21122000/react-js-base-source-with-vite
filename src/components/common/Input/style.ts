import { tv } from 'tailwind-variants'

const wrapper = tv({
  base: 'text-sm text-text-primary',
  variants: {
    fullWidth: {
      true: 'w-full',
      false: 'w-fit'
    }
  }
})

const container = tv({
  base: 'group relative flex items-center gap-2 border border-border-200 px-3 hover:border-border-primary',
  variants: {
    size: {
      sm: 'h-[32px]',
      md: 'h-[40px]',
      lg: 'h-[48px]'
    },
    disabled: {
      true: 'cursor-not-allowed bg-bg-100'
    },
    loading: {
      true: 'cursor-not-allowed bg-bg-100'
    },
    addonBefore: {
      true: 'rounded-l-none',
      false: 'rounded-l-lg'
    },
    addonAfter: {
      true: 'rounded-r-none',
      false: 'rounded-r-lg'
    }
  }
})

const sizeContainer = tv({
  base: 'flex items-center rounded-lg bg-bg-main',
  variants: {
    size: {
      sm: 'h-[32px]',
      md: 'h-[40px]',
      lg: 'h-[48px]'
    },
    disabled: {
      true: 'opacity-70',
      false: 'opacity-100'
    }
  }
})

const input = tv({
  base: 'w-full h-full truncate text-text-main',
  variants: {
    disabled: {
      true: 'cursor-not-allowed bg-bg-100',
      false: 'bg-bg-white'
    },
    loading: {
      true: ''
    }
  }
})

const tvAddonBefore = tv({
  base: 'h-full flex items-center justify-center rounded-lg rounded-r-none border',
  variants: {
    string: {
      true: 'px-2',
      false: 'border-0'
    },
    disabled: {
      true: 'cursor-not-allowed bg-bg-100'
    },
    loading: {
      true: 'cursor-not-allowed bg-bg-100'
    }
  }
})

const tvAddonAfter = tv({
  base: 'h-full flex items-center justify-center rounded-lg rounded-l-none border',
  variants: {
    string: {
      true: 'px-2',
      false: 'border-0'
    },
    disabled: {
      true: 'cursor-not-allowed bg-bg-100'
    },
    loading: {
      true: 'cursor-not-allowed bg-bg-100'
    }
  }
})

const iconClear = tv({
  base: 'invisible cursor-pointer',
  variants: {
    show: {
      true: 'pl-1 group-hover:visible'
    }
  }
})

export const inputStyles = {
  wrapper,
  container,
  sizeContainer,
  input,
  tvAddonBefore,
  tvAddonAfter,
  iconClear
}
