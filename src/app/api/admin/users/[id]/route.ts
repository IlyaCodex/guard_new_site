import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifySession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const token = request.cookies.get("admin_token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const auth = await verifySession(token);
  if (!auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Нельзя удалить себя
  if (auth.userId === id) {
    return NextResponse.json(
      { error: "Нельзя удалить свой аккаунт" },
      { status: 400 },
    );
  }

  await prisma.session.deleteMany({ where: { userId: id } });
  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
