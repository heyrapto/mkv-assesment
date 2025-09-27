import { Flex, Box, Text, IconButton } from "@chakra-ui/react"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export const CalendarPicker = ({ onDateSelect, onClose }: { onDateSelect: (date: string) => void, onClose: () => void }) => {
    const [currentMonth, setCurrentMonth] = useState("January 2025")
    const [selectedDate, setSelectedDate] = useState<number | null>(null)
  
    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
  
    const handleDateClick = (day: number) => {
      setSelectedDate(day)
      onDateSelect(`${day.toString().padStart(2, '0')}/01/2025`)
      onClose()
    }
  
    return (
      <Box
        position="absolute"
        top="100%"
        left="0"
        right="0"
        bg="white"
        border="1px solid #E5E7EB"
        borderRadius="lg"
        p={4}
        boxShadow="lg"
        zIndex={10}
        mt={2}
      >
        {/* Calendar Header */}
        <Flex justify="space-between" align="center" mb={4}>
          <IconButton variant="ghost" size="sm" onClick={() => {}}>
            <FaChevronLeft />
          </IconButton>
          <Text fontWeight="600">{currentMonth}</Text>
          <IconButton variant="ghost" size="sm" onClick={() => {}}>
            <FaChevronRight />
          </IconButton>
        </Flex>
  
        {/* Days of week */}
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} mb={2}>
          {daysOfWeek.map((day) => (
            <Text key={day} textAlign="center" fontSize="xs" color="#6B7280" py={1}>
              {day}
            </Text>
          ))}
        </Box>
  
        {/* Calendar Days */}
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
          {/* Empty cells for proper alignment */}
          {Array.from({ length: 6 }, (_, i) => (
            <Box key={`empty-${i}`} />
          ))}
          
          {daysInMonth.map((day) => (
            <Box
              key={day}
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="32px"
              h="32px"
              borderRadius="md"
              fontSize="sm"
              cursor="pointer"
              bg={selectedDate === day ? "#75C5C1" : "transparent"}
              color={selectedDate === day ? "white" : "#374151"}
              _hover={{ bg: selectedDate === day ? "#75C5C1" : "#F3F4F6" }}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </Box>
          ))}
        </Box>
      </Box>
    )
  }