import { css } from 'styled-components'

function transparentGrey(transparency: number) {
  return `rgba(39, 63, 63, ${transparency / 100})`
}

export const elevation = {
  1: css`
    box-shadow: 0 2px 4px 0 ${transparentGrey(10)};
  `,

  2: css`
    box-shadow: 0 3px 8px 0 ${transparentGrey(11)};
  `,

  3: css`
    box-shadow: 0 6px 12px 0 ${transparentGrey(12)};
  `,

  4: css`
    box-shadow: 0 12px 16px 0 ${transparentGrey(13)};
  `,

  5: css`
    box-shadow: 0 16px 32px 0 ${transparentGrey(20)};
  `,
}
