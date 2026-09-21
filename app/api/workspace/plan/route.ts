import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getDefaultWorkspace } from "@/lib/auth";

const VALID_PLANS = ["free", "pro"];

export async function PATCH(req: NextRequest) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { plan } = (await req.json()) as { plan?: string };

  if (!plan || !VALID_PLANS.includes(plan)) {
    return NextResponse.json({ error: "Plano inválido." }, { status: 400 });
  }

  const workspace = await getDefaultWorkspace(user.id);
  const updated = await prisma.workspace.update({
    where: { id: workspace.id },
    data: { plan },
  });

  return NextResponse.json(updated);
}
