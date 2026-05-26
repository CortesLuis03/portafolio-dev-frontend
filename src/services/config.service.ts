import { api } from "./api";
import { PersonProfile } from "./types";

export const fetchConfigs = async (): Promise<PersonProfile> => {
  const { data } = await api.get("/configs/get");
  return data;
};
