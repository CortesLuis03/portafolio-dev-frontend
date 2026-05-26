import { api } from "./api";
import { FeaturedProject } from "./types";

export const fetchFeaturedProjects = async (): Promise<FeaturedProject[]> => {
  const { data } = await api.get("/featured-projects");
  return data;
};

export const createFeaturedProject = async (
  project: Partial<FeaturedProject>,
): Promise<FeaturedProject> => {
  const { data } = await api.post("/featured-projects", project);
  return data;
};

export const updateFeaturedProject = async (
  id: number,
  project: Partial<FeaturedProject>,
): Promise<FeaturedProject> => {
  const { data } = await api.put(`/featured-projects/${id}`, project);
  return data;
};

export const deleteFeaturedProject = async (id: number): Promise<void> => {
  await api.delete(`/featured-projects/${id}`);
};
