import { maintenanceRequests, equipment, teams } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function ReportsPage() {
  // Requests by team
  const requestsByTeam = teams.map((team) => ({
    name: team.name,
    count: maintenanceRequests.filter((r) => r.teamId === team.id).length,
    color: team.color,
  }));

  // Requests by status
  const statusData = [
    { name: 'New', value: maintenanceRequests.filter((r) => r.status === 'new').length, color: 'hsl(217, 91%, 60%)' },
    { name: 'In Progress', value: maintenanceRequests.filter((r) => r.status === 'in_progress').length, color: 'hsl(38, 92%, 50%)' },
    { name: 'Repaired', value: maintenanceRequests.filter((r) => r.status === 'repaired').length, color: 'hsl(142, 71%, 45%)' },
    { name: 'Scrap', value: maintenanceRequests.filter((r) => r.status === 'scrap').length, color: 'hsl(0, 84%, 60%)' },
  ];

  // Requests by equipment category
  const categories = [...new Set(equipment.map((e) => e.category))];
  const requestsByCategory = categories.map((category) => {
    const categoryEquipment = equipment.filter((e) => e.category === category);
    const count = maintenanceRequests.filter((r) =>
      categoryEquipment.some((e) => e.id === r.equipmentId)
    ).length;
    return { name: category, count };
  });

  // Request types
  const typeData = [
    { name: 'Corrective', value: maintenanceRequests.filter((r) => r.type === 'corrective').length, color: 'hsl(0, 84%, 60%)' },
    { name: 'Preventive', value: maintenanceRequests.filter((r) => r.type === 'preventive').length, color: 'hsl(173, 80%, 40%)' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Insights into maintenance operations
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Requests by Team */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Requests by Team</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestsByTeam}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {requestsByTeam.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Requests by Status */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Requests by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Requests by Equipment Category */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Requests by Equipment Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestsByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="name" type="category" className="text-xs" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Request Types */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Request Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
