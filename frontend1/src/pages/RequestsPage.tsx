import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RequestItem {
  id: string;
  title: string;
  priority: string;
}

export default function RequestsPage() {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [requests, setRequests] = useState<RequestItem[]>([]);

  /* LOAD FROM LOCAL STORAGE */
  useEffect(() => {
    const stored = localStorage.getItem("requests");
    if (stored) {
      setRequests(JSON.parse(stored));
    }
  }, []);

  /* SAVE TO LOCAL STORAGE */
  const saveToStorage = (data: RequestItem[]) => {
    localStorage.setItem("requests", JSON.stringify(data));
    setRequests(data);
  };

  /* ADD REQUEST */
  const handleAdd = () => {
    if (!title || !priority) {
      toast({
        title: "Fill all fields",
        variant: "destructive",
      });
      return;
    }

    const newRequest: RequestItem = {
      id: Date.now().toString(),
      title,
      priority,
    };

    const updated = [newRequest, ...requests];
    saveToStorage(updated);

    setTitle("");
    setPriority("");

    toast({ title: "Request added" });
  };

  /* DELETE REQUEST */
  const handleDelete = (id: string) => {
    const updated = requests.filter((r) => r.id !== id);
    saveToStorage(updated);
    toast({ title: "Request deleted" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Requests</h1>

      {/* ADD FORM */}
      <div className="flex gap-3 max-w-xl">
        <Input
          placeholder="Request title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Priority (Low / Medium / High)"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      {/* LIST */}
      {requests.length === 0 ? (
        <p className="text-muted-foreground">No requests yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <Card key={req.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{req.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Priority: {req.priority}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(req.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
