import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="container mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="font-mono text-sm text-primary mb-2">{"// 04"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-muted-foreground">
            ¿Tienes un proyecto en mente? Hablemos.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            placeholder="Tu nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            maxLength={100}
            className="bg-background border-border focus:border-primary"
          />
          <Input
            type="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            maxLength={255}
            className="bg-background border-border focus:border-primary"
          />
          <Textarea
            placeholder="Tu mensaje..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            maxLength={1000}
            rows={5}
            className="bg-background border-border focus:border-primary resize-none"
          />
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
            disabled={submitted}
          >
            {submitted ? (
              <span className="flex items-center gap-2">
                <CheckCircle size={16} /> ¡Mensaje enviado!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send size={16} /> Enviar mensaje
              </span>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
