import { Task } from "@/types/task"

export const handleExportExcel = (filteredTasks: Task[]) => {
    const headers = ["Name", "Date", "Priority", "Status", "Assignees"]
    const csvContent = [
      headers.join(","),
      ...filteredTasks.map(task => [
        `"${task.name}"`,
        `"${task.date}"`,
        `"${task.priority}"`,
        `"${task.status}"`,
        `"${task.assignee.map(a => a.name).join("; ")}"`
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `tasks-export-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}