"use client";

import { useState, type FormEvent } from "react";

export function AccountForm({ name, email }: { name: string; email: string }) {
  const [nameValue, setNameValue] = useState(name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nameStatus, setNameStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleNameSubmit(e: FormEvent) {
    e.preventDefault();
    setNameError("");
    setNameStatus("");

    const res = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameValue }),
    });
    const data = await res.json();

    if (!res.ok) {
      setNameError(data.error ?? "Erro ao salvar.");
      return;
    }
    setNameStatus("Nome atualizado.");
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordStatus("");

    const res = await fetch("/api/account/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();

    if (!res.ok) {
      setPasswordError(data.error ?? "Erro ao trocar a senha.");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setPasswordStatus("Senha atualizada.");
  }

  return (
    <div className="settings-section">
      <form onSubmit={handleNameSubmit}>
        <label>
          Nome
          <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} required />
        </label>
        <label>
          E-mail
          <input value={email} disabled />
        </label>
        <button type="submit">Salvar nome</button>
        {nameError && <p role="alert">{nameError}</p>}
        {nameStatus && <p className="form-status">{nameStatus}</p>}
      </form>

      <form onSubmit={handlePasswordSubmit}>
        <label>
          Senha atual
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Nova senha
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>
        <button type="submit">Trocar senha</button>
        {passwordError && <p role="alert">{passwordError}</p>}
        {passwordStatus && <p className="form-status">{passwordStatus}</p>}
      </form>
    </div>
  );
}
