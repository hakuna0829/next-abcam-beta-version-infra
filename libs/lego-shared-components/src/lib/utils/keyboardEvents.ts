export const code = {
  ENTER: 'Enter',
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp',
  SPACE: 'Space',
}

export const key = {
  ENTER: 'Enter',
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp',
  SPACE: ' ',
}

export const isEnterEvent = (evt: KeyboardEvent) => {
  return evt?.code === code.ENTER || evt?.key === key.ENTER
}

export const isSpaceEvent = (evt: KeyboardEvent) => {
  return evt?.code === code.SPACE || evt?.key === key.SPACE
}

export const isArrowUpEvent = (evt: KeyboardEvent) => {
  return evt?.code === code.ARROW_UP || evt?.key === key.ARROW_UP
}

export const isArrowDownEvent = (evt: KeyboardEvent) => {
  return evt?.code === code.ARROW_DOWN || evt?.key === key.ARROW_DOWN
}

export const keyboardVerticalNavigationHandler = (
  evt: KeyboardEvent,
  itemIndex: number,
  setItemIndex: (val: number) => void,
  maxLength: number
) => {
  const maxSelectedIndex = maxLength
  const minSelectedIndex = 0

  evt.preventDefault()
  evt.stopPropagation()

  if (isArrowUpEvent(evt) && itemIndex > minSelectedIndex) {
    return setItemIndex(itemIndex - 1)
  }
  if (isArrowDownEvent(evt) && itemIndex < maxSelectedIndex) {
    return setItemIndex(itemIndex + 1)
  }
}
