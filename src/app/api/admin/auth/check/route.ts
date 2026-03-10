import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const payload = await verifySession(token);
  if (!payload) {
    const response = NextResponse.json(
      { authenticated: false },
      { status: 401 },
    );
    response.cookies.delete("admin_token");
    return response;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, role: true },
  });

  return NextResponse.json({ authenticated: true, user });
}
