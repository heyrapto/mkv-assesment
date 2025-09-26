"use client"

import React, { useState } from "react"
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
} from "@chakra-ui/react"

import { useColorMode } from "@/components/ui/color-mode"

import {
  SearchNormal1,
  Add,
  Export,
  Setting4,
  ArrowLeft2,
  Filter,
  Category,
} from "iconsax-react"
import { FaArrowAltCircleLeft, FaArrowCircleLeft, FaArrowLeft, FaCalendarWeek, FaEllipsisV, FaFileExport, FaPlus, FaPlusCircle, FaToggleOff } from "react-icons/fa"
import MainLayout from "./layout"
import { LuBookmark, LuCircleArrowLeft, LuListFilter, LuSettings } from "react-icons/lu"

// ✅ Avatars using pravatar API
const mockTasks = [
  {
    id: 1,
    name: "MKV Intranet V2",
    date: "04/06/2024 - 16/06/2024",
    assignee: [
      { name: "JI", avatar: "https://i.pravatar.cc/150?u=ji" },
      { name: "Alex", avatar: "https://i.pravatar.cc/150?u=alex" },
    ],
    priority: "Medium",
    status: "todo",
  },
  {
    id: 2,
    name: "Design System",
    date: "23/06/2024 - 24/06/2024",
    assignee: [{ name: "Sam", avatar: "https://i.pravatar.cc/150?u=sam" }],
    priority: "Important",
    status: "todo",
  },
  {
    id: 3,
    name: "Medical Appointment",
    date: "16/06/2024 - 18/06/2024",
    assignee: [
      { name: "User 1", avatar: "https://i.pravatar.cc/150?u=user1" },
      { name: "User 2", avatar: "https://i.pravatar.cc/150?u=user2" },
    ],
    priority: "Urgent",
    status: "todo",
  },
  {
    id: 4,
    name: "MKV Intranet V2",
    date: "04/06/2024 - 16/06/2024",
    assignee: [{ name: "Chris", avatar: "https://i.pravatar.cc/150?u=chris" }],
    priority: "Medium",
    status: "progress",
  },
  {
    id: 5,
    name: "Design System",
    date: "23/06/2024 - 24/06/2024",
    assignee: [{ name: "Taylor", avatar: "https://i.pravatar.cc/150?u=taylor" }],
    priority: "Important",
    status: "progress",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return "red"
    case "Important":
      return "orange"
    case "Medium":
      return "blue"
    default:
      return "gray"
  }
}

const TaskTable = ({ tasks }: any) => {
  const { colorMode } = useColorMode()
  const borderColor = colorMode === "light" ? "#E2E8F0" : "#4A5568"

  return (
    <Box overflowX="auto">
      {/* Table Header */}
      <Box
        display="grid"
        gridTemplateColumns="2fr 1.5fr 1fr 1fr auto"
        gap={4}
        px={4}
        py={3}
        bg="gray.50"
        borderBottom="1px solid"
        borderColor={borderColor}
        fontWeight="semibold"
      >
        <Text fontSize="sm" color="gray.600">
          Name
        </Text>
        <Text fontSize="sm" color="gray.600">
          Date
        </Text>
        <Text fontSize="sm" color="gray.600">
          Assignee
        </Text>
        <Text fontSize="sm" color="gray.600">
          Priority
        </Text>
        <Box />
      </Box>

      {/* Table Rows */}
      {tasks.map((task: any, index: number) => (
        <Box
          key={task.id}
          display="grid"
          gridTemplateColumns="2fr 1.5fr 1fr 1fr auto"
          gap={4}
          px={4}
          py={3}
          borderBottom={index !== tasks.length - 1 ? "1px solid" : "none"}
          borderColor={borderColor}
          _hover={{ bg: colorMode === "light" ? "gray.50" : "gray.700" }}
        >
          <Text fontWeight="medium">{task.name}</Text>
          <Text fontSize="sm" color="gray.600">
            {task.date}
          </Text>

          <AvatarGroup size="sm">
            {task.assignee.map((user: any, idx: number) => (
              <Avatar.Root key={idx}>
                <Avatar.Fallback>
                  {user.name ? user.name.slice(0, 2).toUpperCase() : "NA"}
                </Avatar.Fallback>
                {user.avatar && <Avatar.Image src={user.avatar} alt={user.name} />}
              </Avatar.Root>
            ))}
          </AvatarGroup>


          <Badge
            colorScheme={getPriorityColor(task.priority)}
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
          >
            {task.priority}
          </Badge>

          <IconButton
            aria-label="More options"
            size="sm"
            variant="ghost"
          ><FaEllipsisV /></IconButton>
        </Box>
      ))}
    </Box>
  )
}

const SearchInput = ({ searchTerm, setSearchTerm }: any) => {
  return (
    <Box position="relative" maxW="400px">
      <Box
        position="absolute"
        left={3}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
      >
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
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { colorMode } = useColorMode()
  const bg = colorMode === "light" ? "white" : "gray.800"

  const todoTasks = mockTasks.filter((task) => task.status === "todo")
  const progressTasks = mockTasks.filter((task) => task.status === "progress")
  const completeTasks = mockTasks.filter((task) => task.status === "complete")

  const filteredTasks = mockTasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredTasks.length / rowsPerPage)

  const startIndex = (currentPage - 1) * rowsPerPage
  const currentTasks = filteredTasks.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  return (
    <MainLayout>
      <VStack gap={6} align="stretch" className="bg-white rounded-md">
        {/* Header */}
        <Flex justify="space-between"
          align="center"
          borderBottom="1px"
          borderColor="gray.200"
          pb={4}   >
          <HStack gap={4}>
            <IconButton
              size="sm"
              bg="transparent"
              border="1px"
              borderColor="gray.800"
              _hover={{ bg: 'gray.300' }}
              borderRadius="full"
            >
              <FaArrowLeft className='text-gray-700' />
            </IconButton>

            <Heading size="2xl" fontWeight="semibold">
              Afdeling Kwaliteit
            </Heading>

          </HStack>

          <HStack gap={3}>
            <IconButton variant="ghost" bg="#F7F7F7" height="50px" size="2xl" aria-label="Settings">
              <FaToggleOff size="20" />
            </IconButton>
            <IconButton variant="ghost" bg="#F7F7F7" height="50px" size="2xl" aria-label="Filter">
              <LuListFilter size="20" />
            </IconButton>
            <IconButton variant="ghost" height="50px" bg="#F7F7F7" size="2xl" aria-label="Category">
              <FaCalendarWeek size="20" />
            </IconButton>

            <Button
              size="sm"
              bg="#41245F"
              height="50px"
              width="156px"
              borderRadius="10px"
              color="white"
            >
              <FaFileExport size="18" />
              Export xlsx
            </Button>
            <Button
              size="sm"
              bg="#75C5C1"
              height="50px"
              width="156px"
              borderRadius="10px"
              color="white"
            >
              <FaPlusCircle size="18" />
              Add Task
            </Button>
          </HStack>
        </Flex>

        {/* Search */}
        <Flex 
        justify="space-between"
        align="center"
        className="bg-[#E9F5F7] p-4"
        >
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Flex>

        {/* Tabs */}
        <Tabs.Root colorScheme="blue" defaultValue={"all"}>
          <Tabs.List bg="gray.50" p={1} borderRadius="lg" display="inline-flex">
            <Tabs.Trigger value={"all"} fontSize="sm" px={4}>
              <HStack gap={2}>
                <Text>All</Text>
                <Badge
                  bg="gray.200"
                  color="gray.600"
                  borderRadius="full"
                  px={2}
                  fontSize="xs"
                >
                  {mockTasks.length}
                </Badge>
              </HStack>
            </Tabs.Trigger>
            <Tabs.Trigger value={"todo"} fontSize="sm" px={4}>
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
            <Tabs.Trigger value={"progress"} fontSize="sm" px={4}>
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
            <Tabs.Trigger value={"complete"} fontSize="sm" px={4}>
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

          {/* Content */}
          <Tabs.Content value="all" px={0}>
            <Box
              bg={bg}
              borderRadius="lg"
              overflow="hidden"
              border="1px"
              borderColor="gray.200"
            >
              <TaskTable tasks={currentTasks} />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="todo" px={0}>
            <Box
              bg={bg}
              borderRadius="lg"
              overflow="hidden"
              border="1px"
              borderColor="gray.200"
            >
              <TaskTable tasks={todoTasks} />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="progress" px={0}>
            <Box
              bg={bg}
              borderRadius="lg"
              overflow="hidden"
              border="1px"
              borderColor="gray.200"
            >
              <TaskTable tasks={progressTasks} />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="complete" px={0}>
            <Box
              bg={bg}
              borderRadius="lg"
              overflow="hidden"
              border="1px"
              borderColor="gray.200"
            >
              <TaskTable tasks={completeTasks} />
            </Box>
          </Tabs.Content>
        </Tabs.Root>

        {/* Pagination */}
        <Flex justify="space-between" align="center" pt={4}>
          <HStack gap={2}>
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              «
            </Button>

            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={currentPage === idx + 1 ? "solid" : "ghost"}
                colorScheme={currentPage === idx + 1 ? "blue" : "gray"}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              »
            </Button>
          </HStack>

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
                setCurrentPage(1)
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

export default TaskManagement
