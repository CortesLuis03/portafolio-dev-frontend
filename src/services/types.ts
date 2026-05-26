export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

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

export interface SocialNetwork {
  id?: number;
  name: string;
  url: string;
  icon: string;
}

export interface PersonProfile {
  full_name: string;
  profile: string;
  about: string;
}

export interface FeaturedProject {
  id: number;
  title: string;
  image: string;
  description: string;
  technologies: string;
  url?: string;
  github_url?: string;
  order: number;
  is_active: boolean;
}

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  functions: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  order: number;
  is_active: boolean;
}

export interface Testimonial {
  id: number;
  testimony: string;
  person_name: string;
  person_position: string;
  person_company: string;
  person_avatar?: string;
  order: number;
  is_active: boolean;
}
