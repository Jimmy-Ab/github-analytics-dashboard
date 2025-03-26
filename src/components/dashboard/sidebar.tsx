// "use client"; // Ensure this runs in the client

// import React from "react";
// import { usePathname } from "next/navigation"; // Use `usePathname` instead of `useRouter`
// import Link from "next/link";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Home,
//   Settings,
//   Activity,
//   Folder,
//   Github,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// interface SidebarProps {
//   collapsed: boolean;
//   toggleSidebar: () => void;
// }

// interface NavItemProps {
//   to: string;
//   icon: React.ElementType;
//   label: string;
//   collapsed: boolean;
// }

// const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, collapsed }) => {
//   const pathname = usePathname(); // Get current route
//   const isActive = pathname === to;

//   return (
//     <Link
//       href={to}
//       className={cn(
//         "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
//         isActive
//           ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
//           : "text-sidebar-foreground",
//         collapsed && "justify-center px-2"
//       )}
//     >
//       <Icon size={20} />
//       {!collapsed && <span>{label}</span>}
//     </Link>
//   );
// };

// const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
//   return (
//     <div
//       className={cn(
//         "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out sticky top-0 z-30",
//         collapsed ? "w-[60px]" : "w-[240px]"
//       )}
//     >
//       {/* Logo */}
//       <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
//         {!collapsed && (
//           <div className="flex items-center gap-2">
//             <Github size={24} className="text-sidebar-foreground" />
//             <span className="font-semibold text-sidebar-foreground">GitHub</span>
//           </div>
//         )}
//         {collapsed && <Github size={24} className="mx-auto text-sidebar-foreground" />}
//         <Button
//           variant="ghost"
//           size="icon"
//           className={cn("ml-auto", collapsed && "mx-auto")}
//           onClick={toggleSidebar}
//           aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//         </Button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
//         <NavItem to="/dashboard" icon={Home} label="Overview" collapsed={collapsed} />
//         <NavItem to="/dashboard/repositories" icon={Folder} label="Repositories" collapsed={collapsed} />
//         <NavItem to="/dashboard/activity" icon={Activity} label="Activity" collapsed={collapsed} />
//         <NavItem to="/dashboard/settings" icon={Settings} label="Settings" collapsed={collapsed} />
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/70">
//         {!collapsed && <p className="text-center">GitHub Analytics v1.0</p>}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Activity,
  Folder,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, collapsed }) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        "text-gray-700 dark:text-gray-300",
        isActive
          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium"
          : "hover:text-gray-900 dark:hover:text-white",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  return (
    <div
      className={cn(
        "h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
        "flex flex-col transition-all duration-300 ease-in-out sticky top-0 z-30",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Github size={24} className="text-gray-900 dark:text-white" />
            <span className="font-semibold text-gray-900 dark:text-white">
              GitHub Analytics
            </span>
          </div>
        )}
        {collapsed && (
          <Github size={24} className="mx-auto text-gray-900 dark:text-white" />
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "ml-auto hover:bg-gray-200 dark:hover:bg-gray-700",
            collapsed && "mx-auto"
          )}
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={18} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <ChevronLeft size={18} className="text-gray-700 dark:text-gray-300" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <NavItem to="/dashboard" icon={Home} label="Overview" collapsed={collapsed} />
        <NavItem
          to="/dashboard/repositories"
          icon={Folder}
          label="Repositories"
          collapsed={collapsed}
        />
        <NavItem
          to="/dashboard/activity"
          icon={Activity}
          label="Activity"
          collapsed={collapsed}
        />
        <NavItem
          to="/dashboard/settings"
          icon={Settings}
          label="Settings"
          collapsed={collapsed}
        />
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
        {!collapsed && <p className="text-center">GitHub Analytics v1.0</p>}
      </div>
    </div>
  );
};

export default Sidebar;