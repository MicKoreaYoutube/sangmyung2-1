import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface dropDownItem {
  label: string
  content: {
    title: string
    icon?: IconProp
    href?: string
    shortcut?: string
    semiDropDown?: {
      title: string
      icon?: IconProp
      href?: string
      shortcut?: string
    }[][]
  }[][]
}