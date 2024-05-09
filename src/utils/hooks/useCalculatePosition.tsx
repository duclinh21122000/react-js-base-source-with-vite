import type React from 'react'
import { useCallback, useEffect } from 'react'

interface CalculateProps {
  actionRef: React.RefObject<HTMLDivElement>
  dropdownRef: React.RefObject<HTMLDivElement | HTMLUListElement>
  visible: boolean
  container?: HTMLElement | null
  autoWidth?: boolean
  placement?: string
  dependencies?: string | number | object
}

export const useCalculatePosition = ({
  actionRef,
  dropdownRef,
  visible,
  container,
  autoWidth = true,
  placement = 'left',
  dependencies,
}: CalculateProps) => {
  const calculatePosition = useCallback(() => {
    const dropdownEl = dropdownRef.current
    if (actionRef.current && dropdownEl) {
      const selectRect = actionRef.current.getBoundingClientRect()
      const popoverRect = dropdownEl.getBoundingClientRect()
      const popoverHeight = popoverRect.height
      const popoverWidth = popoverRect.width
      const distanceFromSelectEdgeToTop = selectRect.top
      const distanceFromSelectEdgeToBottom =
        window.innerHeight - selectRect.bottom

      const left = selectRect.left + window.scrollX
      const right = selectRect.right + window.scrollX - popoverWidth
      const width = selectRect.width

      if (autoWidth) {
        dropdownEl.style.width = width + 'px'
      }
      if (placement === 'left') {
        dropdownEl.style.left = left + 'px'
      }
      if (placement === 'right') {
        dropdownEl.style.left = right + 'px'
      }

      const upwards = () => {
        if (dropdownRef?.current) {
          const top =
            selectRect.top - dropdownEl.offsetHeight + window.scrollY - 2
          dropdownEl.style.top = top + 'px'
          dropdownEl.classList.remove('origin-top')
          dropdownEl.classList.add('origin-bottom')
        }
      }
      const downwards = () => {
        if (dropdownRef?.current) {
          const top = selectRect.bottom + window.scrollY + 2 // 2 is padding
          dropdownEl.style.top = top + 'px'
          dropdownEl.classList.remove('origin-bottom')
          dropdownEl.classList.add('origin-top')
        }
      }
      if (popoverHeight < distanceFromSelectEdgeToBottom) {
        // Enough space below, expand downwards
        downwards()
      } else if (popoverHeight < distanceFromSelectEdgeToTop) {
        // Not enough space below, expand upwards
        upwards()
      } else {
        if (distanceFromSelectEdgeToTop > distanceFromSelectEdgeToBottom) {
          upwards()
        } else downwards()
      }
    }
  }, [placement, JSON.stringify(dependencies)])

  useEffect(() => {
    if (visible) {
      calculatePosition()
    }
  }, [visible, container, calculatePosition])

  useEffect(() => {
    window.addEventListener('resize', calculatePosition)
    window.addEventListener('scroll', calculatePosition)
    return () => {
      window.removeEventListener('resize', calculatePosition)
      window.removeEventListener('scroll', calculatePosition)
    }
  }, [])

  return calculatePosition
}
