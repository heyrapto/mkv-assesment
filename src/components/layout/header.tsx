import React from 'react'
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
import { FaChevronDown } from 'react-icons/fa'

const Header = () => {
  const { colorMode } = useColorMode()
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
          <IconButton
            aria-label="Go back"
            variant="ghost"
            size="sm"
          ><ArrowLeft2 size="20" /></IconButton>
          <InputGroup maxW="400px">
            <Input
              placeholder="M91"
              bg="gray.50"
              border="none"
              _focus={{
                bg: 'white',
                boxShadow: '0 0 0 1px #3182CE',
              }}
            />
          </InputGroup>
        </Flex>

        {/* Right side - Action buttons and user info */}
        <HStack gap={3}>
          <Button
            variant="ghost"
            size="sm"
            color="orange.500"
          >
            <Box w="12px" h="12px" bg="orange.400" borderRadius="full" />
            Melding maken
          </Button>
          
          <Badge colorScheme="teal" variant="solid" px={2} py={1}>
            VIM
          </Badge>
          <Badge colorScheme="green" variant="solid" px={2} py={1}>
            LMS
          </Badge>
          <Badge colorScheme="blue" variant="solid" px={2} py={1}>
            BHV
          </Badge>
          <Badge colorScheme="purple" variant="solid" px={2} py={1}>
            DataLek
          </Badge>
          
          <IconButton
            aria-label="Settings"
            variant="ghost"
            size="sm"
          ><Setting2 size="20" /></IconButton>
          
          <IconButton
            aria-label="Notifications"
            variant="ghost"
            size="sm"
          ><Notification size="20" /></IconButton>
          
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              size="sm"
            >
              <FaChevronDown size="12" />
              <HStack gap={2}>
                <Avatar.Root size="sm" title='Hi Paul' />
                <Text fontSize="sm" fontWeight="medium">
                  Hi Paul
                </Text>
              </HStack>
            </MenuButton>
            <MenuList>
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