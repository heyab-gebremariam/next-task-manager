"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface TaskFormProps {
  task?: { id?: number; title: string; description?: string; status: string };
  onSubmit: () => void;
}

export default function TaskForm({ task, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  // Sync form state with task prop
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task?.id) {
        // Update existing task
        await axios.put(`/api/tasks/${task.id}`, {
          title,
          description,
          status,
        });
      } else {
        // Create new task
        await axios.post("/api/tasks", {
          title,
          description,
          status,
        });
      }
      onSubmit(); // Notify parent to refresh
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {task?.id ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
