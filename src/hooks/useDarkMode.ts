import { useEffect, useState } from 'react'

export default function useDarkMode(initial = false) {
  const [enabled, setEnabled] = useState(initial)

  useEffect(() => {
    const className = 'dark'
    const element = window.document.body
    if (enabled) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  }, [enabled])

  const toggle = () => setEnabled((prev) => !prev)

  return { value: enabled, toggle }
}
