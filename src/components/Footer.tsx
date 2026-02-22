const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-8 text-center">
      <p className="font-mono text-xs text-muted-foreground">
        Diseñado y desarrollado con{" "}
        <span className="text-primary">♥</span> — {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
