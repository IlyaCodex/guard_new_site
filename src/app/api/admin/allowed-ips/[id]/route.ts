import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifySession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const auth = await verifySession(token);
  if (!auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.allowedIP.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
