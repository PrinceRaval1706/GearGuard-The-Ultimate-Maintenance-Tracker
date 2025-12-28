import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Trash2 } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: "Available" | "Busy";
}

export default function TeamsPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [members, setMembers] = useState<TeamMember[]>([
    { id: 1, name: "Rahul Patel", role: "Technician", status: "Available" },
    { id: 2, name: "Ankit Shah", role: "Supervisor", status: "Busy" },
  ]);

  /* ADD MEMBER */
  const addMember = () => {
    if (!name.trim() || !role.trim()) return;

    setMembers([
      ...members,
      {
        id: Date.now(),
        name,
        role,
        status: "Available",
      },
    ]);

    setName("");
    setRole("");
  };

  /* DELETE MEMBER */
  const deleteMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold">Teams</h1>

      {/* ADD MEMBER */}
      <div className="flex gap-3 max-w-3xl">
        <Input
          placeholder="Member name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Button onClick={addMember}>Add</Button>
      </div>

      {/* TEAM LIST */}
      {members.length === 0 ? (
        <p className="text-muted-foreground">No team members added.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {members.map((member) => (
            <Card key={member.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/20">
                    <User className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* DELETE BUTTON */}
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteMember(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <Badge
                className={`w-fit ${
                  member.status === "Available"
                    ? "bg-green-500/15 text-green-400"
                    : "bg-red-500/15 text-red-400"
                }`}
              >
                {member.status}
              </Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
