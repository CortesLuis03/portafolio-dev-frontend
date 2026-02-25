import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Plataforma de comercio electrónico full-stack con pasarela de pagos, gestión de inventario y panel administrativo.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    repo: "#",
    demo: "#",
  },
  {
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas en tiempo real con drag & drop, asignación de equipo y notificaciones.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSockets"],
    repo: "#",
    demo: "#",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Dashboard interactivo de analíticas con visualizaciones de datos en tiempo real y reportes exportables.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["React", "D3.js", "Express", "MongoDB"],
    repo: "#",
    demo: null,
  },
  {
    title: "DevOps Pipeline Tool",
    description:
      "Herramienta de automatización CI/CD con monitoreo de contenedores, logs centralizados y alertas configurables.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
    tags: ["Docker", "GitHub Actions", "Nginx", "Linux"],
    repo: "#",
    demo: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding bg-card">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2">{"// 02"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Proyectos Destacados
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-xl border border-border bg-background overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Links overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Repositorio de ${project.title}`}
                      className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-surface-hover transition-all"
                    >
                      <Github size={16} className="text-foreground" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Demo de ${project.title}`}
                      className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-surface-hover transition-all"
                    >
                      <ExternalLink size={16} className="text-foreground" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
