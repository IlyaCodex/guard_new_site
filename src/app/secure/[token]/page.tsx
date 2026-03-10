import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import AdminLoginPage from "@/components/Admin/AdminLoginPage";

const prisma = new PrismaClient();

export default async function SecureAdminPage({
  params,
}: {
  params: { token: string };
}) {
  // Проверяем совпадение секретного URL
  const settings = await prisma.adminSettings.findFirst({
    where: { id: "main" },
  });
  const secretUrl =
    settings?.secretUrl ||
    process.env.ADMIN_SECRET_URL ||
    "gt-secure-panel-x7k9";

  if (params.token !== secretUrl) {
    redirect("/404");
  }

  return <AdminLoginPage secretToken={params.token} />;
}
