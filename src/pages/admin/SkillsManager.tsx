import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
}

const initialSkills: Skill[] = [
  { id: 1, name: "React", icon: "react", category: "Frontend" },
  { id: 2, name: "TypeScript", icon: "typescript", category: "Frontend" },
  { id: 3, name: "TailwindCSS", icon: "tailwindcss", category: "Frontend" },
  { id: 4, name: "Node.js", icon: "nodejs", category: "Backend" },
  { id: 5, name: "PostgreSQL", icon: "postgresql", category: "Backend" },
  { id: 6, name: "Docker", icon: "docker", category: "DevOps" },
];

const categories = ["Frontend", "Backend", "DevOps"];

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState({
    name: "",
    icon: "",
    category: "Frontend",
  });

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", icon: "", category: "Frontend" });
    setDialogOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditing(skill);
    setForm({ name: skill.name, icon: skill.icon, category: skill.category });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setSkills(
        skills.map((s) => (s.id === editing.id ? { ...s, ...form } : s)),
      );
    } else {
      setSkills([...skills, { id: Date.now(), ...form }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Skills</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestiona tus tecnologías y habilidades
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Agregar
        </Button>
      </div>

      {categories.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        if (!catSkills.length) return null;
        return (
          <div key={cat}>
            <h2 className="text-sm font-mono text-primary mb-3">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                      alt={skill.name}
                      className="w-6 h-6"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEdit(skill)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Skill" : "Nuevo Skill"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="React"
              />
            </div>
            <div className="space-y-2">
              <Label>Icono (devicon slug)</Label>
              <Input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="react"
              />
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default SkillsManager;
