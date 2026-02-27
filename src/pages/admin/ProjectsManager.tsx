import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ExternalLink, Github, Save } from "lucide-react";
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

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string;
  repo: string;
  demo: string;
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Plataforma de comercio electrónico full-stack con pasarela de pagos integrada.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
    tags: "React, Node.js, Stripe",
    repo: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con drag & drop y colaboración en tiempo real.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600",
    tags: "React, Firebase, TailwindCSS",
    repo: "https://github.com",
    demo: "https://demo.com",
  },
];

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    repo: "",
    demo: "",
  });

  const openNew = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      image: "",
      tags: "",
      repo: "",
      demo: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description,
      image: p.image,
      tags: p.tags,
      repo: p.repo,
      demo: p.demo,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setProjects(
        projects.map((p) => (p.id === editing.id ? { ...p, ...form } : p)),
      );
    } else {
      setProjects([...projects, { id: Date.now(), ...form }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proyectos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Administra tus proyectos destacados
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Agregar
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full sm:w-40 h-24 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tags.split(",").map((tag) => (
                  <span
                    key={tag.trim()}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex sm:flex-col gap-1 sm:justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => openEdit(project)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => handleDelete(project.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Proyecto" : "Nuevo Proyecto"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
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
            <div className="space-y-2">
              <Label>URL de imagen</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Tags (separados por coma)</Label>
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="React, Node.js"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Repositorio</Label>
                <Input
                  value={form.repo}
                  onChange={(e) => setForm({ ...form, repo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Demo</Label>
                <Input
                  value={form.demo}
                  onChange={(e) => setForm({ ...form, demo: e.target.value })}
                />
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

export default ProjectsManager;
