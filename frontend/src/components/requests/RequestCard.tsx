import { MaintenanceRequest } from '@/types/maintenance';
import { equipment, technicians } from '@/data/mockData';
import { StatusBadge, TypeBadge, PriorityBadge } from '@/components/ui/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, AlertTriangle, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface RequestCardProps {
  request: MaintenanceRequest;
  onClick?: () => void;
  isDragging?: boolean;
}

export function RequestCard({ request, onClick, isDragging }: RequestCardProps) {
  const equipmentItem = equipment.find((e) => e.id === request.equipmentId);
  const technician = request.assignedTechnicianId
    ? technicians.find((t) => t.id === request.assignedTechnicianId)
    : null;

  return (
    <div
      onClick={onClick}
      className={cn(
        'group cursor-pointer rounded-xl border bg-card p-4 transition-all duration-200',
        'hover:shadow-md hover:border-primary/20',
        isDragging && 'rotate-2 shadow-xl scale-105',
        request.isOverdue && 'border-l-4 border-l-status-scrap'
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm leading-tight truncate">{request.subject}</h4>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {equipmentItem?.name || 'Unknown Equipment'}
          </p>
        </div>
        <PriorityBadge priority={request.priority} />
      </div>

      {/* Badges */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        <TypeBadge type={request.type} />
        {request.isOverdue && (
          <span className="inline-flex items-center gap-1 rounded-full bg-status-scrap/10 px-2 py-0.5 text-xs font-medium text-status-scrap">
            <AlertTriangle className="h-3 w-3" />
            Overdue
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          {request.scheduledDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(request.scheduledDate), 'MMM d')}
            </span>
          )}
          {request.duration && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {Math.floor(request.duration / 60)}h {request.duration % 60}m
            </span>
          )}
        </div>

        {/* Assigned Technician */}
        {technician ? (
          <Avatar className="h-6 w-6 border-2 border-background">
            <AvatarImage src={technician.avatar} alt={technician.name} />
            <AvatarFallback className="text-[10px]">
              {technician.name.split(' ').map((n) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        ) : (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">Unassigned</span>
        )}
      </div>

      {/* ID Badge */}
      <div className="mt-3 pt-3 border-t border-border/50">
        <span className="font-mono text-[10px] text-muted-foreground">#{request.id}</span>
      </div>
    </div>
  );
}
