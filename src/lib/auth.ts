import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";
const SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 часов

export interface TokenPayload {
  sessionId: string;
  userId: string;
  role: string;
}

// Создать сессию
export async function createSession(
  userId: string,
  ip: string,
  userAgent: string,
) {
  // Удаляем старые истёкшие сессии
  await prisma.session.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });

  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  const token = jwt.sign({ userId, role: "ADMIN" } as any, JWT_SECRET, {
    expiresIn: "12h",
  });

  const session = await prisma.session.create({
    data: {
      userId,
      token,
      ip,
      userAgent: userAgent || "Unknown",
      expiresAt,
    },
  });

  return { session, token };
}

// Проверить сессию
export async function verifySession(
  token: string,
): Promise<TokenPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const session = await prisma.session.findFirst({
      where: {
        token,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session) return null;

    return {
      sessionId: session.id,
      userId: session.userId,
      role: session.user.role,
    };
  } catch {
    return null;
  }
}

// Получить текущего пользователя из куки
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return null;

    const payload = await verifySession(token);
    if (!payload) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true },
    });

    return user;
  } catch {
    return null;
  }
}

// Удалить сессию
export async function destroySession(token: string) {
  try {
    await prisma.session.deleteMany({ where: { token } });
  } catch (error) {
    console.error("Error destroying session:", error);
  }
}

// Проверить IP
export async function isIPAllowed(ip: string): Promise<boolean> {
  // Если нет записей — разрешаем всем (первичная настройка)
  const count = await prisma.allowedIP.count();
  if (count === 0) return true;

  const found = await prisma.allowedIP.findFirst({
    where: {
      OR: [
        { ip },
        { ip: "0.0.0.0" }, // Разрешить всем
      ],
    },
  });

  return !!found;
}

// Получить секретный URL
export async function getSecretUrl(): Promise<string> {
  const settings = await prisma.adminSettings.findFirst({
    where: { id: "main" },
  });
  return (
    settings?.secretUrl ||
    process.env.ADMIN_SECRET_URL ||
    "gt-secure-panel-x7k9"
  );
}
