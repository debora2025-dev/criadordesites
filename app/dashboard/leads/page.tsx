"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Lead } from "@prisma/client";
import { LeadTable } from "@/components/LeadTable";

const emptyForm = { name: "", email: "", phone: "", source: "", status: "Novo", notes: "" };

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadLeads() {
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(res.ok ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Erro ao criar lead.");
      return;
    }

    setForm(emptyForm);
    setLeads((prev) => [data, ...prev]);
  }

  async function handleDelete(id: string) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
  }

  return (
    <main>
      <h1>Leads</h1>

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
          E-mail
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Telefone
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label>
          Origem
          <input
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
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
          Notas
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>
        <button type="submit">Adicionar lead</button>
      </form>

      {error && <p role="alert">{error}</p>}

      {loading ? <p>Carregando...</p> : <LeadTable leads={leads} onDelete={handleDelete} />}
    </main>
  );
}
