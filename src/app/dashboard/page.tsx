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
  Portal,
  createListCollection,
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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Urgent': return 'red'
    case 'Important': return 'orange'
    case 'Medium': return 'blue'
    default: return 'gray'
  }
}

const TaskTable = ({ tasks }: any) => {
  const { colorMode } = useColorMode()
  const borderColor = colorMode === 'light' ? '#E2E8F0' : '#4A5568'

  return (
    <Box overflowX="auto">
      <Box display="grid" gridTemplateColumns="2fr 1.5fr 1fr 1fr auto" gap={4} p={4} borderBottom="1px solid" borderColor={borderColor}>
        <Text color="gray.500" fontWeight="medium" fontSize="sm">Name</Text>
        <Text color="gray.500" fontWeight="medium" fontSize="sm">Date</Text>
        <Text color="gray.500" fontWeight="medium" fontSize="sm">Assignee</Text>
        <Text color="gray.500" fontWeight="medium" fontSize="sm">Priority</Text>
        <Box></Box>
      </Box>

      {tasks.map((task: any, index: any) => (
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
          <AvatarGroup size="sm">
            {task.assignee.map((user: any, idx: number) => (
              <Avatar.Root key={idx}>
                <Avatar.Image title={user.name} src={user.avatar} />
              </Avatar.Root>
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
          <IconButton variant="ghost" size="sm" aria-label="More options">
            <FaEllipsisV />
          </IconButton>
        </Box>
      ))}
    </Box>
  )
}

const SearchInput = ({ searchTerm, setSearchTerm }: any) => {
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

const rowsPerPageOptions = createListCollection({
  items: [
    { label: "10", value: "10" },
    { label: "25", value: "25" },
    { label: "50", value: "50" },
  ],
})

const TaskManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { colorMode } = useColorMode()
  const bg = colorMode === 'light' ? 'white' : 'gray.800'

  const todoTasks = mockTasks.filter(task => task.status === 'todo')
  const progressTasks = mockTasks.filter(task => task.status === 'progress')
  const completeTasks = mockTasks.filter(task => task.status === 'complete')

  const filteredTasks = mockTasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredTasks.length / rowsPerPage)

  // paginate
  const startIndex = (currentPage - 1) * rowsPerPage
  const currentTasks = filteredTasks.slice(startIndex, startIndex + rowsPerPage)

  return (
    <MainLayout>
      <VStack gap={6} align="stretch">
        {/* Page Header */}
        <Flex justify="space-between" align="center">
          <HStack gap={4}>
            <IconButton variant="ghost" size="sm" aria-label="Go back">
              <ArrowLeft2 size="20" />
            </IconButton>
            <Heading size="lg" fontWeight="semibold">
              Afdeling Kwaliteit
            </Heading>
            <IconButton variant="ghost" size="sm" aria-label="Settings">
              <Setting4 size="20" />
            </IconButton>
            <IconButton variant="ghost" size="sm" aria-label="Category">
              <Category size="20" />
            </IconButton>
            <IconButton variant="ghost" size="sm" aria-label="Filter">
              <Filter size="20" />
            </IconButton>
          </HStack>

          <HStack gap={3}>
            <Button variant="outline" size="sm" colorScheme="gray">
              <Export size="18" />
              Export xlsx
            </Button>
            <Button colorScheme="teal" size="sm">
              <Add size="18" />
              Add Task
            </Button>
          </HStack>
        </Flex>

        {/* Search */}
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Tabs */}
        <Tabs.Root colorScheme="blue" defaultValue={"all"}>
          <Tabs.List bg="gray.50" p={1} borderRadius="lg" display="inline-flex">
            <Tabs.Trigger value={"todo"} fontSize="sm" px={4}>
              <HStack gap={2}>
                <Box w={2} h={2} bg="purple.400" borderRadius="full" />
                <Text>To Do</Text>
                <Badge bg="gray.200" color="gray.600" borderRadius="full" px={2} fontSize="xs">
                  {todoTasks.length}
                </Badge>
              </HStack>
            </Tabs.Trigger>
            <Tabs.Trigger value={"progress"} fontSize="sm" px={4}>
              <HStack gap={2}>
                <Box w={2} h={2} bg="orange.400" borderRadius="full" />
                <Text>In Progress</Text>
                <Badge bg="gray.200" color="gray.600" borderRadius="full" px={2} fontSize="xs">
                  {progressTasks.length}
                </Badge>
              </HStack>
            </Tabs.Trigger>
            <Tabs.Trigger value={"complete"} fontSize="sm" px={4}>
              <HStack gap={2}>
                <Box w={2} h={2} bg="green.400" borderRadius="full" />
                <Text>Complete</Text>
                <Badge bg="gray.200" color="gray.600" borderRadius="full" px={2} fontSize="xs">
                  {completeTasks.length}
                </Badge>
              </HStack>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="all" px={0}>
            <Box bg={bg} borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
              <TaskTable tasks={mockTasks} />
            </Box>
            </Tabs.Content>
          <Tabs.Content value="todo" px={0}>
            <Box bg={bg} borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
              <TaskTable tasks={todoTasks} />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="progress" px={0}>
            <Box bg={bg} borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
              <TaskTable tasks={progressTasks} />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="complete" px={0}>
            <Box bg={bg} borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
              <TaskTable tasks={completeTasks} />
            </Box>
          </Tabs.Content>
        </Tabs.Root>

        {/* Pagination */}
        <Flex justify="space-between" align="center" pt={4}>
          <HStack gap={2}>
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <ArrowLeft2 size="16" />
            </IconButton>

            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={currentPage === idx + 1 ? 'solid' : 'ghost'}
                colorScheme={currentPage === idx + 1 ? 'blue' : 'gray'}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}

            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              <ArrowLeft2 size="16" style={{ transform: 'rotate(180deg)' }} />
            </IconButton>
          </HStack>

          {/* Rows per page */}
          <HStack gap={2}>
            <Text fontSize="sm" color="gray.600">
              Rows Per page:
            </Text>
            <Select.Root
              collection={rowsPerPageOptions}
              size="sm"
              value={[rowsPerPage.toString()]}
              onValueChange={(e: any) => {
                setRowsPerPage(Number(e.value[0]))
                setCurrentPage(1) // reset to first page
              }}
            >
              <Select.Control w="70px">
                <Select.Trigger>
                  <Select.ValueText />
                </Select.Trigger>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {rowsPerPageOptions.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </HStack>
        </Flex>
      </VStack>
    </MainLayout>
  )
}

export default TaskManagement;