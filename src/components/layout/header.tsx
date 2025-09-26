import React, { useState } from 'react'
import {
  Box,
  Flex,
  Input,
  InputGroup,
  IconButton,
  Avatar,
  Text,
  Badge,
  HStack,
  Button,
} from '@chakra-ui/react'
import { useColorMode } from '@/components/ui/color-mode'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/menu'
import { InputLeftElement } from '@chakra-ui/input'
import { SearchNormal1, ArrowLeft2, Setting2, Notification } from 'iconsax-react'
import { FaArrowLeft, FaBell, FaChevronDown } from 'react-icons/fa'
import { LuSearch, LuSettings } from 'react-icons/lu'
import SearchInput from '../ui/search-input'
import { Logo } from '../ui/logos'

const Header = () => {
  const { colorMode } = useColorMode()
  const [search, setSearch] = useState("")
  const bg = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'

  //   const startELement = 
  //   <InputGroup>
  //     <InputLeftElement>
  //     <SearchNormal1 size="20" color="#A0AEC0" />
  //   </InputLeftElement>
  //   </InputGroup>

  return (
    <Box
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex justify="space-between" align="center">
        {/* Left side - Back button and search */}
        <Flex align="center" gap={4} flex={1}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search tasks..."
            maxW="500px"
          />
        </Flex>

        {/* Right side - Action buttons and user info */}
        <HStack gap={3}>
          <Flex gap="3">
            <Box className='h-[50px] w-[50px] items-center flex justify-center border border-[#EEF1F9] rounded-md'>
              <Logo.First className='' />
            </Box>
            <Box className='h-[50px] w-[50px] items-center flex justify-center border border-[#EEF1F9] rounded-md'>
              <Logo.Second className='' />
            </Box>
            <Box className='h-[50px] w-[50px] items-center flex justify-center border border-[#EEF1F9] rounded-md'>
              <Logo.Third className='' />
            </Box>
            <Box className='h-[50px] w-[50px] items-center flex justify-center border border-[#EEF1F9] rounded-md'>
              <Logo.Fourth className='' />
            </Box>
          </Flex>

          <Button
            variant="ghost"
            size="sm"
            color="#fff"
            width="120px"
            height="38px"
            borderRadius="10px"
            className='font-bold'
            backgroundColor="#41245F"
          >
            Melding maken
          </Button>

          <Badge className='flex items-center justify-center h-[38px] min-w-[50px] rounded-[10px] bg-[#75C5C1] font-semibold' backgroundColor="#75C5C1" variant="solid" px={2} py={1}>
            VIM
          </Badge>
          <Badge className='flex items-center justify-center h-[38px] min-w-[50px] rounded-[10px] bg-[#75C5C1]' backgroundColor="#75C5C1" variant="solid" px={2} py={1}>
            LMS
          </Badge>
          <Badge className='flex items-center justify-center h-[38px] min-w-[50px] rounded-[10px] bg-[#75C5C1]' backgroundColor="#75C5C1" variant="solid" px={2} py={1}>
            BHV
          </Badge>
          <Badge className='flex items-center justify-center h-[38px] min-w-[50px] rounded-[10px] bg-[#75C5C1]' backgroundColor="#75C5C1" variant="solid" px={2} py={1}>
            DataLek
          </Badge>

          <IconButton
            aria-label="Settings"
            variant="ghost"
            size="sm"
          ><LuSettings size="22" /></IconButton>

          <IconButton
            aria-label="Notifications"
            variant="ghost"
            size="sm"
          ><FaBell size="22" /></IconButton>

          <Menu>
            <MenuButton as={Button} variant="ghost" size="sm">
              <HStack gap={2}>
                <Avatar.Root size="sm" title="Hi Paul">
                  <Avatar.Image src="https://bit.ly/sage-adebayo" alt="Paul" />
                  <Avatar.Fallback>PA</Avatar.Fallback>
                </Avatar.Root>
                <Text fontSize="sm" fontWeight="medium">
                  Hi Paul
                </Text>
                <FaChevronDown size="12" />
              </HStack>
            </MenuButton>

            <MenuList backgroundColor="#fff" width="300px" className='flex flex-col gap-4 rounded-xl p-[30px]' padding="30px">
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>

        </HStack>
      </Flex>
    </Box>
  )
}

export default Header