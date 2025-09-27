export interface Task {
    id: number
    name: string
    date: string 
    priority: "Urgent" | "Important" | "Medium" | "Low"
    status: "todo" | "progress" | "complete"
    assignee: { name: string; avatar: string }[]
}

export interface Filters {
    priority: string[]
    status: string[]
    assignee: string[]
}