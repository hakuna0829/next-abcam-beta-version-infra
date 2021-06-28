import Link from 'next/link'
import { forwardRef } from 'react'
import type { AnchorHTMLAttributes } from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'

type LinkPropTypes = AnchorHTMLAttributes<HTMLAnchorElement> & {
  activeClassName?: string
  className?: string
  isActive?: boolean
  prefetch?: boolean
  to: string | { as: string; href: string }
}

export default forwardRef<HTMLAnchorElement, LinkPropTypes>((props, ref) => {
  const {
    activeClassName,
    children,
    className,
    isActive,
    prefetch,
    to,
    ...otherProps
  } = props
  const { asPath } = useRouter()
  const isActiveLink =
    isActive || asPath === (typeof to === 'string' ? to : to.as)
  const classNames = classnames(className, isActiveLink && activeClassName)

  if (typeof to === 'string') {
    return (
      <Link href={to} prefetch={prefetch || false}>
        <a {...otherProps} className={classNames} ref={ref}>
          {children}
        </a>
      </Link>
    )
  }

  return (
    <Link href={to.href} as={to.as} prefetch={prefetch || false}>
      <a {...otherProps} className={classNames} ref={ref}>
        {children}
      </a>
    </Link>
  )
})
