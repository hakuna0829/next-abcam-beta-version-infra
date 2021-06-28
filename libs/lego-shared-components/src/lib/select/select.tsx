import React, { FC, useCallback, useRef, useState } from 'react'
import classnames from 'classnames'

import styles from './select.module.css'

import { SelectProps } from './select.type'
import { useClickOutside } from '@abcam-web/lego-shared-components/lib/utils/useClickOutside'
import { ChevronDown } from '@abcam-web/lego-shared-components/icons'
import { ListItem } from '@abcam-web/lego-shared-components/lib/listItem/listItem'
import {
  isArrowDownEvent,
  isEnterEvent,
  isSpaceEvent,
  keyboardVerticalNavigationHandler,
} from '@abcam-web/lego-shared-components/lib/utils/keyboardEvents'

const Select: FC<SelectProps> = (props) => {
  const containerRef = useRef(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  const { options, onChange } = props

  const [initialValue] = options
  const [selectedValue, setSelectedValue] = useState(initialValue)
  const [isVisible, setIsVisible] = useState(false)

  const toggleIsVisible = useCallback(() => {
    setIsVisible(!isVisible)
  }, [isVisible, setIsVisible])

  const hideOnOutsideClick = useCallback(() => {
    if (isVisible) {
      setIsVisible(false)
    }
  }, [isVisible, setIsVisible])

  useClickOutside(containerRef, hideOnOutsideClick)

  const setSelectedValueCallback = useCallback(
    (value) => {
      setSelectedValue(value)
      toggleIsVisible()
      onChange(value)
      setSelectedItemIndex(0)
    },
    [setSelectedValue, toggleIsVisible, setSelectedItemIndex, onChange]
  )

  const listKeyUpHandler = useCallback(
    (evt) => {
      if (isEnterEvent(evt) || isSpaceEvent(evt) || isArrowDownEvent(evt)) {
        toggleIsVisible()
      }
    },
    [toggleIsVisible]
  )

  const listDropdownKeyUpHandler = useCallback(
    (evt) =>
      keyboardVerticalNavigationHandler(
        evt,
        selectedItemIndex,
        setSelectedItemIndex,
        options.length - 1
      ),
    [selectedItemIndex, setSelectedItemIndex, options]
  )

  const listItemKeyUpHandler = useCallback(
    (evt, value) => {
      if (isEnterEvent(evt)) {
        setSelectedValueCallback(value)
      }
    },
    [setSelectedValueCallback]
  )

  const classes = classnames({
    [styles.select]: true,
    [styles.open]: isVisible,
  })

  return (
    <div className={classes} ref={containerRef}>
      <div
        tabIndex={0}
        className={styles.selectedValueContainer}
        role="button"
        onClick={toggleIsVisible}
        onKeyUp={listKeyUpHandler}
      >
        {selectedValue.displayValue}
        <ChevronDown aria-label="Open select" />
      </div>
      <div className={styles.content} role={'button'}>
        {isVisible && (
          <ul onKeyUp={listDropdownKeyUpHandler} role="presentation">
            {options.map((val, idx) => {
              return (
                <ListItem
                  autofocus={idx === selectedItemIndex}
                  clickCallback={setSelectedValueCallback}
                  keyupCallback={listItemKeyUpHandler}
                  value={val}
                  key={val.key}
                />
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export { Select }
