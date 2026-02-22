import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Senior Full Stack Developer",
    company: "Tech Company",
    period: "2022 — Presente",
    description:
      "Lideré el desarrollo de microservicios con Node.js y React. Implementé CI/CD pipelines y reduje tiempos de deploy en un 60%.",
  },
  {
    role: "Full Stack Developer",
    company: "Startup Digital",
    period: "2020 — 2022",
    description:
      "Desarrollé aplicaciones SaaS con React y Express. Diseñé esquemas de base de datos PostgreSQL optimizados para alto rendimiento.",
  },
  {
    role: "Frontend Developer",
    company: "Agencia Creativa",
    period: "2018 — 2020",
    description:
      "Construí interfaces responsivas con React y TailwindCSS. Colaboré directamente con diseñadores UI/UX para entregar productos pixel-perfect.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-card">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2">{"// 02"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">Experiencia</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className={`relative flex flex-col md:flex-row ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-center gap-8`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 md:mt-0 z-10" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div className="rounded-xl border border-border bg-background p-6 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={16} className="text-primary" />
                      <span className="text-xs font-mono text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-primary mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
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
