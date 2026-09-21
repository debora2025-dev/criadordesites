import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSession, getDefaultWorkspace } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { name, email, password } = (await req.json()) as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json({ error: "E-mail e senha são obrigatórios." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Já existe uma conta com esse e-mail." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: { name, email, password: hashPassword(password) },
  });

  await getDefaultWorkspace(user.id);
  await createSession(user.id);

  return NextResponse.json({ id: user.id, name: user.name, email: user.email });
}
