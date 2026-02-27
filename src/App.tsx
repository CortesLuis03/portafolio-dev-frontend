import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ProfileManager from "./pages/admin/ProfileManager";
import SocialManager from "./pages/admin/SocialManager";
import SkillsManager from "./pages/admin/SkillsManager";
import ProjectsManager from "./pages/admin/ProjectsManager";
import ExperienceManager from "./pages/admin/ExperienceManager";
import TestimonialsManager from "./pages/admin/TestimonialManager";
import AdminLayout from "./layouts/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<ProfileManager />} />
            <Route path="social" element={<SocialManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
