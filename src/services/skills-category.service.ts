import { api } from "./api";

export interface Skill {
  name: string;
  url: string;
  icon: string;
}

export interface SkillCategory {
  id: number;
  name: string;
  skills: Skill[];
}

export const fetchSkills = async (): Promise<SkillCategory[]> => {
  const { data } = await api.get("/skills-category/get-skills");
  return data;
};