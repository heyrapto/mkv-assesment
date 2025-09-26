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
  Progress,
} from "@chakra-ui/react"

import { useColorMode } from "@/components/ui/color-mode"
import {
  SearchNormal1,
  RowHorizontal,
  RowVertical,
} from "iconsax-react"
import {
  FaArrowLeft,
  FaCalendarWeek,
  FaCapsules,
  FaCheckCircle,
  FaEllipsisV,
  FaFileExport,
  FaPlusCircle,
  FaToggleOff,
} from "react-icons/fa"
import { LuColumns2, LuListFilter, LuRows2 } from "react-icons/lu"
import MainLayout from "./layout"

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
        {["Name", "Date", "Assignee", "Priority"].map((col, i) => (
          <Text key={i} fontSize="sm" color="gray.600">
            {col}
          </Text>
        ))}
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

          <IconButton aria-label="More options" size="sm" variant="ghost">
            <FaEllipsisV />
          </IconButton>
        </Box>
      ))}
    </Box>
  )
}

const SearchInput = ({ searchTerm, setSearchTerm }: any) => (
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

  const filteredTasks = mockTasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const taskGroups: Record<string, any[]> = {
    all: filteredTasks,
    todo: filteredTasks.filter((t) => t.status === "todo"),
    progress: filteredTasks.filter((t) => t.status === "progress"),
    complete: filteredTasks.filter((t) => t.status === "complete"),
  }

  const tabItems = [
    { value: "todo", label: "To Do", icon: <LuListFilter />, color: "#A78BFA" },
    { value: "progress", label: "In Progress", icon: <FaCapsules />, color: "#FBBF24" },
    { value: "complete", label: "Complete", icon: <FaCheckCircle />, color: "#2DD4BF" },
  ]

  const headerActions = [
    { type: "icon", icon: <FaToggleOff size="20" />, aria: "Settings" },
    { type: "icon", icon: <LuListFilter size="20" />, aria: "Filter" },
    { type: "icon", icon: <FaCalendarWeek size="20" />, aria: "Category" },
    {
      type: "button",
      label: "Export xlsx",
      icon: <FaFileExport size="18" />,
      bg: "#41245F",
    },
    {
      type: "button",
      label: "Add Task",
      icon: <FaPlusCircle size="18" />,
      bg: "#75C5C1",
    },
  ]

  const totalPages = Math.ceil(filteredTasks.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const currentTasks = filteredTasks.slice(startIndex, startIndex + rowsPerPage)

  return (
    <MainLayout>
      <VStack gap={6} align="stretch" className="bg-white rounded-md" padding="30px">
        {/* Header */}
        <Flex justify="space-between" align="center" borderBottom="1px" borderColor="gray.200" pb={4}>
          <HStack gap={4}>
            <IconButton
              size="sm"
              bg="transparent"
              border="1px"
              borderColor="gray.800"
              _hover={{ bg: "gray.300" }}
              borderRadius="full"
            >
              <FaArrowLeft className="text-gray-700" />
            </IconButton>
            <Heading size="2xl" fontWeight="semibold">
              Afdeling Kwaliteit
            </Heading>
          </HStack>

          <HStack gap={3}>
            {headerActions.map((action, idx) =>
              action.type === "icon" ? (
                <IconButton
                  key={idx}
                  variant="ghost"
                  bg="#F7F7F7"
                  height="50px"
                  size="2xl"
                  aria-label={action.aria}
                >
                  {action.icon}
                </IconButton>
              ) : (
                <Button
                  key={idx}
                  size="sm"
                  bg={action.bg}
                  height="50px"
                  width="156px"
                  borderRadius="10px"
                  color="white"
                >
                  {action.icon}
                  {action.label}
                </Button>
              )
            )}
          </HStack>
        </Flex>

        {/* Search */}
        <Flex justify="space-between" align="center" className="bg-[#E9F5F7] rounded-md" padding="10px">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <HStack className="flex gap-2 bg-white h-[40px]" padding="10px">
            <IconButton backgroundColor="gray.100" color="gray.900" height="28px">
              <LuRows2 />
            </IconButton>
            <IconButton backgroundColor="#75C5C1" color="white" height="28px">
              <LuColumns2 />
            </IconButton>
          </HStack>
        </Flex>

        {/* Tabs */}
        <Tabs.Root
          defaultValue="todo"
          variant="plain"
        >
          <HStack bg="gray.50" p="10px" borderRadius="lg" marginBottom="10px" className="w-full gap-4" display="inline-flex">
            {tabItems.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium transition-all min-w-[176px]"
                paddingX="8px"
                paddingY="2px"
                backgroundColor="#fff"
                _selected={{
                  bg: tab.color,
                  color: "white",
                  borderColor: tab.color,
                  fontWeight: "semibold",
                }}
              >
                {/* Left side: icon + label */}
                <HStack gap={2}>
                  <Box
                    as="span"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="20px"
                    h="20px"
                    borderRadius="full"
                    bg="white"
                    color={tab.color}
                    fontSize="12px"
                  >
                    {tab.icon}
                  </Box>
                  <Text>{tab.label}</Text>
                </HStack>

                {/* Right side: count in ( ) */}
                <Badge
                  bg="gray.100"
                  color="black"
                  borderRadius="md"
                  px={2}
                  fontSize="xs"
                  fontWeight="semibold"
                >
                  ({taskGroups[tab.value].length})
                </Badge>
              </Tabs.Trigger>
            ))}
          </HStack>

          {/* Tab Content */}
          {tabItems.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value}>
              <TaskTable tasks={taskGroups[tab.value]} />
            </Tabs.Content>
          ))}
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
