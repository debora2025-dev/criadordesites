import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getDefaultWorkspace } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { businessName, niche, defaultAudience, defaultTone, defaultDifferentiators } =
    (await req.json()) as {
      businessName?: string;
      niche?: string;
      defaultAudience?: string;
      defaultTone?: string;
      defaultDifferentiators?: string;
    };

  const workspace = await getDefaultWorkspace(user.id);

  const updated = await prisma.workspace.update({
    where: { id: workspace.id },
    data: { businessName, niche, defaultAudience, defaultTone, defaultDifferentiators },
  });

  return NextResponse.json(updated);
}
