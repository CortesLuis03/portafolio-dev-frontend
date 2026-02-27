import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

const initialData: Experience[] = [
  {
    id: 1,
    role: "Senior Full Stack Developer",
    company: "Tech Company",
    period: "2022 — Presente",
    description: "Lideré el desarrollo de microservicios con Node.js y React.",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Startup Digital",
    period: "2020 — 2022",
    description: "Desarrollé aplicaciones SaaS con React y Express.",
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Agencia Creativa",
    period: "2018 — 2020",
    description: "Construí interfaces responsivas con React y TailwindCSS.",
  },
];

const ExperienceManager = () => {
  const [items, setItems] = useState<Experience[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState({
    role: "",
    company: "",
    period: "",
    description: "",
  });

  const openNew = () => {
    setEditing(null);
    setForm({ role: "", company: "", period: "", description: "" });
    setDialogOpen(true);
  };
  const openEdit = (item: Experience) => {
    setEditing(item);
    setForm({
      role: item.role,
      company: item.company,
      period: item.period,
      description: item.description,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setItems(items.map((i) => (i.id === editing.id ? { ...i, ...form } : i)));
    } else {
      setItems([...items, { id: Date.now(), ...form }]);
    }
    setDialogOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Experiencia</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestiona tu historial laboral
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Agregar
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
          >
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {item.role}
                </h3>
                <p className="text-xs text-primary">{item.company}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {item.period}
                </p>
                <p className="text-xs text-muted-foreground mt-2 max-w-lg">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => openEdit(item)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => setItems(items.filter((i) => i.id !== item.id))}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar" : "Nueva"} Experiencia
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Puesto</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Input
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Período</Label>
                <Input
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                  placeholder="2022 — Presente"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Guardar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ExperienceManager;
