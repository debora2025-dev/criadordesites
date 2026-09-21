import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getDefaultWorkspace } from "@/lib/auth";

export async function GET() {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const workspace = await getDefaultWorkspace(user.id);
  const campaigns = await prisma.campaign.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { name, platform, objective, status, budget } = (await req.json()) as {
    name?: string;
    platform?: string;
    objective?: string;
    status?: string;
    budget?: number;
  };

  if (!name || !platform || !objective || !status) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
  }

  const workspace = await getDefaultWorkspace(user.id);
  const campaign = await prisma.campaign.create({
    data: { name, platform, objective, status, budget, workspaceId: workspace.id },
  });

  return NextResponse.json(campaign, { status: 201 });
}
