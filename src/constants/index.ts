import {
    Home2,
    UserOctagon,
    DocumentText,
    InfoCircle,
    Calendar,
    Buildings2,
    Call,
    SecuritySafe,
    Notification,
    Book1,
    Setting2,
  } from 'iconsax-react'
import { LuLink } from 'react-icons/lu'
import { FaBell, FaChevronDown } from "react-icons/fa"
import { Logo } from '@/components/ui/logos'

export const sidebarItems = [
    { name: 'Home', icon: Home2, href: '/' },
    { name: 'MkVanBinnen', icon: UserOctagon, href: '/mkvanbinnen' },
    { name: 'Document Management', icon: DocumentText, href: '/documents' },
    { name: 'Patient Information', icon: InfoCircle, href: '/patients' },
    { name: 'Agenda', icon: Calendar, href: '/agenda' },
    {
      name: 'My Department',
      icon: Buildings2,
      href: '/department',
      items: [
        { name: 'News', href: '/news' },
        { name: 'Members', href: '/members' },
        { name: 'To-Do', href: '/todo', active: true },
        { name: 'Form Task', href: '/form-task' },
        { name: 'Agenda', href: '/agenda-sub' },
        { name: 'Follow up system', href: '/follow-up' },
        { name: 'Group Settings', href: '/group-settings' },
      ],
    },
    { name: 'Phone numbers', icon: Call, href: '/phone' },
    { name: 'My to do Protocols', icon: SecuritySafe, href: '/protocols' },
    { name: 'My Notifications', icon: Notification, href: '/notifications' },
    { name: 'Knowledge Base', icon: Book1, href: '/knowledge' },
    { name: 'Super Admin', icon: SecuritySafe, href: '/super-admin' },
    {
      name: 'Admin',
      icon: Setting2,
      href: '/admin',
      items: [
        { name: 'Agenda', href: '/admin/agenda' },
        { name: 'News', href: '/admin/news' },
        { name: 'Poll', href: '/admin/poll' },
        { name: 'Department Rules', href: '/admin/rules' },
        { name: 'Follow up system', href: '/admin/follow-up' },
      ],
    },
  ]

  export const badges = ["VIM", "LMS", "BHV", "DataLek"]

  export const menuItems = ["Profile", "Settings", "Logout"]

  export const actions = [
    { icon: LuLink, label: "Settings" },
    { icon: FaBell, label: "Notifications" },
  ]
  