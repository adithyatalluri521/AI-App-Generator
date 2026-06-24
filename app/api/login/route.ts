import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { generateToken } from "@/app/lib/auth";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = generateToken(user.id);

    // Store token in HTTP-only cookie
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
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