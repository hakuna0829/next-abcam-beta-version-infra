import { useState } from 'react'
import copy from 'copy-to-clipboard'

function useCopy(text: string) {
  const [isCopied, setCopied] = useState<boolean>(false)

  function copyToClipBoard() {
    copy(text)
    setCopied(true)
  }

  return { isCopied, copyToClipBoard, setCopied }
}

export { useCopy }
