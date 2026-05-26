import { motion } from "framer-motion";
import {
  Code2,
  FolderKanban,
  Briefcase,
  MessageSquareQuote,
  Mail,
  Eye,
} from "lucide-react";

const stats = [
  { label: "Skills", value: 12, icon: Code2 },
  { label: "Proyectos", value: 4, icon: FolderKanban },
  { label: "Experiencias", value: 3, icon: Briefcase },
  { label: "Testimonios", value: 3, icon: MessageSquareQuote },
  { label: "Mensajes", value: 7, icon: Mail },
  { label: "Visitas (mes)", value: 1240, icon: Eye },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Resumen general de tu portafolio
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-bold font-mono text-foreground">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Mensajes recientes</h2>
        <div className="space-y-3">
          {[
            {
              name: "Laura Méndez",
              email: "laura@mail.com",
              msg: "Hola, me interesa colaborar en un proyecto...",
              time: "Hace 2h",
            },
            {
              name: "Pedro Ruiz",
              email: "pedro@mail.com",
              msg: "Excelente portafolio, ¿tienes disponibilidad?",
              time: "Hace 1d",
            },
            {
              name: "Ana Torres",
              email: "ana@mail.com",
              msg: "Me gustaría discutir una oportunidad laboral...",
              time: "Hace 3d",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="flex items-start justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.msg}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                {m.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
