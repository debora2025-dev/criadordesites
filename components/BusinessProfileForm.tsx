"use client";

import { useState, type FormEvent } from "react";

export interface BusinessProfile {
  businessName: string;
  niche: string;
  defaultAudience: string;
  defaultTone: string;
  defaultDifferentiators: string;
}

export function BusinessProfileForm({ profile }: { profile: BusinessProfile }) {
  const [form, setForm] = useState(profile);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("");

    const res = await fetch("/api/workspace", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Erro ao salvar perfil do negócio.");
      return;
    }
    setStatus("Perfil do negócio salvo. Os geradores vão usar esses dados por padrão.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome do negócio
        <input
          value={form.businessName}
          onChange={(e) => setForm({ ...form, businessName: e.target.value })}
        />
      </label>
      <label>
        Nicho
        <input value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })} />
      </label>
      <label>
        Público-alvo padrão
        <input
          value={form.defaultAudience}
          onChange={(e) => setForm({ ...form, defaultAudience: e.target.value })}
        />
      </label>
      <label>
        Tom de voz padrão
        <input
          value={form.defaultTone}
          onChange={(e) => setForm({ ...form, defaultTone: e.target.value })}
        />
      </label>
      <label>
        Diferenciais padrão
        <input
          value={form.defaultDifferentiators}
          onChange={(e) => setForm({ ...form, defaultDifferentiators: e.target.value })}
        />
      </label>
      <button type="submit">Salvar perfil do negócio</button>
      {error && <p role="alert">{error}</p>}
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}
