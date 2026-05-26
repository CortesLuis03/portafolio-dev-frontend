import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSocialNetworks } from "@/hooks/useSocialNetworks";
import { SocialNetwork } from "@/services/social-networks.service";

const SocialManager = () => {
  const {
    data: socialNetworks,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useSocialNetworks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialNetwork | null>(
    null,
  );
  const [formData, setFormData] = useState<SocialNetwork>({
    name: "",
    url: "",
    icon: "",
  });

  const handleOpenDialog = (social: SocialNetwork | null = null) => {
    if (social) {
      setEditingSocial(social);
      setFormData(social);
    } else {
      setEditingSocial(null);
      setFormData({ name: "", url: "", icon: "" });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSocial(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSocial?.id) {
      await updateMutation.mutateAsync({
        id: editingSocial.id,
        data: formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }
    handleCloseDialog();
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta red social?")
    ) {
      await deleteMutation.mutateAsync(id);
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Redes Sociales</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestiona los enlaces a tus perfiles y redes sociales
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Red Social
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Icono</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socialNetworks?.map((social) => (
              <TableRow key={social.id}>
                <TableCell className="font-medium">{social.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline gap-1"
                  >
                    <LinkIcon className="h-3 w-3" /> {social.url}
                  </a>
                </TableCell>
                <TableCell>
                  <div className="w-8 h-8 rounded-lg border border-border bg-surface p-1 flex items-center justify-center">
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-full h-full object-contain grayscale brightness-0 invert"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/32";
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(social)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => social.id && handleDelete(social.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {socialNetworks?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No hay redes sociales configuradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingSocial ? "Editar Red Social" : "Agregar Red Social"}
            </DialogTitle>
            <DialogDescription>
              Completa los campos para {editingSocial ? "actualizar" : "crear"}{" "}
              la red social.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Ej. GitHub, LinkedIn..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="url"
                  className="pl-9"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  type="url"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">URL del Icono (SVG/PNG)</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="icon"
                  className="pl-9"
                  placeholder="URL de la imagen del icono"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  required
                />
              </div>
              <p className="text-[10px] text-muted-foreground">
                Se recomienda usar iconos SVG con fondo transparente.
              </p>
            </div>
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingSocial ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SocialManager;
