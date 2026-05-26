import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useConfigs } from "@/hooks/useConfigs";
import { useSocialNetworks } from "@/hooks/useSocialNetworks";

const HeroSection = () => {
  const { data, isLoading, isError, error } = useConfigs();
  const { data: socialNetworks } = useSocialNetworks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { full_name, profile, about } = data;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-primary mb-4"
        >
          Hola, mi nombre es
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="text-gradient">{full_name}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-3xl text-muted-foreground font-mono mb-8"
        >
          {profile}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-xl md:max-w-3xl mx-auto text-secondary-foreground mb-12 leading-relaxed"
        >
          {about}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {socialNetworks?.map(({ id, icon, url, name }) => (
            <a
              key={id}
              href={url}
              aria-label={name}
              className="p-3 rounded-lg border border-border bg-surface hover:bg-surface-hover hover:border-primary/50 transition-all duration-300"
              target={name === "Email" ? "_self" : "_blank"}
            >
              <div className="w-8 h-8">
                <img
                  src={icon}
                  className="w-8 h-8 object-contain grayscale brightness-0 invert"
                />
              </div>
            </a>
          ))}
        </motion.div>

        <motion.a
          href="#skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="inline-block animate-bounce text-muted-foreground"
        >
          <ArrowDown size={24} />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
