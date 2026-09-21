export function DashboardCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="dashboard-card">
      <span className="dashboard-card-title">{title}</span>
      <span className="dashboard-card-value">{value}</span>
    </div>
  );
}
