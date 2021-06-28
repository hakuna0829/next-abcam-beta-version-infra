import classNames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { ReactComponent as Cross } from '@browse/public/icons/cross.svg'

import styles from './modal.module.css'

import type { ReactNode, SyntheticEvent } from 'react'

type ModalPropTypes = {
  children: ReactNode
  header: string
  onClose: () => void
  show: boolean
}

const Modal = ({ children, header, onClose, show }: ModalPropTypes) => {
  const overlayClassName = classNames(
    styles.overlay,
    show && styles.overlayShow
  )
  const modalClassName = classNames(styles.modal, show && styles.modalShow)
  const [isBrowser, setIsBrowser] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const overlayOnClick = useCallback(
    (e) => {
      if (!modalRef?.current?.contains(e.target as Element)) onClose()
    },
    [onClose]
  )

  const overlayOnKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    setIsBrowser(true)

    window.addEventListener('keyup', overlayOnKeyboard, false)

    document.body.style.height = show ? '100vh' : ''
    document.body.style.overflowY = show ? 'hidden' : ''

    return () => {
      window.removeEventListener('keyup', overlayOnKeyboard, false)
    }
  }, [overlayOnClick, overlayOnKeyboard, show])

  const handleCloseClick = (e: SyntheticEvent) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = (
    <div className={overlayClassName} onClick={overlayOnClick}>
      <div className={modalClassName} ref={modalRef} role="dialog">
        <div className={styles.header}>
          <h3>{header}</h3>
          <div className={styles.crossContainer}>
            <Cross role="button" onClick={handleCloseClick} />
          </div>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )

  if (isBrowser) {
    const modal = document.getElementById('modal')
    return modal && createPortal(modalContent, modal)
  }

  return null
}

export { Modal }
