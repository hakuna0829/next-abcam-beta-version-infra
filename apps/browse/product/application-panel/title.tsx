import type { ReactNode } from 'react'

type TitlePropProps = {
  children: ReactNode
}

const Title = ({ children, ...props }: TitlePropProps) => (
  <h2 className="text-grey20 text-xl" {...props}>
    {children}
  </h2>
)

export { Title }
