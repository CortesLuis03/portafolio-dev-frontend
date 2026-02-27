import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const socialFields = [
  {
    key: "github",
    label: "GitHub",
    icon: Github,
    placeholder: "https://github.com/tuusuario",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "https://linkedin.com/in/tuusuario",
  },
  {
    key: "twitter",
    label: "Twitter / X",
    icon: Twitter,
    placeholder: "https://x.com/tuusuario",
  },
  {
    key: "website",
    label: "Sitio web",
    icon: Globe,
    placeholder: "https://tudominio.com",
  },
];

const SocialManager = () => {
  const [socials, setSocials] = useState<Record<string, string>>({
    github: "https://github.com/tuusuario",
    linkedin: "",
    twitter: "",
    website: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-2xl"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Redes Sociales</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configura los enlaces a tus perfiles
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        {socialFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label className="flex items-center gap-2">
              <field.icon className="h-4 w-4 text-primary" /> {field.label}
            </Label>
            <Input
              placeholder={field.placeholder}
              value={socials[field.key] || ""}
              onChange={(e) =>
                setSocials({ ...socials, [field.key]: e.target.value })
              }
            />
          </div>
        ))}

        <Button className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" /> Guardar cambios
        </Button>
      </div>
    </motion.div>
  );
};

export default SocialManager;
