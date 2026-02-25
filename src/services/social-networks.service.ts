import { api } from "./api";

export interface SocialNetwork {
  name: string;
  url: string;
  icon: string;
}

export const fetchSocialNetworks = async (): Promise<SocialNetwork[]> => {
  const { data } = await api.get("/social-networks/get");
  return data;
};