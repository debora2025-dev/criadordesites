import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getDefaultWorkspace } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const workspace = await getDefaultWorkspace(user.id);
  const lead = await prisma.lead.findFirst({
    where: { id: params.id, workspaceId: workspace.id },
  });
  if (!lead) {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }

  const updates = (await req.json()) as Partial<{
    name: string;
    email: string;
    phone: string;
    source: string;
    status: string;
    notes: string;
  }>;

  const updated = await prisma.lead.update({ where: { id: lead.id }, data: updates });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const workspace = await getDefaultWorkspace(user.id);
  const lead = await prisma.lead.findFirst({
    where: { id: params.id, workspaceId: workspace.id },
  });
  if (!lead) {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }

  await prisma.lead.delete({ where: { id: lead.id } });
  return NextResponse.json({ ok: true });
}
