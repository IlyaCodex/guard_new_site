import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifySession } from "@/lib/auth";

const prisma = new PrismaClient();

async function checkAuth(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return null;
  return verifySession(token);
}

// Список IP
export async function GET(request: NextRequest) {
  const auth = await checkAuth(request);
  if (!auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ips = await prisma.allowedIP.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(ips);
}

// Добавить IP
export async function POST(request: NextRequest) {
  const auth = await checkAuth(request);
  if (!auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ip, label } = await request.json();

  if (!ip) {
    return NextResponse.json({ error: "IP обязателен" }, { status: 400 });
  }

  const exists = await prisma.allowedIP.findUnique({ where: { ip } });
  if (exists) {
    return NextResponse.json(
      { error: "Такой IP уже добавлен" },
      { status: 400 },
    );
  }

  const record = await prisma.allowedIP.create({
    data: { ip, label: label || null },
  });

  return NextResponse.json(record);
}
