import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Flex,
  IconButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
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
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa'

const sidebarItems = [
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

type SidebarItemProps = {
  item: any
  isSubItem?: boolean
  collapsed?: boolean
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>> 
}


const SidebarItem: React.FC<SidebarItemProps> = ({ item, isSubItem = false, collapsed = false, setCollapsed }) => {
  const collapse = useDisclosure()
  const { colorMode } = useColorMode()
  const bg = colorMode === 'light' ? 'white' : 'gray.800'
  const hoverBg = colorMode === 'light' ? 'green.50' : 'gray.700'
  const activeBg = colorMode === 'light' ? 'green.100' : 'green.900'
  const textColor = colorMode === 'light' ? 'gray.700' : 'gray.200'
  const activeTextColor = colorMode === 'light' ? 'green.600' : 'green.200'

  if (collapsed) {
    return (
      <Flex w="full" align="center" justify="center" py={2}>
        {item.items ? (
          <Popover.Root>
            <PopoverTrigger>
              <Flex
                as="button"
                align="center"
                justify="center"
                w="48px"
                h="48px"
                borderRadius="md"
                _hover={{ bg: hoverBg }}
                onClick={() => setCollapsed && setCollapsed(false)}
              >
                {item.icon && <item.icon size={26} color="currentColor" />}
              </Flex>

            </PopoverTrigger>
            <PopoverContent w="220px" borderRadius="md" boxShadow="md">
              <PopoverArrow />
              <PopoverBody p={2}>
                <VStack gap={1} align="stretch">
                  {item.items.map((sub: any) => (
                    <Box
                      key={sub.name}
                      px={3}
                      py={2}
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: hoverBg }}
                    >
                      <Text fontSize="sm">{sub.name}</Text>
                    </Box>
                  ))}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover.Root>
        ) : (
          <Flex
            as="button"
            align="center"
            justify="center"
            w="48px"
            h="48px"
            borderRadius="md"
            _hover={{ bg: hoverBg }}
            onClick={() => setCollapsed && setCollapsed(false)}
          >
            {item.icon && <item.icon size={26} color="currentColor" />}
          </Flex>
        )}
      </Flex>
    )
  }

  // ---------- EXPANDED (full width with text + inline collapse) ----------
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
        onClick={item.items ? collapse.onToggle : undefined}
        borderRadius="md"
        mx={2}
      >
        <HStack gap={3} flex={1}>
          {item.icon && <item.icon size={20} color="currentColor" />}
          <Text fontSize="sm" fontWeight={item.active ? 'semibold' : 'medium'}>
            {item.name}
          </Text>
        </HStack>

        {/* chevron for items that have subitems */}
        {item.items && (
          <Icon
            as={FaChevronDown}
            boxSize={3}
            transform={collapse.open ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="transform 0.18s"
          />
        )}
      </Flex>

      {item.items && (
  <Collapse in={collapse.open}>
    <VStack gap={1} align="stretch" pl={4} mt={1} pr={2}>
      {item.items.map((sub: any) => (
        <Box
          key={sub.name}
          px={4}
          py={2}
          borderRadius="md"
          cursor="pointer"
          bg={sub.active ? activeBg : 'transparent'} // ✅ active background
          color={sub.active ? activeTextColor : textColor} // ✅ active text color
          _hover={{ bg: sub.active ? activeBg : hoverBg }} // ✅ hover still works
        >
          <Text fontSize="sm" fontWeight={sub.active ? 'semibold' : 'normal'}>
            {sub.name}
          </Text>
        </Box>
      ))}
    </VStack>
  </Collapse>
)}

    </Box>
  )
}

const Sidebar: React.FC = () => {
  const { colorMode } = useColorMode()
  const bg = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'

  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Box
      w={collapsed ? '80px' : '280px'}
      transition="width 0.18s"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      h="100vh"
      overflowY="auto"
      position="sticky"
      top={0}
    >
      {/* Logo + Toggle */}
      <Flex
        borderBottom="1px"
        borderColor={borderColor}
        justify="space-between"
        align="center"
        px={4}
        py={3}
      >
        <Image
          src="./logo.svg"
          alt="Logo"
          boxSize={collapsed ? '48px' : '120px'}
          objectFit="contain"
        />

        {!collapsed && ( 
          <IconButton
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            size="sm"
            bg="gray.200"
            _hover={{ bg: 'gray.300' }}
            borderRadius="full"
            onClick={() => setCollapsed((s) => !s)}
            transform={collapsed ? 'rotate(180deg)' : 'rotate(0deg)'}
          >
            <FaArrowLeft className='text-gray-700' />
          </IconButton>
        )}
      </Flex>


      {/* Navigation */}
      <VStack gap={2} align="stretch" py={4}>
        {sidebarItems.map((item) => (
          <SidebarItem key={item.name} item={item} collapsed={collapsed} setCollapsed={setCollapsed} />
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar
