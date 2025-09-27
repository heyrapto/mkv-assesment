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
  FaArrowDown,
  FaArrowLeft,
  FaCalendarWeek,
  FaCapsules,
  FaCheckCircle,
  FaChevronDown,
  FaEllipsisH,
  FaEllipsisV,
  FaFileExport,
  FaPlusCircle,
  FaToggleOff,
} from "react-icons/fa"
import { LuColumns2, LuFlag, LuListFilter, LuRows2 } from "react-icons/lu"
import MainLayout from "./layout"
import TaskCardView from "@/components/ui/card-view"
import { handleExportExcel } from "@/utils/export-task"
import SearchInput from "@/components/ui/search-input"
import { FilterModal } from "@/components/modals/filter-modal"
import { DatePickerModal } from "@/components/modals/date-picker"
import { mockTasks } from "@/constants"
import { Task } from "@/types/task"

const TaskTable = ({ tasks }: Task[]) => {
  const { colorMode } = useColorMode()
  const borderColor = colorMode === "light" ? "#E5E7EB" : "#4A5568"

  return (
    <Box overflowX="auto" bg="white" borderRadius="lg" border="1px solid #E5E7EB">
      {/* Table Header */}
      <Box
        display="grid"
        gridTemplateColumns="2fr 1.5fr 1fr 1fr auto"
        gap={4}
        px={6}
        py={4}
        bg="#F9FAFB"
        borderBottom="1px solid"
        borderColor={borderColor}
        fontWeight="600"
        fontSize="sm"
        color="#6B7280"
        borderTopRadius="lg"
      >
        <Text>Name</Text>
        <Text>Date</Text>
        <Text>Assignee</Text>
        <Text>Priority</Text>
        <Box />
      </Box>

      {/* Table Rows */}
      {tasks.map((task: Task, index: number) => (
        <Box
          key={task.id}
          display="grid"
          gridTemplateColumns="2fr 1.5fr 1fr 1fr auto"
          gap={4}
          px={6}
          py={4}
          borderBottom={index !== tasks.length - 1 ? "1px solid" : "none"}
          borderColor={borderColor}
          _hover={{ bg: "#F9FAFB" }}
          transition="background-color 0.2s"
        >
          <Text fontWeight="500" color="#111827" fontSize="sm">
            {task.name}
          </Text>
          <Text fontSize="sm" color="#6B7280">
            {task.date}
          </Text>

          <HStack>
            <AvatarGroup size="sm">
              {task.assignee.map((user: any, idx: number) => (
                <Avatar.Root key={idx} size="sm">
                  <Avatar.Fallback bg="#E5E7EB" color="#374151" fontSize="xs">
                    {user.name ? user.name.slice(0, 2).toUpperCase() : "NA"}
                  </Avatar.Fallback>
                  {user.avatar && <Avatar.Image src={user.avatar} alt={user.name} />}
                </Avatar.Root>
              ))}
            </AvatarGroup>
            {task.assignee.length > 2 && (
              <Text fontSize="xs" color="#6B7280">
                +{task.assignee.length - 2}
              </Text>
            )}
          </HStack>

          <HStack>
            <LuFlag
              size={16}
              className={`${task.priority === "Urgent" ? "text-red-500" :
                task.priority === "Important" ? "text-yellow-500" :
                  task.priority === "Medium" ? "text-blue-500" : "text-gray-500"} `}
            />
            <Text fontSize="sm" color="#374151" fontWeight="500">
              {task.priority}
            </Text>
          </HStack>

          <IconButton
            aria-label="More options"
            size="sm"
            variant="ghost"
            color="#6B7280"
            _hover={{ bg: "#F3F4F6" }}
          >
            <FaEllipsisH />
          </IconButton>
        </Box>
      ))}
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
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    priority: [] as string[],
    status: [] as string[],
    assignee: [] as string[]
  })
  const [dateRange, setDateRange] = useState({
    start: "",
    end: ""
  })
  const { colorMode } = useColorMode()
  const bg = colorMode === "light" ? "white" : "gray.800"

  const handleTaskMove = (taskId: number, newStatus: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  const handleBackClick = () => {
    window.history.back()
  }

  const applyFilters = (activeFilters: any) => {
    console.log("Applied filters:", activeFilters)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filters.priority.length === 0 || filters.priority.includes(task.priority)
    const matchesStatus = filters.status.length === 0 || filters.status.includes(task.status)

    let matchesDateRange = true
    if (dateRange.start && dateRange.end) {
      const taskStartDate = new Date(task.date.split(' - ')[0].split('/').reverse().join('-'))
      const taskEndDate = new Date(task.date.split(' - ')[1].split('/').reverse().join('-'))
      const filterStartDate = new Date(dateRange.start)
      const filterEndDate = new Date(dateRange.end)

      matchesDateRange = taskStartDate >= filterStartDate && taskEndDate <= filterEndDate
    }

    return matchesSearch && matchesPriority && matchesStatus && matchesDateRange
  })

  const taskGroups: Record<string, any[]> = {
    all: filteredTasks,
    todo: filteredTasks.filter((t) => t.status === "todo"),
    progress: filteredTasks.filter((t) => t.status === "progress"),
    complete: filteredTasks.filter((t) => t.status === "complete"),
  }

  const tabItems = [
    { value: "todo", label: "To Do", icon: <LuListFilter />, color: "#A78BFA" },
    { value: "progress", label: "In Progress", icon: <FaCapsules />, color: "#FBBF24" },
    { value: "complete", label: "Complete", icon: <FaCheckCircle />, color: "#10B981" },
  ]

  const headerActions: Array<
  | { type: "icon"; icon: React.ReactNode; aria: string; onClick: () => void }
  | { type: "button"; label: string; icon: React.ReactNode; bg: string; onClick: () => void }
> = [
  {
    type: "icon",
    icon: <FaToggleOff size={20} />,
    aria: "Settings",
    onClick: () => console.log("Settings clicked")
  },
  {
    type: "icon",
    icon: <LuListFilter size={20} />,
    aria: "Filter",
    onClick: () => setIsFilterModalOpen(true)
  },
  {
    type: "icon",
    icon: <FaCalendarWeek size={20} />,
    aria: "Category",
    onClick: () => setIsDateModalOpen(true)
  },
  {
    type: "button",
    label: "Export xlsx",
    icon: <FaFileExport size={18} />,
    bg: "#41245F",
    onClick: () => handleExportExcel(filteredTasks)
  },
  {
    type: "button",
    label: "Add Task",
    icon: <FaPlusCircle size={18} />,
    bg: "#75C5C1",
    onClick: () => console.log("Add task clicked")
  },
];

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
              onClick={handleBackClick}
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
                  onClick={action.onClick}
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
                  onClick={action.onClick}
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
        <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search tasks..."
            maxW="500px"
          />
          <HStack className="flex gap-2 bg-white h-[40px]" padding="10px" borderRadius="lg">
            <IconButton
              backgroundColor={viewMode === "table" ? "#75C5C1" : "gray.100"}
              color={viewMode === "table" ? "white" : "gray.900"}
              height="28px"
              onClick={() => setViewMode("table")}
              borderRadius="md"
            >
              <LuRows2 />
            </IconButton>
            <IconButton
              backgroundColor={viewMode === "card" ? "#75C5C1" : "gray.100"}
              color={viewMode === "card" ? "white" : "gray.900"}
              height="28px"
              onClick={() => setViewMode("card")}
              borderRadius="md"
            >
              <LuColumns2 />
            </IconButton>
          </HStack>
        </Flex>

        {/* Active Filters Display */}
        {(filters.priority.length > 0 || filters.status.length > 0 || dateRange.start) && (
          <HStack gap={2} flexWrap="wrap">
            <Text fontSize="sm" color="gray.600">Active Filters:</Text>
            {filters.priority.map(priority => (
              <Badge key={priority} bg="#75C5C1" color="white" borderRadius="md">
                {priority}
              </Badge>
            ))}
            {filters.status.map(status => (
              <Badge key={status} bg="#41245F" color="white" borderRadius="md">
                {status}
              </Badge>
            ))}
            {dateRange.start && (
              <Badge bg="#FBBF24" color="white" borderRadius="md">
                {dateRange.start} to {dateRange.end}
              </Badge>
            )}
            <Button
              size="xs"
              variant="ghost"
              onClick={() => {
                setFilters({ priority: [], status: [], assignee: [] })
                setDateRange({ start: "", end: "" })
              }}
            >
              Clear All
            </Button>
          </HStack>
        )}

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
              {viewMode === "table" ? (
                <TaskTable tasks={taskGroups[tab.value]} />
              ) : (
                <TaskCardView tasks={taskGroups[tab.value]} onTaskMove={handleTaskMove} />
              )}
            </Tabs.Content>
          ))}
        </Tabs.Root>

        {/* Pagination */}
        <Flex justify="space-between" align="center" pt={4}>
          <HStack gap={2} backgroundColor="#F7F7F7" borderRadius="50px" padding="10px">
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              {"<"}
            </Button>
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
                borderRadius="50%"
                backgroundColor="#75C5C1"
                variant={currentPage === idx + 1 ? "solid" : "ghost"}
                colorScheme={currentPage === idx + 1 ? "blue" : "#75C5C1"}
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
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              {">"}
            </Button>
          </HStack>

          <HStack gap={2} className="" whiteSpace="nowrap">
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
                <Select.Trigger borderRadius="50px"  className="flex items-center justify-between px-3 py-1 h-8 cursor-pointer">
                  <Select.ValueText className="flex-1 text-center" />
                  <FaChevronDown className="flex-1 text-center"  />
                </Select.Trigger>

              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content paddingY="2px" className="gap-3 flex flex-col items-center justify-center py-2">
                    {rowsPerPageOptions.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Flex align="center" justify="center" w="full">
                          {item.label}
                          <Select.ItemIndicator />
                        </Flex>
                      </Select.Item>

                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </HStack>

        </Flex>
      </VStack>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={applyFilters}
      />

      {/* Date Picker Modal */}
      <DatePickerModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </MainLayout>
  )
}

export default TaskManagement