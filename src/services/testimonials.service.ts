import { api } from "./api";
import { Testimonial } from "./types";

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const { data } = await api.get("/testimonials");
  return data;
};

export const createTestimonial = async (
  testimonial: Partial<Testimonial>,
): Promise<Testimonial> => {
  const { data } = await api.post("/testimonials", testimonial, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const updateTestimonial = async (
  id: number,
  testimonial: Partial<Testimonial>,
): Promise<Testimonial> => {
  const { data } = await api.put(`/testimonials/${id}`, testimonial, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const deleteTestimonial = async (id: number): Promise<void> => {
  await api.delete(`/testimonials/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
