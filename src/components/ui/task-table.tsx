"use client"

import { HStack, Box, Text, AvatarGroup, Avatar, IconButton } from "@chakra-ui/react"
import { FaEllipsisH } from "react-icons/fa"
import { LuFlag } from "react-icons/lu"
import { useColorMode } from "./color-mode"
import { Task } from "@/types/task"

  
interface TaskTableProps {
    tasks: Task[]
    isDenseView: boolean
 }
  
export const TaskTable = ({ tasks, isDenseView }: TaskTableProps) => {
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
          bg="#F9FAFB"
          borderBottom="1px solid"
          borderColor={borderColor}
          fontWeight="600"
          fontSize="sm"
          color="#6B7280"
          borderTopRadius="lg"
          position="relative"
        >
          <Text position="relative" borderRightWidth="1px" py="15px" borderRightColor={borderColor}>Name</Text>
          <Box position="relative" className="flex items-center" borderRightWidth="1px" py="15px" borderRightColor={borderColor}>
            <Text>Date</Text>
            <Box
              bg={borderColor}
            />
          </Box>
          <Box position="relative" borderRightWidth="1px" py="15px" borderRightColor={borderColor}>
            <Text>Assignee</Text>
            <Box
              bg={borderColor}
            />
          </Box>
          <Box position="relative" className="flex items-center">
            <Text>Priority</Text>
            <Box
              bg={borderColor}
            />
          </Box>
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
            py={isDenseView ? 2 : 4}
            borderBottom={index !== tasks.length - 1 ? "1px solid" : "none"}
            borderColor={borderColor}
            _hover={{ bg: "#F9FAFB" }}
            transition="background-color 0.2s"
          >
            <Text 
              fontWeight="500" 
              color="#111827" 
              fontSize={isDenseView ? "xs" : "sm"}
              lineHeight={isDenseView ? "tight" : "normal"}
            >
              {task.name}
            </Text>
            <Text 
              fontSize={isDenseView ? "xs" : "sm"} 
              color="#6B7280"
              lineHeight={isDenseView ? "tight" : "normal"}
            >
              {task.date}
            </Text>
  
            <HStack gap={isDenseView ? 1 : 2}>
              <AvatarGroup size={isDenseView ? "sm" : "sm"}>
                {task.assignee.map((user, idx: number) => (
                  <Avatar.Root key={idx} size={isDenseView ? "sm" : "sm"}>
                    <Avatar.Fallback bg="#E5E7EB" color="#374151" fontSize={isDenseView ? "2xs" : "xs"}>
                      {user.name ? user.name.slice(0, 2).toUpperCase() : "NA"}
                    </Avatar.Fallback>
                    <Avatar.Image src={user.avatar} alt={user.name} />
                  </Avatar.Root>
                ))}
              </AvatarGroup>
              {task.assignee.length > 2 && (
                <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="22px"
                h="22px"
                backgroundColor="purple.300"
                color="white"
                borderRadius="full"
                fontSize="2xs"
                fontWeight="600"
                border="2px solid white"
                ml={-3}
            >
                +{task.assignee.length - 2}
            </Box>
              )}
            </HStack>
  
            <HStack gap={isDenseView ? 1 : 2}>
              <LuFlag
                size={isDenseView ? 12 : 16}
                className={`${task.priority === "Urgent" ? "text-red-500" :
                  task.priority === "Important" ? "text-yellow-500" :
                    task.priority === "Medium" ? "text-blue-500" : "text-gray-500"} `}
              />
              <Text 
                fontSize={isDenseView ? "xs" : "sm"} 
                color="#374151" 
                fontWeight="500"
                lineHeight={isDenseView ? "tight" : "normal"}
              >
                {task.priority}
              </Text>
            </HStack>
  
            <IconButton
              aria-label="More options"
              size={isDenseView ? "xs" : "sm"}
              variant="ghost"
              color="#6B7280"
              _hover={{ bg: "#F3F4F6" }}
            >
              <FaEllipsisH size={isDenseView ? 10 : 14} />
            </IconButton>
          </Box>
        ))}
      </Box>
    )
  }