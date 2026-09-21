"use client";

import type { Lead } from "@prisma/client";

export function LeadTable({
  leads,
  onDelete,
}: {
  leads: Lead[];
  onDelete: (id: string) => void;
}) {
  if (leads.length === 0) {
    return <p>Nenhum lead cadastrado ainda.</p>;
  }

  return (
    <table className="lead-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Contato</th>
          <th>Origem</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.name}</td>
            <td>{lead.email || lead.phone || "—"}</td>
            <td>{lead.source || "—"}</td>
            <td>
              <span className={`badge status-${lead.status.toLowerCase()}`}>{lead.status}</span>
            </td>
            <td>
              <button type="button" onClick={() => onDelete(lead.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
