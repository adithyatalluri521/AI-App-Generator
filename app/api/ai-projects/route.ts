import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.aIProject.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch AI Projects",
      },
      { status: 500 }
    );
  }
}