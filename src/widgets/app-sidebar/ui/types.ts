import type { SVGProps } from 'react'

export type NavIconShape = {
  width: number
  height: number
  className: string
  path: string
}

export type NavIconProps = SVGProps<SVGSVGElement> & {
  shape: NavIconShape
}
