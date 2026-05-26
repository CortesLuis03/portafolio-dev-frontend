import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fetchTestimonials } from "@/services/testimonials.service";
import { Testimonial } from "@/services/types";
import { useSectionCounter } from "@/hooks/useSectionCounter";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const hasContent = !loading && testimonials.length > 0;
  const { counter, ref } = useSectionCounter("testimonials", hasContent);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data.filter((t: Testimonial) => t.is_active).sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error loading testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section id="testimonials" ref={ref} className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="mb-16">
            <p className="font-mono text-sm text-primary mb-2">{`// ${counter}`}</p>
            <h2 className="text-3xl md:text-4xl font-bold">Recomendaciones</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 animate-pulse">
                <div className="h-6 w-6 bg-muted rounded mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2">{`// ${counter}`}</p>
          <h2 className="text-3xl md:text-4xl font-bold">Recomendaciones</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
            >
              <Quote size={24} className="text-primary/30 mb-4" />
              <p className="text-sm text-secondary-foreground leading-relaxed mb-6">
                "{t.testimony}"
              </p>
              <div className="flex items-center gap-3">
                {t.person_avatar && (
                  <img
                    src={t.person_avatar}
                    alt={t.person_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.person_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.person_position} {t.person_company && `en ${t.person_company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
