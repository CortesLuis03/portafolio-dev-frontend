import {
  fetchSkillsTree,
  fetchSkillsCategories,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  SkillCategory,
} from "@/services/skills-category.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useSkillsCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const treeQuery = useQuery({
    queryKey: ["skills-tree"],
    queryFn: fetchSkillsTree,
  });

  const categoriesQuery = useQuery({
    queryKey: ["skills-categories"],
    queryFn: fetchSkillsCategories,
  });

  const createMutation = useMutation({
    mutationFn: createSkillCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      queryClient.invalidateQueries({ queryKey: ["skills-tree"] });
      toast({ title: "Éxito", description: "Categoría creada correctamente" });
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        err.response?.data?.message || "No se pudo crear la categoría";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SkillCategory> }) =>
      updateSkillCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      queryClient.invalidateQueries({ queryKey: ["skills-tree"] });
      toast({
        title: "Éxito",
        description: "Categoría actualizada correctamente",
      });
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        err.response?.data?.message || "No se pudo actualizar la categoría";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSkillCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      queryClient.invalidateQueries({ queryKey: ["skills-tree"] });
      toast({
        title: "Éxito",
        description: "Categoría eliminada correctamente",
      });
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        err.response?.data?.message || "No se pudo eliminar la categoría";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return {
    ...treeQuery,
    tree: treeQuery,
    categories: categoriesQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
