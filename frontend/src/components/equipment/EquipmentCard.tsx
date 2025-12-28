import { Equipment } from '@/types/maintenance';
import { teams, maintenanceRequests } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wrench, MapPin, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface EquipmentCardProps {
  equipment: Equipment;
  onClick?: () => void;
}

export function EquipmentCard({ equipment, onClick }: EquipmentCardProps) {
  const team = teams.find((t) => t.id === equipment.maintenanceTeamId);
  const openRequests = maintenanceRequests.filter(
    (r) => r.equipmentId === equipment.id && r.status !== 'repaired' && r.status !== 'scrap'
  );
  const warrantyExpired = new Date(equipment.warrantyExpiry) < new Date();

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 cursor-pointer',
        'hover:shadow-lg hover:border-primary/20 hover:-translate-y-1',
        !equipment.isActive && 'opacity-60'
      )}
    >
      {/* Status indicator */}
      <div
        className={cn(
          'absolute right-4 top-4 h-3 w-3 rounded-full',
          equipment.isActive ? 'bg-status-repaired' : 'bg-status-scrap'
        )}
      />

      {/* Header */}
      <div className="mb-4">
        <h3 className="font-bold text-lg leading-tight">{equipment.name}</h3>
        <p className="font-mono text-xs text-muted-foreground mt-1">{equipment.serialNumber}</p>
      </div>

      {/* Category & Department */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs">
          {equipment.category}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {equipment.department}
        </Badge>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{equipment.location}</span>
        </div>
        {equipment.assignedTo && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="h-4 w-4 rounded-full bg-primary/20" />
            <span className="truncate">{equipment.assignedTo}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Purchased {format(new Date(equipment.purchaseDate), 'MMM yyyy')}</span>
        </div>
      </div>

      {/* Warranty Status */}
      <div
        className={cn(
          'mt-4 flex items-center gap-2 rounded-lg px-3 py-2',
          warrantyExpired ? 'bg-status-scrap/10' : 'bg-status-repaired/10'
        )}
      >
        {warrantyExpired ? (
          <>
            <AlertCircle className="h-4 w-4 text-status-scrap" />
            <span className="text-xs font-medium text-status-scrap">Warranty Expired</span>
          </>
        ) : (
          <>
            <ShieldCheck className="h-4 w-4 text-status-repaired" />
            <span className="text-xs font-medium text-status-repaired">
              Warranty until {format(new Date(equipment.warrantyExpiry), 'MMM yyyy')}
            </span>
          </>
        )}
      </div>

      {/* Team & Maintenance Button */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
        {team && (
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: team.color }}
            />
            <span className="text-xs text-muted-foreground">{team.name}</span>
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Wrench className="h-3.5 w-3.5" />
          Maintenance
          {openRequests.length > 0 && (
            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {openRequests.length}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
