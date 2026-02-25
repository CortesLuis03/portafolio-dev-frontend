import { fetchSocialNetworks } from "@/services/social-networks.service";
import { useQuery } from "@tanstack/react-query";

export const useSocialNetworks = () => {
  return useQuery({
    queryKey: ["social-networks"],
    queryFn: fetchSocialNetworks,
  });
};
