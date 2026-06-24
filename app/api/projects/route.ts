import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

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

    const { title, description, framework } = await req.json();

    const project = await prisma.project.create({
      data: {
        title,
        description,
        framework,
        userId: decoded.userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project Created Successfully",
      project,
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