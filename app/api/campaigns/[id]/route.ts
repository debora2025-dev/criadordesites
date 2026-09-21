import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getDefaultWorkspace } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const workspace = await getDefaultWorkspace(user.id);
  const campaign = await prisma.campaign.findFirst({
    where: { id: params.id, workspaceId: workspace.id },
  });
  if (!campaign) {
    return NextResponse.json({ error: "Campanha não encontrada." }, { status: 404 });
  }

  const updates = (await req.json()) as Partial<{
    name: string;
    platform: string;
    objective: string;
    status: string;
    budget: number;
  }>;

  const updated = await prisma.campaign.update({ where: { id: campaign.id }, data: updates });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const workspace = await getDefaultWorkspace(user.id);
  const campaign = await prisma.campaign.findFirst({
    where: { id: params.id, workspaceId: workspace.id },
  });
  if (!campaign) {
    return NextResponse.json({ error: "Campanha não encontrada." }, { status: 404 });
  }

  await prisma.campaign.delete({ where: { id: campaign.id } });
  return NextResponse.json({ ok: true });
}
