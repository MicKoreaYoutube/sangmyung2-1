import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface dashboardSidebarItem {
    icon?: IconProp
    title: string
    href?: string
    shortcut?: string
    content?: Array<{
        icon?: IconProp
        title: string
        href: string
        shortcut?: string
        disabled?: boolean
    }>
}

export interface docsSidebarItem {
    title: string
    href?: boolean
    doc?: string
    chapter?: string[]
    content?: Array<{
        title: string
        doc?: string //추후에 doc:으로 변경 지금은 귀찮아서 그럼ㅅㄱ
        chapter?: string[]
    }>
}