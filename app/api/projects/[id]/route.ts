import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
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

    const { id } = await params;

    await prisma.project.delete({
      where: {
        id,
        userId: decoded.userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project Deleted Successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}