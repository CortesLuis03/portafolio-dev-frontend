import { useState, useEffect } from "react";
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
import { Testimonial } from "@/services/types";
import {
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/services/testimonials.service";

const TestimonialsManager = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({
    testimony: "",
    person_name: "",
    person_position: "",
    person_company: "",
    person_avatar: "",
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await fetchTestimonials();
      setItems(data);
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditing(null);
    setForm({
      testimony: "",
      person_name: "",
      person_position: "",
      person_company: "",
      person_avatar: "",
      order: items.length + 1,
      is_active: true,
    });
    setDialogOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({
      testimony: item.testimony,
      person_name: item.person_name,
      person_position: item.person_position,
      person_company: item.person_company,
      person_avatar: item.person_avatar || "",
      order: item.order,
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        const updated = await updateTestimonial(editing.id, form);
        setItems(items.map((i) => (i.id === editing.id ? updated : i)));
      } else {
        const created = await createTestimonial(form);
        setItems([...items, created]);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTestimonial(id);
      setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
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
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-secondary-foreground leading-relaxed mb-4">
              "{item.testimony}"
            </p>
            <div className="flex items-center gap-3">
              {item.person_avatar && (
                <img
                  src={item.person_avatar}
                  alt={item.person_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-foreground">{item.person_name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.person_position} {item.person_company && `en ${item.person_company}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar" : "Nuevo"} Testimonio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Testimonio</Label>
              <Textarea
                rows={4}
                value={form.testimony}
                onChange={(e) => setForm({ ...form, testimony: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={form.person_name}
                onChange={(e) => setForm({ ...form, person_name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cargo</Label>
                <Input
                  value={form.person_position}
                  onChange={(e) => setForm({ ...form, person_position: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Input
                  value={form.person_company}
                  onChange={(e) => setForm({ ...form, person_company: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>URL Avatar</Label>
              <Input
                value={form.person_avatar}
                onChange={(e) => setForm({ ...form, person_avatar: e.target.value })}
                placeholder="https://..."
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
                  id="is_active_test"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="is_active_test" className="text-sm">Activo</Label>
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

export default TestimonialsManager;
