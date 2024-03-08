export interface NavItem {
  title: string
  href?: string
  mainLink?: {
    logo?: boolean
    title: string
    description: string
    href?: string
  }
  linkList?: Array<{
    title: string
    description: string
    href: string
  }>
}
