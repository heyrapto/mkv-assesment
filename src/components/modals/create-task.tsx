"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Flex,
  IconButton,
  Badge,
  Avatar,
  Textarea,
} from "@chakra-ui/react"
import {
  FaTimes,
  FaCalendarAlt,
  FaUser,
  FaFlag,
  FaFileAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSearch
} from "react-icons/fa"
import { Task } from "@/types/task"

const availableAssignees = [
  { id: 1, name: "Maria Vetrovs", avatar: "https://i.pravatar.cc/150?u=maria" },
  { id: 2, name: "Adison Mango", avatar: "https://i.pravatar.cc/150?u=adison" },
  { id: 3, name: "Gustavo Culhane", avatar: "https://i.pravatar.cc/150?u=gustavo" },
  { id: 4, name: "Adison Bator", avatar: "https://i.pravatar.cc/150?u=bator" },
  { id: 5, name: "Zaire George", avatar: "https://i.pravatar.cc/150?u=zaire" },
]

const statusOptions = [
  { value: "todo", label: "To Do", color: "#A78BFA" },
  { value: "progress", label: "In Progress", color: "#FBBF24" },
  { value: "complete", label: "Complete", color: "#10B981" }
]

const priorityOptions = [
  { value: "urgent", label: "Urgent", color: "#EF4444" },
  { value: "important", label: "Important", color: "#F97316" },
  { value: "normal", label: "Normal", color: "#75C5C1" },
  { value: "low", label: "Low", color: "#9CA3AF" }
]

const quickDateOptions = [
  { label: "Today", value: "today", day: "Thu" },
  { label: "Tomorrow", value: "tomorrow", day: "Fri" },
  { label: "This Weekend", value: "weekend", day: "Sat" },
  { label: "Next Week", value: "nextweek", day: "Mon" },
  { label: "Next Weekend", value: "nextweekend", day: "18 Jan" },
  { label: "2 Week", value: "2week", day: "21 Jan" },
  { label: "4 Week", value: "4week", day: "4 Feb" }
]

const CalendarPicker = ({ onDateSelect, onClose }: { onDateSelect: (date: string) => void, onClose: () => void }) => {
  const [currentMonth] = useState("January 2025")
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
      right="0"
      bg="white"
      border="1px solid #E5E7EB"
      borderRadius="lg"
      p={4}
      boxShadow="xl"
      zIndex={20}
      mt={2}
      minW="340px"
    >
      {/* Date Input Section */}
      <HStack mb={4} gap={3}>
        <Box flex={1}>
          <HStack bg="#F9FAFB" border="1px solid #E5E7EB" borderRadius="md" px={3} py={2}>
            <FaCalendarAlt size={14} color="#9CA3AF" />
            <Text fontSize="sm" color="#9CA3AF">DD/MM/YYYY</Text>
          </HStack>
        </Box>
        <Box>
          <HStack bg="#F9FAFB" border="1px solid #E5E7EB" borderRadius="md" px={3} py={2}>
            <Text fontSize="sm" color="#9CA3AF">00:00</Text>
          </HStack>
        </Box>
      </HStack>

      {/* Calendar Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <IconButton variant="ghost" size="sm" onClick={() => { }}>
          <FaChevronLeft size={14} />
        </IconButton>
        <Text fontWeight="600" fontSize="md">{currentMonth}</Text>
        <IconButton variant="ghost" size="sm" onClick={() => { }}>
          <FaChevronRight size={14} />
        </IconButton>
      </Flex>

      {/* Days of week */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} mb={3}>
        {daysOfWeek.map((day) => (
          <Text key={day} textAlign="center" fontSize="xs" color="#6B7280" py={1} fontWeight="500">
            {day}
          </Text>
        ))}
      </Box>

      {/* Calendar Days */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {/* Empty cells for proper alignment - January 2025 starts on Wednesday */}
        {Array.from({ length: 2 }, (_, i) => (
          <Box key={`empty-${i}`} />
        ))}

        {daysInMonth.map((day) => (
          <Box
            key={day}
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="36px"
            h="36px"
            borderRadius="md"
            fontSize="sm"
            cursor="pointer"
            bg={selectedDate === day ? "#75C5C1" : "transparent"}
            color={selectedDate === day ? "white" : "#374151"}
            _hover={{ bg: selectedDate === day ? "#75C5C1" : "#F3F4F6" }}
            onClick={() => handleDateClick(day)}
            fontWeight={day === 1 ? "600" : "400"}
          >
            {day}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: Task) => void
  defaultStatus?: string
}

export const CreateTaskModal = ({ isOpen, onClose, onSubmit, defaultStatus }: CreateTaskModalProps) => {
  const [taskName, setTaskName] = useState("")
  const [status, setStatus] = useState("todo")
  const [date, setDates] = useState("")
  const [selectedAssignees, setSelectedAssignees] = useState<number[]>([])
  const [priority, setPriority] = useState("")
  const [description, setDescription] = useState("")
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showQuickDates, setShowQuickDates] = useState(false)
  const [showAssigneeSearch, setShowAssigneeSearch] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [assigneeSearch, setAssigneeSearch] = useState("")

  useEffect(() => {
    if (isOpen && defaultStatus) {
      setStatus(defaultStatus)
    }
  }, [isOpen, defaultStatus])

  if (!isOpen) return null

  const priorityMap: Record<string, Task["priority"]> = {
    urgent: "Urgent",
    important: "Important",
    normal: "Medium",
    low: "Low",
  }

  const statusMap: Record<string, Task["status"]> = {
    todo: "todo",
    progress: "progress",
    complete: "complete",
  }

  const handleSubmit = () => {
    const selectedAssigneeData = availableAssignees.filter(assignee =>
      selectedAssignees.includes(assignee.id)
    )


    const newTask: Task = {
      id: crypto.randomUUID(), 
      name: taskName,
      status: statusMap[status], 
      date: date,
      assignee: selectedAssigneeData.map(a => ({ name: a.name, avatar: a.avatar })),
      priority: priorityMap[priority],
    }

    onSubmit(newTask)

    setTaskName("")
    setStatus("todo")
    setDates("")
    setSelectedAssignees([])
    setPriority("")
    setDescription("")
    onClose()
  }

  const toggleAssignee = (assigneeId: number) => {
    setSelectedAssignees(prev =>
      prev.includes(assigneeId)
        ? prev.filter(id => id !== assigneeId)
        : [...prev, assigneeId]
    )
  }

  const getStatusColor = (statusValue: string) => {
    return statusOptions.find(option => option.value === statusValue)?.color || "#A78BFA"
  }

  const getPriorityColor = (priorityValue: string) => {
    return priorityOptions.find(option => option.value === priorityValue)?.color || "#9CA3AF"
  }

  const filteredAssignees = availableAssignees.filter(assignee =>
    assignee.name.toLowerCase().includes(assigneeSearch.toLowerCase())
  )

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
        borderRadius="xl"
        w="520px"
        maxH="90vh"
        overflowY="auto"
        position="relative"
        boxShadow="2xl"
      >
        {/* Header */}
        <Flex justify="space-between" align="center" p={6} pb={3}>
          <Text fontSize="xl" fontWeight="400" color="#9CA3AF">
            Task Name
          </Text>
          <IconButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            color="#9CA3AF"
            _hover={{ bg: "#F3F4F6" }}
          >
            <FaTimes size={16} />
          </IconButton>
        </Flex>

        {/* Task Name Input */}
        <Box px={6} pb={6}>
          <Input
            placeholder={taskName || "MKV Intranet V2"}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            fontSize="2xl"
            fontWeight="700"
            color="#111827"
            border="none"
            bg="transparent"
            px={0}
            h="auto"
            _focus={{ border: "none", boxShadow: "none" }}
            _placeholder={{ color: "#D1D5DB", fontWeight: "700" }}
          />
        </Box>

        <VStack gap={0} align="stretch" px={6}>
          {/* Status */}
          <Box position="relative" py={5} borderBottom="1px solid #F3F4F6">
            <HStack justify="space-between">
              <HStack gap={3}>
                <Box
                  w="20px"
                  h="20px"
                  borderRadius="full"
                  border="2px solid"
                  borderColor="#E5E7EB"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box w="8px" h="8px" bg="#E5E7EB" borderRadius="full" />
                </Box>
                <Text color="#6B7280" fontWeight="500" fontSize="15px">Status</Text>
              </HStack>
              <Box position="relative">
                <Badge
                  bg={getStatusColor(status)}
                  color="white"
                  borderRadius="md"
                  px={3}
                  py={1}
                  cursor="pointer"
                  fontSize="12px"
                  fontWeight="500"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                >
                  {statusOptions.find(opt => opt.value === status)?.label || "To Do"}
                </Badge>

                {showStatusDropdown && (
                  <Box
                    position="absolute"
                    top="100%"
                    right="0"
                    bg="white"
                    border="1px solid #E5E7EB"
                    borderRadius="lg"
                    py={2}
                    minW="140px"
                    boxShadow="xl"
                    zIndex={15}
                    mt={1}
                  >
                    {statusOptions.map((option) => (
                      <HStack
                        key={option.value}
                        px={3}
                        py={2}
                        cursor="pointer"
                        _hover={{ bg: "#F3F4F6" }}
                        onClick={() => {
                          setStatus(option.value)
                          setShowStatusDropdown(false)
                        }}
                      >
                        <Box w="8px" h="8px" borderRadius="full" bg={option.color} />
                        <Text fontSize="sm" fontWeight="500">{option.label}</Text>
                      </HStack>
                    ))}
                  </Box>
                )}
              </Box>
            </HStack>
          </Box>

          {/* Dates */}
          <Box position="relative" py={5} borderBottom="1px solid #F3F4F6">
            <HStack justify="space-between">
              <HStack gap={3}>
                <FaCalendarAlt color="#6B7280" size={16} />
                <Text color="#6B7280" fontWeight="500" fontSize="15px">Dates</Text>
              </HStack>
              <Box position="relative">
                <Text
                  color="#9CA3AF"
                  cursor="pointer"
                  onClick={() => setShowQuickDates(!showQuickDates)}
                  fontSize="14px"
                  fontWeight="400"
                >
                  {date || "00/00/0000"}
                </Text>

                {showQuickDates && (
                  <Box
                    position="absolute"
                    top="100%"
                    right="0"
                    bg="white"
                    border="1px solid #E5E7EB"
                    borderRadius="lg"
                    py={2}
                    minW="180px"
                    boxShadow="xl"
                    zIndex={15}
                    mt={1}
                  >
                    {quickDateOptions.map((option) => (
                      <HStack
                        key={option.value}
                        justify="space-between"
                        px={3}
                        py={2.5}
                        cursor="pointer"
                        _hover={{ bg: "#F3F4F6" }}
                        onClick={() => {
                          setDates(option.label)
                          setShowQuickDates(false)
                        }}
                      >
                        <Text fontSize="sm" fontWeight="400">{option.label}</Text>
                        <Text fontSize="sm" color="#6B7280" fontWeight="400">{option.day}</Text>
                      </HStack>
                    ))}

                    <Box borderTop="1px solid #E5E7EB" mt={2} pt={2}>
                      <HStack
                        px={3}
                        py={2.5}
                        cursor="pointer"
                        _hover={{ bg: "#F3F4F6" }}
                        onClick={() => {
                          setShowCalendar(!showCalendar)
                          setShowQuickDates(false)
                        }}
                      >
                        <FaCalendarAlt size={12} color="#6B7280" />
                        <Text fontSize="sm" fontWeight="400">Custom Date</Text>
                      </HStack>
                    </Box>
                  </Box>
                )}

                {showCalendar && (
                  <CalendarPicker
                    onDateSelect={(date) => {
                      setDates(date)
                      setShowCalendar(false)
                    }}
                    onClose={() => setShowCalendar(false)}
                  />
                )}
              </Box>
            </HStack>
          </Box>

          {/* Assignees */}
          <Box position="relative" py={5} borderBottom="1px solid #F3F4F6">
            <HStack justify="space-between">
              <HStack gap={3}>
                <FaUser color="#6B7280" size={16} />
                <Text color="#6B7280" fontWeight="500" fontSize="15px">Assignees</Text>
              </HStack>
              <Box position="relative">
                {selectedAssignees.length > 0 ? (
                  <HStack gap={0}>
                    {selectedAssignees.slice(0, 2).map(assigneeId => {
                      const assignee = availableAssignees.find(a => a.id === assigneeId)
                      return assignee ? (
                        <Avatar.Root key={assigneeId} size="sm" ml={assigneeId === selectedAssignees[0] ? 0 : -2}>
                          <Avatar.Image src={assignee.avatar} alt={assignee.name} />
                          <Avatar.Fallback bg="#E5E7EB" color="#374151" fontSize="xs" border="2px solid white">
                            {assignee.name.slice(0, 2).toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar.Root>
                      ) : null
                    })}
                    {selectedAssignees.length > 2 && (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="32px"
                        h="32px"
                        bg="#8B5CF6"
                        color="white"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="600"
                        ml={-2}
                        border="2px solid white"
                      >
                        +{selectedAssignees.length - 2}
                      </Box>
                    )}
                  </HStack>
                ) : (
                  <Text
                    color="#9CA3AF"
                    cursor="pointer"
                    onClick={() => setShowAssigneeSearch(!showAssigneeSearch)}
                    fontSize="14px"
                    fontWeight="400"
                  >
                    Select Assignee
                  </Text>
                )}

                {showAssigneeSearch && (
                  <Box
                    position="absolute"
                    top="100%"
                    right="0"
                    bg="white"
                    border="1px solid #E5E7EB"
                    borderRadius="lg"
                    p={3}
                    minW="280px"
                    boxShadow="xl"
                    zIndex={15}
                    mt={1}
                  >
                    <Box position="relative" mb={3}>
                      <Input
                        placeholder="Search user"
                        value={assigneeSearch}
                        onChange={(e) => setAssigneeSearch(e.target.value)}
                        pl={10}
                        size="sm"
                        bg="#F9FAFB"
                        border="1px solid #E5E7EB"
                        borderRadius="md"
                        fontSize="14px"
                      />
                      <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                        <FaSearch size={14} color="#9CA3AF" />
                      </Box>
                    </Box>

                    <VStack align="stretch" gap={1} maxH="200px" overflowY="auto">
                      {filteredAssignees.map((assignee) => (
                        <HStack
                          key={assignee.id}
                          p={2.5}
                          cursor="pointer"
                          borderRadius="md"
                          _hover={{ bg: "#F3F4F6" }}
                          onClick={() => toggleAssignee(assignee.id)}
                        >
                          <Avatar.Root size="sm">
                            <Avatar.Image src={assignee.avatar} alt={assignee.name} />
                            <Avatar.Fallback bg="#E5E7EB" color="#374151" fontSize="xs">
                              {assignee.name.slice(0, 2).toUpperCase()}
                            </Avatar.Fallback>
                          </Avatar.Root>
                          <Text flex={1} fontSize="sm" fontWeight="500">{assignee.name}</Text>
                          {selectedAssignees.includes(assignee.id) && (
                            <Box w="16px" h="16px" bg="#75C5C1" borderRadius="full" />
                          )}
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                )}
              </Box>
            </HStack>
          </Box>

          {/* Priority */}
          <Box position="relative" py={5} borderBottom="1px solid #F3F4F6">
            <HStack justify="space-between">
              <HStack gap={3}>
                <FaFlag color="#6B7280" size={16} />
                <Text color="#6B7280" fontWeight="500" fontSize="15px">Priority</Text>
              </HStack>
              <Box position="relative">
                <Text
                  color={priority ? getPriorityColor(priority) : "#9CA3AF"}
                  cursor="pointer"
                  onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                  fontSize="14px"
                  fontWeight={priority ? "500" : "400"}
                >
                  {priorityOptions.find(opt => opt.value === priority)?.label || "Select Priority"}
                </Text>

                {showPriorityDropdown && (
                  <Box
                    position="absolute"
                    top="100%"
                    right="0"
                    bg="white"
                    border="1px solid #E5E7EB"
                    borderRadius="lg"
                    py={2}
                    minW="150px"
                    boxShadow="xl"
                    zIndex={15}
                    mt={1}
                  >
                    {priorityOptions.map((option) => (
                      <HStack
                        key={option.value}
                        px={3}
                        py={2.5}
                        cursor="pointer"
                        _hover={{ bg: "#F3F4F6" }}
                        onClick={() => {
                          setPriority(option.value)
                          setShowPriorityDropdown(false)
                        }}
                      >
                        <FaFlag color={option.color} size={12} />
                        <Text fontSize="sm" fontWeight="500">{option.label}</Text>
                      </HStack>
                    ))}

                    <Box borderTop="1px solid #E5E7EB" mt={2} pt={2}>
                      <HStack
                        px={3}
                        py={2.5}
                        cursor="pointer"
                        _hover={{ bg: "#F3F4F6" }}
                        onClick={() => {
                          setPriority("")
                          setShowPriorityDropdown(false)
                        }}
                      >
                        <Text fontSize="sm" color="#6B7280" fontWeight="400">Clear</Text>
                      </HStack>
                    </Box>
                  </Box>
                )}
              </Box>
            </HStack>
          </Box>

          {/* Description */}
          <Box py={5}>
            <HStack gap={3} align="flex-start" mb={4}>
              <FaFileAlt color="#6B7280" size={16} style={{ marginTop: "4px" }} />
              <Text color="#6B7280" fontWeight="500" fontSize="15px">Description</Text>
            </HStack>
            <Textarea
            padding="2"
              placeholder="Write something or type"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bg="transparent"
              border="none"
              borderRadius="md"
              minH="80px"
              resize="none"
              fontSize="14px"
              color="#111827"
              _focus={{ border: "none", boxShadow: "none" }}
              _placeholder={{ color: "#D1D5DB", fontSize: "14px" }}
            />
          </Box>
        </VStack>

        {/* Footer */}
        <Flex justify="flex-end" p={6} pt={4} borderTop="1px solid #F3F4F6">
          <Button
            bg="#75C5C1"
            color="white"
            px={8}
            py={2.5}
            borderRadius="lg"
            fontSize="14px"
            fontWeight="600"
            onClick={handleSubmit}
            _hover={{ bg: "#5EAAA7" }}
          >
            Create Task
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default CreateTaskModal