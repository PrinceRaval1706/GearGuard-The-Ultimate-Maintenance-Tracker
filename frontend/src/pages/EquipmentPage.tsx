import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Equipment {
  id: string;
  name: string;
  category: string;
}

export default function EquipmentPage() {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  /* LOAD FROM LOCAL STORAGE */
  useEffect(() => {
    const stored = localStorage.getItem("equipment");
    if (stored) {
      setEquipment(JSON.parse(stored));
    }
  }, []);

  /* SAVE TO LOCAL STORAGE */
  const saveToStorage = (data: Equipment[]) => {
    localStorage.setItem("equipment", JSON.stringify(data));
    setEquipment(data);
  };

  /* ADD */
  const handleAdd = () => {
    if (!name || !category) {
      toast({ title: "Fill all fields", variant: "destructive" });
      return;
    }

    const newItem: Equipment = {
      id: Date.now().toString(),
      name,
      category,
    };

    const updated = [newItem, ...equipment];
    saveToStorage(updated);

    setName("");
    setCategory("");

    toast({ title: "Equipment added" });
  };

  /* DELETE */
  const handleDelete = (id: string) => {
    const updated = equipment.filter((e) => e.id !== id);
    saveToStorage(updated);
    toast({ title: "Equipment deleted" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Equipment</h1>

      {/* ADD FORM */}
      <div className="flex gap-3 max-w-xl">
        <Input
          placeholder="Equipment name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      {/* LIST */}
      {equipment.length === 0 ? (
        <p className="text-muted-foreground">No equipment added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.category}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
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
