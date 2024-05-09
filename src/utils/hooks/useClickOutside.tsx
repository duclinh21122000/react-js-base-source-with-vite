import { useEffect } from 'react'

import { portalClasses } from '../constants/portal-key'

type Ref<T> = { current: T | null }

interface ClickOutsideProps {
  ref: Ref<HTMLElement>
  handler: (event: MouseEvent | TouchEvent) => void
  childrenRef?: Ref<HTMLElement>
  exclude?: string[]
}

export function useClickOutside({ ref, handler, childrenRef, exclude = [] }: ClickOutsideProps) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      event.stopPropagation()
      let isOutside = false
      exclude.forEach((item) => {
        const element = document.getElementById(item)
        if (element && element.contains(event.target as Node)) isOutside = true
      })
      Object.values(portalClasses).forEach((item) => {
        const calendarElements = document.querySelectorAll(item)
        calendarElements.forEach((el) => {
          if (el && el.contains(event.target as Node)) isOutside = true
        })
      })
      if (isOutside) return
      if (!ref.current || ref.current.contains(event.target as Node)) return
      if (childrenRef && childrenRef.current?.contains(event.target as Node)) return
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
