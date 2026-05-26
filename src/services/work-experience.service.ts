import { api } from "./api";
import { WorkExperience } from "./types";

export const fetchWorkExperiences = async (): Promise<WorkExperience[]> => {
  const { data } = await api.get("/work-experiences");
  return data;
};

export const createWorkExperience = async (
  experience: Partial<WorkExperience>,
): Promise<WorkExperience> => {
  const { data } = await api.post("/work-experiences", experience);
  return data;
};

export const updateWorkExperience = async (
  id: number,
  experience: Partial<WorkExperience>,
): Promise<WorkExperience> => {
  const { data } = await api.put(`/work-experiences/${id}`, experience);
  return data;
};

export const deleteWorkExperience = async (id: number): Promise<void> => {
  await api.delete(`/work-experiences/${id}`);
};
