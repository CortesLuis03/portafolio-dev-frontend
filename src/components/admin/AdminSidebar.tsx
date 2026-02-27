import {
  User,
  Code2,
  FolderKanban,
  Briefcase,
  MessageSquareQuote,
  LayoutDashboard,
  Share2,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Perfil", url: "/admin/profile", icon: User },
  { title: "Redes Sociales", url: "/admin/social", icon: Share2 },
  { title: "Skills", url: "/admin/skills", icon: Code2 },
  { title: "Proyectos", url: "/admin/projects", icon: FolderKanban },
  { title: "Experiencia", url: "/admin/experience", icon: Briefcase },
  {
    title: "Testimonios",
    url: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
];

const AdminSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) =>
    path === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!collapsed && (
              <span className="font-mono text-primary text-sm">
                {"<admin />"}
              </span>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="hover:bg-muted/50"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          asChild
        >
          <a href="/admin/login">
            <LogOut className="mr-2 h-4 w-4" />
            {!collapsed && "Cerrar sesión"}
          </a>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
