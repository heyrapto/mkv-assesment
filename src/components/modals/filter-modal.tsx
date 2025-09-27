import { Filters } from "@/types/task"
import { Flex, Box, Text, IconButton, VStack, Stack, Checkbox, HStack, Separator, Button } from "@chakra-ui/react"
import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import { LuFlag } from "react-icons/lu"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  onApplyFilters: (filters: Filters) => void
}

export const FilterModal = ({ isOpen, onClose, filters, setFilters, onApplyFilters }: FilterModalProps) => {
    const [tempFilters, setTempFilters] = useState<Filters>(filters)
  
    const handleApply = () => {
      setFilters(tempFilters)
      onApplyFilters(tempFilters)
      onClose()
    }
  
    const handleReset = () => {
      const resetFilters = {
        priority: [],
        status: [],
        assignee: []
      }
      setTempFilters(resetFilters)
      setFilters(resetFilters)
      onApplyFilters(resetFilters)
    }
  
    const handlePriorityChange = (priority: string, checked: boolean) => {
      if (checked) {
        setTempFilters({
          ...tempFilters,
          priority: [...tempFilters.priority, priority]
        })
      } else {
        setTempFilters({
          ...tempFilters,
          priority: tempFilters.priority.filter((p: string) => p !== priority)
        })
      }
    }
  
    const handleStatusChange = (status: string, checked: boolean) => {
      if (checked) {
        setTempFilters({
          ...tempFilters,
          status: [...tempFilters.status, status]
        })
      } else {
        setTempFilters({
          ...tempFilters,
          status: tempFilters.status.filter((s: string) => s !== status)
        })
      }
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
          maxW="md"
          w="full"
          mx={4}
          maxH="90vh"
          overflowY="auto"
          boxShadow="xl"
        >
          {/* Header */}
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight="600">Filter Tasks</Text>
            <IconButton variant="ghost" size="sm" onClick={onClose}>
              <FaTimes />
            </IconButton>
          </Flex>
  
          {/* Content */}
          <VStack gap={6} align="stretch" mb={6}>
            {/* Priority Filter */}
            <Box>
              <Text fontWeight="600" mb={3}>Priority</Text>
              <Stack gap={2}>
                {["Urgent", "Important", "Medium", "Low"].map((priority) => (
                  <Checkbox.Root
                    key={priority}
                    checked={tempFilters.priority.includes(priority)}
                    onCheckedChange={(e) => handlePriorityChange(priority, e.checked as boolean)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>
                      <HStack>
                        <LuFlag
                          className={`${priority === "Urgent" ? "text-red-500" :
                            priority === "Important" ? "text-yellow-500" :
                              priority === "Medium" ? "text-blue-500" : "text-gray-500"} `}
                        />
                        <Text>{priority}</Text>
                      </HStack>
                    </Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Stack>
            </Box>
  
            <Separator />
  
            {/* Status Filter */}
            <Box>
              <Text fontWeight="600" mb={3}>Status</Text>
              <Stack gap={2}>
                {[
                  { value: "todo", label: "To Do" },
                  { value: "progress", label: "In Progress" },
                  { value: "complete", label: "Complete" }
                ].map((status) => (
                  <Checkbox.Root
                    key={status.value}
                    checked={tempFilters.status.includes(status.value)}
                    onCheckedChange={(e) => handleStatusChange(status.value, e.checked as boolean)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{status.label}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Stack>
            </Box>
          </VStack>
  
          {/* Footer */}
          <HStack justify="flex-end" gap={2}>
            <Button variant="ghost" padding="3" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={onClose} padding="3" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleApply} padding="3" bg="#75C5C1" color="white">
              Apply Filters
            </Button>
          </HStack>
        </Box>
      </Box>
    )
  }
  