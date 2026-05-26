import { api } from "./api";
import { SocialNetwork } from "./types";

export const fetchSocialNetworks = async (): Promise<SocialNetwork[]> => {
  const { data } = await api.get("/social-networks/get");
  return data;
};

export const createSocialNetwork = async (
  socialNetwork: SocialNetwork,
): Promise<SocialNetwork> => {
  const { data } = await api.post("/social-networks", socialNetwork);
  return data;
};

export const updateSocialNetwork = async (
  id: number,
  socialNetwork: SocialNetwork,
): Promise<SocialNetwork> => {
  const { data } = await api.put(`/social-networks/${id}`, socialNetwork);
  return data;
};

export const deleteSocialNetwork = async (id: number): Promise<void> => {
  await api.delete(`/social-networks/${id}`);
};
