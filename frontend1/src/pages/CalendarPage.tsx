import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, Trash2 } from "lucide-react";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
}

export default function CalendarPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  /* ADD EVENT */
  const addEvent = () => {
    if (!title || !date) return;

    setEvents([
      ...events,
      {
        id: Date.now(),
        title,
        date,
      },
    ]);

    setTitle("");
    setDate("");
  };

  /* DELETE EVENT */
  const deleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold">Calendar</h1>

      {/* ADD EVENT */}
      <div className="flex gap-3 max-w-3xl">
        <Input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button onClick={addEvent}>Add</Button>
      </div>

      {/* EVENTS LIST */}
      {events.length === 0 ? (
        <p className="text-muted-foreground">No events scheduled.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card
              key={event.id}
              className="p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.date}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => deleteEvent(event.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
