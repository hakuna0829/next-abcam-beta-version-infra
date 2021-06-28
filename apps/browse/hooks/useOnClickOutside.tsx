import { FC, useEffect, useRef } from 'react'
import { underscore } from '@nrwl/workspace/src/utils/strings'

export function useOnClickOutside(
  handler: ((event: any) => void) | (() => undefined)
) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current?.contains(event.target as Node)) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])

  return ref
}
