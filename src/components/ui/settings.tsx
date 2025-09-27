import React, { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Select,
  Portal,
  createListCollection,
  Image
} from '@chakra-ui/react'
import { useColorMode } from '@/components/ui/color-mode'
import { FaChevronDown } from 'react-icons/fa'

// Language options
const languageOptions = createListCollection({
  items: [
    { label: "English", value: "en", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { label: "Dutch", value: "nl", flag: "🇳🇱" },
    { label: "French", value: "fr", flag: "🇫🇷" },
    { label: "German", value: "de", flag: "🇩🇪" },
    { label: "Spanish", value: "es", flag: "🇪🇸" }
  ]
})

interface SettingsSectionProps {
  collapsed: boolean
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ collapsed }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  
  const bg = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? '#E5E7EB' : 'gray.600'
  const cardBg = colorMode === 'light' ? '#F8F9FA' : 'gray.700'
  
  if (collapsed) return null

  return (
    <Box p={4}>
      <Box
        bg={cardBg}
        borderRadius="xl"
        p={4}
        border="1px solid"
        borderColor={borderColor}
      >
        <VStack gap={4} align="stretch">
          {/* Language Selector */}
          <Box>
            <Select.Root
              collection={languageOptions}
              value={[selectedLanguage]}
              onValueChange={(e: any) => setSelectedLanguage(e.value[0])}
              size="md"
            >
              <Select.Control>
                <Select.Trigger
                  bg="white"
                  border="1px solid #E5E7EB"
                  borderRadius="lg"
                  px={3}
                  py={2}
                  h="48px"
                  cursor="pointer"
                  _hover={{ borderColor: "#D1D5DB" }}
                >
                  <HStack flex={1} justify="space-between">
                    <HStack gap={2}>
                      {/* English Flag */}
                      <Box
                        w="24px"
                        h="18px"
                        bg="white"
                        borderRadius="sm"
                        border="1px solid #E5E7EB"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="12px"
                        position="relative"
                        overflow="hidden"
                      >
                        {/* English Flag - Red Cross on White */}
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          bottom="0"
                          bg="white"
                        />
                        {/* Vertical red line */}
                        <Box
                          position="absolute"
                          top="0"
                          bottom="0"
                          left="50%"
                          w="3px"
                          bg="#C53030"
                          transform="translateX(-50%)"
                        />
                        {/* Horizontal red line */}
                        <Box
                          position="absolute"
                          left="0"
                          right="0"
                          top="50%"
                          h="3px"
                          bg="#C53030"
                          transform="translateY(-50%)"
                        />
                      </Box>
                      <Text fontWeight="400" color="#374151">
                        English
                      </Text>
                    </HStack>
                    <FaChevronDown size={14} color="#9CA3AF" />
                  </HStack>
                </Select.Trigger>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content
                    bg="white"
                    border="1px solid #E5E7EB"
                    borderRadius="lg"
                    boxShadow="lg"
                    py={2}
                  >
                    {languageOptions.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <HStack gap={2} py={1}>
                          <Text fontSize="16px">{item.flag}</Text>
                          <Text>{item.label}</Text>
                        </HStack>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Box>

          {/* Dark Mode Toggle */}
          <HStack justify="space-between" align="center">
            <Text fontWeight="400" color="#6B7280" fontSize="16px">
              Dark mode
            </Text>
            {/* Custom Toggle Switch */}
            <Box
              as="button"
              w="52px"
              h="28px"
              bg={colorMode === 'dark' ? '#6B7280' : '#E5E7EB'}
              borderRadius="full"
              position="relative"
              cursor="pointer"
              onClick={toggleColorMode}
              transition="background-color 0.2s"
              _hover={{
                bg: colorMode === 'dark' ? '#4B5563' : '#D1D5DB'
              }}
            >
              {/* Toggle Circle */}
              <Box
                w="22px"
                h="22px"
                bg="white"
                borderRadius="full"
                position="absolute"
                top="3px"
                left={colorMode === 'dark' ? '27px' : '3px'}
                transition="left 0.2s"
                boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
              />
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default SettingsSection