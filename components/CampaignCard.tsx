"use client";

import type { Campaign } from "@prisma/client";

export function CampaignCard({
  campaign,
  onDelete,
}: {
  campaign: Campaign;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="campaign-card">
      <div>
        <strong>{campaign.name}</strong>
        <p>
          {campaign.platform} · {campaign.objective}
        </p>
      </div>
      <div className="campaign-card-meta">
        <span className={`badge status-${campaign.status.toLowerCase()}`}>{campaign.status}</span>
        {campaign.budget != null && <span>R$ {campaign.budget.toFixed(2)}</span>}
        <button type="button" onClick={() => onDelete(campaign.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}
