import { api } from "./api";

export interface PersonProfile {
  full_name: string;
  profile: string;
  about: string;
}

export const fetchConfigs = async (): Promise<PersonProfile> => {
  const { data } = await api.get("/configs/get");
  return data;
};