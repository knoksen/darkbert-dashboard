import { useEffect, useState } from 'react'

export default function useDarkMode(initial = false) {
  const [enabled, setEnabled] = useState<boolean>(() => {
    const storedPreference = localStorage.getItem('dark-mode')
    return storedPreference !== null ? JSON.parse(storedPreference) : initial
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const className = 'dark'
      const element = window.document.body
      if (enabled) {
        element.classList.add(className)
      } else {
        element.classList.remove(className)
      }
    }
  }, [enabled])

  const toggle = () => setEnabled((prev) => !prev)

  return { enabled, toggle }
}
