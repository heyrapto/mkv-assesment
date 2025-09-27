export type SidebarItemProps = {
    item: string[]
    isSubItem?: boolean
    collapsed?: boolean
    setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>
}

