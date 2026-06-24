import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
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

    const projects = await prisma.project.findMany({
      where: {
        userId: decoded.userId,
      },
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
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}