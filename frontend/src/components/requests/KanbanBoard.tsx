import { useState } from 'react';
import { MaintenanceRequest, RequestStatus } from '@/types/maintenance';
import { RequestCard } from './RequestCard';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KanbanBoardProps {
  requests: MaintenanceRequest[];
  onRequestClick?: (request: MaintenanceRequest) => void;
  onStatusChange?: (requestId: string, newStatus: RequestStatus) => void;
  onCreateRequest?: () => void;
}

const columns: { id: RequestStatus; title: string; color: string }[] = [
  { id: 'new', title: 'New', color: 'bg-status-new' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-status-progress' },
  { id: 'repaired', title: 'Repaired', color: 'bg-status-repaired' },
  { id: 'scrap', title: 'Scrap', color: 'bg-status-scrap' },
];

export function KanbanBoard({
  requests,
  onRequestClick,
  onStatusChange,
  onCreateRequest,
}: KanbanBoardProps) {
  const [draggedRequest, setDraggedRequest] = useState<MaintenanceRequest | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<RequestStatus | null>(null);

  const handleDragStart = (request: MaintenanceRequest) => {
    setDraggedRequest(request);
  };

  const handleDragEnd = () => {
    if (draggedRequest && dragOverColumn && draggedRequest.status !== dragOverColumn) {
      onStatusChange?.(draggedRequest.id, dragOverColumn);
    }
    setDraggedRequest(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: RequestStatus) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const getColumnRequests = (status: RequestStatus) =>
    requests.filter((r) => r.status === status);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnRequests = getColumnRequests(column.id);
        const isDropTarget = dragOverColumn === column.id;

        return (
          <div
            key={column.id}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={() => setDragOverColumn(null)}
            onDrop={handleDragEnd}
            className={cn(
              'flex-shrink-0 w-80 rounded-2xl border bg-muted/30 transition-all duration-200',
              isDropTarget && 'border-primary bg-primary/5 scale-[1.02]'
            )}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className={cn('h-3 w-3 rounded-full', column.color)} />
                <h3 className="font-semibold">{column.title}</h3>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs font-medium text-muted-foreground">
                  {columnRequests.length}
                </span>
              </div>
              {column.id === 'new' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={onCreateRequest}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3 p-3 min-h-[200px]">
              {columnRequests.map((request) => (
                <div
                  key={request.id}
                  draggable
                  onDragStart={() => handleDragStart(request)}
                  onDragEnd={handleDragEnd}
                  className="animate-fade-in"
                >
                  <RequestCard
                    request={request}
                    onClick={() => onRequestClick?.(request)}
                    isDragging={draggedRequest?.id === request.id}
                  />
                </div>
              ))}
              {columnRequests.length === 0 && (
                <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border/50 text-sm text-muted-foreground">
                  No requests
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
