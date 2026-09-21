"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { BriefingInput, MarketingTool } from "@/types/marketing";
import { OutputEditor } from "@/components/OutputEditor";

const emptyForm: BriefingInput = {
  produto: "",
  publicoAlvo: "",
  nicho: "",
  localizacao: "",
  objetivo: "",
  oferta: "",
  diferenciais: "",
  tomDeVoz: "",
  detalhesExtras: "",
};

export function GeneratorForm({
  tool,
  defaults,
}: {
  tool: MarketingTool;
  defaults?: Partial<BriefingInput>;
}) {
  const [form, setForm] = useState<BriefingInput>({ ...emptyForm, ...defaults });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field: keyof BriefingInput) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId: tool.id, ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao gerar conteúdo.");
      } else {
        setResult(data.result);
      }
    } catch {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  const hasDefaults = defaults && Object.values(defaults).some((value) => value);

  return (
    <div>
      {hasDefaults && (
        <p className="form-hint">
          Alguns campos já vieram preenchidos com o perfil do seu negócio. Você pode ajustá-los
          a qualquer momento em{" "}
          <Link href="/dashboard/settings">Configurações</Link>.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Produto ou serviço
          <input value={form.produto} onChange={updateField("produto")} required />
        </label>
        <label>
          Público-alvo
          <input value={form.publicoAlvo} onChange={updateField("publicoAlvo")} required />
        </label>
        <label>
          Nicho
          <input value={form.nicho} onChange={updateField("nicho")} />
        </label>
        <label>
          Localização
          <input value={form.localizacao} onChange={updateField("localizacao")} />
        </label>
        <label>
          Objetivo da campanha
          <input value={form.objetivo} onChange={updateField("objetivo")} required />
        </label>
        <label>
          Oferta
          <input value={form.oferta} onChange={updateField("oferta")} />
        </label>
        <label>
          Diferenciais
          <input value={form.diferenciais} onChange={updateField("diferenciais")} />
        </label>
        <label>
          Tom de voz
          <input value={form.tomDeVoz} onChange={updateField("tomDeVoz")} />
        </label>
        <label>
          Detalhes extras
          <textarea value={form.detalhesExtras} onChange={updateField("detalhesExtras")} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Gerando..." : "Gerar conteúdo"}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}
      {result && <OutputEditor value={result} />}
    </div>
  );
}
