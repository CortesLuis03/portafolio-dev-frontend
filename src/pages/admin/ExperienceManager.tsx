import { useState, useEffect } from "react";
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
import { WorkExperience } from "@/services/types";
import {
  fetchWorkExperiences,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} from "@/services/work-experience.service";

const ExperienceManager = () => {
  const [items, setItems] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<WorkExperience | null>(null);
  const [form, setForm] = useState({
    company: "",
    position: "",
    functions: "",
    start_date: "",
    end_date: "",
    is_current: false,
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await fetchWorkExperiences();
      setItems(data);
    } catch (error) {
      console.error("Error loading experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditing(null);
    setForm({
      company: "",
      position: "",
      functions: "",
      start_date: "",
      end_date: "",
      is_current: false,
      order: items.length + 1,
      is_active: true,
    });
    setDialogOpen(true);
  };

  const formatDateForInput = (date: string) => {
    if (!date) return "";
    return date.substring(0, 7);
  };

  const openEdit = (item: WorkExperience) => {
    setEditing(item);
    setForm({
      company: item.company,
      position: item.position,
      functions: item.functions,
      start_date: formatDateForInput(item.start_date),
      end_date: formatDateForInput(item.end_date || ""),
      is_current: item.is_current,
      order: item.order,
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        end_date: form.is_current ? null : form.end_date,
      };
      if (editing) {
        const updated = await updateWorkExperience(editing.id, payload);
        setItems(items.map((i) => (i.id === editing.id ? updated : i)));
      } else {
        const created = await createWorkExperience(payload);
        setItems([...items, created]);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkExperience(id);
      setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("es-ES", { month: "short", year: "numeric" });
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Cargando...</div>;
  }

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
                  {item.position}
                </h3>
                <p className="text-xs text-primary">{item.company}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {formatDate(item.start_date)} — {item.is_current ? "Presente" : formatDate(item.end_date || "")}
                </p>
                <p className="text-xs text-muted-foreground mt-2 max-w-lg">
                  {item.functions}
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
                onClick={() => handleDelete(item.id)}
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
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha inicio</Label>
                <Input
                  type="month"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  className="border-primary/50 focus:border-primary bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha fin</Label>
                <Input
                  type="month"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  disabled={form.is_current}
                  className="border-primary/50 focus:border-primary bg-background"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_current"
                checked={form.is_current}
                onChange={(e) => setForm({ ...form, is_current: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="is_current" className="text-sm">Trabajo actual</Label>
            </div>
            <div className="space-y-2">
              <Label>Funciones</Label>
              <Textarea
                rows={3}
                value={form.functions}
                onChange={(e) => setForm({ ...form, functions: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Orden</Label>
                <Input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center gap-2 pt-8">
                <input
                  type="checkbox"
                  id="is_active_exp"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="is_active_exp" className="text-sm">Activo</Label>
              </div>
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
