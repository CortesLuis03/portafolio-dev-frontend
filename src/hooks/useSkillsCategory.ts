import { fetchSkills } from "@/services/skills-category.service";
import { useQuery } from "@tanstack/react-query";

export const useSkillsCategory = () => {
  return useQuery({
    queryKey: ["skills-category"],
    queryFn: fetchSkills,
  });
};
