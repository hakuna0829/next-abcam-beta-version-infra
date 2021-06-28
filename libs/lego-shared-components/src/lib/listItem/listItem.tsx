import React, { FC, LegacyRef, useCallback, useEffect, useRef } from 'react'
import { SelectOption } from '@abcam-web/lego-shared-components/lib/select/select.type'

type ListItemProps = {
  autofocus?: boolean
  clickCallback: (val: SelectOption) => void
  keyupCallback: (evt: KeyboardEvent, val: SelectOption) => void
  value: SelectOption
}

const ListItem: FC<ListItemProps> = React.memo((props) => {
  const { clickCallback, keyupCallback, value, autofocus } = props
  const itemRef = useRef<HTMLDivElement>()

  const onClick = useCallback(() => {
    clickCallback(value)
  }, [clickCallback, value])

  const onKeyUp = useCallback(
    (evt) => {
      keyupCallback(evt, value)
    },
    [keyupCallback, value]
  )

  useEffect(() => {
    if (!autofocus) {
      return
    }
    itemRef?.current?.focus()
  }, [autofocus])

  return (
    <li aria-label={value.displayValue}>
      <div
        ref={itemRef as LegacyRef<HTMLDivElement>}
        tabIndex={0}
        onClick={onClick}
        onKeyUp={onKeyUp}
        role={'button'}
      >
        {value.displayValue}
      </div>
    </li>
  )
})

export { ListItem }
