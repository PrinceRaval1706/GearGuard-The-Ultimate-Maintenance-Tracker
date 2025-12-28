import { cn } from '@/lib/utils';
import { RequestStatus, RequestType } from '@/types/maintenance';

interface StatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

const statusConfig: Record<RequestStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-status-new/10 text-status-new border-status-new/20' },
  in_progress: { label: 'In Progress', className: 'bg-status-progress/10 text-status-progress border-status-progress/20' },
  repaired: { label: 'Repaired', className: 'bg-status-repaired/10 text-status-repaired border-status-repaired/20' },
  scrap: { label: 'Scrapped', className: 'bg-status-scrap/10 text-status-scrap border-status-scrap/20' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

interface TypeBadgeProps {
  type: RequestType;
  className?: string;
}

const typeConfig: Record<RequestType, { label: string; className: string }> = {
  corrective: { label: 'Corrective', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  preventive: { label: 'Preventive', className: 'bg-primary/10 text-primary border-primary/20' },
};

export function TypeBadge({ type, className }: TypeBadgeProps) {
  const config = typeConfig[type];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high' | 'critical';
  className?: string;
}

const priorityConfig: Record<string, { label: string; className: string }> = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-status-new/10 text-status-new' },
  high: { label: 'High', className: 'bg-status-progress/10 text-status-progress' },
  critical: { label: 'Critical', className: 'bg-status-scrap/10 text-status-scrap' },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
