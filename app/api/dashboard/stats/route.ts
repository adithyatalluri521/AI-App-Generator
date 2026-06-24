import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    // Total users
    const totalUsers = await prisma.user.count();

    // Manual projects
    const totalProjects = await prisma.project.count();

    // AI projects
    const aiProjects = await prisma.aIProject.count();

    // Today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Manual projects created today
    const todayManualProjects = await prisma.project.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    // AI projects created today
    const todayAIProjects = await prisma.aIProject.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalProjects,
        aiProjects,
        todayProjects: todayManualProjects + todayAIProjects,
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard statistics",
      },
      { status: 500 }
    );
  }
}