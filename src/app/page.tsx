"use client";

import TaskForm from "@/components/TaskForm";
import axios from "axios";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    const response = await axios.get("/api/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm
        task={editingTask ?? undefined}
        onSubmit={() => {
          setEditingTask(null);
          fetchTasks();
        }}
      />
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <ul className="space-y-4 mt-4">
          {tasks.map((task) => (
            <li key={task.id} className="border p-4 rounded-md">
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => setEditingTask(task)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}