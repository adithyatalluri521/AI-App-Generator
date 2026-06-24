import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await prisma.aIProject.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.aIProject.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "AI Project deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}