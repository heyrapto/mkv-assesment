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
    Button,
    Flex,
} from "@chakra-ui/react"
import { FaPlus, FaCalendar, FaUserCircle } from "react-icons/fa"
import { LuFlag } from "react-icons/lu"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Task } from "@/types/task"

interface TaskCardViewProps {
    tasks: Task[]
    onTaskMove: (taskId: number, newStatus: Task['status']) => void
    onOpenCreateModal?: (defaultStatus: Task['status']) => void
}

const TaskCardView: React.FC<TaskCardViewProps> = ({ tasks, onTaskMove, onOpenCreateModal }) => {

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const taskId = parseInt(draggableId.replace("task-", ""))

        const statusMap: Record<string, Task['status']> = {
            todo: "todo",
            progress: "progress",
            complete: "complete",
        }

        const newStatus = statusMap[destination.droppableId]
        if (newStatus && onTaskMove) {
            onTaskMove(taskId, newStatus)
        }

    }

    const getColumnByStatus = (status: "todo" | "progress" | "complete") => {
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

        const handleAddTask = () => {
            if (onOpenCreateModal) {
                onOpenCreateModal(status)
            }
        }

        return (
            <Box key={status} bg="#F7F7F7" borderRadius="lg" minH="500px" flex={1}>
                {/* Column Header */}
                <HStack justify="space-between" mb={4} p="4" borderRadius="lg" bg={config.bgColor}>
                    <HStack>
                        <Flex className="bg-white flex items-center gap-3" borderRadius="lg" padding="2">
                            <LuFlag
                                size={16}
                                color={config.color}
                            />
                            <Text fontWeight="600" color="#374151">
                                {config.title}
                            </Text>
                        </Flex>
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
                        bg="white"
                        _hover={{ bg: "#F3F4F6" }}
                        borderRadius="md"
                        onClick={handleAddTask}
                        title={`Add task to ${config.title}`}
                    >
                        <FaPlus />
                    </IconButton>
                </HStack>

                {/* Droppable Area */}
                <Droppable droppableId={status}>
                    {(provided, snapshot) => (
                        <VStack
                            gap={3}
                            align="stretch"
                            p="4"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            minH="400px"
                            bg={snapshot.isDraggingOver ? "rgba(117, 197, 193, 0.1)" : "transparent"}
                            borderRadius="lg"
                            transition="background-color 0.2s"
                        >
                            {statusTasks.map((task, index) => (
                                <Draggable
                                    key={task.id}
                                    draggableId={`task-${task.id}`}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            bg="white"
                                            p={4}
                                            borderRadius="lg"
                                            border="1px solid #E5E7EB"
                                            boxShadow={snapshot.isDragging ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" : "none"}
                                            transform={snapshot.isDragging ? "rotate(5deg)" : "none"}
                                            _hover={!snapshot.isDragging ? {
                                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                                transform: "translateY(-1px)"
                                            } : {}}
                                            transition="all 0.2s"
                                            cursor={snapshot.isDragging ? "grabbing" : "grab"}
                                            opacity={snapshot.isDragging ? 0.8 : 1}
                                        >
                                            {/* Task Header */}
                                            <HStack justify="space-between" mb={3}>
                                                <Text fontWeight="600" color="#111827" fontSize="sm">
                                                    {task.name}
                                                </Text>
                                            </HStack>

                                            {/* Date */}
                                            <HStack mb={3} color="#6B7280">
                                                <FaCalendar size="12" />
                                                <Text fontSize="xs">
                                                    {task.date}
                                                </Text>
                                            </HStack>

                                            {/* Bottom Section */}
                                            <Flex className="flex flex-col gap-6">
                                                <HStack>
                                                    <FaUserCircle size="12" color="#6B7280" />
                                                    <AvatarGroup size="xs">
                                                        {task.assignee.map((user, idx) => (
                                                            <Avatar.Root key={idx} size="sm">
                                                                <Avatar.Fallback
                                                                    bg="#E5E7EB"
                                                                    color="#374151"
                                                                    fontSize="xs"
                                                                >
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

                                                {/* Priority */}
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
                                            </Flex>
                                        </Box>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}

                            {/* Add Task Button */}
                            <Button
                                variant="ghost"
                                className="flex gap-2 items-center"
                                color="#6B7280"
                                bg="white"
                                padding="16px"
                                justifyContent="flex-start"
                                fontWeight="normal"
                                borderRadius="lg"
                                border="1px dashed #E5E7EB"
                                _hover={{
                                    bg: "#F9FAFB",
                                    borderColor: "#D1D5DB",
                                    color: "#374151"
                                }}
                                onClick={handleAddTask}
                                transition="all 0.2s"
                            >
                                <FaPlus size="14" />
                                <Text fontSize="sm" fontWeight="500">Add Task</Text>
                            </Button>
                        </VStack>
                    )}
                </Droppable>
            </Box>
        )
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Flex gap={6} direction={{ base: "column", md: "row" }}>
                {(["todo", "progress", "complete"] as const).map(status =>
                    getColumnByStatus(status)
                )}
            </Flex>
        </DragDropContext>
    )
}

export default TaskCardView