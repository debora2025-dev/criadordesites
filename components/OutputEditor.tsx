"use client";

import { useState } from "react";

export function OutputEditor({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="output-editor">
      <div className="output-editor-toolbar">
        <button type="button" onClick={handleCopy}>
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <textarea readOnly value={value} rows={16} />
    </div>
  );
}
