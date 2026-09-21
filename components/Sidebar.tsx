"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Visão geral" },
  { href: "/dashboard/generators", label: "Geradores" },
  { href: "/dashboard/campaigns", label: "Campanhas" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/calendar", label: "Calendário" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">Marketing AI</div>
      <nav>
        {links.map((link) => {
          const active =
            link.href === "/dashboard" ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={active ? "active" : ""}>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button type="button" className="sidebar-logout" onClick={handleLogout}>
        Sair
      </button>
    </aside>
  );
}
