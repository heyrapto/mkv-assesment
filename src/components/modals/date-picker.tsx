import { Box, Flex, IconButton, VStack, Input, HStack, Button, Text } from "@chakra-ui/react"
import { useState } from "react"
import { FaTimes } from "react-icons/fa"

type DateRange = {
  start: string;
  end: string;
};

type DatePickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
};


export const DatePickerModal = ({ isOpen, onClose, dateRange, setDateRange }: DatePickerModalProps) => {
    const [tempDateRange, setTempDateRange] = useState(dateRange)
  
    const handleApply = () => {
      setDateRange(tempDateRange)
      onClose()
    }
  
    if (!isOpen) return null
  
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="modal"
      >
        <Box
          bg="white"
          borderRadius="lg"
          p={6}
          maxW="sm"
          w="full"
          mx={4}
          boxShadow="xl"
        >
          {/* Header */}
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight="600">Select Date Range</Text>
            <IconButton variant="ghost" size="sm" onClick={onClose}>
              <FaTimes />
            </IconButton>
          </Flex>
  
          {/* Content */}
          <VStack gap={4} align="stretch" mb={6}>
            <Box>
              <Text fontWeight="600" mb={2}>Start Date</Text>
              <Input
                type="date"
                value={tempDateRange.start}
                onChange={(e) =>
                  setTempDateRange({ ...tempDateRange, start: e.target.value })
                }
              />
            </Box>
            <Box>
              <Text fontWeight="600" mb={2}>End Date</Text>
              <Input
                type="date"
                value={tempDateRange.end}
                onChange={(e) =>
                  setTempDateRange({ ...tempDateRange, end: e.target.value })
                }
              />
            </Box>
          </VStack>
  
          {/* Footer */}
          <HStack justify="flex-end" gap={2}>
            <Button onClick={onClose} padding="3" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleApply} padding="3" bg="#75C5C1" color="white">
              Apply
            </Button>
          </HStack>
        </Box>
      </Box>
    )
  }