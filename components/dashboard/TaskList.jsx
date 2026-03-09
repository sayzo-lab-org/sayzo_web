// /Users/mayanksaini/Desktop/GitHub/sayzo_web/components/dashboard/TaskList.jsx

import TaskCard from "./TaskCard";

export default function TaskList() {
  const tasks = [
    { 
      id: 1, 
      title: "Looking for a graphic designer", 
      category: "Design", 
      budget: 500, 
      applicants: 3 
    },
    { 
      id: 2, 
      title: "Need a website developer for landing page", 
      category: "Development", 
      budget: 12000, 
      applicants: 12 
    },
    { 
      id: 3, 
      title: "Create Instagram posters for cafe", 
      category: "Social Media", 
      budget: 1500, 
      applicants: 5 
    },
    { 
      id: 4, 
      title: "Help with moving furniture", 
      category: "Labor", 
      budget: 800, 
      applicants: 1 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
