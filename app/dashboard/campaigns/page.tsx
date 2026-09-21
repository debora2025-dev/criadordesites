"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Campaign } from "@prisma/client";
import { CampaignCard } from "@/components/CampaignCard";

const emptyForm = { name: "", platform: "", objective: "", status: "Ativa", budget: "" };

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCampaigns() {
    const res = await fetch("/api/campaigns");
    const data = await res.json();
    setCampaigns(res.ok ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        budget: form.budget ? Number(form.budget) : undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Erro ao criar campanha.");
      return;
    }

    setForm(emptyForm);
    setCampaigns((prev) => [data, ...prev]);
  }

  async function handleDelete(id: string) {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
  }

  return (
    <main>
      <div className="page-header">
        <h1>Campanhas</h1>
        <p>Registre e acompanhe suas campanhas de tráfego pago e conteúdo.</p>
      </div>

      <div className="card">
      <form onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <label>
          Plataforma
          <input
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            required
          />
        </label>
        <label>
          Objetivo
          <input
            value={form.objective}
            onChange={(e) => setForm({ ...form, objective: e.target.value })}
            required
          />
        </label>
        <label>
          Status
          <input
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
          />
        </label>
        <label>
          Orçamento (R$)
          <input
            type="number"
            step="0.01"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />
        </label>
        <button type="submit">Criar campanha</button>
      </form>
      {error && <p role="alert">{error}</p>}
      </div>

      <div className="list-section">
        <h2>Suas campanhas</h2>
        {loading ? (
          <p className="empty-state">Carregando...</p>
        ) : campaigns.length === 0 ? (
          <p className="empty-state">Nenhuma campanha cadastrada ainda.</p>
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} onDelete={handleDelete} />
          ))
        )}
      </div>
    </main>
  );
}
