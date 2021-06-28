import React from 'react'
import copy from 'copy-to-clipboard'

function useCopyToClipboard() {
  const [isCopied, setCopied] = React.useState(false)
  function handleCopy(text: string | number | boolean) {
    if (typeof text === 'string' || typeof text === 'number') {
      copy(text.toString())
      setCopied(true)
    } else {
      setCopied(false)
    }
  }

  return [isCopied, handleCopy]
}

export default useCopyToClipboard
