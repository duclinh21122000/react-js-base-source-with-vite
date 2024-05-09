/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-primary': 'var(--color-primary)',
        'text-secondary': 'var(--color-secondary)',
        'text-third': 'var(--color-secondary)',
        'text-main': 'var(--text-main)',
        'text-500': 'var(--text-500)',
        'text-600': 'var(--text-600)',
        'bg-primary': 'var(--bg-primary)',
        'bg-primary-500': 'var(--bg-primary-500)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-main': 'var(--bg-main)',
        'bg-white': 'var(--bg-white)',
        'bg-100': 'var(--bg-100)',
        'bg-200': 'var(--bg-200)',
        'bg-300': 'var(--bg-300)',
        'border-primary': 'var(--border-primary)',
        'border-main': 'var(--border-main)',
        'border-200': 'var(--border-200)',
        error: 'var(--text-error)',

      },
      animation: {
        opacity: 'opacity 0.3s ease-out',
        'fade-down': 'fade-down 0.2s ease-out',
        'fade-up': 'fade-up 0.2s ease-in',
        expand: 'expand 0.1s ease-out',
        'floating-down': 'floating-down 0.4s ease-out',
        'floating-up': 'floating-up 0.4s ease-in',
        modal: 'modal 0.2s ease-out',
        'notify-left': 'notify-left 0.1s ease-out',
        'notify-right': 'notify-right 0.1s ease-out',
        'pop-top': 'pop-top 0.2s ease-out',
        'pop-top-left': 'pop-top-left 0.2s ease-out',
        'pop-top-right': 'pop-top-right 0.2s ease-out',
        'pop-bottom': 'pop-bottom 0.2s ease-out',
        'pop-bottom-left': 'pop-bottom-left 0.2s ease-out',
        'pop-bottom-right': 'pop-bottom-right 0.2s ease-out',
      },
      keyframes: {
        opacity: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'floating-down': {
          '0%': {
            transform: 'translateY(-10%)',
            opacity: '0',
          },
          '20%': {
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0%)',
            opacity: '1',
          },
        },
        'floating-up': {
          '0%': {
            transform: 'translateY(0%)',
            opacity: '1',
          },
          '20%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-10%)',
            opacity: '0',
          },
        },
        'fade-down': {
          '0%': {
            transform: 'scaleY(1)',
            opacity: '0',
          },
          '20%': {
            transform: 'scaleY(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'scaleY(1)',
            opacity: '1',
          },
        },
        'fade-up': {
          '0%': {
            transform: 'scaleY(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scaleY(0.8)',
            opacity: '0',
          },
        },
        modal: {
          '0%': {
            transform: 'scale(0.2)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'pop-bottom': {
          '0%': {
            transform: 'translateX(-50%) scaleY(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(-50%) scaleY(1)',
            opacity: '1',
          },
        },
        'pop-top': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'pop-top-right': {
          '0%': {
            transform:
              'translateX(-100%) translateY(calc(-100% - 12px)) scaleY(0.8)',
            opacity: '0',
          },
          '100%': {
            transform:
              'translateX(-100%) translateY(calc(-100% - 12px)) scaleY(1)',
            opacity: '1',
          },
        },
        'pop-top-left': {
          '0%': {
            transform: 'translateY(calc(-100% - 12px)) scaleY(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(calc(-100% - 12px)) scaleY(1)',
            opacity: '1',
          },
        },
        'pop-bottom-left': {
          '0%': {
            transform: 'scaleY(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'scaleY(1)',
            opacity: '1',
          },
        },
        'pop-bottom-right': {
          '0%': {
            transform: 'translateX(-100%) scaleY(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(-100%) scaleY(1)',
            opacity: '1',
          },
        },
        'notify-right': {
          '0%': {
            transform: 'translate3d(100%, 0, 0)',
            opacity: '0',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
          },
        },
        'notify-left': {
          '0%': {
            transform: 'translate3d(-100%, 0, 0)',
            opacity: '0',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
          },
        },
      },
    }
  },
  plugins: []
}
