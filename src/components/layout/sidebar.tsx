import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import { Collapse } from '@chakra-ui/transition'
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
import { useColorMode } from '@/components/ui/color-mode'
import { Image } from '@chakra-ui/react'
import { FaArrowLeft, FaChevronDown, FaChevronLeft } from 'react-icons/fa'

const sidebarItems = [
  { name: 'Home', icon: Home2, href: '/' },
  { name: 'MkVanBinnen', icon: UserOctagon, href: '/mkvanbinnen' },
  { name: 'Document Management', icon: DocumentText, href: '/documents' },
  { name: 'Patient Information', icon: InfoCircle, href: '/patients' },
  { name: 'Agenda', icon: Calendar, href: '/agenda' },
  {
    name: 'My Department',
    hasSubmenu: true,
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
    ]
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
    hasSubmenu: true,
    items: [
      { name: 'Agenda', href: '/admin/agenda' },
      { name: 'News', href: '/admin/news' },
      { name: 'Poll', href: '/admin/poll' },
      { name: 'Department Rules', href: '/admin/rules' },
      { name: 'Follow up system', href: '/admin/follow-up' },
    ]
  }
]

const SidebarItem = ({ item, isSubItem = false }: any) => {
  const { open, onToggle } = useDisclosure()
  const { colorMode } = useColorMode()
  const bg = colorMode === 'light' ? 'white' : 'gray.800'
  const hoverBg = colorMode === 'light' ? 'green.50' : 'gray.700'
  const activeBg = colorMode === 'light' ? 'green.100' : 'green.900'
  const textColor = colorMode === 'light' ? 'gray.700' : 'gray.200'
  const activeTextColor = colorMode === 'light' ? 'green.600' : 'green.200'

  if (item.isSection) {
    return (
      <Box w="full">
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="gray.500"
          textTransform="uppercase"
          mb={2}
          px={4}
        >
          {item.name}
        </Text>
        <VStack gap={1} align="stretch">
          {item.items?.map((subItem: any) => (
            <SidebarItem key={subItem.name} item={subItem} isSubItem />
          ))}
        </VStack>
      </Box>
    )
  }


  return (
    <Box w="full">
      <Flex
        align="center"
        px={isSubItem ? 6 : 4}
        py={2}
        cursor="pointer"
        bg={item.active ? activeBg : 'transparent'}
        color={item.active ? activeTextColor : textColor}
        _hover={{ bg: item.active ? activeBg : hoverBg }}
        onClick={item.hasSubmenu ? onToggle : undefined}
        borderRadius="md"
        mx={2}
      >
        <HStack gap={2} flex={1}>
          {item.icon && <item.icon size="20" color="currentColor" />}
          <Text fontSize="sm" fontWeight={item.active ? 'semibold' : 'medium'}>
            {item.name}
          </Text>
        </HStack>
        {item.hasSubmenu && (
          <Icon
            boxSize={4}
            transform={open ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="transform 0.2s"
          ><FaChevronDown size="12" /></Icon>
        )}
      </Flex>

      {item.hasSubmenu && (
        <Collapse in={open}>
          <VStack gap={1} align="stretch" pl={4} mt={1}>
            {item.items?.map((subItem: any) => (
              <SidebarItem key={subItem.name} item={subItem} isSubItem />
            ))}
          </VStack>
        </Collapse>
      )}
    </Box>
  )
}

const Sidebar = () => {
  const { colorMode } = useColorMode()
  const bg = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'

  return (
    <Box
      w="280px"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      h="100vh"
      overflowY="auto"
      position="sticky"
      top={0}
    >
      {/* Logo */}
      <Box
        borderColor={borderColor}
        display="flex"
        justifyContent="between"
        alignItems="center"
      >
        <Image
          src="./logo.svg"
          alt="Logo"
          boxSize="150px"
          objectFit="contain"
        />

        <FaArrowLeft className='bg-gray-200 p-6 ' />
      </Box>

      {/* Navigation */}
      <VStack gap={2} align="stretch" py={4}>
        {sidebarItems.map((item) => (
          <SidebarItem key={item.name} item={item} />
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar