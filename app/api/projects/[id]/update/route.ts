import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    // Get JWT token
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Verify JWT
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Token",
        },
        { status: 401 }
      );
    }

    // Get Project ID
    const { id } = await params;

    // Get Updated Data
    const { title, description, framework } =
      await request.json();

    // Check Project Ownership
    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        userId: decoded.userId,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    // Update Project
    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        framework,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project Updated Successfully",
      project: updatedProject,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}