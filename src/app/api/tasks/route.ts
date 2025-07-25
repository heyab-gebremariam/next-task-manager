import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 });
  }
}

// POST: Create a task
export async function POST(request: Request) {
  try {
    const { title, description, status } = await request.json();
    const task = await prisma.task.create({
      data: { title, description, status },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}