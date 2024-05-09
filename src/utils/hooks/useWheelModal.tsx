import { useEffect } from 'react'

type IProps = {
  callback: () => void
}

export function useWheelModal(props: IProps) {
  const { callback } = props
  useEffect(() => {
    let element = document.getElementById('modalContainer')
    if (element)
      element.onwheel = () => {
        callback()
      }
  }, [])
}
