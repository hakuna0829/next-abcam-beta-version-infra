import React, { cloneElement, useCallback, useRef, useState, FC } from 'react'
import styles from './dropdown.module.css'
import { ChevronDown, ChevronUp } from '@abcam-web/lego-shared-components/icons'
import { useClickOutside } from '@abcam-web/lego-shared-components/lib/utils/useClickOutside'
import classnames from 'classnames'
import {
  DropdownProps,
  DropdownVariant,
} from '@abcam-web/lego-shared-components/lib/dropdown/dropdown.type'
import {
  isArrowDownEvent,
  isEnterEvent,
  isSpaceEvent,
} from '@abcam-web/lego-shared-components/lib/utils/keyboardEvents'

const Dropdown: FC<DropdownProps> = (props) => {
  const containerRef = useRef(null)

  const {
    options,
    children,
    onChange,
    variant = DropdownVariant.primary,
  } = props

  const [initialValue] = options
  const [selectedValue, setSelectedValue] = useState(initialValue)
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsVisible = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen, setIsOpen])

  const hideOnOutsideClick = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isOpen, setIsOpen])

  useClickOutside(containerRef, hideOnOutsideClick)

  const classes = classnames({
    [styles.dropdown]: true,
    [styles.open]: isOpen,
    [styles.secondary]: variant === DropdownVariant.secondary,
  })

  const setSelectedValueCallback = useCallback(
    (value) => {
      setSelectedValue(value)
      toggleIsVisible()
      onChange(value)
    },
    [setSelectedValue, toggleIsVisible, onChange]
  )

  const listKeyUpHandler = useCallback(
    (evt) => {
      if (isEnterEvent(evt) || isSpaceEvent(evt) || isArrowDownEvent(evt)) {
        toggleIsVisible()
      }
    },
    [toggleIsVisible]
  )

  const childWithOptions = cloneElement(children, {
    options,
    onValueSelect: setSelectedValueCallback,
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
        {selectedValue.shortDisplayValue || selectedValue.displayValue}
        {!isOpen && (
          <ChevronDown className={styles.openIcon} aria-label="Open dropdown" />
        )}
        {isOpen && (
          <ChevronUp className={styles.openIcon} aria-label="Open dropdown" />
        )}
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>{childWithOptions}</div>
      )}
    </div>
  )
}

export { Dropdown }
