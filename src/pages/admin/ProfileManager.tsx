import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    name: "Tu Nombre",
    title: "Full Stack Developer",
    bio: "Desarrollador apasionado con +5 años de experiencia construyendo aplicaciones web modernas y escalables.",
    email: "contacto@tudominio.com",
    location: "Ciudad, País",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-2xl"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Administra tu información personal
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border border-border">
            <span className="text-2xl font-bold text-muted-foreground">TN</span>
          </div>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" /> Cambiar foto
          </Button>
        </div>

        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <Input
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Título profesional</Label>
              <Input
                value={profile.title}
                onChange={(e) =>
                  setProfile({ ...profile, title: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Biografía</Label>
            <Textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Ubicación</Label>
              <Input
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <Button className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" /> Guardar cambios
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileManager;
