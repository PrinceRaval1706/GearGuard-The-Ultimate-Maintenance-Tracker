import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Wrench, ClipboardList, Users, CalendarDays } from "lucide-react";

export default function Dashboard() {
  const [equipmentCount, setEquipmentCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const equipment = JSON.parse(localStorage.getItem("equipment") || "[]");
    const requests = JSON.parse(localStorage.getItem("requests") || "[]");
    const teams = JSON.parse(localStorage.getItem("teams") || "[]");
    const events = JSON.parse(localStorage.getItem("calendarEvents") || "[]");

    setEquipmentCount(equipment.length);
    setRequestCount(requests.length);
    setTeamCount(teams.length);
    setEventCount(events.length);
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your maintenance system
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Equipment"
          value={equipmentCount}
          icon={<Wrench />}
        />
        <StatCard
          title="Requests"
          value={requestCount}
          icon={<ClipboardList />}
        />
        <StatCard
          title="Team Members"
          value={teamCount}
          icon={<Users />}
        />
        <StatCard
          title="Calendar Events"
          value={eventCount}
          icon={<CalendarDays />}
        />
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
    </Card>
  );
}
