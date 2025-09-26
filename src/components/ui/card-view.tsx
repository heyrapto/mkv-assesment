"use client"

import React from "react"
import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  AvatarGroup,
  IconButton,
  SimpleGrid,
  Button,
} from "@chakra-ui/react"
import { FaEllipsisV, FaPlus, FaCalendar, FaUsers } from "react-icons/fa"

interface TaskCardViewProps {
  tasks: Array<{
    id: number
    name: string
    date: string
    assignee: Array<{
      name: string
      avatar: string
    }>
    priority: string
    status: string
  }>
  onTaskMove: any;
}

const TaskCardView: React.FC<TaskCardViewProps> = ({ tasks, onTaskMove }) => {
  const getColumnByStatus = (status: string) => {
    const statusTasks = tasks.filter(task => task.status === status)
    
    const getStatusConfig = (status: string) => {
      switch (status) {
        case "todo":
          return { 
            title: "To Do", 
            count: statusTasks.length,
            color: "#A78BFA",
            bgColor: "#F3F4F6"
          }
        case "progress":
          return { 
            title: "In Progress", 
            count: statusTasks.length,
            color: "#FBBF24",
            bgColor: "#FEF3C7"
          }
        case "complete":
          return { 
            title: "Complete", 
            count: statusTasks.length,
            color: "#10B981",
            bgColor: "#D1FAE5"
          }
        default:
          return { 
            title: "Unknown", 
            count: 0,
            color: "#6B7280",
            bgColor: "#F3F4F6"
          }
      }
    }

    const config = getStatusConfig(status)
    
    return (
      <Box key={status} bg={config.bgColor} borderRadius="lg" p={4} minH="500px">
        {/* Column Header */}
        <HStack justify="space-between" mb={4}>
          <HStack>
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg={config.color}
            />
            <Text fontWeight="600" color="#374151">
              {config.title}
            </Text>
            <Text
              fontSize="sm"
              color="#6B7280"
              bg="white"
              px={2}
              py={1}
              borderRadius="md"
              fontWeight="500"
            >
              ({config.count})
            </Text>
          </HStack>
          <IconButton
            size="sm"
            variant="ghost"
            color="#6B7280"
            _hover={{ bg: "white" }}
            borderRadius="md"
          >
            <FaPlus />
          </IconButton>
        </HStack>

        {/* Task Cards */}
        <VStack gap={3} align="stretch">
          {statusTasks.map((task) => (
            <Box
              key={task.id}
              bg="white"
              p={4}
              borderRadius="lg"
              border="1px solid #E5E7EB"
              _hover={{ 
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                transform: "translateY(-1px)"
              }}
              transition="all 0.2s"
              cursor="pointer"
            >
              {/* Task Header */}
              <HStack justify="space-between" mb={3}>
                <Text fontWeight="600" color="#111827" fontSize="sm">
                  {task.name}
                </Text>
                <IconButton
                  size="xs"
                  variant="ghost"
                  color="#6B7280"
                  _hover={{ bg: "#F3F4F6" }}
                >
                  <FaEllipsisV />
                </IconButton>
              </HStack>

              {/* Date */}
              <HStack mb={3} color="#6B7280">
                <FaCalendar size="12" />
                <Text fontSize="xs">
                  {task.date}
                </Text>
              </HStack>

              {/* Bottom Section */}
              <HStack justify="space-between" align="center">
                {/* Assignees */}
                <HStack>
                  <FaUsers size="12" color="#6B7280" />
                  <AvatarGroup size="xs">
                    {task.assignee.map((user, idx) => (
                      <Avatar.Root key={idx} size="xs">
                        <Avatar.Fallback 
                          bg="#E5E7EB" 
                          color="#374151" 
                          fontSize="xs"
                        >
                          {user.name ? user.name.slice(0, 2).toUpperCase() : "NA"}
                        </Avatar.Fallback>
                        {user.avatar && (
                          <Avatar.Image src={user.avatar} alt={user.name} />
                        )}
                      </Avatar.Root>
                    ))}
                  </AvatarGroup>
                  {task.assignee.length > 3 && (
                    <Text fontSize="xs" color="#6B7280">
                      +{task.assignee.length - 3}
                    </Text>
                  )}
                </HStack>

                {/* Priority */}
                <HStack>
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="2px"
                    bg={
                      task.priority === "Urgent" ? "#EF4444" :
                      task.priority === "Important" ? "#F59E0B" :
                      task.priority === "Medium" ? "#3B82F6" : "#6B7280"
                    }
                  />
                  <Text fontSize="xs" color="#6B7280" fontWeight="500">
                    {task.priority}
                  </Text>
                </HStack>
              </HStack>
            </Box>
          ))}

          {/* Add Task Button */}
          <Button
            variant="ghost"
            size="sm"
            color="#6B7280"
            _hover={{ bg: "white" }}
            justifyContent="flex-start"
            fontWeight="normal"
          >
            <FaPlus />
            Add Task
          </Button>
        </VStack>
      </Box>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
      {getColumnByStatus("todo")}
      {getColumnByStatus("progress")}
      {getColumnByStatus("complete")}
    </SimpleGrid>
  )
}

export default TaskCardView