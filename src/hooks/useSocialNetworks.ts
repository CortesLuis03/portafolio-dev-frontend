import {
  fetchSocialNetworks,
  createSocialNetwork,
  updateSocialNetwork,
  deleteSocialNetwork,
  SocialNetwork,
} from "@/services/social-networks.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useSocialNetworks = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["social-networks"],
    queryFn: fetchSocialNetworks,
  });

  const createMutation = useMutation({
    mutationFn: createSocialNetwork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-networks"] });
      toast({
        title: "Éxito",
        description: "Red social creada correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo crear la red social",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: SocialNetwork }) =>
      updateSocialNetwork(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-networks"] });
      toast({
        title: "Éxito",
        description: "Red social actualizada correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la red social",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSocialNetwork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-networks"] });
      toast({
        title: "Éxito",
        description: "Red social eliminada correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo eliminar la red social",
        variant: "destructive",
      });
    },
  });

  return {
    ...query,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
