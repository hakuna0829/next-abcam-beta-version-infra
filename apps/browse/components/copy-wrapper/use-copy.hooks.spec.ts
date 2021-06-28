import copy from 'copy-to-clipboard'
import { renderHook, act } from '@testing-library/react-hooks'

import { useCopy } from './use-copy.hooks'

jest.mock('copy-to-clipboard')

describe('useCopy', () => {
  it('should copy to the clipboard', async () => {
    const { result } = renderHook(() => useCopy('to copy!'))

    act(() => {
      result.current.copyToClipBoard()
    })

    expect(result.current.isCopied).toBe(true)
    expect(copy as jest.Mock).toBeCalledWith('to copy!')
  })
})
