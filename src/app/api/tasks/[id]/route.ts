import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch a task by ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(context.params.id) },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "Error fetching task" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// PUT: Update a task
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { title, description, status } = await request.json();
    const task = await prisma.task.update({
      where: { id: parseInt(context.params.id) },
      data: { title, description, status },
    });
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE: Delete a task
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await prisma.task.delete({
      where: { id: parseInt(context.params.id) },
    });
    return NextResponse.json({ message: "Task deleted" });
  } catch {
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}