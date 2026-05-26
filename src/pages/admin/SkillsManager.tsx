import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  Tags,
  Code2,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSkills } from "@/hooks/useSkills";
import { useSkillsCategory } from "@/hooks/useSkillsCategory";
import { Skill, SkillCategory } from "@/services/types";

const SkillsManager = () => {
  const {
    skillsQuery,
    createMutation: createSkill,
    updateMutation: updateSkill,
    deleteMutation: deleteSkill,
  } = useSkills();
  const {
    categories: categoriesQuery,
    createMutation: createCat,
    updateMutation: updateCat,
    deleteMutation: deleteCat,
  } = useSkillsCategory();

  const [activeTab, setActiveTab] = useState("skills");
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState<Partial<Skill>>({
    name: "",
    icon: "",
    category_id: undefined,
    order: 0,
    is_active: true,
  });

  const [editingCat, setEditingCat] = useState<SkillCategory | null>(null);
  const [catForm, setCatForm] = useState<Partial<SkillCategory>>({
    name: "",
    icon: "",
    order: 0,
    is_active: true,
  });

  const handleOpenSkillDialog = (skill: Skill | null = null) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm(skill);
    } else {
      setEditingSkill(null);
      setSkillForm({
        name: "",
        icon: "",
        category_id: categoriesQuery.data?.[0]?.id,
        order: 0,
        is_active: true,
      });
    }
    setIsSkillDialogOpen(true);
  };

  const handleOpenCatDialog = (cat: SkillCategory | null = null) => {
    if (cat) {
      setEditingCat(cat);
      setCatForm(cat);
    } else {
      setEditingCat(null);
      setCatForm({ name: "", icon: "", order: 0, is_active: true });
    }
    setIsCatDialogOpen(true);
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkill?.id) {
      await updateSkill.mutateAsync({ id: editingSkill.id, data: skillForm });
    } else {
      await createSkill.mutateAsync(skillForm);
    }
    setIsSkillDialogOpen(false);
  };

  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCat?.id) {
      await updateCat.mutateAsync({ id: editingCat.id, data: catForm });
    } else {
      await createCat.mutateAsync(catForm);
    }
    setIsCatDialogOpen(false);
  };

  if (skillsQuery.isLoading || categoriesQuery.isLoading)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Cargando datos...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Skills & Categorías
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona tus habilidades técnicas organizadas por categorías
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" /> Skills
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tags className="h-4 w-4" /> Categorías
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <div className="flex justify-between items-center">
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {Array.isArray(categoriesQuery.data) &&
                  categoriesQuery.data.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button onClick={() => handleOpenSkillDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Agregar Skill
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(skillsQuery.data) &&
                  skillsQuery.data
                    .filter(
                      (skill) =>
                        skillFilter === "all" ||
                        skill.category_id?.toString() === skillFilter,
                    )
                    .map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded border border-border bg-surface p-1 flex items-center justify-center">
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://via.placeholder.com/32";
                              }}
                            />
                          </div>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {skill.category?.name || "Sin categoría"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${skill.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
                        >
                          {skill.is_active ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenSkillDialog(skill)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => deleteSkill.mutate(skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={() => handleOpenCatDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Agregar Categoría
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Orden</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(categoriesQuery.data) &&
                  categoriesQuery.data.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      </TableCell>
                      <TableCell className="font-medium">{cat.name}</TableCell>
                      <TableCell>{cat.order}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
                        >
                          {cat.is_active ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenCatDialog(cat)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => deleteCat.mutate(cat.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Skill Dialog */}
      <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? "Editar Skill" : "Agregar Skill"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSkillSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="s-name">Nombre</Label>
                <Input
                  id="s-name"
                  value={skillForm.name}
                  onChange={(e) =>
                    setSkillForm({
                      ...skillForm,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-cat">Categoría</Label>
              <Select
                value={skillForm.category_id?.toString()}
                onValueChange={(v) =>
                  setSkillForm({ ...skillForm, category_id: parseInt(v) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(categoriesQuery.data) &&
                    categoriesQuery.data.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-icon">URL Icono (SVG/PNG)</Label>
              <Input
                id="s-icon"
                value={skillForm.icon}
                onChange={(e) =>
                  setSkillForm({ ...skillForm, icon: e.target.value })
                }
                placeholder="https://..."
                required
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="s-order">Orden</Label>
                <Input
                  id="s-order"
                  type="number"
                  value={skillForm.order}
                  onChange={(e) =>
                    setSkillForm({
                      ...skillForm,
                      order: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="s-active"
                  checked={skillForm.is_active}
                  onCheckedChange={(v) =>
                    setSkillForm({ ...skillForm, is_active: v })
                  }
                />
                <Label htmlFor="s-active">Activo</Label>
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSkillDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={isCatDialogOpen} onOpenChange={setIsCatDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCat ? "Editar Categoría" : "Agregar Categoría"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCatSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-name">Nombre</Label>
                <Input
                  id="c-name"
                  value={catForm.name}
                  onChange={(e) =>
                    setCatForm({
                      ...catForm,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-slug">Slug</Label>
                <Input
                  id="c-slug"
                  value={catForm.slug}
                  onChange={(e) =>
                    setCatForm({
                      ...catForm,
                      slug: e.target.value.toUpperCase().replace(/ /g, "-"),
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-icon">Icono (Opcional)</Label>
              <Input
                id="c-icon"
                value={catForm.icon}
                onChange={(e) =>
                  setCatForm({ ...catForm, icon: e.target.value })
                }
                placeholder="lucide icon name or url"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="c-order">Orden</Label>
                <Input
                  id="c-order"
                  type="number"
                  value={catForm.order}
                  onChange={(e) =>
                    setCatForm({ ...catForm, order: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="c-active"
                  checked={catForm.is_active}
                  onCheckedChange={(v) =>
                    setCatForm({ ...catForm, is_active: v })
                  }
                />
                <Label htmlFor="c-active">Activo</Label>
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCatDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SkillsManager;
