import type { SyntheticEvent } from 'react'

export const SYNTHETIC_EVENT_TYPES = {
  focus: 'focus',
  blur: 'blur',
}

export const isFocusEvent = (evt: SyntheticEvent) => {
  return evt.type === SYNTHETIC_EVENT_TYPES.focus
}

export const isBlurEvent = (evt: SyntheticEvent) => {
  return evt.type === SYNTHETIC_EVENT_TYPES.blur
}
