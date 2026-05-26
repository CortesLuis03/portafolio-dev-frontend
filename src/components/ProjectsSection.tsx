import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { fetchFeaturedProjects } from "@/services/featured-projects.service";
import { FeaturedProject } from "@/services/types";
import { useSectionCounter } from "@/hooks/useSectionCounter";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const hasContent = !loading && projects.length > 0;
  const { counter, ref } = useSectionCounter("projects", hasContent);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchFeaturedProjects();
        setProjects(data.filter((p: FeaturedProject) => p.is_active).sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" ref={ref} className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="mb-16">
            <p className="font-mono text-sm text-primary mb-2">{`// ${counter}`}</p>
            <h2 className="text-3xl md:text-4xl font-bold">Proyectos Destacados</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-background overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="section-padding bg-card">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2">{`// ${counter}`}</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Proyectos Destacados
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-xl border border-border bg-background overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Repositorio de ${project.title}`}
                      className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-surface-hover transition-all"
                    >
                      <Github size={16} className="text-foreground" />
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
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

              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.split(",").map((tag) => (
                    <span
                      key={tag.trim()}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tag.trim()}
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
