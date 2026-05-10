import type { Metadata } from "next";
import { TasksDashboard } from "@/components/dashboard/tasks/tasks-dashboard";

export const metadata: Metadata = {
  title: "Tasks & Reminder | SA'YA Umroh OS",
  description: "Task list with deadlines and priorities, plus scheduled reminders.",
};

export default function TasksPage() {
  return <TasksDashboard />;
}
