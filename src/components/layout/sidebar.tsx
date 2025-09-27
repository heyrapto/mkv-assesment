"use client"

import React from 'react'
import {
  Box,
  VStack,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import { useColorMode } from '@/components/ui/color-mode'
import { Image } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { sidebarItems } from '@/constants'
import { SidebarItem } from './sidebar-item'
import SettingsSection from '../ui/settings'

const Sidebar: React.FC = () => {
  const { colorMode } = useColorMode()
  const bg = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? '#CDD6E9' : 'gray.700'

  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Box
      w={collapsed ? '80px' : '280px'}
      transition="width 0.18s"
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      h="100vh"
      overflowY="auto"
      position="sticky"
      top={0}
      className="custom-scrollbar" 
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
            bg="#F7F7F7"
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

      {/* Settings Section */}
      <Box className='flex flex-col w-full rounded-md'>
        <SettingsSection collapsed={collapsed} />
      </Box>
    </Box>
  )
}

export default Sidebar