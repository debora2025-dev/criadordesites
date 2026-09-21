import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, verifyPassword, hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { currentPassword, newPassword } = (await req.json()) as {
    currentPassword?: string;
    newPassword?: string;
  };

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Senha atual e nova senha são obrigatórias." },
      { status: 400 },
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "A nova senha deve ter pelo menos 8 caracteres." },
      { status: 400 },
    );
  }

  if (!user.password || !verifyPassword(currentPassword, user.password)) {
    return NextResponse.json({ error: "Senha atual incorreta." }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashPassword(newPassword) },
  });

  return NextResponse.json({ ok: true });
}
