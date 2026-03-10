// /Users/mayanksaini/Desktop/GitHub/sayzo_web/components/dashboard/TaskList.jsx

import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

export default function TaskList({ tasks = [] }) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
