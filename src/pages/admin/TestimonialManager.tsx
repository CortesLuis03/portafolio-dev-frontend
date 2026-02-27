import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, Quote } from "lucide-react";
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

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

const initialData: Testimonial[] = [
  {
    id: 1,
    name: "María García",
    role: "CTO en TechCo",
    text: "Un profesional excepcional. Su capacidad para resolver problemas complejos y entregar código limpio es admirable.",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Product Manager",
    text: "Trabajar con él fue una experiencia fantástica. Siempre proactivo, con ideas innovadoras.",
  },
  {
    id: 3,
    name: "Ana López",
    role: "Lead Designer",
    text: "La colaboración más fluida que he tenido con un desarrollador.",
  },
];

const TestimonialsManager = () => {
  const [items, setItems] = useState<Testimonial[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: "", role: "", text: "" });

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", role: "", text: "" });
    setDialogOpen(true);
  };
  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({ name: item.name, role: item.role, text: item.text });
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
          <h1 className="text-2xl font-bold text-foreground">Testimonios</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestiona las recomendaciones de colegas
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Agregar
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
          >
            <div className="flex justify-between mb-3">
              <Quote className="h-5 w-5 text-primary/30" />
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => openEdit(item)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive"
                  onClick={() =>
                    setItems(items.filter((i) => i.id !== item.id))
                  }
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-secondary-foreground leading-relaxed mb-4">
              "{item.text}"
            </p>
            <p className="text-sm font-semibold text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.role}</p>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar" : "Nuevo"} Testimonio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Cargo</Label>
                <Input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Testimonio</Label>
              <Textarea
                rows={4}
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
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

export default TestimonialsManager;
