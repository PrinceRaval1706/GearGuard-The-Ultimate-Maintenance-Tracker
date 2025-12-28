import { Team, Technician } from '@/types/maintenance';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  members: Technician[];
  onClick?: () => void;
}

export function TeamCard({ team, members, onClick }: TeamCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${team.color}20` }}
        >
          <Users className="h-6 w-6" style={{ color: team.color }} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{team.name}</h3>
          <p className="text-sm text-muted-foreground">{team.description}</p>
        </div>
      </div>

      {/* Members */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {members.slice(0, 4).map((member) => (
            <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-xs">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          ))}
          {members.length > 4 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
              +{members.length - 4}
            </div>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {members.length} member{members.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
