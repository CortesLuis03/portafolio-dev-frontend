import { api } from "./api";
import { Skill } from "./types";

export const fetchSkills = async (): Promise<Skill[]> => {
  const { data } = await api.get("/skills");
  return data;
};

export const createSkill = async (skill: Partial<Skill>): Promise<Skill> => {
  const { data } = await api.post("/skills", skill);
  return data;
};

export const updateSkill = async (
  id: number,
  skill: Partial<Skill>,
): Promise<Skill> => {
  const { data } = await api.put(`/skills/${id}`, skill);
  return data;
};

export const deleteSkill = async (id: number): Promise<void> => {
  await api.delete(`/skills/${id}`);
};
