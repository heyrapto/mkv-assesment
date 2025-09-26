"use client"

import React, { useState } from "react"
import {
  Box,
  Flex,
  HStack,
  Button,
  Badge,
  IconButton,
  Text,
  Avatar,
} from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/menu"
import { FaChevronDown } from "react-icons/fa"
import SearchInput from "../ui/search-input"
import { Logo } from "../ui/logos"
import { actions, badges, menuItems } from "@/constants"

export const logos = [
  { id: "first", component: <Logo.First /> },
  { id: "second", component: <Logo.Second /> },
  { id: "third", component: <Logo.Third /> },
  { id: "fourth", component: <Logo.Fourth /> },
]

const Header = () => {
  const { colorMode } = useColorMode()
  const [search, setSearch] = useState("")
  const bg = colorMode === "light" ? "white" : "gray.800"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700"

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
      <Flex
        justify="space-between"
        align="center"
        w="100%"
      >
        {/* LEFT */}
        <Flex align="center" flex="1" minW="200px">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search tasks..."
            maxW="500px"
          />
        </Flex>

        {/* CENTER */}
        <Flex
          align="center"
          justify="center"
          gap={4}
          flex="2"
        >
          {/* Logos */}
          <Flex gap={3}>
            {logos.map((logo) => (
              <Box
                key={logo.id}
                className="h-[50px] w-[50px] flex items-center justify-center border border-[#EEF1F9] rounded-md"
              >
                {logo.component}
              </Box>
            ))}
          </Flex>

          {/* Badges */}
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
          <Flex gap={2}>
            {badges.map((label) => (
              <Badge
                key={label}
                className="flex items-center justify-center h-[38px] min-w-[60px] rounded-[10px] font-semibold"
                backgroundColor="#75C5C1"
                variant="solid"
                px={2}
                py={1}
              >
                {label}
              </Badge>
            ))}
          </Flex>
        </Flex>

        {/* RIGHT */}
        <Flex
          align="center"
          justify="flex-end"
          flex="1"
          gap={3}
        >
          {/* Action buttons */}
          {actions.map(({ icon: Icon, label }) => (
            <IconButton key={label} aria-label={label} variant="ghost" size="sm">
              <Icon size="22" />
            </IconButton>
          ))}

          {/* User Menu */}
          <Menu>
            <MenuButton as={Button} variant="ghost" size="sm" padding="10px" borderRadius="10px">
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
              {menuItems.map((item) => (
                <MenuItem key={item}>{item}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

    </Box>
  )
}

export default Header
