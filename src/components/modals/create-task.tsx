"use client"

import React, { useState } from "react"
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
  FaChevronDown,
  FaSearch
} from "react-icons/fa"
import { CalendarPicker } from "../ui/calender-picker"

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

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: any) => void
}

export const CreateTaskModal = ({ isOpen, onClose, onSubmit }: CreateTaskModalProps) => {
  const [taskName, setTaskName] = useState("")
  const [status, setStatus] = useState("todo")
  const [dates, setDates] = useState("")
  const [selectedAssignees, setSelectedAssignees] = useState<number[]>([])
  const [priority, setPriority] = useState("")
  const [description, setDescription] = useState("")
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showQuickDates, setShowQuickDates] = useState(false)
  const [showAssigneeSearch, setShowAssigneeSearch] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [assigneeSearch, setAssigneeSearch] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    const selectedAssigneeData = availableAssignees.filter(assignee => 
      selectedAssignees.includes(assignee.id)
    )
    
    const newTask = {
      name: taskName,
      status,
      dates,
      assignees: selectedAssigneeData,
      priority,
      description
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
        borderRadius="lg"
        w="500px"
        maxH="90vh"
        overflowY="auto"
        position="relative"
      >
        {/* Header */}
        <Flex justify="space-between" align="center" p={6} borderBottom="1px solid #E5E7EB">
          <Text fontSize="lg" fontWeight="600" color="#374151">
            {taskName || "Task Name"}
          </Text>
          <IconButton variant="ghost" size="sm" onClick={onClose}>
            <FaTimes />
          </IconButton>
        </Flex>

        <VStack gap={0} align="stretch" p={6}>
          {/* Status */}
          <Box position="relative" py={4} borderBottom="1px solid #F3F4F6">
            <HStack justify="space-between">
              <HStack gap={3}>
                <Box w="20px" h="20px" borderRadius="full" border="2px solid #E5E7EB" />
                <Text color="#6B7280" fontWeight="500">Status</Text>
              </HStack>
              <Box position="relative">
                <Badge
                  bg={getStatusColor(status)}
                  color="white"
                  borderRadius="md"
                  px={3}
                  py={1}
                  cursor="pointer"
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
                    minW="120px"
                    boxShadow="lg"
                    zIndex={10}
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
                        <Text fontSize="sm">{option.label}</Text>
                      </HStack>
                    ))}
                  </Box>
                )}
              </Box>
            </HStack>
          </Box>

          {/* Dates */}
          <Box position="relative" py={4} borderBottom="1px solid #F3F4F6">
            <HStack justify="space-between">
              <HStack gap={3}>
                <FaCalendarAlt color="#6B7280" />
                <Text color="#6B7280" fontWeight="500">Dates</Text>
              </HStack>
              <Box position="relative">
                <Text
                  color="#9CA3AF"
                  cursor="pointer"
                  onClick={() => setShowQuickDates(!showQuickDates)}
                >
                  {dates || "00/00/0000"}
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
                    minW="150px"
                    boxShadow="lg"
                    zIndex={10}
                  >
                    {quickDateOptions.map((option) => (
                      <HStack
                        key={option.value}
                        justify="space-between"
                        px={3}
                        py={2}
                        cursor="pointer"
                        _hover={{ bg: "#F3F4F6" }}
                        onClick={() => {
                          setDates(option.label)
                          setShowQuickDates(false)
                        }}
                      >
                        <Text fontSize="sm">{option.label}</Text>
                        <Text fontSize="sm" color="#6B7280">{option.day}</Text>
                      </HStack>
                    ))}
                    
                    <Box borderTop="1px solid #E5E7EB" mt={2} pt={2}>
                      <HStack
                        px={3}
                        py={2}
                        cursor="pointer"
                        _hover={{ bg: "#F3F4F6" }}
                        onClick={() => {
                          setShowCalendar(!showCalendar)
                          setShowQuickDates(false)
                        }}
                      >
                        <FaCalendarAlt size={12} />
                        <Text fontSize="sm">Custom Date</Text>
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
          <Box position="relative" py={4} borderBottom="1px solid #F3F4F6">
            <HStack justify="space-between">
              <HStack gap={3}>
                <FaUser color="#6B7280" />
                <Text color="#6B7280" fontWeight="500">Assignees</Text>
              </HStack>
              <Box position="relative">
                {selectedAssignees.length > 0 ? (
                  <HStack>
                    {selectedAssignees.slice(0, 2).map(assigneeId => {
                      const assignee = availableAssignees.find(a => a.id === assigneeId)
                      return assignee ? (
                        <Avatar.Root key={assigneeId} size="sm">
                          <Avatar.Image src={assignee.avatar} alt={assignee.name} />
                          <Avatar.Fallback bg="#E5E7EB" color="#374151" fontSize="xs">
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
                      >
                        +{selectedAssignees.length - 2}
                      </Box>
                    )}
                    <IconButton
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowAssigneeSearch(!showAssigneeSearch)}
                    >
                      <FaChevronDown />
                    </IconButton>
                  </HStack>
                ) : (
                  <Text
                    color="#9CA3AF"
                    cursor="pointer"
                    onClick={() => setShowAssigneeSearch(!showAssigneeSearch)}
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
                    minW="250px"
                    boxShadow="lg"
                    zIndex={10}
                  >
                    <Box position="relative" mb={3}>
                      <Input
                        placeholder="Search user"
                        value={assigneeSearch}
                        onChange={(e) => setAssigneeSearch(e.target.value)}
                        pl={8}
                        size="sm"
                        bg="#F9FAFB"
                        border="1px solid #E5E7EB"
                      />
                      <Box position="absolute" left={2} top="50%" transform="translateY(-50%)">
                        <FaSearch size={12} color="#9CA3AF" />
                      </Box>
                    </Box>

                    <VStack align="stretch" gap={2} maxH="200px" overflowY="auto">
                      {filteredAssignees.map((assignee) => (
                        <HStack
                          key={assignee.id}
                          p={2}
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
                          <Text flex={1} fontSize="sm">{assignee.name}</Text>
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
          <Box position="relative" py={4} borderBottom="1px solid #F3F4F6">
            <HStack justify="space-between">
              <HStack gap={3}>
                <FaFlag color="#6B7280" />
                <Text color="#6B7280" fontWeight="500">Priority</Text>
              </HStack>
              <Box position="relative">
                <Text
                  color={priority ? getPriorityColor(priority) : "#9CA3AF"}
                  cursor="pointer"
                  onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
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
                    boxShadow="lg"
                    zIndex={10}
                  >
                    {priorityOptions.map((option) => (
                      <HStack
                        key={option.value}
                        px={3}
                        py={2}
                        cursor="pointer"
                        _hover={{ bg: "#F3F4F6" }}
                        onClick={() => {
                          setPriority(option.value)
                          setShowPriorityDropdown(false)
                        }}
                      >
                        <FaFlag color={option.color} size={12} />
                        <Text fontSize="sm">{option.label}</Text>
                      </HStack>
                    ))}
                    
                    <Box borderTop="1px solid #E5E7EB" mt={2} pt={2}>
                      <HStack
                        px={3}
                        py={2}
                        cursor="pointer"
                        _hover={{ bg: "#F3F4F6" }}
                        onClick={() => {
                          setPriority("")
                          setShowPriorityDropdown(false)
                        }}
                      >
                        <Text fontSize="sm" color="#6B7280">Clear</Text>
                      </HStack>
                    </Box>
                  </Box>
                )}
              </Box>
            </HStack>
          </Box>

          {/* Description */}
          <Box py={4}>
            <HStack gap={3} align="flex-start" mb={3}>
              <FaFileAlt color="#6B7280" style={{ marginTop: "4px" }} />
              <Text color="#6B7280" fontWeight="500">Description</Text>
            </HStack>
            <Textarea
              placeholder="Write something or type"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bg="#F9FAFB"
              border="1px solid #E5E7EB"
              borderRadius="md"
              minH="100px"
              resize="vertical"
              _focus={{ borderColor: "#75C5C1", boxShadow: "0 0 0 1px #75C5C1" }}
            />
          </Box>

          {/* Task Name Input */}
          <Box py={4}>
            <Input
              placeholder="Enter task name..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              bg="#F9FAFB"
              border="1px solid #E5E7EB"
              borderRadius="md"
              _focus={{ borderColor: "#75C5C1", boxShadow: "0 0 0 1px #75C5C1" }}
            />
          </Box>
        </VStack>

        {/* Footer */}
        <Flex justify="flex-end" p={6} borderTop="1px solid #E5E7EB">
          <Button
            bg="#75C5C1"
            color="white"
            px={8}
            py={2}
            borderRadius="md"
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