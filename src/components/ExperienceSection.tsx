import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { fetchWorkExperiences } from "@/services/work-experience.service";
import { WorkExperience } from "@/services/types";
import { useSectionCounter } from "@/hooks/useSectionCounter";

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const hasContent = !loading && experiences.length > 0;
  const { counter, ref } = useSectionCounter("experience", hasContent);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await fetchWorkExperiences();
        setExperiences(data.filter((e: WorkExperience) => e.is_active).sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error loading experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    loadExperiences();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date.substring(0, 7) + "-01");
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("es-ES", { month: "short", year: "numeric" });
  };

  if (loading) {
    return (
      <section id="experience" ref={ref} className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="mb-16">
            <p className="font-mono text-sm text-primary mb-2">{`// ${counter}`}</p>
            <h2 className="text-3xl md:text-4xl font-bold">Experiencia</h2>
          </div>
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-8 animate-pulse">
                <div className="w-3 h-3 rounded-full bg-muted mt-1.5" />
                <div className="flex-1 rounded-xl border border-border bg-background p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-5 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="section-padding bg-card">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2">{`// ${counter}`}</p>
          <h2 className="text-3xl md:text-4xl font-bold">Experiencia</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className={`relative flex flex-col md:flex-row ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-center gap-8`}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 md:mt-0 z-10" />

                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div className="rounded-xl border border-border bg-background p-6 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={16} className="text-primary" />
                      <span className="text-xs font-mono text-muted-foreground">
                        {formatDate(exp.start_date)} — {exp.is_current ? "Presente" : formatDate(exp.end_date || "")}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-sm text-primary mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.functions}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
