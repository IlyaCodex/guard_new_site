import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { verifySession } from "@/lib/auth";
import AdminDashboard from "@/components/Admin/AdminDashboard";

const prisma = new PrismaClient();

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let secretUrl = process.env.ADMIN_SECRET_URL || "gt-secure-panel-x7k9";

  try {
    const settings = await prisma.adminSettings.findFirst({
      where: { id: "main" },
    });
    if (settings?.secretUrl) {
      secretUrl = settings.secretUrl;
    }
  } catch (error) {
    console.error("DB error:", error);
  }

  if (token !== secretUrl) {
    redirect("/404");
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_token")?.value;

  if (!sessionToken) {
    redirect(`/secure/${secretUrl}`);
  }

  const payload = await verifySession(sessionToken);
  if (!payload) {
    redirect(`/secure/${secretUrl}`);
  }

  return <AdminDashboard secretToken={token} />;
}
