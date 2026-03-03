import { api } from "./api";

export interface Skill {
  id: number;
  category_id: number;
  name: string;
  icon: string;
  order: number;
  is_active: boolean;
  category?: SkillCategory;
}

export interface SkillCategory {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  order: number;
  is_active: boolean;
  skills?: Skill[];
}

export const fetchSkillsTree = async (): Promise<SkillCategory[]> => {
  const { data } = await api.get("/skills-category/get-skills");
  return data;
};

export const fetchSkillsCategories = async (): Promise<SkillCategory[]> => {
  const { data } = await api.get("/skills-category");
  return data;
};

export const createSkillCategory = async (
  category: Partial<SkillCategory>,
): Promise<SkillCategory> => {
  const { data } = await api.post("/skills-category", category);
  return data;
};

export const updateSkillCategory = async (
  id: number,
  category: Partial<SkillCategory>,
): Promise<SkillCategory> => {
  const { data } = await api.put(`/skills-category/${id}`, category);
  return data;
};

export const deleteSkillCategory = async (id: number): Promise<void> => {
  await api.delete(`/skills-category/${id}`);
};
