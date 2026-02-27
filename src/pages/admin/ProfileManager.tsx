import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/config/env";
import axios from "axios";
import { toast } from "sonner";

const ProfileManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    profile: "",
    about: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/configs/get`); // Assuming /configs/get returns the full_name, etc.
        setProfile(response.data);
      } catch (error) {
        toast.error("Error al cargar la información del perfil");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post(`${API_URL}/configs/update`, profile);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el perfil");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border border-border overflow-hidden">
            {profile.full_name ? (
              <span className="text-2xl font-bold text-muted-foreground">
                {profile.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            ) : (
              <span className="text-2xl font-bold text-muted-foreground">
                ??
              </span>
            )}
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
                value={profile.full_name}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Título profesional</Label>
              <Input
                value={profile.profile}
                onChange={(e) =>
                  setProfile({ ...profile, profile: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Biografía</Label>
            <Textarea
              rows={4}
              value={profile.about}
              onChange={(e) =>
                setProfile({ ...profile, about: e.target.value })
              }
            />
          </div>
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileManager;
