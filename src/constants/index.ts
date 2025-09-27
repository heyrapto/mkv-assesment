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
import { Task } from '@/types/task'

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
        {
          name: 'Group Settings',
          href: '/group-settings',
          items: [
            { name: 'Permissions', href: '/group-settings/permissions' },
            { name: 'Roles', href: '/group-settings/roles' },
            { name: 'Notifications', href: '/group-settings/notifications' },
          ],
        },
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
  

export  const mockTasks: Task[] = [
    {
      id: 1,
      name: "MKV Intranet V2",
      date: "04/06/2024 - 16/06/2024",
      assignee: [
        { name: "JI", avatar: "https://i.pravatar.cc/150?u=ji" },
        { name: "Alex", avatar: "https://i.pravatar.cc/150?u=alex" },
      ],
      priority: "Medium",
      status: "todo",
    },
    {
      id: 2,
      name: "Design System",
      date: "23/06/2024 - 24/06/2024",
      assignee: [{ name: "Sam", avatar: "https://i.pravatar.cc/150?u=sam" }],
      priority: "Important",
      status: "todo",
    },
    {
      id: 3,
      name: "Medical Appointment",
      date: "16/06/2024 - 18/06/2024",
      assignee: [
        { name: "User 1", avatar: "https://i.pravatar.cc/150?u=user1" },
        { name: "User 2", avatar: "https://i.pravatar.cc/150?u=user2" },
      ],
      priority: "Urgent",
      status: "todo",
    },
    {
      id: 4,
      name: "Testing Data",
      date: "23/06/2024 - 24/06/2024",
      assignee: [{ name: "Chris", avatar: "https://i.pravatar.cc/150?u=chris" }],
      priority: "Urgent",
      status: "progress",
    },
    {
      id: 5,
      name: "Patient Request",
      date: "16/06/2024 - 18/06/2024",
      assignee: [{ name: "Taylor", avatar: "https://i.pravatar.cc/150?u=taylor" }],
      priority: "Urgent",
      status: "progress",
    },
    {
      id: 6,
      name: "Patient Meetup",
      date: "23/06/2024 - 24/06/2024",
      assignee: [{ name: "Jordan", avatar: "https://i.pravatar.cc/150?u=jordan" }],
      priority: "Low",
      status: "complete",
    },
]