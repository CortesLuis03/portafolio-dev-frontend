import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/services/skills.service";
import { Skill } from "@/services/skills-category.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useSkills = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  const createMutation = useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["skills-tree"] });
      toast({ title: "Éxito", description: "Skill creada correctamente" });
    },
    onError: (error: unknown) => {
      const err = error as any;
      toast({
        title: "Error",
        description: err.response?.data?.message || "No se pudo crear la skill",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Skill> }) =>
      updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["skills-tree"] });
      toast({ title: "Éxito", description: "Skill actualizada correctamente" });
    },
    onError: (error: unknown) => {
      const err = error as any;
      toast({
        title: "Error",
        description:
          err.response?.data?.message || "No se pudo actualizar la skill",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["skills-tree"] });
      toast({ title: "Éxito", description: "Skill eliminada correctamente" });
    },
    onError: (error: unknown) => {
      const err = error as any;
      toast({
        title: "Error",
        description:
          err.response?.data?.message || "No se pudo eliminar la skill",
        variant: "destructive",
      });
    },
  });

  return {
    skillsQuery: query,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
