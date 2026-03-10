import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifySession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const auth = await verifySession(token);
  if (!auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.adminSettings.findFirst({
    where: { id: "main" },
  });
  return NextResponse.json({
    secretUrl: settings?.secretUrl || process.env.ADMIN_SECRET_URL,
  });
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const auth = await verifySession(token);
  if (!auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { secretUrl } = await request.json();
  if (!secretUrl || secretUrl.length < 8) {
    return NextResponse.json(
      { error: "URL должен быть минимум 8 символов" },
      { status: 400 },
    );
  }

  await prisma.adminSettings.upsert({
    where: { id: "main" },
    update: { secretUrl },
    create: { id: "main", secretUrl },
  });

  return NextResponse.json({ success: true });
}
