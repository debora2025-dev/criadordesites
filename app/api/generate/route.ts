import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { generateMarketingContent } from "@/lib/openai";
import { buildUserPrompt } from "@/lib/prompts";
import { marketingTools, type BriefingInput } from "@/types/marketing";

export async function POST(req: NextRequest) {
  const user = await requireUser().catch(() => null);
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const body = (await req.json()) as { toolId: string } & BriefingInput;
  const { toolId, ...briefing } = body;

  const tool = marketingTools.find((t) => t.id === toolId);
  if (!tool) {
    return NextResponse.json({ error: "Ferramenta não encontrada." }, { status: 400 });
  }

  const prompt = buildUserPrompt(tool, briefing);
  const output = await generateMarketingContent(prompt);

  const generation = await prisma.generation.create({
    data: { userId: user.id, tool: tool.id, prompt, output },
  });

  return NextResponse.json({ id: generation.id, result: output });
}
