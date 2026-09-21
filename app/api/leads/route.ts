import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getDefaultWorkspace } from "@/lib/auth";

export async function GET() {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const workspace = await getDefaultWorkspace(user.id);
  const leads = await prisma.lead.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { name, email, phone, source, status, notes } = (await req.json()) as {
    name?: string;
    email?: string;
    phone?: string;
    source?: string;
    status?: string;
    notes?: string;
  };

  if (!name || !status) {
    return NextResponse.json({ error: "Nome e status são obrigatórios." }, { status: 400 });
  }

  const workspace = await getDefaultWorkspace(user.id);
  const lead = await prisma.lead.create({
    data: { name, email, phone, source, status, notes, workspaceId: workspace.id },
  });

  return NextResponse.json(lead, { status: 201 });
}
