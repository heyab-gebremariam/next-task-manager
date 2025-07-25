import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch a task by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "Error fetching task" }, { status: 500 });
  }
}

// PUT: Update a task
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  try {
    const { title, description, status } = await request.json();
    const task = await prisma.task.update({
      where: { id },
      data: { title, description, status },
    });
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}

// DELETE: Delete a task
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  try {
    await prisma.task.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Task deleted" });
  } catch {
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}
