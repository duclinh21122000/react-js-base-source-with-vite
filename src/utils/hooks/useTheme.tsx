import { useEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('LTheme') ?? 'light')
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleSelectTheme = (theme: string) => {
    setTheme(theme)
  }

  useEffect(() => {
    onWindowMatch()
  }, [])

  useEffect(() => {
    switch (theme) {
      case 'light':
        document.querySelectorAll('html')[0].dataset.theme = theme
        localStorage.setItem('LTheme', theme)
        break
      case 'dark':
        document.querySelectorAll('html')[0].dataset.theme = theme
        localStorage.setItem('LTheme', theme)
        break
      case 'system':
        document.querySelectorAll('html')[0].dataset.theme = theme
        localStorage.setItem('LTheme', theme)
        break
      default:
        localStorage.removeItem('LTheme')
        onWindowMatch()
        break
    }
  }, [theme])

  const onWindowMatch = () => {
    if (localStorage.getItem('LTheme') === 'dark' || (!('LTheme' in localStorage) && darkQuery.matches)) {
      document.querySelectorAll('html')[0].dataset.theme = 'dark'
    } else {
      document.querySelectorAll('html')[0].dataset.theme = 'light'
    }
  }

  darkQuery.addEventListener('change', (e) => {
    if (!('LTheme' in localStorage)) {
      if (e.matches) {
        document.querySelectorAll('html')[0].dataset.theme = 'dark'
      } else {
        document.querySelectorAll('html')[0].dataset.theme = 'light'
      }
    }
  })

  return { theme, handleSelectTheme }
}

export default useTheme
