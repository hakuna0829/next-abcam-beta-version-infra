import { px, rem } from 'csx'

export const corner = {
  small: px(16),
  medium: px(24),
  large: px(28),

  1: px(2),
  2: px(4),
  3: px(8),
  4: px(16),
  5: px(24),
  6: px(32),
}

export const layout = {
  1: rem(1),
  2: rem(1.5),
  3: rem(2),
  4: rem(2.5),
  5: rem(4),
  6: rem(5),
  7: rem(10),
}

export const spacing = {
  1: rem(0.25),
  2: rem(0.5),
  3: rem(0.75),
  4: rem(1),
  5: rem(1.5),
  6: rem(2),
  7: rem(3),
}

// TODO remove in favor of theme.text
export const text = {
  bodyLarge: rem(1.125),
  bodyMedium: rem(1),
  bodySmall: rem(0.75),

  h1: rem(4.5),
  h2: rem(3.5),
  h3: rem(2.5),
  h4: rem(2),
  h5: rem(1.5),
  h6: rem(1.313),

  uiSmall: rem(0.75),
  uiMedium: rem(0.875),
  uiLarge: rem(1),
}

export const lineHeight = {
  small: 1.33,
  medium: 1.5,
  large: 1.5,
}

export const paddings = {
  small: {
    leftIcon: `0.5rem 1rem 0.417rem`,
    rightIcon: `0.5rem 0.917rem 0.417rem 1rem`,
    iconOnly: `0.5rem 0.417rem 0.417rem 0.5rem`,
    noIcon: `0.5rem 1rem`,
  },
  medium: {
    leftIcon: `0.625rem 1.688rem 0.521rem`,
    rightIcon: `0.625rem 1.583rem 0.521rem 1.688rem`,
    iconOnly: `0.625rem 0.521rem 0.521rem 0.625rem`,
    noIcon: `0.625rem 1.388rem 0.75rem`,
  },
  large: {
    leftIcon: `1rem 1.875rem 0.875rem`,
    rightIcon: `1rem 1.875rem 0.875rem 2rem`,
    iconOnly: `1rem 0.875rem 0.875rem 1rem`,
    noIcon: `1rem 2rem`,
  },
}
