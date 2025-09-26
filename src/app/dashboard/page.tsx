"use client"

import React, { useState } from 'react'
import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Badge,
  Avatar,
  AvatarGroup,
  IconButton,
  Button,
  Input,
  Tabs,
  Flex,
  Select,
} from '@chakra-ui/react'

import { useColorMode } from '@/components/ui/color-mode'

import { 
  SearchNormal1, 
  Add, 
  Export, 
  Setting4,
  ArrowLeft2,
  Filter,
  Category
} from 'iconsax-react'
import { FaEllipsisV } from 'react-icons/fa'
import MainLayout from './layout'

// Mock data
const mockTasks = [
  {
    id: 1,
    name: 'MKV Intranet V2',
    date: '04/06/2024 - 16/06/2014',
    assignee: [{ name: 'JI', avatar: null }],
    priority: 'Medium',
    status: 'todo'
  },
  {
    id: 2,
    name: 'Design System',
    date: '23/06/2024 - 24/06/2024',
    assignee: [{ name: 'JI', avatar: null }],
    priority: 'Important',
    status: 'todo'
  },
  {
    id: 3,
    name: 'Medical Appointment',
    date: '16/06/2024 - 18/06/2024',
    assignee: [
      { name: 'User 1', avatar: null },
      { name: 'User 2', avatar: null }
    ],
    priority: 'Urgent',
    status: 'todo'
  },
  {
    id: 4,
    name: 'MKV Intranet V2',
    date: '04/06/2024 - 16/06/2014',
    assignee: [{ name: 'JI', avatar: null }],
    priority: 'Medium',
    status: 'progress'
  },
  {
    id: 5,
    name: 'Design System',
    date: '23/06/2024 - 24/06/2024',
    assignee: [{ name: 'JI', avatar: null }],
    priority: 'Important',
    status: 'progress'
  }
]

// Utility function
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Urgent': return 'red'
    case 'Important': return 'orange'
    case 'Medium': return 'blue'
    default: return 'gray'
  }
}

// Custom Table Component (since Table components might not be available)
const TaskTable = ({ tasks }) => {
  const { colorMode } = useColorMode()
  const borderColor = colorMode === 'light' ? '#E2E8F0' : '#4A5568'
  
  return (
    <Box overflowX="auto">
      {/* Table Header */}
      <Box display="grid" gridTemplateColumns="2fr 1.5fr 1fr 1fr auto" gap={4} p={4} borderBottom="1px solid" borderColor={borderColor}>
        <Text color="gray.500" fontWeight="medium" fontSize="sm">Name</Text>
        <Text color="gray.500" fontWeight="medium" fontSize="sm">Date</Text>
        <Text color="gray.500" fontWeight="medium" fontSize="sm">Assignee</Text>
        <Text color="gray.500" fontWeight="medium" fontSize="sm">Priority</Text>
        <Box></Box>
      </Box>
      
      {/* Table Body */}
      {tasks.map((task, index) => (
        <Box
          key={task.id}
          display="grid"
          gridTemplateColumns="2fr 1.5fr 1fr 1fr auto"
          gap={4}
          p={4}
          borderBottom={index !== tasks.length - 1 ? "1px solid" : "none"}
          borderColor={borderColor}
          _hover={{ bg: colorMode === 'light' ? 'gray.50' : 'gray.700' }}
        >
          <Text fontWeight="medium">{task.name}</Text>
          <Text fontSize="sm" color="gray.600">{task.date}</Text>
          <AvatarGroup size="sm" max={2}>
            {task.assignee.map((user, idx) => (
              <Avatar.Root
                key={idx}
                name={user.name}
                src={user.avatar}
                size="sm"
              />
            ))}
          </AvatarGroup>
          <Badge
            colorScheme={getPriorityColor(task.priority)}
            variant="subtle"
            px={2}
            py={1}
            borderRadius="md"
            w="fit-content"
          >
            {task.priority}
          </Badge>
          <IconButton
            icon={<FaEllipsisV />}
            variant="ghost"
            size="sm"
            aria-label="More options"
          />
        </Box>
      ))}
    </Box>
  )
}

// Custom Input Group Component
const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box position="relative" maxW="400px">
      <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={2}>
        <SearchNormal1 size="20" color="#A0AEC0" />
      </Box>
      <Input
        placeholder="Search for To-Do"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        bg="white"
        border="1px"
        borderColor="gray.200"
        pl={10}
      />
    </Box>
  )
}

// Main Component
const TaskManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { colorMode } = useColorMode()
  const bg = colorMode === 'light' ? 'white' : 'gray.800'
  
  const todoTasks = mockTasks.filter(task => task.status === 'todo')
  const progressTasks = mockTasks.filter(task => task.status === 'progress')
  const completeTasks = mockTasks.filter(task => task.status === 'complete')

  return (
    <MainLayout>
      <VStack gap={6} align="stretch">
        {/* Page Header */}
        <Flex justify="space-between" align="center">
          <HStack gap={4}>
            <IconButton
              icon={<ArrowLeft2 size="20" />}
              variant="ghost"
              size="sm"
              aria-label="Go back"
            />
            <Heading size="lg" fontWeight="semibold">
              Afdeling Kwaliteit
            </Heading>
            <IconButton
              icon={<Setting4 size="20" />}
              variant="ghost"
              size="sm"
              aria-label="Settings"
            />
            <IconButton
              icon={<Category size="20" />}
              variant="ghost"
              size="sm"
              aria-label="Category"
            />
            <IconButton
              icon={<Filter size="20" />}
              variant="ghost"
              size="sm"
              aria-label="Filter"
            />
          </HStack>
          
          <HStack gap={3}>
            <Button
              leftIcon={<Export size="18" />}
              variant="outline"
              size="sm"
              colorScheme="gray"
            >
              Export xlsx
            </Button>
            <Button
              leftIcon={<Add size="18" />}
              colorScheme="teal"
              size="sm"
            >
              Add Task
            </Button>
          </HStack>
        </Flex>

        {/* Search */}
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Tabs */}
        <Tabs.Root variant="soft-rounded" colorScheme="blue">
          <Tabs.List bg="gray.50" p={1} borderRadius="lg" display="inline-flex">
            <Tabs.Trigger fontSize="sm" px={4}>
              <HStack gap={2}>
                <Box w={2} h={2} bg="purple.400" borderRadius="full" />
                <Text>To Do</Text>
                <Badge
                  bg="gray.200"
                  color="gray.600"
                  borderRadius="full"
                  px={2}
                  fontSize="xs"
                >
                  {todoTasks.length}
                </Badge>
              </HStack>
            </Tabs.Trigger>
            <Tabs.Trigger fontSize="sm" px={4}>
              <HStack gap={2}>
                <Box w={2} h={2} bg="orange.400" borderRadius="full" />
                <Text>In Progress</Text>
                <Badge
                  bg="gray.200"
                  color="gray.600"
                  borderRadius="full"
                  px={2}
                  fontSize="xs"
                >
                  {progressTasks.length}
                </Badge>
              </HStack>
            </Tabs.Trigger>
            <Tabs.Trigger fontSize="sm" px={4}>
              <HStack gap={2}>
                <Box w={2} h={2} bg="green.400" borderRadius="full" />
                <Text>Complete</Text>
                <Badge
                  bg="gray.200"
                  color="gray.600"
                  borderRadius="full"
                  px={2}
                  fontSize="xs"
                >
                  {completeTasks.length}
                </Badge>
              </HStack>
            </Tabs.Trigger>
          </Tabs.List>

            <Tabs.Content px={0}>
              <Box bg={bg} borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
                <TaskTable tasks={todoTasks} />
              </Box>
            </Tabs.Content>
            <Tabs.Content px={0}>
              <Box bg={bg} borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
                <TaskTable tasks={progressTasks} />
              </Box>
            </Tabs.Content>
            <Tabs.Content px={0}>
              <Box bg={bg} borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
                <TaskTable tasks={completeTasks} />
              </Box>
            </Tabs.Content>
        </Tabs.Root>

        {/* Pagination */}
        <Flex justify="space-between" align="center" pt={4}>
          <HStack gap={2}>
            <IconButton
              icon={<ArrowLeft2 size="16" />}
              size="sm"
              variant="ghost"
              isDisabled
              aria-label="Previous page"
            />
            <Button size="sm" colorScheme="blue" variant="solid">
              1
            </Button>
            <Button size="sm" variant="ghost">2</Button>
            <Button size="sm" variant="ghost">3</Button>
            <Button size="sm" variant="ghost">4</Button>
            <Button size="sm" variant="ghost">5</Button>
            <Text fontSize="sm" color="gray.500">...</Text>
            <Button size="sm" variant="ghost">100</Button>
            <IconButton
              icon={<ArrowLeft2 size="16" style={{ transform: 'rotate(180deg)' }} />}
              size="sm"
              variant="ghost"
              aria-label="Next page"
            />
          </HStack>
          
          <HStack gap={2}>
            <Text fontSize="sm" color="gray.600">
              Rows Per page:
            </Text>
            {/* <Select.label size="sm" defaultValue="10" w="70px">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Select.label> */}
          </HStack>
        </Flex>
      </VStack>
    </MainLayout>
  )
}

export default TaskManagement