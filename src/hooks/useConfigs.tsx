import { useQuery } from "@tanstack/react-query";
import { fetchConfigs } from "@/services/config.service";

export const useConfigs = () => {
  return useQuery({
    queryKey: ["configs"],
    queryFn: fetchConfigs,
  });
};