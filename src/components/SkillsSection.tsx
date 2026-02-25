import { useSkillsCategory } from "@/hooks/useSkillsCategory";
import { motion } from "framer-motion";

const SkillsSection = () => {
  const { data: skills, isLoading, error } = useSkillsCategory();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2">{"// 01"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">Stack Tecnológico</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {skills.map((group, groupIdx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.15 }}
              className={` rounded-xl border border-border bg-card p-6 w-full md:w-[calc(33.333%-1.5rem)]`}
            >
              <h3 className="font-mono text-primary text-sm mb-6">
                {group.name}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {group.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: groupIdx * 0.1 + skillIdx * 0.05 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="flex flex-col items-center gap-0 p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-default"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className={`w-8 h-8 object-contain ${["GitHub", "Socket.IO", "Ant Design"].includes(skill.name) ? "brightness-0 invert" : ""}`}
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
