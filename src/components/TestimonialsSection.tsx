import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    role: "CTO en TechCo",
    text: "Un profesional excepcional. Su capacidad para resolver problemas complejos y entregar código limpio es admirable. Lo recomendaría sin dudarlo.",
  },
  {
    name: "Carlos Rodríguez",
    role: "Product Manager",
    text: "Trabajar con él fue una experiencia fantástica. Siempre proactivo, con ideas innovadoras y una ética de trabajo impecable.",
  },
  {
    name: "Ana López",
    role: "Lead Designer",
    text: "La colaboración más fluida que he tenido con un desarrollador. Entiende perfectamente el diseño y lo implementa con atención al detalle.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2">{"// 03"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">Recomendaciones</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
            >
              <Quote size={24} className="text-primary/30 mb-4" />
              <p className="text-sm text-secondary-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
