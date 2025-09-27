import React from 'react'
import {
    Box,
    VStack,
    HStack,
    Text,
    Icon,
    Flex,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
} from '@chakra-ui/react'
import { Collapse } from '@chakra-ui/transition'
import { useColorMode } from '@/components/ui/color-mode'
import { SidebarItemProps } from '@/types/sidebar'
import { FaChevronDown } from 'react-icons/fa'

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, isSubItem = false, collapsed = false, setCollapsed }) => {
    const collapse = useDisclosure({
        defaultOpen: item.active || item.items?.some((sub: any) => sub.active),
    })
    const { colorMode } = useColorMode()
    const bg = colorMode === 'light' ? 'white' : 'gray.800'
    const hoverBg = colorMode === 'light' ? 'green.50' : 'gray.700'
    const activeBg = colorMode === 'light' ? 'green.100' : 'green.900'
    const textColor = colorMode === 'light' ? 'gray.700' : 'gray.200'
    const activeTextColor = colorMode === 'light' ? 'green.600' : 'green.200'

    if (collapsed) {
        return (
            <Flex w="full" align="center" justify="center" py={2} cursor="pointer">
                {item.items ? (
                    <Popover.Root>
                        <PopoverTrigger cursor="pointer">
                            <Flex
                                align="center"
                                justify="center"
                                w="48px"
                                h="48px"
                                cursor="pointer"
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
                        cursor="pointer"
                        _hover={{ bg: hoverBg }}
                        onClick={() => setCollapsed && setCollapsed(false)}
                    >
                        {item.icon && <item.icon size={26} color="currentColor" />}
                    </Flex>
                )}
            </Flex>
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
                                bg={sub.active ? activeBg : 'transparent'} 
                                color={sub.active ? activeTextColor : textColor} 
                                _hover={{ bg: sub.active ? activeBg : hoverBg }} 
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