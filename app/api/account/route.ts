import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { name } = (await req.json()) as { name?: string };

  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { name: name.trim() },
  });

  return NextResponse.json({ id: updated.id, name: updated.name, email: updated.email });
}
